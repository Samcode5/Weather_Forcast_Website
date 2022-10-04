const time =document.getElementById('time');
const date =document.getElementById('date');
const currentWeatherItems=document.getElementById('current-weather-items');
const timezone =document.getElementById('time-zone');
const country =document.getElementById('country');
const weatherForcast=document.getElementById('weather-forcast');
const currentTemp=document.getElementById('current-temp');
const currentinfo=document.getElementById("info");


const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];


const API ="bf94de0f03a774f77d14d04bfbca52c5";

setInterval( () =>{ 
const d= new Date();
let month =d.getMonth();
let minute=d.getMinutes();
let hours =d.getHours();
let day = d.getDay();
let curDate=d.getDate();
let hoursin12fformat= hours > 12 ? hours%12 : hours;
let ampm= hours >=12 ? "PM" :"AM";
let minute1= minute<10 ? "0"+minute:minute;

time.innerHTML= hoursin12fformat+":"+minute1+ " "+`<span id="am-pm">${ampm}</span>`;



date.innerHTML=days[day]+", "+curDate+" "+months[month];

},1000);




getWeatherData();


function showWeatherdata(data)
{

    let {pressure,humidity,wind_speed,feels_like} = data.current;
    
    currentWeatherItems.innerHTML=
    `
    <div class="weather-items">
                 <div>Humidity</div>
                 <div>${humidity}%</div>
               </div>
               <div class="weather-items">
                <div>Wind Speed</div>
                <div>${wind_speed}km/hr</div>
              </div>
              <div class="weather-items">
                <div>Pressure</div>
                <div>${pressure}hpa</div>
              </div>
              <div class="weather-items">
                <div>Feels like</div>
                <div>${feels_like}&#176C</div>
              </div>
   
    `


let{main,icon}=data.current.weather[0];



if(main==='Clouds')
{
  currentinfo.innerHTML= `
   <div class="icon"><img src="cloudy.png" alt="icon" height="100" width="100"></div>
  <div class="cloud">${main}</div>`
    
}

else if(main==='Rain')
{
  
  currentinfo.innerHTML= `
  <div class="icon"><img src="storm.png" alt="icon" height="100" width="100"></div>
  <div class="cloud">${main}</div>`
  

}

else
{
  currentinfo.innerHTML= `
  <div class="icon"><img src="sun.png" alt="icon" height="100" width="100"></div>
  <div class="cloud">${main}</div>`

}




let i="http://openweathermap.org/img/wn/"+icon+"@2x.png"



  
 let otherDayForcast = ''
  data.daily.forEach((day,index)=>
  {
      
   
   

    if(index===0)
    {
    currentTemp.innerHTML=`
  <div class="others">
  <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
  <img src=${i} alt="weather-icon" class="w-icon">
  <div class="temp">Night - ${day.temp.night}&#176; C</div>
  <div class="temp">Day - ${day.temp.day}&#176; C</div> 

  `;


    }
    else
    {
  
      

       otherDayForcast+= `
      <div class="weather-forecast-item" style="border:1px solid white;border-radius:30px;padding:10px;margin:0px 15px;display:flex;
      flex-direction: column;align-items:center;justify-content:center;">
          <div class="day" style="  background: #3c3c44; padding: 5px 15px ;border-radius: 50px; text-align: center;">${window.moment(day.dt*1000).format('ddd')}</div>
          <img src="http://openweathermap.org/img/wn/${day.daily[index].weather[0].icon}@2x.png alt="weather icon" class="w-icon">
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">
          Day - ${day.temp.day}&#176;C</div>
      </div>
      
      `
    }

  })


    

   weatherForcast.innerHTML=otherDayForcast;

  



}





function getWeatherData() {

   navigator.geolocation.getCurrentPosition((success) =>{
    let {latitude,longitude} =success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API}`).then(res => res.json()).then(data => 
    {console.log(data);
    
     showWeatherdata(data);
    }
    
    )
   })

  

}



