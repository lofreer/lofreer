document.addEventListener('touchstart',function(){
    return false;
},true);

var scaleReg = /scale(?:3d)?\(([^\)]+)\)/,
    translateReg = /translate(?:3d)?\(([^\)]+)\)/,
    letter = 'ABDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        

var topics = document.querySelector('.topic-list');
var minX = parseInt(topics.offsetWidth / 3, 10),
    startX, startY, has, direction;
var index = 0;

topics.addEventListener('touchstart', function(ev){
    ev.preventDefault();
    startX = ev.touches[0].clientX;
    startY = ev.touches[0].clientY;
}, false);

topics.addEventListener('touchmove', function(ev){
    ev.preventDefault();
    var scroll,
        currentX = ev.touches[0].clientX,
        currentY = ev.touches[0].clientY,
        diff = startX - currentX,
        distanceX = startX - currentX,
        distanceY = startY - currentY,
        fix = index * topics.offsetWidth;
    
    if (Math.abs(distanceX) >= Math.abs(distanceY)) {
        direction = diff > 0 ? true : false;

        if (!direction && index === 0) {
            scroll = Math.abs(diff);
        } else {
            scroll = direction ? -(Math.abs(diff) + fix) : -(fix - Math.abs(diff));
        }        
        
        setTransition(this, 'transform 0ms');
        setTransform(this, {x: scroll, y: 0});
    }
}, false);

topics.addEventListener('touchend', function(ev){
    ev.preventDefault();
    var endX = ev.changedTouches[0].clientX,
        endY = ev.changedTouches[0].clientY,
        distanceX = startX - endX,
        distanceY = startY - endY;
    has = Math.abs(startX - endX) > minX;
    if (Math.abs(distanceX) >= Math.abs(distanceY)) {
        if (has) {
            direction ? index++ : index--;
        }
        if (index < 0) index = 0;
        if (index > 2) index = 2;

        var scroll = -(index * topics.offsetWidth);
        
        setTransition(this, 'transform 300ms ease-out');
        setTransform(this, {x: scroll, y: 0});
    }

}, false);

function getTransform(el) {
    var reg = /\((.*?)\)/,
        result = {};
    result.x = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[4]);
    resutl.y = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[5]);
    return result;
}

function setTransform(el, val) {
    var css = 'translate3d('+ val.x +'px, '+ val.y +'px, 0)',
        style = el.style;
    style.transform = style.webkitTransform = css;
}

function setTransition(el, val) {
    var style = el.style;
    style.trnsition = style.webkitTransition = val;
}


function Answer(options) {
    return new Answer.fn.init(options);
}

Answer.fn = Answer.prototype = {
    init: function(options) {
        this.topics = {};
    },
    subscribe: function(key, val) {
        if (!this.topics[key]) {
            this.topics[key] = [];
        }
        this.topics[key].push(val);
        return this;
    },
    unsubscribe: function(key) {
        if (this.topics[key]) {
            delete this.topics[key];
        }
        return this;
    },
    publish: function(key) {
        if (!this.topics[key]) {
            return false;
        }
        var self = this;
        var subscribers = this.topics[key],
            length = subscribers ? subscribers.length : 0,
            args = Arrap.prototype.slice.call(arguments);
        args.shift();
        subscribers.forEach(function(item){
            item.apply(self, args);
        });
        return this;
    },
    getTransform: function(el) {
        var reg = /\((.*?)\)/,
            result = {};
        result.x = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[4]);
        resutl.y = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[5]);
        return result;
    },
    setTransform: function(el, val) {
        var css = 'translate3d('+ val.x +'px, '+ val.y +'px, 0)',
            style = el.style;
        style.transform = style.webkitTransform = css;
    },
    setTransition: function(el, val) {
        var style = el.style;
        style.trnsition = style.webkitTransition = val;
    }
}