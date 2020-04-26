import { PoolPacketHandler, Peer, PeerPacketHandler, Pool } from '@p2p-comm/base';
import { TimerUtil as Timer } from '@p2p-comm/base';
interface Context extends Object {
    toto: WeakMap<Peer, Timer>;
}
export declare class PoolPingPongPacketHandler implements PoolPacketHandler {
    private pool;
    private ctx;
    static create(parent: Pool, ctx: any): PoolPingPongPacketHandler;
    constructor(pool: Pool, ctx: any);
    bindPeer(peer: Peer): void;
}
export declare class PeerPingPongPacketHandler implements PeerPacketHandler {
    private peer;
    private ctx;
    pongTimeout: Timer;
    static create(parent: Peer, ctx: any): PeerPingPongPacketHandler;
    constructor(peer: Peer, ctx: Context);
    handlePacket(packet: any): boolean;
}
export {};
