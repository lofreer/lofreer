webpackJsonp([4],{

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _components = __webpack_require__(2);\n\nvar ce = _components.Simple.createElement;\n\nexports.default = _components.Simple.createClass({\n\n    render: function render() {\n        var id = this.props.params.id;\n\n\n        var banner = ce('div', { class: 'class-banner' }, ['class banner']);\n\n        var tab = ce('div', { class: 'class-tab' }, [ce('div', null, [ce('a', { href: '#/' + id + '/info' }, ['课程详情'])]), ce('div', null, [ce('a', { href: '#/' + id + '/chapter' }, ['课程目录'])])]);\n\n        return ce('div', { class: 'class-wrap' }, [banner, tab, this.props.children]);\n    }\n\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9jbGFzcy9pbmRleC5qcz82Yzc1Il0sIm5hbWVzIjpbImNlIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUNsYXNzIiwicmVuZGVyIiwiaWQiLCJwcm9wcyIsInBhcmFtcyIsImJhbm5lciIsImNsYXNzIiwidGFiIiwiaHJlZiIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxLQUFLLG1CQUFPQyxhQUFsQjs7a0JBRWUsbUJBQU9DLFdBQVAsQ0FBbUI7O0FBRTlCQyxZQUFRLGtCQUFXO0FBQUEsWUFDVEMsRUFEUyxHQUNGLEtBQUtDLEtBQUwsQ0FBV0MsTUFEVCxDQUNURixFQURTOzs7QUFHZixZQUFJRyxTQUFTUCxHQUFHLEtBQUgsRUFBVSxFQUFDUSxPQUFPLGNBQVIsRUFBVixFQUFtQyxDQUM1QyxjQUQ0QyxDQUFuQyxDQUFiOztBQUlBLFlBQUlDLE1BQU1ULEdBQUcsS0FBSCxFQUFVLEVBQUNRLE9BQU8sV0FBUixFQUFWLEVBQWdDLENBQ3RDUixHQUFHLEtBQUgsRUFBVSxJQUFWLEVBQWdCLENBQ1pBLEdBQUcsR0FBSCxFQUFRLEVBQUNVLGFBQVdOLEVBQVgsVUFBRCxFQUFSLEVBQWdDLENBQUMsTUFBRCxDQUFoQyxDQURZLENBQWhCLENBRHNDLEVBSXRDSixHQUFHLEtBQUgsRUFBVSxJQUFWLEVBQWdCLENBQ1pBLEdBQUcsR0FBSCxFQUFRLEVBQUNVLGFBQVdOLEVBQVgsYUFBRCxFQUFSLEVBQW1DLENBQUMsTUFBRCxDQUFuQyxDQURZLENBQWhCLENBSnNDLENBQWhDLENBQVY7O0FBU0EsZUFBT0osR0FBRyxLQUFILEVBQVUsRUFBQ1EsT0FBTyxZQUFSLEVBQVYsRUFBaUMsQ0FDcENELE1BRG9DLEVBRXBDRSxHQUZvQyxFQUdwQyxLQUFLSixLQUFMLENBQVdNLFFBSHlCLENBQWpDLENBQVA7QUFLSDs7QUF2QjZCLENBQW5CLEMiLCJmaWxlIjoiMTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW1wbGUgfSBmcm9tICdjb21wb25lbnRzJztcblxuY29uc3QgY2UgPSBTaW1wbGUuY3JlYXRlRWxlbWVudDtcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlLmNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgeyBpZCB9ID0gdGhpcy5wcm9wcy5wYXJhbXM7XG5cbiAgICAgICAgbGV0IGJhbm5lciA9IGNlKCdkaXYnLCB7Y2xhc3M6ICdjbGFzcy1iYW5uZXInfSwgW1xuICAgICAgICAgICAgJ2NsYXNzIGJhbm5lcidcbiAgICAgICAgXSk7XG5cbiAgICAgICAgbGV0IHRhYiA9IGNlKCdkaXYnLCB7Y2xhc3M6ICdjbGFzcy10YWInfSwgW1xuICAgICAgICAgICAgY2UoJ2RpdicsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjZSgnYScsIHtocmVmOiBgIy8ke2lkfS9pbmZvYH0sIFsn6K++56iL6K+m5oOFJ10pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGNlKCdkaXYnLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY2UoJ2EnLCB7aHJlZjogYCMvJHtpZH0vY2hhcHRlcmB9LCBbJ+ivvueoi+ebruW9lSddKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcblxuICAgICAgICByZXR1cm4gY2UoJ2RpdicsIHtjbGFzczogJ2NsYXNzLXdyYXAnfSwgW1xuICAgICAgICAgICAgYmFubmVyLFxuICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICBdKVxuICAgIH1cblxufSk7IFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9jb250YWluZXJzL2NsYXNzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }

});