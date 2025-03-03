document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize help navigation
    initHelpNav();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize live chat
    initLiveChat();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

function initHelpNav() {
    const menuItems = document.querySelectorAll('.help-menu a');
    const panels = document.querySelectorAll('.help-panel');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all menu items and panels
            menuItems.forEach(menuItem => {
                menuItem.parentElement.classList.remove('active');
            });
            panels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            item.parentElement.classList.add('active');
            
            // Show corresponding panel
            const targetId = item.getAttribute('href').substring(1);
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('supportForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };
            
            try {
                // Simulate API call
                await submitSupportRequest(formData);
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                form.reset();
                
            } catch (error) {
                showNotification('Failed to send message. Please try again later.', 'error');
            }
        });
    }
}

function initLiveChat() {
    const chatButton = document.getElementById('startChat');
    
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            // Implement chat functionality or integrate with chat service
            showNotification('Live chat feature coming soon!', 'info');
        });
    }
}

async function submitSupportRequest(formData) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful submission (90% success rate)
            if (Math.random() < 0.9) {
                resolve();
            } else {
                reject(new Error('Failed to submit support request'));
            }
        }, 1000);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification.success {
        background-color: #10b981;
    }
    
    .notification.error {
        background-color: #ef4444;
    }
    
    .notification.info {
        background-color: #6366f1;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 