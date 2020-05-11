import { Input } from 'antd';
const { TextArea } = Input;

const index = ({ name, value, onChange, ...d }) => {
    return <TextArea value={value || ''} onChange={e => onChange({ [name]: e.target.value })} autosize={{ minRows: 2, maxRows: 6 }} />
}

export default index