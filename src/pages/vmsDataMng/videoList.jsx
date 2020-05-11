import VmsDataMng from "@/globalComponents/ResourceManager/vmsDataMng";
const videoList = () => {
    return <VmsDataMng resourceType="video" multiple={true} />;
};
export default videoList;
