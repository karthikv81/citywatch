document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    new CityWatch().onLoad();
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
    document.addEventListener("backbutton", function (event) {
        alert(event.type);
    }, false);
    document.addEventListener("menubutton", function (event) {
        alert(event.type);
    }, false);
    document.addEventListener("volumeupbutton", function (event) {
        alert(event.type);
    }, false);
    document.addEventListener("volumedownbutton", function (event) {
        alert(event.type);
    }, false);
    document.addEventListener('pause', function(event){
        alert(event.type);
    }, false);
    document.addEventListener('resume', function(event){
        alert(event.type);
    }, false);
}

