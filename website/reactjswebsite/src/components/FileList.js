import React, { useEffect, useState } from "react";

const FileList = ({ setSelectedFile }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("/list-files")
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  return (
    <div>
      <h2>Available Companies</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>
            <button onClick={() => setSelectedFile(file)}>{file}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
