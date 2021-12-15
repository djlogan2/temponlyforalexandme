export type MongoFieldObject<P> = {fields: { [key in keyof P]?: boolean }};
