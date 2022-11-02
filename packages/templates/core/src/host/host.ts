import { HostMessage } from './host.types';

export class Host {
  private isConnected: boolean;
  constructor() {
    this.isConnected = false;
  }
  public connect = () => {
    this.isConnected = true;
  }
  public sendMessage = (message: HostMessage): undefined | MessagePort['onmessage'] => {
    if (!this.isConnected) {
      return;
    }

    const channel = new MessageChannel();

    setTimeout(() => {
      window.parent.postMessage(message, '*', [channel.port2]);
    }, 1);
    return channel.port1.onmessage;
  }
}

export default {
  Host,
};
