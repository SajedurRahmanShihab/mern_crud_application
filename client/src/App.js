import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const sendData = () => {
    Axios.post("http://localhost:3002/insert", { cameraName: name, cameraPrice: price })
  }
  return (
    <div className="App">
      <h3>Camera Information</h3>
      <input type="text" name="" id="" placeholder='Camera Name...' onChange={(e) => {
        setName(e.target.value);
      }} />
      <br />
      <input type="number" name="" id="" placeholder='Camera Price...' onChange={(e) => {
        setPrice(e.target.value);
      }} />
      <br />
      <button onClick={sendData}>Insert</button>

    </div>
  );
}

export default App;
