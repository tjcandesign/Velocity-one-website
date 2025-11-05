document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Scroll Effects
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const heroText = document.querySelector('.hero-text');
    const heroHeading = document.querySelector('.hero h1');
    const heroSubhead = document.querySelector('.hero .subhead');
    const heroGrid = document.querySelector('.hero::before');
    
    function updateHeroScrollEffects() {
        if (!hero) return;
        
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const scrollPercent = Math.min(scrollPosition / (heroHeight * 0.5), 1);
        
        // Add/remove scrolled class based on scroll position
        if (scrollPosition > 50) {
            hero.classList.add('scrolled');
        } else {
            hero.classList.remove('scrolled');
        }
        
        // Parallax and fade effects
        if (heroBg) {
            const translateY = scrollPosition * 0.4;
            heroBg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${1 + scrollPercent * 0.1})`;
        }
        
        // Grid overlay fade out
        if (heroGrid) {
            const gridOpacity = 0.5 - (scrollPercent * 0.5);
            hero.style.setProperty('--grid-opacity', Math.max(0, gridOpacity));
        }
    }
    
    // Initial call
    updateHeroScrollEffects();
    
    // Throttle scroll events for performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateHeroScrollEffects, 50);
    }, { passive: true });
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isOpening = !mobileMenu.classList.contains('active');
        
        if (isOpening) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Toggle hamburger to X
            hamburger.classList.add('active');
        } else {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Toggle X back to hamburger
            hamburger.classList.remove('active');
        }
    }
    
    // Initialize mobile menu
    if (hamburger && mobileMenu) {
        // Toggle on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close on overlay click
        overlay.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close on close button click
        if (closeMenu) {
            closeMenu.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }
        
        // Close menu when clicking on links (with a small delay for smooth transition)
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                setTimeout(toggleMobileMenu, 300);
            });
        });
        
        // Close menu when window is resized to desktop
        function handleResize() {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.classList.remove('active');
            }
        }
        
        window.addEventListener('resize', handleResize);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    if (navbar && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        });
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initialize active nav link on page load
    updateActiveNavLink();
    
    // Modal Functionality
    const modalTriggers = document.querySelectorAll('.learn-more');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 10);
            }
        });
    });
    
    // Close modal when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                setTimeout(() => {
                    this.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        }
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Video thumbnail click handler (placeholder for actual video implementation)
    const videoThumbnail = document.querySelector('.video-thumbnail');
    
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or navigate to a video page
            alert('Video player would open here in a full implementation.');
        });
    }
    
    // Initialize AOS (Animate On Scroll) if needed
    // You would need to include AOS library in your project
    // if (typeof AOS !== 'undefined') {
    //     AOS.init({
    //         duration: 800,
    //         once: true
    //     });
    // }
});
