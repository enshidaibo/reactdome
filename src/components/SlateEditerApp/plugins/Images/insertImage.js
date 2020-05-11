/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */
import { Value } from 'slate'

const createDoc = data => {
    const doc = {
        document: {
            nodes: [{
                object: "block",
                type: "figure",
                nodes: [{
                    object: "block",
                    type: "image",
                    isVoid: true,
                    data
                }, {
                    object: "block",
                    type: "figcaption",
                }]
            }]
        }
    }
    const { document } = Value.fromJSON(doc);
    return document
}

const insertImage = (change, info, target) => {
    if (target) {
        change.select(target);
    }
    const { value } = change;
    const { startBlock } = value
    if (startBlock.type == 'image') {
        let data = startBlock.data.toJSON();
        change.setNodeByKey(startBlock.key, { data: { ...data, ...info } })
    } else if (startBlock.type == 'figcaption') {
        return
    } else {
        let doc = createDoc(info)
        change.insertFragment(doc)
    }
};

export default insertImage;