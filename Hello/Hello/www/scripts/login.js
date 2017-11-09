function Login() {
    var _el = document.getElementById("login");

    this.show = function () {
        Utils.removeClass(_el, "hide");
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.validate = function (username, password) {
        return true;
    };
}