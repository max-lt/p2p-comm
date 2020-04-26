import { PacketTypesI, types } from './types';
import { OBasePacketI, BasePacket } from '@p2p-comm/base';

export interface OPongPacket extends OBasePacketI {
  type: PacketTypesI['PONG'];
}
export class PongPacket extends BasePacket<null, OPongPacket> implements OPongPacket {

  static type = types.PONG;
  public type = types.PONG;

  constructor() {
    super();
    this.fromOptions(null);
  }

  static fromObject() {
    return (new this());
  }

  static fromRaw(buf: Buffer): PongPacket {
    return (new this()).fromRaw(buf);
  }

  getTypeName() {
    return 'PONG';
  }

}
