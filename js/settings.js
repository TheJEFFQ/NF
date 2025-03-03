document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');
    const saveButton = document.querySelector('.save-changes-btn');
    
    // Handle form submission
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        saveButton.textContent = 'Saving...';
        saveButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            saveButton.textContent = 'Save Changes';
            saveButton.disabled = false;
            
            // Show success message
            alert('Settings saved successfully!');
        }, 1000);
    });
    
    // Handle dark mode toggle
    const darkModeToggle = document.querySelector('input[type="checkbox"]');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            // Save preference to localStorage
            localStorage.setItem('darkMode', darkModeToggle.checked);
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
    }

    // Initialize sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            body.classList.toggle('sidebar-open');
            sidebarToggle.classList.toggle('active');
        });
    }

    // Handle sidebar collapse
    const sidebarCollapse = document.querySelector('.sidebar-collapse');
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            body.classList.toggle('sidebar-collapsed');
        });
    }
});
