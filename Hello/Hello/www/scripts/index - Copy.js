document.addEventListener('deviceready', onDeviceReady.bind(this), false);
var map;
function onDeviceReady() {
    alert("OnDeviceReady");
    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);
    var parentElement = document.getElementById('deviceready');
};
function locate() {
    alert("locate");
    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { timeout: 90000, enableHighAccuracy: true });
    //navigator.camera.getPicture(cameraSuccess, cameraError, {});
}
var Latitude = undefined;
var Longitude = undefined;
function onMapSuccess(position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    alert("acquired gps location - " + Latitude + " : " + Longitude);
    getMap(Latitude, Longitude);
    watchMapPosition();
    //loadMap(position);
};
function onMapError(error) {
    alert('code: ' + error.code + '\nmessage: ' + error.message + '\n');
}
function getMap(latitude, longitude) {
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.addListener("click", onMapClick);
    var latLong = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({position: latLong});
    marker.setMap(map);
    map.setZoom(100);
    map.setCenter(marker.getPosition());
}
var point = 1;
function onMapClick(event) {
    alert("new Position : " + event.latLng)
    var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
        },
        title: 'Marker ' + point++
    });
    marker.addListener("click", onMarkerClick);
    map.panTo(event.latLng);
    function onMarkerClick(event) {
        var infowindow = new google.maps.InfoWindow({
            content: marker.getTitle()
        });
        infowindow.open(marker.get('map'), marker);
    }
}

// Success callback for watching your changing position
var onMapWatchSuccess = function (position) {
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
        getMap(updatedLatitude, updatedLongitude);
    }
}
function onMapError(error) {
    console.log('code: ' + error.code + '\nmessage: ' + error.message + '\n');
}

// Watch your changing position
function watchMapPosition() {
    //return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true, timeout: 30000});
}

function cameraSuccess(imageurl) {
    alert(imageurl);
    document.getElementsByTagName("body")[0].style.backgroundImage = 'url("' + imageurl + '")';
}
function cameraError(message) {
    alert("problem: " + message);
}
function onPause() {
    // TODO: This application has been suspended. Save application state here.
};
function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
};


/* alert("div : " + div);
    alert(plugin);
    alert(plugin.google);
    alert(plugin.google.maps);
    alert(plugin.google.maps.Map);
    var map = plugin.google.maps.Map.getMap(div);
    alert(map);
    map.on(plugin.google.maps.event.MAP_READY, function () {
        var button = div.getElementsByTagName('button')[0];
        button.addEventListener('click', function () {
            if (map.getDiv()) {
                map.setDiv();
            } else {
                map.setDiv(div);
            }
        });
    map.one(plugin.google.maps.event.MAP_READY, function () {
        map.on(plugin.google.maps.event.MAP_LOADED, function () {
            alert("Map tiles are loaded");
        });

    });*/