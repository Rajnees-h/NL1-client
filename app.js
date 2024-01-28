const serverUrl = 'http://localhost:3001/';

function submitForm() {
  console.log('Submit Form Called');
  const name = document.getElementById('name').value;
  const profileImageInput = document.getElementById('profileImage');
  
  // Check if a file is selected
  if (profileImageInput.files.length > 0) {
      const profileImageFile = profileImageInput.files[0];

      // Use FileReader to read the selected file as a data URL
      const reader = new FileReader();
      reader.onloadend = function () {
          const profileImage = reader.result;

          if (name && profileImage) {
              // Send data to server
              sendDataToServer({ name, profileImage });
          } else {
              alert('Please fill in all fields.');
          }
      };
      reader.readAsDataURL(profileImageFile);
  } else {
      alert('Please select a profile image.');
  }
}

function sendDataToServer(data) {
  // Using fetch to send a POST request to the server
  fetch(serverUrl+'saveData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
      console.log('Data saved successfully:', result);
      alert('Data saved successfully!');
  })
  .catch(error => {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again later.');
  });
}
