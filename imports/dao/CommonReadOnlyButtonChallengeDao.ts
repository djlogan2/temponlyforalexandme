import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";
import Stoppable from "/lib/Stoppable";

export default abstract class CommonReadOnlyButtonChallengeDao extends ReactiveReadOnlyDao<OneChallengeButton> {
  protected constructor(parent: Stoppable | null) {
    super(parent, "challengebuttons");
  }
}
