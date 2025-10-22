import React, { useState } from "react";
import Header from "../components/Header";
import FileUploader from "../components/FileUploader";

import Styles from "../styles/pages/Home.module.css";

export default function HomePage() {
    let [imageUrl, setImageUrl] = useState("default.jpeg");

    function handleImageChange(newImage) {
        console.log("Image changed:", newImage);
        setImageUrl(newImage);
    }

    return <div className={Styles.homePageContainer}>
        <Header
            title="Filtero"
            subtitle="Filter any image to your desire"
            buttonText="Pages"
            menuItems={[
                { title: "Home", link: "/" },
                { title: "About", link: "/about" },
                { title: "Contact", link: "/contact" }
            ]}
        />
        <div className="spacer"></div>
        <div className={Styles.content}>
            <div className={Styles.contentLeft}>
                <img className={Styles.homeContentImage} src={imageUrl} alt="image" />
            </div>
            <FileUploader onImageChange={handleImageChange} />  {/* Inside file uploader are all the buttons*/}
        </div>
    </div>;
}