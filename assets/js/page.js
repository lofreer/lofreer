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
        },
        getContentText: function(html) {
            return ('' + html).replace(/<[^>]*>|\n/g, '');
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

    var addBook = Simple.createClass({
        getInitialState: function() {
            return {   
                name: '',
                author: '',
                preface: '',             
                visible: false
            }
        },

        handleShow: function(ev, visible) {
            this.setState({
                visible: visible
            });
        },

        handleContentChange: function(ev) {
            var element = ev.target,
                type = element.getAttribute('data-type');
                value = element.value;
            var data = {};
            data[type] = value;
            this.setState(data);
        },

        handleContentSave: function() {
            this.setState({
                visible: false
            })
            this.props.callback(this.state);
        },

        render: function() {
            var self = this;

            var modelTitle = ce('div', {'class': 'model-title'}, [
                '新增书籍'
            ]);


            var infoBox = ce('div', {'class': 'book-content'}, [
                ce('div', {'class': 'input-box'}, [
                    ce('label', null, ['书籍名称：']),
                    ce('input', {'class': 'book-name', 'data-type': 'name', oninput: self.handleContentChange.bind(self)})
                ]),
                ce('div', {'class': 'input-box'}, [
                    ce('label', null, ['书籍作者：']),
                    ce('input', {'class': 'book-author', 'data-type': 'author', oninput: self.handleContentChange.bind(self)})
                ]),
                ce('div', {'class': 'input-box'}, [
                    ce('label', null, ['书籍序言：']),
                    ce('textarea', {'class': 'book-preface', 'data-type': 'preface', oninput: self.handleContentChange.bind(self)})
                ])
            ]);

            var handlers = ce('div', {'class': 'model-handlers'}, [
                ce('div', {'class': 'model-button', onclick: this.handleContentSave.bind(self)}, ['确定']),
                ce('div', {'class': 'model-button', onclick: self.handleShow.bind(self, null, false)}, ['取消'])
            ])

            var className = 'book-model';
            if (this.state.visible) className += ' show';
            return ce('div', {'class': className}, [
                ce('div', {'class': 'model-content'}, [
                    modelTitle,
                    infoBox,
                    handlers
                ])
            ]);
        }
    });

    var edit = Simple.createClass({
        getInitialState: function() {
            return {
                title: '无标题文章',
                content: '',
                visible: false
            }
        },

        componentDidMount: function() {
            Edit.getEditor('editor', {
                focus: false,
                toolbarWrap: '#book-toolbar',
                toolbars: ['bold', 'italic', 'underline', 'strikethrough', 'quotes', 'heading', 'createlink', 'insertimage', 'insertvideo', 'undo', 'redo']
            });
        },

        componentDidUpdate: function() {
            if (this.props.visible) {
                Edit.getEditor('editor').setContent(this.props.chapter.content)
            }
        },

        handleSaveChapter: function(ev) {
            this.props.callback(this.refs.title.value, Edit.getEditor('editor').getContent());
        },

        render: function() {
            var chapter = this.props.chapter;
            return ce('div', {'class': 'editor-wrap'}, [
                ce('div', {'class': 'book-title'}, [
                    ce('input', {'ref': 'title', 'id': 'book-title', 'type': 'text', 'placeholder': '文章标题', 'value': chapter ? chapter.title : '无标题文章', oninput: this.handleSaveChapter.bind(this)})
                ]),
                ce('div', {'id': 'book-toolbar','class': 'book-toolbar'}, [
                    ce('div', {'class': 'handles'}, [
                        ce('div', {'class': 'button', onclick: null}, ['保存文章'])
                    ])
                ]),
                ce('div', {'id': 'editor', 'class': 'book-content'})
            ]);
        }
    });

    var chapter = Simple.createClass({

        getInitialState: function() {
            return {
                data: null,
                visible: false,
                key: 0,
                chapter: null
            }
        },

        handleShow: function(ev, visible, data) {            
            this.setState({
                visible: visible,
                data: data || this.state.data,
                chapter: (data && data.book[this.state.key]) || this.state.chapter
            });
        },

        handleChapterChange: function(key) {
            this.setState({
                key: key,
                chapter: this.state.data.book[key]
            });
        },

        handleAddChapter: function(ev, isAfter) {
            var book = this.state.data.book.slice();
            var newChapter = {
                title: '无标题文章',
                content: ''
            };
            isAfter ? book.push(newChapter) : book.unshift(newChapter);            
            this.setState({
                data: {
                    info: this.state.data.info,
                    book: book
                },
                chapter: newChapter,
                key: isAfter ? book.length - 1 : 0
            })
        },

        handleSaveChapter: function(title, content) {
            var book = this.state.data.book.slice();
            var newChapter = {
                title: title,
                content: content
            };
            book[this.state.key] = newChapter;
            this.setState({
                data: {
                    info: this.state.data.info,
                    book: book
                },
                chapter: newChapter
            })
        },

        render: function() {
            var self = this;
            var data = this.state.data;

            var chapterClose = ce('div', {'class': 'bookread-close', 'onclick': this.handleShow.bind(this)},[ '关&nbsp;闭' ]);

            var addChapterBefore = ce('div', {'class': 'add-chapter', onclick: this.handleAddChapter.bind(this)}, ['新建文章']);
            var addChapterAfter = ce('div', {'class': 'add-chapter', onclick: this.handleAddChapter.bind(this, null, true)}, ['新建文章']);

            var chapterList = ce('ul', {'class': 'chapter-list'}, data ? data.book.map(function(chapter, index){
                var className = 'chapter-item';
                if (self.state.key === index) className += ' active';
                return ce('li', {'class': className, onclick: self.handleChapterChange.bind(self, index)}, [
                    ce('h3', {'class': 'chapter-title'}, [ chapter.title ]),
                    ce('p', {'class': 'chapter-content'}, [ utils.getContentText(chapter.content) || ' '])
                ]);
            }) : null);

            var chapter = ce('div', {'class': 'chapter'}, [
                ce('div', {'class': 'left'}, [
                    addChapterBefore,
                    chapterList,
                    addChapterAfter                    
                ]),
                ce('div', {'class': 'right'}, [
                    ce(edit, {chapter: this.state.chapter, visible: this.state.visible, callback: this.handleSaveChapter.bind(this)})
                ])
            ]);

            var className = 'chapter-wrap';
            if (this.state.visible) className += ' show';
            return ce('div', {'class': className}, [
                chapterClose,
                chapter
            ])
        }
    });

    // 临时dom
    var bookTemp = Simple.createClass({

        getInitialState: function() {
            return {
                data: null,
                visible: false
            }
        },

        handleShow: function(ev, data, visible) {
            this.setState({
                data: data,
                visible: visible
            })
        },

        componentDidUpdate: function() {
            if (this.state.visible) {
                var self = this;
                var tempitems = Array.prototype.slice.call(document.querySelectorAll('.temp .temp-item'));
                this.refs.bookRead.handleShow(null, true, tempitems, this.state.data.info);
                this.setState({
                    visible: false
                });
            }            
        },

        render: function() {
            var tempitems = (this.state.data && this.state.visible) ? this.state.data.book.map(function(book) {
                return ce('div', {'class': 'temp-item'}, [
                    ce('h2', null, [book.title]),
                    book.content
                ]);
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
                visible: false,
                book: null,
                info: null
            }
        },

        handleShow: function(ev, visible, book, info) {
            this.setState({
                visible: visible,
                book: book,
                info: info
            });
        },

        render: function() {
            var book = [],
                temps = [],
                pages = [];
            this.state.book && this.state.book.forEach(function(item) {
                var childs = Array.prototype.slice.call(item.childNodes).filter(function(el) {
                    return el.nodeType === 1;
                });
                book.push(childs);
            });
            book.forEach(function(chapter){
                utils.parse(chapter, 660, temps);
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
            this.state.book && pages.unshift([cover, null]);
            this.state.book && pages.push([null, null]);
            
            var zIndex = pages.length;

            bookinfo = ce('div', {'class': 'bookinfo'}, [
                ce('div', {'class': 'content'}, [
                    ce('p', {'class': 'preface'}, [ this.state.info ? this.state.info.preface : ' ' ]),
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
            
            var bookreadClose = ce('div', {'class': 'bookread-close', 'onclick': this.handleShow.bind(this, null, false, this.state.book, this.state.info)},[ '关&nbsp;闭' ]);
            var className = 'bookread-wrap';
            if (this.state.visible) className += ' show';
            var bookreadWrap = ce('div', {'class': className}, [ bookreadClose, bookread ]);
            return bookreadWrap;
        }

    });

    var num = 0;
    // 书架展示
    var bookCase = Simple.createClass({

        getInitialState: function() {
            return {
                books: window.datas,
                bookLength: length,
                book: null,
                tempitems: []
            }
        }, 

        handleGetTemp: function(data) {
            this.refs.bookTemp.handleShow(null, data, true);
        },

        handleAddBook: function() {
            this.refs.addBook.handleShow(null, true);
        },

        handlechapter: function(data) {
            this.refs.chapter.handleShow(null, true, data);
        },

        handleAddBookSave: function(data) {
            var index = this.state.books.indexOf(null);
            var book = {
                books: [],
                info: {
                    author: data.author,
                    name: data.name,
                    preface: data.preface
                }
            };

            var tempData = this.state.books.slice();
            tempData.splice(index, 1, book);
            this.setState({
                books: tempData,
                bookLength: 16 - index - 1
            });
        },

        render: function() {

            var self = this;            
            
            var bookTemplate = function(data) {
                return ce('div', {'class': 'book', 'onclick': isAdmin ? self.handlechapter.bind(self, data) : self.handleGetTemp.bind(self, data)}, [
                    ce('p', {'class': 'name'}, [ data.info.name ]),
                    ce('p', {'class': 'author'}, [ '—' + data.info.author ])
                ]);
            }

            var bookPlus = function() {
                return ce('div', {'class': 'bookbox'}, [
                    ce('div', {'class': 'bookwrap'}, [
                        ce('div', {'class': 'bookplus', 'onclick': self.handleAddBook.bind(self)})
                    ])
                ]);
            }
            var root = ce('div', {class: 'root'}, [
                ce(bookTemp, {ref: 'bookTemp', data: this.state.book}),
                ce('div', {'class': 'bookcase'}, this.state.books.map(function(book, index) {
                    if (index + self.state.bookLength === 16 && isAdmin) {
                        return bookPlus();
                    }
                    return ce('div', {'class': 'bookbox'}, [
                        ce('div', {'class': 'bookwrap'}, [
                            book ? bookTemplate(book) : null
                        ])
                    ]);
                })),
                ce(addBook, {ref: 'addBook', callback: self.handleAddBookSave.bind(self)}),
                ce(chapter, {ref: 'chapter'})
                // ce('div', {ref:'div'}, [
                //     ce('p', {ref:'p'}, [
                //         ce('span', {ref:'span'})
                //     ])
                // ]),
                // ce('h1', {ref:'h1'}, [
                //     ce('h2', {ref:'h2'})
                // ]),
            ])
            console.log(this)
            return root;
        }

    });

    Simple.render(ce(bookCase, {type: 'bookCase'}), document.body);  

})();