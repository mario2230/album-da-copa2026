import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const dbName = "AlbumCopa";
let db: SQLiteDBConnection | null = null;
let initialized = false;

const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

async function ensureDatabase() {
  if (initialized && db) {
    return;
  }

  if (!db) {
    db = await sqliteConnection.createConnection(
      dbName,
      false,
      "no-encryption",
      1,
      false,
    );
  }

  await db.open();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT NOT NULL
    );
  `);

  await db.execute(`
  CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    selecao TEXT NOT NULL,
    foto TEXT NOT NULL,
    raridade TEXT NOT NULL
  );
  `);

  await popularJogadores();

  await db.execute(`
  CREATE TABLE IF NOT EXISTS album (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  jogador_id INTEGER NOT NULL,
  favorito INTEGER NOT NULL DEFAULT 0,
  coletada INTEGER NOT NULL DEFAULT 0,

  UNIQUE(usuario_id, jogador_id),

  FOREIGN KEY(usuario_id)
    REFERENCES usuarios(id),

  FOREIGN KEY(jogador_id)
    REFERENCES jogadores(id)
);
  `);

  initialized = true;
}

function getDb() {
  if (!db) {
    throw new Error("Banco de dados ainda não inicializado");
  }
  return db;
}

export async function initDatabase() {
  try {
    await ensureDatabase();
  } catch (error) {
    console.error("Erro ao iniciar DB", error);
    throw error;
  }
}

async function popularJogadores() {
  const existe = await getDb().query(`
    SELECT COUNT(*) AS total
    FROM jogadores;
  `);

  const total = existe.values?.[0]?.total ?? 0;

  if (total > 0) {
    return;
  }

  const jogadores = [
    // BRASIL
    {
      nome: "Neymar Jr",
      selecao: "Brasil",
      foto: "https://img.a.transfermarkt.technology/portrait/big/68290-1697056482.jpg",
      raridade: "Lendária",
    },
    {
      nome: "Vinicius Jr",
      selecao: "Brasil",
      foto: "https://img.a.transfermarkt.technology/portrait/big/371998-1664869583.jpg",
      raridade: "Épica",
    },
    {
      nome: "Rodrygo",
      selecao: "Brasil",
      foto: "https://img.a.transfermarkt.technology/portrait/big/412363-1697056493.jpg",
      raridade: "Rara",
    },
    {
      nome: "Alisson",
      selecao: "Brasil",
      foto: "https://img.a.transfermarkt.technology/portrait/big/105470-1668528909.jpg",
      raridade: "Rara",
    },
    {
      nome: "Marquinhos",
      selecao: "Brasil",
      foto: "https://img.a.transfermarkt.technology/portrait/big/181767-1668528947.jpg",
      raridade: "Comum",
    },

    // ARGENTINA
    {
      nome: "Lionel Messi",
      selecao: "Argentina",
      foto: "https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg",
      raridade: "Lendária",
    },
    {
      nome: "Julián Álvarez",
      selecao: "Argentina",
      foto: "https://img.a.transfermarkt.technology/portrait/big/576024-1683633619.jpg",
      raridade: "Épica",
    },
    {
      nome: "Lautaro Martínez",
      selecao: "Argentina",
      foto: "https://img.a.transfermarkt.technology/portrait/big/406625-1695024989.jpg",
      raridade: "Rara",
    },
    {
      nome: "Emiliano Martínez",
      selecao: "Argentina",
      foto: "https://img.a.transfermarkt.technology/portrait/big/111873-1668180825.jpg",
      raridade: "Comum",
    },

    // FRANÇA
    {
      nome: "Kylian Mbappé",
      selecao: "França",
      foto: "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg",
      raridade: "Lendária",
    },
    {
      nome: "Antoine Griezmann",
      selecao: "França",
      foto: "https://img.a.transfermarkt.technology/portrait/big/125781-1663672271.jpg",
      raridade: "Épica",
    },
    {
      nome: "Ousmane Dembélé",
      selecao: "França",
      foto: "https://img.a.transfermarkt.technology/portrait/big/288230-1682683700.jpg",
      raridade: "Rara",
    },

    // PORTUGAL
    {
      nome: "Cristiano Ronaldo",
      selecao: "Portugal",
      foto: "https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg",
      raridade: "Lendária",
    },
    {
      nome: "Bruno Fernandes",
      selecao: "Portugal",
      foto: "https://img.a.transfermarkt.technology/portrait/big/240306-1683882766.jpg",
      raridade: "Épica",
    },
    {
      nome: "Bernardo Silva",
      selecao: "Portugal",
      foto: "https://img.a.transfermarkt.technology/portrait/big/241641-1682581546.jpg",
      raridade: "Rara",
    },

    // ALEMANHA
    {
      nome: "Jamal Musiala",
      selecao: "Alemanha",
      foto: "https://img.a.transfermarkt.technology/portrait/big/580195-1680180859.jpg",
      raridade: "Épica",
    },
    {
      nome: "Kai Havertz",
      selecao: "Alemanha",
      foto: "https://img.a.transfermarkt.technology/portrait/big/309400-1682582021.jpg",
      raridade: "Rara",
    },

    // INGLATERRA
    {
      nome: "Harry Kane",
      selecao: "Inglaterra",
      foto: "https://img.a.transfermarkt.technology/portrait/big/132098-1681379945.jpg",
      raridade: "Épica",
    },
    {
      nome: "Jude Bellingham",
      selecao: "Inglaterra",
      foto: "https://img.a.transfermarkt.technology/portrait/big/581678-1693987944.jpg",
      raridade: "Lendária",
    },
    {
      nome: "Bukayo Saka",
      selecao: "Inglaterra",
      foto: "https://img.a.transfermarkt.technology/portrait/big/433177-1667835061.jpg",
      raridade: "Rara",
    },

    // ESPANHA
    {
      nome: "Pedri",
      selecao: "Espanha",
      foto: "https://img.a.transfermarkt.technology/portrait/big/683840-1667830742.jpg",
      raridade: "Épica",
    },
    {
      nome: "Gavi",
      selecao: "Espanha",
      foto: "https://img.a.transfermarkt.technology/portrait/big/646740-1667830671.jpg",
      raridade: "Rara",
    },
    {
      nome: "Lamine Yamal",
      selecao: "Espanha",
      foto: "https://img.a.transfermarkt.technology/portrait/big/937958-1699476962.jpg",
      raridade: "Lendária",
    },
  ];

  for (const jogador of jogadores) {
    await getDb().run(
      `
      INSERT INTO jogadores
      (nome, selecao, foto, raridade)
      VALUES (?, ?, ?, ?);
      `,
      [jogador.nome, jogador.selecao, jogador.foto, jogador.raridade],
    );
  }
}

export async function addUsuario(nome: string, login: string, senha: string) {
  await ensureDatabase();

  const query = `
    INSERT INTO usuarios (nome, login, senha)
    VALUES (?, ?, ?);
  `;

  await getDb().run(query, [nome, login, senha]);
}

export async function listUsuarios() {
  await ensureDatabase();

  const result = await getDb().query(`SELECT * FROM usuarios;`);
  return result.values || [];
}

export async function updateUsuario(
  id: number,
  nome: string,
  login: string,
  senha: string,
) {
  await ensureDatabase();

  const query = `
    UPDATE usuarios
    SET nome = ?, login = ?, senha = ?
    WHERE id = ?;
  `;

  await getDb().run(query, [nome, login, senha, id]);
}

export async function deleteUsuarioById(id: number) {
  await ensureDatabase();

  const query = `DELETE FROM usuarios WHERE id = ?;`;
  return await getDb().run(query, [id]);
}

<<<<<<< Updated upstream

export async function realizarLogin(
  login: string,
  senha: string
) {
  await ensureDatabase()

  const loginLimpo = login.trim().toLowerCase() 
  const query = `
    SELECT * FROM usuarios
    WHERE login = ? AND senha = ?;
  `

  console.log('SQL:', query)
  console.log('Parâmetros:', loginLimpo, senha)

  const result = await getDb().query(query, [loginLimpo, senha])
  console.log('Resultado da consulta:', result)


  const usuarios = result.values || []
  console.log('Usuários encontrados:', usuarios)
  return usuarios
=======
export async function realizarLogin(login: string, senha: string) {
  await ensureDatabase();

  const result = await getDb().query(
    `
    SELECT *
    FROM usuarios
    WHERE login = ?
      AND senha = ?;
    `,
    [login.trim().toLowerCase(), senha],
  );

  return result.values || [];
>>>>>>> Stashed changes
}

export async function findUsuarioById(id: number) {
  await ensureDatabase();

  const query = `
    SELECT * FROM usuarios
    WHERE id = ?;
  `;

  const result = await getDb().query(query, [id]);
  return result.values || [];
}

export async function addContato(
  nome: string,
  email: string,
  telefone: string,
) {
  await ensureDatabase();

  const query = `
    INSERT INTO contatos (nome, email, telefone)
    VALUES (?, ?, ?);
  `;

  await getDb().run(query, [nome, email, telefone]);
}

export async function listContatos() {
  await ensureDatabase();

  const result = await getDb().query(`SELECT * FROM contatos;`);
  return result.values || [];
}

export async function updateContato(
  id: number,
  nome: string,
  email: string,
  telefone: string,
) {
  await ensureDatabase();

  const query = `
    UPDATE contatos
    SET nome = ?, email = ?, telefone = ?
    WHERE id = ?;
  `;

  await getDb().run(query, [nome, email, telefone, id]);
}

export async function deleteContatoById(id: number) {
  await ensureDatabase();

  const query = `DELETE FROM contatos WHERE id = ?;`;
  return await getDb().run(query, [id]);
}

export async function findContatoById(id: number) {
  await ensureDatabase();

  const query = `
    SELECT * FROM contatos
    WHERE id = ?;
  `;

  const result = await getDb().query(query, [id]);
  return result.values || [];
}

export async function findContatoByName(nome: string) {
  await ensureDatabase();

  const query = `
    SELECT * FROM contatos
    WHERE nome = ?;
  `;

  const result = await getDb().query(query, [nome]);
  return result.values || [];
}

export async function addJogador(
    nome: string,
    selecao: string,
    foto: string,
    raridade: string
) {
    await ensureDatabase()

    await getDb().run(
        `
        INSERT INTO jogadores
        (nome, selecao, foto, raridade)
        VALUES (?, ?, ?, ?);
        `,
        [
            nome,
            selecao,
            foto,
            raridade
        ]
    )
}

export async function listJogadores(usuarioId: number) {
  await ensureDatabase();

  const result = await getDb().query(
    `
    SELECT
    j.id,
    j.nome,
    j.selecao,
    j.foto,
    j.raridade,
    COALESCE(a.coletada, 0) AS coletada,
    COALESCE(a.favorito, 0) AS favorito
    FROM jogadores j
    LEFT JOIN album a
    ON a.jogador_id = j.id
    AND a.usuario_id = ?;

    `,
    [usuarioId],
  );

  return result.values || [];
}

export async function findJogadorById(jogadorId: number, usuarioId: number) {
  await ensureDatabase();

  const result = await getDb().query(
    `SELECT
    j.id,
    j.nome,
    j.selecao,
    j.foto,
    j.raridade,
    COALESCE(a.coletada,0) AS coletada,
    COALESCE(a.favorito,0) AS favorito
    FROM jogadores j
    LEFT JOIN album a
    ON a.jogador_id = j.id
    AND a.usuario_id = ?
    WHERE j.id = ?;
    `,
    [usuarioId, jogadorId],
  );

  return result.values || [];
}
export async function atualizarJogador(
    id: number,
    nome: string,
    selecao: string,
    foto: string,
    raridade: string
) {

    await ensureDatabase()

    return await getDb().run(
        `
        UPDATE jogadores
        SET
            nome = ?,
            selecao = ?,
            foto = ?,
            raridade = ?
        WHERE id = ?;
        `,
        [
            nome,
            selecao,
            foto,
            raridade,
            id
        ]
    )
}

export async function deletarJogadorById(id: number) {
  await ensureDatabase();

  await getDb().run(
    `
    DELETE FROM album
    WHERE jogador_id = ?;
    `,
    [id],
  );

  return await getDb().run(
    `
    DELETE FROM jogadores
    WHERE id = ?;
    `,
    [id],
  );
}

export async function favoritarJogador(
  usuarioId: number,
  jogadorId: number,
  favorito: boolean,
) {
  await ensureDatabase();

  await getDb().run(
    `
    INSERT OR IGNORE INTO album

    (
      usuario_id,
      jogador_id
    )

    VALUES (?, ?);
    `,
    [usuarioId, jogadorId],
  );

  return await getDb().run(
    `
    UPDATE album

    SET favorito = ?

    WHERE usuario_id = ?
      AND jogador_id = ?;
    `,
    [favorito ? 1 : 0, usuarioId, jogadorId],
  );
}

export async function listJogadoresFavoritos(usuarioId: number) {
  await ensureDatabase();

  const result = await getDb().query(
    `SELECT
    j.id,
    j.nome,
    j.selecao,
    j.foto,
    j.raridade,
    a.favorito,
    a.coletada
    FROM jogadores j
    INNER JOIN album a
    ON a.jogador_id = j.id
    WHERE
    a.usuario_id = ?
    AND a.favorito = 1;
    `,
    [usuarioId],
  );

  return result.values || [];
}

export async function atualizarColetada(
  usuarioId: number,
  jogadorId: number,
  coletada: boolean,
) {
  await ensureDatabase();

  await getDb().run(
    `
    INSERT OR IGNORE INTO album

    (
      usuario_id,
      jogador_id
    )

    VALUES (?, ?);
    `,
    [usuarioId, jogadorId],
  );

  return await getDb().run(
    `
    UPDATE album

    SET coletada = ?

    WHERE usuario_id = ?
      AND jogador_id = ?;
    `,
    [coletada ? 1 : 0, usuarioId, jogadorId],
  );
}
