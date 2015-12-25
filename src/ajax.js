export default function ajax(url, params) {
    var defaultParams = {
        method: 'GET',
        success: null,
        error: null
    };

    params = Object.assign({}, defaultParams, params);

    var request = new XMLHttpRequest();
    request.open(params.method, url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            params.success(data);
        } else if (params.error) {
            params.error();
        }
    };

    request.onerror = function () {
        if (params.error) {
            params.error();
        }
    };

    request.send();
}
