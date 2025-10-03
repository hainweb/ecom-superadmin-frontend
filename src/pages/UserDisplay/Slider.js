import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSlide, setNewSlide] = useState({ image: null, linkTo: "" });
  const [categoriesList, setCategoriesList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const slideInterval = 3000;

  // Fetch slides and categories
  useEffect(() => {
    fetchSlides();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchSlides = () => {
    axios
      .get(`${BASE_URL}/get-sliders`, { withCredentials: true })
      .then((response) => setSlides(response.data || []))
      .catch((error) => console.error("Error fetching slides:", error));
  };

  const fetchCategories = () => {
    axios
      .get(`${BASE_URL}/get-categoriesList`, { withCredentials: true })
      .then((response) => setCategoriesList(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  // Auto slide
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, slideInterval);
      return () => clearInterval(interval);
    }
  }, [slides, slideInterval]);

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSlide((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlide((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSlide = async () => {
    if (!newSlide.image || !newSlide.linkTo) {
      alert("Please upload an image and select a link.");
      return;
    }
    setIsAdding(true);
    const formData = new FormData();
    formData.append("image", newSlide.image);
    formData.append("linkTo", newSlide.linkTo);
    try {
      const response = await axios.post(`${BASE_URL}/add-slider`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSlides(response.data.slides);
      setNewSlide({ image: null, linkTo: "" });
      setPreviewImage(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding slide:", error);
      alert("Something Went Wrong");
    } finally {
      setIsAdding(false);
    }
  };

  const confirmDeleteSlide = (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      handleDeleteSlide(id);
    }
  };

  const handleDeleteSlide = async (id) => {
    setIsDeleting(true);
    setDeletingId(id);
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-slider/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.status) {
        alert(response.data.message);
        setSlides((prev) => prev.filter((slide) => slide.id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Something Went Wrong");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  // UI
  return (
    <div>
      {/* Slider Display */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={slide.id || index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          ))}
        </div>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 w-8 rounded-full transition-all ${activeIndex === i ? "bg-white" : "bg-white/50"}`}
            ></button>
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={() => setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          &#8592;
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>

      {/* Add Slide Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Close Form" : "Add New Slide"}
        </button>
      </div>

      {/* Slides Table */}
      {!showForm && (
        <div className="mt-6 max-w-4xl mx-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Link To</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide, index) => (
                <tr key={slide.id || index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-54 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{slide.linkTo}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => confirmDeleteSlide(slide.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      disabled={isDeleting && deletingId === slide.id}
                    >
                      {isDeleting && deletingId === slide.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Slide Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-md p-4 mt-4 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Add New Slide</h3>
          <label className="block text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
          )}
          <label className="block text-gray-700 mb-2">Link To</label>
          <select
            name="linkTo"
            value={newSlide.linkTo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Select a category</option>
            {categoriesList.map((category, index) => (
              <option key={index} value={category.linkTo}>
                {category.name || category}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddSlide}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Slide"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Slider;
