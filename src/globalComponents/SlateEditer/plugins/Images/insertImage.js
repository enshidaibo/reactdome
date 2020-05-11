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
        let parent = value.document.getParent(startBlock.key);
        console.log(change)
        // console.log(parent)
        // console.log(parent.toJSON())
        // let doc = createDoc(info)
        // change.moveToEndOf(parent).insertFragment(doc).unwrapBlock('figure');
        change.moveToEndOf(parent)
            .splitBlock(parent.key)
            // .insertBlock({
            //     type: "figure",
            //     // nodes: [{
            //     //     object: "block",
            //     //     type: "image",
            //     //     isVoid: true,
            //     //     data: info
            //     // }, {
            //     //     object: "block",
            //     //     type: "figcaption",
            //     // }]
            // })
            // .unwrapBlock('figure')
            // // .moveToEndOfNextBlock()
            // // .moveToEndOfPreviousBlock()
            .moveToStart()
            .insertBlock({
                type: "image",
                isVoid: true,
                data: info
            })
        // .insertBlock('figcaption')
    } else {
        let doc = createDoc(info)
        change.insertFragment(doc)
    }
    // change.insertBlock({
    //         type: "image",
    //         isVoid: true,
    //         data: info
    //     })
    //     .wrapBlock('figure');
};

export default insertImage;