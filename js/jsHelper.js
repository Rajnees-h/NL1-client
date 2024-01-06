export function getNavBar() {

    // Specify the URL of the HTML file you want to load
    const url = "./htmlPages/navBar.html";
  
    // Fetch the HTML content
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Insert the HTML content into the specified element
        document.getElementById("navbar").innerHTML = html;
      })
      .catch((error) => console.error("Error loading HTML:", error));

      console.log('NavBar Called')
  }

  export function getHeader(){
        // Specify the URL of the HTML file you want to load
        const url = "./htmlPages/header.html";
  
        // Fetch the HTML content
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            // Insert the HTML content into the specified element
            document.getElementById("header").innerHTML = html;
          })
          .catch((error) => console.error("Error loading HTML:", error));
    
          console.log('Header Called')
  }

export function getMainSection(){
    // Specify the URL of the HTML file you want to load
    const url = "./htmlPages/mainSection.html";

    // Fetch the HTML content
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Insert the HTML content into the specified element
        document.getElementById("main-section").innerHTML = html;
      })
      .catch((error) => console.error("Error loading HTML:", error));

      console.log('MainSection Called')
}

export function getFooter(){
    // Specify the URL of the HTML file you want to load
    const url = "./htmlPages/footer.html";

    // Fetch the HTML content
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Insert the HTML content into the specified element
        document.getElementById("footer").innerHTML = html;
      })
      .catch((error) => console.error("Error loading HTML:", error));

      console.log('Footer Called')
}

export function getNewsSection() {

    // Specify the URL of the HTML file you want to load
    const url = "./htmlPages/newsSection.html";
  
    // Fetch the HTML content
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Insert the HTML content into the specified element
        document.getElementById("news-section").innerHTML = html;
      })
      .catch((error) => console.error("Error loading HTML:", error));

      console.log('News Section Called')
  }

  export function getAdminMainSection() {

    // Specify the URL of the HTML file you want to load
    const url = "./htmlPages/oneNewsDivForAdmin.html";
  
    // Fetch the HTML content
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Insert the HTML content into the specified element
        const tempDiv = document.getElementById("newsList");
        tempDiv.innerHTML = html;
      })
      .catch((error) => console.error("Error loading HTML:", error));

      console.log('Admin Main Section Called')
  }

  