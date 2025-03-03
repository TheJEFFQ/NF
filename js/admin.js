document.addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar navigation
    initSidebarNav();
    
    // Initialize modals
    initModals();
    
    // Initialize action buttons
    initActionButtons();
    
    // Initialize filters
    initFilters();
});

function initSidebarNav() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const sections = document.querySelectorAll('.admin-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show corresponding section
            const targetId = item.getAttribute('href').replace('#', '') + '-section';
            document.getElementById(targetId)?.classList.add('active');
        });
    });
}

function initModals() {
    // Add User Modal
    const addUserBtn = document.querySelector('.add-new-btn');
    const addUserModal = document.getElementById('addUserModal');
    const closeUserModal = addUserModal?.querySelector('.close');
    
    if (addUserBtn && addUserModal) {
        addUserBtn.addEventListener('click', () => {
            addUserModal.classList.add('show');
        });
        
        closeUserModal?.addEventListener('click', () => {
            addUserModal.classList.remove('show');
        });
        
        // Close on outside click
        addUserModal.addEventListener('click', (e) => {
            if (e.target === addUserModal) {
                addUserModal.classList.remove('show');
            }
        });
    }
    
    // Add Product Modal
    const addProductBtn = document.querySelector('#products-section .add-new-btn');
    const addProductModal = document.getElementById('addProductModal');
    const closeProductModal = addProductModal?.querySelector('.close');
    
    if (addProductBtn && addProductModal) {
        addProductBtn.addEventListener('click', () => {
            addProductModal.classList.add('show');
        });
        
        closeProductModal?.addEventListener('click', () => {
            addProductModal.classList.remove('show');
        });
        
        // Close on outside click
        addProductModal.addEventListener('click', (e) => {
            if (e.target === addProductModal) {
                addProductModal.classList.remove('show');
            }
        });
    }
}

function initActionButtons() {
    // Edit buttons
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            console.log('Edit item:', id);
            // TODO: Implement edit functionality
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            if (confirm('Are you sure you want to delete this item?')) {
                console.log('Delete item:', id);
                // TODO: Implement delete functionality
            }
        });
    });
}

function initFilters() {
    // User filters
    const userStatusFilter = document.querySelector('.user-filters .filter-select');
    const userSearchInput = document.querySelector('.user-filters .search-input');
    
    if (userStatusFilter) {
        userStatusFilter.addEventListener('change', (e) => {
            const status = e.target.value;
            filterUsers(status);
        });
    }
    
    if (userSearchInput) {
        userSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchUsers(searchTerm);
        });
    }
    
    // Product filters
    const productCategoryFilter = document.querySelector('.product-filters .filter-select');
    const productSearchInput = document.querySelector('.product-filters .search-input');
    
    if (productCategoryFilter) {
        productCategoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            filterProducts(category);
        });
    }
    
    if (productSearchInput) {
        productSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchProducts(searchTerm);
        });
    }
}

function filterUsers(status) {
    const rows = document.querySelectorAll('#users-section tbody tr');
    rows.forEach(row => {
        const userStatus = row.querySelector('.status-badge').textContent.toLowerCase();
        if (!status || userStatus === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function searchUsers(term) {
    const rows = document.querySelectorAll('#users-section tbody tr');
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (name.includes(term) || email.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterProducts(category) {
    const rows = document.querySelectorAll('#products-section tbody tr');
    rows.forEach(row => {
        const productCategory = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (!category || productCategory === category) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function searchProducts(term) {
    const rows = document.querySelectorAll('#products-section tbody tr');
    rows.forEach(row => {
        const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (title.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Form submissions
document.querySelector('#addUserModal form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Add user:', Object.fromEntries(formData));
    // TODO: Implement user creation
    document.getElementById('addUserModal').classList.remove('show');
});

document.querySelector('#addProductModal form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Add product:', Object.fromEntries(formData));
    // TODO: Implement product creation
    document.getElementById('addProductModal').classList.remove('show');
}); 