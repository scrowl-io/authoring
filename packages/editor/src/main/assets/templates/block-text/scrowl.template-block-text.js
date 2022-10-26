(() => {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


var $1ddf21269028232f$exports = {};
$1ddf21269028232f$exports = React;



var $4ec8c5d9eadd7399$exports = {};
$4ec8c5d9eadd7399$exports = TemplateCore;


var $2f539565b93d5913$export$54b110d16de3c90c;
var $2f539565b93d5913$export$8d4e113e3fa90f6f;
var $2f539565b93d5913$export$124049a9e3d0d4c3;
var $2f539565b93d5913$export$29dd17c7f3c81c36;
var $2f539565b93d5913$export$463b44d9bf3628be;
var $2f539565b93d5913$export$79ffe56a765070d2;
var $2f539565b93d5913$export$6f093cfa640b7166;
var $2f539565b93d5913$export$cc74dcc53cfce4eb;
var $2f539565b93d5913$export$38e42c68cf43b5d4;
var $2f539565b93d5913$export$921c3ec339bfbc1;
var $2f539565b93d5913$export$193fbd3e21d00825;
var $2f539565b93d5913$export$931b053d8f8351cc;
var $2f539565b93d5913$export$664d2293e412f414;
var $2f539565b93d5913$export$aa9034f69379ef0b;
var $2f539565b93d5913$export$cd2ccad8fcc855a4;
var $2f539565b93d5913$export$ccb91def95c7253c;
var $2f539565b93d5913$export$1c89b7ce846c4ef6;
$2f539565b93d5913$export$54b110d16de3c90c = "template-block-text";
$2f539565b93d5913$export$8d4e113e3fa90f6f = "template-block-text";
$2f539565b93d5913$export$124049a9e3d0d4c3 = "hero";
$2f539565b93d5913$export$29dd17c7f3c81c36 = "overlay";
$2f539565b93d5913$export$463b44d9bf3628be = "img";
$2f539565b93d5913$export$79ffe56a765070d2 = "right";
$2f539565b93d5913$export$6f093cfa640b7166 = "text";
$2f539565b93d5913$export$cc74dcc53cfce4eb = "wrapper";
$2f539565b93d5913$export$38e42c68cf43b5d4 = "header";
$2f539565b93d5913$export$921c3ec339bfbc1 = "show-progress";
$2f539565b93d5913$export$193fbd3e21d00825 = "show-progress";
$2f539565b93d5913$export$931b053d8f8351cc = "edit-mode";
$2f539565b93d5913$export$664d2293e412f414 = "edit-mode";
$2f539565b93d5913$export$aa9034f69379ef0b = "can-focus";
$2f539565b93d5913$export$cd2ccad8fcc855a4 = "can-focus";
$2f539565b93d5913$export$ccb91def95c7253c = "has-focus";
$2f539565b93d5913$export$1c89b7ce846c4ef6 = "has-focus";


const $56ccc2c674a097c1$export$915888868d008d02 = ({ layout: layout , ...props })=>{
    let classes = `${$2f539565b93d5913$export$8d4e113e3fa90f6f} `;
    const editMode = props.editMode ? true : false;
    const focusElement = editMode ? props.focusElement : null;
    const scrollScenes = (0, (/*@__PURE__*/$parcel$interopDefault($1ddf21269028232f$exports))).useRef([]);
    const timeline = (0, (/*@__PURE__*/$parcel$interopDefault($1ddf21269028232f$exports))).useRef();
    let layoutText = layout.text.value;
    let useImageAsBG = layout.bgImage.fields.bg.value;
    let alignment = layout.options.fields.alignment.value;
    let showProgressBar = layout.options.fields.showProgress.value;
    const slideDuration = showProgressBar ? 1000 : 0;
    if (showProgressBar) classes += " show-progress";
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getId(id) {
        if (!id) return props.id;
        return props.id + "-" + id;
    }
    const handleScrollUpdate = (e)=>{
        if (e.stage === "body") timeline.current.seek(timeline.current.duration * e.stageProgress);
    };
    const handleStateChange = (e)=>{
        if (e.state === "visible") scrollScenes.current.map((scene)=>scene.enabled(true));
        else scrollScenes.current.map((scene)=>scene.enabled(false));
    };
    (0, (/*@__PURE__*/$parcel$interopDefault($1ddf21269028232f$exports))).useEffect(()=>{
        if (!showProgressBar) return ()=>{};
        scrollScenes.current.push(new $4ec8c5d9eadd7399$exports.scroll.Scene({
            triggerElement: "#" + getId(),
            duration: slideDuration,
            offset: 0,
            triggerHook: 0
        }).setPin("#" + getId("pinned-body"), {
            pushFollowers: false
        }).addTo(props.controller).enabled(false));
        timeline.current = $4ec8c5d9eadd7399$exports.anime.timeline({
            easing: "easeInOutQuad",
            autoplay: false
        });
        const currentTimeline = timeline.current;
        const target = {
            targets: "#" + getId("bar"),
            width: "100%",
            duration: slideDuration
        };
        currentTimeline.add(target);
        return ()=>{
            scrollScenes.current.forEach((scene)=>{
                scene.destroy(true);
                props.controller.removeScene(scene);
            });
            scrollScenes.current = [];
            currentTimeline.children.map((child)=>{
                child.remove(target);
                child.reset();
                currentTimeline.remove(child);
            });
            currentTimeline.reset();
        };
    }, [
        showProgressBar
    ]);
    return /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)($4ec8c5d9eadd7399$exports.Template, {
        ...props,
        className: classes,
        duration: slideDuration,
        onStateChange: handleStateChange,
        onScroll: handleScrollUpdate,
        ready: true,
        children: /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("div", {
            className: "slide-container",
            children: /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsxs)("div", {
                id: getId("pinned-body"),
                className: "hero",
                "aria-label": useImageAsBG ? layout["bgImage.alt"] : "",
                style: useImageAsBG && layout["bgImage.url"] ? {
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: 'url("./course/assets/' + layout["bgImage.url"] + '")'
                } : {},
                children: [
                    useImageAsBG ? /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("div", {
                        className: "overlay"
                    }) : null,
                    /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("div", {
                        className: "text " + (alignment === "right" ? " right" : ""),
                        children: /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsxs)("div", {
                            className: "wrapper",
                            children: [
                                /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("hr", {
                                    id: getId("bar"),
                                    style: {
                                        width: showProgressBar ? "0%" : "100%"
                                    }
                                }),
                                /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("p", {
                                    className: "can-focus " + (focusElement === "text" && " has-focus"),
                                    onMouseDown: ()=>{
                                        editMode;
                                    },
                                    children: /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)($4ec8c5d9eadd7399$exports.Markdown, {
                                        children: layoutText
                                    })
                                })
                            ]
                        })
                    }),
                    useImageAsBG ? null : /*#__PURE__*/ (0, $1ddf21269028232f$exports.jsx)("div", {
                        role: "img",
                        "aria-label": layout["hero_image.alt"],
                        className: "img " + (alignment === "right" ? " right" : "") + " can-focus " + (focusElement === "bgImage.url" && " has-focus"),
                        onMouseDown: ()=>{
                            editMode;
                        },
                        style: layout["bgImage.url"] ? {
                            backgroundImage: 'url("./course/assets/' + layout["bgImage.url"] + '")'
                        } : {}
                    })
                ]
            })
        })
    });
};
var $56ccc2c674a097c1$export$2e2bcd8739ae039 = {
    BlockText: $56ccc2c674a097c1$export$915888868d008d02
};



