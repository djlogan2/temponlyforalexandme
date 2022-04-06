import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import Stoppable from "/lib/Stoppable";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";
import { check, Match } from "meteor/check";
import { Meteor } from "meteor/meteor";
import ChallengeService from "/imports/server/service/ChallengeService";

interface AddChallengeClientObject extends ClientCallObject {
  clocks: ClockSettings;
  rated: boolean;
  color?: PieceColor;
  who?: string[];
  opponentclocks?: ClockSettings;
}

export default class AddChallengeClientMethod extends AbstractClientMethod {
  private challengeservice: ChallengeService;

  constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
    challengeservice: ChallengeService,
  ) {
    super(
      parent,
      "addchallenge",
      ["clocks", "rated", "color", "who", "opponentclocks"],
      [],
      connectionservice,
    );
    this.challengeservice = challengeservice;
  }

  protected validatearguments(obj: AddChallengeClientObject): void {
    function checkclock(clock: any): void {
      check(obj.clocks, Object);
      check(obj.clocks.minutes, Number);
      if (clock.adjust) {
        check(clock.adjust.incseconds, Number);
        if (["inc", "us", "bronstein"].indexOf(clock.adjust.type) === -1)
          throw new Meteor.Error("INVALID_TYPE");
      }
    }

    check(obj, Object);
    check(obj.rated, Boolean);
    checkclock(obj.clocks);
    check(obj.who, Match.Maybe([String]));

    if (obj.opponentclocks) checkclock(obj.opponentclocks);
    if (obj.color && obj.color !== "w" && obj.color !== "b")
      throw new Meteor.Error("INVALID_COLOR");
  }

  protected called(obj: AddChallengeClientObject): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (!obj.connection) {
        reject(new Meteor.Error("UNABLE_TO_FIND_CONNECTION"));
        return;
      }
      this.challengeservice.addChallenge(
        obj.connection,
        obj.rated,
        obj.clocks,
        obj.color,
        obj.who,
        obj.opponentclocks,
      );
    });
  }

  protected stopping(): void {
    throw new Error("Method not implemented.");
  }
}
