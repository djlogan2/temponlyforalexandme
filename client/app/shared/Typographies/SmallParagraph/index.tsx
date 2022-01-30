import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface SmallParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const SmallParagraph: FCICC<SmallParagraphProps> = ({
  name,
  token,
  link,
  ...rest
}) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return link ? (
    <a id={name} className={classes.smallParagraphLink} href={link}>
      {translation}
    </a>
  ) : (
    <div id={name} className={classes.smallParagraph} {...rest}>
      {translation}
    </div>
  );
};

export default SmallParagraph;
