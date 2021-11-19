import SimpleSchema from 'simpl-schema';

export interface ConnectionRecord {
    _id: string;
    connection_id: string;
    instance_id: string;
    create_date: Date;
    user_id?: string;
    username?: string;
}

export const ConnectionRecordSchema = new SimpleSchema({
  connection_id: String,
  instance_id: String,
  create_date: Date,
  user_id: { type: String, optional: true },
  username: { type: String, optional: true },
});
