!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var t="object"==typeof exports?n(require("React")):n(e.React);for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(self,(__WEBPACK_EXTERNAL_MODULE__24__=>(()=>{var __webpack_modules__={459:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = __webpack_require__(704);\n\nfunction emptyFunction() {}\nfunction emptyFunctionWithReset() {}\nemptyFunctionWithReset.resetWarningCache = emptyFunction;\n\nmodule.exports = function() {\n  function shim(props, propName, componentName, location, propFullName, secret) {\n    if (secret === ReactPropTypesSecret) {\n      // It is still safe when called from React.\n      return;\n    }\n    var err = new Error(\n      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n      'Use PropTypes.checkPropTypes() to call them. ' +\n      'Read more at http://fb.me/use-check-prop-types'\n    );\n    err.name = 'Invariant Violation';\n    throw err;\n  };\n  shim.isRequired = shim;\n  function getShim() {\n    return shim;\n  };\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.\n  var ReactPropTypes = {\n    array: shim,\n    bigint: shim,\n    bool: shim,\n    func: shim,\n    number: shim,\n    object: shim,\n    string: shim,\n    symbol: shim,\n\n    any: shim,\n    arrayOf: getShim,\n    element: shim,\n    elementType: shim,\n    instanceOf: getShim,\n    node: shim,\n    objectOf: getShim,\n    oneOf: getShim,\n    oneOfType: getShim,\n    shape: getShim,\n    exact: getShim,\n\n    checkPropTypes: emptyFunctionWithReset,\n    resetWarningCache: emptyFunction\n  };\n\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/prop-types/factoryWithThrowingShims.js?")},216:(module,__unused_webpack_exports,__webpack_require__)=>{eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (false) { var throwOnDirectAccess, ReactIs; } else {\n  // By explicitly using `prop-types` you are opting into new production behavior.\n  // http://fb.me/prop-types-in-prod\n  module.exports = __webpack_require__(459)();\n}\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/prop-types/index.js?")},704:module=>{"use strict";eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/prop-types/lib/ReactPropTypesSecret.js?")},530:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";eval("var __webpack_unused_export__;\n\n\n__webpack_unused_export__ = ({\n  value: true\n});\n__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(24);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(216);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _event = __webpack_require__(861);\n\nvar _scrollParent = __webpack_require__(383);\n\nvar _scrollParent2 = _interopRequireDefault(_scrollParent);\n\nvar _debounce = __webpack_require__(417);\n\nvar _debounce2 = _interopRequireDefault(_debounce);\n\nvar _throttle = __webpack_require__(59);\n\nvar _throttle2 = _interopRequireDefault(_throttle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * react-lazyload\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */\n\n\nvar defaultBoundingClientRect = {\n  top: 0,\n  right: 0,\n  bottom: 0,\n  left: 0,\n  width: 0,\n  height: 0\n};\nvar LISTEN_FLAG = 'data-lazyload-listened';\nvar listeners = [];\nvar pending = [];\n\n// try to handle passive events\nvar passiveEventSupported = false;\ntry {\n  var opts = Object.defineProperty({}, 'passive', {\n    get: function get() {\n      passiveEventSupported = true;\n    }\n  });\n  window.addEventListener('test', null, opts);\n} catch (e) {}\n// if they are supported, setup the optional params\n// IMPORTANT: FALSE doubles as the default CAPTURE value!\nvar passiveEvent = passiveEventSupported ? { capture: false, passive: true } : false;\n\n/**\n * Check if `component` is visible in overflow container `parent`\n * @param  {node} component React component\n * @param  {node} parent    component's scroll parent\n * @return {bool}\n */\nvar checkOverflowVisible = function checkOverflowVisible(component, parent) {\n  var node = component.ref;\n\n  var parentTop = void 0;\n  var parentLeft = void 0;\n  var parentHeight = void 0;\n  var parentWidth = void 0;\n\n  try {\n    var _parent$getBoundingCl = parent.getBoundingClientRect();\n\n    parentTop = _parent$getBoundingCl.top;\n    parentLeft = _parent$getBoundingCl.left;\n    parentHeight = _parent$getBoundingCl.height;\n    parentWidth = _parent$getBoundingCl.width;\n  } catch (e) {\n    parentTop = defaultBoundingClientRect.top;\n    parentLeft = defaultBoundingClientRect.left;\n    parentHeight = defaultBoundingClientRect.height;\n    parentWidth = defaultBoundingClientRect.width;\n  }\n\n  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;\n  var windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;\n\n  // calculate top and height of the intersection of the element's scrollParent and viewport\n  var intersectionTop = Math.max(parentTop, 0); // intersection's top relative to viewport\n  var intersectionLeft = Math.max(parentLeft, 0); // intersection's left relative to viewport\n  var intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height\n  var intersectionWidth = Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft; // width\n\n  // check whether the element is visible in the intersection\n  var top = void 0;\n  var left = void 0;\n  var height = void 0;\n  var width = void 0;\n\n  try {\n    var _node$getBoundingClie = node.getBoundingClientRect();\n\n    top = _node$getBoundingClie.top;\n    left = _node$getBoundingClie.left;\n    height = _node$getBoundingClie.height;\n    width = _node$getBoundingClie.width;\n  } catch (e) {\n    top = defaultBoundingClientRect.top;\n    left = defaultBoundingClientRect.left;\n    height = defaultBoundingClientRect.height;\n    width = defaultBoundingClientRect.width;\n  }\n\n  var offsetTop = top - intersectionTop; // element's top relative to intersection\n  var offsetLeft = left - intersectionLeft; // element's left relative to intersection\n\n  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API\n\n  return offsetTop - offsets[0] <= intersectionHeight && offsetTop + height + offsets[1] >= 0 && offsetLeft - offsets[0] <= intersectionWidth && offsetLeft + width + offsets[1] >= 0;\n};\n\n/**\n * Check if `component` is visible in document\n * @param  {node} component React component\n * @return {bool}\n */\nvar checkNormalVisible = function checkNormalVisible(component) {\n  var node = component.ref;\n\n  // If this element is hidden by css rules somehow, it's definitely invisible\n  if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;\n\n  var top = void 0;\n  var elementHeight = void 0;\n\n  try {\n    var _node$getBoundingClie2 = node.getBoundingClientRect();\n\n    top = _node$getBoundingClie2.top;\n    elementHeight = _node$getBoundingClie2.height;\n  } catch (e) {\n    top = defaultBoundingClientRect.top;\n    elementHeight = defaultBoundingClientRect.height;\n  }\n\n  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;\n\n  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API\n\n  return top - offsets[0] <= windowInnerHeight && top + elementHeight + offsets[1] >= 0;\n};\n\n/**\n * Detect if element is visible in viewport, if so, set `visible` state to true.\n * If `once` prop is provided true, remove component as listener after checkVisible\n *\n * @param  {React} component   React component that respond to scroll and resize\n */\nvar checkVisible = function checkVisible(component) {\n  var node = component.ref;\n  if (!(node instanceof HTMLElement)) {\n    return;\n  }\n\n  var parent = (0, _scrollParent2.default)(node);\n  var isOverflow = component.props.overflow && parent !== node.ownerDocument && parent !== document && parent !== document.documentElement;\n  var visible = isOverflow ? checkOverflowVisible(component, parent) : checkNormalVisible(component);\n  if (visible) {\n    // Avoid extra render if previously is visible\n    if (!component.visible) {\n      if (component.props.once) {\n        pending.push(component);\n      }\n\n      component.visible = true;\n      component.forceUpdate();\n    }\n  } else if (!(component.props.once && component.visible)) {\n    component.visible = false;\n    if (component.props.unmountIfInvisible) {\n      component.forceUpdate();\n    }\n  }\n};\n\nvar purgePending = function purgePending() {\n  pending.forEach(function (component) {\n    var index = listeners.indexOf(component);\n    if (index !== -1) {\n      listeners.splice(index, 1);\n    }\n  });\n\n  pending = [];\n};\n\nvar lazyLoadHandler = function lazyLoadHandler() {\n  for (var i = 0; i < listeners.length; ++i) {\n    var listener = listeners[i];\n    checkVisible(listener);\n  }\n  // Remove `once` component in listeners\n  purgePending();\n};\n\n/**\n * Forces the component to display regardless of whether the element is visible in the viewport.\n */\nvar forceVisible = function forceVisible() {\n  for (var i = 0; i < listeners.length; ++i) {\n    var listener = listeners[i];\n    listener.visible = true;\n    listener.forceUpdate();\n  }\n  // Remove `once` component in listeners\n  purgePending();\n};\n\n// Depending on component's props\nvar delayType = void 0;\nvar finalLazyLoadHandler = null;\n\nvar isString = function isString(string) {\n  return typeof string === 'string';\n};\n\nvar LazyLoad = function (_Component) {\n  _inherits(LazyLoad, _Component);\n\n  function LazyLoad(props) {\n    _classCallCheck(this, LazyLoad);\n\n    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, props));\n\n    _this.visible = false;\n    _this.setRef = _this.setRef.bind(_this);\n    return _this;\n  }\n\n  _createClass(LazyLoad, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      // It's unlikely to change delay type on the fly, this is mainly\n      // designed for tests\n      var scrollport = window;\n      var scrollContainer = this.props.scrollContainer;\n\n      if (scrollContainer) {\n        if (isString(scrollContainer)) {\n          scrollport = scrollport.document.querySelector(scrollContainer);\n        }\n      }\n      var needResetFinalLazyLoadHandler = this.props.debounce !== undefined && delayType === 'throttle' || delayType === 'debounce' && this.props.debounce === undefined;\n\n      if (needResetFinalLazyLoadHandler) {\n        (0, _event.off)(scrollport, 'scroll', finalLazyLoadHandler, passiveEvent);\n        (0, _event.off)(window, 'resize', finalLazyLoadHandler, passiveEvent);\n        finalLazyLoadHandler = null;\n      }\n\n      if (!finalLazyLoadHandler) {\n        if (this.props.debounce !== undefined) {\n          finalLazyLoadHandler = (0, _debounce2.default)(lazyLoadHandler, typeof this.props.debounce === 'number' ? this.props.debounce : 300);\n          delayType = 'debounce';\n        } else if (this.props.throttle !== undefined) {\n          finalLazyLoadHandler = (0, _throttle2.default)(lazyLoadHandler, typeof this.props.throttle === 'number' ? this.props.throttle : 300);\n          delayType = 'throttle';\n        } else {\n          finalLazyLoadHandler = lazyLoadHandler;\n        }\n      }\n\n      if (this.props.overflow) {\n        var parent = (0, _scrollParent2.default)(this.ref);\n        if (parent && typeof parent.getAttribute === 'function') {\n          var listenerCount = 1 + +parent.getAttribute(LISTEN_FLAG);\n          if (listenerCount === 1) {\n            parent.addEventListener('scroll', finalLazyLoadHandler, passiveEvent);\n          }\n          parent.setAttribute(LISTEN_FLAG, listenerCount);\n        }\n      } else if (listeners.length === 0 || needResetFinalLazyLoadHandler) {\n        var _props = this.props,\n            scroll = _props.scroll,\n            resize = _props.resize;\n\n\n        if (scroll) {\n          (0, _event.on)(scrollport, 'scroll', finalLazyLoadHandler, passiveEvent);\n        }\n\n        if (resize) {\n          (0, _event.on)(window, 'resize', finalLazyLoadHandler, passiveEvent);\n        }\n      }\n\n      listeners.push(this);\n      checkVisible(this);\n    }\n  }, {\n    key: 'shouldComponentUpdate',\n    value: function shouldComponentUpdate() {\n      return this.visible;\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      if (this.props.overflow) {\n        var parent = (0, _scrollParent2.default)(this.ref);\n        if (parent && typeof parent.getAttribute === 'function') {\n          var listenerCount = +parent.getAttribute(LISTEN_FLAG) - 1;\n          if (listenerCount === 0) {\n            parent.removeEventListener('scroll', finalLazyLoadHandler, passiveEvent);\n            parent.removeAttribute(LISTEN_FLAG);\n          } else {\n            parent.setAttribute(LISTEN_FLAG, listenerCount);\n          }\n        }\n      }\n\n      var index = listeners.indexOf(this);\n      if (index !== -1) {\n        listeners.splice(index, 1);\n      }\n\n      if (listeners.length === 0 && typeof window !== 'undefined') {\n        (0, _event.off)(window, 'resize', finalLazyLoadHandler, passiveEvent);\n        (0, _event.off)(window, 'scroll', finalLazyLoadHandler, passiveEvent);\n      }\n    }\n  }, {\n    key: 'setRef',\n    value: function setRef(element) {\n      if (element) {\n        this.ref = element;\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _props2 = this.props,\n          height = _props2.height,\n          children = _props2.children,\n          placeholder = _props2.placeholder,\n          className = _props2.className,\n          classNamePrefix = _props2.classNamePrefix,\n          style = _props2.style;\n\n\n      return _react2.default.createElement(\n        'div',\n        { className: classNamePrefix + '-wrapper ' + className, ref: this.setRef, style: style },\n        this.visible ? children : placeholder ? placeholder : _react2.default.createElement('div', {\n          style: { height: height },\n          className: classNamePrefix + '-placeholder'\n        })\n      );\n    }\n  }]);\n\n  return LazyLoad;\n}(_react.Component);\n\nLazyLoad.propTypes = {\n  className: _propTypes2.default.string,\n  classNamePrefix: _propTypes2.default.string,\n  once: _propTypes2.default.bool,\n  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),\n  offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),\n  overflow: _propTypes2.default.bool,\n  resize: _propTypes2.default.bool,\n  scroll: _propTypes2.default.bool,\n  children: _propTypes2.default.node,\n  throttle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),\n  debounce: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),\n  placeholder: _propTypes2.default.node,\n  scrollContainer: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),\n  unmountIfInvisible: _propTypes2.default.bool,\n  style: _propTypes2.default.object\n};\n\nLazyLoad.defaultProps = {\n  className: '',\n  classNamePrefix: 'lazyload',\n  once: false,\n  offset: 0,\n  overflow: false,\n  resize: false,\n  scroll: true,\n  unmountIfInvisible: false\n};\n\nvar getDisplayName = function getDisplayName(WrappedComponent) {\n  return WrappedComponent.displayName || WrappedComponent.name || 'Component';\n};\n\nvar decorator = function decorator() {\n  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return function lazyload(WrappedComponent) {\n    return function (_Component2) {\n      _inherits(LazyLoadDecorated, _Component2);\n\n      function LazyLoadDecorated() {\n        _classCallCheck(this, LazyLoadDecorated);\n\n        var _this2 = _possibleConstructorReturn(this, (LazyLoadDecorated.__proto__ || Object.getPrototypeOf(LazyLoadDecorated)).call(this));\n\n        _this2.displayName = 'LazyLoad' + getDisplayName(WrappedComponent);\n        return _this2;\n      }\n\n      _createClass(LazyLoadDecorated, [{\n        key: 'render',\n        value: function render() {\n          return _react2.default.createElement(\n            LazyLoad,\n            options,\n            _react2.default.createElement(WrappedComponent, this.props)\n          );\n        }\n      }]);\n\n      return LazyLoadDecorated;\n    }(_react.Component);\n  };\n};\n\n__webpack_unused_export__ = decorator;\nexports.ZP = LazyLoad;\n__webpack_unused_export__ = lazyLoadHandler;\n__webpack_unused_export__ = forceVisible;\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/react-lazyload/lib/index.js?")},417:(__unused_webpack_module,exports)=>{"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", ({\n  value: true\n}));\nexports["default"] = debounce;\nfunction debounce(func, wait, immediate) {\n  var timeout = void 0;\n  var args = void 0;\n  var context = void 0;\n  var timestamp = void 0;\n  var result = void 0;\n\n  var later = function later() {\n    var last = +new Date() - timestamp;\n\n    if (last < wait && last >= 0) {\n      timeout = setTimeout(later, wait - last);\n    } else {\n      timeout = null;\n      if (!immediate) {\n        result = func.apply(context, args);\n        if (!timeout) {\n          context = null;\n          args = null;\n        }\n      }\n    }\n  };\n\n  return function debounced() {\n    context = this;\n    args = arguments;\n    timestamp = +new Date();\n\n    var callNow = immediate && !timeout;\n    if (!timeout) {\n      timeout = setTimeout(later, wait);\n    }\n\n    if (callNow) {\n      result = func.apply(context, args);\n      context = null;\n      args = null;\n    }\n\n    return result;\n  };\n}\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/react-lazyload/lib/utils/debounce.js?')},861:(__unused_webpack_module,exports)=>{"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", ({\n  value: true\n}));\nexports.on = on;\nexports.off = off;\nfunction on(el, eventName, callback, opts) {\n  opts = opts || false;\n  if (el.addEventListener) {\n    el.addEventListener(eventName, callback, opts);\n  } else if (el.attachEvent) {\n    el.attachEvent("on" + eventName, function (e) {\n      callback.call(el, e || window.event);\n    });\n  }\n}\n\nfunction off(el, eventName, callback, opts) {\n  opts = opts || false;\n  if (el.removeEventListener) {\n    el.removeEventListener(eventName, callback, opts);\n  } else if (el.detachEvent) {\n    el.detachEvent("on" + eventName, callback);\n  }\n}\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/react-lazyload/lib/utils/event.js?')},383:(__unused_webpack_module,exports)=>{"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n/**\n * @fileOverview Find scroll parent\n */\n\nexports[\"default\"] = function (node) {\n  if (!(node instanceof HTMLElement)) {\n    return document.documentElement;\n  }\n\n  var excludeStaticParent = node.style.position === 'absolute';\n  var overflowRegex = /(scroll|auto)/;\n  var parent = node;\n\n  while (parent) {\n    if (!parent.parentNode) {\n      return node.ownerDocument || document.documentElement;\n    }\n\n    var style = window.getComputedStyle(parent);\n    var position = style.position;\n    var overflow = style.overflow;\n    var overflowX = style['overflow-x'];\n    var overflowY = style['overflow-y'];\n\n    if (position === 'static' && excludeStaticParent) {\n      parent = parent.parentNode;\n      continue;\n    }\n\n    if (overflowRegex.test(overflow) && overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {\n      return parent;\n    }\n\n    parent = parent.parentNode;\n  }\n\n  return node.ownerDocument || node.documentElement || document.documentElement;\n};\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/react-lazyload/lib/utils/scrollParent.js?")},59:(__unused_webpack_module,exports)=>{"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", ({\n  value: true\n}));\nexports["default"] = throttle;\n/*eslint-disable */\nfunction throttle(fn, threshhold, scope) {\n  threshhold || (threshhold = 250);\n  var last, deferTimer;\n  return function () {\n    var context = scope || this;\n\n    var now = +new Date(),\n        args = arguments;\n    if (last && now < last + threshhold) {\n      // hold on to it\n      clearTimeout(deferTimer);\n      deferTimer = setTimeout(function () {\n        last = now;\n        fn.apply(context, args);\n      }, threshhold);\n    } else {\n      last = now;\n      fn.apply(context, args);\n    }\n  };\n}\n\n//# sourceURL=webpack://@scrowl/template-block-text/../../../node_modules/react-lazyload/lib/utils/throttle.js?')},737:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n// EXTERNAL MODULE: ../../../node_modules/react-lazyload/lib/index.js\nvar lib = __webpack_require__(530);\n;// CONCATENATED MODULE: ./src/block-text.tsx\n\n\n\nconst BlockText = ({ id, schema, ...props }) => {\n    const Scrowl = window['Scrowl'];\n    let classes = 'template-block-text';\n    const Markdown = Scrowl.core.Markdown;\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const contentId = `${id}-block-text`;\n    const text = schema.content.text.value;\n    const textFocusCss = focusElement === 'text' && 'has-focus';\n    const bg = schema.content.bgImage.content.bg.value;\n    const bgUrl = schema.content.bgImage.content.url.value;\n    const bgLabel = schema.content.bgImage.content.alt.value || '';\n    const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';\n    const bgRef = (0,external_React_.useRef)(null);\n    const bgStyles = {\n        backgroundImage: `url(\"${bgUrl}\")`,\n    };\n    const alignment = schema.content.options.content.alignment.value;\n    const alignmentCss = alignment === 'right' ? 'right' : 'left';\n    const showProgressBar = schema.content.options.content.showProgress.value;\n    const showProgressRef = (0,external_React_.useRef)(showProgressBar);\n    const slideProgress = (0,external_React_.useRef)(0);\n    const [progressBarStyles, setProgressBarStyles] = (0,external_React_.useState)({\n        width: showProgressBar ? '0%' : '100%',\n    });\n    if (showProgressBar) {\n        classes += ' show-progress';\n    }\n    const handleFocusText = () => {\n        if (editMode) {\n            Scrowl.core.host.sendMessage({\n                type: 'focus',\n                field: 'text',\n            });\n        }\n    };\n    const handleFocusBg = () => {\n        if (editMode) {\n            Scrowl.core.host.sendMessage({\n                type: 'focus',\n                field: 'bgImage.url',\n            });\n        }\n    };\n    const handleSlideProgress = (ev) => {\n        slideProgress.current = ev.progress;\n        if (showProgressRef.current) {\n            setProgressBarStyles({\n                ...progressBarStyles,\n                width: `${ev.progress}%`,\n            });\n        }\n    };\n    const handleSlideEnd = () => {\n        slideProgress.current = 100;\n        if (!showProgressRef.current) {\n            return;\n        }\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: `100%`,\n        });\n    };\n    (0,external_React_.useEffect)(() => {\n        showProgressRef.current = showProgressBar;\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: showProgressBar ? `${slideProgress.current}%` : `100%`,\n        });\n    }, [showProgressBar]);\n    return (external_React_default().createElement(Scrowl.core.Template, { id: `slide-${contentId}`, className: classes, onProgress: handleSlideProgress, onEnd: handleSlideEnd, ...props },\n        external_React_default().createElement(\"div\", { id: contentId, className: \"owlui-container\" },\n            external_React_default().createElement(\"div\", { className: `owlui-row owlui-row-cols-2 ${alignmentCss}` },\n                bg && external_React_default().createElement(\"div\", { className: \"owlui-col overlay\" }),\n                external_React_default().createElement(\"div\", { className: `owlui-col text__wrapper` },\n                    external_React_default().createElement(\"div\", { className: \"text__container\" },\n                        external_React_default().createElement(\"div\", { className: \"progress-indictor\" },\n                            external_React_default().createElement(\"div\", { className: \"progress-bar\", style: progressBarStyles })),\n                        external_React_default().createElement(\"div\", { className: `text__value can-focus ${textFocusCss}`, onMouseDown: handleFocusText },\n                            external_React_default().createElement(Markdown, null, text)))))),\n        (bgUrl || editMode) && (external_React_default().createElement(\"div\", { ref: bgRef, className: `img__wrapper ${alignmentCss} can-focus ${bgFocusCss} ${bg ? 'as-bg' : 'as-side'}`, onMouseDown: handleFocusBg },\n            external_React_default().createElement(lib/* default */.ZP, null,\n                external_React_default().createElement(\"img\", { className: \"img__container\", \"aria-label\": bgLabel, style: bgStyles }))))));\n};\n/* harmony default export */ const block_text = ({\n    BlockText,\n});\n\n;// CONCATENATED MODULE: ./src/block-text.schema.ts\nconst BlockTextSchema = {\n    meta: {\n        version: \"1.0.0\",\n        label: \"Text Block\",\n        component: \"BlockText\",\n        filename: \"block-text\",\n        tags: [\"text\", \"image\"],\n        icon: 'vertical_split',\n    },\n    content: {\n        text: {\n            type: 'Textbox',\n            label: 'Block Text',\n            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n            placeholder: 'Write content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        bgImage: {\n            type: 'Fieldset',\n            label: 'Background Image',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                url: {\n                    type: 'Asset',\n                    assetTypes: ['image'],\n                    label: 'Image',\n                },\n                bg: {\n                    type: 'Checkbox',\n                    label: 'Use as Background',\n                    value: false,\n                }\n            },\n        },\n        options: {\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        { name: 'Align Left', value: 'left', icon: 'align_horizontal_left' },\n                        { name: 'Align Right', value: 'right', icon: 'align_horizontal_right' },\n                    ],\n                    iconFromValue: true,\n                },\n                showProgress: {\n                    type: 'Checkbox',\n                    label: 'Show Progress Bar',\n                    value: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const block_text_schema = ({\n    BlockTextSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.BlockText = BlockText;\nwindow.BlockTextSchema = BlockTextSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/./web/index.ts_+_3_modules?")},24:e=>{"use strict";e.exports=__WEBPACK_EXTERNAL_MODULE__24__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(737);return __webpack_exports__})()));