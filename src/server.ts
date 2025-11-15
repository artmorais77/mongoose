import { app } from "./app"
import { env } from "./env"
import { connectDB } from "./config/db";

connectDB();

app.listen(env.PORT, () => console.log(`Servidor rodando na porta ${env.PORT}`))