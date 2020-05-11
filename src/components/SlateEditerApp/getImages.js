const flattenNodes = nodes => {
    return nodes.reduce((arr, { nodes = [], ...rest }) => {
        return arr.concat([rest], flattenNodes(nodes));
    }, []);
};

const getImages = nodes => {
    let nodeblocks = flattenNodes(nodes.toJSON());
    let images = nodeblocks
        .filter(node => {
            return node.object == "block" && node.isVoid == true && node.type == "image";
        })
        .map(image => {
            return image.data;
        });
    return images;
};

export default getImages;