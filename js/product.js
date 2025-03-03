document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product data
    fetchProductData(productId);

    // Initialize gallery navigation
    initGallery();

    // Initialize action buttons
    initActionButtons();

    // Initialize modals
    initModals();

    // Message modal handling
    const messageModal = document.getElementById('messageModal');
    const closeMessageBtn = messageModal.querySelector('.close');
    
    // Close message modal
    closeMessageBtn.addEventListener('click', () => {
        messageModal.classList.remove('show');
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.classList.remove('show');
        }
    });

    // Handle message form submission
    const messageForm = document.querySelector('.message-form');
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('message').value;
        console.log('Message sent:', message);
        messageModal.classList.remove('show');
        alert('Message sent successfully!');
        messageForm.reset();
    });
});

async function fetchProductData(productId) {
    try {
        // TODO: Replace with actual API endpoint
        // const response = await fetch(`/api/products/${productId}`);
        // const data = await response.json();
        
        // Temporary mock data
        const data = {
            title: 'iPhone 13 Pro - 256GB Space Gray',
            price: 'R12,000',
            condition: 'Used - Like New',
            description: 'Perfect condition iPhone 13 Pro with 256GB storage. Includes original box, charger, and accessories. Battery health at 92%. No scratches or dents.',
            location: 'Cape Town',
            category: 'Electronics',
            date: '2 days ago',
            views: 245,
            images: [
                '../assets/images/products/iphone1.jpg',
                '../assets/images/products/iphone2.jpg',
                '../assets/images/products/iphone3.jpg'
            ],
            seller: {
                name: 'John Doe',
                memberSince: 'January 2024',
                rating: 4.0,
                phone: '+27 82 123 4567'
            }
        };

        updateProductUI(data);
    } catch (error) {
        console.error('Error fetching product data:', error);
        showError('Failed to load product data');
    }
}

function updateProductUI(data) {
    // Update product details
    document.getElementById('productTitle').textContent = data.title;
    document.getElementById('productPrice').textContent = data.price;
    document.getElementById('productCondition').textContent = data.condition;
    document.getElementById('productDescription').textContent = data.description;
    document.getElementById('productLocation').textContent = data.location;
    document.getElementById('productCategory').textContent = data.category;
    document.getElementById('productDate').textContent = data.date;
    document.getElementById('productViews').textContent = data.views;

    // Update seller information
    document.getElementById('sellerName').textContent = data.seller.name;
    document.getElementById('memberSince').textContent = data.seller.memberSince;

    // Update gallery
    updateGallery(data.images);
}

function updateGallery(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailList = document.getElementById('thumbnailList');

    // Set main image
    if (images.length > 0) {
        mainImage.src = images[0];
        mainImage.alt = 'Product Image';
    }

    // Create thumbnails
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Product Image ${index + 1}`;
        thumbnail.addEventListener('click', () => {
            mainImage.src = image;
            mainImage.alt = `Product Image ${index + 1}`;
        });
        thumbnailList.appendChild(thumbnail);
    });
}

function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const thumbnails = document.getElementById('thumbnailList');

    let currentIndex = 0;

    prevBtn.addEventListener('click', () => {
        const images = thumbnails.getElementsByTagName('img');
        if (images.length > 0) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            mainImage.src = images[currentIndex].src;
        }
    });

    nextBtn.addEventListener('click', () => {
        const images = thumbnails.getElementsByTagName('img');
        if (images.length > 0) {
            currentIndex = (currentIndex + 1) % images.length;
            mainImage.src = images[currentIndex].src;
        }
    });
}

function initActionButtons() {
    const favoriteBtn = document.querySelector('.action-btn.favorite');
    const shareBtn = document.querySelector('.action-btn.share');
    const contactBtn = document.querySelector('.contact-seller-btn');
    const phoneBtn = document.querySelector('.view-phone-btn');

    favoriteBtn.addEventListener('click', toggleFavorite);
    shareBtn.addEventListener('click', shareProduct);
    contactBtn.addEventListener('click', () => showModal('contactModal'));
    phoneBtn.addEventListener('click', () => showModal('phoneModal'));
}

function initModals() {
    // Initialize all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => hideModal(modal.id));

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Reveal phone number
    const revealBtn = document.getElementById('revealNumberBtn');
    revealBtn.addEventListener('click', revealPhoneNumber);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        
        // Update modal content if needed
        if (modalId === 'contactModal') {
            document.getElementById('modalSellerName').textContent = 
                document.getElementById('sellerName').textContent;
            document.getElementById('modalProductTitle').textContent = 
                document.getElementById('productTitle').textContent;
        }
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    const messageText = document.getElementById('messageText').value;

    try {
        // TODO: Replace with actual API call
        // await sendMessage(messageText);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccessMessage('Message sent successfully!');
        hideModal('contactModal');
        e.target.reset();
    } catch (error) {
        showError('Failed to send message. Please try again.');
    }
}

function revealPhoneNumber() {
    const phoneSpan = document.querySelector('#sellerPhone span');
    const revealBtn = document.getElementById('revealNumberBtn');
    
    // TODO: Replace with actual API call to get phone number
    const phoneNumber = '+27 82 123 4567'; // This should come from the API
    
    phoneSpan.textContent = phoneNumber;
    revealBtn.textContent = 'Phone Number Revealed';
    revealBtn.disabled = true;
}

function toggleFavorite(event) {
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    const isActive = icon.classList.contains('fas');

    if (isActive) {
        icon.classList.replace('fas', 'far');
        btn.querySelector('span').textContent = 'Add to Favorites';
    } else {
        icon.classList.replace('far', 'fas');
        btn.querySelector('span').textContent = 'Remove from Favorites';
    }
}

function shareProduct() {
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('productTitle').textContent,
            text: document.getElementById('productDescription').textContent,
            url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }
}

function showSuccessMessage(message) {
    // TODO: Implement proper success message UI
    alert(message);
}

function showError(message) {
    // TODO: Implement proper error message UI
    alert(message);
}
