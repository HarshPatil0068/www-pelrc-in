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


 // Form label animation
        document.querySelectorAll('.uiux-form-group input, .uiux-form-group textarea').forEach(input => {
            input.addEventListener('input', function() {
                const label = this.nextElementSibling;
                if (this.value.trim() !== '') {
                    label.style.top = '-10px';
                    label.style.left = '15px';
                    label.style.fontSize = '0.8rem';
                    label.style.color = '#D4AF37';
                    label.style.background = 'white';
                } else {
                    label.style.top = '18px';
                    label.style.left = '25px';
                    label.style.fontSize = '1rem';
                    label.style.color = '#6c757d';
                    label.style.background = 'transparent';
                }
            });
        });


        // Card hover effects
        document.querySelectorAll('.uiux-highlight-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
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

        