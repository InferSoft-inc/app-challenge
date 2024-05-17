"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [query, setQuery] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ user: string, bot: string }[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [querying, setQuerying] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setFiles(null);  // Clear selected files after successful upload
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async () => {
    setQuerying(true);
    try {
      const response = await axios.get(`http://localhost:8000/execute_query`, {
        params: {
          query,
        },
      });
      const botResponse = response.data.answer;
      setChatHistory([...chatHistory, { user: query, bot: botResponse }]);
      setQuery("");
    } catch (error) {
      console.error("Error fetching query results:", error);
    } finally {
      setQuerying(false);
    }
  };

  const handleResetChat = () => {
    setChatHistory([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-black">InferSoft Document Analysis</h1>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4 text-black">Upload Documents</h2>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4 w-full border p-2 rounded"
          />
          {files && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-black">Selected Files:</h3>
              <ul className="list-disc list-inside bg-gray-50 p-4 rounded">
                {Array.from(files).map((file, index) => (
                  <li key={index} className="text-black">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleUpload}
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4 text-black">Chat with Bot</h2>
          <div className="mb-4 h-64 overflow-y-auto border p-4 rounded bg-gray-50">
            {chatHistory.map((chat, index) => (
              <div key={index} className="mb-4">
                <div className="text-right">
                  <p className="bg-green-200 inline-block p-2 rounded text-black">{chat.user}</p>
                </div>
                <div className="text-left">
                  <p className="bg-blue-200 inline-block p-2 rounded text-black">{chat.bot}</p>
                </div>
              </div>
            ))}
          </div>
          <textarea
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter your query"
            className="mb-4 w-full border p-2 rounded text-black"
            rows={4}
          />
          <button
            onClick={handleQuerySubmit}
            className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 ${querying ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={querying}
          >
            {querying ? "Querying..." : "Submit Query"}
          </button>
          <button
            onClick={handleResetChat}
            className="w-full mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Reset Chat
          </button>
        </div>
      </div>
    </main>
  );
}
