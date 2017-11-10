function Maps() {
    var _el = document.getElementById("maps");
    var _notify = document.getElementById("maps_notification");
    var point = 1;
    this.show = function () {
        Utils.removeClass(_el, "hide");
        this.showNotification("Acquiring your location...");
        navigator.geolocation.getCurrentPosition(onMapSuccess.bind(this), onMapError.bind(this), { timeout: 90000, enableHighAccuracy: true });
    };
    var onMapSuccess = function (position) {
        this.showNotification("Loading maps...")
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(document.getElementById("maps_canvas"), mapOptions);
        map.addListener("tilesloaded", function (event) {
            this.hideNotification();
        }.bind(this));
        map.addListener("click", function (event) {
            var marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10
                },
                title: 'PotHole ' + point++
            });
            marker.addListener("click", onMarkerClick.bind(this));
            map.panTo(event.latLng);
            var userSelection = confirm("Do you want to upload the photo of the probem?");
            if (userSelection) {
                navigator.camera.getPicture(cameraSuccess.bind(this), cameraError.bind(this), {});
            }
            function onMarkerClick(event) {
                var infowindow = new google.maps.InfoWindow({
                    content: marker.getTitle()
                });
                infowindow.open(marker.get('map'), marker);
            }
            function cameraSuccess(imageurl) {
                // TODO: FIXME Upload the image
                alert("Image Uploaded successfully : " + imageurl);
                FileUpload(imageurl);
            }
            function cameraError(message) {

            }
        }.bind(this));
        var latLong = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({ position: latLong });
        marker.setMap(map);
        map.setZoom(100);
        map.setCenter(marker.getPosition());//    watchMapPosition();
    };
    var onMapError = function (error) {
        alert('code: ' + error.code + '\nmessage: ' + error.message + '\n');
    }
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.handleKey = function () {

    };
    this.showNotification = function (message) {
        Utils.removeClass(_notify, 'hide');
        _notify.innerText = message;
    };
    this.hideNotification = function () {
        Utils.addClass(_notify, 'hide');
    };
}

function FileUpload(file) {
    var data = new FormData();
    data.append("fileToUpload", file);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "http://35.196.140.124/upload.php");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
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