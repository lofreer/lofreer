(function(){    
    
    var ce = Simple.createElement;

    var utils = {
        parse: function(els, height, pages) {
            var h = 0,
                i = 0,
                len = els.length;
            while(i < len) {
                // h += (els[i].offsetHeight + parseInt(getComputedStyle(els[i])['marginTop']));
                h += els[i].offsetHeight;
                if (h > height) {
                    break;
                }
                i++;
            }
            var nodes = els.splice(0,i);
            var nodeString = '';
            nodes.forEach(function(node){
                nodeString += node.outerHTML;
            });
            pages.push(nodeString);
            // pages.push(nodes);
            
            if (els.length) {
                this.parse(els, height, pages);
            }
        },
        urlParse: function(name,query) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),r;
            if(query){
                r = query.match(reg);
            }else{
                r = window.location.search.substr(1).match(reg);
            }
            if(r!=null)return unescape(r[2]); return null;
        }
    };
    
    var isAdmin = utils.urlParse('account') === 'lofreer';

    var data = window.datas;
    var length = 16 - data.length;

    if (length > 0) {
        for (var i = 0; i < length; i++) {
            data.push(null);
        }
    }


    // 临时dom
    var bookTemp = Simple.createClass({

        getInitialState: function() {
            return {
                data: null
            }
        },

        handleShow: function(ev, data) {
            this.setState({
                data: data
            })
        },

        handleBookRead: function(books) {
            this.refs.bookRead.handleShow(null, books);
        },

        componentDidUpdate: function() {
            var self = this;
            var tempitems = Array.prototype.slice.call(document.querySelectorAll('.temp .temp-item'));
            this.refs.bookRead.handleShow(null, tempitems, this.state.data.info);
        },

        render: function() {
            var tempitems = this.state.data ? this.state.data.books.map(function(book) {
                return ce('div', {'class': 'temp-item'}, [ book.content ]);
            }) : null;

            var temp = ce('div', {'class': 'temp'}, tempitems);

            var element = ce('div', null, [
                temp,
                ce(bookRead, {ref: 'bookRead'})
            ]);
            return element;
        }

    });

    // 书籍展示
    var bookRead = Simple.createClass({

        getInitialState: function() {
            return {
                data: null
            }
        },

        handleShow: function(ev, books, info) {
            this.setState({
                books: books,
                info: info
            });
        },

        render: function() {
            var books = [],
                temps = [],
                pages = [];
            this.state.books && this.state.books.forEach(function(item) {
                var childs = Array.prototype.slice.call(item.childNodes).filter(function(el) {
                    return el.nodeType === 1;
                });
                books.push(childs);
            });
            books.forEach(function(book){
                utils.parse(book, 660, temps);
            });
           
            temps.forEach(function(item, i) {
                if ((i+1)%2 === 0) {
                    pages.push(temps.slice(i-1, i-1+2));
                } else if (temps.length%2 !== 0 && i === temps.length - 1) {
                    var arr = temps.slice(i);
                    arr.push([]);
                    pages.push(arr);
                }
            });
            var cover = [
                ce('p', {'class': 'name'}, [this.state.info ? this.state.info.name : null ]),
                ce('p', {'class': 'author'}, [ '—' + ( this.state.info ? this.state.info.author : null ) ])
            ]
            this.state.books && pages.unshift([cover, null]);
            this.state.books && pages.push([null, null]);

            var zIndex = pages.length;

            bookinfo = ce('div', {'class': 'bookinfo'}, [
                ce('div', {'class': 'content'}, [
                    ce('p', {'class': 'preface'}, [ this.state.info ? this.state.info.preface : null ]),
                    ce('p', {'class': 'author'}, [ '—' + ( this.state.info ? this.state.info.author : null ) ])
                ])
            ]);
            bookwrap = ce('div', {'class': 'bookwrap'}, pages.map(function(page, index) {
                var className = 'page';
                if (index === 0) className += ' cover';
                return ce('div', {'class': className, 'style': 'z-index:' + (zIndex--)}, page.map(function(item, i) {
                    return ce('div', {'class': i !== 1 ? 'front' : 'back', 'onclick': function(ev){
                        var page = ev.target.parentNode.parentNode;                        
                        page.classList.remove(i === 1 ? 'front' : 'back');
                        page.classList.add(i === 1 ? 'back' : 'front');
                    }}, [
                        ce('div', {'class': 'content'}, item)
                    ])
                }))
            }));

            bookread = ce('div', {'class': 'bookread'}, [
                bookinfo,
                bookwrap
            ]);

            var bookreadClose = ce('div', {'class': 'bookread-close', 'onclick': this.handleShow.bind(this)},[ '关&nbsp;闭' ]);
            var className = 'bookread-wrap';
            if (this.state.books) className += ' show';
            var bookreadWrap = ce('div', {'class': className}, [ bookreadClose, bookread ]);
            return bookreadWrap;
        }

    });

    var num = 0;
    // 书架展示
    var bookCase = Simple.createClass({

        getInitialState: function() {
            return {
                books: data,
                book: null,
                tempitems: []
            }
        },       

        handleGetTemp: function(data) {
            this.refs.bookTemp.handleShow(null, data);
        },

        render: function() {

            var self = this;            
            
            var bookTemplate = function(data) {
                return ce('div', {'class': 'book', 'onclick': self.handleGetTemp.bind(self, data)}, [
                    ce('p', {'class': 'name'}, [ data.info.name ]),
                    ce('p', {'class': 'author'}, [ '—' + data.info.author ])
                ]);
            }

            var bookPlus = function() {
                return ce('div', {'class': 'bookbox'}, [
                    ce('div', {'class': 'bookwrap'}, [
                        ce('div', {'class': 'bookplus', 'onclick': function(){
                            alert('+')
                        }},[])
                    ])
                ]);
            }

            var root = ce('div', {class: 'root'}, [
                ce(bookTemp, {ref: 'bookTemp', data: this.state.book}),
                ce('div', {'class': 'bookcase'}, this.state.books.map(function(book, index) {
                    if (index + length === 16 && isAdmin) {
                        return bookPlus();
                    }
                    return ce('div', {'class': 'bookbox'}, [
                        ce('div', {'class': 'bookwrap'}, [
                            book ? bookTemplate(book) : null
                        ])
                    ]);
                }))
            ])
            console.log(this)
            return root;
        }

    });

    Simple.render(ce(bookCase, {type: 'bookCase'}), document.body);    

})();