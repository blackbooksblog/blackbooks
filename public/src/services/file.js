let mod = {};

mod.send = function (file, id) {
    console.log('id = ', id);
    let form = new FormData();
    form.append('file', file);
    Vue.http.post('/api/images/save', form, {
        xhr: {
            onprogress: _ => {
                console.log(_);
            }
        }
    }).then(function(res){
        // mod.fileid = res.body.body.id;
        services.store.get('file').set(`id-${id}`, res.body.body.id);
        services.show.success('File was successfully uploaded');
    }).catch (e => {
        services.show.error(e.body.error);
    })
}

let ids = {
    last: 0
};

mod.getId = _ => {
    ids.last++;
    return ids.last;
};

module.exports = mod;