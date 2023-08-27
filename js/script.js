const elForm = document.querySelector(".js-form");
const elInp = document.querySelector(".js-inp")
const elTitle = document.querySelector(".js-country");
const elBoxWeather = document.querySelector(".wrapper");
const elWeatherList = document.querySelector(".weather-list");
const elTemplate1 = document.querySelector(".js-template1").content;
const elTemplate2 = document.querySelector(".js-template2").content;
const fragmentJs = document.createDocumentFragment();
const elRainBox = document.querySelector(".rainyDay");


// Function


function getDuration (time){
    const hours = Math.floor(time / 60);
    const minuts = Math.floor(time % 60);
    console.log(hours, minuts);
    return `${hours} hrs ${minuts} min  `
};



function renderWeather(obj) {
    elBoxWeather.innerHTML = "";
    const elTemplateClone = elTemplate1.cloneNode(true);
    
    elTitle.textContent = obj.name;
    


    if(obj.weather[0].main == "Thunderstorm"){
        document.body.style.backgroundImage = "url(../images/bg2.jpg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/storm.gif";
        elRainBox.style.display = "none";
    }
    


    if(obj.weather[0].main == "Drizzle"){
        document.body.style.background = "../images/clouds.jpg"
        elTemplateClone.querySelector(".weather-img").src = "./images/drizzle.gif";
        elRainBox.style.display = "none";
    }
    


    if(obj.weather[0].main == "Rain" ){
        document.body.style.backgroundImage = "url(../images/rain.jpg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/rain.gif";
        elRainBox.style.display = "inline-block";
    }
    


    if(obj.weather[0].main == "Snow"){
        document.body.style.backgroundImage = "url(../images/snow.jpg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/snowflake.gif";
        elRainBox.style.display = "none";
    }
    


    if(701 <= obj.weather[0].id && obj.weather[0].id <= 781){
        document.body.style.backgroundImage = "url(../images/rain.jpg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/rain.gif";
        elRainBox.style.display = "inline-block";
    }
    


    if(obj.weather[0].main == "Clear"){
        document.body.style.backgroundImage = "url(../images/sun.jpeg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/sun.gif";
        elRainBox.style.display = "none";
    }
    


    if(obj.weather[0].main == "Clouds"){
        document.body.style.backgroundImage = "url(../images/clouds.jpg)"
        elTemplateClone.querySelector(".weather-img").src = "./images/clouds.gif";
        elRainBox.style.display = "none";
    }
    


    elTemplateClone.querySelector(".weather-name").textContent = obj.weather.main;
    elTemplateClone.querySelector(".country-name").textContent = obj.name + " City";
    elTemplateClone.querySelector(".weather-gradus").textContent = Math.round(obj.main.temp) + " ℃";
    elTemplateClone.querySelector(".humanidity-span").textContent = obj.main.humidity + " %";
    elTemplateClone.querySelector(".air-span").textContent = obj.main.pressure + " PS";
    elTemplateClone.querySelector(".wind-span").textContent = obj.wind.speed + " km/h";
    elTemplateClone.querySelector(".btn-info").href = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&q=${obj.name}&zoom=5`
    
    elBoxWeather.appendChild(elTemplateClone)
}



function renderWeatherDays(obj) {
    elWeatherList.innerHTML = ""
    obj.list.slice(0, 9).forEach(item => {
        const elTemplateClone = elTemplate2.cloneNode(true);
        elTemplateClone.querySelector(".weather-gradus1").textContent = Math.round(item.main.temp) + " ℃";
        elTemplateClone.querySelector(".time-weather").textContent = item.dt_txt;
        
        fragmentJs.appendChild(elTemplateClone)
    });
    elWeatherList.appendChild(fragmentJs)
}



async function getWeather(url){
    try {
        const rec = await fetch(url)
        
        const data = await rec.json();
        
        renderWeather(data)
    } catch (error) {
        console.log(error);
    }
}



async function getWeatherDays(url){
    try {
        const rec = await fetch(url)
        
        const data = await rec.json();
        
        renderWeatherDays(data)
    } catch (error) {
        console.log(error);
    }
}


// EVENTS



elForm.addEventListener("submit", function (evt){
    evt.preventDefault();
    let newInpValue = elInp.value.trim();
    
    if(newInpValue == "") {
        newInpValue = "tashkent"
        getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${newInpValue}&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba`)
        getWeatherDays(`https://api.openweathermap.org/data/2.5/forecast?q=${newInpValue}&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba`)
    } else {
        getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${newInpValue}&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba`)
        getWeatherDays(`https://api.openweathermap.org/data/2.5/forecast?q=${newInpValue}&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba`)
    }
})

getWeatherDays("https://api.openweathermap.org/data/2.5/forecast?q=tashkent&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba")



getWeather("https://api.openweathermap.org/data/2.5/weather?q=tashkent&units=metric&appid=941cbdb9278b117a9ef8d6ea82f0a7ba")