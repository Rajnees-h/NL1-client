
import { FetchAllNews } from './index.js';
import { serverUrl } from './index.js';
import {fetchOneNews} from './readNews.js'


// Server Url
//const serverUrl = 'https://my-news-letter-h5vk.onrender.com/';

renderAllNews();
console.log('Add news started');
const addNewsButton = document.getElementById('addNews');
const cancelModalButton = document.getElementById('cancelModal');
const closeModalCrossButton = document.getElementById('closeModalCrossButton');
const submitModalButton = document.getElementById('submitNewsDetail')
console.log(addNewsButton);


addNewsButton.onclick = function(event){
    console.log('Add button on click', event.target.name, event.target.value);
    openModal(event);
}
cancelModalButton.onclick = function(){
    closeModal();
}
closeModalCrossButton.onclick = function(){
    closeModal();
}

submitModalButton.onclick = function(event){
    if(event.target.name == 'addNews'){
        storeNews();
        showToast('Successfully Added', 2000);
        renderAllNews();
    }else if(event.target.name == 'editNews'){
        updateNews();
        showToast('Successfully Updated', 2000);
        renderAllNews();
    }
    
}
console.log('Add news completed');


// JavaScript to handle modal functionality
var modal = document.getElementById('myModal');

async function openModal(event) {

  var news = {
    _id : undefined,
    heading : '',
    subHeading : '',
    detailNews : '',
    author : '',
    publicationDate : undefined,
    imageUrl : null,
    videoUrl : '',
    isHot : false,
    isPublished : false

  }

  var modalValues = {
    modalHeading :'Add News Details',
    modalSubmitButtonName : 'addNews',
    modalSubmitButtonText : 'Submit'
  }

console.log('open modal clicked', event.target.name, event.target.value)

 if(event.target.name == 'editNews'){

    // Update Modal Values here
    modalValues.modalHeading = 'Update News Details';
    modalValues.modalSubmitButtonName = 'editNews';
    modalValues.modalSubmitButtonText = 'Update';

    // populate the news fields with old data value make sure news id is aslo added in object
      
    try{
      var fetchedNews = await fetchOneNews(event.target.value);
    }catch(err){
      console.log('Not able to fetch the news');
      console.log('Error received : ', err);
    }
   
    console.log('News fetched from database : ')
    console.log(fetchedNews);

    news = fetchedNews;

}

    // Update Modal Values as well, like modal name and buttons value
    document.getElementById('modalHeading').innerText = modalValues.modalHeading;
    document.getElementById('submitNewsDetail').name = modalValues.modalSubmitButtonName;
    document.getElementById('submitNewsDetail').innerText = modalValues.modalSubmitButtonText;


    // populate the news fields with old data value make sure news id is aslo added in object
    document.getElementById('newsId').value = news._id;
    document.getElementById('heading').value = news.heading;
    document.getElementById('subHeading').value = news.subHeading;
    document.getElementById('detailNews').value = news.detailNews;
    document.getElementById('author').value = news.author;
    document.getElementById('publicationDate').value = Date(news.publicationDate);
    document.getElementById('imageUrl').value = "";//news.imageUrl;
    document.getElementById('videoUrl').value = news.videoUrl;
    document.getElementById('isHot').checked = news.isHot ;
    document.getElementById('isPublished').checked = news.isPublished;



  modal.style.display = 'block';

}

function closeModal() {
 
  modal.style.display = 'none';
}


// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}


// Add your storeNews() function implementation here
function storeNews() {

    console.log('Store news called');
    let news = {}
    
     news._id = undefined;
     news.heading = document.getElementById('heading').value;
     news.subHeading = document.getElementById('subHeading').value;
     news.detailNews = document.getElementById('detailNews').value;
     news.author = document.getElementById('author').value;
     news.publicationDate = document.getElementById('publicationDate').value;
     news.imageUrl = document.getElementById('imageUrl').value;
     news.videoUrl = document.getElementById('videoUrl').value;
     news.isHot = document.getElementById('isHot').checked;
     news.isPublished = document.getElementById('isPublished').checked;

     console.log('Store news added all data');
     console.log(news);

     try{
        insertNewsInDatabase(news);
     }catch{
        console.log('Failed to Insert data in database');
        alert('Failed to Insert');
     }

 

  closeModal(); // Close the modal after submission
}

