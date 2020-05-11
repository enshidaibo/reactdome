
import React from "react";
import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';

import Images from "./Images/Images";
import Video from "./Video/Video";
import Audio from "./Audio/Audio";

const vmsDataMng = ({ resourceType = 'image', multiple = false, ...props }) => {
    return (
        <ContentLayout>
            <RightContent style={{ padding: 0 }}>
                {resourceType == "image" && <Images multiple={multiple} {...props} />}
                {resourceType == "video" && <Video multiple={multiple} {...props} />}
                {resourceType == "audio" && <Audio multiple={multiple} {...props} />}
            </RightContent>
        </ContentLayout>
    );
}

export default vmsDataMng