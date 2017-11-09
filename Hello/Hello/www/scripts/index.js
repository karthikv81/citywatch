function CityWatch() {
    var LoginApp = new Login();
    var MainApp = new Main();
    var MapsApp = new Maps();
    var DashApp = new Dashboard();
    var ReportsApp = new Reports();

    var currentPage = LoginApp;

    this.onLoad = function () {
        currentPage.show();
    }
    document.addEventListener("keydown", function () {

    }, false);
}

