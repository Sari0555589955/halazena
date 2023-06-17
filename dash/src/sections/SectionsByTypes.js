import React, { useEffect, useState } from "react";
import SectionsServices from "../httpServices/Sections.services";
import i18n from "../Translation/i18n";
import SectionCard from "./SectionCard";
const SectionsByTypes = ({ secType, styles }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [sections, setSections] = useState();
  useEffect(() => {
    SectionsServices.getAllSections(
      `section/getAll${secType ? `?type=${secType}` : ""}`
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
  }, []);
  const arabibTypes = {
    slider: "المنزلق",
    banner: "بانر",
    aboutus: "معلومات عننا",
    privacy: "سياسة الخصوصية",
  };
  const mutateDelete = (sectionId) => {
    return setSections((sections) =>
      sections.filter((sec) => sec._id !== sectionId)
    );
  };
  return (
    <div key={secType}>
      <h4> {i18n.language === "en" ? secType : arabibTypes[secType]} </h4>
      <div className="bg-white px-3 py-5 row d-flex justify-content-lg-start justify-content- p-2 ">
        {sections?.length > 0 && !errorMessage
          ? sections.map((section) => (
              <SectionCard
                section={section}
                styles={styles}
                mutateDelete={mutateDelete}
              />
            ))
          : undefined}
      </div>
    </div>
  );
};

export default SectionsByTypes;
