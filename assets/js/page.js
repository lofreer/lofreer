(function(){    
    
    var ce = window.CE;

    function Page(data) {

        if (!data) return;

        var bookread, bookinfo, bookwrap, temp, tempitems;        

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

        var loop = function() {
            setTimeout(function(){
                if (marks.length) {
                    loop();
                } else {
                    init();
                }
            }, 1000/60)
        };

        loop();

        function init() {
            var books = [],
                temps = [],
                pages = [];

            tempitems.forEach(function(item) {
                var childs = Array.prototype.slice.call(item.childNodes).filter(function(el) {
                    return el.nodeType === 1;
                });
                books.push(childs);
            });

            books.forEach(function(book){
                parse(book, 600, temps);
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
                ce('p', {'class': 'name'}, [data.info.name]),
                ce('p', {'class': 'author'}, [data.info.author])
            ]
            pages.unshift([cover, null]);

            console.log(pages)

            var zIndex = pages.length;

            bookinfo = ce('div', {'class': 'bookinfo'}, [
                ce('div', {'class': 'content'}, [
                    ce('p', {'class': 'preface'}, [ data.info.preface ]),
                    ce('p', {'class': 'author'}, [ data.info.author ])
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

            var bookreadClose = ce('div', {'class': 'bookread-close'},[ '关闭' ], {
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

    function parse(els, height, pages) {
        var index = 0,
            h = 0,
            i = 0,
            len = els.length;
        while(i < len) {
            h += els[i].offsetHeight;
            if (h > height) {
                index = i;
                break;
            }
            i++;
        }
        pages.push(els.splice(0,i));
        
        if (els.length) {
            parse(els, height, pages);
        }
    }

    window.Page = Page;

})();