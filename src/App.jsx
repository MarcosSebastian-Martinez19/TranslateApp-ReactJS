import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("af");
  const [from, setFrom] = useState("af");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source", from);
    encodedParams.append("target", to);
    encodedParams.append("q", input);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '2b52a82fa0msh69e378a5c1ac0c9p195fb0jsnc811c5a3d186',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
      .then(response => response.json())
      .then(response => setOutput(response.data.translations[0].translatedText))
      .catch(err => console.error(err));
  }

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '2b52a82fa0msh69e378a5c1ac0c9p195fb0jsnc811c5a3d186',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
      .then(response => response.json())
      .then(response => setOptions(response.data.languages))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className="App">
      <div className='header'>
        <p>From ({from}):</p>
        <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt => <option key={opt.language} value={opt.language}>{opt.language}</option>)}
        </select>
        <p>To ({to}):</p>
        <select onChange={e => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.language} value={opt.language}>{opt.language}</option>)}
        </select>
      </div>
      <div className='output'>
        <div>
          <textarea rows="8" cols="50" onChange={(e) => setInput(e.target.value)}></textarea>
        </div>
        <div>
          <textarea rows="8" cols="50" value={output}></textarea>
        </div>
      </div>
      <div>
        <button onClick={e => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
