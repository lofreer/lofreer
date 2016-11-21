(function(){    
    
    var ce = window.CE;

    var utils = {
        parse: function(els, height, pages) {
            var h = 0,
                i = 0,
                len = els.length;
            while(i < len) {
                // h += (els[i].offsetHeight + parseInt(getComputedStyle(els[i])['marginTop']));
                h += els[i].offsetHeight;
                if (h > height) {
                    break;s
                }
                i++;
            }
            pages.push(els.splice(0,i));
            
            if (els.length) {
                this.parse(els, height, pages);
            }
        }
    };

    function Page(data) {
        if (!data) return;
        this.bookcase(data);
    }

    Page.prototype = {
        bookcase: function(data) {
            var self = this, length = 16 - data.length, bookcase;
            
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    data.push(null);
                }
            }

            bookcase = ce('div', {'class': 'bookcase'}, data.map(function(book) {
                return ce('div', {'class': 'bookbox'}, [
                    ce('div', {'class': 'bookwrap'}, [
                        book ? ce('div', {'class': 'book'}, [
                            ce('p', {'class': 'name'}, [ book.info.name ]),
                            ce('p', {'class': 'author'}, [ '—' + book.info.author ])
                        ], {
                            click: function() {
                                self.bookread(book);
                            }
                        }) : null
                    ])
                ]);
            }));

            document.body.appendChild(bookcase);

        },
        bookread: function(data) {
            var self = this, temp, tempitems;
            tempitems = data.books.map(function(book) {
                return ce('div', {'class': 'temp-item'}, [ book.content ]);
            });

            temp = ce('div', {'class': 'temp'}, tempitems);

            document.body.appendChild(temp);

            var imgs = Array.prototype.slice.call(temp.querySelectorAll('img'));
            var marks = imgs.map(function(item, i){
                    return i;
                });

            imgs.forEach(function(img) {
                img.addEventListener('load', function(ev) {
                    marks.shift();
                });
            });

            (function loop(){
                setTimeout(function(){
                    if (marks.length) {
                        loop();
                    } else {
                        self.readrender(tempitems, temp, data);
                    }
                }, 1000/60)
            })();
        },
        readrender: function(tempitems, temp, data) {
            var self = this,
                books = [],
                temps = [],
                pages = [];

            tempitems.forEach(function(item) {
                var childs = Array.prototype.slice.call(item.childNodes).filter(function(el) {
                    return el.nodeType === 1;
                });
                books.push(childs);
            });

            books.forEach(function(book){
                utils.parse(book, 660, temps);
            });
            temp.parentNode.removeChild(temp);
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
                ce('p', {'class': 'name'}, [ data.info.name ]),
                ce('p', {'class': 'author'}, [ '—' + data.info.author ])
            ]
            pages.unshift([cover, null]);
            pages.push([null, null]);

            var zIndex = pages.length;

            bookinfo = ce('div', {'class': 'bookinfo'}, [
                ce('div', {'class': 'content'}, [
                    ce('p', {'class': 'preface'}, [ data.info.preface ]),
                    ce('p', {'class': 'author'}, [ '—' + data.info.author ])
                ])
            ]);

            bookwrap = ce('div', {'class': 'bookwrap'}, pages.map(function(page, index) {
                var className = 'page';
                if (index === 0) className += ' cover';
                return ce('div', {'class': className, 'style': 'z-index:' + (zIndex--)}, page.map(function(item, i) {
                    return ce('div', {'class': i !== 1 ? 'front' : 'back'}, [
                        ce('div', {'class': 'content'}, item)
                    ], {
                        click: function() {
                            var page = this.parentNode;                        
                            page.classList.remove(i === 1 ? 'front' : 'back');
                            page.classList.add(i === 1 ? 'back' : 'front');
                        }
                    })
                }))
            }));

            bookread = ce('div', {'class': 'bookread'}, [
                bookinfo,
                bookwrap
            ]);

            var bookreadClose = ce('div', {'class': 'bookread-close'},[ '关&nbsp;闭' ], {
                click: function() {
                    var parent = this.parentNode;
                    parent.classList.remove('show');
                    setTimeout(function(){
                        parent.parentNode.removeChild(parent);
                    }, 2000);
                }
            });

            var bookreadWrap = ce('div', {'class': 'bookread-wrap'}, [ bookreadClose, bookread ]);

            document.body.appendChild(bookreadWrap);

            setTimeout(function(){
                bookreadWrap.classList.add('show');
            }, 200);
        }
    }

    window.Page = function(data) {
        return new Page(data);
    };

})();