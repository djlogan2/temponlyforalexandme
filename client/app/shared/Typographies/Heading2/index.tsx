import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading2Props {
  name: string;
  className?: string;
}

const Heading2: FCICC<Heading2Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return (
    <div id={name} className={classes.heading2} {...rest}>
      {translation}
    </div>
  );
};

export default Heading2;
