// const weatherForm = document.querySelector('form');
// const weather = document.querySelector('#show-detail');
// const msgOne = document.querySelector('#msg-1');
// const placeName = document.querySelector('.place-name');
// const time = weather.querySelector('.time'),
//     iconWeather = weather.querySelector('.icon-weather'),
//     temp = weather.querySelector('.temp'),
//     feelLike = weather.querySelector('.feellike'),
//     weatehrDescription = weather.querySelector('.weatehr-description'),
//     reelFeel = weather.querySelector('.reelfeel'),
//     wind = weather.querySelector('.wind'),
//     humidity = weather.querySelector('.humidity'),
//     cloudCover = weather.querySelector('.cloudCover');

// weather.style = 'display: none';

// weatherForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const search = e.target.elements[0];
//     const location = search.value;
//     msgOne.textContent = 'Loading ...';
//     fetch(`/weather?address=${location}`).then((res) => {
//         res.json().then((data) => {
//             if (data.err) {
//                 msgOne.textContent = data.err;
//             } else {
//                 weather.style = 'display: flex';
//                 msgOne.textContent = '';
//                 placeName.textContent = data.place_name;
//                 time.textContent = data.forecast.observation_time;
//                 iconWeather.src = data.forecast.weather_icons[0];
//                 temp.textContent = `${data.forecast.temperature}°`;
//                 feelLike.textContent = `RealFeel® ${data.forecast.feelslike}°`;
//                 weatehrDescription.textContent = data.forecast.weather_descriptions[0];
//                 reelFeel.textContent = `${data.forecast.feelslike}°`;
//                 wind.textContent = `${data.forecast.wind_dir} ${data.forecast.wind_speed} km/h`;
//                 humidity.textContent = `${data.forecast.humidity}%`;
//                 cloudCover.textContent = `${data.forecast.cloudcover}%`
//             }
//         })
//     })
// });


function geoFindMe(input) {
    function findMe() {
        async function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            const apiKey = '7d187b595c89446480efe073a60a236f';
            const currentLocation = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`)
            if (currentLocation.status == 200) {
                const currentLocationData = await currentLocation.json();
                const input = document.getElementById('location');
                console.log(currentLocationData)
                input.value = currentLocationData.features[0].properties.formatted;
            }
        }

        function error() {
            alert('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    findMe()
}
geoFindMe();