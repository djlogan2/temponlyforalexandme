import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading4Props {
  name: string;
  className?: string;
}

const Heading4: FCICC<Heading4Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return (
    <div id={name} className={classes.heading4} {...rest}>
      {translation}
    </div>
  );
};

export default Heading4;
