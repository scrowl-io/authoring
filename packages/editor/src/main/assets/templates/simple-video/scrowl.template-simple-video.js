!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var o="object"==typeof exports?n(require("React")):n(e.React);for(var t in o)("object"==typeof exports?exports:e)[t]=o[t]}}(self,(__WEBPACK_EXTERNAL_MODULE__24__=>(()=>{"use strict";var __webpack_modules__={141:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n;// CONCATENATED MODULE: ./src/simple-video.tsx\n\n\nconst Column = ({ field, className, heading, body, isEdit, focusElement }) => {\n    const Scrowl = window['Scrowl'];\n    const Markdown = Scrowl.core.Markdown;\n    let headingClasses = `can-focus`;\n    let bodyClasses = `can-focus`;\n    if (focusElement === `${field}.heading`) {\n        headingClasses += ' hasFocus';\n    }\n    if (focusElement === `${field}.body`) {\n        bodyClasses += ' hasFocus';\n    }\n    const handleFocusHeading = () => {\n        if (isEdit) {\n            Scrowl.core.host.sendMessage({\n                type: 'focus',\n                field: `${field}.heading`,\n            });\n        }\n    };\n    const handleFocusBody = () => {\n        if (isEdit) {\n            Scrowl.core.host.sendMessage({\n                type: 'focus',\n                field: `${field}.body`,\n            });\n        }\n    };\n    return (external_React_default().createElement(\"div\", { className: className },\n        external_React_default().createElement(\"h2\", { className: headingClasses, onMouseDown: handleFocusHeading }, heading.value),\n        external_React_default().createElement(\"div\", { className: bodyClasses, onMouseDown: handleFocusBody },\n            external_React_default().createElement(Markdown, null, body.value))));\n};\nconst SimpleVideo = ({ id, schema, ...props }) => {\n    const Scrowl = window['Scrowl'];\n    let classes = `template-two-columns`;\n    let columnClasses = 'column-wrapper';\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const contentId = `${id}-two-column`;\n    const options = schema.content.options;\n    const alignment = options.content.alignment.value;\n    const numberOfColumns = options.content.numberOfColumns.value;\n    const stackOnMobile = options.content.stackOnMobile.value;\n    const firstColumn = schema.content.firstColumn.content;\n    const secondColumn = schema.content.secondColumn.content;\n    const thirdColumn = schema.content.thirdColumn.content;\n    if (stackOnMobile) {\n        switch (numberOfColumns) {\n            case 3:\n                columnClasses += ' stacked-view-wide';\n                break;\n            case 2:\n                columnClasses += ' stacked-view-narrow';\n                break;\n            case 1:\n                columnClasses += ' stacked-view-single';\n                break;\n        }\n    }\n    if (alignment) {\n        columnClasses += ` ${alignment}`;\n    }\n    return (external_React_default().createElement(Scrowl.core.Template, { id: `slide-${contentId}`, className: classes, ...props },\n        external_React_default().createElement(\"div\", { id: contentId },\n            external_React_default().createElement(\"div\", { className: columnClasses },\n                external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column first-column\", field: \"firstColumn\", heading: firstColumn.heading, body: firstColumn.body }),\n                numberOfColumns >= 2 && (external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column second-column\", field: \"secondColumn\", heading: secondColumn.heading, body: secondColumn.body })),\n                numberOfColumns >= 3 && (external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column third-column\", field: \"thirdColumn\", heading: thirdColumn.heading, body: thirdColumn.body }))))));\n};\n/* harmony default export */ const simple_video = ({\n    SimpleVideo,\n});\n\n;// CONCATENATED MODULE: ./src/simple-video.schema.ts\nconst SimpleVideoSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Simple Video',\n        component: 'SimpleVideo',\n        filename: 'simple-video',\n        icon: 'view_week',\n        tags: ['text', 'columns'],\n    },\n    content: {\n        options: {\n            type: 'Fieldset',\n            label: 'Columns',\n            content: {\n                numberOfColumns: {\n                    type: 'Radio',\n                    label: 'Number of Columns',\n                    value: 2,\n                    options: [\n                        {\n                            label: 'One column',\n                            value: 1,\n                            icon: 'crop_portrait',\n                            controller: {\n                                fields: ['secondColumn', 'thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Two columns',\n                            value: 2,\n                            icon: 'view_column_2',\n                            controller: {\n                                fields: ['thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Three columns',\n                            value: 3,\n                            icon: 'view_week',\n                        },\n                    ],\n                },\n                stackOnMobile: {\n                    type: 'Checkbox',\n                    label: 'Stack On Mobile',\n                    value: true,\n                },\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        {\n                            name: 'Full Justify',\n                            value: 'justify',\n                            icon: 'align_horizontal_right',\n                        },\n                        {\n                            name: 'Align Left',\n                            value: 'left',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Center',\n                            value: 'center',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Right',\n                            value: 'right',\n                            icon: 'align_horizontal_right',\n                        },\n                    ],\n                    iconFromValue: true,\n                },\n            },\n        },\n        firstColumn: {\n            type: 'Fieldset',\n            label: 'First Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 1',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        secondColumn: {\n            type: 'Fieldset',\n            label: 'Second Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 2',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        thirdColumn: {\n            type: 'Fieldset',\n            label: 'Third Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 3',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const simple_video_schema = ({\n    SimpleVideoSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.SimpleVideo = SimpleVideo;\nwindow.SimpleVideoSchema = SimpleVideoSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-simple-video/./web/index.ts_+_3_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var o=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](o,o.exports,__webpack_require__),o.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var o in n)__webpack_require__.o(n,o)&&!__webpack_require__.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(141);return __webpack_exports__})()));