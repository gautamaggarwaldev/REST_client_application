// backend/src/entities/RequestHistory.js
const { EntitySchema } = require('@mikro-orm/core');

const schema = new EntitySchema({
  name: 'RequestHistory',
  tableName: 'request_history',
  properties: {
    id: {
      type: 'number',
      primary: true,
      autoincrement: true,
    },
    method: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    headers: {
      type: 'json',
      nullable: true,
    },
    body: {
      type: 'text',
      nullable: true,
    },
    response: {
      type: 'json',
    },
    statusCode: {
      type: 'number',
      fieldName: 'status_code',
    },
    createdAt: {
      type: 'Date',
      fieldName: 'created_at',
      defaultRaw: 'CURRENT_TIMESTAMP',
    },
  },
});

module.exports = { RequestHistory: schema };