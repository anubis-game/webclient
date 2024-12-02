export class StreamClient {
  private soc: WebSocket;

  constructor(mes: string, pub: string, sig: string, opn: () => void, cls: () => void) {
    this.soc = new WebSocket("ws://127.0.0.1:7777/anubis", ["personal_sign", mes, pub, sig]);

    this.soc.onopen = () => {
      opn();
    };

    this.soc.onclose = () => {
      cls();
    };

    this.soc.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  exit() {
    this.soc.close();
  }

  open(): boolean {
    return this.soc.readyState === WebSocket.OPEN;
  }

  send(str: string) {
    this.soc.send(str);
  }

  recv(rec: (str: string) => void) {
    this.soc.onmessage = (e) => {
      rec(e.data);
    };
  }
}
