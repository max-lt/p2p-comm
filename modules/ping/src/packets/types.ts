// import { PacketTypesI as CorePacketTypesI, types as coreTypes } from '@p2p-comm/core/src/core/packets/types';

export interface PacketTypesI {
  PING: 0x83;
  PONG: 0x84;
}

export const types: PacketTypesI = {
  PING: 0x83,
  PONG: 0x84
};
