import request from 'supertest';
import mongoose from 'mongoose';
import app from '../expressApp';

const TEST_NOTE = {
  title: 'Test note',
  content: 'This is a test note',
  author: { name: 'Tester', email: 'test@example.com' },
};

let createdId: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('CRUD /notes', () => {
  it('POST /notes → creates a note', async () => {
    const res = await request(app).post('/notes').send(TEST_NOTE);
    expect(res.status).toBe(201);
    expect(res.body.content).toBe(TEST_NOTE.content);
    createdId = res.body._id;
  });

  it('GET /notes → returns notes', async () => {
    const res = await request(app).get('/notes?_page=1&_limit=10');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.headers['x-total-count']).toBeDefined();
  });

  it('PUT /notes/:id → updates a note', async () => {
    const res = await request(app)
      .put(`/notes/${createdId}`)
      .send({ content: 'Updated content' });
    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated content');
  });

  it('DELETE /notes/:id → deletes a note', async () => {
    const res = await request(app).delete(`/notes/${createdId}`);
    expect(res.status).toBe(204);
  });
});
