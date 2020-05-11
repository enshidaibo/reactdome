import React, { Component } from "react";
import UploadFilesBox from "./UploadFilesBox";
import AudioBox from "./AudioBox";
import WarpperBox from "../Components/WarpperBox";

const Audio = props => {
    return (
        <WarpperBox type={2} resourceType={"audio"} {...props} UploadFilesBox={UploadFilesBox} DetailBox={AudioBox} />
    );
};

export default Audio;
