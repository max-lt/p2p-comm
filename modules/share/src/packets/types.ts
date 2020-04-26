// import { PacketTypesI as CorePacketTypesI, types as coreTypes } from '@p2p-comm/core/src/core/packets/types';

export interface PacketTypesI {
  GETPEERS: 0x85;
  SENDPEERS: 0x86;
}

export const types: PacketTypesI = {
  GETPEERS: 0x85,
  SENDPEERS: 0x86
};
