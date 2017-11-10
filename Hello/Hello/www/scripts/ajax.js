function ajaxPut(uri, data) {
    return Ajax("PUT", uri, data);
}
function ajaxGet(uri) {
    return Ajax("GET", uri);
}

var Users = [
    "Keshab.Panda@lnttechservices.com",
    "Karthik.Venkateshwaran@Meghdoot.inc",
    "Bill.Gates@Microsoft.com",
    "Steve.Jobs@OutOfThisWorld.com",
];
var Images = [
    "",
    ""
];

var Ajax = function (method, uri, data, timeout) {
    options = {
        method: method,
        async: true,
        type: 'json',
        user: null,
        password: null,
        data: JSON.stringify(data)
    };
    
    var deferred = Q.defer();

    var request = new XMLHttpRequest();
    request.timeout = timeout || 0;
    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }
        switch (true) {
            case[0, 200, 201].indexOf(request.status) !== -1:
                switch (options.type) {
                    case 'json':
                        try {
                            deferred.resolve(JSON.parse(request.responseText), request.status);
                        } catch (e) {
                            deferred.reject(e, request.status);
                            return;
                        }
                        break;
                    default:
                        deferred.resolve(request.responseText, request.status);
                }
                break;
            default:
                deferred.reject(request.responseText, request.status);
        }
    };
    request.open(options.method, "http://35.196.140.124:9200/bangalore/issue/" + uri, options.async, options.user, options.password);
    request.setRequestHeader("content-type", "application/json");
    options.data ? request.send(options.data) : request.send();
    return deferred.promise;
}; 

var Utils = {};
Utils.addClass = function (el, className) {
    if (el) {
        if (!Utils.hasClass(el, className)) {
            el.className = el.className + ' ' + className;
        }
    }
};
Utils.removeClass = function (el, className) {
    if (el && el.className) {
        el.className = el.className.replace(' ' + className, '').replace(className, '');
    }
};
Utils.hasClass = function (el, className) {
    if (el) {
        var r = new RegExp('\\b' + className + '\\b');
        return r.test(el.className);
    }
    return null;
};