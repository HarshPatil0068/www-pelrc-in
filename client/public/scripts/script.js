document.addEventListener('DOMContentLoaded', function () {
  // ==================== Preloader Particles.js ====================
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#D4AF37" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#D4AF37",
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }

  // ==================== Preloader Fadeout ====================
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 800);
    }
  }, 2000);

  // ==================== Navbar Scroll Effect ====================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

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


  // ==================== Contact Form Submission ====================
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
  // ==================== Scroll Animations & Stats Counter ====================
  const statItems = document.querySelectorAll('.stat-item[data-counter]');

  function animateCounters() {
    statItems.forEach(item => {
      const target = parseInt(item.getAttribute('data-counter'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const counterElement = item.querySelector('h3');

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        counterElement.textContent = Math.floor(current);
      }, 16);
    });
  }

  function checkScroll() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      const top = el.getBoundingClientRect().top;
      const delay = el.getAttribute('data-animate-delay') || 0;
      if (top < window.innerHeight - 100) {
        setTimeout(() => el.classList.add('animated'), delay * 1000);
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-animate-delay') || 0;
        setTimeout(() => entry.target.classList.add('animated'), delay * 1000);

        if (entry.target.classList.contains('stats-bar')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // ==================== Smooth Anchor Scrolling ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  // ==================== Scroll Down Button ====================
  const scrollDownBtn = document.querySelector('.scroll-down');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: 'smooth'
      });
    });
  }
});

// ==================== Offerings Popup ====================
const offeringData = [
  {
    title: "💼 Paid Internships — Program Overview",
    description: "Our paid internship programs are immersive, 3 to 6-month experiences ..."
  },
  {
    title: "🛠️ Weekend Workshops — Intensive Skill-Building Sessions",
    description: "Our weekend workshops are focused, two-day learning experiences ..."
  },
  {
    title: "🚀 Career Accelerator — Launch Your Professional Journey",
    description: "The Career Accelerator is a focused support program designed to prepare you ..."
  }
];

let scrollListener;

function showPopup(index) {
  const existing = document.getElementById("popupBox");
  if (existing) existing.remove();

  const { title, description } = offeringData[index];
  const popup = document.createElement("div");

  popup.id = "popupBox";
  popup.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(10px);
    padding: 30px; min-height: 60vh; width: 90%; max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); border-radius: 12px;
    z-index: 9999; text-align: center; overflow-y: auto;
  `;

  popup.innerHTML = `
    <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">${title}</h2>
    <p style="color: #444; font-size: 16px;">${description}</p>
    <button onclick="closePopup()" style="margin-top: 20px; padding: 10px 20px; background: gold; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Close</button>
  `;

  document.body.appendChild(popup);

  scrollListener = () => closePopup();
  window.addEventListener("scroll", scrollListener);
}

function closePopup() {
  const popup = document.getElementById("popupBox");
  if (popup) popup.remove();
  if (scrollListener) {
    window.removeEventListener("scroll", scrollListener);
    scrollListener = null;
  }
}
