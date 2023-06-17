import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import styles from "./sections.module.css";
import SectionsServices from "../httpServices/Sections.services";
import SectionCard from "./SectionCard";
import FilterSections from "./FilterSections";
import SectionsByTypes from "./SectionsByTypes";
import { Link } from "react-router-dom";
const Sections = () => {
  const sectionTypes = ["slider", "aboutus", "privacy", "banner"];
  return (
    <div>
      <Layout>
        <div className="p-3">
          <div className="bg-white px-3 py-5 row d-flex justify-content-lg-start justify-content- p-2 ">
            <div className="d-flex justify-content-end">
              <Link
                to="/sections/add"
                className="btn btn-warning text-white mx-3 "
              >
                {i18n.language === "en" ? `Add Section` : `إضافة قسم`}
              </Link>
            </div>
            {sectionTypes &&
              sectionTypes?.map((secType) => (
                <SectionsByTypes secType={secType} styles={styles} />
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Sections;
