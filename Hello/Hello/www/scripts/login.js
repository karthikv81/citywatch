function Login() {
    var _el = document.getElementById("login");
    document.getElementById("login_submit").onclick = function (event) {
        if (this.validate()) {
            this.hide();
            MainApp.show();
        } else {
            alert("Login UnSuccessful");
        }
    }.bind(this);
    this.show = function () {
        Utils.removeClass(_el, "hide");
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.validate = function (username, password) {
        alert("validating");
        return true;
    };
}