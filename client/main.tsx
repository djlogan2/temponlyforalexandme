import './iccserver';
import '../imports/client/clientlogger';
import '../imports/client/clientdirectmessage';
import '../imports/client/clienttimetamp';
import '../imports/routes';
import { render } from 'react-dom';
import * as React from 'react';
import App from '../imports/ui/app/App';

// window.onerror = function myErrorHandler(
//     message: Event | string,
//     source: string | undefined,
//     lineno: number | undefined,
//     colno: number | undefined,
//     error: Error | undefined
// ): boolean {
//     console.log("DO ME");
//     return false;
// };

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
