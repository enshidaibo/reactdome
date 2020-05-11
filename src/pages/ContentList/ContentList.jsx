import React, { Component, useState } from "react";
import Menubar from "@/components/ContentList/Menubar/Menubar";
import ContentList2 from "@/components/ContentList";
import ContentLayout, { RightContent } from '@/pages/A_Layout/ContentLayout';

import { useTitle } from '@/hooks/global'
const ContentList = ({ children }) => {
    const [item, setItem] = useState({});
    useTitle('内容列表')
    return <ContentLayout>
        <Menubar onChangeState={setItem} curItem={item} />
        <RightContent>
            {item.classify == undefined && <div>请在左侧选择内容列表</div>}
            {item.classify !== undefined && (
                <ContentList2 key={item.id} curItem={item} sectionId={item.id} />
            )}
        </RightContent>
        {children}
    </ContentLayout>
}
export default ContentList