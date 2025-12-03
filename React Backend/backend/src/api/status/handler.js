const { default: autoBind } = require("auto-bind");

class StatusHandler {
  constructor(service) {
    this.service = service;

    autoBind(this);
  }

  async getAllStatusHandler() {
    const status = await this.service.getAllStatus();

    return {
      status: "success",
      data: {
        status,
      },
    };
  }
}

module.exports = StatusHandler;