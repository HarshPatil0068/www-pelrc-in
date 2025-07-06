// ==================== DOM Ready ====================
window.addEventListener("DOMContentLoaded", () => {
  // ==================== AJAX Form Submission ====================
  const form = document.querySelector(".application-form");
  if (form) {
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting Application...";

      const formData = {
        name: form.elements["name"].value,
        email: form.elements["email"].value,
        phone: form.elements["phone"].value,
        preferredDate: form.elements["preferredDate"].value,
      };

      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          submitBtn.innerHTML = "Sent!";
          form.reset();
        } else {
          submitBtn.innerHTML = "Submission Failed";
        }
      } catch (err) {
        console.error("Form submission error:", err);
        submitBtn.innerHTML = "Network Error";
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submit Application";
      }, 3000);
    });
  }

  // ==================== Mobile Navigation Toggle ====================
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  if (mobileMenuBtn) {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';

    const authButtons = document.getElementById("mobile-auth")?.innerHTML || "";

    mobileNav.innerHTML = `
      <div class="mobile-nav-links">
        <div class="mobile-menu-close">
          <img src="./images/close.svg" alt="Close Menu" class="w-10 h-10" />
        </div>
        <a href="/#services">Services</a>
        <a href="/#internships">Internships</a>
        <a href="/#workshops">Workshops</a>
        <a href="/about">About</a>
        <div class="mobile-cta">${authButtons}</div>
      </div>
    `;

    document.body.appendChild(mobileNav);

    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.classList.add('no-scroll');
    });

    const closeBtn = mobileNav.querySelector('.mobile-menu-close');
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });

    mobileNav.querySelectorAll('a, .mobile-cta button').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
});
