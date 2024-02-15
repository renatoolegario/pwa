import { Pool } from '@vercel/postgres';

async function query(rota, dados) {
  try {
    // Verifique se todas as variáveis de ambiente necessárias estão definidas
    if (!process.env.USERBD || !process.env.HOSTBD || !process.env.DATABASE || !process.env.PASSWORDBD || !process.env.PORTBD) {
      return { error: 'Variáveis de ambiente não definidas para a conexão com o banco de dados' };
    }

    const {SERVERNAME, USERNAME, PASSWORD, DATABASE, PORT } = process.env;

  // Crie uma pool de conexão com o banco de dados usando as variáveis de ambiente
  const pool = new Pool({
    user: USERNAME,
    host: SERVERNAME,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
  });

    // Lógica para diferentes rotas de consulta
    if (rota === 'consultaMapas') {
      // Executa a consulta SQL para selecionar a coluna geom da tabela mapa
      const result = await pool.query('SELECT geom FROM mapa');

      // Retorna o resultado da consulta no campo data
      return { status: 'ok', data: result.rows }; // Retornando os resultados da consulta no campo data
    }

    // Se a rota não for reconhecida, retorne um erro
    return { error: 'Rota de consulta não reconhecida' };
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    return { error: 'Erro interno do servidor' };
  } finally {
    // Encerra a pool de conexão após a execução da consulta
    if (pool) {
      await pool.end();
    }
  }
}

async function consulta(rota, dados) {
  try {
    const resultado = await query(rota, dados);
    return resultado;
  } catch (error) {
    console.error('Erro na consulta:', error);
    throw error; // Rejogue o erro para que ele seja capturado pelo caller (quem chama a função)
  }
}

export default consulta;
