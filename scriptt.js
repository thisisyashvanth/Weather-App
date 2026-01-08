import { CONFIG } from "./config.js";

async function checkWeather() {
    const enteredCity = document.querySelector(".city").value;

    const apiKey = CONFIG.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`;

    const opDiv = document.querySelector(".opDiv");

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();

        opDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Current Temperature: ${data.main.temp}&deg;C</p>
            <p>Minimum Temperature: ${data.main.temp_min}&deg;C, Maximum Temp: ${data.main.temp_max}&deg;C</p>
            <p>How's it at ${data.name}: ${data.weather[0].description.toUpperCase()}</p>
        `;

    } catch (error) {
        opDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

const btn = document.getElementById("btn");
btn.addEventListener("click", checkWeather);