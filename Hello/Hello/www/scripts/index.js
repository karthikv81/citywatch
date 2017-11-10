document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    new CityWatch().onLoad();
};

var ReportsApp = new Reports();
var DashApp = new Dashboard();
var MapsApp = new Maps();
var MainApp = new Main();
var LoginApp = new Login();


function CityWatch() {
    var currentPage = MainApp;

    this.onLoad = function () {
        currentPage.show();
    }
    document.addEventListener("backbutton", function (event) {
//        alert(event.type);
    }, false);
    document.addEventListener("menubutton", function (event) {
        //alert(event.type);
    }, false);
    document.addEventListener("volumeupbutton", function (event) {
        //alert(event.type);
    }, false);
    document.addEventListener("volumedownbutton", function (event) {
        //alert(event.type);
    }, false);
    document.addEventListener('pause', function(event){
        //alert(event.type);
    }, false);
    document.addEventListener('resume', function(event){
        //alert(event.type);
    }, false);
}

