import React, { FC } from "react";
import Chat2 from "/client/app/components/icons/Chat2";
import ChessTitle from "/client/app/components/icons/ChessTitle";
import Avatar from "/client/app/shared/Avatar";
import Flag, { TFlags } from "/client/app/shared/Flag";
import Switch from "/client/app/shared/Switch";

interface IObserverItemProps {
  picture?: string;
  username: string;
  chessTitle: string;
  flag: TFlags;
  rating: number;
  className?: string;
}

const ObserverItem: FC<IObserverItemProps> = ({
  picture,
  username,
  chessTitle,
  flag,
  rating,
  className,
}) => (
  <tr className={className}>
    <td className="d-flex align-items-center">
      <Avatar
        picture={picture}
        size="xs"
        alt={`${username}'s pic`}
        status="offline"
      />
      <span>
        {username} ({rating})
      </span>
    </td>
    <td>
      <ChessTitle text={chessTitle} />
    </td>
    <td>
      <Flag flag={flag} />
    </td>
    <td>
      <Switch name="moves" onChange={() => {}} />
    </td>
    <td>
      <Chat2 className="pointer" />
    </td>
  </tr>
);

export default ObserverItem;
