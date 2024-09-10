document.addEventListener('DOMContentLoaded', function() {
    const articleList = document.getElementById('article-list');
    const articles = [
        { title: 'Top 10 BL Reality Shows of 2024', url: 'realityshow_article/realityshow_article1.html' },
        { title: 'Behind the Scenes: Making of a BL Reality Show', url: 'article3.html' },
        { title: 'Interview with BL Reality Show Star', url: 'article4.html' }
    ];

    articles.forEach(article => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = article.url;
        a.textContent = article.title;
        li.appendChild(a);
        articleList.appendChild(li);
    });
});