import React, { FC, useRef, useState } from "react";
import { useTranslate, useClickOutside } from "../../hooks";
import { TextButton } from "../../shared/Buttons/TextButton";
import { Input } from "../../shared/Input";
import { Card } from "../Card";
import { LongArrow } from "../icons/LongArrow";
import { Search } from "../icons/Search";
import { Subtitle } from "../Subtitle";
import { UserItem } from "../UserItem";
import "./index.scss";

type SearchPeopleProps = {
  subtitle?: string;
};

export const SearchPeople: FC<SearchPeopleProps> = ({ subtitle }) => {
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslate();

  useClickOutside(searchRef, () => {
    setIsSearching(false);
  });

  return (
    <div ref={searchRef} className="searchPeople">
      <Card className="searchPeople__card">
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Input
          label={t("userNameOrEmail")}
          name="search"
          icon={<Search className="searchPeople__searchIcon" />}
          placeholder={t("searchFriend")}
          onFocus={() => setIsSearching(true)}
        />
      </Card>
      {isSearching && (
        <div className="searchPeople__foundFriends">
          {new Array(4).fill(0).map((_, i) => (
            <UserItem
              onClick={() => setIsSearching(false)}
              className="searchPeople__foundFriend"
              key={i}
              text="Username Test"
              chessTitle="WGM"
              flag="FR"
              size="md"
              status="online"
            />
          ))}
          <TextButton className="searchPeople__textButton">
            {t("moreResults")} (4/57) <LongArrow />
          </TextButton>
        </div>
      )}
    </div>
  );
};
