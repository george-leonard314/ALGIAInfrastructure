import React, { useState, useEffect } from "react";

const FilePreview = ({ selectedFile }) => {
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      fetchPreviewData(selectedFile);
    }
  }, [selectedFile]);

  const fetchPreviewData = async (filename) => {
    setLoading(true);
    try {
      const response = await fetch(`/get-preview/${filename}`);
      const data = await response.json();
      setPreviewData(data);
    } catch (error) {
      console.error("Error fetching preview data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>File Preview: {selectedFile}</h2>
      {loading ? (
        <p>Loading preview...</p>
      ) : previewData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(previewData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No preview data available.</p>
      )}
    </div>
  );
};

export default FilePreview;
