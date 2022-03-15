/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import React, { FC, useState } from "react";
import LongArrow from "../../icons/LongArrow";
import SearchPeople from "../../SearchPeople";
import UserItem from "../../UserItem";
import Shortcut from "../Shortcut";
import TimeOptions from "../TimeOptions";
import { ICommonGameSetup } from "../types";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Heading5 from "/client/app/shared/Typographies/Heading5";

interface IPlayWithFriendsProps extends ICommonGameSetup {}

const PlayWithFriends: FC<IPlayWithFriendsProps> = () => {
  const [opponents, setOpponents] = useState<number>(0);

  return (
    <div className="playWithFriends">
      <SearchPeople />

      <div className="playWithFriends__opponents">
        <ul className="playWithFriends__opponents-list">
          <li
            className={clsx(
              "playWithFriends__item pointer",
              opponents === 0 && "playWithFriends__item--active",
            )}
            onClick={() => setOpponents(0)}
          >
            <Heading5>Friends (210)</Heading5>
          </li>
          <li
            className={clsx(
              "playWithFriends__item pointer",
              opponents === 1 && "playWithFriends__item--active",
            )}
            onClick={() => setOpponents(1)}
          >
            <Heading5>Opponents (120)</Heading5>
          </li>
          <li
            className={clsx(
              "playWithFriends__item pointer",
              opponents === 2 && "playWithFriends__item--active",
            )}
            onClick={() => setOpponents(2)}
          >
            <Heading5>Near me (100)</Heading5>
          </li>
        </ul>
      </div>

      <div>
        <ul className="playWithFriends__userItemList">
          {new Array(4).fill(0).map((_, i) => (
            <li key={i} className="playWithFriends__userItem">
              <UserItem chessTitle="WGM" text="Username" flag="IT" size="sm" />
            </li>
          ))}
        </ul>
        <TextButton className="playWithFriends__showMore">
          Show more <LongArrow />
        </TextButton>
      </div>

      <TimeOptions
        onPickTime={() => {}}
        className="playWithFriends__timeOptions"
        subtitle="Launch a new challenge"
      />
      <Shortcut className="playWithFriends__card" />

      <StandardButton className="playWithFriends__btn" color="primary">
        Launch challenge
      </StandardButton>
      <StandardButton className="playWithFriends__btn">
        Challenge link
      </StandardButton>
    </div>
  );
};

export default PlayWithFriends;
