import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]); // Initializing slides as an empty array
  const [showForm, setShowForm] = useState(false);
  const [newSlide, setNewSlide] = useState({ image: null, linkTo: "" });
  const [categoriesList, setCategoriesList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const slideInterval = 3000;

  useEffect(() => {
    // Fetch existing slides
    axios
      .get(`${BASE_URL}/get-sliders`, { withCredentials: true })
      .then((response) => {
        console.log("slider", response.data);
        setSlides(response.data || []); // Ensure it is always an array
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
      });

    // Fetch categories for dropdown
    axios
      .get(`${BASE_URL}/get-categoriesList`, { withCredentials: true })
      .then((response) => {
        setCategoriesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // Only runs on mount

  const handleDeleteSlide = (slideId) => {
    console.log('slider is',slideId);
    
    setDeleteLoading(true)
    axios
      .post(`${BASE_URL}/delete-slider/${slideId}`, { withCredentials: true })
      .then((response) => {
        setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== slideId));
        setDeleteLoading(false)
        console.log("Slide deleted", response);
      })
      .catch((error) => {
        setDeleteLoading(false)
        console.error("Error deleting slide:", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSlide({ ...newSlide, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Show a preview
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlide({ ...newSlide, [name]: value });
  };

  const handleAddSlide = () => {
    if (newSlide.image && newSlide.linkTo) {
      const formData = new FormData();
      formData.append("image", newSlide.image);
      formData.append("linkTo", newSlide.linkTo);
      setSaveLoading(true)
      axios
        .post(`${BASE_URL}/add-slider`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
         console.log('added res',response);
         
          setSlides(response.data.slides); // Add the new slide to the list
          setNewSlide({ image: null, linkTo: "" });
          setPreviewImage(null);
          setShowForm(false);
          setSaveLoading(false)
        })
        .catch((error) => {
          setSaveLoading(false)
          console.error("Error adding slide:", error);
        });
    } else {
      setSaveLoading(false)
      alert("Please upload an image and select a link.");
    }
  };

  return (
    <div>
      {/* Slider Section */}
      <div className="mb-4">
        <h3 className="text-xl font-bold">Slides List</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Link To</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(slides) &&
              slides.map((slide, index) => (
                <tr key={slide.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{slide.linkTo}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {deleteLoading ?

                      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                      </svg>
                      :
                      <button
                        onClick={() => handleDeleteSlide(slide._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add Slide Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Close Form" : "Add New Slide"}
        </button>
      </div>

      {/* Add New Slide Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-md p-4 mt-4 max-w-xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Add New Slide</h3>

          <label className="block text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />

          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}

          <label className="block text-gray-700 mb-2">Link To</label>
          <select
            name="linkTo"
            value={newSlide.linkTo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Select a category</option>
            {categoriesList.length > 0 ? (
              categoriesList.map((category, index) => (
                <option key={index} value={category.linkTo}>
                  {category.name || category}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
          {saveLoading ?
            <button type="button" class="bg-indigo-500 text-white px-4 py-2 flex items-center" disabled>
              <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                Adding...
                </svg>
            </button>
            :
            <button
              onClick={handleAddSlide}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Slide
            </button>
          }
        </div>
      )}
    </div>
  );
}

export default Slider;
