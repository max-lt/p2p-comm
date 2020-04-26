import { PoolPacketHandler, Peer, PeerPacketHandler, Pool } from '@p2p-comm/base';
import { PingPacket, PongPacket } from './packets';
import { types } from './packets/types';

import { TimerUtil as Timer } from '@p2p-comm/base';

interface Context extends Object {
  toto: WeakMap<Peer, Timer>;
}

export class PoolPingPongPacketHandler implements PoolPacketHandler {

  static create(parent: Pool, ctx) {
    return (new this(parent, ctx));
  }

  constructor(private pool: Pool, private ctx) { }

  bindPeer(peer: Peer) {
    peer.on('packet-ping', (p: PingPacket) => this.pool.emit('packet-ping', p));
    peer.on('packet-pong', (p: PingPacket) => this.pool.emit('packet-pong', p));
  }
}

export class PeerPingPongPacketHandler implements PeerPacketHandler {

  pongTimeout: Timer;

  static create(parent: Peer, ctx) {
    return (new this(parent, ctx));
  }

  constructor(private peer: Peer, private ctx: Context) {
    this.pongTimeout = new Timer(5 * 1000);

    // Linking peer with module's PeerPacketHandler

    peer.on('destroy', () => this.pongTimeout.clear());
  }

  handlePacket(packet): boolean {
    switch (packet.type) {
      case types.PING:
        this.peer.send(new PongPacket);
        this.peer.emit('packet-ping', packet);
        return true;
      case types.PONG:
        this.pongTimeout.clear();
        this.peer.emit('packet-pong', packet);
        return true;
      default:
        return false;
    }
  }
}
