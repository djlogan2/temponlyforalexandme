import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading6Props {
  name: string;
  className?: string;
}

const Heading6: FCICC<Heading6Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return (
    <div id={name} className={classes.heading6} {...rest}>
      {translation}
    </div>
  );
};

export default Heading6;
