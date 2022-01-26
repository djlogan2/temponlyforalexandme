// noinspection JSUnusedLocalSymbols

import DummyChessboard from "/client/app/components/DummyChessboard";
import ActionButton from "/client/app/shared/Buttons/ActionButton";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";
import Switch from "/client/app/shared/Switch";
import TextArea from "/client/app/shared/TextArea";
import Heading1 from "/client/app/shared/Typographies/Heading1";
import Heading2 from "/client/app/shared/Typographies/Heading2";
import Heading3 from "/client/app/shared/Typographies/Heading3";
import Heading4 from "/client/app/shared/Typographies/Heading4";
import Heading5 from "/client/app/shared/Typographies/Heading5";
import Heading6 from "/client/app/shared/Typographies/Heading6";
import Paragraph from "/client/app/shared/Typographies/Paragraph";
import SmallParagraph from "/client/app/shared/Typographies/SmallParagraph";
import Title from "/client/app/shared/Typographies/Title";
import React, { FCICC, useEffect, useState } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";
import { withDynamicStyles } from "./hocs/withDynamicStyles";
import { useAppDispatch } from "./store/hooks";
import { updateClasses } from "./store/features/theming";

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nClient = new Clienti18n(i18ndao);
const theme = new ClientTheme(themedao);

const App: FCICC = ({ classes, ...rest }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(classes).length) {
      dispatch(updateClasses(classes as unknown as { [key: string]: string }));
    }
  }, [classes]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <ActionButton
          name="fakeButton"
          hoverText="1234"
          token={{ token: "FAKE_BUTTON", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <ActionButton
          name="fakeButton"
          hoverText="1234"
          token={{ token: "FAKE_BUTTON", args: [] }}
          disabled
          keyboardFunctions={[]}
          classes={[]}
        />
        <Title
          name="test"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading1
          name="test1"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading2
          name="test2"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading3
          name="test3"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading4
          name="test4"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading5
          name="test5"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Heading6
          name="test6"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Paragraph
          name="testPar"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Paragraph
          name="testParLink"
          link="https://www.google.com"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <SmallParagraph
          name="testSmallPar"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <SmallParagraph
          name="testSmallParLink"
          link="https://www.google.com"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Input
          name="fakeInput1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Input
          error
          name="fakeInput2"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Input
          type="password"
          name="fakeInput3"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Switch
          name="fakeSwitch1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "",
            args: [],
          }}
        />
        <Checkbox
          name="fakeCheckbox1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "",
            args: [],
          }}
        />
        <Checkbox
          name="fakeCheckbox2"
          disabled
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "",
            args: [],
          }}
        />
        <TextArea
          name="fakeTextArea1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
          placeHolder={{
            token: "FAKE_PLACEHOLDER",
            args: [],
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "40%", height: "auto" }}>
          <DummyChessboard />
        </div>
      </div>
    </div>
  );
};

export default withDynamicStyles(App);
