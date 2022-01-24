// noinspection JSUnusedLocalSymbols

import ActionButton from "/client/app/shared/Buttons/ActionButton";
import Heading1 from "/client/app/shared/Typographies/Heading1";
import Heading2 from "/client/app/shared/Typographies/Heading2";
import Heading3 from "/client/app/shared/Typographies/Heading3";
import Heading4 from "/client/app/shared/Typographies/Heading4";
import Heading5 from "/client/app/shared/Typographies/Heading5";
import Heading6 from "/client/app/shared/Typographies/Heading6";
import Paragraph from "/client/app/shared/Typographies/Paragraph";
import SmallParagraph from "/client/app/shared/Typographies/SmallParagraph";
import Title from "/client/app/shared/Typographies/Title";
import React, { FCICC } from "react";
// @ts-ignore
import i18n from "meteor/universe:i18n";
import PropTypes from "prop-types";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(themedao);

const App: FCICC<typeof defaulApptProps> = ({ onLayoutChange, ...rest }) => (
  <div>
    <ActionButton
      name="fakeButton"
      hoverText="1234"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <ActionButton
      name="fakeButton"
      hoverText="1234"
      token={{ token: "TEST_TOKEN", args: [] }}
      disabled
      keyboardFunctions={[]}
      classes={[]}
    />
    <Title
      name="test"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading1
      name="test1"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading2
      name="test2"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading3
      name="test3"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading4
      name="test4"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading5
      name="test5"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Heading6
      name="test6"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Paragraph
      name="testPar"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <Paragraph
      name="testParLink"
      link="https://www.google.com"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <SmallParagraph
      name="testSmallPar"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
    <SmallParagraph
      name="testSmallParLink"
      link="https://www.google.com"
      token={{ token: "TEST_TOKEN", args: [] }}
      keyboardFunctions={[]}
      classes={[]}
    />
  </div>
);

App.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
};

export default App;

export const defaulApptProps = {
  className: "layout",
  items: 1,
  rowHeight: 30,
  onLayoutChange() {},
  cols: 12,
};
