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

connection.connect(error => {
    if(error) throw error;
    console.log( 'Base de datos esta corriendo' )
});

app.listen(PORT, () => console.log( `El servidor esta corriendo en el puerto ${PORT}`));