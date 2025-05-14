const messages = [];
module.exports = {
  async saveMessage(msg) { messages.push(msg); },
  async getAll() { return messages; }
};
