export class Input {
  downKeys = new Map<string, boolean>();
  actions = new Map<string, Function>();

  constructor() {
    addEventListener("keydown", (e) => {
      this.setKeyStatus(e.key, true);
    });

    addEventListener("keyup", (e) => {
      this.setKeyStatus(e.key, false);
    });
  }

  setKeyStatus(key: string, state: boolean) {
    this.downKeys.set(key, state);
  }

  registerAction(key: string, callback: Function) {
    this.actions.set(key, callback);
  }

  update() {
    [...this.actions]
      .filter((action) => this.downKeys.get(action[0]))
      .forEach((action) => {
        action[1]();
      });
  }
}
