import CommonReadOnlyChallengeDao from "/imports/dao/CommonReadOnlyChallengeDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import EventEmitter from "eventemitter3";
import Stoppable from "/lib/Stoppable";

export default class ServerReadOnlyChallengeDao extends CommonReadOnlyChallengeDao {
  private pEvents = new EventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified"
  >();

  protected onReady(): void {}

  protected get events(): BasicEventEmitter<
    "challengeadded" | "challengeremoved" | "challengemodified"
  > {
    return this.pEvents;
  }
}
