import { Client } from 'pg';
import dotenv from 'dotenv';

// .env ファイルを読み込む
dotenv.config();

class Database {
    private client: Client;

    constructor() {
        // DB接続設定（環境変数から取得）
        this.client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 5432,  // PostgreSQLのデフォルトポート
        });
    }

    // データベース接続を確立
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) {
                    console.error('DB接続エラー: ' + err.stack);
                    reject(err);
                } else {
                    console.log('DB接続成功');
                    resolve();
                }
            });
        });
    }

    // クエリ実行メソッド
    query(queryString: string, params: any[] = []): Promise<any> {
        return this.client.query(queryString, params);
    }

    // 接続終了
    end(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.end(err => {
                if (err) {
                    console.error('DB切断エラー: ' + err.stack);
                    reject(err);
                } else {
                    console.log('DB切断成功');
                    resolve();
                }
            });
        });
    }
}

export default Database;
