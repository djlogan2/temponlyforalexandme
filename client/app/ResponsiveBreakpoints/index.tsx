import React, { FC } from "react";
import "./index.scss";
import BlockComponent from '/client/app/ResponsiveBreakpoints/children/BlockComponent';
import TextComponent from '/client/app/ResponsiveBreakpoints/children/TextComponent';
import ContentComponent from '/client/app/ResponsiveBreakpoints/children/ContentComponent';

interface IResponsiveBreakpoints {}

const ResponsiveBreakpoints: FC<IResponsiveBreakpoints> = () => {
  return <div className="layout">
    <ContentComponent className="block">Slider, image and videos galery row, call to actions.</ContentComponent>
    <TextComponent className="block">Texts, titles, header, etc.</TextComponent>
    <BlockComponent className="block"> Blocks, carrusels, etc.</BlockComponent>
  </div>;
}

export default ResponsiveBreakpoints;