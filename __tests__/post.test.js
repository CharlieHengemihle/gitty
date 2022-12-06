const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post.js');

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
    const user = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    const newPost = { detail: 'Wow! Whatuhpost!', github_id: user.body.id };
    const res = await agent.post('/api/v1/posts').send(newPost);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      detail: newPost.detail,
      github_id: newPost.github_id,
    });
  });

  it('GET /api/v1/posts shows all posts', async () => {
    const agent = request.agent(app);
    const user = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    const newPost = await Post.insert({
      detail: 'what is today but yesterdays tomorrow?',
      github_id: user.body.id,
    });
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(newPost);
  });
});
