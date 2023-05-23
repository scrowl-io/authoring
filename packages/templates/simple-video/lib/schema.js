function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $09b0d362747aed2e$exports = {};


var $670ec1178fdfe965$exports = {};

$parcel$defineInteropFlag($670ec1178fdfe965$exports);

$parcel$export($670ec1178fdfe965$exports, "SimpleVideoSchema", () => $670ec1178fdfe965$export$6c89ab77d30923e4);
$parcel$export($670ec1178fdfe965$exports, "default", () => $670ec1178fdfe965$export$2e2bcd8739ae039);
const $670ec1178fdfe965$export$6c89ab77d30923e4 = {
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
var $670ec1178fdfe965$export$2e2bcd8739ae039 = {
    SimpleVideoSchema: $670ec1178fdfe965$export$6c89ab77d30923e4
};


$parcel$exportWildcard(module.exports, $09b0d362747aed2e$exports);
$parcel$exportWildcard(module.exports, $670ec1178fdfe965$exports);


//# sourceMappingURL=schema.js.map
