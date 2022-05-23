import React, { FC, useState } from "react";

import { useTranslate } from "/client/app/hooks";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

import Card from "../../Card";
import Subtitle from "../../Subtitle";
import { Components, CommonGameSetup } from "../types";
import { onPickTimeMock } from "../mocks";
import ColorPick from "../ColorPick";
import RatedGame from "../RatedGame";
import Shortcut from "../Shortcut";
import TimeOptions from "../TimeOptions";

type CustomChallengeProps = CommonGameSetup;

const CustomChallenge: FC<CustomChallengeProps> = ({ navigate }) => {
  const { t } = useTranslate();

  const [valid, setValid] = useState(true);
  const [unlimited, setUnlimited] = useState(false);

  return (
    <div className="customChallenge">
      <TimeOptions
        onPickTime={onPickTimeMock}
        className="customChallenge__card"
        subtitle={t("launchNewChallenge")}
        onValidChange={setValid}
        onUnlimitedChange={setUnlimited}
      />
      <RatedGame className="customChallenge__card" />
      <Card className="customChallenge__card">
        <Subtitle>{t("ratingRange")}</Subtitle>

        <div className="customChallenge__ratings d-flex space-between">
          <span className="customChallenge__decrease customChallenge__rating">
            1000{" "}
            <button type="button" className="customChallenge__btnRating">
              -
            </button>
          </span>
          <span className="customChallenge__middle customChallenge__rating">
            1200{" "}
          </span>
          <span className="customChallenge__increase customChallenge__rating">
            1400{" "}
            <button type="button" className="customChallenge__btnRating">
              +
            </button>
          </span>
        </div>
      </Card>

      <ColorPick onColorPick={() => {}} className="customChallenge__card" />

      <Shortcut className="customChallenge__card " />

      <div className="customChallenge__actions">
        <StandardButton
          color="primary"
          height="small"
          onClick={() => navigate(Components.CHALLENGE)}
          disabled={!valid || unlimited}
        >
          {t("launchChallenge")}
        </StandardButton>
        <StandardButton
          color="regular"
          height="small"
          onClick={() => navigate(Components.SHARE)}
        >
          {t("shareChallenge")}
        </StandardButton>
      </div>
    </div>
  );
};

export default CustomChallenge;
