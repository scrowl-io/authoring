!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("React"));else if("function"==typeof define&&define.amd)define(["React"],t);else{var r="object"==typeof exports?t(require("React")):t(e.React);for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(self,(__WEBPACK_EXTERNAL_MODULE__24__=>(()=>{"use strict";var __webpack_modules__={877:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./src/simple-video.schema.ts\nconst SimpleVideoSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Simple Video',\n        component: 'SimpleVideo',\n        filename: 'simple-video',\n        icon: 'view_week',\n        tags: ['text', 'video'],\n    },\n    content: {\n        text: {\n            type: 'Textbox',\n            label: 'Video Text',\n            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n            placeholder: 'Write content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        videoAsset: {\n            type: 'Fieldset',\n            label: 'Video',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                assetUrl: {\n                    type: 'Asset',\n                    assetTypes: ['video'],\n                    label: 'Video',\n                },\n                webUrl: {\n                    type: 'Textbox',\n                    label: 'Embed URL',\n                    placeholder: 'Embed URL',\n                    // value:\n                    //   'https://www.ted.com/talks/pia_mancini_how_to_upgrade_democracy_for_the_internet_era',\n                    // value: 'https://www.dailymotion.com/video/x873541',\n                    // value: 'https://vimeo.com/253989945',\n                    // value: 'https://www.youtube.com/watch?v=Z_ppk0iQnsA',\n                },\n            },\n        },\n        options: {\n            // @ts-ignore\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        {\n                            name: 'Align Left',\n                            value: 'left',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Right',\n                            value: 'right',\n                            icon: 'align_horizontal_right',\n                        },\n                    ],\n                    iconFromValue: true,\n                },\n                showProgress: {\n                    type: 'Checkbox',\n                    label: 'Show Progress Bar',\n                    value: true,\n                },\n            },\n        },\n    },\n    controlOptions: {\n        stopUserAdvancement: {\n            type: 'Checkbox',\n            label: 'Stop User Advancement',\n            value: false,\n        },\n        disableAnimations: {\n            type: 'Checkbox',\n            label: 'Disable Animations',\n            value: true,\n        },\n    },\n};\n/* harmony default export */ const simple_video_schema = ({\n    SimpleVideoSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n;// CONCATENATED MODULE: ./web/simple-video-lazy.tsx\n\nconst SimpleVideoLazy = (0,external_React_.lazy)(() => Promise.all(/* import() | template-simple-video */[__webpack_require__.e(287), __webpack_require__.e(755)]).then(__webpack_require__.bind(__webpack_require__, 914)));\nconst SimpleVideo = (props) => {\n    return (external_React_default().createElement(external_React_.Suspense, { fallback: external_React_default().createElement(\"div\", null, \"Loading...\") },\n        external_React_default().createElement(SimpleVideoLazy, { ...props })));\n};\n/* harmony default export */ const simple_video_lazy = (SimpleVideo);\n\n;// CONCATENATED MODULE: ./web/index.ts\n\n\nwindow.SimpleVideo = simple_video_lazy;\nwindow.SimpleVideoSchema = SimpleVideoSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-simple-video/./web/index.ts_+_3_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__}},__webpack_module_cache__={},inProgress,dataWebpackPrefix,loadStylesheet,installedCssChunks;function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((t,r)=>(__webpack_require__.f[r](e,t),t)),[])),__webpack_require__.u=e=>"scrowl."+(755===e?"template-simple-video":e)+".component.js",__webpack_require__.miniCssF=e=>{if(755===e)return"scrowl.template-simple-video.css"},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),inProgress={},dataWebpackPrefix="@scrowl/template-simple-video:",__webpack_require__.l=(e,t,r,n)=>{if(inProgress[e])inProgress[e].push(t);else{var _,a;if(void 0!==r)for(var i=document.getElementsByTagName("script"),o=0;o<i.length;o++){var l=i[o];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==dataWebpackPrefix+r){_=l;break}}_||(a=!0,(_=document.createElement("script")).charset="utf-8",_.timeout=120,__webpack_require__.nc&&_.setAttribute("nonce",__webpack_require__.nc),_.setAttribute("data-webpack",dataWebpackPrefix+r),_.src=e),inProgress[e]=[t];var s=(t,r)=>{_.onerror=_.onload=null,clearTimeout(c);var n=inProgress[e];if(delete inProgress[e],_.parentNode&&_.parentNode.removeChild(_),n&&n.forEach((e=>e(r))),t)return t(r)},c=setTimeout(s.bind(null,void 0,{type:"timeout",target:_}),12e4);_.onerror=s.bind(null,_.onerror),_.onload=s.bind(null,_.onload),a&&document.head.appendChild(_)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),loadStylesheet=e=>new Promise(((t,r)=>{var n=__webpack_require__.miniCssF(e),_=__webpack_require__.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var _=(i=r[n]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(_===e||_===t))return i}var a=document.getElementsByTagName("style");for(n=0;n<a.length;n++){var i;if((_=(i=a[n]).getAttribute("data-href"))===e||_===t)return i}})(n,_))return t();((e,t,r,n)=>{var _=document.createElement("link");_.rel="stylesheet",_.type="text/css",_.onerror=_.onload=a=>{if(_.onerror=_.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=o,_.parentNode.removeChild(_),n(l)}},_.href=t,document.head.appendChild(_)})(e,_,t,r)})),installedCssChunks={989:0},__webpack_require__.f.miniCss=(e,t)=>{installedCssChunks[e]?t.push(installedCssChunks[e]):0!==installedCssChunks[e]&&{755:1}[e]&&t.push(installedCssChunks[e]=loadStylesheet(e).then((()=>{installedCssChunks[e]=0}),(t=>{throw delete installedCssChunks[e],t})))},(()=>{var e={989:0};__webpack_require__.f.j=(t,r)=>{var n=__webpack_require__.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var _=new Promise(((r,_)=>n=e[t]=[r,_]));r.push(n[2]=_);var a=__webpack_require__.p+__webpack_require__.u(t),i=new Error;__webpack_require__.l(a,(r=>{if(__webpack_require__.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var _=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+_+": "+a+")",i.name="ChunkLoadError",i.type=_,i.request=a,n[1](i)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,_,[a,i,o]=r,l=0;if(a.some((t=>0!==e[t]))){for(n in i)__webpack_require__.o(i,n)&&(__webpack_require__.m[n]=i[n]);if(o)o(__webpack_require__)}for(t&&t(r);l<a.length;l++)_=a[l],__webpack_require__.o(e,_)&&e[_]&&e[_][0](),e[_]=0},r=self.webpackChunk_scrowl_template_simple_video=self.webpackChunk_scrowl_template_simple_video||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var __webpack_exports__=__webpack_require__(877);return __webpack_exports__})()));