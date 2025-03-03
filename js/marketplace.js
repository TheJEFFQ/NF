document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryFilters = document.getElementById('categoryFilters');
    const locationFilters = document.getElementById('locationFilters');
    const sortSelect = document.getElementById('sortSelect');
    const listingsGrid = document.getElementById('listingsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const pagination = document.getElementById('pagination');

    let listingsData = [...mockListings]; // Use mock data
    let filteredListings = [...listingsData];
    let currentPage = 1;
    const listingsPerPage = 6;

    // Function to render listings
    function renderListings() {
        const startIndex = (currentPage - 1) * listingsPerPage;
        const endIndex = startIndex + listingsPerPage;
        const currentListings = filteredListings.slice(startIndex, endIndex);

        listingsGrid.innerHTML = currentListings.map(listing => `
            <div class="listing-card">
                <div class="listing-image">
                    <img src="${listing.image}" alt="${listing.title}">
                    <button class="favorite-btn"><i class="fas fa-heart"></i></button>
                </div>
                <div class="listing-details">
                    <h3>${listing.title}</h3>
                    <p class="price">R${listing.price.toLocaleString()}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
                </div>
            </div>
        `).join('');
    }

    // Function to update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                renderListings();
            });

            if (i === currentPage) {
                button.classList.add('active');
            }

            pagination.appendChild(button);
        }
    }

    // Function to apply filters
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters.querySelectorAll('input:checked'))
            .map(input => input.value);
        const selectedLocations = Array.from(locationFilters.querySelectorAll('input:checked'))
            .map(input => input.value);

        filteredListings = listingsData.filter(listing => {
            const searchMatch = listing.title.toLowerCase().includes(searchTerm);
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(listing.category);
            const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(listing.location);

            return searchMatch && categoryMatch && locationMatch;
        });

        currentPage = 1;
        updateResultsCount();
        sortListings();
        renderListings();
        updatePagination();
    }

    // Function to sort listings
    function sortListings() {
        const sortValue = sortSelect.value;

        if (sortValue === 'price-low') {
            filteredListings.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            filteredListings.sort((a, b) => b.price - a.price);
        } else {
            filteredListings.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    // Function to update results count
    function updateResultsCount() {
        resultsCount.textContent = filteredListings.length;
    }

    // Event listeners
    searchButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    categoryFilters.addEventListener('change', applyFilters);
    locationFilters.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', () => {
        sortListings();
        renderListings();
    });

    // Initial render
    updateResultsCount();
    sortListings();
    renderListings();
    updatePagination();
});
