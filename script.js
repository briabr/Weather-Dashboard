document.getElementById("cityInput").defaultValue = "New York";
let history = []
function getInfo(){
  let newCityName = document.getElementById("cityInput");
  let City = document.getElementById("City");
  City.innerHTML = "--"+newCityName.value+"--"

fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newCityName.value+"&appid=f62c5ac8eb8c429f4457d3d790e6bf85")
.then(response => response.json())
.then(data =>{
  console.log(data)
  history.push(newCityName.value)
  localStorage.setItem("cityList", [history])
  for(i=0; i<5; i++){
      document.getElementById("minTempDay"+(i+1)).innerHTML = "Min:"+ Number(data.list[i].main.temp_min -291.35).toFixed(1)+"°";   
  }
  for(i=0; i<5; i++){
      document.getElementById("maxTempDay"+(i+1)).innerHTML = "Max:"+ Number(data.list[i].main.temp_Max -291.35).toFixed(1)+"°";
  }
  for(i=0; i<5; i++){
      document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
  }
  console.log(data)
  getSingleDayWeather(newCityName.value)
  getFromLocalStoragr()

})
.catch(err => alert(err))
}

function getSingleDayWeather(cityName){
  console.log(cityName)
let url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=f62c5ac8eb8c429f4457d3d790e6bf85"
fetch(url).then(response => response.json()).then(data => {
  let weatherDiv = document.createElement('div')
  let temp_para = document.createElement('p')
  let hum_para = document.createElement('p')
  let wind_para = document.createElement('p')

  wind_para.innerHTML = "Wind speed " + ":" + data.wind.speed;
  hum_para.innerHTML = "Humidity " + ":" + data.main.humidity;
  temp_para.innerHTML =" Temperature " + ":" + data.main.temp;

  weatherDiv.append(wind_para, hum_para,temp_para)
  document.getElementById('currentDayWeather').innerHTML = "" // clear the previous values and then append new regenerated values.
  document.getElementById('currentDayWeather').append(weatherDiv)

  console.log(data)
})

}

function getFromLocalStoragr(){
  let historyData = localStorage.getItem("cityList")
  console.log(historyData)

}
const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function CheckDay(day){
  if (day+d.getDay() > 6){
      return day +d.getDay()-7;
  }
  else{
      return day +d.getDay();
  }
}
for(i=0; i<5; i++){
  document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}
getInfo();

