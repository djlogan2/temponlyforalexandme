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
import React, { FC, useEffect, useState } from "react";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import light from "/imports/themes/light";

const App: FC<typeof defaulApptProps> = ({ onLayoutChange, ...rest }) => {
  // should be one global place where we store
  // and just distribute it all over the app
  // via context or something else
  const [styles, setStyles] = useState<typeof light.styles>();
  const [translate, updateTranslate] = useState<Object>();
  useEffect(() => {
    globalThis.icc.connection.subscribeToThemes((data) => {
      setStyles(data.theme.styles || {});
    });

    globalThis.icc.connection.subscribeToI18n((data) => {
      updateTranslate(data.translations || {});
    });
  }, []);

  console.log(translate);

  return (
    <div>
      <ActionButton name="fakeButton" hoverText="1234">
        123
      </ActionButton>
      <ActionButton name="fakeButton" hoverText="1234" disabled>
        123
      </ActionButton>
      <Title name="test">Big title</Title>
      <Heading1 name="test1">Heading 1</Heading1>
      <Heading2 name="test2">Heading 2</Heading2>
      <Heading3 name="test3">Heading 3</Heading3>
      <Heading4 name="test4">Heading 4</Heading4>
      <Heading5 name="test5">Heading 5</Heading5>
      <Heading6 name="test6">Heading 6</Heading6>
      <Paragraph name="testPar">Paragraph</Paragraph>
      <Paragraph name="testParLink" link="https://www.google.com">
        Paragraph with link
      </Paragraph>
      <SmallParagraph name="testSmallPar">Small paragraph</SmallParagraph>
      <SmallParagraph name="testSmallParLink" link="https://www.google.com">
        Small paragraph with link
      </SmallParagraph>
    </div>
  );
};

export default App;

export const defaulApptProps = {
  className: "layout",
  items: 1,
  rowHeight: 30,
  onLayoutChange() {},
  cols: 12,
};
