import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { IoIosEye } from "react-icons/io";
import i18n from "../Translation/i18n";
import { imageURL } from "..";
import SectionsServices from "../httpServices/Sections.services";
const SectionCard = ({ section, styles, mutateDelete }) => {
  const navigate = useNavigate();
  const deleteSection = () =>
    SectionsServices.deleteSection("section/delete", section._id).then(
      (res) => {
        if (res?.data) {
          mutateDelete(res.data.section._id);
        }
      }
    );

  return (
    <div
      className={`card-group col-xl-2 col-lg-3 col-md-4 col-8 m-3 ${styles.Card}`}
      key={section._id}
    >
      <div className={styles.Hover}>
        <div className="d-flex bg-light flex-column" style={{}}>
          <Link to={`/sections/edit/${section._id}`}>
            <TbEdit className="my-1 text-primary fs-6" />
          </Link>
          <AiFillDelete
            style={{ cursor: "pointer" }}
            onClick={deleteSection}
            className="my-1 text-danger fs-6"
          />
          <Link to={`/sections/${section._id}`}>
            <IoIosEye className="my-1 text-info w-100 fs-6" />
          </Link>
        </div>
      </div>
      <div
        className="card"
        style={{
          // height: "270px",
        }}
      >
        <Link
          to={`/sections/${section._id}`}
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${imageURL}/${section.image}`}
            className="card-img-top"
            alt={section[`title_${i18n.language}`]}
            style={{
              height: "200px",
            }}
          />
          {section.type !== "banner" && (
            <div className="card-body">
              <h6 className="card-text">{section[`title_${i18n.language}`]}</h6>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SectionCard;
