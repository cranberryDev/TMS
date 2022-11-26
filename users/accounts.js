const Pool=require('pg').Pool;
const dotenv = require("dotenv");
const { request, response } = require('express');


dotenv.config()

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABSE,
  password: process.env.PGPASSWORD,
  port: 5432,
})
pool.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});



/* Get all users details */
const getUsers = (request, response) => {

  pool.query('SELECT * FROM tbl_userdata ORDER BY accoutn_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
  
}

/*Get user with email and contact */
const userCheck =(request,response)=>{
  var {email,contact}=request.query
  console.log(request.query);
  /*email , contact */
  pool.query('SELECT email,contact from tbl_userdata where email=$1 and contact=$2 order BY id ASC',[email,contact], (error,results)=>{
    if(results.rows.length==0){
      response.status(404).json('User Not Found')
      console.log(results.rows);
    }
    else{
    response.status(200).json('User Found')
    }
    (error)
  });
  
}

/*Get single user details */
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tbl_userdata WHERE accoutn_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/*Create a new user*/
const createUsers = (request, response) => { 
    const {contact,email,name,password,roll_no,institute,course} = request.body
    console.log(request.body,"request body");
    
    pool.query('INSERT INTO tbl_userdata (name, email,contact,password,roll_number,institute,course) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *',
     [name, email,contact,password,roll_no,institute,course], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].email}`)

    })
  }

  // const students = (request,response)=>{
  //   const {name,contact,univ,roll_no,address}=request.body
  // autoIncrement()

  //   pool.query('INSERT INTO tbl_students (unique_id,name,contact,college,roll_number,college_address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
  //   [id,name,contact,univ,roll_no,address],(error,results)=>{
  //     if(error){
  //       throw error
  //     }
  //     response.status(201).send(`student added`)
  //   })

  // }

  /*Delete a user*/
  const deleteUser=(request,response)=>{
    const id=parseInt(request.params.id)

    pool.query('DELETE FROM tbl_users where accoutn_id=$1',[id],(error,results)=>{
      if(error){
        throw error
      }
      response.status(200).send(`User deleted with id:${id}`)
    })
  }


  module.exports={createUsers,getUsers,getUserById,deleteUser,userCheck,pool}

