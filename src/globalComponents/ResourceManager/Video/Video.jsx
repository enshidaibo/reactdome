import React, { Component } from "react";
import UploadFilesBox from "./UploadFilesBox";
import VideoBox from "./VideoBox";
import WarpperBox from "../Components/WarpperBox";

const Video = props => {
    return (
        <WarpperBox type={1} resourceType={"video"} {...props} UploadFilesBox={UploadFilesBox} DetailBox={VideoBox} />
    );
};

export default Video;
