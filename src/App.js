import { useState } from "react";
import axios from 'axios';
function App(){

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg,setMsg] = useState(null);

  function handleUpload(){
    if (!file){
      console.log("NO file Selected");
      return;

    }
    const fd= new FormData();
    fd.append('file', file);
    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState, started: true}
    })
    axios.post('http://httpbin.org/post', fd,{
      onUploadProgress: (progressEvent) => { setProgress(prevState => {
        return {...prevState, pc: progressEvent.progress * 100}
        })   }, 
      headers: {
        "Custom-Header": "value",
      }

    })
    .then(res => {
      setMsg("Uploaded Successfully");
      console.log(res.data)
    })
    .catch(err => {
      console.log("Upload Failed");
      console.log(err)});

  }
  return (
    <div className="App">
      <h1>Uploading Files</h1>
      <input onChange={(e) => {setFile(e.target.files[0])}} type="file" ></input>
      <button onClick={ handleUpload }>Upload</button>
      { progress.started && <progress max="100" value={progress.pc}></progress>}
      { msg && <span>{msg}</span>}
    </div>
  );
}

export default App;
