(self.webpackChunk_scrowl_template_simple_text=self.webpackChunk_scrowl_template_simple_text||[]).push([[10],{459:(e,t,n)=>{"use strict";var o=n(704);function r(){}function i(){}i.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,i,a){if(a!==o){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return n.PropTypes=n,n}},216:(e,t,n)=>{e.exports=n(459)()},704:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},530:(e,t,n)=>{"use strict";var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(24),i=f(r),a=f(n(216)),s=n(861),l=f(n(383)),c=f(n(417)),u=f(n(59));function f(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function v(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var m=0,h=0,y=0,b=0,w="data-lazyload-listened",g=[],E=[],_=!1;try{var O=Object.defineProperty({},"passive",{get:function(){_=!0}});window.addEventListener("test",null,O)}catch(e){}var T=!!_&&{capture:!1,passive:!0},N=function(e){var t=e.ref;if(t instanceof HTMLElement){var n=(0,l.default)(t),o=e.props.overflow&&n!==t.ownerDocument&&n!==document&&n!==document.documentElement?function(e,t){var n=e.ref,o=void 0,r=void 0,i=void 0,a=void 0;try{var s=t.getBoundingClientRect();o=s.top,r=s.left,i=s.height,a=s.width}catch(e){o=m,r=h,i=b,a=y}var l=window.innerHeight||document.documentElement.clientHeight,c=window.innerWidth||document.documentElement.clientWidth,u=Math.max(o,0),f=Math.max(r,0),d=Math.min(l,o+i)-u,p=Math.min(c,r+a)-f,v=void 0,w=void 0,g=void 0,E=void 0;try{var _=n.getBoundingClientRect();v=_.top,w=_.left,g=_.height,E=_.width}catch(e){v=m,w=h,g=b,E=y}var O=v-u,T=w-f,N=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return O-N[0]<=d&&O+g+N[1]>=0&&T-N[0]<=p&&T+E+N[1]>=0}(e,n):function(e){var t=e.ref;if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var n=void 0,o=void 0;try{var r=t.getBoundingClientRect();n=r.top,o=r.height}catch(e){n=m,o=b}var i=window.innerHeight||document.documentElement.clientHeight,a=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return n-a[0]<=i&&n+o+a[1]>=0}(e);o?e.visible||(e.props.once&&E.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1,e.props.unmountIfInvisible&&e.forceUpdate())}},x=function(){E.forEach((function(e){var t=g.indexOf(e);-1!==t&&g.splice(t,1)})),E=[]},P=function(){for(var e=0;e<g.length;++e){var t=g[e];N(t)}x()},k=void 0,C=null,M=function(e){function t(e){d(this,t);var n=p(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.visible=!1,n.setRef=n.setRef.bind(n),n}return v(t,e),o(t,[{key:"componentDidMount",value:function(){var e=window,t=this.props.scrollContainer;t&&"string"==typeof t&&(e=e.document.querySelector(t));var n=void 0!==this.props.debounce&&"throttle"===k||"debounce"===k&&void 0===this.props.debounce;if(n&&((0,s.off)(e,"scroll",C,T),(0,s.off)(window,"resize",C,T),C=null),C||(void 0!==this.props.debounce?(C=(0,c.default)(P,"number"==typeof this.props.debounce?this.props.debounce:300),k="debounce"):void 0!==this.props.throttle?(C=(0,u.default)(P,"number"==typeof this.props.throttle?this.props.throttle:300),k="throttle"):C=P),this.props.overflow){var o=(0,l.default)(this.ref);if(o&&"function"==typeof o.getAttribute){var r=+o.getAttribute(w)+1;1===r&&o.addEventListener("scroll",C,T),o.setAttribute(w,r)}}else if(0===g.length||n){var i=this.props,a=i.scroll,f=i.resize;a&&(0,s.on)(e,"scroll",C,T),f&&(0,s.on)(window,"resize",C,T)}g.push(this),N(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,l.default)(this.ref);if(e&&"function"==typeof e.getAttribute){var t=+e.getAttribute(w)-1;0===t?(e.removeEventListener("scroll",C,T),e.removeAttribute(w)):e.setAttribute(w,t)}}var n=g.indexOf(this);-1!==n&&g.splice(n,1),0===g.length&&"undefined"!=typeof window&&((0,s.off)(window,"resize",C,T),(0,s.off)(window,"scroll",C,T))}},{key:"setRef",value:function(e){e&&(this.ref=e)}},{key:"render",value:function(){var e=this.props,t=e.height,n=e.children,o=e.placeholder,r=e.className,a=e.classNamePrefix,s=e.style;return i.default.createElement("div",{className:a+"-wrapper "+r,ref:this.setRef,style:s},this.visible?n:o||i.default.createElement("div",{style:{height:t},className:a+"-placeholder"}))}}]),t}(r.Component);M.propTypes={className:a.default.string,classNamePrefix:a.default.string,once:a.default.bool,height:a.default.oneOfType([a.default.number,a.default.string]),offset:a.default.oneOfType([a.default.number,a.default.arrayOf(a.default.number)]),overflow:a.default.bool,resize:a.default.bool,scroll:a.default.bool,children:a.default.node,throttle:a.default.oneOfType([a.default.number,a.default.bool]),debounce:a.default.oneOfType([a.default.number,a.default.bool]),placeholder:a.default.node,scrollContainer:a.default.oneOfType([a.default.string,a.default.object]),unmountIfInvisible:a.default.bool,style:a.default.object},M.defaultProps={className:"",classNamePrefix:"lazyload",once:!1,offset:0,overflow:!1,resize:!1,scroll:!0,unmountIfInvisible:!1};var j=function(e){return e.displayName||e.name||"Component"};t.ZP=M},417:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var o=void 0,r=void 0,i=void 0,a=void 0,s=void 0,l=function l(){var c=+new Date-a;c<t&&c>=0?o=setTimeout(l,t-c):(o=null,n||(s=e.apply(i,r),o||(i=null,r=null)))};return function(){i=this,r=arguments,a=+new Date;var c=n&&!o;return o||(o=setTimeout(l,t)),c&&(s=e.apply(i,r),i=null,r=null),s}}},861:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.on=function(e,t,n,o){o=o||!1,e.addEventListener?e.addEventListener(t,n,o):e.attachEvent&&e.attachEvent("on"+t,(function(t){n.call(e,t||window.event)}))},t.off=function(e,t,n,o){o=o||!1,e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent&&e.detachEvent("on"+t,n)}},383:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!(e instanceof HTMLElement))return document.documentElement;for(var t="absolute"===e.style.position,n=/(scroll|auto)/,o=e;o;){if(!o.parentNode)return e.ownerDocument||document.documentElement;var r=window.getComputedStyle(o),i=r.position,a=r.overflow,s=r["overflow-x"],l=r["overflow-y"];if("static"===i&&t)o=o.parentNode;else{if(n.test(a)&&n.test(s)&&n.test(l))return o;o=o.parentNode}}return e.ownerDocument||e.documentElement||document.documentElement}},59:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var o,r;return t||(t=250),function(){var i=n||this,a=+new Date,s=arguments;o&&a<o+t?(clearTimeout(r),r=setTimeout((function(){o=a,e.apply(i,s)}),t)):(o=a,e.apply(i,s))}}},368:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>a});var o=n(24),r=n.n(o),i=n(530);const a=({id:e,schema:t,...n})=>{const a=window.Scrowl;const s=a.core.Markdown,l=a.core.anime,c=(0,o.useRef)(),u=!!n.editMode,f=u?n.focusElement:null,d=`${e}-simple-text`,p=t.content.text.value,v="text"===f&&"has-focus",m={transform:"translateX(100%)",opacity:"0"},h=t.controlOptions.disableAnimations?.value,y=t.content.animateLists.value,b=t.content.bgImage.content.url.value,w=t.content.bgImage.content.alt.value||"",g="bgImage.url"===f&&"has-focus",E=(0,o.useRef)(null),_=t.content.options.content.alignment.value;("none"===y||h)&&(m.transform="translateX(0%)",m.opacity="1");const O=(0,o.useCallback)((e=>{(()=>{if(!e||!e.childNodes)return;const t=Object.keys(m),n=[];switch(e.childNodes.forEach((e=>{const o=e;o&&o.style&&(t.forEach((e=>{o.style[e]=m[e]})),n.push(o))})),y){case"all":c.current=l({targets:n,autoplay:!1,easing:"easeInOutQuad",opacity:"1",translateX:"0",duration:120});break;case"none":c&&c.current.remove(n)}})()}),[h]);return r().createElement(a.core.Template,{id:`slide-${d}`,className:"template-simple-text",onProgress:e=>{(()=>{if(c.current&&e.scene.progress>=0){const t=e.scene.progress/100*240;c.current.seek(t)}})()},notScene:!!h,...n},r().createElement("div",{id:d,className:"owlui-container"},(b||u)&&r().createElement("div",{ref:E,className:`img__wrapper ${_} can-focus ${g} as-bg`,onMouseDown:()=>{u&&a.core.host.sendMessage({type:"focus",field:"bgImage.url"})}},r().createElement(i.ZP,null,r().createElement("img",{className:"img__container","aria-label":w,src:b}))),r().createElement("div",{className:"owlui-row owlui-row-cols-1"},r().createElement("div",{className:"owlui-col"},b&&r().createElement("div",{className:"overlay"}),r().createElement("div",{className:`text__wrapper ${_}`},r().createElement("div",{ref:O,className:`text__container can-focus ${v}`,onMouseDown:()=>{u&&a.core.host.sendMessage({type:"focus",field:"text"})}},r().createElement(s,null,p)))))))}}}]);
//# sourceMappingURL=scrowl.template-simple-text.component.js.map