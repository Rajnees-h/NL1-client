
import { getNavBar,getHeader,getMainSection,getFooter } from "./js/jsHelper.js";


// Server Url
export const serverUrl = 'https://my-news-letter-h5vk.onrender.com/';
//export const serverUrl = 'http://localhost:3001/';

// Console to print Script tag is working
console.log('Inside Script Tag')


// render NavBar
getNavBar();
// render Header
getHeader();
// render Main Section
getMainSection();
// render Footer
getFooter();




// On Document Load rendering all News and Adding Button Listner
document.addEventListener('DOMContentLoaded', async function () {
  // rendering all news
    await renderNewsForMainSection();
  // adding button Listner for each News Card
    addReadNewsButtonListener();

    var hotNewsButton = document.getElementById('hotNewsButton');
    var todaysNewsButton = document.getElementById('hotNewsButton');
    
    addNavBarButtonListeners();

});

function addNavBarButtonListeners(){

const hotNewsButton = document.getElementById('hotNewsButton');
const todaysNewsButton = document.getElementById('todaysNewsButton');
const about = document.getElementById('about');

hotNewsButton.onclick = function hotNewsButtonClicked(){
  
}

todaysNewsButton.onclick = function todaysNewsButtonClicked(){
  alert('Today news is clicked')
}

about.onclick = function(){
  alert('about is clicked')
}

}


  // Add Read News Button Listener 
  function addReadNewsButtonListener(){
    const readNewsButtons = document.getElementsByName('readCompleteNews');
    readNewsButtons.forEach(button=>{
      button.addEventListener('click', function(event) {
          var newsId = event.target.id;
          var url = './readNews.html?id=' + newsId;
          //window.location.href = url;
          window.open(url, '_blank');
          
    
    });
  });
}

  // Render all new (From database)

async function renderAllNews(){

      const all_news = await FetchAllNews();
      all_news.forEach(news => {
          document.getElementById('allNews').appendChild(createNewsCard(news));
      });
      
}

// Render News For MainSection
async function renderNewsForMainSection(){

  let condition = 'fetchAll';

  const all_news = await fetchNewsByContion(condition);
  all_news.forEach(news => {
      document.getElementById('allNews').appendChild(createNewsCard(news));
  });
  
}

// Fetching All News From Database
export async function FetchAllNews(){

  let all_news = [];
  await fetch(serverUrl+"fetchAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          all_news = data; 
        })
        .catch((error) => console.error("Error in creating News:", error));
    return all_news;
}

// Fetch news from Database with conditions
export async function fetchNewsByContion(condition){

  let all_news = [];
  await fetch(serverUrl+condition, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          all_news = data; 
        })
        .catch((error) => console.error("Error in creating News:", error));
    return all_news;
}

