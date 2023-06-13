import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import styles from "./sections.module.css";
import SectionsServices from "../httpServices/Sections.services";
import SectionCard from "./SectionCard";
import FilterSections from "./FilterSections";
const Sections = () => {
  const [sections, setSections] = useState();
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    SectionsServices.getAllSections(
      `section/getAll${type ? `?type=${type}` : ""}`
    )
      .then((res) => {
        if (res?.sections) {
          setSections(res.sections);
          setErrorMessage("");
        }
      })
      .catch((err) => {
        setErrorMessage(err?.response.data[`error_${i18n.language}`]);
        setSections();
      });
  }, [useState, type]);

  const filterSectionTypes = (type) => setType(type);

  const mutateDelete = (sectionId) => {
    return setSections((sections) =>
      sections.filter((sec) => sec._id !== sectionId)
    );
  };
  console.log("sections");
  return (
    <div>
      <Layout>
        <div className="p-3">
          <div className="bg-white px-3 py-5 row d-flex justify-content-lg-start justify-content- p-2 ">
            <FilterSections
              styles={styles}
              filterSectionTypes={filterSectionTypes}
            />
            {sections && !errorMessage ? (
              sections?.map((section) => (
                <SectionCard
                  section={section}
                  styles={styles}
                  mutateDelete={mutateDelete}
                />
              ))
            ) : (
              <h4 class="text-danger text-center">{errorMessage}</h4>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Sections;
