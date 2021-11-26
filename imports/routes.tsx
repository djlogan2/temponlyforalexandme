import * as React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from './ui/app/App';
import Home from './ui/app/pages/Home/Home';
import SignUp from './ui/app/pages/SignUp/SignUp';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(App, {
      content: <Home />,
    });
  },
});

FlowRouter.route('/sign-up', {
  name: 'Sign Up',
  action() {
    mount(App, {
      content: <SignUp />,
    });
  },
});
