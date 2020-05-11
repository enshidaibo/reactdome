const aligns = {
    left: {
        textAlign: "left"
    },
    right: {
        textAlign: "right",
        textIndent: 0
    },
    center: {
        textAlign: "center",
        textIndent: 0
    },
    justify: {
        textAlign: "justify",
        textIndent: 0
    }
};

const nodes = ["paragraph", "image"];

const changeAlign = (change, info, target) => {
    if (target) {
        change.select(target);
    }
    let { node, align } = info;
    // if (node.type !== "paragraph" && node.type !== "image") {
    //     return;
    // }
    if (!nodes.includes(node.type)) {
        return;
    }
    if (node.type == "image") {
        console.log(node.key);
        // value.document.getParent(value.blocks.first().key)
    }
    let data = node.data.toJSON();
    let { style = {} } = data;
    let styles = Object.keys(style).filter(d => {
        return d != "textAlign" && d != "textIndent";
    });
    let nstyle = {};
    styles.map(key => {
        nstyle[key] = data.style[key];
    });
    data.style = {
        ...nstyle,
        ...aligns[align]
    };
    change.setNodeByKey(node.key, { data });
};

export default changeAlign;