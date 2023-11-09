document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('search-city').value;
        const name = document.getElementById('search-name').value;
        const type = document.getElementById('search-type').value;
        searchBreweries(city, name, type);
    });
});

function searchBreweries(city, name, type) {
    let baseUrl = 'https://api.openbrewerydb.org/breweries';
    let queryParts = [];
    if (city) queryParts.push(`by_city=${encodeURIComponent(city)}`);
    if (name) queryParts.push(`by_name=${encodeURIComponent(name)}`);
    if (type) queryParts.push(`by_type=${encodeURIComponent(type)}`);
    let queryString = queryParts.join('&');

    fetch(`${baseUrl}?${queryString}`)
        .then(response => response.json())
        .then(breweries => {
            displayBreweries(breweries);
        })
        .catch(error => {
            console.error('Error searching breweries:', error);
        });
}

function displayBreweries(breweries) {
    const listElement = document.getElementById('brewery-list');
    listElement.innerHTML = ''; 

    breweries.forEach(brewery => {
        const item = document.createElement('div');
        item.className = 'brewery-item';
        item.innerHTML = `
            <h2>${brewery.name}</h2>
            <p>Address: ${brewery.street || 'N/A'}, ${brewery.city}, ${brewery.state}</p>
            <p>Phone: ${brewery.phone || 'N/A'}</p>
            <p>Website: ${brewery.website_url ? `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>` : 'N/A'}</p>
            <p>Location: ${brewery.city}, ${brewery.state}</p>
            <button class="btn btn-primary" onclick="showBreweryDetails('${brewery.id}')">View Details</button>
        `;
        listElement.appendChild(item);
    });
}


function showBreweryDetails(breweryId) {
    // Fetch details from the public API
    fetch(`https://api.openbrewerydb.org/breweries/${breweryId}`)
        .then(response => response.json())
        .then(brewery => {
            // Fetch rating from your Spring Boot backend
            fetch(`http://localhost:8080/api/reviews/${breweryId}`)
                .then(ratingResponse => {
                    if (ratingResponse.ok) {
                        return ratingResponse.json();
                    } else {
                        throw new Error('Rating not found');
                    }
                })
                .then(ratingData => {
                    // Now merge the rating data with the brewery details
                    displayBreweryWithRating(brewery, ratingData);
                })
                .catch(() => {
                    // If the rating does not exist, proceed with null rating
                    displayBreweryWithRating(brewery, null);
                });
        })
        .catch(error => {
            console.error('Error fetching brewery details:', error);
        });
}

function displayBreweryWithRating(brewery, review) {
    const detailsModal = document.getElementById('brewery-details-modal');
    const detailsContent = document.getElementById('brewery-details-content');
    const ratingText = review ? `Rating: ${review.rating}` : 'No reviews yet';
    const descriptionText = review ? `Review: ${review.description}` : 'No review description available';
    const createdAtText = review ? `Reviewed on: ${new Date(review.createdAt).toLocaleString()}` : '';

    detailsContent.innerHTML = `
        <div class="modal-header">
            <h2>${brewery.name}</h2>
            <button class="modal-close-button" onclick="closeDetailsModal()">&times;</button>
        </div>
        <p>${brewery.street}, ${brewery.city}, ${brewery.state}</p>
        <p>${ratingText}</p>
        <p>${descriptionText}</p>
        <p>${createdAtText}</p>
        <textarea id="review-description" placeholder="Enter your review"></textarea>
        <input type="number" id="review-rating" min="1" max="5" placeholder="Rate 1-5">
        <button onclick="submitReview('${brewery.id}')">Add Review</button>
    `;
    detailsModal.style.display = 'flex';
}

function submitReview(breweryId) {
    const reviewDescription = document.getElementById('review-description').value;
    const reviewRating = document.getElementById('review-rating').value;
    const reviewData = {
        breweryId: breweryId, // Updated field name to match Spring Boot entity
        description: reviewDescription,
        rating: parseInt(reviewRating, 10),
        createdAt: new Date().toISOString() // Assuming this is handled by the backend if not provided
    };

    //spring boot api
    fetch(`http://localhost:8080/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to submit review');
        }
    })
    .then(data => {
        alert('Review submitted successfully!');
        closeDetailsModal();
        // Optionally refresh the details to show the new rating
        showBreweryDetails(breweryId);
    })
    .catch(error => {
        console.error('Error submitting review:', error);
        alert('Failed to submit review.');
    });
}

function closeDetailsModal() {
    document.getElementById('brewery-details-modal').style.display = 'none';
}
