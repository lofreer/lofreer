webpackJsonp([4],{

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _components = __webpack_require__(2);\n\n__webpack_require__(28);\n\nvar ce = _components.Simple.createElement;\n\nexports.default = _components.Simple.createClass({\n\n    getInitialState: function getInitialState() {},\n\n    componentWillMount: function componentWillMount() {},\n\n    render: function render() {\n        var _props$params = this.props.params,\n            cid = _props$params.cid,\n            type = _props$params.type;\n\n        var isInfo = type === 'info';\n\n        var video = ce('div', { class: 'video-wrap' }, ['video window']);\n\n        var tab = ce('div', { class: 'tab-wrap' }, [ce('div', { class: isInfo ? 'active' : '' }, [ce('a', { href: '#/room/' + cid + '/info' }, ['课程详情'])]), ce('div', { class: isInfo ? '' : 'active' }, [ce('a', { href: '#/room/' + cid + '/chapter' }, ['课程目录'])])]);\n\n        var footer = ce('div', { class: 'footer-wrap' }, [ce('div', { class: 'download' }, [ce('span', { class: 'icon icon-download' }), ce('span', { class: 'text' }, ['下载'])]), ce('div', { class: 'collect' }, [ce('span', { class: 'icon icon-star' }), ce('span', { class: 'text' }, ['收藏'])]), ce('div', { class: 'add' }, [ce('span', { class: 'text' }, ['添加至我的课程'])])]);\n\n        return ce('div', { class: 'class-wrap' }, [video, tab, ce('div', { class: 'content-wrap' }, [ce(isInfo ? _components.Info : _components.Chapter, { cid: cid })]), footer]);\n    }\n\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9jbGFzcy9pbmRleC5qcz82Yzc1Il0sIm5hbWVzIjpbImNlIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUNsYXNzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicmVuZGVyIiwicHJvcHMiLCJwYXJhbXMiLCJjaWQiLCJ0eXBlIiwiaXNJbmZvIiwidmlkZW8iLCJjbGFzcyIsInRhYiIsImhyZWYiLCJmb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLEtBQUssbUJBQU9DLGFBQWxCOztrQkFFZSxtQkFBT0MsV0FBUCxDQUFtQjs7QUFFOUJDLHFCQUFpQiwyQkFBVyxDQUUzQixDQUo2Qjs7QUFNOUJDLHdCQUFvQiw4QkFBVyxDQUU5QixDQVI2Qjs7QUFVOUJDLFlBQVEsa0JBQVc7QUFBQSw0QkFDSyxLQUFLQyxLQUFMLENBQVdDLE1BRGhCO0FBQUEsWUFDVEMsR0FEUyxpQkFDVEEsR0FEUztBQUFBLFlBQ0pDLElBREksaUJBQ0pBLElBREk7O0FBRWYsWUFBSUMsU0FBU0QsU0FBUyxNQUF0Qjs7QUFFQSxZQUFJRSxRQUFRWCxHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPLFlBQVIsRUFBVixFQUFpQyxDQUN6QyxjQUR5QyxDQUFqQyxDQUFaOztBQUlBLFlBQUlDLE1BQU1iLEdBQUcsS0FBSCxFQUFVLEVBQUNZLE9BQU8sVUFBUixFQUFWLEVBQStCLENBQ3JDWixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPRixTQUFTLFFBQVQsR0FBb0IsRUFBNUIsRUFBVixFQUEyQyxDQUN2Q1YsR0FBRyxHQUFILEVBQVEsRUFBQ2Msa0JBQWdCTixHQUFoQixVQUFELEVBQVIsRUFBc0MsQ0FBQyxNQUFELENBQXRDLENBRHVDLENBQTNDLENBRHFDLEVBSXJDUixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPRixTQUFTLEVBQVQsR0FBYyxRQUF0QixFQUFWLEVBQTJDLENBQ3ZDVixHQUFHLEdBQUgsRUFBUSxFQUFDYyxrQkFBZ0JOLEdBQWhCLGFBQUQsRUFBUixFQUF5QyxDQUFDLE1BQUQsQ0FBekMsQ0FEdUMsQ0FBM0MsQ0FKcUMsQ0FBL0IsQ0FBVjs7QUFTQSxZQUFJTyxTQUFTZixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPLGFBQVIsRUFBVixFQUFrQyxDQUMzQ1osR0FBRyxLQUFILEVBQVUsRUFBQ1ksT0FBTyxVQUFSLEVBQVYsRUFBK0IsQ0FDM0JaLEdBQUcsTUFBSCxFQUFXLEVBQUNZLE9BQU8sb0JBQVIsRUFBWCxDQUQyQixFQUUzQlosR0FBRyxNQUFILEVBQVcsRUFBQ1ksT0FBTyxNQUFSLEVBQVgsRUFBNEIsQ0FBQyxJQUFELENBQTVCLENBRjJCLENBQS9CLENBRDJDLEVBSzNDWixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPLFNBQVIsRUFBVixFQUE4QixDQUMxQlosR0FBRyxNQUFILEVBQVcsRUFBQ1ksT0FBTyxnQkFBUixFQUFYLENBRDBCLEVBRTFCWixHQUFHLE1BQUgsRUFBVyxFQUFDWSxPQUFPLE1BQVIsRUFBWCxFQUE0QixDQUFDLElBQUQsQ0FBNUIsQ0FGMEIsQ0FBOUIsQ0FMMkMsRUFTM0NaLEdBQUcsS0FBSCxFQUFVLEVBQUNZLE9BQU8sS0FBUixFQUFWLEVBQTBCLENBQ3RCWixHQUFHLE1BQUgsRUFBVyxFQUFDWSxPQUFPLE1BQVIsRUFBWCxFQUE0QixDQUFDLFNBQUQsQ0FBNUIsQ0FEc0IsQ0FBMUIsQ0FUMkMsQ0FBbEMsQ0FBYjs7QUFjQSxlQUFPWixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPLFlBQVIsRUFBVixFQUFpQyxDQUNwQ0QsS0FEb0MsRUFFcENFLEdBRm9DLEVBR3BDYixHQUFHLEtBQUgsRUFBVSxFQUFDWSxPQUFPLGNBQVIsRUFBVixFQUFtQyxDQUMvQlosR0FBR1UsK0NBQUgsRUFBNEIsRUFBQ0YsS0FBS0EsR0FBTixFQUE1QixDQUQrQixDQUFuQyxDQUhvQyxFQU1wQ08sTUFOb0MsQ0FBakMsQ0FBUDtBQVFIOztBQWpENkIsQ0FBbkIsQyIsImZpbGUiOiIyNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZSwgSW5mbywgQ2hhcHRlciB9IGZyb20gJ2NvbXBvbmVudHMnO1xuaW1wb3J0ICcuL2NsYXNzLmxlc3MnO1xuXG5jb25zdCBjZSA9IFNpbXBsZS5jcmVhdGVFbGVtZW50O1xuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGUuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHsgY2lkLCB0eXBlIH0gPSB0aGlzLnByb3BzLnBhcmFtcztcbiAgICAgICAgbGV0IGlzSW5mbyA9IHR5cGUgPT09ICdpbmZvJztcblxuICAgICAgICBsZXQgdmlkZW8gPSBjZSgnZGl2Jywge2NsYXNzOiAndmlkZW8td3JhcCd9LCBbXG4gICAgICAgICAgICAndmlkZW8gd2luZG93J1xuICAgICAgICBdKTtcblxuICAgICAgICBsZXQgdGFiID0gY2UoJ2RpdicsIHtjbGFzczogJ3RhYi13cmFwJ30sIFtcbiAgICAgICAgICAgIGNlKCdkaXYnLCB7Y2xhc3M6IGlzSW5mbyA/ICdhY3RpdmUnIDogJyd9LCBbXG4gICAgICAgICAgICAgICAgY2UoJ2EnLCB7aHJlZjogYCMvcm9vbS8ke2NpZH0vaW5mb2B9LCBbJ+ivvueoi+ivpuaDhSddKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBjZSgnZGl2Jywge2NsYXNzOiBpc0luZm8gPyAnJyA6ICdhY3RpdmUnfSwgW1xuICAgICAgICAgICAgICAgIGNlKCdhJywge2hyZWY6IGAjL3Jvb20vJHtjaWR9L2NoYXB0ZXJgfSwgWyfor77nqIvnm67lvZUnXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGxldCBmb290ZXIgPSBjZSgnZGl2Jywge2NsYXNzOiAnZm9vdGVyLXdyYXAnfSwgW1xuICAgICAgICAgICAgY2UoJ2RpdicsIHtjbGFzczogJ2Rvd25sb2FkJ30sIFtcbiAgICAgICAgICAgICAgICBjZSgnc3BhbicsIHtjbGFzczogJ2ljb24gaWNvbi1kb3dubG9hZCd9KSxcbiAgICAgICAgICAgICAgICBjZSgnc3BhbicsIHtjbGFzczogJ3RleHQnfSwgWyfkuIvovb0nXSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY2UoJ2RpdicsIHtjbGFzczogJ2NvbGxlY3QnfSwgW1xuICAgICAgICAgICAgICAgIGNlKCdzcGFuJywge2NsYXNzOiAnaWNvbiBpY29uLXN0YXInfSksXG4gICAgICAgICAgICAgICAgY2UoJ3NwYW4nLCB7Y2xhc3M6ICd0ZXh0J30sIFsn5pS26JePJ10pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGNlKCdkaXYnLCB7Y2xhc3M6ICdhZGQnfSwgW1xuICAgICAgICAgICAgICAgIGNlKCdzcGFuJywge2NsYXNzOiAndGV4dCd9LCBbJ+a3u+WKoOiHs+aIkeeahOivvueoiyddKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcblxuICAgICAgICByZXR1cm4gY2UoJ2RpdicsIHtjbGFzczogJ2NsYXNzLXdyYXAnfSwgW1xuICAgICAgICAgICAgdmlkZW8sXG4gICAgICAgICAgICB0YWIsXG4gICAgICAgICAgICBjZSgnZGl2Jywge2NsYXNzOiAnY29udGVudC13cmFwJ30sIFtcbiAgICAgICAgICAgICAgICBjZShpc0luZm8gPyBJbmZvIDogQ2hhcHRlciwge2NpZDogY2lkfSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgZm9vdGVyXG4gICAgICAgIF0pXG4gICAgfVxuXG59KTsgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2NvbnRhaW5lcnMvY2xhc3MvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(29);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(9)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./class.less\", function() {\n\t\t\tvar newContent = require(\"!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./class.less\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9jbGFzcy9jbGFzcy5sZXNzPzEzN2UiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBeUY7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDIiwiZmlsZSI6IjI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanMhLi9jbGFzcy5sZXNzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9pbmRleC5qcyEuL2NsYXNzLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanMhLi9jbGFzcy5sZXNzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9jb250YWluZXJzL2NsYXNzL2NsYXNzLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(8)();\n// imports\n\n\n// module\nexports.push([module.id, \".class-wrap {\\n  display: flex;\\n  flex-direction: column;\\n  height: 100%;\\n}\\n.class-wrap .video-wrap {\\n  height: 200px;\\n  background: #000;\\n}\\n.class-wrap .tab-wrap {\\n  display: flex;\\n  background: #f2f2f2;\\n}\\n.class-wrap .tab-wrap > div {\\n  flex: 1;\\n  line-height: 40px;\\n  text-align: center;\\n  border-bottom: 2px solid transparent;\\n}\\n.class-wrap .tab-wrap > div:last-child {\\n  border-left: 1px solid #fafafa;\\n}\\n.class-wrap .tab-wrap .active {\\n  border-color: #0ff;\\n}\\n.class-wrap .tab-wrap .active a {\\n  color: #0cf;\\n}\\n.class-wrap .tab-wrap a {\\n  color: #333;\\n}\\n.class-wrap .content-wrap {\\n  flex: 1;\\n}\\n.class-wrap .footer-wrap {\\n  display: flex;\\n  height: 40px;\\n}\\n.class-wrap .footer-wrap .download,\\n.class-wrap .footer-wrap .collect,\\n.class-wrap .footer-wrap .add {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: 12px;\\n  border-top: 1px solid #e8eaea;\\n  padding: 0 20px;\\n}\\n.class-wrap .footer-wrap .add {\\n  flex: 1;\\n  color: #fff;\\n  background: #000;\\n  border-top-width: 0;\\n}\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9jbGFzcy9jbGFzcy5sZXNzP2E3YmYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7O0FBR0E7QUFDQSx1Q0FBdUMsa0JBQWtCLDJCQUEyQixpQkFBaUIsR0FBRywyQkFBMkIsa0JBQWtCLHFCQUFxQixHQUFHLHlCQUF5QixrQkFBa0Isd0JBQXdCLEdBQUcsK0JBQStCLFlBQVksc0JBQXNCLHVCQUF1Qix5Q0FBeUMsR0FBRywwQ0FBMEMsbUNBQW1DLEdBQUcsaUNBQWlDLHVCQUF1QixHQUFHLG1DQUFtQyxnQkFBZ0IsR0FBRywyQkFBMkIsZ0JBQWdCLEdBQUcsNkJBQTZCLFlBQVksR0FBRyw0QkFBNEIsa0JBQWtCLGlCQUFpQixHQUFHLDBHQUEwRyxrQkFBa0IsMkJBQTJCLHdCQUF3Qiw0QkFBNEIsb0JBQW9CLGtDQUFrQyxvQkFBb0IsR0FBRyxpQ0FBaUMsWUFBWSxnQkFBZ0IscUJBQXFCLHdCQUF3QixHQUFHOztBQUV6bEMiLCJmaWxlIjoiMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jbGFzcy13cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uY2xhc3Mtd3JhcCAudmlkZW8td3JhcCB7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgYmFja2dyb3VuZDogIzAwMDtcXG59XFxuLmNsYXNzLXdyYXAgLnRhYi13cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBiYWNrZ3JvdW5kOiAjZjJmMmYyO1xcbn1cXG4uY2xhc3Mtd3JhcCAudGFiLXdyYXAgPiBkaXYge1xcbiAgZmxleDogMTtcXG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG4uY2xhc3Mtd3JhcCAudGFiLXdyYXAgPiBkaXY6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNmYWZhZmE7XFxufVxcbi5jbGFzcy13cmFwIC50YWItd3JhcCAuYWN0aXZlIHtcXG4gIGJvcmRlci1jb2xvcjogIzBmZjtcXG59XFxuLmNsYXNzLXdyYXAgLnRhYi13cmFwIC5hY3RpdmUgYSB7XFxuICBjb2xvcjogIzBjZjtcXG59XFxuLmNsYXNzLXdyYXAgLnRhYi13cmFwIGEge1xcbiAgY29sb3I6ICMzMzM7XFxufVxcbi5jbGFzcy13cmFwIC5jb250ZW50LXdyYXAge1xcbiAgZmxleDogMTtcXG59XFxuLmNsYXNzLXdyYXAgLmZvb3Rlci13cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcbi5jbGFzcy13cmFwIC5mb290ZXItd3JhcCAuZG93bmxvYWQsXFxuLmNsYXNzLXdyYXAgLmZvb3Rlci13cmFwIC5jb2xsZWN0LFxcbi5jbGFzcy13cmFwIC5mb290ZXItd3JhcCAuYWRkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOGVhZWE7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxufVxcbi5jbGFzcy13cmFwIC5mb290ZXItd3JhcCAuYWRkIHtcXG4gIGZsZXg6IDE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQ6ICMwMDA7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvanMvY29udGFpbmVycy9jbGFzcy9jbGFzcy5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }

});