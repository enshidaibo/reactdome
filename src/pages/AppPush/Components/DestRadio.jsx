import { Radio, Icon } from "antd";

const DestIcon = ({ type }) => {
    return <Icon type={type} theme="outlined" style={{ fontSize: "16px", marginRight: "4px" }} />
}

const DestRadio = ({ onChange, value }) => {
    return <Radio.Group
        onChange={onChange}
        value={value}
        buttonStyle="solid"
        style={{ marginBottom: 8 }}
    >
        <Radio.Button value={1}>
            <DestIcon type="apple" /> 
            推送至IOS设备
        </Radio.Button>
        <Radio.Button value={0}>
            <DestIcon type="android" />
            推送至安卓设备
        </Radio.Button>
        <Radio.Button value={2}>
            <DestIcon type="apple" />
            <DestIcon type="android" />
            推送至双设备
        </Radio.Button>
    </Radio.Group>
}

export default DestRadio