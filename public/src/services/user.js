let user = {};

user.login = function(login, password) {
    Vue.http.post('/api/auth/login', {
        login: login,
        password: password
    }).then(function (res) {
        services.show.success('Welcome, @' + login + '. The page is going to reload..').after(function() {
            services.reload();
        })
    }).catch(function (err) {
        services.show.error(err.body.error);
    });
}

user.logout = function() {
    document.cookie = "userid=0";
    services.show.success('See you later').after(() => {
        services.reload();
    });
}

user.register = function (login, password, name) {
    Vue.http.post('/api/auth/register', {
        login: login,
        password: password,
        name: name 
    }).then(
        function (res) {
            return Vue.http.post('/api/auth/login', {
                login: login,
                password: password
        });
    }).then(function (res) {
        services.show.success('Welcome aboard, @' + login + '!').after(function () {
            services.reload();
        })
    }).catch(function (err) {
        services.show.error(err.body.error);
    });
}

user.current = null;

Vue.http.get('/api/auth/me').then((obj) => {
    user.current = obj.body.body;
})

module.exports = user;