// Add your updateNews() function implementation here
async function updateNews() {

    console.log('Update news called');
    let news = {}
    
     news._id = document.getElementById('newsId').value;
     news.heading = document.getElementById('heading').value;
     news.subHeading = document.getElementById('subHeading').value;
     news.detailNews = document.getElementById('detailNews').value;
     news.author = document.getElementById('author').value;
     news.publicationDate = document.getElementById('publicationDate').value;
     news.imageUrl = document.getElementById('imageUrl').value;
     news.videoUrl = document.getElementById('videoUrl').value;
     news.isHot = document.getElementById('isHot').checked;
     news.isPublished = document.getElementById('isPublished').checked;

     console.log('update news updated  all data');
     console.log(news);

     try{
        console.log('Trying to update News data');
       var updatedNews = await updateNewsInDatabase(news);
       console.log('Successfully updated')
     }catch{
        console.log('Failed to Update data in database');
        alert('Failed to Update');
     }

     console.log('Updated news :')
     console.log(updatedNews)

  closeModal(); // Close the modal after submission
}





async function renderAllNews(){
   
    const container = document.getElementById('render-all-news');
    container.innerHTML = '';
    var all_news = await FetchAllNews();
    all_news.forEach(news => {
        container.appendChild(createNewsPanel(news));
    });
    console.log('All news Fetched');
    console.log(all_news);
}




function createNewsPanel(news) {
    // Create main panel div
    var panelDiv = document.createElement("div");
    panelDiv.className = "panel panel-default";
  
    // Create panel heading div
    var headingDiv = document.createElement("div");
    headingDiv.className = "panel-heading";
  
    // Create panel title div
    var titleDiv = document.createElement("div");
    titleDiv.className = "panel-title";
  
    // Create anchor tag
    var anchorTag = document.createElement("a");
    anchorTag.setAttribute("data-toggle", "collapse");
    anchorTag.setAttribute("data-parent", "#read-all-news");
    anchorTag.setAttribute("href", "#"+news._id);
  
    // Create container-fixed div
    var containerDiv = document.createElement("div");
    containerDiv.className = "container-fixed mt-3";
  
    // Create row div
    var rowDiv = document.createElement("div");
    rowDiv.className = "row";
  
    // Create col-md-8 div
    var col8Div = document.createElement("div");
    col8Div.className = "col-md-8";
  
    // Create heading element
    var headingElement = document.createElement("h4");
    headingElement.textContent = news.heading;
  
    // Append heading element to col-md-8 div
    col8Div.appendChild(headingElement);
  
    // Create col-md-4 div
    var col4Div = document.createElement("div");
    col4Div.className = "col-md-4 text-right";
  
    // Create Button 1
    var button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.name = 'editNews';
    button1.value = news._id;
    button1.style.zIndex = 1;
    button1.onclick = function edit(event){
        console.log('Edit is clicked', event.target.name, event.target.value);
        console.log(this.value);
        console.log(event.target.value)
        openModal(event);
    }
    button1.className = "btn btn-primary";
    button1.textContent = "Edit";
  
    // Create Button 2
    var button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.value = news._id;
    button2.onclick = async function deleteNews(event){
      // Add one confirmation column to delete this news
      
        // Display a confirmation box
        var isConfirmed = window.confirm("Are you sure you want to delete this item?");
        // Check the user's choice
        if (isConfirmed) {
            // User clicked OK, perform the delete action
            console.log('Delete is clicked');
            console.log(this.value);
            console.log(event.target.value)
            await deleteNewsFromDatabase(event.target.value);
            showToast('Successfully Deleted', 2000);
            renderAllNews();
            
            showToast('Successfully Deleted', 2000);

        } else {
            // User clicked Cancel, do nothing or handle accordingly
            showToast('Deletion Canceled', 2000);

            
        }
    

        
    }
    button2.className = "btn btn-secondary ml-2";
    button2.textContent = "Delete";
  
    // Append buttons to col-md-4 div
    col4Div.appendChild(button1);
    col4Div.appendChild(button2);
  
    // Append col-md-8 and col-md-4 to the row div
    rowDiv.appendChild(col8Div);
    rowDiv.appendChild(col4Div);
  
    // Append row div to container-fixed div
    containerDiv.appendChild(rowDiv);
  
    // Append container-fixed div to anchor tag
    anchorTag.appendChild(containerDiv);
  
    // Append anchor tag to title div
    titleDiv.appendChild(anchorTag);
  
    // Append title div to heading div
    headingDiv.appendChild(titleDiv);
  
    // Append heading div to main panel div
    panelDiv.appendChild(headingDiv);
  
    // Create panel-collapse div
    var collapseDiv = document.createElement("div");
    collapseDiv.id = news._id;
    collapseDiv.className = "panel-collapse collapse";
  
    // Create panel body div
    var bodyDiv = document.createElement("div");
    bodyDiv.className = "panel-body";
    bodyDiv.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  
    // Append body div to collapse div
    collapseDiv.appendChild(bodyDiv);
  
    // Append collapse div to main panel div
    panelDiv.appendChild(collapseDiv);
  
    // Return the created panel
    return panelDiv;
  }


   // Function to show the popup/toast with a message for a specified duration
