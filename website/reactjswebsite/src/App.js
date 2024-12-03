import React, { useState } from "react";
import FileList from "./components/FileList";
import GraphViewer from "./components/GraphViewer";
import AddDataForm from "./components/AddDataForm";
import FilePreview from "./components/FilePreview"
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <FileList setSelectedFile={setSelectedFile} />
      {selectedFile && <GraphViewer filename={selectedFile} />}
      {selectedFile && <FilePreview selectedFile={selectedFile} />}
      <AddDataForm />
    </div>
  );
}

export default App;
