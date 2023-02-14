// @ts-ignore
import { RUNTIME_SERVICE } from '../runtime.types';
// const TinCan = window['TinCan'];

// @ts-ignore
export const service = {
  API: null,
  // start: () => {
  //   if (TinCan) {
  //     let lrs;

  //     try {
  //       lrs = new TinCan.LRS({
  //         endpoint: 'https://cloud.scorm.com/lrs/P9AQQNBMYJ/sandbox/',
  //         username: 'sean@osg.ca',
  //         password: 'Ds3@M4qh7iY98cy',
  //         allowFail: false,
  //       });
  //     } catch (ex) {
  //       console.log('Failed to setup LRS object: ', ex);
  //       // TODO: do something with error, can't communicate with LRS
  //     }

  //     var statement = new TinCan.Statement({
  //       actor: {
  //         mbox: 'mailto:sean@osg.ca',
  //       },
  //       verb: {
  //         id: 'http://adlnet.gov/expapi/verbs/experienced',
  //       },
  //       target: {
  //         id: 'https://github.com/scrowl-io/authoring/',
  //       },
  //     });

  //     lrs.saveStatement(statement, {
  //       callback: function (err, xhr) {
  //         if (err !== null) {
  //           if (xhr !== null) {
  //             console.log(
  //               'Failed to save statement: ' +
  //                 xhr.responseText +
  //                 ' (' +
  //                 xhr.status +
  //                 ')'
  //             );
  //             // TODO: do something with error, didn't save statement
  //             return;
  //           }

  //           console.log('Failed to save statement: ' + err);
  //           // TODO: do something with error, didn't save statement
  //           return;
  //         }

  //         console.log('Statement saved');
  //         // TOOO: do something with success (possibly ignore)
  //       },
  //     });
  //   }
  // },
};

export default {
  service,
};
