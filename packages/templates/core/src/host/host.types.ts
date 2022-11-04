export type HostMessageFocus = {
  type: 'focus';
  field: string;
};

export type HostMessage = HostMessageFocus;

export type HostProps = {
  connect: () => void;
  sendMessage: (message: HostMessage) => undefined | MessagePort['onmessage'];
};
