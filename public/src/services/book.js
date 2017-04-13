var post = {};

post.submit =  (name, body, link, cb) => {
    let object = {
        name, body, link, picture: services.store.get('file').get('id')
    };

    return Vue.http.post('/api/books/create', object).then((res) => {
        services.show.success("Success");
        services.store.get('books').notify('new_book', res.body.body._id);
        cb && cb();
    }).catch(err => {
        services.show.error(err.body.error);
    });
}

post.update = (id, title, body) => {

    console.log('book.update');

    let object = {
        _id: id, body, title 
    };

    return Vue.http.post('/api/books/update', object).then(res => {
        services.show.success('Changes Saved');
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.delete = (_id, cb = () => {}) => {

    console.log('book.delete');

    let object = {
        _id
    };

    return Vue.http.post('/api/books/delete', object).then(res => {
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

    return Vue.http.post('/api/books/undo-delete', object).then(res => {
        cb();
    }).catch(err => {
        services.show.error(err.body.error);
    })
}

post.get = (count, query) => {

    console.log('get api');

    count = count || 5;
    return Vue.http.post('/api/books/', {
        count 
    }).then(res => {
        services.store.get('books').set('arr', res.body.body.posts);
        services.store.get('books').set('count', res.body.body.posts.length);
        res.body.body.posts.map(post => {
            services.store.get('books').notify('new_post', post);
        }) 
    }).catch(e => {
         services.show.error(err.body.error);
    })
}

post.count = (query) => {

    return Vue.http.post('/api/books/count', {
        query 
    }).then(res => {
        services.store.get('books').set('server-count', res.body.body.count);
    })
}

post.older = (oldest, query, count) => {
    return Vue.http.post('/api/books/older', {
        oldest, query, count
    })
}

post.getOlder = (oldest, query, count) => {
    post.older(oldest,query,count).then((res) => {
        if (res.body.body.posts.length < count) {
            services.store.get('books').notify('show-more', false);
        }
        res.body.body.posts.map(post => {
            console.log('notify old_post');
            services.store.get('books').set('count', services.store.get('posts').get('count') + 1);
            services.store.get('books').notify('old-post', post);
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