import { Icon } from "antd";

const Icons = ({ type }) => {
    return <Icon type={type} theme="outlined" style={{ fontSize: "18px" }} />
}

const Platform = ({ dest = 2 }) => {
    if (dest == 2) {
        return (
            <span>
                <Icons type="apple" />
                <Icons type="android" />
            </span>
        );
    } else if (dest == 0) {
        return <Icons type="android" />;
    } else if (dest == 1) {
        return <Icons type="apple" />;
    }
};

export default Platform