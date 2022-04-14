const weatherForm = document.querySelector('form');
const weather = document.querySelector('#show-detail');
const msgOne = document.querySelector('#msg-1');
const placeName = document.querySelector('.place-name');
const time = weather.querySelector('.time'),
iconWeather = weather.querySelector('.icon-weather'),
temp = weather.querySelector('.temp'),
feelLike = weather.querySelector('.feellike'),
weatehrDescription = weather.querySelector('.weatehr-description'),
reelFeel = weather.querySelector('.reelfeel'),
wind = weather.querySelector('.wind'),
humidity = weather.querySelector('.humidity'),
cloudCover = weather.querySelector('.cloudCover');

weather.style = 'display: none';

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const search = e.target.elements[0];
    const location = search.value;
    msgOne.textContent = 'Loading ...';
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.err) {
                msgOne.textContent = data.err;
            } else {
                weather.style = 'display: flex';
                msgOne.textContent = '';
                placeName.textContent = data.place_name;
                time.textContent = data.forecast.observation_time;
                iconWeather.src = data.forecast.weather_icons[0];
                temp.textContent = `${data.forecast.temperature}°`;
                feelLike.textContent = `RealFeel® ${data.forecast.feelslike}°`;
                weatehrDescription.textContent = data.forecast.weather_descriptions[0];
                reelFeel.textContent = `${data.forecast.feelslike}°`;
                wind.textContent = `${data.forecast.wind_dir} ${data.forecast.wind_speed} km/h`;
                humidity.textContent = `${data.forecast.humidity}%`;
                cloudCover.textContent = `${data.forecast.cloudcover}%`
            }
        })
    })
});
