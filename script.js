document.addEventListener('DOMContentLoaded', () => {
    const flagContainer = document.getElementById('flag-container');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const countryNameEl = document.getElementById('country-name');
    const continentEl = document.getElementById('continent');
    const populationEl = document.getElementById('population');
    const statesEl = document.getElementById('states');
    const independentEl = document.getElementById('independent');

    // Fetch data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            // Sort countries by name for consistent ordering
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Create flag items
            countries.forEach(country => {
                const flagItem = document.createElement('div');
                flagItem.classList.add('flag-item');

                const img = document.createElement('img');
                img.src = country.flags.png; // Using PNG flag
                img.alt = `${country.name.common} flag`;
                flagItem.appendChild(img);

                const info = document.createElement('div');
                info.classList.add('flag-info');
                const h3 = document.createElement('h3');
                h3.textContent = country.name.common;
                info.appendChild(h3);
                flagItem.appendChild(info);

                // Add click event to show modal
                flagItem.addEventListener('click', () => {
                    showCountryDetails(country);
                });

                flagContainer.appendChild(flagItem);
            });
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
            flagContainer.innerHTML = '<p>Failed to load countries. Please try again later.</p>';
        });

    function showCountryDetails(country) {
        countryNameEl.textContent = country.name.common;

        // Continent: we use the region property (which is like continent) or subregion?
        // The API has: region (e.g., Africa, Americas, etc.) and subregion.
        // We'll use region for continent.
        continentEl.textContent = country.region || 'N/A';

        // Population
        populationEl.textContent = country.population ? country.population.toLocaleString() : 'N/A';

        // Number of States/Provinces: we don't have this directly in the API.
        // We can look for subregion? But that's not states.
        // Alternatively, we can look at the 'borders' property? That gives neighboring countries, not states.
        // The API does not provide states/provinces.
        // We'll show N/A for now.
        statesEl.textContent = 'N/A';

        // Independent
        independentEl.textContent = country.independent ? 'Yes' : 'No';

        // Show modal
        modal.style.display = 'flex';
    }

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});