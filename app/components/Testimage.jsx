"use client";
import React, { useState, useEffect } from "react";

const Testimage = () => {
  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/Testimage");
      //console.log("Response" , response.json());
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data", data );
      setUploadedImages(data.images || []);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setError("Failed to load images");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormdata({
      Title: "",
      Description: "",
    });
    setImageFile(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("Title", formdata.Title);
      formData.append("Description", formdata.Description);
      if (imageFile) {
        formData.append("Image", imageFile);
      }

      const response = await fetch("/api/Testimage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with:", response.status, errorText);
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage("Image uploaded successfully!");
      fetchImages(); // Refresh the image list after upload
      resetForm();
    } catch (error) {
      console.error("Upload error:", error);
      setError(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Test Image</h2>

      {message && (
        <div className={`p-4 mb-4 ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded-md`}>
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="Title">Title</label>
          <input 
            id="Title"
            type="text" 
            name="Title" 
            value={formdata.Title} 
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" 
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="Description">Description</label>
          <textarea
            id="Description"
            name="Description" 
            value={formdata.Description} 
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="Image">Image</label>
          <input 
            id="Image"
            type="file" 
            name="Image" 
            onChange={handleFileChange}
            className="w-full" 
            accept="image/*"
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-blue-300"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
      
      {uploadedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Uploaded Images</h3>
          <div className="grid grid-cols-1 gap-4">
            {uploadedImages.map((img) => (
              <div key={img.id} className="p-4 border rounded-md">
                <h4 className="font-bold">{img.title}</h4>
                <p className="text-sm text-gray-600">{img.description}</p>
                <p className="text-xs text-gray-500 mb-2">ID: {img.id}</p>
                <div className="mt-2">
                  <img 
                    src={`/api/Testimage/${img.id}`} 
                    alt={img.title}
                    className="w-full h-auto rounded-md border"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(img.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimage;