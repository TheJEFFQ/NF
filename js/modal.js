document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const postAdModal = document.getElementById('postAdModal');
    const loginBtn = document.querySelector('.login-btn');
    const postAdBtn = document.querySelector('.post-ad-btn');
    const closeButtons = document.querySelectorAll('.close');
    const signupLink = document.querySelector('.signup-link');
    const loginLink = document.querySelector('.login-link');

    // File upload handling
    const fileInput = document.getElementById('ad-images');
    const uploadStatus = document.querySelector('.upload-status');

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (files.length > 0) {
                if (files.length > 5) {
                    alert('Please select a maximum of 5 images');
                    fileInput.value = '';
                    uploadStatus.textContent = 'No file chosen';
                } else {
                    uploadStatus.textContent = `${files.length} file${files.length > 1 ? 's' : ''} selected`;
                }
            } else {
                uploadStatus.textContent = 'No file chosen';
            }
        });
    }

    // Open login modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('show');
    });

    // Open post ad modal
    postAdBtn.addEventListener('click', () => {
        postAdModal.classList.add('show');
    });

    // Switch to signup modal
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        signupModal.classList.add('show');
    });

    // Switch to login modal
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('show');
        loginModal.classList.add('show');
    });

    // Close all modals function
    const closeAllModals = () => {
        loginModal.classList.remove('show');
        signupModal.classList.remove('show');
        postAdModal.classList.remove('show');
    };

    // Update close buttons handling
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Update outside click handling
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Handle login form submission
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login submitted');
    });

    // Handle signup form submission
    const signupForm = document.querySelector('.signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Signup submitted');
    });

    // Handle post ad form submission
    const postAdForm = document.querySelector('.post-ad-form');
    if (postAdForm) {
        postAdForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Post ad submitted');
            closeAllModals();
        });
    }

    // Handle clear form button
    const clearFormBtn = document.querySelector('.clear-form-btn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all fields?')) {
                const form = document.querySelector('.post-ad-form');
                form.reset();
                const uploadStatus = document.querySelector('.upload-status');
                uploadStatus.textContent = 'No file chosen';
            }
        });
    }

    // Sidebar toggle for mobile
    const header = document.querySelector('header');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    header.insertBefore(menuToggle, header.firstChild);

    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) &&
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });

    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.body;

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        body.classList.toggle('sidebar-open');
        sidebarToggle.classList.toggle('active');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            body.classList.remove('sidebar-collapsed');
            localStorage.setItem('sidebarCollapsed', 'false');
        }
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-open');
            const icon = sidebarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Remove old mobile menu toggle
    const oldMenuToggle = document.querySelector('.menu-toggle');
    if (oldMenuToggle) {
        oldMenuToggle.remove();
    }

    // Sidebar collapse functionality
    const sidebarCollapseBtn = document.querySelector('.sidebar-collapse');
    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            body.classList.toggle('sidebar-collapsed');
            
            // Store collapsed state in localStorage
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });

        // Restore collapsed state on page load
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            body.classList.add('sidebar-collapsed');
        }
    }
});
