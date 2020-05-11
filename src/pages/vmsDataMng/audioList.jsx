import VmsDataMng from "@/globalComponents/ResourceManager/vmsDataMng";
const audioList = () => {
    return <VmsDataMng resourceType="audio" multiple={true} />;
};
export default audioList;
