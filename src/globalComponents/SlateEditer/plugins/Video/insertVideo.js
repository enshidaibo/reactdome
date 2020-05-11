/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

const insertVideo = (change, info, target) => {
    if (target) {
        change.select(target);
    }
    change.insertBlock({
        type: "video",
        isVoid: true,
        data: info
    });
};

export default insertVideo;
