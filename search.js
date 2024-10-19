// document.addEventListener('DOMContentLoaded', function() {
//     const searchInput = document.getElementById('searchInput');
//     const articleList = document.getElementById('articleList');
//     const articles = articleList.getElementsByTagName('li');

//     searchInput.addEventListener('input', function() {
//         const filter = searchInput.value.toLowerCase();

//         for (let i = 0; i < articles.length; i++) {
//             const articleText = articles[i].textContent.toLowerCase();
//             if (articleText.includes(filter)) {
//                 articles[i].style.display = ''; // Show the article
//             } else {
//                 articles[i].style.display = 'none'; // Hide the article
//             }
//         }
//     });
// });
//////////////////

// document.addEventListener('DOMContentLoaded', function() {
//     const searchInput = document.getElementById('searchInput');
//     const articleContainer = document.getElementById('articleContainer');
//     const articles = articleContainer.getElementsByTagName('h1'); // Adjust if necessary

//     function filterArticles(query) {
//         const filter = query.toLowerCase();

//         for (let i = 0; i < articles.length; i++) {
//             const articleText = articles[i].textContent.toLowerCase();
//             if (articleText.includes(filter)) {
//                 articles[i].style.display = ''; // Show the article
//             } else {
//                 articles[i].style.display = 'none'; // Hide the article
//             }
//         }
//     }

//     searchInput.addEventListener('input', function() {
//         filterArticles(searchInput.value);
//     });

//     // Expose the function to the global scope for the button
//     window.performSearch = function() {
//         filterArticles(searchInput.value);
//     };
// });
///////////////

// document.addEventListener('DOMContentLoaded', function() {
//     const searchInput = document.getElementById('search');
//     const articleContainer = document.getElementById('articleContainer');
    
//     // Store articles in an array if you want to search through them
//     let articles = [];

//     // Function to load article titles (this could be from another source)
//     async function loadArticleTitles() {
//         try {
//             const response = await fetch('../articles_list.json'); // Change this to your actual path
//             articles = await response.json(); // Assuming the JSON is an array of titles
//         } catch (error) {
//             console.error('Error loading article titles:', error);
//         }
//     }

//     // Search function
//     function filterArticles(query) {
//         const filter = query.toLowerCase();
        
//         // If you have a method of displaying titles, you can filter here
//         const filteredArticles = articles.filter(article => 
//             article.title.toLowerCase().includes(filter)
//         );

//         // Update the display based on filteredArticles
//         // Implement the logic to show/hide articles based on the search
//     }

//     // Event listener for input
//     searchInput.addEventListener('input', function() {
//         filterArticles(searchInput.value);
//     });

//     // Expose the function to the global scope for the button
//     window.performSearch = function() {
//         filterArticles(searchInput.value);
//     };

//     // Load article titles when the page is loaded
//     loadArticleTitles();
// });
////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');

    function filterArticles(query) {
        const filter = query.toLowerCase();

        // Filter articles based on title or content
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(filter) || 
            article.content.toLowerCase().includes(filter)
        );

        // Update the display based on filtered articles
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

    searchInput.addEventListener('input', function() {
        filterArticles(searchInput.value);
    });

    // Expose the function to the global scope for the button
    window.performSearch = function() {
        filterArticles(searchInput.value);
    };
});
