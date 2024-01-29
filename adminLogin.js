// Get the modal
var modal = document.getElementById('loginForm');
var loginButton = document.getElementById('loginButton');

loginButton.onclick = function(){
    const  userName = document.getElementById('userName');
    const password = document.getElementById('password');

    const user = getUserFromDatabase(userName);

    if(user){
        if(user.password == password);
        alert('Loged In Successfully')
    }else{
        alert('Wrong Username');
    }


}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}