function createNewsCard(news){
  console.log(news);

  let heading = news.heading;
  let detailNews = shortenParagraph(news.detailNews, 25);


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
  imgElement.src = news.imageURL;
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
  headingElement.textContent = heading;
  
  const paragraphElement = document.createElement('p');
  paragraphElement.className = 'card-text';
  paragraphElement.textContent = detailNews;
  paragraphElement.style.height = '100px';
  paragraphElement.style.overflow = 'hidden'
  
  // Create the button element with id "readNewsButton" and class "btn btn-primary"
  const buttonElement = document.createElement('button');
  buttonElement.id = news._id;
  buttonElement.name = 'readCompleteNews';
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


function shortenParagraph(paragraph, maxLength) {
  // Check if the length of the paragraph exceeds the maximum length
  if (paragraph.split(' ').length > maxLength) {
    // Shorten the paragraph
    const shortenedParagraph = paragraph.split(' ').slice(0, maxLength).join(' ');
    
    // Add ellipsis (...) at the end
    return shortenedParagraph + '...';
  } else {
    // Return the original paragraph if it's within the maximum length
    return paragraph;
  }
}





// On click Read News 


    
// On click Read News 

// function createNewsCard(){
//     const devElement = document.createElement('div');
//     devElement.textContent = 'Hello, Dev!';
//     devElement.classList.add('dev-class'); // You can add CSS classes here
//     return devElement;
// }



// 






    // document.getElementById('readNewsButton').addEventListener('click', function(event) {
    //     // Path to your HTML file
    //     console.log('Read News Button clicked ' + event.target.value);

    //     const news = {
    //         heading : 'First Heading',
    //         subHeading : 'sub Heading is here'
    //     };
    //     const container = document.getElementById('readNews')
    //     console.log(container);
    //     const childCom = createReadNews(news);
    //     console.log(childCom);
    //     container.innerHTML = childCom.innerHTML;
  


        //var htmlFilePath = 'htmlPages/readNews.html';
    
        // // Fetch the HTML file
        // fetch(htmlFilePath)
        //     .then(response => response.text())
        //     .then(htmlContent => {
        //         // Insert the HTML content into the div
        //         const myDiv = document.getElementById('readNews');
        //         myDiv.innerHTML = htmlContent;
        //         myDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        //     })
        //     .catch(error => {
        //         console.error('Error fetching HTML file:', error);
        //     });

    



   


    



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // fetch("http://localhost:3000/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const message = data.message;
    //     const container = document.getElementById("new-message");
    //     container.append(message);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));

    // fetch("http://localhost:3000/news")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const message = data.message;
    //     const container = document.getElementById("new-news");
    //     container.append(message);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));

    // fetch("http://localhost:3000/news", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: "Chinna Attack Japan",
    //     content: "Aasian countries attacked china to defend Japan",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const createdData = data;
    //     const container = document.getElementById("created-data");
    //     data.forEach((news) => {
    //       console.log(news);
    //       const heading = document.createElement("h1");
    //       heading.innerText = news.news.title;
    //       const div = document.createElement("div");
    //       div.innerText = news.news.content;

    //       container.appendChild(heading);
    //       container.appendChild(div);
    //     });
    //     // container.innerText = message;
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));




//============================================================================
//============================================================================
//============================================================================
//============================================================================
//============================================================================
//============================================================================
//============================================================================
//============================================================================
//============================================================================
// Code to insert Data

