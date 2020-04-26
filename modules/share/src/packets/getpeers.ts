import { OBasePacket, IBasePacket, BasePacket, MetaInterface, util } from '@p2p-comm/base';
import { PacketTypesI, types } from './types';

export interface IGetpeersPacket extends IBasePacket {
  number: number;
}
export interface OGetpeersPacket extends OBasePacket {
  type: PacketTypesI['GETPEERS'];
  number: number;
}
export class GetpeersPacket extends BasePacket<IGetpeersPacket, OGetpeersPacket> implements OGetpeersPacket {

  public type = types.GETPEERS;
  public number: number;

  static fromObject(obj: IGetpeersPacket) {
    return (new this()).fromOptions(obj);
  }

  static fromRaw(buf: Buffer): GetpeersPacket {
    return (new this()).fromRaw(buf);
  }

  protected fromRaw(buf: Buffer) {
    super.fromRaw(buf);
    this.number = buf.readUInt32BE(util.metaLength);
    return this;
  }

  protected fromOptions(opts: IGetpeersPacket) {
    super.fromOptions(opts);
    this.number = opts.number;
    return this;
  }

  toJSON(): OGetpeersPacket & MetaInterface {
    return Object.assign(this.getMeta(), {
      number: this.number,
      type: this.type
    });
  }

  toRaw(): Buffer {
    const number = util.writeUInt32(this.number);
    const meta = this.encodeRawMeta();
    return Buffer.concat([meta, number]);
  }

  getSize() {
    return 4;
  }

}
