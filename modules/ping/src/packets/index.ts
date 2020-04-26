import { PingPacket } from './ping';
export { PingPacket };

import { PongPacket } from './pong';
export { PongPacket };

export type Packet = PingPacket | PongPacket;
export type PacketTypes = typeof PingPacket | typeof PongPacket;
