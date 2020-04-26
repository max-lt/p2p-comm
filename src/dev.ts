import { randomBytes } from 'crypto';
import { BaseNode, BasePool, AbstractPacket } from '@p2p-comm/base';

import { TCPTransport, TCPServer } from '@p2p-comm/core';
import { CoreModule } from '@p2p-comm/core';
import { DataPacket } from '@p2p-comm/core';

// import { PingModule } from '@p2p-comm/ping';
// import { PingPacket } from '@p2p-comm/ping';

const coreModule = new CoreModule();

// coreModule.addModule(new PingModule);

Buffer.prototype.toJSON = function () {
  return this.toString();
};

class CoreNode extends BaseNode<TCPTransport> {
  // tslint:disable-next-line:no-shadowed-variable
  constructor({ seed }) {
    super();
    this.pool = new BasePool({ seed, nodeId: this.id }, TCPTransport, TCPServer, coreModule);
    this.pool.on('packet-data', (p: DataPacket) => this.emit('data', p.data));
  }

  sendPacket(packet: AbstractPacket) {
    this.pool.broadcast(packet);
  }

  sendData(data) {
    this.pool.broadcast(DataPacket.fromObject({ data }));
  }
}

const env = process.env;

const seed = process.argv.slice(2).map((e) => parseInt(e));

const node = new CoreNode({ seed });

const name = env.NAME || randomBytes(4).toString('hex');

node.listen(parseInt(env.PORT) || undefined);

node.on('data', (data) => {
  process.stdout.write(data.toString());
});

process.stdin.resume();
process.stdin.on('data', (data: Buffer) => {
  let message = data.toString();
  switch (message) {
    case '\n':
      message = '<empty>\n';
      break;
    case 'bourre!\n':
      let i = 100;
      while (i--) {
        node.sendData(Buffer.from(`${name} -> ${i} ${randomBytes(16).toString('base64')}\n`));
      }
      return;
    // case 'ping!\n':
    //   const ping = new PingPacket;
    //   node.sendPacket(ping);
    //   return;
  }

  node.sendData(Buffer.from(`${name} -> ${message}`));
});
