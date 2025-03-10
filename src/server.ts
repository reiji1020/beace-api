import express, { Request, Response } from 'express';
import Database from './db';
import dotenv from 'dotenv';

// .env ファイルを読み込む
dotenv.config();

const app = express();
const port = 3000;

// DB接続インスタンス作成
const db = new Database();

// サーバー起動時にDB接続
db.connect().catch(err => {
    console.error('DB接続に失敗しました。', err);
    process.exit(1);  // DB接続に失敗したらサーバーを終了
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// サーバー終了時にDB切断
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on('SIGINT', () => {
    db.end().catch(err => console.error('DB切断に失敗しました。', err));
    process.exit();
});
