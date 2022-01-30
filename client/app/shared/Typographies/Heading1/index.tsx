import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading1Props {
  name: string;
  className?: string;
}

const Heading1: FCICC<Heading1Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return (
    <div id={name} className={classes.heading1} {...rest}>
      {translation}
    </div>
  );
};

export default Heading1;
