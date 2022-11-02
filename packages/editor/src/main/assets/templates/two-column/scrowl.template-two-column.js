!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"),require("@scrowl/template-core"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var t="object"==typeof exports?n(require("React"),require("@scrowl/template-core")):n(e.React,e.Scrowl);for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(self,((__WEBPACK_EXTERNAL_MODULE__24__,__WEBPACK_EXTERNAL_MODULE__294__)=>(()=>{"use strict";var __webpack_modules__={911:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n// EXTERNAL MODULE: external {\"root\":\"Scrowl\",\"commonjs\":\"@scrowl/template-core\",\"commonjs2\":\"@scrowl/template-core\"}\nvar template_core_ = __webpack_require__(294);\nvar template_core_default = /*#__PURE__*/__webpack_require__.n(template_core_);\n;// CONCATENATED MODULE: ./src/_index.scss\n// extracted by mini-css-extract-plugin\nvar canFocus = \"can-focus\";\nvar columnWrapper = \"column-wrapper\";\nvar editMode = \"edit-mode\";\nvar firstColumn = \"first-column\";\nvar hasFocus = \"has-focus\";\nvar header = \"header\";\nvar hero = \"hero\";\nvar img = \"img\";\nvar overlay = \"overlay\";\nvar right = \"right\";\nvar secondColumn = \"second-column\";\nvar showProgress = \"show-progress\";\nvar stackedViewNarrow = \"stacked-view-narrow\";\nvar stackedViewSingle = \"stacked-view-single\";\nvar stackedViewWide = \"stacked-view-wide\";\nvar templateBlockText = \"template-block-text\";\nvar _index_text = \"text\";\nvar thirdColumn = \"third-column\";\nvar wrapper = \"wrapper\";\n;// CONCATENATED MODULE: ./src/two-column.tsx\n\n\n\nconst TwoColumn = ({ schema, ...props }) => {\n    let classes = `${templateBlockText} `;\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const scrollScenes = external_React_default().useRef([]);\n    const timeline = external_React_default().useRef();\n    let firstColumnText = schema.content.firstColumnText.value;\n    let secondColumnText = schema.content.secondColumnText?.value;\n    let thirdColumnText = schema.content.thirdColumnText?.value;\n    let firstColumnHeading = schema.content.firstColumnHeading?.value;\n    let secondColumnHeading = schema.content.secondColumnHeading?.value;\n    let thirdColumnHeading = schema.content.thirdColumnHeading?.value;\n    let numberOfColumns = schema.content.options.content.numberOfColumns.value;\n    let stackOnMobile = schema.content.options.content.stackOnMobile.value;\n    let useImageAsBG = schema.content.bgImage?.content.bg.value;\n    let alignment = schema.content.options.content.alignment?.value;\n    let showProgressBar = schema.content.options.content.showProgress.value;\n    const slideDuration = showProgressBar ? 1000 : 0;\n    if (showProgressBar) {\n        classes += ' show-progress';\n    }\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    function getId(id) {\n        if (!id) {\n            return props.id;\n        }\n        return props.id + '-' + id;\n    }\n    // const handleScrollUpdate = (e: any) => {\n    //   if (e.stage === 'body') {\n    //     timeline.current.seek(timeline.current.duration * e.stageProgress);\n    //   }\n    // };\n    const handleStateChange = (e) => {\n        if (e.state === 'visible') {\n            scrollScenes.current.map((scene) => scene.enabled(true));\n        }\n        else {\n            scrollScenes.current.map((scene) => scene.enabled(false));\n        }\n    };\n    external_React_default().useEffect(() => {\n        if (!showProgressBar) {\n            return () => { };\n        }\n        scrollScenes.current.push(new (template_core_default()).core.scroll.Scene({\n            triggerElement: '#' + getId(),\n            duration: slideDuration,\n            offset: 0,\n            triggerHook: 0,\n        })\n            .setPin('#' + getId('pinned-body'), { pushFollowers: false })\n            .addTo(props.controller)\n            .enabled(false));\n        timeline.current = template_core_default().core.anime.timeline({\n            easing: 'easeInOutQuad',\n            autoplay: false,\n        });\n        const currentTimeline = timeline.current;\n        const target = {\n            targets: '#' + getId('bar'),\n            width: '100%',\n            duration: slideDuration,\n        };\n        currentTimeline.add(target);\n        return () => {\n            scrollScenes.current.forEach((scene) => {\n                scene.destroy(true);\n                props.controller.removeScene(scene);\n            });\n            scrollScenes.current = [];\n            currentTimeline.children.map((child) => {\n                child.remove(target);\n                child.reset();\n                currentTimeline.remove(child);\n            });\n            currentTimeline.reset();\n        };\n    }, [showProgressBar]);\n    const renderColumns = () => {\n        return (external_React_default().createElement(\"div\", { className: `column-wrapper ${stackOnMobile && numberOfColumns === 3\n                ? 'stacked-view-wide'\n                : stackOnMobile && numberOfColumns === 2\n                    ? 'stacked-view-narrow'\n                    : stackOnMobile && numberOfColumns === 1\n                        ? 'stacked-view-single'\n                        : ''}` },\n            external_React_default().createElement(\"div\", { className: \"first-column\" },\n                external_React_default().createElement(\"h2\", null, firstColumnHeading),\n                external_React_default().createElement(\"p\", { className: 'can-focus ' + (focusElement === 'text' && ' has-focus'), onMouseDown: () => {\n                        if (editMode) {\n                            // Scrowl.focusOnlayout('text');\n                        }\n                    } },\n                    external_React_default().createElement((template_core_default()).core.Markdown, { children: firstColumnText }))),\n            numberOfColumns && numberOfColumns < 2 ? null : (external_React_default().createElement(\"div\", { className: \"second-column\" },\n                external_React_default().createElement(\"h2\", null, secondColumnHeading),\n                external_React_default().createElement(\"p\", { className: 'can-focus ' + (focusElement === 'text' && ' has-focus'), onMouseDown: () => {\n                        if (editMode) {\n                            // Scrowl.focusOnlayout('text');\n                        }\n                    } },\n                    external_React_default().createElement((template_core_default()).core.Markdown, { children: secondColumnText })))),\n            numberOfColumns && numberOfColumns < 3 ? null : (external_React_default().createElement(\"div\", { className: \"third-column\" },\n                external_React_default().createElement(\"h2\", null, thirdColumnHeading),\n                external_React_default().createElement(\"p\", { className: 'can-focus ' + (focusElement === 'text' && ' has-focus'), onMouseDown: () => {\n                        if (editMode) {\n                            // Scrowl.focusOnlayout('text');\n                        }\n                    } },\n                    external_React_default().createElement((template_core_default()).core.Markdown, { children: thirdColumnText }))))));\n    };\n    return (external_React_default().createElement((template_core_default()).core.Template, { ...props, className: classes, duration: slideDuration, onStateChange: handleStateChange, \n        // onScroll={handleScrollUpdate}\n        ready: true },\n        external_React_default().createElement(\"div\", { className: \"slide-container\" },\n            external_React_default().createElement(\"div\", { id: getId('pinned-body'), className: \"hero\", \"aria-label\": useImageAsBG ? schema['bgImage.alt'] : '', style: useImageAsBG && schema['bgImage.url']\n                    ? {\n                        width: '100vw',\n                        height: '100vh',\n                        backgroundImage: 'url(\"./course/assets/' + schema['bgImage.url'] + '\")',\n                    }\n                    : {} },\n                useImageAsBG ? external_React_default().createElement(\"div\", { className: \"overlay\" }) : null,\n                external_React_default().createElement(\"div\", { className: 'text ' + (alignment === 'right' ? ' right' : '') },\n                    external_React_default().createElement(\"div\", { className: \"wrapper\" }, renderColumns())),\n                useImageAsBG ? null : (external_React_default().createElement(\"div\", { role: \"img\", \"aria-label\": schema['hero_image.alt'], className: 'img ' +\n                        (alignment === 'right' ? ' right' : '') +\n                        ' can-focus ' +\n                        (focusElement === 'bgImage.url' && ' has-focus'), onMouseDown: () => {\n                        if (editMode) {\n                            // Scrowl.focusOnlayout('bgImage.url');\n                        }\n                    }, style: schema['bgImage.url']\n                        ? {\n                            backgroundImage: 'url(\"./course/assets/' + schema['bgImage.url'] + '\")',\n                        }\n                        : {} }))))));\n};\n/* harmony default export */ const two_column = ({\n    TwoColumn,\n});\n\n;// CONCATENATED MODULE: ./src/two-column.schema.ts\nconst TwoColumnSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Two Column',\n        component: 'TwoColumn',\n        filename: 'two-column',\n    },\n    content: {\n        options: {\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                showProgress: {\n                    type: 'Checkbox',\n                    label: 'Show Progress Bar',\n                    value: false,\n                },\n                numberOfColumns: {\n                    type: 'Radio',\n                    label: 'Number of Columns',\n                    value: 3,\n                    options: [\n                        {\n                            label: '1',\n                            value: 1,\n                            icon: 'number_of_columns_1',\n                            inputControls: ['1', '2'],\n                        },\n                        {\n                            label: '2',\n                            value: 2,\n                            icon: 'number_of_columns_2',\n                            inputControls: ['2'],\n                        },\n                        {\n                            label: '3',\n                            value: 3,\n                            icon: 'number_of_columns_3',\n                            inputControls: [''],\n                        },\n                    ],\n                },\n                stackOnMobile: {\n                    type: 'Checkbox',\n                    label: 'Stack On Mobile',\n                    value: true,\n                },\n            },\n        },\n        firstColumnHeading: {\n            type: 'Textbox',\n            label: 'First Column Heading',\n            value: 'First',\n            placeholder: 'First ',\n            multiLine: true,\n            lines: 5,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        firstColumnText: {\n            type: 'Textbox',\n            label: 'First Column Text',\n            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n            placeholder: 'Write text content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        secondColumnHeading: {\n            type: 'Textbox',\n            label: 'Second Column Heading',\n            value: 'Second',\n            placeholder: 'Second',\n            multiLine: true,\n            lines: 5,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        secondColumnText: {\n            type: 'Textbox',\n            label: 'Second Column Text',\n            value: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',\n            placeholder: 'Write text content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        thirdColumnHeading: {\n            type: 'Textbox',\n            label: 'Third Column Heading',\n            value: 'Third',\n            placeholder: 'Third',\n            multiLine: true,\n            lines: 5,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        thirdColumnText: {\n            type: 'Textbox',\n            label: 'Third Column Text',\n            value: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Ut tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',\n            placeholder: 'Write text content here...',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        bgImage: {\n            type: 'Fieldset',\n            label: 'Background Image',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                url: {\n                    type: 'Asset',\n                    assetType: 'image',\n                    label: 'Image',\n                },\n                bg: {\n                    type: 'Checkbox',\n                    label: 'Use as Background',\n                    value: false,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const two_column_schema = ({\n    TwoColumnSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.TwoColumn = TwoColumn;\nwindow.TwoColumnSchema = TwoColumnSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-two-column/./web/index.ts_+_4_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__},294:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__294__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(911);return __webpack_exports__})()));