import React from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router";
import { useState } from "react";
import SectionsServices from "../httpServices/Sections.services";
import { useEffect } from "react";
import { imageURL } from "../index";
import i18n from "../Translation/i18n";

const SingleSectionPage = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState();
  useEffect(() => {
    SectionsServices.getSingleSection("section/getById", sectionId).then(
      (res) => {
        if (res?.section) {
          setSection(res.section);
        }
      }
    );
  }, []);
  const arabibTypes = {
    slider: "المنزلق",
    banner: "بانر",
    aboutus: "معلومات عننا",
    privacy: "سياسة الخصوصية",
  };

  return (
    <div>
      <Layout>
        <div className="p-3">
          <div
            className="bg-white"
            style={{
              padding: "30px",
            }}
          >
            {section ? (
              <div className="row ">
                <div
                  className="col-lg-6 col-sm-12 py-5 order-2 order-lg-1 "
                  id="dive"
                >
                  <h3
                    style={{
                      wordBreak: "break-word",
                      textTransform: "capitalize",
                    }}
                  >
                    {section[`title_${i18n.language}`]}
                  </h3>

                  <p
                    style={{
                      wordBreak: "break-word",
                      marginTop: "20px",
                      fontSize: "20px",
                    }}
                  >
                    {section[`description_${i18n.language}`]}
                  </p>
                  <div className="d-flex align-items-center gap-2 justify-content-start ">
                    <p class="m-0">
                      {" "}
                      {i18n.language === "en"
                        ? "Section type: "
                        : "نوع القسم: "}{" "}
                    </p>
                    <h4
                      style={{
                        wordBreak: "break-word",
                        color: "#C0924D",
                        margin: 0,
                      }}
                    >
                      {i18n.language === "en"
                        ? section.type
                        : arabibTypes[section.type]}
                    </h4>
                  </div>
                </div>
                <div className=" col-lg-6 col-sm-12 d-flex justify-content-center order-1 order-lg-2 ">
                  <img
                    src={`${imageURL}/${section.image}`}
                    alt={section[`title_${i18n.language}`]}
                    style={{
                      height: "30vh",
                      width: "400px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                class="d-flex align-items-center justify-content-center"
                style={{ height: "30vh" }}
              >
                <h4>Loading...</h4>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SingleSectionPage;
