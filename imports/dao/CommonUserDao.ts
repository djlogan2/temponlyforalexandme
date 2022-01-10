import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import UserRecord from "/lib/records/UserRecord";

export default abstract class CommonUserDao extends ReactiveReadOnlyDao<UserRecord> {

}
