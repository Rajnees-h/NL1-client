import { getNewsSection, getNavBar, getFooter } from "./js/jsHelper.js";
import { serverUrl } from "./index.js";

console.log('ReadNews Js Started');

// Server Url
//const serverUrl = 'https://my-news-letter-h5vk.onrender.com/';

getNavBar();
getNewsSection();
getFooter();


var urlParams = new URLSearchParams(window.location.search);
var newsId = urlParams.get('id');


document.addEventListener('DOMContentLoaded', async function () {

    const news = await fetchOneNews(newsId);
    console.log(news);

            // Replace demo values with actual data
            const heading = document.getElementById('heading');
            const subHeading = document.getElementById('subHeading');
            const detailNews = document.getElementById('detailNews');

            
            const publicationDateAndAuthor = document.getElementById('publicationDateAndAuthor'); 
            const videoUrl = document.getElementById('videoUrl');
            const isHot = document.getElementById('isHot');
            
            
            heading.innerHTML = news.heading;
            subHeading.innerText = news.subHeading;
            detailNews.innerText = news.detailNews;
            publicationDateAndAuthor.innerHTML = 'Published by: ' + news.author;
            isHot.style.display = "block";// Change to "block" if the news is hot
            videoUrl.src = news.videoUrl;
    



});


export async function fetchOneNews(newsId){

    let oneNews;
   await fetch(`${serverUrl}fetchOne/${newsId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Printing the data ', data);
          oneNews = data;
        })
        .catch((error) => console.error("Error in creating News:", error));

        return oneNews;
}

// async function createReadNews(newsId) {


//     const news = await fetchOneNews(newsId);

//   // Create heading element

//       var mainContainer = document.createElement("div");
//       mainContainer.className = "d-flex container mt-12 justify-content-center align-items-center";
      
//       // Create column container
//       var columnContainer = document.createElement("div");
//       columnContainer.className = "col-sm-8";
  
//       // Create first section
//       var firstSectionTitle = document.createElement("h2");
//       firstSectionTitle.textContent = news.heading;
  
//       var firstSectionDescription = document.createElement("h5");
//       firstSectionDescription.textContent = news.subHeading;
  
//       var youtubeContainer = document.createElement("div");
//       youtubeContainer.className = "row col-lg-12";
  
//       var youtubeEmbed = document.createElement("div");
//       youtubeEmbed.className = "embed-responsive embed-responsive-16by9";
  
//       var youtubeIframe = document.createElement("iframe");
//       youtubeIframe.className = "embed-responsive-item";
//       youtubeIframe.src = "https://www.youtube.com/embed/zyErpyeI9PU";
//       youtubeIframe.setAttribute("allowfullscreen", "");
  
//       youtubeEmbed.appendChild(youtubeIframe);
//       youtubeContainer.appendChild(youtubeEmbed);
  
//       var firstSectionText = document.createElement("p");
//       firstSectionText.textContent = news.detailNews;
  
//       var firstSectionLorem = document.createElement("p");
//       firstSectionLorem.textContent = news.detailNews;
//       // // Create second section
//       // var secondSectionTitle = document.createElement("h2");
//       // secondSectionTitle.className = "mt-5";
//       // secondSectionTitle.textContent = "TITLE HEADING";
  
//       // var secondSectionDescription = document.createElement("h5");
//       // secondSectionDescription.textContent = "Title description, Sep 2, 2020";
  
//       // var fakeImage = document.createElement("div");
//       // fakeImage.className = "fakeimg";
//       // fakeImage.textContent = "Fake Image";
  
//       // var secondSectionText = document.createElement("p");
//       // secondSectionText.textContent = "Some text..";
  
//       // var secondSectionLorem = document.createElement("p");
//       // secondSectionLorem.textContent = "Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";
  
//       // Append elements to the document
//       youtubeContainer.appendChild(youtubeEmbed);
//       columnContainer.appendChild(firstSectionTitle);
//       columnContainer.appendChild(firstSectionDescription);
//       columnContainer.appendChild(youtubeContainer);
//       columnContainer.appendChild(firstSectionText);
//       columnContainer.appendChild(firstSectionLorem);
//       // columnContainer.appendChild(secondSectionTitle);
//       // columnContainer.appendChild(secondSectionDescription);
//       // columnContainer.appendChild(fakeImage);
//       // columnContainer.appendChild(secondSectionText);
//       // columnContainer.appendChild(secondSectionLorem);
  
//       mainContainer.appendChild(columnContainer);
//       document.body.appendChild(mainContainer);
    

//   return mainContainer;
// }
