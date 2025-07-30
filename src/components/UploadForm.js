import { useState } from "react";
import { uploadFiles } from "../utils/api";

function UploadForm() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).slice(0, 3);
    const errors = newFiles
      .map((file) => validateFile(file))
      .filter((err) => err);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3));
  };

  const validateFile = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type))
      return "Invalid file type (PNG, JPG, PDF only)";
    if (file.size > maxSize) return "File size exceeds 2MB";
    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const newFiles = Array.from(e.dataTransfer.files).slice(0, 3);
    const errors = newFiles
      .map((file) => validateFile(file))
      .filter((err) => err);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    setStatus("uploading");
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    // Debug payload
    console.log("FormData payload:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value.name || value, value.size || "-");
    }

    try {
      const response = await uploadFiles(formData, {
        onUploadProgress: (progressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setProgress(percent);
        },
      });
      setStatus("success");
      setFiles([]);
      setProgress(0);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Upload error details:", {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response,
      });
      setStatus("error");
      alert(`Error uploading files: ${error.message || "Network issue"}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">File Upload Form</h1>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDrop={handleDrop}
        onDragLeave={() => setDragActive(false)}
        className={`border-2 border-dashed p-6 mb-4 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p>Drag & drop files here, or click to select</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Select Files
        </button>
      </div>
      <div className="mb-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center mb-2">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-16 h-16 object-cover mr-2"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mr-2">
                PDF
              </div>
            )}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={status === "uploading" || !files.length}
        className="w-full py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        Upload
      </button>
      {status === "uploading" && (
        <div className="mt-4">
          <progress value={progress} max="100" className="w-full" />
          <p className="text-center">{Math.round(progress)}%</p>
        </div>
      )}
      {status === "success" && (
        <p className="mt-4 text-green-500 text-center">Upload successful!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-500 text-center">Upload failed!</p>
      )}
    </div>
  );
}

export default UploadForm;
