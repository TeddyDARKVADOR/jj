
import express from 'express';
import db from "./db/db.js";
import userRoutes from './routes/user.route.js';
import chalk from 'chalk';

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(chalk.blue("=======Serveur lancé======"));
	console.log(chalk.blue("Bienvenue sur le serveur de Teddy"));
});

process.on('SIGINT', () => {
	console.log(chalk.red('Ce fut un plaisir de vous revoir, à la prochaine !'));
	process.exit();
});

db()

app.use('/user', userRoutes)