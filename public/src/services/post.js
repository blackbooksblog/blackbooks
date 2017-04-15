var post = {};

post.submit =  (name, body, picture, cb) => {
    let object = {
        name, body, picture
    };

    return Vue.http.post('/api/posts/create', object).then((res) => {
        services.show.success("Success");
        services.store.get('posts').notify('new_post', res.body.body._id);
        // services.store.get('file').set('id', null);
        cb && cb();
    }).catch(err => {
        console.log(err);
        services.show.error(err.body.error);
    });
}

post.update = (id, title, body) => {

    console.log('post.update');

    let object = {
        _id: id, body, title 
    };

    return Vue.http.post('/api/posts/update', object).then(res => {
        services.show.success('Changes Saved');
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.changeImage = (_id, imageId, cb = () => {}) => {
    console.log('post.changeImage');

    let object = {
        _id, imageId 
    };

    let label = imageId ? 'updated' : 'removed';

    return Vue.http.post('/api/posts/change-image', object).then(res => {
        services.show.success(`Post image was successfully ${label}`);
        services.store.get('posts').notify('old-post', _id);
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.delete = (_id, cb = () => {}) => {

    console.log('post.delete');

    let object = {
        _id
    };

    return Vue.http.post('/api/posts/delete', object).then(res => {
        cb();
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.undoDelete = (_id, cb = () => {}) => {

    console.log('post.undoDelete');

    let object = {
        _id
    };

    return Vue.http.post('/api/posts/undo-delete', object).then(res => {
        cb();
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.get = (count, query) => {

    console.log('get api');

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