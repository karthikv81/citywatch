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
                navigator.camera.getPicture(cameraSuccess.bind(this), cameraError.bind(this), { destinationType: Camera.DestinationType.FILE_URI });
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
    function FileUpload(fileURL) {
        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var options = new FileUploadOptions();
        options.fileKey = "fileToUpload";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpg";

        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://35.196.140.124/upload.php"), win, fail, options);    }
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