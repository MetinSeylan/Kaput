module.exports = [
    {
        request: function (request) {

            let match = document.cookie.match(new RegExp('XSRF-TOKEN' + '=([^;]+)'));
            if (match) request.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);

            request.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('api_token');
            request.headers['Market'] = sessionStorage.getItem('market');
            return request;
        },

        response: function (response) {
            if (response.status == 401) {
                //   window.sessionStorage.clear();
                window.location.href = "/#auth";
            } else if (response.status == 500) {
                alert('Sunucu hatası');
                //window.location.reload(true);
            }
            return response;
        }
    }
    // add more
];