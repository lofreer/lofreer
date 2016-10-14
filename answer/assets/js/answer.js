(function(){

	document.addEventListener('touchstart',function(){
		return false;
	},true);

    var tid = 0;
	var letter = '0123456789'.split('');

    /****************** 虚拟DOM创建 start ******************/
	function El(tagName,props,children,handles) {
		if (!(this.tagName = tagName)) return;
		var param, child;

		if (!handles) {
			if (utils.isObject(param = arguments[1]) && !utils.isFunction(param.click)) {
				this.props = param;
			} else if (utils.isArray(param)) {
				this.children = param;
			}  else {
				this.handles = param;
			}
			if (utils.isArray(child = arguments[2])) {
				this.children = child;
			} else {
				this.handles = child;
			}
		} else {
			this.props = props;
			this.children = children;
			this.handles = handles;
		}		
	}
	El.prototype.render = function() {
		var el = document.createElement(this.tagName),
			props = this.props || {},
			children = this.children || [],
			handles = this.handles || {};
		for (var prop in props) {
			if (props[prop]) {
				el.setAttribute(prop,props[prop]);
			}			
		}

		for (var handle in handles) {
			el.addEventListener(handle,handles[handle],false);
		}

		children.forEach(function(child){
			if (typeof child === 'object') {
				if (Array.isArray(child)) {
					child.forEach(function(item){
						el.appendChild((item instanceof HTMLElement) ? item : document.createTextNode(item));
					})
				} else {
					el.appendChild((child instanceof HTMLElement) ? child : document.createTextNode(child));
				}                    
			} else if (typeof child === 'string') {
				el.innerHTML = child;
			}
		});
		return el;		
	};
	function cel(tagName,props,children,handles) {
		return new El(tagName,props,children,handles).render();
	}
	/****************** 虚拟DOM创建 end ******************/

    /****************** 底层事件模块 start ******************/
	var Events = {
		addListener: function(event,listener) {
			var self = this, events = event.split(' ');
			if (!this.hasOwnProperty('listeners')) {
				this.listeners || (this.listeners = {});
			};
			events.forEach(function(event){
				self.listeners[event] || (self.listeners[event] = []);
				self.listeners[event].push(listener);
			});
			return this;
		},
		on: function(event, listener) {
			return this.addListener(event,listener);
		},
		once: function(event,listener) {
			function handler(){
				this.removeListener(event,handler);
				return listener.apply(this,arguments);
			};
			return this.addListener(event,handler);
		},
		removeListener: function(event,listener) {
			var self = this, events, listeners, list;
			if (arguments.length === 0) {
				this.listeners = {};
				return this;
			};
			events = event.split(' ');
			events.forEach(function(event){
				list = (listeners = self.listeners) != null ? listeners[event] : void 0;
				if (!list) return;
				if (!listener) return delete self.listeners[event];
				list.forEach(function(event,i){
					if (!(event === listener)) return;
					list.splice(i, 1);
					self.listeners[event] = list;
				});
			});
			return this;
		},
		off: function(event,listener) {
			return this.removeListener(event,listener);
		},
		listenerList: function(event) {
			return this.listeners[event];
		},
		emit: function() {
			var self = this, args, listeners, event, list;
			args = arguments.length >= 1 ? [].slice.call(arguments,0) : [];
			event = args.shift();
			list = (listeners = this.listeners) != null ? listeners[event] : void 0;
			if (!list) return;
			list.forEach(function(event){
				event.apply(self, args);
			});
			return true;
		},
		// DOM 事件绑定
		bind: function(element, type, selector, handler, capture) {
			capture = !!capture;
			var types = utils.isArray(type) ? type : type.trim().split(/\s+/),
				length = types.length;
			if (length) {
				if (utils.isString(selector)) {		
					while (length--) {
						element.addEventListener(types[length], function(e){	
							utils.each(this.querySelectorAll(selector), function(item){
								(e.target === item || item.contains(e.target)) && handler.call(item,e);
							})
						}, capture);
					}
				} else {
					handler = !!handler;
					while (length--) {
						element.addEventListener(types[length], selector, handler);
					}
				}
			}
			element = null;            
		},
		// DOM 事件触发
		trigger: function(element, type) {
			var event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, false);
			element.dispatchEvent(event);
		},
		// 触屏点击事件包裹
		touchClick: function(clickHandler) {
			var startX, startY;
			var events =  {
				touchstart: function(ev) {
					startX = ev.touches[0].clientX;
					startY = ev.touches[0].clientY;
				},
				touchend: function(ev) {
					var endX = ev.changedTouches[0].clientX,
						endY = ev.changedTouches[0].clientY,
						distanceX = startX - endX,
						distanceY = startY - endY;
					if (Math.abs(distanceX) < 5 && Math.abs(distanceY) < 5) {
						clickHandler.call(this,ev);
					}
				}
			}
			return events;
		}
	}
	/****************** 底层事件模块 end ******************/    
	
	var utils = {
		each: function(obj, iterator, context) {
			if (obj == null) return;
	        if (obj.length === +obj.length) {
	            for (var i = 0, l = obj.length; i < l; i++) {
	                if(iterator.call(context, obj[i], i, obj) === false)
	                    return false;
	            }
	        } else {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    if(iterator.call(context, obj[key], key, obj) === false)
	                        return false;
	                }
	            }
	        }
		},
		map: function(obj, iterator, context) {
			if (obj == null) return;
			var result = [];
	        if (obj.length === +obj.length) {
	            for (var i = 0, l = obj.length; i < l; i++) {
	                result.push(iterator.call(context, obj[i], i, obj));
	            }
	        } else {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    result.push(iterator.call(context, obj[key], key, obj));
	                }
	            }
	        }
	        return result;
		},
		extend: function(prop) {
			Array.prototype.slice.call(arguments, 1).forEach(function(source){
				for (var key in source) {
					if (source[key] != null) prop[key] = source[key];
				}
			});
			return prop;
		},
		inherits: function(subClass, superClass) {
			var oldP = subClass.prototype,
				newP = superClass.prototype;
			utils.extend(newP, oldP);
			subClass.prototype = newP;
			return (newP.constructor = subClass);
		}
	};

    // 类型判断方法
	['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'].forEach(function(v){
		utils['is' + v] = function(obj) {
		    return {}.toString.call(obj) === "[object " + v + "]";
		}
	});	
	utils.extend(utils, Events.prototype);

	var config = {
		data: [],
		wrap: 'body',
		send: function(){},
		index: 0,
		length: 0,
		preloading: false
	}


	function answer(options) {
		var self = this;
		if (!options.initData) return;
		utils.extend(self,config,options);	
		if (utils.isString(self.wrap)) self.wrap = document.querySelector(self.wrap);
		if (self.paper) self.paperRender(self.initData);
		
		// 数据解析与拼装
		self.initData.items.forEach(function(item){
			var topic;
			if (!item.sid) {
				self.length++;
				topic = {
					id: item.id,
					sign: self.initData.signs[item.id],
					sco: item.sco
				}
			} else {
				topic = item.sid.split(',').map(function(child){
					self.length++;
					return {
						id: child,
						sign: self.initData.signs[child],
						sco: item.sco
					}
				});
			}
			self.data.push(topic);
		});
		// 存储作题答案的容器
		self.answers = new Array(self.length);
		// 获取题目列表数据
		self.topics = new Array(self.length);
		var num = 0;
		self.data.forEach(function(item, index){
			if (!utils.isArray(item)) {
				// 闭包函数所传入的索引是为了保证题目信息的返回顺序依然正确
				(function(v){
					self.ajax(self.host+self.topicApi, 'post', item, function(cb){
						if (cb.success) {						
							self.topics[v] = cb.data;
							self.topics[v].index = v;
							self.topics[v].cardId = ''+(index+1);
							self.topics[v].itemScoreCount = item.sco;
							self.data[index].read = true;						
						}
					});
				})(num++);
			} else {
				item.forEach(function(child, i, arr){
					(function(v){
						self.ajax(self.host+self.topicApi, 'post', child, function(cb){
							if (cb.success) {							
								self.topics[v] = cb.data;
								self.topics[v].index = v;
								self.topics[v].cardId = (index+1) + '-' + (i+1);
								self.topics[v].itemIndex = i+1;
								self.topics[v].itemLength = arr.length;
								self.topics[v].itemScoreCount = child.sco;
								self.data[index][i].read = true;							
							}
						});
					})(num++);
				});
			}			
		});
		// 判断所有请求是否已经结束，然后执行渲染事件
		var loop = setInterval(function(){
			var read = true;
			self.data.forEach(function(item, index){
				if (!utils.isArray(item)) {
					if (!item.read) return read = false;
				} else {
					item.forEach(function(child, i){
						if (!child.read) return read = false;
					});
				}
			});
			if (read) {
				clearInterval(loop);
				self.render(self.topics);
			}
		}, 1000/60);

		console.log(this);
	}

	answer.ajax = function (url, type, data, success, error) {
        if (!url) return;
        type = type.toUpperCase();

		var str = [];
		for (var key in data) {
			if (typeof data[key] === 'function') continue;
			str.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
		}

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

        type === 'POST' && request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        type === 'POST' ? request.send(str.join('&')) : request.send();
    };

	answer.prototype = {
		// 初始化渲染
		render: function(data) {
			var self = this;
			// 题目固定标题
			var topicHeader = self.topicHeader = cel('div',{class:'topic-title'},[
				cel('span',{class:'index'},[data[0].index+1+'']),
				cel('span',{class:'type'},[data[0].answerTypeText]),
				cel('span',{class:'count'}),
				cel('span',{class:'score'},['('+ data[0].defaultScore +'分)'])
			]);
			// 题目列表
			var topicList = self.topicList = cel('ul',{class:'topic-list'},data.slice(0, 3).map(function(item){
				return self.topic(item);
			}), self.touchs());
			var topicMain = self.topicMain = cel('div',{class:'topic-main'},[topicList]);
			// 操作按钮
			var handlers = self.handlers = cel('div',{class:'topic-handlers'},[
				cel('span',{class:'prev btn disabled'},['上一题'],self.touchClick(function(ev){ self.round.call(self,true) })),
				cel('span',{class:'card btn'},['题卡'],self.touchClick(function(ev){self.cardShow(true)})),
				cel('span',{class:'submit btn'},['交卷']),
				cel('span',{class:'next btn'},['下一题'],self.touchClick(function(ev){ self.round.call(self) }))
			]);
			// 答题卡
			var cards = self.cards = cel('div',{class:'topic-card'},[
				cel('ul',{class:'card-list'}, data.map(function(item){
					return self.card(item);
				}))
			]);
			self.wrap.appendChild(topicHeader)
			.parentNode.appendChild(topicMain)
			.parentNode.appendChild(handlers)
			.parentNode.appendChild(cards);
		},
		// 组卷信息渲染
		paperRender: function(data) {
			var self = this;
			var paper = cel('div',{class:'paper-wrapper'},[
				cel('h1',{class:'title'},[data.title]),
				cel('p',{class:'info'},['555']),
				cel('p',{class:'describe'},[data.description]),
				cel('div',{class:'topic-start'},['开始答卷'],{
					click: function() {
						self.wrap.classList.add('show');
					}
				})
			]);
			this.wrap.parentNode.insertBefore(paper, this.wrap);
		},
		// 材料题监听
		materialListen: function(back,show) {
			var self = this,
				data = self.topics[self.index],
				material = data.material,
				audio = data.audioPath,
				video = data.videoPath;
			if (!material) {
				self.material && self.wrap.removeChild(self.material), self.material = null;
				return;
			};
			if (!show) {
				show = back ? self.topics[self.index].itemIndex === self.topics[self.index].itemLength : 
				self.topics[self.index].itemIndex === 1;							
			} 
			if (show) {				
				self.material && self.wrap.removeChild(self.material);
				self.material = cel('div',{class:'material'},[
					cel('div',{class:'material'},[material]),
					audio && cel('AUDIO',{class:'audio', src:data.audioPath, controls:true}),
					video && cel('VIDEO',{class:'video', src:'http://www.runoob.com/try/demo_source/movie.mp4', controls:true}) 
				]);
				self.wrap.insertBefore(self.material, self.topicMain);
			}
		},
		// 题目构建
		topic: function(data) {
			var self = this;
			var description, answerlist, audio, video, topicTitle;
			if (data.material) {
				topicTitle = self.topicTitle = cel('div',{class:'topic-title'},[
					cel('span',{class:'index'},[data.cardId]),
					cel('span',{class:'type'},[data.answerTypeText]),
					cel('span',{class:'score'},['('+ data.defaultScore +'分)'])
				]);
			} else {
				data.audioPath && (audio = cel('AUDIO',{class:'audio', src:data.audioPath, controls:true}));
				data.videoPath && (audio = cel('VIDEO',{class:'video', src:'http://www.runoob.com/try/demo_source/movie.mp4', controls:true}));
			}

			data.description && (description = cel('div',{class: 'topic-describe'},[data.description]));
			answerlist = cel('ol',{class:'answer-list'},data.answerList.map(function(item, index){
				var answer = self.answers[data.index] || [],
					key = letter[index],
					classList = 'answer-item' + (answer.indexOf(key) > -1 ? ' active' : '' );
				return cel('li',{class: classList, 'data-answer': key},[item.description],self.touchClick(function(ev){
					data.answerType !== 1 ? self.single.call(self,ev) : self.multi.call(self,ev);
				}));
			}));
			return cel('li',{class: 'topic-item'},[topicTitle, description, audio, video, answerlist]);
			
		},
		// 答题卡构建
		card: function(data) {
			var self = this;
			return cel('li',{class:'card-item','data-index':data.index+''},[data.cardId],self.touchClick(function(ev){self.topicJump.call(self, ev)}))
		},
		// 设置答题卡状态
		setAnswerCard: function(active) {
			this.cards.querySelectorAll('.card-item')[this.index].classList[active ? 'add' : 'remove']('active');			
		},
		// 单选操作
		single: function(ev) {
			var self = this,
				dom = ev.target,
				answer = dom.getAttribute('data-answer');

			if (dom.classList.contains('active')) return;
			var list = dom.parentNode.querySelectorAll('li');
			Array.prototype.slice.call(list).forEach(function(item){
				item.classList.remove('active');
			});			
			self.answers[self.index] = [answer];
			dom.classList.add('active');
			self.setAnswerCard(true);
			setTimeout(function(){
				self.round();
			}, 200);
		},
		// 多选操作
		multi: function(ev) {
			var self = this,
				dom = ev.target,
				select = self.answers[self.index] || [],
				answer = dom.getAttribute('data-answer'),
				index = select.indexOf(answer);
			self.answers[self.index] = select;
			index > -1 ? select.splice(index, 1) : select.push(answer);
			dom.classList[dom.classList.contains('active') ? 'remove' : 'add']('active');
			self.setAnswerCard(select.length ? true : false);
		},
		// 创建题目dom 
		create: function(start, length) {
			var self = this;
			var topics = self.topics.slice(start,start+length);
			if (topics.length > 1) {
				return topics.map(function(item){
					return self.topic(item);
				});
			} else {
				return self.topic(topics[0]);
			}
			
		},
		// 获取题目列表过渡效果
		getTransform: function(el) {
            var reg = /\((.*?)\)/,
                result = {};
            result.x = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[4]);
            resutl.y = parseInt((getComputedStyle(topics)['transform'] || getComputedStyle(topics)['-webkit-transform']).match(reg)[1].split(',')[5]);
            return result;
        },
		// 设置题目列表移动位置
        setTransform: function(el, val) {
            var css = 'translate3d('+ val.x +'px, '+ val.y +'px, 0)',
                style = el.style;
            style.transform = style.webkitTransform = css;
        },
		// 设置题目列表过渡效果
        setTransition: function(el, val) {
            var style = el.style;
            style.trnsition = style.webkitTransition = val;
        },
		// 题目列表触屏事件
		touchs: function(stopPropagation) {
			var self = this;

			var minX = window.screen.width / 3,
				length = self.length - 1,
				startX, startY, direction, has;
			return {
				touchstart: function(ev) {
					stopPropagation && ev.stopPropagation();
					// ev.preventDefault();
					startX = ev.touches[0].clientX;
					startY = ev.touches[0].clientY;
					self.cardShow(false);
				},
				touchmove: function(ev) {
					stopPropagation && ev.stopPropagation();
					// ev.preventDefault();
					var scroll,
						currentX = ev.touches[0].clientX,
						currentY = ev.touches[0].clientY,
						diff = startX - currentX,
						distanceX = startX - currentX,
						distanceY = startY - currentY,
						fix = self.index * this.offsetWidth;
					
					if (Math.abs(distanceX) >= Math.abs(distanceY)) {
						self.direction = direction = diff > 0 ? true : false;

						if (!direction && self.index === 0) {
							scroll = Math.abs(diff);
						} else {
							scroll = direction ? -(Math.abs(diff) + fix) : -(fix - Math.abs(diff));
						}        
						
						self.setTransition(this, 'transform 0ms');
						self.setTransform(this, {x: scroll, y: 0});
					}
				},
				touchend: function(ev) {
					stopPropagation && ev.stopPropagation();
					// ev.preventDefault();
					var endX = ev.changedTouches[0].clientX,
						endY = ev.changedTouches[0].clientY,
						distanceX = startX - endX,
						distanceY = startY - endY;
					has = Math.abs(startX - endX) > minX;
					if (Math.abs(distanceX) >= Math.abs(distanceY)) {
						if (has) {
							direction ? self.index++ : self.index--;
						}
						if (self.index < 0) self.index = 0;
						if (self.index > length) self.index = length;

						var scroll = -(self.index * this.offsetWidth);
						
						self.setTransition(this, 'transform 300ms ease-out');
						self.setTransform(this, {x: scroll, y: 0});
						self.setHeader();

						if (self.index === 0) {
							self.handlers.querySelector('.prev').classList.add('disabled');
						} else if (self.index === length) {
							self.handlers.querySelector('.next').classList.add('disabled');
						} else {
							self.handlers.querySelector('.prev').classList.remove('disabled');
							self.handlers.querySelector('.next').classList.remove('disabled');
						}
						self.materialListen(!direction);
					}
				},
				transitionend: function(ev) {
					stopPropagation && ev.stopPropagation();
					if (has || self.preloading) {
						self.preload(self.direction);
						var diff = (self.index - 1) * self.topicList.offsetWidth;
						if (self.index === 0) diff = 0;
						if (self.index === self.length - 1) diff = diff - self.topicList.offsetWidth;
						self.topicList.style.left = diff < 0 ? 0 : diff + 'px';
						self.preloading = false;
						has = false;
					}
				}
			}
		},
		// 答题卡显示／隐藏
		cardShow: function(show) {
			if (show) {
				this.cards.classList.add('topic-card-show');
			} else {
				this.cards.classList.remove('topic-card-show');
			}
		},
		// 设置题目标题
		setHeader: function() {
			var anwerType, isMaterial;
			isMaterial = this.topics[this.index].material;
			if (isMaterial) {
				anwerType = '材料题';
				this.topicHeader.querySelector('.count').innerHTML = '共'+ this.topics[this.index].itemLength +'题';
			} else {
				anwerType = this.topics[this.index].answerTypeText;
			}
			var index = this.topics[this.index].cardId.split('')[0];
			this.topicHeader.querySelector('.index').innerHTML = index;
			this.topicHeader.querySelector('.type').innerHTML = anwerType;
			this.topicHeader.querySelector('.score').innerHTML = '('+ this.topics[this.index].itemScoreCount +'分)';
		},
		// 上一题 ／ 下一题
		round: function(back) {
			var self = this;
			if (back && self.handlers.querySelector('.prev').classList.contains('disabled')) return;
			if (!back && self.handlers.querySelector('.next').classList.contains('disabled')) return; 

			var length, scroll, isShowCard;
			length = self.length - 1;
			// isShowCard = self.index === length;
			if (back) {
				self.index--;
				self.direction = false;
			} else {
				self.index++;
				self.direction = true;
			}
			self.preloading = true;
			if (self.index < 0) self.index = 0;
			if (self.index > length) self.index = length;
			scroll = -(self.index * self.topicList.offsetWidth);

			// if (isShowCard) return self.cardShow(true);
			if (self.index === 0) {
				self.handlers.querySelector('.prev').classList.add('disabled');
			} else if (self.index === length) {
				self.handlers.querySelector('.next').classList.add('disabled');
			} else {
				self.handlers.querySelector('.prev').classList.remove('disabled');
				self.handlers.querySelector('.next').classList.remove('disabled');
			}

			self.setHeader();
			self.setTransition(self.topicList, 'transform 300ms ease-out');
			self.setTransform(self.topicList, {x: scroll, y: 0});
			self.materialListen(back);
		},
		// 题目预加载
		preload: function(direction) {
			var list = this.topicList,
				maxLength = this.length - 1,
				index = direction ? (this.index + 1) : (this.index - 1);

			if (index < 0 || index > maxLength) return;
			if (direction && this.index === 1) return;
			if (!direction && this.index === maxLength - 1) return;

			var html = this.create(index, 1);
			if (direction) {
				list.removeChild(list.firstChild);
				list.appendChild(html);
			} else {
				list.removeChild(list.lastChild);
				list.insertBefore(html, list.firstChild);
			}
		},
		// 答题卡跳转
		topicJump: function(ev) {
			ev.preventDefault();
			var self = this;
			var dataLength = self.length;
			var topicList, scroll, left,
				length = dataLength < 3 ? dataLength : 3,
				defaultIndex = parseInt(ev.target.getAttribute('data-index'),10)+1,
				index = defaultIndex,
				list = self.topicList,
				wdith = list.offsetWidth;
			if (dataLength <= 3) {
				index = 0;
			} else {
				index = index - 2;
				if (index < 1 || dataLength === 1) index = 0;
				if (index >= dataLength-2) index = (dataLength-1) - 2;
			}
			topicList = self.create(index, length);
			
			self.index = defaultIndex - 1;
			left  = (self.index - 1) * wdith;
			scroll = -(self.index * wdith);
			if (self.index === 0) {
				left = 0;
				self.handlers.querySelector('.prev').classList.add('disabled');
				dataLength > 2 && self.handlers.querySelector('.next').classList.remove('disabled');
			} else if (self.index === dataLength - 1) {
				left = left - wdith;
				self.handlers.querySelector('.next').classList.add('disabled');
				dataLength > 2 && self.handlers.querySelector('.prev').classList.remove('disabled');
			} else {
				self.handlers.querySelector('.prev').classList.remove('disabled');
				self.handlers.querySelector('.next').classList.remove('disabled');
			}

			self.cardShow(false);
			list.style.left = left + 'px';
			list.innerHTML = '';
			topicList.forEach(function(item){
				list.appendChild(item);
			});
			self.setTransition(list, 'transform 300ms ease-out');
			self.setTransform(list, {x: scroll, y: 0});
			self.setHeader();
			self.materialListen(false,true);
		}
	}
	answer.prototype.ajax = answer.ajax;
	utils.extend(answer.prototype, Events);

	window.Answer = answer;

})();