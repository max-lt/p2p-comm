import { Module } from '@p2p-comm/base';

import { PoolPingPongPacketHandler, PeerPingPongPacketHandler } from './handlers';

import { PingPacket, PongPacket } from './packets';
export { PingPacket, PongPacket };

export class PingModule extends Module {
  constructor() {
    super({
      Peer: PeerPingPongPacketHandler,
      Pool: PoolPingPongPacketHandler,
      packets: [PingPacket, PongPacket]
    });
  }
}
