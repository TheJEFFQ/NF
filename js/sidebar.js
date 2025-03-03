/**
 * Sidebar functionality for Neutron Find marketplace
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleButton = document.getElementById('sidebarToggle');
    const closeButton = document.getElementById('closeSidebar');
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 768;
    
    // Function to open sidebar
    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add('active');
        }
    }
    
    // Function to close sidebar
    function closeSidebar() {
        if (sidebar && isMobile()) {
            sidebar.classList.remove('active');
        }
    }
    
    // Initialize sidebar based on screen size
    function initializeSidebar() {
        if (!isMobile()) {
            openSidebar();
        }
    }
    
    // Add event listeners for toggle and close buttons
    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar?.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (isMobile() && sidebar?.classList.contains('active')) {
            const clickedElement = e.target;
            const isSidebarClick = sidebar.contains(clickedElement);
            const isToggleClick = toggleButton?.contains(clickedElement);
            
            if (!isSidebarClick && !isToggleClick) {
                closeSidebar();
            }
        }
    });
    
    // Prevent clicks inside sidebar from closing it
    sidebar?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initializeSidebar();
        }, 250);
    });
    
    // Handle active menu item
    if (menuItems && menuItems.length > 0) {
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop() || 'Home.html';
        
        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            
            if (itemHref === pageName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
            
            // Add click handler
            item.addEventListener('click', () => {
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
                
                // Close sidebar only on mobile after clicking
                if (isMobile()) {
                    setTimeout(closeSidebar, 150);
                }
            });
        });
    }
    
    // Initialize sidebar on page load
    initializeSidebar();
});
