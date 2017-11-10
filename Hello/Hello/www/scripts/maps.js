function Maps() {
    var color = {pothole: "red", streetlamp: "cyan", watersupply: "blue"}
    var _el = document.getElementById("maps");
    var _notify = document.getElementById("maps_notification");
    var point = 1;
    var _category = "Pothole";
    this.show = function (category) {
        _category = category;
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
            this.showNotification("Loading issues data...");
            var that = this;
            var promise = ajaxGet("_search?q=category:" + _category + "&size=300");
            promise.then(function (data) {
                var itemsArr = data.hits.hits;
                for (var i = 0; i < itemsArr.length; i++) {
                    var item = itemsArr[i];
                    var source = item._source;
                    var geoLoc = source.geoLocation.split(',');
                    var latLan = new google.maps.LatLng(parseFloat(geoLoc[0]), parseFloat(geoLoc[1]));

                    var marker = new google.maps.Marker({
                        position: latLan,
                        map: map,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: color[_category.toLowerCase()],
                        },
                        title: source.title
                    });
                    
                    marker.addListener("click", function () {
                        var randImgId = Math.floor(Math.random() * 5 - 1);
                        var url = (source.imageUrl != '' && source.imageUrl != 'no oper') ? "uploads/" + source.imageUrl : ("images/" + _category.toLowerCase() + randImgId + '.jpg');
                        var infoWindowHTML = "<div id='content'><h3>" + _category + " - " + Date.now() + "</h3><img id='content_id' src='http://35.196.140.124/" + url + "'/></div>"

                       //var infoWindowHTML = "<div id='content'><h3>" + this.getTitle() + "</h3><img id='content_id' src='http://35.196.140.124/uploads/1510296192074.jpg'/></div>"

                        var infowindow = new google.maps.InfoWindow({
                            content: infoWindowHTML
                        });
                        infowindow.open(this.get('map'), this);
                    });
                }
                that.hideNotification();
            }).fail(function (msg) {
                alert("failed to load data " + e);
            }).done();

        }.bind(this));
        map.addListener("click", function (event) {
            var submitConfirm = confirm("Do you want to submit this issue?");
            if (submitConfirm) {
                var timeStamp = Date.now();
                var title = _category + ' ' + timeStamp;
                var marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: color[_category.toLowerCase()]
                    },
                    title: title
                });
                map.panTo(event.latLng);
                var geoLoc = event.latLng.lat() + ' ,' + event.latLng.lng();
                var user = Users[Math.floor(Math.random() * Users.length - 1)];
                //alert(geoLoc + " : " + user);
                var data = {
                    "title": title,
                    "category": _category,
                    "geoLocation": geoLoc,
                    "CreationTimeStamp": timeStamp,
                    "imageUrl": '',
                    "userName": user,
                    "status": "reported"
                }
                function uploadIssue(timestamp, data) {
                    var promise = ajaxPut(timeStamp, data);
                    promise.then(function (data) {
                        alert("Issue reported successfully !!!");
                    }).fail(function (msg) {
                        alert("failed to connect to server " + msg);
                    }).done();
                }
                function cameraSuccess(imageurl) {
                    var img = imageurl.substr(imageurl.lastIndexOf('/') + 1);
                    data.imageUrl = img;
                    uploadIssue(img.split('.')[0], data);

                    //alert(Date.now() + " : " + imageurl);
                    this.FileUpload(imageurl);
                    marker.addListener("click", function () {
                        //var randImgId = Math.floor(Math.random() * 5 - 1);
                       // var url = (data.imageUrl != '' && data.imageUrl != 'no oper') ? "uploads/" + data.imageUrl : ("images/" + _category.toLowerCase() + randImgId + '.jpg');
                        var infoWindowHTML = "<div id='content'><h3>" + _category + " - " + Date.now() + "</h3><img id='content_id' src='" + imageurl + "'/></div>";
                        //var infoWindowHTML = "<div id='content'><h3>" + this.getTitle() + "</h3><img id='content_id' src='http://35.196.140.124/uploads/1510296192074.jpg'/></div>"

                        var infowindow = new google.maps.InfoWindow({
                            content: infoWindowHTML
                        });
                        infowindow.open(marker.get('map'), marker);
                    });
                }
                
               
                var userSelection = confirm("Do you want to upload the photo of the issue ?");
                if (userSelection) {
                    navigator.camera.getPicture(cameraSuccess.bind(this), cameraError.bind(this), { quality:40, destinationType: Camera.DestinationType.FILE_URI });
                } else {
                    uploadIssue(timestamp);
                    marker.addListener("click", function () {
                        var randImgId = Math.floor(Math.random() * 5 - 1);
                        var url = "images/" + _category.toLowerCase() + randImgId + '.jpg';
                        var infoWindowHTML = "<div id='content'><h3>" + _category + " - " + Date.now() + "</h3><img id='content_id' src='http://35.196.140.124/" + url + "'/></div>"
                        //var infoWindowHTML = "<div id='content'><h3>" + this.getTitle() + "</h3><img id='content_id' src='http://35.196.140.124/uploads/1510296192074.jpg'/></div>"

                        var infowindow = new google.maps.InfoWindow({
                            content: infoWindowHTML
                        });
                        infowindow.open(marker.get('map'), marker);
                    });
                }
            }
        }.bind(this));
        var latLong = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({ position: latLong });
        marker.setMap(map);
        map.setZoom(100);
        map.setCenter(marker.getPosition());//    watchMapPosition();
    };
    
    function cameraError(message) {

    }

    var onMapError = function (error) {
        alert('code: ' + error.code + '\nmessage: ' + error.message + '\n');
    }
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.handleKey = function () {

    };
    this.showNotification = function (message) {
        //Utils.removeClass(_notify, 'hide');
        _notify.innerText = message;
    };
    this.hideNotification = function () {
        //Utils.addClass(_notify, 'hide');
        _notify.innerText = '';
    };
    this.FileUpload = function (fileURL) {
        /*
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            console.log('file system open: ' + fs.name);
            fs.root.getFile(fileURL, { create: true, exclusive: false }, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
                        var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
                        var oReq = new XMLHttpRequest();
                        oReq.open("POST", "http://35.196.140.124/upload.php", true);
                        oReq.onload = function (oEvent) {
                            // all done!
                        };
                        // Pass the blob in to XHR's send method
                        oReq.send(blob);
                    };
                    // Read the file as an ArrayBuffer
                    reader.readAsArrayBuffer(file);
                }, function (err) { console.error('error getting fileentry file!' + err); });
            }, function (err) { console.error('error getting file! ' + err); });
        }, function (err) { console.error('error getting persistent fs! ' + err); });
        */
        var win = function (r) {
            //alert("Image Uploaded successfully !!!");
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

        var ft = new FileTransfer();
        ft.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                var progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
                this.showNotification("Uploading " + progress);
                if (progress == 100) {
                    this.hideNotification();
                    win();
                }
            } else {
                
            }
        }.bind(this);
        ft.upload(fileURL, encodeURI("http://35.196.140.124/upload.php"), win, fail, options);
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