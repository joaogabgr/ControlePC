import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [volume, setVolume] = useState<number>(50);

  // Função para chamar a API usando Axios
  const handleApiRequest = async (endpoint: string, method: 'POST' | 'GET', body?: object) => {
    try {
      const response = await axios({
        method: method,
        url: `http://192.168.1.106:5000/${endpoint}`,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data.message || response.data.error);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Função para obter o volume inicial ao carregar a página
  const fetchVolume = async () => {
    try {
      const response = await axios.get('http://192.168.1.106:5000/get-volume');
      setVolume(response.data.volume); // Atualiza o estado do volume com o valor da API
    } catch (error) {
      console.error('Erro ao obter o volume:', error);
    }
  };

  // UseEffect para obter o volume inicial quando o componente é montado
  useEffect(() => {
    fetchVolume();
  }, []);

  // Funções de controle de mídia
  const handlePause = () => handleApiRequest('pause', 'POST');
  const handlePlay = () => handleApiRequest('play', 'POST');
  const handleNext = () => handleApiRequest('forward', 'POST');
  const handlePrevious = () => handleApiRequest('backward', 'POST');
  const handleLeftArrow = () => handleApiRequest('leftArrow', 'POST');
  const handleRightArrow = () => handleApiRequest('rightArrow', 'POST');

  // Função para ajustar o volume
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    handleApiRequest('set-volume', 'POST', { volume: newVolume });
  };

  return (
    <div className="App">
      <h1>Controle de Mídia</h1>
      <div className="controls">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleNext}>Próximo Vídeo</button>
        <button onClick={handleLeftArrow}>←</button>
        <button onClick={handleRightArrow}>→</button>
      </div>
      <div className="volume-control">
        <label>Volume: {volume}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default App;
