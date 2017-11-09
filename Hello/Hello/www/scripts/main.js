function Main() {
    var _el = document.getElementById("main");
    this.show = function () {
        Utils.removeClass(_el, "hide");
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.handleKey = function () {

    };
}