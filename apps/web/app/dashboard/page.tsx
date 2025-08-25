"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first!");
    if (!jobDescription.trim()) return alert("Please enter a job description!");

    // TODO: Implement actual upload logic
    alert(`Uploading: ${file.name}\nJob Description: ${jobDescription}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black h-screen w-screen flex justify-center items-center">
      <div className="h-auto w-[45vw] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Upload Resume</h1>
          <p className="text-gray-400 mt-1">Enter job description below</p>
        </div>

        {/* File preview */}
        <div className="h-24 w-full border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center text-gray-300 text-sm">
          {file ? (
            <p className="text-gray-100 font-medium">{file.name}</p>
          ) : (
            <p>No file selected</p>
          )}
        </div>

        {/* File input */}
        <label className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 transition text-center">
          Choose File
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Job description input */}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description..."
          className="w-full h-28 p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 outline-none resize-none"
        />

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 transition disabled:opacity-50"
          disabled={!file || !jobDescription.trim()}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
