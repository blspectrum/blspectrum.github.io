document.addEventListener('DOMContentLoaded', function() {
    // not used
    const articleId = 'article1'; // You can set this dynamically based on which article is being viewed
    
    fetch(`articles/${articleId}.txt`)
        .then(response => response.text())
        .then(content => {
            const lines = content.split('\n');
            const title = lines[0].replace('Title: ', '');
            const image = lines[1].replace('Image: ', '');
            const date = lines[2].replace('Date: ', '');
            const articleContent = lines.slice(4).join('\n'); // Skip the first 4 lines (title, image, date, and blank line)

            document.getElementById('articleTitle').textContent = title;
            document.getElementById('articleImage').src = `images/${image}`;
            document.getElementById('articleImage').alt = title;
            document.querySelector('.publication-date time').textContent = date;
            document.querySelector('.publication-date time').setAttribute('datetime', date);
            document.getElementById('articleContent').innerHTML = articleContent;

            // Calculate reading time
            const wordCount = articleContent.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200);
            const timeElement = document.createElement('p');
            timeElement.textContent = `Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
            document.getElementById('articleContent').insertBefore(timeElement, document.getElementById('articleContent').firstChild);
        })
        .catch(error => console.error('Error loading article content:', error));
});