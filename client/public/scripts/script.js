// Premium Preloader Animation
document.addEventListener('DOMContentLoaded', function() {
    // Particles.js for preloader
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#D4AF37", opacity: 0.3, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
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


     const form = document.getElementById("contactForm");
  const flash = document.getElementById("flashMessage");

  // ✅ Ensure flash message is hidden on page load
  window.addEventListener("DOMContentLoaded", () => {
    flash.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/auth/api/send/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        flash.classList.remove("hidden");
        form.reset();
        setTimeout(() => flash.classList.add("hidden"), 4000);
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  });


    // Hide preloader after 2 seconds
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 800);
    }, 2000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="mobile-nav-links">
            <a href="#services">Services</a>
            <a href="#internships">Internships</a>
            <a href="#workshops">Workshops</a>
            <a href="#about">About</a>
            <div class="mobile-cta">
                <a href="#" class="login-button">Login</a>
                <a href="#" class="signup-button">Sign Up</a>
            </div>
        </div>
    `;
    document.body.appendChild(mobileNav);

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // // Testimonial slider
    // const testimonials = document.querySelectorAll('.testimonial');
    // const dots = document.querySelectorAll('.dot');
    // let currentTestimonial = 0;

    // function showTestimonial(index) {
    //     testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    //     dots.forEach(dot => dot.classList.remove('active'));
        
    //     testimonials[index].classList.add('active');
    //     dots[index].classList.add('active');
    //     currentTestimonial = index;
    // }

    // dots.forEach((dot, index) => {
    //     dot.addEventListener('click', () => showTestimonial(index));
    // });

    // // Auto-rotate testimonials
    // setInterval(() => {
    //     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    //     showTestimonial(currentTestimonial);
    // }, 5000);

    // Counter animation for stats
    const statItems = document.querySelectorAll('.stat-item[data-counter]');
    
    function animateCounters() {
        statItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-counter'));
            const duration = 2000; // 2 seconds
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
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

    // Scroll animations
    function checkScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const delay = element.getAttribute('data-animate-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay * 1000);
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-animate-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stats-bar')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
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

    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight - 80,
                behavior: 'smooth'
            });
        });
    }

    // Initial check for elements already in view
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

  const offeringData = [
    {
      title: "💼 Paid Internships — Program Overview",
      description: "Our paid internship programs are immersive, 3 to 6-month experiences designed to equip students and recent graduates with real-world skills and confidence. Each internship is structured around hands-on projects that mirror actual industry tasks, giving participants the opportunity to apply what they’ve learned in a meaningful and practical way.Throughout the program, interns receive personalized mentorship and guidance from experienced professionals who provide support, feedback, and insight into industry best practices. This one-on-one mentorship helps interns navigate challenges, improve their work, and grow both technically and professionally.In addition to gaining valuable experience, participants develop a portfolio of work that demonstrates their skills to future employers. Whether you're working in web development, design, engineering, or another field, you'll graduate from the program with a clear advantage in the job market.And because we value your contribution, all internships are paid — offering a competitive stipend in recognition of your time, effort, and the impact you bring to the team."
    },
    {
      title: "🛠️ Weekend Workshops — Intensive Skill-Building Sessions",
      description: "Our weekend workshops are focused, two-day learning experiences designed to equip participants with practical, industry-relevant skills in a short amount of time. Ideal for students, working professionals, or anyone looking to upskill quickly, these sessions are packed with hands-on activities, real-world case studies, and guided exercises.Each workshop is led by industry experts who bring their real-world experience into the learning environment, ensuring that the content is current, applicable, and aligned with what companies are actually looking for. Whether you're diving into a new tool, framework, or design method, you'll walk away with clear, actionable skills you can immediately put to use.These workshops are perfect for those who prefer fast-paced, focused learning without long-term time commitments. By the end of just one weekend, you’ll gain both confidence and competence in a key area — all while networking with peers and mentors who share your goals."
    },
    {
      title: "🚀Career Accelerator — Launch Your Professional Journey",
      description: "The Career Accelerator is a focused support program designed to prepare you for real-world job opportunities. It combines expert guidance, personalized feedback, and strategic resources to help you confidently transition from learning to landing your first role.As part of this program, you'll receive in-depth portfolio reviews to ensure your work highlights your strengths and aligns with industry expectations. You'll also get access to interview preparation sessions, including mock interviews, common technical and HR questions, and tips on how to stand out.Most importantly, the program connects you with hiring partners and career networks, giving you direct access to internship and job openings in your field. Whether you're aiming for a role in tech, design, engineering, or business, the Career Accelerator gives you the tools and connections to get there faster and smarter.This is your launchpad to a successful career — with support every step of the way."
    }
  ];

  let scrollListener;

function showPopup(index) {
  const existing = document.getElementById("popupBox");
  if (existing) existing.remove();

  const { title, description } = offeringData[index];

  const popup = document.createElement("div");
  popup.id = "popupBox";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "rgba(255, 255, 255, 0.75)";
  popup.style.backdropFilter = "blur(10px)";
  popup.style.padding = "30px";
  popup.style.minHeight = "60vh";
  popup.style.width = "90%";
  popup.style.maxWidth = "500px";
  popup.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
  popup.style.borderRadius = "12px";
  popup.style.zIndex = "9999";
  popup.style.textAlign = "center";
  popup.style.overflowY = "auto";

  popup.innerHTML = `
    <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">${title}</h2>
    <p style="color: #444; font-size: 16px;">${description}</p>
    <button onclick="closePopup()" style="margin-top: 20px; padding: 10px 20px; background: gold; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
      Close
    </button>
  `;

  document.body.appendChild(popup);

  // ✅ Add scroll listener to auto-close popup
  scrollListener = () => closePopup();
  window.addEventListener("scroll", scrollListener);
}

function closePopup() {
  const popup = document.getElementById("popupBox");
  if (popup) popup.remove();

  // ✅ Clean up scroll listener
  if (scrollListener) {
    window.removeEventListener("scroll", scrollListener);
    scrollListener = null;
  }
}


