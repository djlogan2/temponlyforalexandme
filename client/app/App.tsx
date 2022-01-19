// noinspection JSUnusedLocalSymbols

import _ from "lodash";
import React, { FC, useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import Widget from "./components/Widget";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import Clienti18n from "/lib/client/Clienti18n";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientTheme from "/lib/client/ClientTheme";

const ReactGridLayout = WidthProvider(RGL);

const subscriptionservice = new SubscriptionService(null);

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const themedao = new ThemeReadOnlyDao(null, subscriptionservice);

const i18nguy = new Clienti18n(i18ndao);
const theme = new ClientTheme(themedao);

const sizes = {
  small: {
    w: 2,
    h: 2,
  },
  medium: {
    w: 4,
    h: 4,
  },
  large: {
    w: 6,
    h: 6,
  },
};

const App: FC<typeof defaulApptProps> = ({ onLayoutChange, ...rest }) => {
  // should be one global place where we store
  // and just distribute it all over the app
  // via context or something else
  // const [styles, setStyles] = useState<typeof light.styles>();
  // const [translate, updateTranslate] = useState<Object>();
  useEffect(() => {
    // globalThis.icc.connection.subscribeToThemes((data) => {
    //   setStyles(data.theme.styles || {});
    // });
    //
    // globalThis.icc.connection.subscribeToI18n((data) => {
    //   updateTranslate(data.translations || {});
    // });
  }, []);

  // console.log(translate);

  const generateLayout = () =>
    _.map(new Array(rest.items), function (_item, i) {
      const y: any = _.result(rest, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        minW: sizes.small.w,
        maxW: sizes.large.w,
        minH: sizes.small.h,
        maxH: sizes.large.h,
      };
    });

  const [layout] = useState(generateLayout());

  return (
    <>
      {/* {(Object.keys(EThemesEnum) as EThemesEnum[]).map((theme) => ( */}
      {/*  <button */}
      {/*    key={theme} */}
      {/*    type="button" */}
      {/*    style={{ */}
      {/*      cursor: "pointer", */}
      {/*      padding: "5px", */}
      {/*    }} */}
      {/*    onClick={() => { */}
      {/*      globalThis.icc.connection.changeTheme(theme); */}
      {/*    }} */}
      {/*    onKeyUp={() => {}} */}
      {/*  > */}
      {/*    {theme} */}
      {/*  </button> */}
      {/* ))} */}

      <ReactGridLayout
        {...rest}
        layout={layout}
        onLayoutChange={onLayoutChange}
        useCSSTransforms
        allowOverlap
        preventCollision
        // style={styles?.App}
      >
        {layout.map((options) => (
          <div key={options.i}>
            <Widget sizes={sizes} {...options} />
          </div>
        ))}
      </ReactGridLayout>
    </>
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
