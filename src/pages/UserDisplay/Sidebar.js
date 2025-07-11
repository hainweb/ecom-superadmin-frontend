import React, { useState, useEffect } from "react";

// Content Components for the Right Side
import Categories from "./Categories";
import Slider from "./Slider";
import Offers from "./Offers";
import PremiumPage from "./Default";

function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("");
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This function handles category clicks
  const handleCategoryClick = (category) => {
    // If on desktop, update state normally
    if (!isMobile) {
      setActiveCategory(category);
      setIsSliderActive(category === "slider");
    } else {
      // On mobile, we forward the category click to PremiumPage
      // (for example, PremiumPage could use it for internal navigation)
      setActiveCategory(category)
      console.log("Mobile view: category click forwarded:", category);
      // Optionally, you can call any additional function here if needed
    }
  };

  // Render the right content. On mobile, we always show PremiumPage.
  const renderRightContent = () => {
  if (isMobile) {
    if (activeCategory) {
      switch (activeCategory) {
        case "categories":
          return <Categories />;
        case "slider":
          return <Slider />;
        case "offers":
          return <Offers />;
        default:
          return <PremiumPage handleCategoryClick={handleCategoryClick} />;
      }
    }
    return <PremiumPage handleCategoryClick={handleCategoryClick} />;
  }
  // Desktop rendering logic
  switch (activeCategory) {
    case "categories":
      return <Categories />;
    case "slider":
      return <Slider />;
    case "offers":
      return <Offers />;
    default:
      return <PremiumPage handleCategoryClick={handleCategoryClick} />;
  }
};


  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar: Render only on non-mobile */}
      {!isMobile && (
        <div
          className={`${
            isSliderActive ? "w-1/6" : "w-1/4"
          } fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-800 to-blue-700 shadow-2xl p-8 transition-all duration-300 overflow-y-auto`}
        >
          <h2 className="text-3xl font-extrabold text-white mb-10 tracking-wide">
            Premium
          </h2>
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => handleCategoryClick("categories")}
                className={`w-full text-left font-semibold py-3 px-5 rounded-xl transition-colors duration-200 ${
                  activeCategory === "categories"
                    ? "bg-white text-indigo-800 shadow-lg"
                    : "text-white hover:bg-indigo-600 hover:shadow-md"
                }`}
              >
                Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("slider")}
                className={`w-full text-left font-semibold py-3 px-5 rounded-xl transition-colors duration-200 ${
                  activeCategory === "slider"
                    ? "bg-white text-indigo-800 shadow-lg"
                    : "text-white hover:bg-indigo-600 hover:shadow-md"
                }`}
              >
                Slider
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("offers")}
                className={`w-full text-left font-semibold py-3 px-5 rounded-xl transition-colors duration-200 ${
                  activeCategory === "offers"
                    ? "bg-white text-indigo-800 shadow-lg"
                    : "text-white hover:bg-indigo-600 hover:shadow-md"
                }`}
              >
                Offers
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Right Side Content */}
      <div
        className={`${
          !isMobile ? (isSliderActive ? "ml-[16.66%]" : "ml-[25%]") : "ml-0"
        } flex-1 p-10 transition-all duration-300 overflow-y-auto`}
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          {renderRightContent()}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
