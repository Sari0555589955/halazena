import React from "react";
import Layout from "../Layout/Layout";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Privacy from "./Privacy";
import Slider from "./Slider";
import i18n from "../Translation/i18n";

const SiteAttachments = () => {
 


  return (
    <Layout>
      <div className="m-5 ">
        <h3>{i18n.language === "en" ? `Site Attachments` : `محتوى الموقع`}</h3>
        
          <Slider/>
          
          <Banner/>

          <AboutUs/>

          <Privacy/>

         
      </div>
    </Layout>
  );
};

export default SiteAttachments;
