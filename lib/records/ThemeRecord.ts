import dark from "/imports/themes/dark";

//
// OK, I'm starting to see what all is here, so let's do this :)
//
// I am not using enums, ever. They are barely supported by typescript, and they cause far more problems than they solve.
// If you want things like this, do this instead:
// type EThemesEnum = "LIGHT" | "DARK";
//
// With that said, ICC will create new themes at any time. Users may create new theme at any time. Themes may be
// defaulted by ICC, and may also be defaulted by a branding (i.e. isolation_group.)
// I am gathering that "LIGHT" and "DARK" are just two names. If they are, they just have to be regular strings.
// Some type of lookup will have to happen too in the services, like:
//
// OH, right, also as an another note, "site" branding and "game board" branding are also two different things!
// There may be more someday, but we have at least those two!
//
// type     name             userid     isolation_group
// "site"   "default"
// "site"   "colorblind"
// "site"   "dark"
//
// "site"   "default"                   "cty"
// "site"   "dark"                      "cty"
//
// "site"   "default"        "djlogan"
//
// Lastly, there is NO SUCH THING as dark styles
// While I am all for creating interfaces for the styles if it makes sense, you are going to have things more like this:
//
//
// "site"   "dark"                      "cty"
//        styles: {
//           "default.button": {outline: color: width: textfont: textfontsize:}
//           "danger.button": {color: } <-- overrides color in default.button
//           "menu.bar":
//           etc. etc. etc.
//        }
// The menu bar color will be X for light mode, Y for dark mode, Z for branding, etc. etc. etc.
// I'm also stil of the opinion it should be two collections because I don't think we want the entire set of ALL
// style data being sent to the client! Why send 5000 styles when it needs 50?
// I think maybe we should consider:
// Theme
//  _id: type: site: userid:
// ThemeData
// _id: themeid: stylename: styledata:
//
// So it might look something like:
// themeid: "abcd" stylename: "default.button.color" styledata: "white"
// themeid: "efgh" stylename: "default.button.color" styledata: "red"
// And these are what get published, IF we even publish!
//
// I am thinking that theme data will rarely, if ever, change. So I'm thinking that we don't even need a publication.
// On the server, for example, we might have:
// class DefaultButtom extends React.Component {
//     constructor() {
//          this.buttoncolor = globalThis.ICCServer.utilities.getTheme("default.button.color");
//     }
// }
//
// and of course that would look something like:
//    getTheme(name: string) {
//      if(!globalThis.themedata[name])
//           globalthis.themedata[name] = Meteor.call("getThemeData", name);
//      return globalThis.themdata[name];
//    }
//
//  and lastly, since again, since theme data should virtually never change, the top of the tree would have something like:
//  class GodMasterOfAll extends React.Compoment {
//      componentDidMount() { /* or wherever appropriate */
//         window.user.events.on('themechanged', () => rerendertheentirepage());
//      }
//  }

export enum EThemesEnum {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export default interface ThemeRecord {
  id?: string;
  theme: {
    type: EThemesEnum.DARK | EThemesEnum.LIGHT;
    styles: typeof dark.styles;
  };
}
