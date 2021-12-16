export interface LogRecord {
    _id: string;
    type: "client" | "server";
    date: Date;
    userid?: string;
    connection?: string;
    text: string;
}
