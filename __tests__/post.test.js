const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('posts', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('POST /api/v1/posts creates a new post as current user', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    console.log(agent, 'POOOOO');
    const newPost = { detail: 'Wow! Whatuhpost!' };
    const res = await agent.post('/api/v1/posts').send(newPost);
    // expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      detail: newPost.detail,
      github_id: agent.github_id,
    });
  });
});
