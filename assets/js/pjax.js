(function(window, undefined) {
	'use strict';

	// 配置
	var config = {
		// 选择器，支持querySelector选择器
		selector: 'a',
		// 要替换内容的容器，可为选择器字符串或DOM对象
		container: 'body',
		// 是否在前进后退时开启本地缓存功能
		cache: true,
		// 是否对低版本浏览器启用hash方案
		hash: false,
		// 是否允许跳转到当前相同URL，相当于刷新
		same: true,
		// 调试模式，console.log调试信息
		debug: false,
		// 各个执行阶段的过滤函数，返回false则停止pjax执行
		filter: {
			selector: null,
			content: null
		},
		// 各个阶段的自定义函数，将替换默认实现
		custom: {
			append: null
		},
		// 事件监听，合并到coffcePJAX.on()里
		events: null
	};

	// 使用模式 枚举
	var SUPPORT = {
		// 不支持
		PASS: 0,
		// 使用Hash
		HASH: 1,
		// 使用HTML History API
		HTML5: 2
	};

	// 浏览器支持情况
	var suppost = history.pushState ? SUPPORT.HTML5 : ('onhashchange' in window ? SUPPORT.HASH : SUPPORT.PASS);

	// 工具集
	var util = {
		/**
		 * 合并多个对象，浅拷贝
		 */
		extend: function(prop) {
			Array.prototype.slice.call(arguments, 1).forEach(function(source){
				for (var key in source) {
					if (source[key] !== undefined) prop[key] = source[key];
				}
			});
			return prop;
		},
		/**
		 * 输出调试信息，仅在config.debug为true时输出
		 * @param {String} text
		 */
		log: function(text) {
			config.debug && console.log('pjax: ' + text);
		},
		/**
		 * 获取url中的路径，如: www.google.com/abcd 返回 /abcd
		 * @param {String} url
		 */
		getPath: function(url) {
			return url.replace(location.protocol + '//' + location.host, '');
		},
		/**
		 * 通过相对路径获取完整url
		 * @param {String} href
		 */
		getFullHref: function(href) {
			// 利用a标签来获取href，除此之外，a标签还能用来获取许多url相关信息
			var a = document.createElement('a');
			a.href = href;
			return a.href;
		},
		/**
		 * 判断dom是否匹配选择器
		 * @param {Object} element
		 * @param {String} selector
		 */
		matchSelector: function (element, selector) {
            var match =
                document.documentElement.webkitMatchesSelector ||
                document.documentElement.mozMatchesSelector ||
                document.documentElement.msMatchesSelector ||
                // 兼容IE8及以下浏览器
                function (selector, element) {
                    // 这是一个好方法，可惜IE8连indexOf都不支持
                    // return Array.prototype.indexOf.call(document.querySelectorAll(selector), this) !== -1;

                    if (element.tagName === selector.toUpperCase()) return true;

                    var elements = document.querySelectorAll(selector),
                        length = elements.length;

                    while (length--) {
                        if (elements[length] === this) return true;
                    }

                    return false;
                };

            // 重写函数自身，使用闭包keep住match函数，不用每次都判断兼容
            util.matchSelector = function (element, selector) {
                return match.call(element, selector);
            };

            return util.matchSelector(element, selector);
        }

	};

	var cache = {
		key: function(url) {
			return 'pjax['+ url +']';
		},
		get: function(url) {
			var value = sessionStorage.getItem(cache.key(url));
			return value && JSON.parse(value);
		},
		set: function(url, value) {
			// storage有容量上限，超出限额会报错
			try {
				sessionStorage.setItem(cache.key(url), JSON.stringify(value));
			} catch(e) {
				util.log('超出本地存储容量上线，本次操作将不使用本地缓存');
			}
		},
		clear: function() {
			var length = sessionStorage.length;
			while(length--) {
				var key = sessionStorage.key(length);
				if (key.indexOf('pjax') > -1) {
					sessionStorage.removeItem(key);
				}
			}
		}
	};

	var core = {
		// Forward And Back, 表示当前操作是否由前进和后退触发
		fnb: false,
		// 显示新页面
		show: function(title, html) {
			pjax.emit('end');
			document.title = title;
			if (config.custom.append) {
				config.custom.append(html, config.container);
			} else {
				config.container.innerHTML = html;
			}
			pjax.emit('init');
		},
		/**
		 * 异步请求方法
		 * @param url(string): 要请求的服务器地址
		 * @param type(string): 请求的传输方式
		 * @param data(obj): 请求中需要传输的数据对象
		 * @param success(function): 请求成功后的回调
		 * @param error(function): 请求失败后的回调
		 * @describe: 异步请求方法封装，服务器返回的数据会传入回调函数中，可通过形参获取，如：function(cb){cosnole.log(cb)}
		 */
		ajax: function (url, type, data, success, error) {
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

	        request.onerror = function() { error(this.response) };

	        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

	        type === 'POST' && request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	        type === 'POST' ? request.send(data) : request.send();
	    },
		// 跳转到指定页面
		turn: function(url, data, callback) {
			var eventData = {
				url: url,
				fnb: core.fnb,
				data: data
			};

			// 如果是由前进后退触发，并且开启了缓存，则试着从缓存中获取数据
			if (core.fnb && config.cache) {
				var value = cache.get(url);
				if (value !== null) {
					core.show(value.title, value.html);
					return;
				}
			}			

			// 开始发送请求
			var file = url.split('/');
			file = file[file.length-1];
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.setRequestHeader('PJAX','true');
			xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

			eventData.xhr = xhr;
			pjax.emit('ajaxBegin',eventData);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					// 暂且认为200-300之间都是成功的请求，304是缓存
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
						var title = xhr.getResponseHeader('PJAX-TITLE') || document.title,
							html = xhr.responseText;

						// 内容过滤
						if (config.filter.content && !config.filter.content(title, html)) {
							util.log('filter.content过滤不通过');
						} else {
							callback && callback(data);
							pjax.emit('ajaxSuccess', eventData);							

							if (!core.fnb) {
								// 修改URL
								if (suppost === SUPPORT.HTML5) {
									history.pushState(null, null, url);
								} else {
									location.hash = util.getPath(url);
								}								

								// 添加到缓存
								if (config.cache) {
									cache.set(url, {
										title: title,
										html: html
									});
								}
							}
							// 显示新页面
							core.show(title, html);
						}
					} else {
						pjax.emit('ajaxError', null, eventData);
						util.log('请求失败，错误码： '+ xhr.status);
					}

					core.fnb = true;
				}
			};
			xhr.send();
		}
	};

	var event = {
		// 在浏览器前进后退时执行
		popstate: function() {
			core.fnb = true;
			core.turn(location.href, null, null);
		},
		// hash改变时执行，由于过滤了手动改变，所以也只在浏览器前进后退时执行
		hashchange: function() {
			if (!core.fnb) return;
			core.turn(location.href.replace('#/', ''), null, null);
		},
		click: function(e) {
			var element = e.target || e.srcElement;

			// 过滤不匹配选择器的元素
			if (!util.matchSelector(element, config.selector)) return;

			// 调用自定义过滤函数
			if (config.filter.selector && !config.filter.selector(element)) return;

			// 过滤不需要pjax处理的dom元素
			if (element.hasAttribute('no-pjax')) return;

			// 优先使用 data-pjax-href
			var url = element.getAttribute('data-pjax-href');
			url = url ? util.getFullHref(url) : element.href;

			// 过滤空值
			if (url === undefined || url === '') return;

			// 阻止默认跳转，
			// 在这上面的return,仍会执行默认跳转，下面的就不会了
			e.preventDefault ? e.preventDefault() : (window.event.returnValue = false);

			// 阻止相同链接
			if (!config.same && url === location.href) return;

			// 标签上有这个值的话，将作为data传入新页面
			var data = element.getAttribute('data-pjax');
			core.fnb = false;
			core.turn(url, data, null);
		},
		bindEvent: function() {
			if (suppost === SUPPORT.HTML5) {
				window.addEventListener('popstate', event.popstate);
				window.addEventListener('click', event.click);
			} else {
				window.attachEvent('onhashchange', event.hashchange);
				document.documentElement.attachEvent('onclick', event.click);
			}
		},
		unbindEvent: function() {
			if (suppost === SUPPORT.HTML5) {
				window.removeEventListener('popstate', event.popstate);
				window.removeEventListener('click', event.click);
			} else {
				window.detachEvent('onhashchange', event.hashchange);
				doucment.documentElement.datachEvent('onclick', event.click);
			}
		}
	};

	var pjax = {
		ready: false,
		events: {},
		/**
		 * 初始化
		 * @param {Object} options 配置
		 */
		init: function(options) {
			if (suppost === SUPPORT.PASS) {
				util.log('不支持该版本的浏览器');
				return;
			};

			util.extend(config, options);

			// 将config.container转换为dom
			if (typeof config.container === 'string') {
				var selectorName = config.container;
				config.container = document.querySelectorAll(config.container);
				if (config.container === null) {
					throw new Error('找不到Element: '+ selectorName);
				}
			};

			// 监听配置里的事件
			if (config.events) {
				for (var key in config.events) {
					pjax.on(key, null, config.events[key]);
				}
			};

			// 如果一打开就已经带有hash, 则立刻发请求
			// 由于hash不会被传到服务器，此时页面多半是首页，如打开www.google.com/#/abck,其实是打开了www.google.com
			if (suppost === SUPPORT.HASH && location.hash.length > 2) {
				// 先删了当前内容，防止用户误会
				config.container.innerHTML = '';
				pjax.ready = true;

				core.fnd = false;
				core.turn(location.href.replace('#/',''), null, function(){
					pjax.emit('init');
				});
			}

			event.bindEvent();

			if (!pjax.ready) {
				pjax.ready = true;
				pjax.emit('init');
			}
		},
		// 注销插件
		destory: function() {
			pjax.events = null;
			event.unbindEvent();
			util.clearCache();
		},
		/**
		 * 使用pjax跳转到指定页面
		 * @param {String} url
		 * @param {Object} data  要传到新页面的参数，可以为null
		 * @param {Function} callback 请求成功时的回调
		 */
		turn: function (url, data, callback) {
			url = util.getFullHref(url);
			core.fnb = false;
			core.turn(url, data, callback);
		},
		/**
		 * 监听事件
		 * @param {String} type   		事件类型
		 * @param {String} url    		指定监听该事件的页面，null表示所有页面都监听
		 * @param {Function} listener   回调
		 */
		on: function(type, url, listener) {
		 	// 如果只有两个参数，跳过中间的url
		 	if (listener === undefined) {
		 		listener = url;
		 		url = null;
		 	} else if (url) {
		 		url = util.getFullHref(url);
		 	}

		 	pjax.events[type] = pjax.events[type] || [];
		 	pjax.events[type].push({
		 		listener: listener,
		 		url: url
		 	});
		},
		/**
		 * 解除监听
		 * @param {String} type 事件类型
		 * @param {String} url 解绑该事件的页面，null表示所有页面都解绑
		 */
		off: function(type, url) {
			if (url) {
				var list = pjax.events[type];
				url = util.getFullHref(url);

				for (var i = 0; i < list.length; i++) {
					if (list[i].url === url) {
						list.splice(i, 1);
						i--;
					}
				}

				if (list.length) return;
			}

			delete pjax.events[type];
		},
		/**
		 * 触发事件
		 * @param {String} type 事件类型
		 * @param {Object} args 参数
		 */
		emit: function(type, args) {
			var list = pjax.events[type];
			if (list) {
				for (var i = 0, length = list.length; i < length; i++) {
					list[i].listener.call(pjax. args);
				}
			}
		}
	};

	if (typeof define === 'function' && define.amd) {
		define([], function(){
			return pjax;
		});
	} else if (typeof module === 'object' && typeof exports === 'object') {
		modult.exports = pjax;
	} else {
		window.PJAX = pjax;
	}

})(window);