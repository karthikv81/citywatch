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
        var main_ul = document.getElementById("main_options");
        var main_options = main_ul.getElementsByTagName("li");
        for (var i = 0; i < main_options.length; i++) {
            main_options[i].onclick = function (event) {
                var targ = event.currentTarget;
                switch (targ.id) {
                    case "mapslnk":
                        Utils.addClass(main_ul, 'hide');
                        var report_ul = document.getElementById("main_report_options");
                        Utils.removeClass(report_ul, 'hide');
                        var subOptions = report_ul.getElementsByTagName("li");
                        for (var i = 0; i < subOptions.length; i++) {
                            subOptions[i].onclick = function (event) {
                                var target = event.currentTarget;
                                MapsApp.show(target.id);
                                this.hide();
                            }.bind(this);
                        }
                        break;
                    case "dashlnk":
                        this.hide();
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