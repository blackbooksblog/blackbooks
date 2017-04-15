module.exports = class SearchComponent {

    static get inject() {
        return ['modal'];
    }

    constructor($, Modal) {
        this.Modal = Modal;
        this.$ = $;
        setTimeout(_ => this.setupEvents(), 200);
    }

    removeModal() {
        this.a = null;
    }

    val() {
        return this.$.val();
    }

    startSearch() {
        let query = this.val();

        services.search.query(query);

        // maybe animate progress
    }

    displayResults(res) {
        // maybe stop animating
        console.log('display results', res);
        let data = [
            {
                title: 'How to read books',
                id: '13749vjka',
                picture: 'j913jmfkma',
                book: true 
            },
            {
                title: 'Lala',
                id: '39fjkamk31',

            }
        ];

        this.createResultsWindow(res.results);

    }

    destroyResultsWindow() {
        if (this.resultsWindow) {
            this.resultsWindow.detach();
            this.resultsWindow = null;
        }
    }

    createResultsWindow (data = []) {
        this.destroyResultsWindow();

        this.resultsWindow = $(`
            <div class="results-window">
            </div>
        `);

        this.resultsWindow.appendTo('.black-window');
        this.resultsWindow.css({
            top: this.$.offset().top + 50,
            left: this.$.offset().left 
        })

        data.map(val => {
            let newEl = undefined;
            if (val.book) {
                newEl = $(`<div class="pointer search-result">
                    <span class="search-type"><i class="fa fa-book" aria-hidden="true"></i> Book:</span>
                    <span class="search-title">${val.title}</span>
                </div>`);
            } else {
                newEl = $(`<div class="pointer search-result">
                    <span class="search-type"><i class="fa fa-thumb-tack" aria-hidden="true"></i> Post:</span>
                    <span class="search-title">${val.title}</span>
                </div>`);
            }
            this.resultsWindow.append(newEl);
            newEl.on('click', _ => {
                // console.log(_);
                services.go.post(val._id);
            })
        });

        if (!data.length) {
            let newEl = $(`<div class="search-result">
                <span class="search-unsuccessful">Nothing was found :(</span>
            </div>`);
            this.resultsWindow.append(newEl);
        }
    }

    displayError(_) {
        // stop animating
    }

    setupEvents() {

        services.store.get('search').subscribe('result', _ => {
            this.displayResults(_);
        });

        services.store.get('search').subscribe('error', _ => {
            this.displayError(_);
        });

        this.$.on('keyup', _ => {
            if (_.keyCode == 13) {
                this.startSearch();
            }
        })

        this.$.on('click', () => {
            if (this.a) {
                return;
            }
            let Modal = this.Modal;

            this.a = new Modal($('.search-bar'), {
                opacity: 0.4
            });
            this.a.launch();
            this.a.onOpen = _ => $('.search-bar').focus();
            this.a.onClose = _ => this.removeModal();
        });
    }

    deinit() {
        this.$.detach();
    }
}