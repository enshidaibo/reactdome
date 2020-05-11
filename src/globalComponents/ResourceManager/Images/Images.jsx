import React, { Component } from "react";
import UploadFilesBox from "./UploadFilesBox";
import ImagesBox from "./ImagesBox";
import WarpperBox from "../Components/WarpperBox";

const Images = props => {
    return (
        <WarpperBox type={0} resourceType={"image"} {...props} UploadFilesBox={UploadFilesBox} DetailBox={ImagesBox} />
    );
};

export default Images;
