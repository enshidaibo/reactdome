import { Block } from "slate";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";

const schema = {
    document: {
        last: { types: ["paragraph"] },
        normalize: (change, reason, { node }) => {
            switch (reason) {
            case LAST_CHILD_TYPE_INVALID:
                const paragraph = Block.create("paragraph");
                return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
            }
        }
    }
};

export default schema;