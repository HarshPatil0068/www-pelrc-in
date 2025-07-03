
     // ==================== Mobile Navigation Toggle ====================
  const mobileMenuBtn = document.querySelector('.mobile-menu');
if (mobileMenuBtn) {
  const menuIcon = mobileMenuBtn.querySelector('img');

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';

  mobileNav.innerHTML = `
    <div class="mobile-nav-links">
      <div class="mobile-menu-close">
        <img src="./images/close.svg" alt="Close Menu" class="w-10 h-10" />
      </div>
      <a href="#services">Technical Manuals</a>
      <a href="#internships">Internships</a>
      <a href="#workshops">Workshops</a>
      <a href="/about">About</a>
      <div class="mobile-cta">
        <button class="login-button" onclick="window.location.href='/auth?form=login'">Sign In</button>
        <button class="signup-button" onclick="window.location.href='/auth?form=register'">Register</button>
      </div>
    </div>
  `;

  document.body.appendChild(mobileNav);

  // Toggle open
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.classList.add('no-scroll');
  });

  // Close with inside close icon
  const closeBtn = mobileNav.querySelector('.mobile-menu-close');
  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  // Close on nav link or button click
  mobileNav.querySelectorAll('a, .mobile-cta button').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

    // Sticky Navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "success") {
    alert("Application sent! We'll get back to you soon.");
  } else if (status === "error") {
    alert("Something went wrong.");
  }

  if (status) {
    // Remove query string without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
