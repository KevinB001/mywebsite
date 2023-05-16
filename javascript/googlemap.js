let geocoder;
let map;
let marker1;
let directionsService;
let directionsRenderer;
let circle;
let rectangle;
let polygon;
let polylines;

function initMap() {
  geocoder = new google.maps.Geocoder();
  const coordinates = { lat: 52.135712, lng: -0.468040 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: coordinates,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });
  map.addListener("click", (e) => {
    alert("You clicked the map at " + JSON.stringify(e.latLng.toJSON(), null, 2));
  });
}
window.initMap = initMap;

function placeMarker() {
  const lat = document.getElementById('latitude').value;
  const lng = document.getElementById('longitude').value;
  const location = new google.maps.LatLng(lat, lng);
  if (lat === '' || lng === ''){
    alert('Please enter coordinates to place a marker');
  } else {
  addMarker(location);
}}

function addMarker(location) {
  if (marker1) {
    marker1.setMap(null);
  }
  marker1 = new google.maps.Marker({
    position: location,
    map: map
  });
  map.setCenter(location);
}

function searchAddress() {
  const address = document.getElementById('address').value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      } else {
      alert('Geocode was not successful for the following reason: ' + status);
      }
  });
}

function placeCircle() {
  const circLat = document.getElementById('circleLatitude').value;
  const circLong = document.getElementById('circleLongitude').value;
  const radius = parseInt(document.getElementById('circleRadius').value);
  const circLocation = new google.maps.LatLng(circLat, circLong);
  if (circLat === '' || circLong === '' || radius === ''){
    alert('Please enter coordinates and radius to place a circle');
  } else {
  addCircle(circLocation, radius);
}}

function addCircle(circLocation, radius) {
  if (circle) {
    circle.setMap(null);
  }
  circle = new google.maps.Circle({
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFF",
    fillOpacity: 0.5,
    center: circLocation,
    radius: radius,
    map: map
  });
  map.setCenter(circLocation);
}

function placeRectangle() {
  let north = document.getElementById('rectangleNorth').value;
  let south = document.getElementById('rectangleSouth').value;
  let east = document.getElementById('rectangleEast').value;
  let west = document.getElementById('rectangleWest').value;
  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(north, west),
    new google.maps.LatLng(south, east)
  );
   if (north === '' || south === '' || east === '' || west === ''){
    alert('Please enter all coordinates to place a rectangle');
  } else {
  addRectangle(bounds);
}}

function addRectangle(bounds) {
  if (rectangle) {
    rectangle.setMap(null);
  }
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    map: map
  });
  map.fitBounds(bounds);
}

function getDirections() {
  let start = document.getElementById('origin').value;
  let end = document.getElementById('destination').value;
  let request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
  };
  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    } else { 
    alert("Please enter a valid origin/destination")}
  });
}

function placePolygon() {
  var lat1 = document.getElementById('polyLat1').value;
  var lng1 = document.getElementById('polyLong1').value;
  var lat2 = document.getElementById('polyLat2').value;
  var lng2 = document.getElementById('polyLong2').value;
  var lat3 = document.getElementById('polyLat3').value;
  var lng3 = document.getElementById('polyLong3').value;
  var lat4 = document.getElementById('polyLat4').value;
  var lng4 = document.getElementById('polyLong4').value;
  var polyCoords = [
    {lat: parseFloat(lat1), lng: parseFloat(lng1)},
    {lat: parseFloat(lat2), lng: parseFloat(lng2)},
    {lat: parseFloat(lat3), lng: parseFloat(lng3)},
    {lat: parseFloat(lat4), lng: parseFloat(lng4)}
  ];
  if (lat1 === '' || lat2 === '' || lat3 === '' || lat4 === '' || lng1 === '' || lng2 === '' || lng3 === '' || lng4 === ''){
    alert('Please enter all coordinates to place a polygon');
  } else {
  addPolygon(polyCoords);
}}

function addPolygon(polyCoords) {
  if (polygon) {
    polygon.setMap(null);
  }
  polygon = new google.maps.Polygon({
    paths: polyCoords,
    map: map
  });
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < polyCoords.length; i++) {
    bounds.extend(polyCoords[i]);
  }
  map.fitBounds(bounds);
}