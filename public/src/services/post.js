var post = {};

post.submit =  (name, body, cb) => {
    let object = {
        name, body, picture: services.store.get('file').get('id')
    };

    return Vue.http.post('/api/posts/create', object).then((res) => {
        services.show.success("Success");
        services.store.get('posts').notify('new_post', res.body.body._id);
        services.store.get('file').set('id', null);
        cb && cb();
    }).catch(err => {
        services.show.error(err.body.error);
    });
}

post.get = (count, query) => {

    count = count || 5;
    return Vue.http.post('/api/posts/', {
        count 
    }).then(res => {
        services.store.get('posts').set('arr', res.body.body.posts);
        services.store.get('posts').set('count', res.body.body.posts.length);
        res.body.body.posts.map(post => {
            services.store.get('posts').notify('new_post', post);
        }) 
    }).catch(e => {
         services.show.error(err.body.error);
    })
}

post.count = (query) => {

    return Vue.http.post('/api/posts/count', {
        query 
    }).then(res => {
        services.store.get('posts').set('server-count', res.body.body.count);
    })
}

post.older = (oldest, query, count) => {
    return Vue.http.post('/api/posts/older', {
        oldest, query, count
    })
}

post.getOlder = (oldest, query, count) => {
    post.older(oldest,query,count).then((res) => {
        if (res.body.body.posts.length < count) {
            services.store.get('posts').notify('show-more', false);
        }
        res.body.body.posts.map(post => {
            console.log('notify old_post');
            services.store.get('posts').set('count', services.store.get('posts').get('count') + 1);
            services.store.get('posts').notify('old-post', post);
        }) 
    })
}

post.oldest = () => {
    let post = $('.single-post:last');
    if (!post.length) {
        return null;
    }
    let id = post.parent().attr('place');
    id = id.split('post-id')[1];
    return id;
}



module.exports = post;