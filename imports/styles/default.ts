import activeButton from "./activeButton";
import title from "./title";
import digitalClock from "./digitalClock";
import heading1 from "./heading1";
import heading2 from "./heading2";
import heading3 from "./heading3";
import heading4 from "./heading4";
import heading5 from "./heading5";
import heading6 from "./heading6";
import paragraph from "./paragraph";
import smallParagraph from "./smallParagraph";
import checkbox from "./checkbox";
import input from "./input";
import select from "./select";
import switchComponent from "./switch";
import textarea from "./textarea";
import playerInfo from "./playerInfo";
import movelist from "./movelist";
import scrollBar from "./scrollBar";
import regularButton from "./regularButton";
import smallButton from "./smallButton";

export default {
  themename: "default",
  x_id: "abcd",
  xisolation_group: "cty",

  styles: {
    system: {
      fontFamily: "Helvetica",
      boxSizing: "border-box",
    },

    button: {
      parent: "system",
      backgroundColor: "#55586A",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "16px",
      "&:disabled": {
        pointerPointer: "events",
        backgroundColor: "#55586A",
      },

      outline: 0,
      cursor: "pointer",
    },

    ...activeButton,
    ...title,
    ...heading1,
    ...heading2,
    ...heading3,
    ...heading4,
    ...heading5,
    ...heading6,
    ...paragraph,
    ...smallParagraph,
    ...checkbox,
    ...input,
    ...select,
    ...switchComponent,
    ...textarea,
    ...playerInfo,
    ...digitalClock,
    ...movelist,
    ...scrollBar,
    ...regularButton,
    ...smallButton,
  },
};
