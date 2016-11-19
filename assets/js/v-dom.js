(function(){

    /******************  Edit 工具类 start  *****************/
	var utils =  {
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
					if (source.hasOwnProperty(key)) {
						prop[key] = source[key];
					}					
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
		},
		parseColor: function( val ){
			var r, g, b;
		    if( /rgb/.test(val) ){
		        var arr = val.match( /\d+/g );
		        r = parseInt( arr[0] );
		        g = parseInt( arr[1] );
		        b = parseInt( arr[2] );
		    } else if ( /#/.test(val) ){
		        var len = val.length;
		        if( len === 7 ){
		            r = parseInt( val.slice(1, 3), 16 );
		            g = parseInt( val.slice(3, 5), 16 );
		            b = parseInt( val.slice(5), 16 );
		        } else if ( len === 4 ){ 
		            r = parseInt( val.charAt(1) + val.charAt(1), 16 );
		            g = parseInt( val.charAt(2) + val.charAt(2), 16 );
		            b = parseInt( val.charAt(3) + val.charAt(3), 16 );
		        }
		    } else {
		        return val;
		    }
		    return { r: r, g: g, b: b }
		},
		parseUrl: function(name,query) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),r;
			if(query){
				var index = query.indexOf('?');
				if (index !== -1) query = query.substr(index+1);
				r = query.match(reg);
			}else{
				r = window.location.search.substr(1).match(reg);
			}
			if(r!=null)return decodeURI(r[2]); return null;
		},
		rangeEqual: function(newRange, oldRange) {
			var keys = 'collapsed commonAncestorContainer endContainer endOffset startContainer startOffset'.split(' ');
			var result = true;
			keys.forEach(function(key){
				if (newRange[key] !== oldRange[key]) return result = false;
			});
			return result;
		}
	};

	// 类型判断方法
	['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'].forEach(function(v){
		utils['is' + v] = function(obj) {
		    return {}.toString.call(obj) === "[object " + v + "]";
		}
	});	
	/******************  Edit 工具类 end  *****************/


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
			if (utils.isArray(child)) {
				child.forEach(function(item){
					item && (item instanceof HTMLElement ? el.appendChild(item) : el.insertAdjacentHTML('beforeend', item));
				})
			} else {
				child && (child instanceof HTMLElement ? el.appendChild(child) : el.insertAdjacentHTML('beforeend', child));
			}
		});
		return el;		
	};
	/****************** 虚拟DOM创建 end ******************/

    window.CE = function(tagName,props,children,handles) {
		return new El(tagName,props,children,handles).render();
	}

})();