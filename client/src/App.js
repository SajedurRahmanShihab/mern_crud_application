import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [cameraList, setCameraList] = useState([]);
  const [cameraName, setCameraName] = useState('');
  const [cameraPrice, setCameraPrice] = useState(0);
  // hook for update
  const [newCameraName, setNewCameraName] = useState('');

  // delete Camera
  const deleteCamera = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`)
  }

  // function to update camera
  const updateCamera = (id, cameraName) => {
    if (newCameraName === cameraName) {
      alert('Same Name Can not be updated. Try different One');
      return;
    }
    // console.log(id, newCameraName);
    Axios.put("http://localhost:3002/update", {
      id: id, newCameraName: newCameraName
    })
  }

  // send date to mongodb
  const sendData = () => {
    Axios.post('http://localhost:3002/insert', {
      cameraName: cameraName, cameraPrice: cameraPrice
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3002/read").then((response) => {
      setCameraList(response.data)
    })
  })

  return (
    <div className="App">
      <h1>Insert Camera Information</h1>
      <input
        onChange={(e) => {
          setCameraName(e.target.value)
        }}
        type="text"
        name="" id=""
      />
      <input
        onChange={(e) => {
          setCameraPrice(e.target.value)
        }}
        type="text"
        name="" id=""
      />
      <button onClick={sendData}>Insert</button>
      <h1>Camera Inventory</h1>
      {
        cameraList.map((val, key) => {
          return (
            <div key={key} style={{ border: '4px solid blue', margin: '5px', padding: '15px' }}>
              <h1>Camera Name: {val.cameraName}</h1>
              <h1>Camera Price: {val.cameraPrice}</h1>
              <input
                type="text"
                name=""
                id=""
                placeholder='New Camera Name...'
                onChange={(e) => {
                  setNewCameraName(e.target.value)
                }}
              />
              <button onClick={() => {
                updateCamera(val._id, val.cameraName)
              }}>Update</button>
              <button onClick={() => {
                deleteCamera(val._id)
              }}>Delete</button>
            </div>
          )
        })
      }

    </div>
  );
}

export default App;
