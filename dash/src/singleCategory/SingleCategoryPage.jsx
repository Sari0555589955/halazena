import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router";
import CategoriesServices from "../httpServices/categories.services";
import { imageURL } from "..";

const SingleCategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState();
  useEffect(() => {
    CategoriesServices.getCategoryById("category/getById", categoryId).then(
      (res) => {
        if (res?.category) {
          setCategory(res.category);
        }
      }
    );
  }, []);
  console.log("category", category);
  return (
    <div>
      <Layout>
        <div className="p-3">
          <div className="bg-white p-4">
            {/* <img /> */}
            {category && (
              <div>
                <img src={`${imageURL}/${category.image}`} />
                <h2>{category.name_en}</h2>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SingleCategoryPage;
