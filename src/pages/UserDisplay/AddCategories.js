import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const AddCategories = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [newCategory, setNewCategory] = useState({
        Name: "",
        Image: "",
        LinkTo: "",
    });
    const [error, setError] = useState("");
    const [imageDimensions, setImageDimensions] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false)
    const navigate = useNavigate()

    // Fetch categories on component mount
    useEffect(() => {
        axios
            .get(`${BASE_URL}/get-categoriesList`, { withCredentials: true })
            .then((response) => {
                
                setCategoriesList(response.data); // Assuming the response is an array of categories
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width === 225 && img.height === 225) {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        canvas.width = 135;
                        canvas.height = 135;
                        ctx.drawImage(img, 0, 0, 135, 135);
                        const resizedImage = canvas.toDataURL("image/png");
                        setNewCategory({ ...newCategory, Image: resizedImage });
                        setError("");
                        setImageDimensions(null);
                        setImagePreview(resizedImage);
                    } else {
                        setImageDimensions({ width: img.width, height: img.height });
                        setError("Image must be 225x225 px.");
                        setImagePreview(null);
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCategory = () => {
        if (newCategory.Name && newCategory.Image && newCategory.LinkTo) {
            // Prepare FormData object
            setSaveLoading(true)
            const formData = new FormData();
            formData.append("Name", newCategory.Name);
            formData.append("image", newCategory.Image); // Append image file
            formData.append("LinkTo", newCategory.LinkTo);

            // Send the FormData to the server
            axios
                .post(`${BASE_URL}/add-categories`, formData, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    setSaveLoading(false)
                    setNewCategory({ Name: "", Image: "", LinkTo: "" });
                    setImagePreview(null);
                    alert('Category added successfull')
                    navigate('/edit-user-display')
                    console.log("Category added successfully:", response);
                })
                .catch((error) => {
                    setSaveLoading(false)
                    console.error("Error adding category:", error);
                    alert('Something went wrong ')
                });
        } else {
            setSaveLoading(false)
            alert("Please fill all fields.");
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>

            {/* Add Category Form */}
            <div className="bg-white shadow-md rounded-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Category Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={newCategory.Name}
                            onChange={handleInputChange}
                            placeholder="Enter category name"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {error && (
                            <p className="text-red-500 mt-2">
                                {error}{" "}
                                {imageDimensions && (
                                    <span>
                                        (Actual size: {imageDimensions.width}x{imageDimensions.height} px)
                                    </span>
                                )}
                            </p>
                        )}
                        {/* Display image preview if valid */}
                        {imagePreview && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Image Preview</h3>
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4 mb-6">
                        <label className="block text-gray-700">Link To</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={newCategory.LinkTo}
                            onChange={handleInputChange}
                            name="LinkTo"
                        >
                            <option value="">Select a category</option>
                            {categoriesList.length > 0 ? (
                                categoriesList.map((category, index) => (
                                    <option key={index} value={category.linkTo}>
                                        {category}
                                    </option>
                                ))
                            ) : (
                                <option value="">No categories available</option>
                            )}
                        </select>
                    </div>

                    {saveLoading ?
                       <button
                       onClick={handleAddCategory}
                       className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                   >
                       <div class="border-t-4 border-white border-solid w-4 h-4 rounded-full animate-spin"></div>
                    </button>
                      :

                        <button
                            onClick={handleAddCategory}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Save Category
                        </button>

                    }
                </div>
            </div>

            {/* Display Categories */}

        </div>
    );
};

export default AddCategories;
