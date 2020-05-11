import _widgets from "../components/fields";

const initFields = ['boolean', 'string', 'number', 'integer', 'array']

const getWidgets = (customFields = {}) => {
    let _customFields = {}
    Object.keys(customFields)
        .filter(key => !initFields.includes(key))
        .map(d => {
            _customFields[d] = customFields[d]
        })
    return { ..._widgets, ..._customFields }
}

export default getWidgets