const { Pool } = require("pg");


const config = {
  user: "postgres",
  host: "localhost",
  database: "gym",
  password: "postgres",
  port: 5432,
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

const insertar = async (datos) =>{
  const consulta =  {
    text: "insert into ejercicios values($1,$2,$3,$4) RETURNING *",
    values: datos,    
    name: "insertar",
  }
  try {
    const result = await pool.query(consulta)   
    return result.rows[0]
  } catch ({ code, message }) {
    console.log({ code, message })    
  }
}

const consultar = async () =>{
  const consulta =  {
    text: "select * from ejercicios where repeticiones  > '20' ",        
    name: "consultar",
  }
  try {
    const result = await pool.query(consulta)   
    return result
  } catch ({ code, message }) {
    console.log({ code, message })    
  }
}

const editar = async (datos)=>{
  const consulta =  {
    text: `update ejercicios set nombre=$1, series =$2,repeticiones = $3,descanso = $4 where nombre = $1 RETURNING *`,
    values: datos,    
    name: "editar",
  }
  try {
    const result = await pool.query(consulta)   
    return result
  } catch ({ code, message }) {
    console.log({ code, message })    
  }
}

const eliminar = async (nombre)=>{
  const consulta =  {
    text: `delete from ejercicios where nombre = '${nombre}' RETURNING *`,    
    name: "eliminar",
  }
  try {
    const result = await pool.query(consulta)   
    return result
  } catch ({ code, message }) {
    console.log({ code, message })    
  }
}



module.exports = {insertar,consultar,editar,eliminar}