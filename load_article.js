document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    fetch(`articles/${articleId}.txt`)
        .then(response => response.text())
        .then(content => {
            const lines = content.split('\n');
            const title = lines[0].replace('Title: ', '');
            const image = lines[1].replace('Image: ', '');
            const date = lines[2].replace('Date: ', '');
            const articleContent = lines.slice(4).join('\n');

            document.title = `${title} - BL Spectrum`;
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