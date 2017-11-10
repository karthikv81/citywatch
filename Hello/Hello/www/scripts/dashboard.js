function Dashboard() {
    var _el = document.getElementById("dashboard");
   
    this.show = function () {
        Utils.removeClass(_el, "hide");
        _el.innerHTML = '<iframe src="http://35.196.140.124:5601/goto/fb30c4f0309390701c47e42b03d39142?embed=true"></iframe>'
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
}