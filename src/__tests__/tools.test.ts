import request from 'supertest';
import express from 'express';
import toolsRouter from '../routes/tools';
import { pool } from '../db';

jest.mock('../db', () => ({
    pool: {
        query: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/tools', toolsRouter);

describe('GET /tools', () => {
    it('should return a list of tools', async () => {
        const mockTools = [
            {
                id: 1,
                name: 'Hammer',
                model_number: 'H123',
                category_id: 1,
                brand: 'BrandA',
                purchase_date: '2021-01-01',
                price: 100,
                quantity: 10,
                discontinued: false,
                discontinued_date: null,
                note: 'A good hammer',
                created_at: '2021-01-01T00:00:00.000Z',
                updated_at: '2021-01-01T00:00:00.000Z',
            },
        ];

        (pool.query as jest.Mock).mockResolvedValue({ rows: mockTools });

        const response = await request(app).get('/tools');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTools.map(tool => ({
            id: tool.id,
            name: tool.name,
            modelNumber: tool.model_number,
            categoryId: tool.category_id,
            brand: tool.brand,
            purchaseDate: tool.purchase_date,
            price: tool.price,
            quantity: tool.quantity,
            discontinued: tool.discontinued,
            discontinuedDate: tool.discontinued_date,
            note: tool.note,
            createdAt: tool.created_at,
            updatedAt: tool.updated_at,
        })));
    });

    it('should return a 500 error if the query fails', async () => {
        (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/tools');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'データ取得に失敗しました' });
    });
});