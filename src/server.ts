import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// ミドルウェア
app.use(express.json());

// サンプルエンドポイント
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// もう一つのエンドポイント
app.get('/api/data', (req: Request, res: Response) => {
    res.json({ message: 'This is some data' });
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
