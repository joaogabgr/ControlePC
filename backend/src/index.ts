import express, { Request, Response } from 'express';
import loudness from 'loudness';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors({
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));
app.use(express.json());

// Rota para alterar o volume
app.post('/set-volume', async (req: Request, res: Response) => {
    const { volume } = req.body;

    if (typeof volume === 'number' && volume >= 0 && volume <= 100) {
        try {
            await loudness.setVolume(volume);
            res.status(200).json({ message: `Volume alterado para ${volume}` });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao alterar o volume', details: error });
        }
    } else {
        res.status(400).json({ error: 'Volume inválido. Deve ser um número entre 0 e 100.' });
    }
});

// Rota para obter o volume atual
app.get('/get-volume', async (req: Request, res: Response) => {
    try {
        const volume = await loudness.getVolume();
        res.status(200).json({ volume });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o volume', details: error });
    }
});

import { exec } from 'child_process';

// Rota para pausar o vídeo
app.post('/play', async (req: Request, res: Response) => {

    exec(`powershell -File ./scripts/space.ps1`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao pausar o vídeo', details: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: 'Erro ao executar o script PowerShell', details: stderr });
        }
        res.status(200).json({ message: 'Vídeo pausado com sucesso', output: stdout });
    });
});

app.post('/forward', async (req: Request, res: Response) => {

    exec(`powershell -File ./scripts/forward.ps1`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao pausar o vídeo', details: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: 'Erro ao executar o script PowerShell', details: stderr });
        }
        res.status(200).json({ message: 'Vídeo pausado com sucesso', output: stdout });
    });
});

app.post('/leftArrow', async (req: Request, res: Response) => {

    exec(`powershell -File ./scripts/leftArrow.ps1`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao pausar o vídeo', details: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: 'Erro ao executar o script PowerShell', details: stderr });
        }
        res.status(200).json({ message: 'Vídeo pausado com sucesso', output: stdout });
    });
});

app.post('/rightArrow', async (req: Request, res: Response) => {

    exec(`powershell -File ./scripts/rightArrow.ps1`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao pausar o vídeo', details: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: 'Erro ao executar o script PowerShell', details: stderr });
        }
        res.status(200).json({ message: 'Vídeo pausado com sucesso', output: stdout });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor Express rodando em http://0.0.0.0:${port}`);
});
