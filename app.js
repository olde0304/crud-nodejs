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
    res.send('Lista de los Usuarios');
});

app.get('/usuarios/:id',( req, res ) => {
    res.send('Lista de los Usuarios por id');
});

app.post( '/add', ( req, res ) => {
    res.send( 'Nuevo usuario');
});

app.put( '/update/:cedula', (req, res) => {
    res.send( 'Usuarios actualizados' );
});

app.delete('/delete/:cedula', (req, res) => {
    res.send('Eliminar usuario');
});

connection.connect(error => {
    if(error) throw error;
    console.log( 'Base de datos esta corriendo' )
});

app.listen(PORT, () => console.log( `El servidor esta corriendo en el puerto ${PORT}`));