!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"),require("@scrowl/template-core"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var t="object"==typeof exports?n(require("React"),require("@scrowl/template-core")):n(e.React,e.Scrowl);for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(self,((__WEBPACK_EXTERNAL_MODULE__24__,__WEBPACK_EXTERNAL_MODULE__294__)=>(()=>{"use strict";var __webpack_modules__={737:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n// EXTERNAL MODULE: external {\"root\":\"Scrowl\",\"commonjs\":\"@scrowl/template-core\",\"commonjs2\":\"@scrowl/template-core\"}\nvar template_core_ = __webpack_require__(294);\nvar template_core_default = /*#__PURE__*/__webpack_require__.n(template_core_);\n;// CONCATENATED MODULE: ./src/block-text.tsx\n\n\n\nconst BlockText = ({ id, schema, ...props }) => {\n    let classes = 'template-block-text';\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const contentId = `${id}-block-text`;\n    const text = schema.content.text.value;\n    const textFocusCss = focusElement === 'text' && 'has-focus';\n    const bg = schema.content.bgImage.content.bg.value;\n    const bgUrl = schema.content.bgImage.content.url.value;\n    const bgLabel = schema.content.bgImage.content.alt.value || '';\n    const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';\n    const bgStylesFull = !bg\n        ? {}\n        : {\n            width: '100vw',\n            height: '100vh',\n            backgroundImage: `url(\"./assets/${bgUrl}\")`,\n        };\n    const bgStylesHero = bg\n        ? {}\n        : {\n            backgroundImage: bgStylesFull.backgroundImage,\n        };\n    const alignment = schema.content.options.content.alignment.value;\n    const alignmentCss = alignment === 'right' ? 'right' : '';\n    const showProgressBar = schema.content.options.content.showProgress.value;\n    const [progressBarStyles, setProgressBarStyles] = (0,external_React_.useState)({\n        width: showProgressBar ? '0%' : '100%',\n    });\n    const pins = [contentId];\n    if (showProgressBar) {\n        classes += ' show-progress';\n    }\n    const handleFocusText = () => {\n        if (editMode) {\n            template_core_default().core.host.sendMessage({\n                type: 'focus',\n                field: 'text',\n            });\n        }\n    };\n    const handleFocusBg = () => {\n        if (editMode) {\n            template_core_default().core.host.sendMessage({\n                type: 'focus',\n                field: 'bgImage.url',\n            });\n        }\n    };\n    const handleSlideProgress = (ev) => {\n        if (!showProgressBar) {\n            return;\n        }\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: `${ev.progress}%`,\n        });\n    };\n    const handleSlideEnd = () => {\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: `100%`,\n        });\n    };\n    return (external_React_default().createElement((template_core_default()).core.Template, { className: classes, onProgress: handleSlideProgress, onEnd: handleSlideEnd, pins: pins, ...props },\n        external_React_default().createElement(\"div\", { id: contentId, className: \"hero\", \"aria-label\": bgLabel, style: bgStylesFull },\n            external_React_default().createElement(\"div\", { className: \"inner-content\" },\n                bg && external_React_default().createElement(\"div\", { className: \"overlay\" }),\n                external_React_default().createElement(\"div\", { className: `text ${alignmentCss}` },\n                    external_React_default().createElement(\"div\", { className: \"wrapper\" },\n                        external_React_default().createElement(\"div\", { className: \"progress-indictor\" },\n                            external_React_default().createElement(\"div\", { className: \"progress-bar\", style: progressBarStyles })),\n                        external_React_default().createElement(\"p\", { className: `can-focus ${textFocusCss}`, onMouseDown: handleFocusText }, text))),\n                !bg && (external_React_default().createElement(\"div\", { role: \"img\", \"aria-label\": bgLabel, className: `img ${alignmentCss} can-focus ${bgFocusCss}`, onMouseDown: handleFocusBg, style: bgStylesHero }))))));\n};\n/* harmony default export */ const block_text = ({\n    BlockText,\n});\n\n;// CONCATENATED MODULE: ./src/block-text.schema.ts\nconst BlockTextSchema = {\n    meta: {\n        version: \"1.0.0\",\n        label: \"Text Block\",\n        component: \"BlockText\",\n        filename: \"block-text\",\n        tags: [\"text\", \"image\"],\n        icon: 'vertical_split',\n    },\n    content: {\n        text: {\n            type: 'Textbox',\n            label: 'Block Text',\n            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n            placeholder: 'Write content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        bgImage: {\n            type: 'Fieldset',\n            label: 'Background Image',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                url: {\n                    type: 'Asset',\n                    assetTypes: ['image'],\n                    label: 'Image',\n                },\n                bg: {\n                    type: 'Checkbox',\n                    label: 'Use as Background',\n                    value: false,\n                }\n            },\n        },\n        options: {\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        { name: 'Align Left', value: 'left', icon: 'align_horizontal_left' },\n                        { name: 'Align Right', value: 'right', icon: 'align_horizontal_right' },\n                    ],\n                    iconFromValue: true,\n                },\n                showProgress: {\n                    type: 'Checkbox',\n                    label: 'Show Progress Bar',\n                    value: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const block_text_schema = ({\n    BlockTextSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.BlockText = BlockText;\nwindow.BlockTextSchema = BlockTextSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-block-text/./web/index.ts_+_3_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__},294:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__294__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(737);return __webpack_exports__})()));