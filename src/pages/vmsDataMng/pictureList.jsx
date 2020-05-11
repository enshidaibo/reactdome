import VmsDataMng from "@/globalComponents/ResourceManager/vmsDataMng";
const pictureList = () => {
    return <VmsDataMng resourceType="image" multiple={true} />;
};
export default pictureList;
