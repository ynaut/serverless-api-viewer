import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const getImages = async query => {
  const url = "http://localhost:8787";

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    header: { 'Content-type': 'application/json' }
  })

  return resp.json();
}

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  
  const search = async () => {
    const response = await getImages(query);
    setImages(response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button onClick={() => search()} type="button">Search</button>
        <div style={{ display: "flex", width: "100%"}}>
        {images.map(img => <img key={`${img.id}`} width="200" height="200" style={{marginTop: 10 }} src={img.image} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
