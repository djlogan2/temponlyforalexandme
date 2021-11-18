"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceRecordSchema = void 0;
var simpl_schema_1 = require("simpl-schema");
exports.InstanceRecordSchema = new simpl_schema_1.default({
    lastPing: Date,
    shuttingDown: { type: Boolean, optional: true },
    handlingInstance: { type: String, optional: true },
    started: Date,
    ipAddress: String,
    pid: Number,
    current_release: String,
    current_version: String,
});
