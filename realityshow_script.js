document.addEventListener('DOMContentLoaded', async function() {
    const articleList = document.getElementById('article-list');
    const newestUpdateSection = document.querySelector('#newest-update article');
    const articles = [
        { id: 'realityshow_article1' },
        { id: 'realityshow_article2' },
        { id: 'realityshow_article3' },
        { id: 'realityshow_article4' },
        { id: 'realityshow_article5' }
    ];

    for (const article of articles) {
        try {
            const response = await fetch(`realityshow_article/${article.id}.txt`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${article.id}`);
            }
            const text = await response.text();
            const { title, excerpt } = extractArticleInfo(text);
            article.title = title;
            article.excerpt = excerpt;
        } catch (error) {
            console.error(error);
            article.title = 'Article Title Not Available';
            article.excerpt = 'Excerpt not available.';
        }
    }

    // Update the newest article
    const newestArticle = articles[0]; // Assuming the first article is the newest
    if (newestUpdateSection) {
        const newestArticleLink = newestUpdateSection.querySelector('h3 a');
        const newestArticleExcerpt = newestUpdateSection.querySelector('p');
        if (newestArticleLink) {
            newestArticleLink.href = `article_template.html?id=${newestArticle.id}`;
            newestArticleLink.textContent = newestArticle.title;
        }
        if (newestArticleExcerpt) {
            newestArticleExcerpt.textContent = newestArticle.excerpt;
        }
    }

    // Populate the article list
    articles.forEach(article => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `article_template.html?id=${article.id}`;
        a.textContent = article.title;
        li.appendChild(a);
        articleList.appendChild(li);
    });
});

function extractArticleInfo(text) {
    const lines = text.split('\n');
    let title = 'Untitled Article';
    let excerpt = 'No excerpt available.';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('Title:')) {
            title = line.substring(6).trim();
        } else if (line === '') {
            // Assume the first non-empty line after a blank line is the start of the content
            excerpt = lines[i + 1] ? lines[i + 1].trim() : excerpt;
            break;
        }
    }

    return { title, excerpt };
}