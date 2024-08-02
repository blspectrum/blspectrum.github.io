// document.addEventListener('DOMContentLoaded', function() {
//     const article = document.querySelector('article');
//     const wordCount = article.innerText.split(/\s+/).length;
//     const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

//     const timeElement = document.createElement('p');
//     timeElement.textContent = `Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
//     article.insertBefore(timeElement, article.firstChild);
// });

document.addEventListener('DOMContentLoaded', function() {
    fetch('../realityshow_article/realityshow_article1.txt')
        .then(response => response.text())
        .then(content => {
            document.getElementById('articleContent').innerHTML = content;
        })
        .catch(error => console.error('Error loading article content:', error));

    // You can also load other elements dynamically
    document.getElementById('articleTitle').textContent = 'Your Dynamic Article Title';
    document.getElementById('articleImage').src = 'images/article1-image.jpg';
    document.getElementById('articleImage').alt = 'Description of image';
});