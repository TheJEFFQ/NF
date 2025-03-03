document.addEventListener('DOMContentLoaded', () => {
    const resultsGrid = document.getElementById('searchResults');
    const sortSelect = document.getElementById('sortSelect');
    const resultsCount = document.getElementById('resultsCount');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    let filteredListings = [...mockListings];

    // Filter handlers
    const categoryFilters = document.querySelectorAll('input[type="checkbox"]');
    const locationSelect = document.querySelector('.location-select');
    const priceMin = document.querySelector('.price-min');
    const priceMax = document.querySelector('.price-max');
    const conditionRadios = document.querySelectorAll('input[name="condition"]');
    
    function applyFilters() {
        loadingSpinner.style.display = 'flex';
        
        // Simulate loading delay
        setTimeout(() => {
            const selectedCategories = Array.from(categoryFilters)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            const selectedLocation = locationSelect.value;
            const minPrice = priceMin.value ? Number(priceMin.value) : 0;
            const maxPrice = priceMax.value ? Number(priceMax.value) : Infinity;
            const selectedCondition = document.querySelector('input[name="condition"]:checked').value;
            
            filteredListings = mockListings.filter(listing => {
                const categoryMatch = selectedCategories.length === 0 || 
                    selectedCategories.includes(listing.category);
                const locationMatch = !selectedLocation || 
                    listing.location.toLowerCase() === selectedLocation;
                const priceMatch = listing.price >= minPrice && 
                    listing.price <= maxPrice;
                const conditionMatch = selectedCondition === 'any' || 
                    listing.condition === selectedCondition;
                
                return categoryMatch && locationMatch && priceMatch && conditionMatch;
            });
            
            sortListings();
            renderListings();
            loadingSpinner.style.display = 'none';
        }, 500);
    }
    
    function sortListings() {
        const sortValue = sortSelect.value;
        
        filteredListings.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'popular':
                    return b.views - a.views;
                case 'newest':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
    }
    
    function renderListings() {
        resultsCount.textContent = filteredListings.length;
        resultsGrid.innerHTML = filteredListings.map(listing => `
            <div class="listing-card">
                <div class="listing-image">
                    <img src="${listing.image}" alt="${listing.title}">
                </div>
                <div class="listing-details">
                    <h3>${listing.title}</h3>
                    <p class="price">R ${listing.price.toLocaleString()}</p>
                    <p class="location"><i class="fas fa-location-dot"></i> ${listing.location}</p>
                    <div class="listing-meta">
                        <span><i class="fas fa-eye"></i> ${listing.views} views</span>
                        <span><i class="fas fa-calendar"></i> ${listing.date}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Event listeners
    categoryFilters.forEach(cb => cb.addEventListener('change', applyFilters));
    locationSelect.addEventListener('change', applyFilters);
    priceMin.addEventListener('input', applyFilters);
    priceMax.addEventListener('input', applyFilters);
    conditionRadios.forEach(radio => radio.addEventListener('change', applyFilters));
    sortSelect.addEventListener('change', () => {
        sortListings();
        renderListings();
    });
    
    // Clear filters
    document.querySelector('.clear-filters').addEventListener('click', () => {
        categoryFilters.forEach(cb => cb.checked = false);
        locationSelect.value = '';
        priceMin.value = '';
        priceMax.value = '';
        document.querySelector('input[value="any"]').checked = true;
        applyFilters();
    });
    
    // Mobile filters toggle
    const filtersToggle = document.createElement('button');
    filtersToggle.className = 'filters-toggle';
    filtersToggle.innerHTML = '<i class="fas fa-filter"></i>';
    document.body.appendChild(filtersToggle);
    
    filtersToggle.addEventListener('click', () => {
        document.querySelector('.filters-sidebar').classList.toggle('active');
    });
    
    // Initial render
    applyFilters();
});

document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initLocation();
    initRecentSearches();
});

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (searchInput && searchSuggestions) {
        // Show suggestions when input is focused
        searchInput.addEventListener('focus', () => {
            searchSuggestions.classList.add('active');
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });
        
        // Handle input changes
        searchInput.addEventListener('input', debounce(() => {
            const query = searchInput.value.trim();
            if (query) {
                // Show clear button
                clearSearchBtn.style.display = 'block';
                // Fetch and display suggestions (implement API call here)
                fetchSuggestions(query);
            } else {
                clearSearchBtn.style.display = 'none';
                showDefaultSuggestions();
            }
        }, 300));
        
        // Clear search
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearSearchBtn.style.display = 'none';
                showDefaultSuggestions();
                searchInput.focus();
            });
        }
    }
}

function initLocation() {
    const locationInput = document.getElementById('locationInput');
    const locationSuggestions = document.getElementById('locationSuggestions');
    const useLocationBtn = document.getElementById('useLocation');
    
    if (locationInput && locationSuggestions) {
        // Show suggestions when input is focused
        locationInput.addEventListener('focus', () => {
            locationSuggestions.classList.add('active');
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!locationInput.contains(e.target) && !locationSuggestions.contains(e.target)) {
                locationSuggestions.classList.remove('active');
            }
        });
        
        // Handle input changes
        locationInput.addEventListener('input', debounce(() => {
            const query = locationInput.value.trim();
            if (query) {
                // Fetch and display location suggestions (implement API call here)
                fetchLocationSuggestions(query);
            } else {
                showDefaultLocations();
            }
        }, 300));
        
        // Use current location
        if (useLocationBtn) {
            useLocationBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    useLocationBtn.disabled = true;
                    useLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            // Get location name from coordinates (implement reverse geocoding here)
                            reverseGeocode(position.coords.latitude, position.coords.longitude)
                                .then(locationName => {
                                    locationInput.value = locationName;
                                })
                                .finally(() => {
                                    useLocationBtn.disabled = false;
                                    useLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                                });
                        },
                        error => {
                            console.error('Error getting location:', error);
                            showNotification('Could not get your location. Please try entering it manually.', 'error');
                            useLocationBtn.disabled = false;
                            useLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                        }
                    );
                } else {
                    showNotification('Geolocation is not supported by your browser.', 'error');
                }
            });
        }
    }
}

function initRecentSearches() {
    // Load recent searches from localStorage
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    updateRecentSearchesList(recentSearches);
    
    // Handle clicks on recent searches
    document.querySelectorAll('.suggestion-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const searchText = link.textContent.trim();
            document.getElementById('searchInput').value = searchText;
            // Trigger search
            performSearch(searchText);
        });
    });
}

function updateRecentSearchesList(searches) {
    const recentSearchesList = document.querySelector('.recent-searches .suggestion-list');
    if (recentSearchesList) {
        recentSearchesList.innerHTML = searches
            .map(search => `
                <li>
                    <a href="#">
                        <i class="fas fa-search"></i>
                        ${search}
                    </a>
                </li>
            `)
            .join('');
    }
}

function addToRecentSearches(searchQuery) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    // Remove if already exists and add to the beginning
    recentSearches = recentSearches.filter(search => search !== searchQuery);
    recentSearches.unshift(searchQuery);
    // Keep only last 5 searches
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    updateRecentSearchesList(recentSearches);
}

// Helper Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// API Mock Functions (replace with actual API calls)
async function fetchSuggestions(query) {
    // Implement API call for search suggestions
    console.log('Fetching suggestions for:', query);
}

async function fetchLocationSuggestions(query) {
    // Implement API call for location suggestions
    console.log('Fetching location suggestions for:', query);
}

async function reverseGeocode(lat, lng) {
    // Implement reverse geocoding
    return 'Cape Town, South Africa';
}

function performSearch(query) {
    // Implement search functionality
    console.log('Performing search for:', query);
    addToRecentSearches(query);
}

function showDefaultSuggestions() {
    // Show default suggestions (recent searches and popular categories)
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
        searchSuggestions.classList.add('active');
    }
}

function showDefaultLocations() {
    // Show default locations
    const locationSuggestions = document.getElementById('locationSuggestions');
    if (locationSuggestions) {
        locationSuggestions.classList.add('active');
    }
}
