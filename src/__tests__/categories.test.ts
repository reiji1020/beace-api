import request from 'supertest';
import express from 'express';
import categoriesRouter from '../routes/categories';
import { pool } from '../db';

jest.mock('../db', () => ({
    pool: {
        query: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/categories', categoriesRouter);

describe('GET /categories', () => {
    it('should return a list of categories', async () => {
        const mockCategories = [
            {
                id: 1,
                name: 'Tools',
                created_at: '2021-01-01T00:00:00.000Z',
                updated_at: '2021-01-01T00:00:00.000Z',
            },
        ];

        (pool.query as jest.Mock).mockResolvedValue({ rows: mockCategories });

        const response = await request(app).get('/categories');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategories.map(category => ({
            id: category.id,
            name: category.name,
            createdAt: category.created_at,
            updatedAt: category.updated_at,
        })));
    });

    it('should return a 500 error if the query fails', async () => {
        (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/categories');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'データ取得に失敗しました' });
    });
});