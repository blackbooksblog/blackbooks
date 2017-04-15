module.exports = {};

module.exports.query = function (query) {
    Vue.http.post('/api/search', {query}).then(res => {
        console.log(res.body);

        services.store.get('search').notify('result', res.body.body);
    }).catch(e => {
        console.log(e);
        try {
            services.show.error(e.body.error);
            services.store.get('search').notify('error', e.body.error);
        } catch (e) {
            
        }
    })
}

