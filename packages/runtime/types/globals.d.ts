import { SCORM_API, RUNTIME_SERVICE } from "../src/runtime.types";

declare global {
  interface Window {
    API: SCORM_API;
    Scrowl: {
      runtime: RUNTIME_SERVICE;
    };
  };
};