function showToast(message, duration) {
    console.log('Show toast called')
    const popup = document.getElementById('popup');
    popup.innerHTML = message;
    popup.style.display = 'block';
    
    setTimeout(hideTost,duration);

    console.log('Show Tost closed')
  }

  function hideTost(){
    console.log('Hide toast called')
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  }




//   function deleteNews(event){
//     console.log('delete is clicked');
//     console.log(this.value);
//     console.log(event.target.value)
//   }
  
//   function editNews(){
//     console.log('edit');
//   }

  
  


// function createNewsPanel(news) {
//     // Create elements
//     var panel = document.createElement('div');
//     panel.className = 'panel panel-default';

//     var panelHeading = document.createElement('div');
//     panelHeading.className = 'panel-heading';

//     var headingTitle = document.createElement('h4');
//     headingTitle.className = 'panel-title';

//     var anchor = document.createElement('a');
//     anchor.setAttribute('data-toggle', 'collapse');
//     anchor.setAttribute('data-parent', '#newsList');
//     anchor.setAttribute('href', '#'+news._id+'');
//     anchor.textContent = news.heading;

//     headingTitle.appendChild(anchor);
//     panelHeading.appendChild(headingTitle);

//     var panelCollapse = document.createElement('div');
//     panelCollapse.id = news._id;
//     panelCollapse.className = 'panel-collapse collapse';

//     var panelBody = document.createElement('div');
//     panelBody.className = 'panel-body';

//     var appDiv = document.createElement('div');
//     appDiv.id = 'app';

//     var mediaContainer = document.createElement('div');
//     mediaContainer.className = 'media-container';

//     var image = document.createElement('img');
//     image.src = 'path/to/news/image.jpg';
//     image.alt = 'News Image';

//     var video = document.createElement('video');
//     video.controls = true;
//     video.textContent = 'Your browser does not support the video tag.';
    
//     var videoSource = document.createElement('source');
//     videoSource.src = 'path/to/news/video.mp4';
//     videoSource.type = 'video/mp4';

//     video.appendChild(videoSource);
//     mediaContainer.appendChild(image);
//     mediaContainer.appendChild(video);
//     appDiv.appendChild(mediaContainer);

//     var h5 = document.createElement('h5');
//     var publisherDetails = document.createElement('span');
//     publisherDetails.id = 'publisher-details';
//     publisherDetails.className = 'glyphicon glyphicon-time';
//     h5.appendChild(publisherDetails);
//     h5.innerHTML += 'Post by Author Name, Sep 27, 2015.';

//     var subHeading = document.createElement('h3');
//     subHeading.id = 'sub-heading';
//     subHeading.textContent = 'News Subheading';

//     var newsDetail = document.createElement('p');
//     newsDetail.id = 'news-detail';
//     newsDetail.textContent = 'Details of the news go here.';

//     appDiv.appendChild(h5);
//     appDiv.appendChild(subHeading);
//     appDiv.appendChild(newsDetail);

//     panelBody.appendChild(appDiv);
//     panelCollapse.appendChild(panelBody);

//     panel.appendChild(panelHeading);
//     panel.appendChild(panelCollapse);

//     return panel;
//   }

    

// function storeNews() {
//   const newsData = {
//     heading: document.getElementById('heading').value,
//     subHeading: document.getElementById('subHeading').value,
//     detailNews: document.getElementById('detailNews').value,
//     author: document.getElementById('author').value,
//     publicationDate: document.getElementById('publicationDate').value,
//     imageUrl: document.getElementById('imageUrl').value,
//     videoUrl: document.getElementById('videoUrl').value,
//     isHotNews: document.getElementById('isHotNews').checked
//   };

