// article/load_article.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const query = urlParams.get('query'); // Get the search query

     // Debugging line to check the value of articleId
     console.log("Article ID:", articleId); 

    if (articleId) {
        await loadArticle(articleId);
    } else {
        displayError("No article ID specified");
    }

    if (query) {
        // Load or filter articles based on the query
        filterArticles(query); // Make sure this function is defined to handle the filtering
    }
});

async function loadArticle(articleId) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const articleContainer = document.getElementById('articleContainer');

    try {
        loadingIndicator.style.display = 'block';
        
        const response = await fetch(`../realityshow_article/${articleId}.txt`);
        if (!response.ok) {
            throw new Error('Article not found');
        }
        
        const articleText = await response.text();
        const articleData = parseArticleText(articleText);

        // Store article data in the global array
        articles.push({
            id: articleId,
            title: articleData.title,
            content: articleData.content
        });
        
        document.title = `${articleData.title} - BL Spectrum`;
        document.getElementById('articleTitle').textContent = articleData.title;
        document.getElementById('publicationDate').textContent = new Date(articleData.date).toLocaleDateString();
        document.getElementById('publicationDate').setAttribute('datetime', articleData.date);
        document.getElementById('articleImage').src = articleData.image;
        document.getElementById('articleImage').alt = articleData.title;
        document.getElementById('articleContent').innerHTML = articleData.content;

        loadingIndicator.style.display = 'none';
        articleContainer.style.display = 'block';
    } catch (error) {
        displayError(error.message);
    }

}

function parseArticleText(text) {
    const lines = text.split('\n');
    let articleData = {
        title: '',
        image: '',
        date: '',
        content: ''
    };

    let contentStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('Title:')) {
            articleData.title = line.substring(6).trim();
        } else if (line.startsWith('Image:')) {
            articleData.image = line.substring(6).trim();
        } else if (line.startsWith('Date:')) {
            articleData.date = line.substring(5).trim();
        } else if (line === '') {
            contentStartIndex = i + 1;
            break;
        }
    }

    articleData.content = lines.slice(contentStartIndex).join('\n')
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.trim()}</p>`)
        .join('');

    return articleData;
}

function displayError(message) {
    const articleContainer = document.getElementById('articleContainer');
    articleContainer.innerHTML = `<p class="error">Error: ${message}</p>`;
}