import SubjectAddOrEdit from './SubjectAddOrEdit'
import { addSubjectDetail } from './services';
import { message } from 'antd';

const initValue = { name: '', tplKey: 'template_1', struct: [], platesObject: {} }
const SubjectAdd = ({ history }) => {
    const handleSubmit = async (data) => {
        let { platesObject, struct, ...rest } = data
        let content = {}
        struct.map(d => {
            content[d.name] = platesObject[d.name]
        })
        let res = await addSubjectDetail({ ...rest, struct, content: JSON.stringify(content) })
        if (res.success) {
            message.success('保存成功！')
            history.replace('/subject')
        }
    }
    return <SubjectAddOrEdit data={initValue} onSubmit={handleSubmit}></SubjectAddOrEdit>
}

export default SubjectAdd