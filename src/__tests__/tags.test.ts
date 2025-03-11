import request from 'supertest';
import express from 'express';
import tagsRouter from '../routes/tags';
import { pool } from '../db';

jest.mock('../db', () => ({
    pool: {
        query: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/tags', tagsRouter);

describe('GET /tags', () => {
    it('should return a list of tags', async () => {
        const mockTags = [
            {
                id: 1,
                name: 'Tag1',
                created_at: '2021-01-01T00:00:00.000Z',
                updated_at: '2021-01-01T00:00:00.000Z',
            },
        ];

        (pool.query as jest.Mock).mockResolvedValue({ rows: mockTags });

        const response = await request(app).get('/tags');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTags.map(tag => ({
            id: tag.id,
            name: tag.name,
            createdAt: tag.created_at,
            updatedAt: tag.updated_at,
        })));
    });

    it('should return a 500 error if the query fails', async () => {
        (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/tags');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'データ取得に失敗しました' });
    });
});