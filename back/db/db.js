import {connect} from 'mongoose';

function db() {
    // eslint-disable-next-line no-undef
    connect(process.env.DB_URI)
    .then(()=> console.log ("Connexion Réussi man"))
    .catch((err)=> console.error(err))
}

export default db;