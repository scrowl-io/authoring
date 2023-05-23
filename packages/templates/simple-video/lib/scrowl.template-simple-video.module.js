function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $74e6473c8eb4617e$exports = {};


var $4960b871548bfe62$exports = {};

$parcel$defineInteropFlag($4960b871548bfe62$exports);

$parcel$export($4960b871548bfe62$exports, "SimpleVideoSchema", () => $4960b871548bfe62$export$6c89ab77d30923e4);
$parcel$export($4960b871548bfe62$exports, "default", () => $4960b871548bfe62$export$2e2bcd8739ae039);
const $4960b871548bfe62$export$6c89ab77d30923e4 = {
    meta: {
        version: "1.0.0",
        label: "Simple Video",
        component: "SimpleVideo",
        filename: "simple-video",
        icon: "view_week",
        tags: [
            "text",
            "video"
        ]
    },
    content: {
        text: {
            type: "Textbox",
            label: "Video Text",
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            placeholder: "Write content here...",
            multiLine: true,
            lines: 10,
            autoGrow: 10,
            allowLinebreaks: true
        },
        videoAsset: {
            type: "Fieldset",
            label: "Video",
            content: {
                alt: {
                    type: "Textbox",
                    label: "Alt Text",
                    placeholder: "Image alt text"
                },
                assetUrl: {
                    type: "Asset",
                    assetTypes: [
                        "video"
                    ],
                    label: "Video"
                },
                webUrl: {
                    type: "Textbox",
                    label: "Embed URL",
                    placeholder: "Embed URL"
                }
            }
        },
        options: {
            // @ts-ignore
            type: "Fieldset",
            label: "Options",
            content: {
                alignment: {
                    type: "Select",
                    hint: "BodyAlignment",
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
                    iconFromValue: true
                },
                showProgress: {
                    type: "Checkbox",
                    label: "Show Progress Bar",
                    value: true
                }
            }
        }
    },
    controlOptions: {
        stopUserAdvancement: {
            type: "Checkbox",
            label: "Stop User Advancement",
            value: false
        },
        disableAnimations: {
            type: "Checkbox",
            label: "Disable Animations",
            value: true
        }
    }
};
var $4960b871548bfe62$export$2e2bcd8739ae039 = {
    SimpleVideoSchema: $4960b871548bfe62$export$6c89ab77d30923e4
};




export {$4960b871548bfe62$export$6c89ab77d30923e4 as SimpleVideoSchema};
//# sourceMappingURL=scrowl.template-simple-video.module.js.map
