import React from 'react';
import { Upload, Camera } from 'lucide-react';

const UploadImage = ({ onImageUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleCamera = () => {
    alert('Camera feature requires mobile integration. This would open the device camera to capture a chess position.');
  };

  return (
    <div className="bg-white border-4 border-black p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-black">Upload Chess Position</h2>
      <div className="space-y-6">
        <div className="border-4 border-dashed border-black p-12 text-center hover:bg-gray-100 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload size={48} className="mx-auto mb-4 text-black" />
            <p className="text-lg font-bold mb-2 text-black">Click to upload image</p>
            <p className="text-sm text-black">or drag and drop</p>
            <p className="text-xs text-black mt-2">PNG, JPG up to 10MB</p>
          </label>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-black"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-black font-bold">OR</span>
          </div>
        </div>

        <button 
          onClick={handleCamera}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition font-bold"
        >
          <Camera size={20} />
          Take Photo
        </button>

        <div className="border-2 border-black p-4">
          <p className="text-sm text-black">
            <strong>Note:</strong> Image recognition requires backend integration. This demo simulates the detection process. In production, uploaded images will be processed using computer vision to automatically detect piece positions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;