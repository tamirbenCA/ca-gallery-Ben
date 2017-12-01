'use strict'

const GOOGLE_API_KEY = 'AIzaSyCkGXo73iO3SNrjIp9hxptFfE5duOCgKk4';
const OPEN_WEATHER_API_KEY = 'f7af7bcad8d3440422ef08ca9f6992ec';
var gMyPos = {};

function initPage() {
    getPosition();
}


function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}


function showLocation(position) {
    gMyPos.lat = position.coords.latitude;
    gMyPos.lng = position.coords.longitude;
    initMap(position.coords.latitude, position.coords.longitude);
    // console.log('pos:', position);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${gMyPos.lat},${gMyPos.lng}&key=${GOOGLE_API_KEY}`).then(getAddress);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${gMyPos.lat}&lon=${gMyPos.lng}&units=metric&APPID=${OPEN_WEATHER_API_KEY}`).then(getWeather);
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function initMap(lat, lng) {
    var map = new google.maps.Map(
        document.querySelector('#map'),
        {
            // same as {lat: lat, lng: lng}
            center: { lat, lng },
            zoom: 17
        }
    );

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        // title: 'Hello World!'
    });
}

function getAddress(obj) {
    // console.log('address:', obj.data.results)
    var geoAddress = obj.data.results[0].address_components[2].long_name;
    // var geoAddress = obj.data.results[2].address_components[0].long_name;
    // var elGeoAddress = document.querySelector('.geo-address');
    // elGeoAddress.innerText = geoAddress;

    document.querySelector('.city-name').innerText = geoAddress;
}


function getLatLng() {
    var searchTerm = document.querySelector('.user-input').value;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${GOOGLE_API_KEY}`)
        .then(function (res){
            // console.log('getLatLng:', res.data.results[0].geometry.location);
            var geoLatLng = res.data.results[0].geometry.location;
            initMap(geoLatLng.lat, geoLatLng.lng);
        });
}

function getWeather(obj) {
    // console.log(obj.data);
    document.querySelector('.curr-temp').innerText = obj.data.main.temp;
    document.querySelector('.wind-spd').innerText = obj.data.wind.speed + ' m/s';
    document.querySelector('.humidity').innerText = obj.data.main.humidity;
    document.querySelector('.desc').innerText = obj.data.weather[0].description;
    document.querySelector('.clouds').innerText = obj.data.clouds.all;
    document.querySelector('.weather-icon').src = `http://openweathermap.org/img/w/${obj.data.weather[0].icon}.png`;
}




function copy() {
    var myLocationLink = `https://www.google.com/maps/place/${gMyPos.lat}+${gMyPos.lng}`
    
    var url = document.querySelector('#url');
    url.innerHTML = myLocationLink;
    // console.log(url.innerHTML)
    url.select();
    document.execCommand('copy');
  }