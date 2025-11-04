// Handle expandable news cards
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const readMore = card.querySelector('.read-more');
        
        readMore?.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = card.classList.toggle('expanded');
            readMore.textContent = isExpanded ? 'Show Less' : 'Read More';
            
            // Close other expanded cards
            if (isExpanded) {
                newsCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                        otherCard.querySelector('.read-more').textContent = 'Read More';
                    }
                });
            }
        });
    });
});
