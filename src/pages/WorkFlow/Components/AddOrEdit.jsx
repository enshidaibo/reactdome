import React from 'react'
import JsonSchemaForm from '@/globalComponents/JsonSchemaForm'
import WorkFlow from './WorkFlow';
import jsonSchems from './jsonSchems';
import uiSchems from './uiSchems';

const Edit = ({ data, onChange, onSubmit }) => {
    return <JsonSchemaForm
        schema={jsonSchems}
        uiSchems={uiSchems}
        data={data}
        onChange={onChange}
        formLayout={{ wrapperCol: 14 }}
        onSubmit={onSubmit}
        customFields={{ workFlow: WorkFlow }}>
    </JsonSchemaForm>
}
export default Edit