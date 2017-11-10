function Main() {
    var _el = document.getElementById("main");
    this.show = function () {
        Utils.removeClass(_el, "hide");
        this.addListeners();
    };
    this.hide = function () {
        Utils.addClass(_el, 'hide');
    }
    this.addListeners = function () {
        var items = document.getElementsByTagName("li");
        for (var i = 0; i < items.length; i++) {
            items[i].onclick = function (event) {
                var target = event.currentTarget;
                alert("clicked on : " + target.id);
                this.hide();
                switch (target.id) {
                    case "mapslnk":
                        MapsApp.show();
                        break;
                    case "dashlnk":
                        DashApp.show();
                        break;
                    case "aboutlnk":
                        break;
                    default:
                }
            }.bind(this);
        }
    }
    this.handleKey = function () {

    };
}