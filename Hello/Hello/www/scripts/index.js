document.addEventListener('deviceready', onDeviceReady.bind(this), false);
var map;
function onDeviceReady() {
    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);
};

var LoginApp = new Login();
var MainApp = new Main();
var MapsApp = new Maps();
var DashApp = new Dashboard();
var ReportsApp = new Reports();

function CityWatch() {

    var currentPage = LoginApp;

    this.onLoad = function () {
        currentPage.show();
    }
    document.addEventListener("keydown", function () {

    }, false);
}

