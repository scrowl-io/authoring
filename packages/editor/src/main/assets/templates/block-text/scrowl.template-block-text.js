!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("React"));else if("function"==typeof define&&define.amd)define(["React"],t);else{var r="object"==typeof exports?t(require("React")):t(e.React);for(var _ in r)("object"==typeof exports?exports:e)[_]=r[_]}}(self,(__WEBPACK_EXTERNAL_MODULE__24__=>(()=>{"use strict";var __webpack_modules__={244:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./src/block-text.schema.ts\nconst BlockTextSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Text Block',\n        component: 'BlockText',\n        filename: 'block-text',\n        tags: ['text', 'image'],\n        icon: 'vertical_split',\n    },\n    content: {\n        text: {\n            type: 'Textbox',\n            label: 'Block Text',\n            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n            placeholder: 'Write content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        bgImage: {\n            type: 'Fieldset',\n            label: 'Background Image',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                url: {\n                    type: 'Asset',\n                    assetTypes: ['image'],\n                    label: 'Image',\n                },\n                bg: {\n                    type: 'Checkbox',\n                    label: 'Use as Background',\n                    value: false,\n                },\n            },\n        },\n        options: {\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        {\n                            name: 'Align Left',\n                            value: 'left',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Right',\n                            value: 'right',\n                            icon: 'align_horizontal_right',\n                        },\n                    ],\n                    iconFromValue: true,\n                },\n                showProgress: {\n                    type: 'Checkbox',\n                    label: 'Show Progress Bar',\n                    value: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const block_text_schema = ({\n    BlockTextSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n;// CONCATENATED MODULE: ./web/block-text-lazy.tsx\n\nconst BlockTextLazy = (0,external_React_.lazy)(() => __webpack_require__.e(/* import() | template-block-text */ 775).then(__webpack_require__.bind(__webpack_require__, 84)));\nconst BlockText = (props) => {\n    return (external_React_default().createElement(external_React_.Suspense, { fallback: external_React_default().createElement(\"div\", null, \"Loading...\") },\n        external_React_default().createElement(BlockTextLazy, { ...props })));\n};\n/* harmony default export */ const block_text_lazy = (BlockText);\n\n;// CONCATENATED MODULE: ./web/index.ts\n\n\nwindow.BlockText = block_text_lazy;\nwindow.BlockTextSchema = BlockTextSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/./web/index.ts_+_3_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__}},__webpack_module_cache__={},inProgress,dataWebpackPrefix,loadStylesheet,installedCssChunks;function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((t,r)=>(__webpack_require__.f[r](e,t),t)),[])),__webpack_require__.u=e=>"scrowl.template-block-text.component.js",__webpack_require__.miniCssF=e=>{if(775===e)return"scrowl.template-block-text.css"},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),inProgress={},dataWebpackPrefix="@scrowl/template-block-text:",__webpack_require__.l=(e,t,r,_)=>{if(inProgress[e])inProgress[e].push(t);else{var n,a;if(void 0!==r)for(var o=document.getElementsByTagName("script"),l=0;l<o.length;l++){var i=o[l];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")==dataWebpackPrefix+r){n=i;break}}n||(a=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,__webpack_require__.nc&&n.setAttribute("nonce",__webpack_require__.nc),n.setAttribute("data-webpack",dataWebpackPrefix+r),n.src=e),inProgress[e]=[t];var c=(t,r)=>{n.onerror=n.onload=null,clearTimeout(s);var _=inProgress[e];if(delete inProgress[e],n.parentNode&&n.parentNode.removeChild(n),_&&_.forEach((e=>e(r))),t)return t(r)},s=setTimeout(c.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=c.bind(null,n.onerror),n.onload=c.bind(null,n.onload),a&&document.head.appendChild(n)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),loadStylesheet=e=>new Promise(((t,r)=>{var _=__webpack_require__.miniCssF(e),n=__webpack_require__.p+_;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),_=0;_<r.length;_++){var n=(o=r[_]).getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(n===e||n===t))return o}var a=document.getElementsByTagName("style");for(_=0;_<a.length;_++){var o;if((n=(o=a[_]).getAttribute("data-href"))===e||n===t)return o}})(_,n))return t();((e,t,r,_)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.onerror=n.onload=a=>{if(n.onerror=n.onload=null,"load"===a.type)r();else{var o=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||t,i=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");i.code="CSS_CHUNK_LOAD_FAILED",i.type=o,i.request=l,n.parentNode.removeChild(n),_(i)}},n.href=t,document.head.appendChild(n)})(e,n,t,r)})),installedCssChunks={127:0},__webpack_require__.f.miniCss=(e,t)=>{installedCssChunks[e]?t.push(installedCssChunks[e]):0!==installedCssChunks[e]&&{775:1}[e]&&t.push(installedCssChunks[e]=loadStylesheet(e).then((()=>{installedCssChunks[e]=0}),(t=>{throw delete installedCssChunks[e],t})))},(()=>{var e={127:0};__webpack_require__.f.j=(t,r)=>{var _=__webpack_require__.o(e,t)?e[t]:void 0;if(0!==_)if(_)r.push(_[2]);else{var n=new Promise(((r,n)=>_=e[t]=[r,n]));r.push(_[2]=n);var a=__webpack_require__.p+__webpack_require__.u(t),o=new Error;__webpack_require__.l(a,(r=>{if(__webpack_require__.o(e,t)&&(0!==(_=e[t])&&(e[t]=void 0),_)){var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",o.name="ChunkLoadError",o.type=n,o.request=a,_[1](o)}}),"chunk-"+t,t)}};var t=(t,r)=>{var _,n,[a,o,l]=r,i=0;if(a.some((t=>0!==e[t]))){for(_ in o)__webpack_require__.o(o,_)&&(__webpack_require__.m[_]=o[_]);if(l)l(__webpack_require__)}for(t&&t(r);i<a.length;i++)n=a[i],__webpack_require__.o(e,n)&&e[n]&&e[n][0](),e[n]=0},r=self.webpackChunk_scrowl_template_block_text=self.webpackChunk_scrowl_template_block_text||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var __webpack_exports__=__webpack_require__(244);return __webpack_exports__})()));