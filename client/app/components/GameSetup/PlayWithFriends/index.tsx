/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import React, { FC, useRef, useState } from "react";
import LongArrow from "../../icons/LongArrow";
import Search from "../../icons/Search";
import UserItem from "../../UserItem";
import Card from "../Card";
import Shortcut from "../Shortcut";
import TimeOptions from "../TimeOptions";
import { EComponents } from "../types";
import useOnClickOutside from "/client/app/hooks/useClickOutside";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Input from "/client/app/shared/Input";
import Heading5 from "/client/app/shared/Typographies/Heading5";

interface IPlayWithFriendsProps {
  navigate: (tab: EComponents) => void;
}

const PlayWithFriends: FC<IPlayWithFriendsProps> = () => {
  const [opponents, setOpponents] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, () => {
    setIsSearching(false);
  });

  return (
    <div className="playWithFriends">
      <div ref={searchRef}>
        <Card className="playWithFriends__card">
          <Input
            label="User name or email"
            name="search"
            icon={<Search className="playWithFriends__searchIcon" />}
            placeholder="Search friend"
            onFocus={() => setIsSearching(true)}
          />
        </Card>
        {isSearching && (
          <div className="playWithFriends__foundFriends">
            {new Array(4).fill(0).map((_, i) => (
              <UserItem
                onClick={() => setIsSearching(false)}
                className="playWithFriends__foundFriend"
                key={i}
                text="Username Test"
                chessTitle="WGM"
                flag="FR"
                size="md"
                status="online"
              />
            ))}
            <TextButton className="playWithFriends__textButton">
              More results (4/57) <LongArrow />
            </TextButton>
          </div>
        )}
      </div>

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

      <TimeOptions className="playWithFriends__timeOptions" />
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
