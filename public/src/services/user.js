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
    Vue.http.post('/api/auth/logout').then(() => {
        services.show.success('See you later').after(() => {
            services.reload();
        });
    })
    
}

user.avatar = function(fileid) {
    Vue.http.post('/api/settings/avatar', {fileid}).then(() => {
        services.show.success('Avatar has been updated').after(_ => {
            services.reload();
        });
    }).catch(e => {
        services.show.error(e.body.error);
    })
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