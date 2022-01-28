import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading3Props {
  name: string;
  className?: string;
}

const Heading3: FCICC<Heading3Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.heading3} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading3;
