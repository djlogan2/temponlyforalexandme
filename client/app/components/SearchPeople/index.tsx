import React, { FC, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import TextButton from "../../shared/Buttons/TextButton";
import Input from "../../shared/Input";
import Card from "../Card";
import LongArrow from "../icons/LongArrow";
import Search from "../icons/Search";
import Subtitle from "../Subtitle";
import UserItem from "../UserItem";
import "./index.scss";

interface ISearchPeopleProps {
  subtitle?: string;
}

const SearchPeople: FC<ISearchPeopleProps> = ({ subtitle }) => {
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, () => {
    setIsSearching(false);
  });

  return (
    <div ref={searchRef} className="searchPeople">
      <Card className="searchPeople__card">
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Input
          label="User name or email"
          name="search"
          icon={<Search className="searchPeople__searchIcon" />}
          placeholder="Search friend"
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
            More results (4/57) <LongArrow />
          </TextButton>
        </div>
      )}
    </div>
  );
};

export default SearchPeople;
