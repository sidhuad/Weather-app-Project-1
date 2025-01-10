
const weatherForm = document.querySelector(`form`);
const cityInput = document.querySelector(`#locationName`);
const cards = document.querySelector(`.card`);
const apiKey = "36684b12ddb5a86da4560c99ced6468c";


weatherForm.addEventListener('submit',Event =>{
    event.preventDefault();
    const city = cityInput.value;
    if (city){

    }
    else {
        displayError('Please Enter a City')};
});

async function getWeatherData(city){
    
}
function displayWeatherInfo(data){

}
function getWeatherEmoji(weatherId){


}
function displayError(Message){ 
    const errorDisplay = document.createElement ('p');
    errorDisplay.textContent = Message;

}