import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'

const app = express(); //app ist eine Konstante, ein server der auf Port 4000 läuft
const PORT = 4000;

//Middleware importieren
//Cors
app.use(cors());
//json parsing implementieren
app.use(express.json());

//Routen definieren
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})


