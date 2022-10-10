function getInfo(){
  const newName = document.getElementById("cityInput");
  const City = document.getElementById("City");
  City.innerHTML = "--"+newName.value+"--"

fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=f62c5ac8eb8c429f4457d3d790e6bf85")
.then(response => response.json())
.then(data =>{
  for(i=0; i<5; i++){
      document.getElementById("day"+(i+1)+"Min").innerHTML = "Min:"+ Number(data.list[i].main.temp_min -291.35).toFixed(1)+"°";   
  }
  for(i=0; i<5; i++){
      document.getElementById("day"+(i+1)+"Max").innerHTML = "Max:"+ Number(data.list[i].main.temp_Max -291.35).toFixed(1)+"°";
  }
  for(i=0; i<5; i++){
      document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
  }
  console.log(data)

})
.catch(err => alert ("Something Went Wrong"))
}


function DefaultScreen(){
  document.getElementById("cityInput").defaultValue = "New York";
  getInfo();
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




