console.log("Client side js file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "";
    messageTwo.textContent = "";
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                messageTwo.textContent = data.error;
                return console.log(data.error);
            }
            messageOne.textContent = "Forecast : " + data.forecastData;
            messageTwo.textContent = "Location : " + data.location;
        });
    });
});
