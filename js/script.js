// EmailJS Configuration
(function () {
  // Cek apakah konfigurasi EmailJS tersedia
  if (typeof EMAILJS_CONFIG !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  } else {
    // Fallback jika file config belum diatur
    console.warn(
      "EmailJS config not found. Please setup emailjs-config.js file.",
    );
    emailjs.init("YOUR_PUBLIC_KEY"); // Ganti dengan Public Key EmailJS Anda
  }
})();

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) {
    navbar.classList.add("bg-white", "shadow-lg");
    navbar.classList.remove("glass-effect");
  } else {
    navbar.classList.remove("bg-white", "shadow-lg");
    navbar.classList.add("glass-effect");
  }
});

// Form validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formData) {
  const errors = [];

  if (
    !formData.get("from_name") ||
    formData.get("from_name").trim().length < 2
  ) {
    errors.push("Nama depan harus diisi minimal 2 karakter");
  }

  if (
    !formData.get("last_name") ||
    formData.get("last_name").trim().length < 2
  ) {
    errors.push("Nama belakang harus diisi minimal 2 karakter");
  }

  if (
    !formData.get("from_email") ||
    !validateEmail(formData.get("from_email"))
  ) {
    errors.push("Email tidak valid");
  }

  if (!formData.get("subject") || formData.get("subject").trim().length < 5) {
    errors.push("Subject harus diisi minimal 5 karakter");
  }

  if (!formData.get("message") || formData.get("message").trim().length < 10) {
    errors.push("Pesan harus diisi minimal 10 karakter");
  }

  return errors;
}

// Form submission with EmailJS
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form elements
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnLoading = document.getElementById("btn-loading");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");

    // Show loading state
    submitBtn.disabled = true;
    btnText.classList.add("hidden");
    btnLoading.classList.remove("hidden");
    successMessage.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Get form data
    const formData = new FormData(this);

    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      errorText.innerHTML = validationErrors.join("<br>");
      errorMessage.classList.remove("hidden");

      // Reset button state
      submitBtn.disabled = false;
      btnText.classList.remove("hidden");
      btnLoading.classList.add("hidden");
      return;
    }

    const templateParams = {
      to_email: "nganjukdev.idn@gmail.com",
      from_name: formData.get("from_name") + " " + formData.get("last_name"),
      from_email: formData.get("from_email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      reply_to: formData.get("from_email"),
    };

    // Send email using EmailJS
    const serviceId =
      typeof EMAILJS_CONFIG !== "undefined"
        ? EMAILJS_CONFIG.SERVICE_ID
        : "YOUR_SERVICE_ID";
    const templateId =
      typeof EMAILJS_CONFIG !== "undefined"
        ? EMAILJS_CONFIG.TEMPLATE_ID
        : "YOUR_TEMPLATE_ID";

    emailjs.send(serviceId, templateId, templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Show success message
        successMessage.classList.remove("hidden");

        // Reset form
        document.getElementById("contact-form").reset();

        // Reset button state
        submitBtn.disabled = false;
        btnText.classList.remove("hidden");
        btnLoading.classList.add("hidden");
      },
      function (error) {
        console.log("FAILED...", error);

        // Show error message
        errorText.textContent =
          "Terjadi kesalahan saat mengirim pesan: " +
          (error.text || error.message || "Unknown error");
        errorMessage.classList.remove("hidden");

        // Reset button state
        submitBtn.disabled = false;
        btnText.classList.remove("hidden");
        btnLoading.classList.add("hidden");
      },
    );
  });

// Add scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
