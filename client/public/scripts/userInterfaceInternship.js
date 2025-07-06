// ==================== DOM Ready ====================
window.addEventListener("DOMContentLoaded", () => {
  // ==================== AJAX Form Submission ====================
  const form = document.querySelector(".uiux-application-form");
  if (form) {
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      const formData = {
        name: form.elements["name"].value,
        email: form.elements["email"].value,
        phone: form.elements["phone"].value,
        message: form.elements["message"].value,
      };

      try {
        const res = await fetch("/send/mail/user-interface-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          submitBtn.innerText = "Submitted Successfully!";
          form.reset();
        } else {
          submitBtn.innerText = "Submission Failed";
        }
      } catch (err) {
        console.error("Form submission error:", err);
        submitBtn.innerText = "Network Error";
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Application";
      }, 3000);
    });
  }

  // ==================== Mobile Navigation Toggle ====================
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  if (mobileMenuBtn) {
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";

    const authButtons = document.getElementById("mobile-auth")?.innerHTML || "";

    mobileNav.innerHTML = `
      <div class="mobile-nav-links">
        <div class="mobile-menu-close">
          <img src="./images/close.svg" alt="Close Menu" class="w-10 h-10" />
        </div>
        <a href="/#services">Technical Manuals</a>
        <a href="/#internships">Internships</a>
        <a href="/#workshops">Workshops</a>
        <a href="/about">About</a>
        <div class="mobile-cta">${authButtons}</div>
      </div>
    `;

    document.body.appendChild(mobileNav);

    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.add("active");
      document.body.classList.add("no-scroll");
    });

    const closeBtn = mobileNav.querySelector(".mobile-menu-close");
    closeBtn.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });

    mobileNav.querySelectorAll("a, .mobile-cta button").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }
});
