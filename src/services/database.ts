import { CapacitorSQLite, SQLiteDBConnection } from "@capacitor-community/sqlite";

const dbName = 'album'
let db: SQLiteDBConnection

export async function initDatabase() {
    try {
        db = await CapacitorSQLite.createConnection({
            database: dbName,
            version: 1,
        })
        await db.open()
        await db.execute( 
            `CREATE TABLE IF NOT EXISTS jogadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            selecao TEXT NOT NULL,
            camisa TEXT,
            favorito TINYINT
            );`,
        )
    } catch (error) {
        console.error('ERRO ao iniciar DB', error)
    }
}


export async function AddJogadores(nome: string, selecao: string, camisa: string, favorito: boolean) {
    const query = `INSERT INTO jogadores (nome, selecao, camisa, favorito) VALUES (?, ?, ?, ?, ?)`
    await db.run(query, [nome, selecao, camisa, favorito])
    
}


export async function listJogadores() {
    const result = await db.query(`SELECT * FROM jogadores;`)
    return result.values || []
}

export async function deletarJogadorById(id: number) {
    const query = `DELETE FROM jogadores WHERE id = ?`;
    return await db.run(query, [id]);
}

export async function atualizarJogador(id: number, nome: string, selecao: string, camisa: string,) {
    const query = `UPDATE jogadores SET nome = ?, selecao = ?, camisa = ? WHERE id = ?`
    return await db.run(query, [nome, selecao, camisa, id])
}

export async function favoritarJogador(id: number, favorito: boolean) {
    const query = `UPDATE jogadores SET favorito = ? WHERE id = ?`
    return await db.run(query, [favorito, id])
}



export async function findJogadorById(id: number) {
    const query = `SELECT * FROM jogadores WHERE id = ?`
    const result = await db.query(query,[id])
    return result.values || []
}

