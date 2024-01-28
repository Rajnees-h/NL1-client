export function createArticleComponent(news) {
    // Create main container
    var container = document.createElement('div');
    container.className = 'container-fluid';

    // Create row
    var row = document.createElement('div');
    row.className = 'row';

    // Create article container column
    var articleContainer = document.createElement('div');
    articleContainer.className = 'col-xs-12 article-container';

    // Create article title
    // var articleTitle = document.createElement('h1');
    // articleTitle.className = 'text-center';
    // articleTitle.textContent = 'Beautiful Article Title';

    // Create subtitle
    var subtitle = document.createElement('h4');
    subtitle.className = 'text-center';
    subtitle.textContent = news.subeading;

    // Create article details
    var articleDetails = document.createElement('div');
    articleDetails.className = 'article-details text-center';

    // Add published date and author
    var publishedDate = document.createElement('p');
    publishedDate.textContent = 'Published on '+String(news.publishedDate).slice(0,10)+' | Author: '+news.author;

    // // Add category label
    // var categoryLabel = document.createElement('p');
    // categoryLabel.className = 'category-label';
    // categoryLabel.textContent = 'Category: Web Development';

    // Create article image
    var articleImage = document.createElement('img');
    articleImage.src = news.imageUrl;
    articleImage.className = 'img-responsive medium-img';
    articleImage.alt = 'Article Image';

    // Create paragraphs for article content
    var paragraph1 = document.createElement('p');
    paragraph1.textContent = news.detailNews;

    // var paragraph2 = document.createElement('p');
    // paragraph2.textContent = 'Integer sit amet nulla nec nulla bibendum commodo. Proin euismod, libero id commodo euismod, sapien...';

    // Continue with more paragraphs if needed

    // Create article footer
    var articleFooter = document.createElement('div');
    articleFooter.className = 'article-footer';

    // Create article status
    var articleStatus = document.createElement('div');
    articleStatus.className = 'article-status';

    var footerline = '';

    if(news.isPublished){
        footerline = 'The article has been published.';
        if(news.isHot){
            footerline = 'The article has been published and is trending now.';
        }
    } else{
        footerline = 'This article has not been published yet.';
    }

    articleStatus.textContent = footerline;

    // Append elements to build the structure
    articleDetails.appendChild(publishedDate);
    //articleDetails.appendChild(categoryLabel);

    // articleContainer.appendChild(articleTitle);
    articleContainer.appendChild(subtitle);
    articleContainer.appendChild(articleDetails);
    articleContainer.appendChild(articleImage);
    articleContainer.appendChild(paragraph1);
    // articleContainer.appendChild(paragraph2);
    // Continue appending more paragraphs if needed

    articleFooter.appendChild(articleStatus);

    articleContainer.appendChild(articleFooter);

    row.appendChild(articleContainer);
    container.appendChild(row);

    // Apply CSS styles

    // Body styles
    document.body.style.backgroundColor = '#f8f8f8';
    document.body.style.fontFamily = "'Helvetica Neue', sans-serif";
    document.body.style.color = '#555';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Article container styles
    articleContainer.style.backgroundColor = '#fff';
    articleContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    articleContainer.style.padding = '20px';
    articleContainer.style.margin = '0 auto';
    articleContainer.style.borderRadius = '8px';
    articleContainer.style.maxWidth = '100%';

    // Heading styles
    // articleTitle.style.color = '#333';
    subtitle.style.color = '#333';

    // Image styles
    articleImage.style.maxWidth = '100%';
    articleImage.style.height = '250px';
    articleImage.style.borderRadius = '8px';
    articleImage.style.margin = '0 auto 20px';
    articleImage.style.display = 'block';

    // Paragraph styles
    Array.from(articleContainer.getElementsByTagName('p')).forEach(p => {
        p.style.lineHeight = '1.6';
        if (p.parentElement.className === 'article-details') {
            p.style.marginBottom = '5px';
        }
    });

    // // Category label styles
    // categoryLabel.style.backgroundColor = '#5bc0de';
    // categoryLabel.style.color = '#fff';
    // categoryLabel.style.padding = '5px 10px';
    // categoryLabel.style.borderRadius = '4px';
    // categoryLabel.style.fontWeight = 'bold';

    // Article footer styles
    articleFooter.style.marginTop = '30px';
    articleFooter.style.borderTop = '1px solid #ddd';
    articleFooter.style.paddingTop = '15px';
    articleFooter.style.textAlign = 'center';

    // Article status styles
    articleStatus.style.fontWeight = 'bold';

    return container;
}

