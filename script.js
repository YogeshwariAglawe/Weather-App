const apiKey = "b8182ae4c9261c9742873d8307ff6813";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        
        // Debugging ke liye: console mein data check karne ke liye niche wali line zaruri hai
        console.log("API Response Data:", data);

        if(data.name !== undefined) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            console.log("Data structure is different or key is inactive.");
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});