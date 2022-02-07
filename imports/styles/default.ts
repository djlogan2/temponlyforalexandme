import digitalClock from "./digitalClock";
import paragraph from "./paragraph";
import checkbox from "./checkbox";
import input from "./input";
import select from "./select";
import textarea from "./textarea";
import playerInfo from "./playerInfo";
import movelist from "./movelist";
import scrollBar from "./scrollBar";

export default {
  themename: "default",
  x_id: "abcd",
  xisolation_group: "cty",

  styles: {
    system: {
      fontFamily: "Helvetica",
      boxSizing: "border-box",
    },

    ...paragraph,
    ...checkbox,
    ...input,
    ...select,
    ...textarea,
    ...playerInfo,
    ...digitalClock,
    ...movelist,
    ...scrollBar,
  },
};
