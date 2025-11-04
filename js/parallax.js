// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }
});
