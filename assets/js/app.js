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

	/**
	 * 异步请求方法
	 * @param url(string): 要请求的服务器地址
	 * @param type(string): 请求的传输方式
	 * @param data(obj): 请求中需要传输的数据对象
	 * @param success(function): 请求成功后的回调
	 * @param error(function): 请求失败后的回调
	 * @describe: 异步请求方法封装，服务器返回的数据会传入回调函数中，可通过形参获取，如：function(cb){cosnole.log(cb)}
	 */
    app.ajax = function (url, type, data, success, error) {
        if (!url) return;
        type = type.toUpperCase();

        var request = new XMLHttpRequest();
        request.open(type, url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                success && success(JSON.parse(this.response));
            } else {
                error && error(this.response);
            }
        };

        request.onerror = function () { error(this.response) };
        request.setRequestHeader('Accept','application/json');

        type === 'POST' && request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        type === 'POST' ? request.send(toHash(data)) : request.send();
    };

	/**
	 * js模板引擎
	 * @parame text(template DomString): html模板文本
	 * @parame data(dom object): 模板插入数据
	 **/
    app.template = function (text, data) {
        // 模板匹配正则
        var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
        //模板文本中的特殊字符转义处理
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        return (function (text, data) {
            //记录当前扫描位置;函数体数组初始化
            var index = 0, function_body = ["var temp = [];\n"];
            text.replace(matcher, function (match, interpolate, evaluate, offset) {
                //找到第一个匹配后，将前面部分作为普通字符串拼接的表达式，并添加处理转义字符
                function_body.push("temp.push('" + text.slice(index, offset).replace(escaper, function (match) { return '\\' + escapes[match]; }) + "');\n");
                // console.log(function_body)
                //如果是<% ... %>直接作为代码片段，evaluate就是捕获的分组
                if (evaluate) function_body.push(evaluate + '\n');
                //如果是<%= ... %>追加字符串，interpolate就是捕获的分组
                if (interpolate) function_body.push("temp.push(" + interpolate + ");\n");
                //递增index，跳过evaluate或者interpolate
                index = offset + match.length;
                //返回匹配值，当前使用场景可忽略
                return match;
            });
            //最后返回编译后的DOM代码    
            function_body.push("return temp.join('');");
            var render = new Function('data', function_body.join(''));
            return render(data);
        })(text, data);
    };

	// Date 拓展方法
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1,                 		//月份 
            "d+": this.getDate(),                   		//日 
            "h+": this.getHours(),                   		//小时 
            "m+": this.getMinutes(),                 		//分 
            "s+": this.getSeconds(),                 		//秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), 	//季度 
            "S": this.getMilliseconds()             		//毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    /**
    * 改变date字符串
    * @parame dateStr(string): 生成date对象用的字符串
    * @parame type(string): 要显示的格式
    **/
    app.date = function (dateStr, type) {
        var now = new Date(dateStr.replace(/-/g, '/'));
        return now.Format(type);
    };

	this.app = app;

}).call(this);
/******************************* 公共模块 end ****************************/