document.addEventListener('DOMContentLoaded', () => {
    const flagContainer = document.getElementById('flag-container');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const countryNameEl = document.getElementById('country-name');
    const continentEl = document.getElementById('continent');
    const populationEl = document.getElementById('population');
    const statesEl = document.getElementById('states');
    const independentEl = document.getElementById('independent');

    // Fetch data from the alternative dataset
    fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
        .then(response => response.json())
        .then(countries => {
            // Sort countries by name for consistent ordering
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Create flag items
            countries.forEach(country => {
                const flagItem = document.createElement('div');
                flagItem.classList.add('flag-item');

                const img = document.createElement('img');
                // Use flagcdn.com for flag images
                img.src = `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`;
                img.alt = `${country.name.common} flag`;
                flagItem.appendChild(img);

                const info = document.createElement('div');
                info.classList.add('flag-info');
                const h3 = document.createElement('h3');
                h3.textContent = country.name.common;
                info.appendChild(h3);
                flagItem.appendChild(info);

                // Store the country data for use in the modal
                flagItem.countryData = {
                    name: country.name.common,
                    continent: country.region || 'N/A',
                    population: 'N/A', // Dataset doesn't have population
                    states: 'N/A', // Dataset doesn't have states/provinces
                    independent: country.independent ? 'Yes' : 'No'
                };

                // Add click event to show modal
                flagItem.addEventListener('click', () => {
                    showCountryDetails(flagItem.countryData);
                });

                flagContainer.appendChild(flagItem);
            });
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
            flagContainer.innerHTML = '<p>Failed to load countries. Please try again later.</p>';
        });

    function showCountryDetails(data) {
        countryNameEl.textContent = data.name;
        continentEl.textContent = data.continent;
        populationEl.textContent = data.population;
        statesEl.textContent = data.states;
        independentEl.textContent = data.independent;

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