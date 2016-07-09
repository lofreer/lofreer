/******************************* 公共模块 start ****************************/
(function(){

	var app = {};

	function _extend(prop) {
		[].slice.call(arguments, 1).forEach(function(source) {
	  		for (var key in source) {
	       		if (source[key] !== undefined) 
	       			prop[key] = source[key];
	  		}
		});
	   	return prop
	};	

	function Events(){};

	Events.prototype = {
		on: function(type,selector,handler,capture) {
			capture = !!capture;
			if (Object.prototype.toString.call(selector) === '[object String]') {
					this.addEventListener(type, function(e){
						[].slice.call(this.querySelectorAll(selector)).forEach(function(item){	
							(e.target === item || item.contains(e.target)) && handler.call(item,e);
						});
					}, capture);
			} else {
				handler = !!handler;
				this.addEventListener(type, selector, handler);
			}
			return this;
		},
		off: function(type,handler) {
			this.removeEventListener(type, handler);
			return this;
		},
		emit: function(type) {
			var event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, false);
			this.dispatchEvent(event);
			return this;
		}
	};

	_extend(HTMLElement.prototype,Events.prototype);

	app.events = {
		each: function(callback) {
			[].forEach.call(this,function(el, index){
				callback.call(el,el,index);
			});
			return this;
		},
		on: function(type,selector,handler,capture) {
			this.each(function(){
				this.on(type,selector,handler,capture);
			});
			return this;
		},
		off: function(type,handler) {
			this.each(function(){
				this.off(type, handler);
			});
			return this;
		},
		emit: function(type) {
			this.each(function(){
				this.emit(type);
			});
			return this;
		}	
	}

	app.el = function(selector, context) {
		context = context || document;
		var dom, found,
			maybeID = selector[0] === '#',
			maybeClass = !maybeID && selector[0] === '.',
			nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
			isSimple = /^[\w-]*$/.test(nameOnly);
		dom = ((context != null && context.nodeType == context.DOCUMENT_NODE) && isSimple && maybeID) ?
			( (found = context.getElementById(nameOnly)) ? [found] : [] ) :
			(context.nodeType !== 1 && context.nodeType !== 9) ? [] :
			Array.prototype.slice.call(isSimple && !maybeID ? maybeClass ? context.getElementsByClassName(nameOnly) : 
			context.getElementsByTagName(selector) : context.querySelectorAll(selector));
		
		_extend(dom,this.events);
		
		return dom;
	}

	function elMain(tagName,props,children,handles) {
		this.tagName = tagName;
		this.props = props;
		this.children = children;
		this.handles = handles;
	};

	elMain.prototype.render = function() {
		var el = document.createElement(this.tagName),
			props = this.props,
			children = this.children || [],
			handles = this.handles || {};

		for (var prop in props) {
			el.setAttribute(prop,props[prop]);
		}

		for (var handle in handles) {
			el.addEventListener(handle,handles[handle],false);
		}

		children.forEach(function(child){
			el.appendChild((child instanceof elMain) ? child.render() : document.createTextNode(child));
		});
		return el;
	}

	app.createEl = function(tagName,props,children,handles) {
		return new elMain(tagName,props,children,handles);
	}

	this.app = app;

}).call(this);
/******************************* 公共模块 end ****************************/