// const news = [
//   {
//     "heading": "Hydroponics Revolution: Growing Food Without Soil",
//     "subHeading": "Vertical farming takes root with sustainable water-based systems",
//     "detailNews": "The future of agriculture is taking root in urban vertical farms, where leafy greens and herbs flourish without a single grain of soil. Hydroponics, the science of growing plants in nutrient-rich water solutions, is revolutionizing farming by minimizing water usage, reducing environmental impact, and increasing yields. Imagine rows of vibrant lettuce stacked high in a city center, bathed in controlled LED lighting and meticulously fed through precisely monitored water systems. This innovative approach not only offers a viable solution for food security in densely populated areas but also significantly reduces the carbon footprint associated with traditional farming methods.",
//     "author": "Dr. Sarah Jones",
//     "publicationDate": "2023-12-26",
//     "imageUrl": "https://images.unsplash.com/photo-1555377522-07300fa13906?ixlib=rb-1.2.1&ixid=MnwxMjIhaT1uMHwxLW4xOTAlKV5BZ2hwYjBzcm9v&auto=format&fit=crop&w=750&q=80",
//     "videoUrl": "https://www.youtube.com/watch?v=nW947Z-J1_U",
//     "isHotNews": true
//   },
//   {
//     "heading": "Drones Patrol the Fields: Precision Agriculture Takes Flight",
//     "subHeading": "Unmanned aerial vehicles monitor crops and optimize resource usage",
//     "detailNews": "Imagine tiny, buzzing eyes scanning vast fields of golden wheat, meticulously collecting data on plant health, water distribution, and pest infestations. This futuristic vision is becoming a reality thanks to the integration of drones into modern agriculture. Equipped with high-resolution cameras and advanced sensors, these unmanned aerial vehicles provide farmers with real-time insights into their crops, allowing them to make precise decisions about irrigation, fertilization, and pest control. By pinpointing problem areas and applying resources only where needed, drones offer the potential to increase yields, reduce waste, and ultimately, create a more sustainable agricultural system.",
//     "author": "Max Thompson",
//     "publicationDate": "2023-12-25",
//     "imageUrl": "https://images.unsplash.com/photo-1529958587287-fa9530c7937d?ixlib=rb-1.2.1&ixid=MnwxMjIhaT1uMHwxLW4xOTAlKV5BZ2hwYjBzcm9v&auto=format&fit=crop&w=750&q=80",
//     "videoUrl": "https://www.youtube.com/watch?v=4-fXg67u02M",
//     "isHotNews": false
//   },
//   {
//     "heading": "CRISPR Editing for Superfoods: Engineering Crops for Enhanced Nutrition",
//     "subHeading": "Gene editing technology promises healthier, more resilient plants",
//     "detailNews": "The power of genetic engineering is being harnessed to create the next generation of superfoods. CRISPR, a revolutionary gene-editing tool, allows scientists to precisely modify plant DNA, potentially enhancing their nutritional content, resistance to disease, and tolerance to harsh environmental conditions. Imagine rice enriched with vitamin A, tomatoes with extended shelf life, or bananas naturally fortified with iron. These possibilities, once relegated to the realm of science fiction, are inching closer to reality thanks to CRISPR technology. While ethical considerations remain important, the potential benefits of CRISPR-edited crops for global food security and nutrition are undeniable.",
//     "author": "Dr. Alexia Lee",
//     "publicationDate": "2023-12-24",
//     "imageUrl": "https://images.unsplash.com/photo-1568161546452-53101b7638db?ixlib=rb-1.2.1&ixid=MnwxMjIhaT1uMHwxLW4xOTAlKV5BZ2hwYjBzcm9v&auto=format&fit=crop&w=750&q=80",
//     "videoUrl": "https://www.youtube.com/watch?v=y4e_kD6_e54",
//     "isHotNews": true
//   }
// ];


