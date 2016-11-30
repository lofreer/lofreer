(function(){
    /******************  utils 工具类 start  *****************/
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
        extend: function(prop) {
            Array.prototype.slice.call(arguments, 1).forEach(function(source){
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        prop[key] = source[key];
                    }					
                }
            });
            return prop;
        }
    };

    // 类型判断方法
    ['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'].forEach(function(v){
        utils['is' + v] = function(obj) {
            return {}.toString.call(obj) === "[object " + v + "]";
        }
    });	
    /******************  utils 工具类 end  *****************/

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
        }
    }
    /****************** 底层事件模块 end ******************/
    // 自定义元素超级类
    function SimpleClass() {}
    SimpleClass.prototype = {
        render: function() {},
        setState: function(newState) {
            this._simpleInternalInstance.receiveComponent(null, newState);
        }
    }
    // 构建简单的虚拟节点
    function SimpleElement(type, key, props) {
        this.type = type;
        this.key = key;
        this.props = props;
    }
    // 工厂方法，调用相对应的处理模块
    function instantiateSimpleComponent(node) {
        if (utils.isString(node) || utils.isNumber(node)) {
            return new SimpleDOMTextComponent(node);
        } else if (utils.isObject(node) && utils.isString(node.type)) {
            return new SimpleDOMComponent(node);
        } else if (utils.isObject(node) && utils.isFunction(node.type)) {
            return new SimpleCompositeComponent(node);
        }
    }    

    // 文本节点模块
    function SimpleDOMTextComponent(text) {
        this._currentElement = '' + text;
        this._rootNodeID = null;
    }
    SimpleDOMTextComponent.prototype = {
        mountComponent: function(rootID) {
            this._rootNodeID = rootID;
            return this._currentElement
        },
        receiveComponent: function(nextText) {
            var nextStringText = '' + nextText;
            if (nextStringText !== this._currentElement) {
                this._parentNode.innerHTML = nextStringText;
                this._currentElement = nextStringText;
            }
        }
    }

    // DOM元素模块
    function SimpleDOMComponent(element) {
        this._currentElement = element;
        this._rootNodeID = null;
    }
    
    var updateDepth = 0;
    var diffQueue = [];
    var UPDATE_TYPES = {
        MOVE_EXISTING: 1,
        REMOVE_NODE: 2,
        INSERT_NODE: 3
    };
    SimpleDOMComponent.prototype = {
        mountComponent: function(rootID) {
            var self = this;
            this._rootNodeID = rootID;
            var props = this._currentElement.props;
            var children = props.children || [];

            var node = document.createElement(this._currentElement.type);
            node.setAttribute('data-simpleid', this._rootNodeID);

            utils.each(props, function(value, key) {
                if (/^on[A-Za-z]/.test(key)) {
                    var eventType = key.toLowerCase().replace('on', '');
                    self.addListener(node, eventType, value);
                }
                if (value && key !== 'children' && key !== 'ref' && !/^on[A-Za-z]/.test(key)) {
                    node.setAttribute(key, value);
                }
            });
            var childrenInstances = [];
            var childrenRefs = {};
            children.forEach(function(child, index) {
                if (child) {
                    var childComponentInstance = instantiateSimpleComponent(child);
                    childComponentInstance._mountIndex = index;
                    if (!utils.isString(child) && !utils.isNumber(child)) {
                        var ref = child.props['ref'];
                        if (ref) childrenRefs[ref] = childComponentInstance;                       
                    } else {
                         childComponentInstance._parentNode = node;
                    } 
                    childrenInstances.push(childComponentInstance);
                    var curRootID = self._rootNodeID + '.' + index;
                    var childNode = childComponentInstance.mountComponent(curRootID);
                    childNode && (childNode instanceof HTMLElement) ? node.appendChild(childNode) : node.insertAdjacentHTML('beforeend', childNode);
                }
                
            });
            this._renderedChildren = childrenInstances;
            this._childrenRefs = childrenRefs;
            return this._nativeNode = node;
        },
        receiveComponent: function(nextElement) {
            var lastProps = this._currentElement.props;
            var nextProps = nextElement.props;
            this._updateDOMProperties(lastProps, nextProps);
            this._updateDOMChildren(nextElement.props.children);
            this._currentElement = nextElement;
        },
        addListener: function(element, event, listener) {
            var self = this;
            if (!this.hasOwnProperty('listeners')) {
                this.listeners || (this.listeners = {});
            };
            self.listeners[event] || (self.listeners[event] = []);
            self.listeners[event].push(listener);
            element.addEventListener(event, listener);
        },
        removeListener: function(element, event, listener) {
            var self = this, list;
            list = self.listeners != null ? self.listeners[event] : void 0;
            if (!list) return;
            if (!listener) return delete self.listeners[event];
            list.forEach(function(handler,i){
                if (!(handler === listener)) return;
                element.removeEventListener(event, handler)
                list.splice(i, 1);
                self.listeners[event] = list;
            });
        },
        _updateDOMProperties: function(lastProps, nextProps) {
            var self = this;
            var propKey; 
            for (propKey in lastProps) {
                if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
                    continue;
                }
                if (/^on[A-Za-z]/.test(propKey)) {
                    var eventType = propKey.toLowerCase().replace('on', '');
                    // 事件删除
                    self.removeListener(self._nativeNode, eventType, lastProps[propKey]);
                }
                this._nativeNode.removeAttribute(propKey);
            }
            for (propKey in nextProps) {
                if (/^on[A-Za-z]/.test(propKey)) {
                    var eventType = propKey.toLowerCase().replace('on', '');
                    // 事件更新
                    if (lastProps[propKey]) {
                        self.removeListener(self._nativeNode, eventType, lastProps[propKey]);
                        self.addListener(self._nativeNode, eventType, nextProps[propKey]);
                    } else {
                        self.addListener(self._nativeNode, eventType, nextProps[propKey]);
                    }
                    continue;
                }
                if (propKey === 'children' || propKey === 'ref') continue;
                if (propKey === 'value' && this._nativeNode.nodeName === 'INPUT') {
                    this._nativeNode.value = nextProps[propKey];
                } else {
                    this._nativeNode.setAttribute(propKey, nextProps[propKey]);
                }
            }
        },
        _updateDOMChildren: function(nextChildrenElements) {
            updateDepth++;
            this._diff(diffQueue, nextChildrenElements);
            updateDepth--;
            if (updateDepth === 0) {
                this._patch(diffQueue);
                diffQueue = [];
            }
        },
        _diff: function(diffQueue, nextChildrenElements) {
            var self = this, key;
            var prevChildren = flattenChildren(this._renderedChildren);
            var nextChildren = generateComponentChildren(prevChildren, nextChildrenElements);
            this._renderedChildren = [];
            this._childrenRefs = {};
            utils.each(nextChildren, function(instance) {
                self._renderedChildren.push(instance);
                if (!utils.isString(instance._currentElement) && !utils.isNumber(instance._currentElement)) {
                    var ref = instance._currentElement.props['ref'];
                    if (ref) self._childrenRefs[ref] = instance;
                }                
            });

            var lastIndex = 0;
            var nextIndex = 0;

            for (key in nextChildren) {
                if (!nextChildren.hasOwnProperty(key)) {
                    continue;
                }
                var prevChild = prevChildren && prevChildren[key];
                var nextChild = nextChildren[key];
                if (prevChild === nextChild) {
                    prevChild._mountIndex < lastIndex && diffQueue.push({
                        parentId: this._rootNodeId,
                        parentNode: this._nativeNode,
                        type: UPDATE_TYPES.MOVE_EXISTING,
                        fromIndex: prevChild._mountIndex,
                        toIndex: nextIndex
                    });
                    lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                } else {
                    if (prevChild) {
                        diffQueue.push({
                            parentId: this._rootNodeID,
                            parentNode: this._nativeNode,
                            type: UPDATE_TYPES.REMOVE_NODE,
                            fromIndex: prevChild._mountIndex,
                            toIndex: null
                        });
                        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                    }

                    diffQueue.push({
                        parentId: this._rootNodeID,
                        parentNode: this._nativeNode,
                        type: UPDATE_TYPES.INSERT_NODE,
                        fromIndex: null,
                        toIndex: nextIndex,
                        node: nextChild.mountComponent(this._rootNodeID + '.' + key)
                    });
                }
                nextChild._mountIndex = nextIndex;
                nextIndex++;
            }

            for (key in prevChildren) {
                if (prevChildren.hasOwnProperty(key) && !(nextChildren && nextChildren.hasOwnProperty(key))) {
                    diffQueue.push({
                        parentId: this._rootNodeID,
                        parentNode: this._nativeNode,
                        type: UPDATE_TYPES.REMOVE_NODE,
                        fromIndex: prevChildren[key]._mountIndex,
                        toIndex: null
                    });
                }
            }
        },
        _patch: function(updates) {
            var initialChildren = {};
            var deleteChildren = [];
            utils.each(updates, function(update) {
                if (update.type === UPDATE_TYPES.MOVE_EXISTING || update.type === UPDATE_TYPES.REMOVE_NODE) {
                    var updatedIndex = update.fromIndex;
                    var updatedChild = update.parentNode.childNodes[updatedIndex];
                    var parentID = update.parentId;

                    initialChildren[parentID] = initialChildren[parentID] || [];
                    initialChildren[parentID][updatedIndex] = updatedChild;

                    deleteChildren.push(updatedChild);
                }
            });

            utils.each(deleteChildren, function(child) {
                child.parentNode.removeChild(child);
            });

            utils.each(updates, function(update) {
                switch (update.type) {
                    case UPDATE_TYPES.INSERT_NODE:
                        insertChildAt(update.parentNode, update.node, update.toIndex);
                        break;
                    case UPDATE_TYPES.MOVE_EXISTING:
                        insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
                        break;
                    case UPDATE_TYPES.REMOVE_NODE:
                        break;
                }
            });
        }
    }

    // 更新判断
    function _shouldUpdateSimpleComponent(prevElement, nextElement) {
        if (prevElement != null && nextElement != null) {
            var prevType = typeof prevElement;
            var nextType = typeof nextElement;
            if (prevType === 'string' || prevType === 'number') {
                return nextType === 'string' || nextType === 'number';
            } else {
                return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
            }
        }
        return false;
    }

    // 将数组更改为map映射
    function flattenChildren(componentChildren) {
        var child, name, childrenMap = {};
        utils.each(componentChildren, function(child, index) {
            name = child && child._currentelement && child._currentelement.key ? child._currentelement.key : index.toString(36);
            childrenMap[name] = child;
        });
        return childrenMap;
    }

    // 生成子元素节点的component集合
    function generateComponentChildren(prevChildren, nextChildrenElements) {
        var nextChildren = {};
        nextChildrenElements = nextChildrenElements || [];
        nextChildrenElements.forEach(function(element, key) {
            if (element) {
                // key = element.key ? element.key : key;
                var prevChild = prevChildren && prevChildren[key];
                var prevElement = prevChild && prevChild._currentElement;
                var nextElement = element;
                if (_shouldUpdateSimpleComponent(prevElement, nextElement)) {
                    prevChild.receiveComponent(nextElement);
                    nextChildren[key] = prevChild;
                } else {
                    var nextChildInstance = instantiateSimpleComponent(nextElement);
                    nextChildren[key] = nextChildInstance;
                }
            }            
        });
        return nextChildren;
    }
    // 插入或者移动元素
    function insertChildAt(parentNode, childNode, index) {
        var beforeChild = parentNode.childNodes[index];
        if (childNode instanceof HTMLElement) {
            beforeChild ? parentNode.insertBefore(childNode, beforeChild) : parentNode.insertBefore(childNode, null);
        } else {
            beforeChild ? parentNode.insertAdjacentHTML('afterBegin', childNode) : parentNode.insertAdjacentHTML('beforeend', childNode);
        }        
    }

    // 自定义类模块
    function SimpleCompositeComponent(element) {
        this._currentElement = element;
        this._rootNodeID = null;
        this._instance = null;
    }
    SimpleCompositeComponent.prototype = {
        mountComponent: function(rootID) {
            var self = this;
            this._rootNodeID = rootID;
            var publicProps = this._currentElement.props;
            var SimpleClass = this._currentElement.type;
            var inst = new SimpleClass(publicProps);
            this._instance = inst;
            inst._simpleInternalInstance = this;

            if (inst.componentWillMount) {
                inst.componentWillMount();
            }
            var renderedElement = this._instance.render();
            if (utils.isString(renderedElement)) {
                var node = Simple.createElement('span', null, [renderedElement]);
                renderedElement = node;
            }
            var renderedComponentInstance = instantiateSimpleComponent(renderedElement);
            this._renderedComponent = renderedComponentInstance; 
            this._nativeNode = renderedComponentInstance.mountComponent(this._rootNodeID);

            utils.each(this._renderedComponent._childrenRefs, function(value, key) {
                if (value instanceof SimpleCompositeComponent) {
                    self._instance.refs[key] = value._instance;
                } else {
                    self._instance.refs[key] = value._nativeNode;
                }
            });
            Simple.on('mountReady', function() {
                inst.componentDidMount && inst.componentDidMount();
            });
            return this._nativeNode;
        },
        receiveComponent: function(nextElement, newState) {
            var self = this;
            this._currentElement = nextElement || this._currentElement
            var inst = this._instance;
            var nextState = utils.extend(inst.state, newState);
            var nextProps = this._currentElement.props;
            inst.state = nextState;
            inst.props = nextProps;
            if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;            
            if (inst.componentWillUpdate) inst.componentWillUpdate(nextProps, nextState);

            var prevComponentInstance = this._renderedComponent;
            var prevRenderedElement = prevComponentInstance._currentElement;
            var nextRenderedElement = inst.render();
            if (_shouldUpdateSimpleComponent(prevRenderedElement, nextRenderedElement)) {
                prevComponentInstance.receiveComponent(nextRenderedElement);
                self._instance.refs = {};
                utils.each(this._renderedComponent._childrenRefs, function(value, key) {
                    if (value instanceof SimpleCompositeComponent) {
                        self._instance.refs[key] = value._instance;
                    } else {
                        self._instance.refs[key] = value._nativeNode;
                    }
                });
                inst.componentDidUpdate && inst.componentDidUpdate();
            } else {
                 if (utils.isString(nextRenderedElement)) {
                    var span = Simple.createElement('span', null, [nextRenderedElement]);
                    nextRenderedElement = span;
                }
                this._renderedComponent = instantiateSimpleComponent(nextRenderedElement);
                var node = this._renderedComponent.mountComponent(this._rootNodeID);
                this._nativeNode.parentNode.replaceChild(node, this._nativeNode);
                this._nativeNode = node;
            }
        }
    }   

    // 构造函数
    var Simple = {
        nextSimpleRootIndex: 0,
        createClass: function(spec) {
            var Constructor = function(props) {
                this.props = props;
                this.state = this.getInitialState ? this.getInitialState() : null;
                this.refs = {};
            }
            Constructor.prototype = new SimpleClass();
            Constructor.prototype.constructor = Constructor;
            utils.extend(Constructor.prototype, spec);
            return Constructor;
        },
        createElement: function(type, config, children) {
            var props = {}, propName;
            config = config || {};
            var key  = config.key || null;

            for (propName in config) {
                if (config.hasOwnProperty(propName) && propName !== 'key') {
                    props[propName] = config[propName];
                }
            }

            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
                props.children = utils.isArray(children) ? children : [children];
            } else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                }
                props.children = childArray;
            }
            return new SimpleElement(type, key, props);
        },
        render: function(element, container) {
            var componentInstance = instantiateSimpleComponent(element);
            var element = componentInstance.mountComponent(Simple.nextSimpleRootIndex++);
            element && (element instanceof HTMLElement) ? container.appendChild(element) : container.insertAdjacentHTML('beforeend', element);
            this.emit('mountReady');
            return element;
        }
    }

    utils.extend(Simple, Events);

    window.Simple = Simple;

})();