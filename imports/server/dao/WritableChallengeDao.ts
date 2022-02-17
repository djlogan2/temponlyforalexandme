import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { UserChallengeRecord } from "/lib/records/ChallengeRecord";

export default class WritableChallengeDao extends ReadWriteDao<UserChallengeRecord> {}