// const news = 
//   {
//     "heading": "Hydroponics Revolution: Growing Food Without Soil",
//     "subHeading": "Vertical farming takes root with sustainable water-based systems",
//     "detailNews": "The future of agriculture is taking root in urban vertical farms, where leafy greens and herbs flourish without a single grain of soil. Hydroponics, the science of growing plants in nutrient-rich water solutions, is revolutionizing farming by minimizing water usage, reducing environmental impact, and increasing yields. Imagine rows of vibrant lettuce stacked high in a city center, bathed in controlled LED lighting and meticulously fed through precisely monitored water systems. This innovative approach not only offers a viable solution for food security in densely populated areas but also significantly reduces the carbon footprint associated with traditional farming methods.",
//     "author": "Dr. Sarah Jones",
//     "publicationDate": "2023-12-26",
//     "imageUrl": "images/news1.jpg",
//     "videoUrl": "https://youtu.be/AUnPAw-oQdQ?si=t0lUEm-PQumrGxl8",
//     "isHotNews": true
//   };
//   {
//     "heading": "Drones Patrol the Fields: Precision Agriculture Takes Flight",
//     "subHeading": "Unmanned aerial vehicles monitor crops and optimize resource usage",
//     "detailNews": "Imagine tiny, buzzing eyes scanning vast fields of golden wheat, meticulously collecting data on plant health, water distribution, and pest infestations. This futuristic vision is becoming a reality thanks to the integration of drones into modern agriculture. Equipped with high-resolution cameras and advanced sensors, these unmanned aerial vehicles provide farmers with real-time insights into their crops, allowing them to make precise decisions about irrigation, fertilization, and pest control. By pinpointing problem areas and applying resources only where needed, drones offer the potential to increase yields, reduce waste, and ultimately, create a more sustainable agricultural system.",
//     "author": "Max Thompson",
//     "publicationDate": "2023-12-25",
//     "imageUrl": "images/news2.jpeg",
//     "videoUrl": "https://youtu.be/AUnPAw-oQdQ?si=t0lUEm-PQumrGxl8",
//     "isHotNews": false
//   },
//   {
//     "heading": "CRISPR Editing for Superfoods: Engineering Crops for Enhanced Nutrition",
//     "subHeading": "Gene editing technology promises healthier, more resilient plants",
//     "detailNews": "The power of genetic engineering is being harnessed to create the next generation of superfoods. CRISPR, a revolutionary gene-editing tool, allows scientists to precisely modify plant DNA, potentially enhancing their nutritional content, resistance to disease, and tolerance to harsh environmental conditions. Imagine rice enriched with vitamin A, tomatoes with extended shelf life, or bananas naturally fortified with iron. These possibilities, once relegated to the realm of science fiction, are inching closer to reality thanks to CRISPR technology. While ethical considerations remain important, the potential benefits of CRISPR-edited crops for global food security and nutrition are undeniable.",
//     "author": "Dr. Alexia Lee",
//     "publicationDate": "2023-12-24",
//     "imageUrl": "images/news1.jpg",
//     "videoUrl": "https://youtu.be/AUnPAw-oQdQ?si=t0lUEm-PQumrGxl8",
//     "isHotNews": true
//   }
// ]


//   // You can perform further actions with the newsData, such as sending it to a server or storing it locally.
// insertNewsInDatabase(news)

//   alert('Successfully Added');

// }


async function insertNewsInDatabase(news){
await fetch(serverUrl+"create", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        const createdData = data;
        console.log(data);
        })
        .catch((error) => console.error("Error in creating News:", error));

 
}

async function deleteNewsFromDatabase(id){

    var news;
    await fetch(serverUrl+"delete/"+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          news = data; 
        })
        .catch((error) => console.error("Error in creating News:", error));
    
        console.log('This news is Deleted ');
        console.log(news);
    // Example: Show a popup/toast with the message "Hello, World!" for 2 seconds
    

}

async function updateNewsInDatabase(news){
    await fetch(serverUrl+"update", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    const createdData = data;
    console.log(data);
    })
    .catch((error) => console.error("Error in Updating News:", error));


    }



 
