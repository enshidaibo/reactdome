import vmsfetch from "./vmsfetch";

const errorNum = 3;
const vmsGetName = async (file, error = 0) => {
    let filename = file.name.split(".")[0];
    let res = await vmsfetch("v1/file_server/init_multi_upload", {
        params: {
            // token:'',
            filename
        }
    });
    if (res.success || error == errorNum) {
        return res;
    }
    return await vmsGetName(file, error + 1);
};

export default vmsGetName;