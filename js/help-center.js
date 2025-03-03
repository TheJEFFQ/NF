document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Help Search functionality
    const searchInput = document.getElementById('helpSearch');
    const faqGrid = document.querySelector('.faq-grid');
    const resourcesGrid = document.querySelector('.resources-grid');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search FAQs
        const faqQuestions = document.querySelectorAll('.faq-question h3');
        faqQuestions.forEach(question => {
            const faqItem = question.closest('.faq-item');
            const matches = question.textContent.toLowerCase().includes(searchTerm);
            faqItem.style.display = matches ? 'block' : 'none';
        });
        
        // Search Resources
        const resourceCards = document.querySelectorAll('.resource-card');
        resourceCards.forEach(card => {
            const matches = card.textContent.toLowerCase().includes(searchTerm);
            card.style.display = matches ? 'block' : 'none';
        });
    });
});
