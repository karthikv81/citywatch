function Dashboard() {
    var _el = document.getElementById("dashboard");

    this.show = function () {
        Utils.removeClass(_el, "hide");
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
}