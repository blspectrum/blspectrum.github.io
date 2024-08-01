document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('article');
    const wordCount = article.innerText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

    const timeElement = document.createElement('p');
    timeElement.textContent = `Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
    article.insertBefore(timeElement, article.firstChild);
});