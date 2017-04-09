let mod = {};

mod.send = function (file) {
    let form = new FormData();
    form.append('file', file);
    Vue.http.post('/api/images/save', form).then(function(res){
        // mod.fileid = res.body.body.id;
        services.store.get('file').set('id', res.body.body.id);
        services.show.success('File was successfully uploaded');
    }).catch (e => {
        services.show.error(e.body.error);
    })
}

module.exports = mod;