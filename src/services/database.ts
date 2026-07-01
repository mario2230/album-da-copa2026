import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

const dbName = 'banco'
let db: SQLiteDBConnection | null = null
let initialized = false

const sqliteConnection = new SQLiteConnection(CapacitorSQLite)

async function ensureDatabase() {
  if (initialized && db) {
    return
  }

  if (!db) {
    db = await sqliteConnection.createConnection(
      dbName,
      false,
      'no-encryption',
      1,
      false
    )
  }

  await db.open()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT NOT NULL
    );
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS jogadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      favorito INTEGER NOT NULL DEFAULT 0,
      coletada INTEGER NOT NULL DEFAULT 0
    );
  `)

  initialized = true
}

function getDb() {
  if (!db) {
    throw new Error('Banco de dados ainda não inicializado')
  }
  return db
}

export async function initDatabase() {
  try {
    await ensureDatabase()
  } catch (error) {
    console.error('Erro ao iniciar DB', error)
    throw error
  }
}

export async function addUsuario(
  nome: string,
  login: string,
  senha: string
) {
  await ensureDatabase()

  const query = `
    INSERT INTO usuarios (nome, login, senha)
    VALUES (?, ?, ?);
  `

  await getDb().run(query, [nome, login, senha])
}

export async function listUsuarios() {
  await ensureDatabase()

  const result = await getDb().query(`SELECT * FROM usuarios;`)
  return result.values || []
}

export async function updateUsuario(
  id: number,
  nome: string,
  login: string,
  senha: string
) {
  await ensureDatabase()

  const query = `
    UPDATE usuarios
    SET nome = ?, login = ?, senha = ?
    WHERE id = ?;
  `

  await getDb().run(query, [nome, login, senha, id])
}

export async function deleteUsuarioById(id: number) {
  await ensureDatabase()

  const query = `DELETE FROM usuarios WHERE id = ?;`
  return await getDb().run(query, [id])
}

export async function realizarLogin(
  login: string,
  senha: string
) {
  await ensureDatabase()

  const query = `
    SELECT * FROM usuarios
    WHERE login = ? AND senha = ?;
  `

  const result = await getDb().query(query, [login, senha])
  return result.values || []
}

export async function findUsuarioById(id: number) {
  await ensureDatabase()

  const query = `
    SELECT * FROM usuarios
    WHERE id = ?;
  `

  const result = await getDb().query(query, [id])
  return result.values || []
}

export async function addContato(
  nome: string,
  email: string,
  telefone: string
) {
  await ensureDatabase()

  const query = `
    INSERT INTO contatos (nome, email, telefone)
    VALUES (?, ?, ?);
  `

  await getDb().run(query, [nome, email, telefone])
}

export async function listContatos() {
  await ensureDatabase()

  const result = await getDb().query(`SELECT * FROM contatos;`)
  return result.values || []
}

export async function updateContato(
  id: number,
  nome: string,
  email: string,
  telefone: string
) {
  await ensureDatabase()

  const query = `
    UPDATE contatos
    SET nome = ?, email = ?, telefone = ?
    WHERE id = ?;
  `

  await getDb().run(query, [nome, email, telefone, id])
}

export async function deleteContatoById(id: number) {
  await ensureDatabase()

  const query = `DELETE FROM contatos WHERE id = ?;`
  return await getDb().run(query, [id])
}

export async function findContatoById(id: number) {
  await ensureDatabase()

  const query = `
    SELECT * FROM contatos
    WHERE id = ?;
  `

  const result = await getDb().query(query, [id])
  return result.values || []
}

export async function findContatoByName(nome: string) {
  await ensureDatabase()

  const query = `
    SELECT * FROM contatos
    WHERE nome = ?;
  `

  const result = await getDb().query(query, [nome])
  return result.values || []
}

export async function addJogador(
  nome: string,
  selecao: string,
  foto: string,
  favorito: boolean = false,
  coletada: boolean = false
) {
  await ensureDatabase()

  const query = `
    INSERT INTO jogadores
    (nome, selecao, foto, favorito, coletada)
    VALUES (?, ?, ?, ?, ?);
  `

  await getDb().run(query, [
    nome,
    selecao,
    foto,
    favorito ? 1 : 0,
    coletada ? 1 : 0
  ])
}

export async function listJogadores() {
  await ensureDatabase()

  const result = await getDb().query(`
    SELECT
      id,
      nome,
      selecao,
      foto,
      favorito,
      coletada
    FROM jogadores;
  `)

  return result.values || []
}

export async function findJogadorById(id: number) {
  await ensureDatabase()

  const result = await getDb().query(
    `
    SELECT
      id,
      nome,
      selecao,
      foto,
      favorito,
      coletada
    FROM jogadores
    WHERE id = ?;
    `,
    [id]
  )

  return result.values || []
}
export async function atualizarJogador(
  id: number,
  nome: string,
  selecao: string,
  foto: string
) {
  await ensureDatabase()

  return await getDb().run(
    `
    UPDATE jogadores
    SET
      nome = ?,
      selecao = ?,
      foto = ?
    WHERE id = ?;
    `,
    [
      nome,
      selecao,
      foto,
      id
    ]
  )
}

export async function deletarJogadorById(id: number) {
  await ensureDatabase()

  const query = `DELETE FROM jogadores WHERE id = ?;`
  return await getDb().run(query, [id])
}

export async function favoritarJogador(id: number, favorito: boolean) {
  await ensureDatabase()

  const query = `
    UPDATE jogadores
    SET favorito = ?
    WHERE id = ?;
  `

  return await getDb().run(query, [favorito ? 1 : 0, id])
}

export async function listJogadoresFavoritos() {
  await ensureDatabase()

  const query = `
    SELECT * FROM jogadores
    WHERE favorito = 1;
  `

  const result = await getDb().query(query)
  return result.values || []
}

export async function atualizarColetada(
  id: number,
  coletada: boolean
) {
  await ensureDatabase()

  return await getDb().run(
    `
    UPDATE jogadores
    SET coletada = ?
    WHERE id = ?;
    `,
    [
      coletada ? 1 : 0,
      id
    ]
  )
}

