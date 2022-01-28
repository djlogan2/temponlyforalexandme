import activeButton from "./activeButton";
import title from "./title";
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

export default {
  themename: "default",
  x_id: "abcd",
  xisolation_group: "cty",

  styles: {
    "@global": {
      "*": {
        fontSize: "100%",
        fontFamily: "inherit",
      },
      body: {
        fontFamily: "Helvetica",
      },
    },

    button: {
      parent: "system",
      backgroundColor: "#55586A",
      width: "52px",
      height: "52px",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "white",
      padding: "12px 16px",
      fontSize: "16px",
      "&:disabled": {
        backgroundColor: "#55586A",
      },
      outline: 0,
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
  },
};