const $1f0c26410a741cb3$export$405109bb2858c366 = {
    text: {
        type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Textbox,
        hint: (0, $4ec8c5d9eadd7399$exports.MIGRATION_HINT).BodyText,
        label: "Block Text",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        placeholder: "Write content here...",
        multiLine: true,
        lines: 10,
        autoGrow: 10,
        allowLinebreaks: true
    },
    bgImage: {
        type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Fieldset,
        label: "Background Image",
        fields: {
            alt: {
                type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Textbox,
                label: "Alt Text",
                placeholder: "Image alt text"
            },
            url: {
                type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Asset,
                assetType: "image",
                label: "Image"
            },
            bg: {
                type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Checkbox,
                label: "Use as Background",
                value: false
            }
        }
    },
    options: {
        type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Fieldset,
        label: "Options",
        fields: {
            alignment: {
                type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Select,
                hint: (0, $4ec8c5d9eadd7399$exports.MIGRATION_HINT).BodyAlignment,
                label: "Alignment",
                value: "left",
                options: [
                    {
                        name: "Align Left",
                        value: "left",
                        icon: "align_horizontal_left"
                    },
                    {
                        name: "Align Right",
                        value: "right",
                        icon: "align_horizontal_right"
                    }, 
                ],
                pre: {
                    width: 26,
                    items: [
                        {
                            type: "icon",
                            name: "align_horizontal_left"
                        }, 
                    ]
                }
            },
            showProgress: {
                type: (0, $4ec8c5d9eadd7399$exports.LAYOUT_INPUT_TYPE).Checkbox,
                label: "Show Progress Bar",
                value: false
            }
        }
    }
};
var $1f0c26410a741cb3$export$2e2bcd8739ae039 = {
    BlockTextSchema: $1f0c26410a741cb3$export$405109bb2858c366
};




window.BlockText = (0, $56ccc2c674a097c1$export$915888868d008d02);
window.BlockTextSchema = (0, $1f0c26410a741cb3$export$405109bb2858c366);

})();
//# sourceMappingURL=scrowl.template-block-text.js.map
