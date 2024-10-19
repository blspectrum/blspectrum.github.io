document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const articleList = document.getElementById('articleList');
    const articles = articleList.getElementsByTagName('li');

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();

        for (let i = 0; i < articles.length; i++) {
            const articleText = articles[i].textContent.toLowerCase();
            if (articleText.includes(filter)) {
                articles[i].style.display = ''; // Show the article
            } else {
                articles[i].style.display = 'none'; // Hide the article
            }
        }
    });
});
