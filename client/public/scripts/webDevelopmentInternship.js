document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

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

    // Form Submission Handling
    const applicationForm = document.querySelector('.application-form');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to your server
            console.log('Application submitted:', data);
            
            // Show success message
            alert('Thank you for your application! We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }
});



const form = document.querySelector("application-form");
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
      const res = await fetch("/auth/api/send/web-dev-registration", {
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