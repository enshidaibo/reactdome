import { Block } from "slate";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";

const schema = {
    document: {
        last: { types: ["paragraph"] },
        first: { types: ["paragraph", "h1", "h2", "section", "table"] },
        normalize: (change, reason, { node }) => {
            const paragraph = Block.create("paragraph");
            switch (reason) {
            case "first_child_type_invalid":
                // return change.setNodeByKey(child.key, 'paragraph')
                return change.insertNodeByKey(node.key, 0, paragraph);
                // case LAST_CHILD_TYPE_INVALID:
                //     // const paragraph = Block.create("paragraph");
                //     return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
                // }
                // return change
            case LAST_CHILD_TYPE_INVALID:
                return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
            }
        }
    }
};

export default schema;