// const news = 
//   [
//     {
//       "heading": "Breaking News: Exciting Developments in Technology",
//       "subHeading": "Innovations that are set to change the landscape",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo ac quam fermentum cursus. Vestibulum ultricies nunc sit amet venenatis varius. In hac habitasse platea dictumst. Quisque quis ullamcorper quam. Nulla facilisi. Aenean nec mi at ex egestas tincidunt.",
//       "author": "John Doe",
//       "publicationDate": "2023-12-25",
//       "imageUrl": "https://example.com/news-image.jpg",
//       "videoUrl": "https://example.com/news-video.mp4",
//       "isHotNews": true
//     },
//     {
//       "heading": "Space Exploration Breakthrough: New Discoveries Beyond Our Galaxy",
//       "subHeading": "Exploring the universe and uncovering its secrets",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur in bibendum libero. Suspendisse potenti. Aliquam erat volutpat. Proin consectetur scelerisque orci, vitae cursus eros dapibus ut. Fusce eu diam a ex hendrerit euismod nec vel ex.",
//       "author": "Jane Smith",
//       "publicationDate": "2023-12-26",
//       "imageUrl": "https://example.com/space-image.jpg",
//       "videoUrl": "https://example.com/space-video.mp4",
//       "isHotNews": false
//     },
//     {
//       "heading": "Environmental Conservation Efforts Reach New Heights",
//       "subHeading": "Global initiatives to protect our planet",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet turpis eu ligula eleifend, at eleifend felis fermentum. Nunc fermentum urna a quam facilisis, vel facilisis odio vestibulum. Integer vel dolor ut justo fermentum vulputate id ut elit.",
//       "author": "David Brown",
//       "publicationDate": "2023-12-27",
//       "imageUrl": "https://example.com/environment-image.jpg",
//       "videoUrl": "https://example.com/environment-video.mp4",
//       "isHotNews": true
//     },
//     {
//       "heading": "Record-Breaking Box Office: Entertainment Industry Milestone",
//       "subHeading": "Blockbuster hits and unprecedented success",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Duis vulputate, metus eu luctus cursus, dolor justo bibendum arcu, et dapibus libero elit ut elit. Quisque euismod ex eu hendrerit efficitur. Sed vehicula, turpis.",
//       "author": "Emily Johnson",
//       "publicationDate": "2023-12-28",
//       "imageUrl": "https://example.com/entertainment-image.jpg",
//       "videoUrl": "https://example.com/entertainment-video.mp4",
//       "isHotNews": false
//     },
//     {
//       "heading": "Advancements in Artificial Intelligence: A Tech Revolution",
//       "subHeading": "How AI is transforming industries and daily life",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum, ligula eget tincidunt bibendum, augue eros feugiat ligula, eu blandit eros sem vel libero. Ut luctus, nunc vitae malesuada consectetur, purus tellus posuere urna, vel luctus ligula purus eget justo.",
//       "author": "Michael Anderson",
//       "publicationDate": "2023-12-29",
//       "imageUrl": "https://example.com/ai-image.jpg",
//       "videoUrl": "https://example.com/ai-video.mp4",
//       "isHotNews": true
//     },
//     {
//       "heading": "Healthcare Breakthrough: New Treatment Offers Hope for Patients",
//       "subHeading": "Innovative therapies changing the landscape of medicine",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Nullam ut leo ullamcorper, malesuada quam non, sodales justo. Nam sit amet quam id enim fringilla lacinia. Aliquam ut varius neque. Sed id odio fermentum, condimentum ex.",
//       "author": "Sophie Williams",
//       "publicationData": "2023-12-30",
//       "imageUrl": "https://example.com/health-image.jpg",
//       "videoUrl": "https://example.com/health-video.mp4",
//       "isHotNews": false
//     },
//     {
//       "heading": "Global Collaboration: Addressing Challenges in Education",
//       "subHeading": "Initiatives to improve access to quality education worldwide",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut urna ut odio laoreet egestas. Aliquam tincidunt arcu id justo varius, id volutpat lectus varius. Nunc eu mi a mi fringilla egestas. Duis eu turpis nec velit.",
//       "author": "David Smith",
//       "publicationDate": "2023-12-31",
//       "imageUrl": "https://example.com/education-image.jpg",
//       "videoUrl": "https://example.com/education-video.mp4",
//       "isHotNews": true
//     },
//     {
//       "heading": "Sports Highlights: Unforgettable Moments in 2023",
//       "subHeading": "Celebrating victories and memorable achievements",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin hendrerit, justo id iaculis commodo, erat arcu auctor nisi, nec tincidunt turpis mauris quis lacus. In et erat vitae eros posuere scelerisque. Sed vel libero sit amet elit.",
//       "author": "Alex Rodriguez",
//       "publicationDate": "2024-01-01",
//       "imageUrl": "https://example.com/sports-image.jpg",
//       "videoUrl": "https://example.com/sports-video.mp4",
//       "isHotNews": false
//     },
//     {
//       "heading": "Innovations in Sustainable Agriculture: A Greener Future",
//       "subHeading": "Technological advancements for eco-friendly farming",
//       "detailNews": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu sem et ligula euismod consectetur. Aenean eu nunc fringilla, finibus dui ac, feugiat odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//       "author": "Emma Green",
//       "publicationDate": "2024-01-02",
//       "imageUrl": "https://example.com/agriculture-image.jpg",
//       "videoUrl": "https://example.com/agriculture-video.mp4",
//       "isHotNews": true
//     }

// ]
// insertNewsInDatabase(news);

// function insertNewsInDatabase(news){
// fetch("http://localhost:3001/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(news),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     const createdData = data;
//     console.log(data);
//   })
//   .catch((error) => console.error("Error in creating News:", error));

// }




 