import Database from '../db';
import { Client } from 'pg';

jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

describe('データベース接続関連テスト', () => {
    let db: Database;
    let client: jest.Mocked<Client>;

    beforeAll(() => {
        db = new Database();
        client = (db as any).client;
    });

    it('データベースに接続できること', async () => {
        // @ts-ignore
        client.connect.mockImplementation((callback) => callback(null));
        await db.connect();
        expect(client.connect).toHaveBeenCalled();
    });

    it('データベースとの接続を正しく切断できること', async () => {
        // @ts-ignore
        client.end.mockImplementation((callback) => callback(null));
        await db.end();
        expect(client.end).toHaveBeenCalled();
    });
});