import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import styles from "./styles.scss";

const optss = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    width: 200,
    rendererOpts: {
        quality: 1
    },
    color: {
        dark: "#000000",
        light: "#ffffff"
    }
}
const QrCode = ({ text = '', opts = optss, ...props }) => {
    const qrCodeEle = useRef(null);
    useEffect(() => {
        QRCode.toDataURL(text, opts, (err, url) => {
            if (err) throw err;
            qrCodeEle.current.src = url;
        });
    }, [])
    return <img ref={qrCodeEle} className={styles.content} {...props} />;
}

export default QrCode
