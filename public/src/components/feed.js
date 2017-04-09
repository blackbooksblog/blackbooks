let PostComponent = require('./post');

module.exports = class FeedComponent {
    static get inject() {
        return ['post'];
    }

    constructor ($, Post) {
        this.Post = Post;
        this.$ = $;
        this.offset = 0;
        this.scrollTop = 0;
        this.count = 10;
        services.post.get(this.count);
        this.$.on('scroll', _ => {
            let newScroll = this.$.scrollTop()
            this.onScroll(newScroll, newScroll - this.scrollTop);
            this.scrollTop = newScroll;
        });

        this.renderShowMore(true);

        services.store.get('posts').subscribe('new_post', id => {
            this.renderInFront(id);
        })
        services.store.get('posts').subscribe('show-more', val => {
            this.renderShowMore(val);
        })
        services.store.get('posts').subscribe('old-post', val => {
            console.log('-old-post');
            this.renderPost(val);
        })
        
    }

    renderShowMore(val) {
        if (!val) {
            this.showMore && this.showMore.detach();
            this.showMore = null;
            return;
        }
        if (this.showMore) {
            return;
        }
        this.showMore = $('<div class="feed-show-more">Show More</div>');
        this.showMore.on('click', e => {
            services.post.getOlder(services.post.oldest(), {}, 10);
        });

        this.$.append(this.showMore);
    }

    renderInFront(id) {
        let post = $(`[place="post-id${id}"]`);
        if (!post.length) {
             post = $('<div class="animated fadeIn">').attr('place', 'post-id' + id).attr('loaded', true);
             this.$.prepend(post);
        }
        new PostComponent(post);
        this.Post(id).apply(post);
    }

    renderPostAuto(id) {
        let post = $(`[place="post-id${id}"]`);
        if (!post.length) {
             post = $('<div>').attr('place', 'post-id' + id).attr("postid", id).attr('loaded', true);
             
             let posts = $('[postid]').toArray();
             if (!posts.length) {
                 post.prependTo(this.$);
                 return this.Post(id).apply(post);
             }

             posts.push(post[0]);

             posts.sort((a,b) => {
                 return $(a).attr('postid') > $(b).attr('postid');
             });

             let index = posts.indexOf(post[0]);
             let nextPost = posts[index+1];

             if (!nextPost) {
                 post.prependTo(this.$);
                 return this.Post(id).apply(post);
             }

             post.insertAfter($(nextPost));
        }

        this.Post(id).apply(post);
    }

    renderPost(id) {
        let post = $(`[place="post-id${id}"]`);
        if (!post.length) {
             post = $('<div>').attr('place', 'post-id' + id).attr("postid", id).attr('loaded', true);
             
             if (this.showMore) {
                 post.insertBefore(this.showMore)
             } else {
                this.$.append(post);
             }
             
        }
        new PostComponent(post);
        this.Post(id).apply(post);
    }

    onScroll(position, dy) {
        if (position > 20) {
            $('.header').slideUp();
            $('.header-white').removeClass('colourless');
            $('.header-white').addClass('drop-shadow');
            
            if (!$('.new-post').hasClass('display-false')) {
                $('.new-post').removeClass('drop-shadow');
            }

        } else {
            $('.header').slideDown();
            $('.header-white').addClass('colourless').removeClass('drop-shadow');
            if (!$('.new-post').hasClass('display-false')) {
                $('.new-post').addClass('drop-shadow');
            }
        }
    }

    deinit() {
        this.$.detach();
    }
}