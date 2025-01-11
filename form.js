// TODO: Create a variable that selects the form element
const userName = document.getElementById('username');
const userTitle = document.getElementById('title');
const  userContent= document.getElementById('content');
const errorMessage = document.getElementById('error');
const submitBtn = document.querySelector('form');


// TODO: Create a function that handles the form submission. Grab the form data and store it in local storage, then redirect to the blog page using the `redirectPage` function. If the form is submitted with missing data, display an error message to the user.
const handleFormSubmit = function (event) {
    event.preventDefault();
    if(userName.value == "" || userTitle.value == "" || userContent.value == "" )
    {
        errorMessage.textContent = "Please complete the form.";
        return;
    }
    else
    {
        // pushing user info in the form of an object.
        const userData ={
            username: userName.value.trim(),
            title: userTitle.value.trim(),
            content: userContent.value.trim(),
        };
        errorMessage.innerHTML = "";
        storeLocalStorage(userData);
        redirectPage('./blog.html');
    }

};

// TODO: Add an event listener to the form on submit. Call the function to handle the form submission.

submitBtn.addEventListener('submit',handleFormSubmit);