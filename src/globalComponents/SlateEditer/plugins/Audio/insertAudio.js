/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

const insertAudio = (change, info, target) => {
    if (target) {
        change.select(target);
    }
    change.insertBlock({
        type: "audio",
        isVoid: true,
        data: info
    });
};

export default insertAudio;
