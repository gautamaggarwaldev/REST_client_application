const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MikroORM, RequestContext } = require('@mikro-orm/core');
const axios = require('axios');
const config = require('./config/mikro-orm.config');

const app = express();
const PORT =  3001;

app.use(bodyParser.json());
app.use(cors());

let orm;

async function initORM() {
  try {
    orm = await MikroORM.init(config);
    const generator = orm.getSchemaGenerator();
    await generator.ensureDatabase();
    await generator.updateSchema(); // Safe for existing databases
    console.log('Database connected');
    return orm;
  } catch (error) {
    console.error('Failed to initialize ORM:', error);
    throw error;
  }
}

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.post('/api/proxy', async (req, res) => {
  try {
    const { method, url, headers = {}, body } = req.body;

    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: body,
      timeout: 5000, // 5-second timeout
    });

    const requestHistory = orm.em.create('RequestHistory', {
      method,
      url,
      headers,
      body,
      response: response.data,
      statusCode: response.status,
    });
    await orm.em.persistAndFlush(requestHistory);

    res.json({
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error.message);

    let errorMessage = 'Failed to make request';
    let statusCode = 500;

    if (error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data || error.message;
    } else if (error.request) {
      errorMessage = 'No response from server (timeout)';
    }

    res.status(statusCode).json({
      error: errorMessage,
      details: error.message,
    });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const [history, total] = await orm.em.findAndCount(
      'RequestHistory',
      {},
      {
        orderBy: { createdAt: 'DESC' },
        limit: parseInt(limit),
        offset: parseInt(offset),
      }
    );

    res.json({
      data: history,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
initORM()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });