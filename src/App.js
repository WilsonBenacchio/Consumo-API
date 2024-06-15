import { useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Titulo from './Components/Titulo/Titulo';

function App() {
  const [stateTemperatura, setStateTemperatura] = useState(30);
  const [descricao, setDescricao] = useState('');
  const [cidade, setCidade] = useState('São Paulo');
  const [tituloDescricao, setTituloDescricao] = useState('Consulta de Temperatura');

  const callApi = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&units=metric&appid=777fd6c175f16899b669ab9b22be7638`)
      .then((resposta) => {
        return resposta.json();
      })
      .then((dadoTemperatura) => {
        setDescricao(dadoTemperatura.weather[0].description);
        setStateTemperatura(dadoTemperatura.main.temp);
        setTituloDescricao(`Temperatura em ${cidade}`);
      })
      .catch(() => {
        alert('Cidade não encontrada');
        setTituloDescricao('Consulta de Temperatura');
      });
  }

  const dadoEntrada = (evento) => {
    setCidade(evento.target.value);
  }

  return (
    <div className="App">
      <Titulo descricao={tituloDescricao} />
      <input type='text' onChange={dadoEntrada} placeholder="Digite a cidade"></input>
      <button onClick={callApi}>Buscar</button>
      <Card 
        diaDaSemana="Hoje" 
        cidade={cidade} 
        temperatura={stateTemperatura} 
        descricao={descricao} 
      />
    </div>
  );
}

export default App;