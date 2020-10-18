const express     = require( 'express' );
const mysql       = require( 'mysql' );
const bodyParser  = require( 'body-parser' );
const PORT        = process.env.PORT || 3050;
const app         = express();

app.use( bodyParser.json() );

const connection = mysql.createConnection ({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'crud_nodeJS'
});


app.get('/', ( req,res ) => {
    res.send( 'Bienvenidos a nuestra api' );
});


app.get('/usuarios',( req, res ) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query( sql, ( error, results ) => {
        if( error ) throw error;
        if( results.length > 0 ) {
            res.json( results );
        } else {
            res.send( 'No hay resultados' )
        }
    });
});

app.get('/usuarios/:cedula',( req, res ) => {
   const {cedula} = req.params
   const sql = `SELECT * FROM usuarios WHERE cedula = ${cedula}`;
   connection.query( sql, ( error, results ) => {
        if( error ) throw error;
        if( results.length > 0 ) {
            res.json( results );
        } else {
            res.send( 'No hay resultados' )
        }
    });
});

app.post( '/add', ( req, res ) => {
    const sql = `INSERT INTO usuarios SET ?`;
    const objUsuario = {
        cedula   : req.body.cedula,
        nombre   : req.body.nombre,
        apellido : req.body.apellido,
        correo   : req.body.correo
    };
    connection.query( sql, objUsuario, error => {
        if( error ) throw error;
        res.send( 'Usuario registrado!!!' );
    });
});

app.put( '/update/:cedula', ( req, res ) => {
    const {cedula} = req.params;
    const { nombre, apellido, correo} = req.body;
    const sql = `UPDATE
                     usuarios 
                SET 
                    cedula    = '${cedula}',
                    nombre    = '${nombre}', 
                    apellido  = '${apellido}', 
                    correo    = '${correo}'
                WHERE 
                    cedula = ${cedula}`;
    connection.query( sql, error => {
       if( error ) throw error;
       res.send( 'Usuario actualizado!!!' );
    });
});

app.delete('/delete/:cedula', ( req, res ) => {
    const {cedula} = req.params;
    const sql = `DELETE 
                 FROM 
                    usuarios 
                WHERE 
                    cedula = ${cedula}`;
    connection.query( sql, error => {
        if( error ) throw error;
        res.send( 'Usuario eliminado!!!' );
     });
});

connection.connect( error => {
    if( error ) throw error;
    console.log( 'Base de datos esta corriendo' )
});

app.listen( PORT, () => console.log( `El servidor esta corriendo en el puerto ${PORT}` ));