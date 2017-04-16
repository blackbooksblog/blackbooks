let PostComponent = require('./post');

let Feed = {};

Feed.controllers = {};

module.exports = class FeedComponent {
    static get inject() {
        return ['post'];
    }

    constructor ($, Post) {
        console.log('book feed construct');
        this.Post = Post;
        this.$ = $;
        this.offset = 0;
        this.scrollTop = 0;
        this.count = 10;
        services.book.get(this.count);
        this.$.on('scroll', _ => {
            let newScroll = this.$.scrollTop()
            this.onScroll(newScroll, newScroll - this.scrollTop);
            this.scrollTop = newScroll;
        });

        this.renderShowMore(true);

        services.store.get('books').subscribe('new_post', id => {
            this.renderInFront(id);
        })
        services.store.get('books').subscribe('show-more', val => {
            this.renderShowMore(val);
        })
        services.store.get('books').subscribe('old-post', val => {
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
            services.book.getOlder(services.book.oldest(), {}, 10);
        });

        this.$.append(this.showMore);
    }

    renderInFront(id) {
        let post = $(`[place="post-id${id}"]`);
        if (!post.length) {
             post = $('<div class="animated fadeIn">').attr('place', 'post-id' + id).attr('loaded', true);
             this.$.prepend(post);
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