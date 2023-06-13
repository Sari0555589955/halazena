import React from "react";
import i18n from "../Translation/i18n";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";

const FilterSections = ({ styles, filterSectionTypes }) => {
  const sectionsTypes = ["slider", "banner", "aboutus", "privacy"];
  const arabibTypes = {
    slider: "المنزلق",
    banner: "بانر",
    aboutus: "معلومات عننا",
    privacy: "سياسة الخصوصية",
  };

  return (
    <div className="row p-3 d-flex justify-content-lg-end justify-content-lg-end flex-md-row flex-column w-100">
   
      <div className=" d-flex flex-lg-row w-auto flex-column">
        <div className="dropdown m-1">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              backgroundColor: "#FFFAED",
              color: "#f8b407",
              padding: "5px 20px",
            }}
          >
            <FiFilter /> {i18n.language === "en" ? `Filter` : "تصنيف حسب"}
          </button>
          <ul className="dropdown-menu">
            {sectionsTypes.map((secType) => (
              <li
                style={{ cursor: "pointer" }}
                className="dropdown-item text-center"
                onClick={() => filterSectionTypes(secType)}
              >
                {i18n.language === "en" ? secType : arabibTypes[secType]}
              </li>
            ))}
            <li
              style={{ cursor: "pointer" }}
              className="dropdown-item text-center"
              onClick={() => filterSectionTypes()}
            >
              {i18n.language === "en" ? "all sections" : "جميع الأقسام"}
            </li>
          </ul>

          <Link to="/sections/add" className="btn btn-warning text-white mx-3 ">
            {i18n.language === "en" ? `Add Section` : `إضافة قسم`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterSections;
