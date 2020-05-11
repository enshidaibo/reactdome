import { getEventRange, getEventTransfer } from "slate-react";
import isUrl from "is-url";
import isImage from "is-image";
import uploadFile from "@/globalComponents/ResourceManager/Images/uploadFile";
import { video } from './link.config';
import serializers from "../../serializer/serializer";
import insertImage from "../../plugins/Images/insertImage";

const serializer = serializers({ styleAll: true });
const handleUpload = async (editor, target, file, mark) => {
    let res = await uploadFile(file, { mark: mark });
    let src;
    if (res.success) {
        src = res.body.uploadPath;
    } else {
        src = URL.createObjectURL(file);
    }
    let imgInfo = {
        src: src,
        title: file.name,
        server: res.success ? "true" : "false"
    };
    editor.change(c => {
        c.call(insertImage, imgInfo, target);
    });
};

const insertIframe = (change, info, target) => {
    if (target) {
        change.select(target);
    }
    change.insertBlock({
        type: "iframe",
        isVoid: true,
        data: info
    });
};

const dropOrPaste = (event, change, editor, mark) => {
    const target = getEventRange(event, change.value);
    if (!target && event.type == "drop") return;
    const transfer = getEventTransfer(event);
    const { type, text, files } = transfer;
    if (type == "files") {
        for (const file of files) {
            const [mime] = file.type.split("/");
            if (mime == "image") {
                handleUpload(editor, target, file, mark);
            }
        }
    }
    if (type == "text") {
        if (!isUrl(text)) return;
        if (isImage(text)) {
            change.call(insertImage, { src: text }, target);
            return true
        }
        let isVideo = video.findIndex(d => {
            return text.indexOf(d) != -1
        })
        if (isVideo != -1) {
            change.call(insertIframe, { src: text }, target);
            return true
        }
        return
    }
    if (type == "html") {
        const { document } = serializer.deserialize(transfer.html);
        change.insertFragment(document);
        return true;
    }
};

export default dropOrPaste;