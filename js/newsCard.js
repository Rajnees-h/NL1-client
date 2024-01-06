

function createNewsCard(){

// Create the main container div with class "col-lg-4 col-md-12 mb-4"
const mainDiv = document.createElement('div');
mainDiv.className = 'col-lg-4 col-md-12 mb-4';

// Create the card div with class "card"
const cardDiv = document.createElement('div');
cardDiv.className = 'card';

// Create the background image div with classes "bg-image hover-overlay ripple"
const bgImageDiv = document.createElement('div');
bgImageDiv.className = 'bg-image hover-overlay ripple';
bgImageDiv.setAttribute('data-mdb-ripple-color', 'light');

// Create the image element with the given source and class "img-fluid"
const imgElement = document.createElement('img');
imgElement.src = 'https://mdbootstrap.com/img/new/standard/nature/184.jpg';
imgElement.className = 'img-fluid';

// Create the anchor element with href "#"
const anchorElement = document.createElement('a');
anchorElement.href = '#';

// Create the mask div with inline style for background color
const maskDiv = document.createElement('div');
maskDiv.className = 'mask';
maskDiv.style.backgroundColor = 'rgba(251, 251, 251, 0.15)';

// Append the image and mask to the anchor element
anchorElement.appendChild(imgElement);
anchorElement.appendChild(maskDiv);

// Append the anchor element to the background image div
bgImageDiv.appendChild(anchorElement);

// Append the background image div to the card div
cardDiv.appendChild(bgImageDiv);

// Create the card body div with class "card-body"
const cardBodyDiv = document.createElement('div');
cardBodyDiv.className = 'card-body';

// Create the heading and paragraph elements with sample content
const headingElement = document.createElement('h5');
headingElement.className = 'card-title';
headingElement.textContent = 'Post title';

const paragraphElement = document.createElement('p');
paragraphElement.className = 'card-text';
paragraphElement.textContent = "Some quick example text to build on the card title and make up the bulk of the card's content.";

// Create the button element with id "readNewsButton" and class "btn btn-primary"
const buttonElement = document.createElement('button');
buttonElement.id = 'readNewsButton';
buttonElement.value = '1';
buttonElement.className = 'btn btn-primary';
buttonElement.textContent = 'Read News';

// Append heading, paragraph, and button elements to the card body div
cardBodyDiv.appendChild(headingElement);
cardBodyDiv.appendChild(paragraphElement);
cardBodyDiv.appendChild(buttonElement);

// Append the card body div to the card div
cardDiv.appendChild(cardBodyDiv);

// Append the card div to the main container div
mainDiv.appendChild(cardDiv);

// Append the main container div to the document body or any desired parent element
document.body.appendChild(mainDiv);

return mainDiv;

}