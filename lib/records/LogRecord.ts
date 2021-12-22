export interface LogRecord {
    _id: string;
    type: "client" | "server";
    date: Date;
    userid: string | undefined | null;
    connection: string | undefined | null;
    text: string;
}
