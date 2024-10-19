let articles = []; // Ensure this is defined globally

async function loadArticles() {
    // Load your articles here, populating the global `articles` array.
    try {
        const response = await fetch('../articles_list.json'); // Update the path as necessary
        articles = await response.json();
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

function filterArticles(query) {
    const filter = query.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(filter) || 
        article.content.toLowerCase().includes(filter)
    );

    displayFilteredArticles(filteredArticles);
}

function displayFilteredArticles(filteredArticles) {
    const articleContainer = document.getElementById('articleContainer');
    articleContainer.innerHTML = ''; // Clear current articles

    if (filteredArticles.length === 0) {
        articleContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    // Display filtered articles
    filteredArticles.forEach(article => {
        const h1 = document.createElement('h1');
        h1.textContent = article.title;
        const p = document.createElement('p');
        p.innerHTML = article.content; // Display content
        articleContainer.appendChild(h1);
        articleContainer.appendChild(p);
    });
}

// Perform search function
window.performSearch = function() {
    const query = document.getElementById('search').value;
    if (query) {
        const searchUrl = `search.html?query=${encodeURIComponent(query)}`;
        window.location.href = searchUrl; // Redirect to search.html
    }
};

document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search');

    await loadArticles(); // Load articles on page load

    searchInput.addEventListener('input', function() {
        filterArticles(searchInput.value);
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch(); // Call your search function
        }
    });

    // Check for query parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        filterArticles(query); // Use the query to filter articles
    }
});

console.log(articles); // Debugging line
