import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, HTMLAttributes, useState } from "react";
import { LongArrow } from "../../icons/LongArrow";
import { Piece } from "../../icons/Piece";
import { PieceBRandom } from "../../icons/PieceBRandom";
import { Card } from "../../Card";
import { Subtitle } from "../../Subtitle";
import "./index.scss";
import { PieceButton } from "/client/app/shared/Buttons/PieceButton";
import { TextButton } from "/client/app/shared/Buttons/TextButton";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { useTranslate } from "/client/app/hooks";

interface ColorPickProps extends HTMLAttributes<HTMLDivElement> {
  onColorPick: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export const ColorPick: FC<ColorPickProps> = ({
  className,
  onColorPick = noop,
}) => {
  const [color, setColor] = useState<PieceColor | "">("");
  const { t } = useTranslate();

  return (
    <Card className={clsx("colorPick", className)}>
      <Subtitle className="colorPick__subtitle">{t("color")}</Subtitle>
      <div className="colorPick__colors d-flex justify-center align-items-center">
        <PieceButton
          size="small"
          onClick={() => {
            onColorPick("color", "w");
            setColor("w");
          }}
          color={color === "w" ? "dark" : "regular"}
        >
          <Piece />
        </PieceButton>
        <PieceButton
          size="big"
          onClick={() => {
            onColorPick("color", "");
            setColor("");
          }}
          color={color === "" ? "dark" : "regular"}
        >
          <PieceBRandom />
        </PieceButton>
        <PieceButton
          size="small"
          onClick={() => {
            onColorPick("color", "b");
            setColor("b");
          }}
          color={color === "b" ? "dark" : "regular"}
        >
          <Piece />
        </PieceButton>
      </div>

      <TextButton className="colorPick__variants-btn">
        {t("variants")} <LongArrow />
      </TextButton>
    </Card>
  );
};
