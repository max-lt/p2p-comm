"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const base_1 = require("@p2p-comm/base");
class PongPacket extends base_1.BasePacket {
    constructor() {
        super();
        this.type = types_1.types.PONG;
        this.fromOptions(null);
    }
    static fromObject() {
        return (new this());
    }
    static fromRaw(buf) {
        return (new this()).fromRaw(buf);
    }
    getTypeName() {
        return 'PONG';
    }
}
PongPacket.type = types_1.types.PONG;
exports.PongPacket = PongPacket;
