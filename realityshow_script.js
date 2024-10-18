document.addEventListener('DOMContentLoaded', function() {
    const articleList = document.getElementById('article-list');
    const articles = [
        { id: 'realityshow_article1', title: 'Top 10 BL Reality Shows of 2024' },
        { id: 'realityshow_article2', title: 'Behind the Scenes: Making of a BL Reality Show' },
        { id: 'realityshow_article3', title: 'Interview with BL Reality Show Star' }
    ];

    articles.forEach(article => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `article_template.html?id=${article.id}`;
        a.textContent = article.title;
        li.appendChild(a);
        articleList.appendChild(li);
    });

    // Update the newest article link
    const newestArticle = articles[0]; // Assuming the first article is the newest
    const newestArticleLink = document.querySelector('#newest-update h3 a');
    if (newestArticleLink) {
        newestArticleLink.href = `article_template.html?id=${newestArticle.id}`;
        newestArticleLink.textContent = newestArticle.title;
    }
});