import SimpleSchema from 'simpl-schema';

export interface ConnectionRecord {
    _id: string;
    connection_id: string;
    instance_id: string;
    create_date: Date;
    clientAddress: string;
    user_id?: string;
    username?: string;
    handlingInstance?: string;
}

export const ConnectionRecordSchema = new SimpleSchema({
  connection_id: String,
  instance_id: String,
  create_date: Date,
  clientAddress: String,
  user_id: { type: String, optional: true },
  username: { type: String, optional: true },
  handlingInstance: { type: String, optional: true },
});
