"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = require("./packets");
const types_1 = require("./packets/types");
const base_1 = require("@p2p-comm/base");
class PoolPingPongPacketHandler {
    constructor(pool, ctx) {
        this.pool = pool;
        this.ctx = ctx;
    }
    static create(parent, ctx) {
        return (new this(parent, ctx));
    }
    bindPeer(peer) {
        peer.on('packet-ping', (p) => this.pool.emit('packet-ping', p));
        peer.on('packet-pong', (p) => this.pool.emit('packet-pong', p));
    }
}
exports.PoolPingPongPacketHandler = PoolPingPongPacketHandler;
class PeerPingPongPacketHandler {
    constructor(peer, ctx) {
        this.peer = peer;
        this.ctx = ctx;
        this.pongTimeout = new base_1.TimerUtil(5 * 1000);
        // Linking peer with module's PeerPacketHandler
        peer.on('destroy', () => this.pongTimeout.clear());
    }
    static create(parent, ctx) {
        return (new this(parent, ctx));
    }
    handlePacket(packet) {
        switch (packet.type) {
            case types_1.types.PING:
                this.peer.send(new packets_1.PongPacket);
                this.peer.emit('packet-ping', packet);
                return true;
            case types_1.types.PONG:
                this.pongTimeout.clear();
                this.peer.emit('packet-pong', packet);
                return true;
            default:
                return false;
        }
    }
}
exports.PeerPingPongPacketHandler = PeerPingPongPacketHandler;
