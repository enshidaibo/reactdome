import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import Cropper from "cropperjs";
import { Button, message } from "antd";
import isUrl from "is-url";

const ResourceManager = app.asyncComponent('ResourceManager')
import uploadFile from "@/globalComponents/ResourceManager/Images/uploadFile";
import convertDataUrlToFile from "@/libs/Hoc/uploadAttachments/convertDataUrlToFile";
import WaterMark from "./WaterMark";
import ActionBar from "./ActionBar";
import ImgInfo from "./ImgInfo";

import styles from "./CropperImage.scss";

import aspectRatios from "./aspectRatios";

class UploadImg extends Component {
    static defaultProps = {
        imgsrc: "",
        className: "",
        isServer: false, //是否是远程服务器的图片
        isOk: false // 比例尺寸是否满足要求
    };
    constructor(props) {
        super(props);
        this.scaleX = -1;
        this.scaleY = -1;
        let { imgsrc, isOk } = props;
        let isServer = isUrl(imgsrc);
        // let isServer2 = isImage(imgsrc);
        this.state = {
            bloburl: imgsrc,
            imginfo: {},
            newfile: {},
            step: isServer ? 1 : 0, //0 ,1:选择了图片，2：裁剪了，3：上传中,4:上传成功
            serverurl: null,
            showServer: false,
            edit: true,
            fileName: "tupian.jpg",
            aspectRatio: 0,
            isServer,
            isOk
        };
    }
    componentDidMount() {
        this.handleBuildCropper();
    }
    handleBuildCropper = () => {
        let { aspectRatio } = this.state;
        let image = this.img;
        this.cropper = new Cropper(image, {
            aspectRatio: aspectRatios[aspectRatio].value,
            minCropBoxWidth: 200,
            viewMode: 1,
            // autoCrop: true,
            autoCropArea: 1,
            dragMode: "move",
            // zoomable: false,
            // scalable: false,
            toggleDragModeOnDblclick: false,
            checkImageOrigin: false,
            // background: false,
            // checkCrossOrigin: false,
            // crop: data => {
            //     console.log(data);
            // },
            cropend: e => {
                let { width, height } = this.cropper.getCroppedCanvas();
                this.setState({
                    newfile: {
                        width,
                        height
                    }
                });
            },
            ready: () => {
                this.handleImgData();
            },
            zoom: () => {
                this.handleImgData();
            }
        });
    };
    handleSetAspectRatio = (aspectRatio = 0) => {
        this.cropper.setAspectRatio(aspectRatios[aspectRatio].value);
        let checkAspect = this.handleCheckAspectRatio(aspectRatio);
        this.setState({
            aspectRatio,
            isOk: checkAspect
        });
        this.handleImgData();
    };
    handleCheckAspectRatio = aspectRatio => {
        // let { isServer } = this.state;
        // if (!isServer) {
        //     return false;
        // }
        let aspectRatioValue = aspectRatios[aspectRatio].value;
        return isNaN(aspectRatioValue);
    };
    handleRotate = deg => {
        this.cropper.rotate(deg);
        this.handleImgData();
    };
    handleScaleX = () => {
        this.cropper.scaleX(this.scaleX || -1);
        this.scaleX = this.scaleX == -1 ? 1 : -1;
        this.handleImgData();
    };
    handleScaleY = () => {
        this.cropper.scaleY(this.scaleY || -1);
        this.scaleY = this.scaleY == -1 ? 1 : -1;
        this.handleImgData();
    };
    /**
     * 打开服务器图片列表
     */
    handleShowServer = () => {
        this.setState({
            showServer: true
        });
    };
    /**
     * 隐藏图片列表
     */
    handleHideImgList = () => {
        this.setState({
            showServer: false
        });
    };
    /**
     * 选择已上传图片编辑
     */
    handleChangeImg = data => {
        let imgsrc = data[0].path;
        let imgArr = imgsrc.split("/");
        let fileName = imgArr[imgArr.length - 1];
        let image = new Image();
        image.src = imgsrc;
        this.setState({
            showServer: false,
            isServer: true
        });
        image.onload = async () => {
            // if (image.width < 200 || image.height < 100) {
            //     return message.warning(`选择的图片太小为（${image.width}*${image.height}）不适合做缩略图，缩略图最小尺寸要求为200*100像素`);
            // }
            let isOk = this.handleIsOK(image);
            this.setState({
                bloburl: imgsrc,
                thumb: data[0].thumb,
                step: 1,
                serverurl: imgsrc,
                server: 1,
                showServer: false,
                edit: true,
                fileName,
                isOk
            });
            this.cropper.replace(imgsrc);
        };
    };
    /**
     * 监测图片是否符合当前尺寸比例要求
     */
    handleIsOK = image => {
        let { aspectRatio } = this.state;
        let aspectRatioValue = aspectRatios[aspectRatio].value;
        if (isNaN(aspectRatioValue)) {
            return true;
        }
        let { width, height } = image;
        let aspect = Math.abs(width / height - aspectRatioValue);
        return aspect < 0.005;
    };
    /**
     * 选择框选取图片
     */
    handleFileChange = e => {
        let file = e.target.files[0];
        let bloburl = URL.createObjectURL(file);
        this.setState({
            bloburl,
            step: 1,
            isOk: false,
            edit: true,
            fileName: file.name,
            file: file,
            isServer: false
        });
        this.cropper.replace(bloburl);
    };
    /**
     * 获取裁剪框图片信息
     */
    handleImgData = () => {
        let { width, height } = this.cropper.getCroppedCanvas();
        // let imgData = this.cropper.getImageData();
        let cropBoxData = this.cropper.getCropBoxData();
        // let canvasData = this.cropper.getCanvasData();
        // console.log(this.cropper.getCroppedCanvas());
        // console.log(imgData);
        // console.log(cropBoxData);
        // console.log(canvasData);
        // let zoom = width / cropBoxData.width;
        // console.log(zoom);
        this.setState({
            imginfo: {
                ...this.cropper.getImageData()
            },
            cropBoxData,
            newfile: {
                width,
                height
            }
        });
    };
    /**
     * 对已编辑图片重新进行编辑
     */
    handleReBuild = () => {
        this.cropper.crop();
        this.setState({
            step: 1,
            edit: true
        });
    };
    /**
     * 确认裁剪
     */
    handleOverCropper = async () => {
        let { fileName } = this.state;
        let canvas = this.cropper.getCroppedCanvas({ width: 800 });
        let DataURL = canvas.toDataURL();
        let file = convertDataUrlToFile(DataURL, fileName);
        let bloburl = URL.createObjectURL(file);
        this.cropper.clear();
        this.setState({
            bloburl,
            cropperSrc: bloburl,
            file: file,
            // file: res.file,
            step: 2,
            isOk: false,
            edit: false
        });
    };
    handleDrawImage = async ({ imageUrl, waterUrl, fileName }) => {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                if (waterUrl) {
                    let water = new Image();
                    water.src = waterUrl;
                    water.onload = () => {
                        ctx.drawImage(water, 0, 0, 150, 150);
                        let DataURL = canvas.toDataURL();
                        let file = convertDataUrlToFile(DataURL, fileName);
                        let bloburl = URL.createObjectURL(file);
                        resolve({ bloburl, file });
                    };
                } else {
                    ctx.font = "bold 30px Arial";
                    ctx.fillStyle = "#f00";
                    ctx.fillText("云上恩施", 10, 50);
                    let DataURL = canvas.toDataURL();
                    let file = convertDataUrlToFile(DataURL, fileName);
                    let bloburl = URL.createObjectURL(file);
                    resolve({ bloburl, file });
                }
            };
        });
    };
    /**
     * 点击上传按钮
     */
    handleUpload = async () => {
        let { file } = this.state;
        this.setState({
            step: 3
        });
        this.handleFileUpload(file);
    };
    /**
     * 图片裁剪上传操作
     */
    handleFileUpload = async file => {
        let res = await uploadFile(file, { type: "image" });
        if (res.success) {
            console.log(res);
            message.success("上传成功");
            this.setState({
                serverurl: res.body.uploadPath,
                thumb: res.body.thumb,
                step: 4,
                isOk: true
            });
        } else {
            this.setState({
                step: 2
            });
        }
    };
    /**
     * 确定插入
     */
    handleChange = () => {
        let { onOk } = this.props;
        let { serverurl, cropperSrc, thumb } = this.state;
        onOk && onOk({ serverurl, cropperSrc, thumb });
    };
    handleUploadChange = async () => {
        let { onOk } = this.props;
        let { file, serverurl, isOk, isServer, cropperSrc, thumb } = this.state;
        if (isServer && isOk) {
            onOk && onOk({ serverurl, cropperSrc, thumb });
            return
        }
        this.setState({
            step: 3
        });
        let res = await uploadFile(file, { type: "image" });
        if (res.success) {
            // message.success("插入成功");
            // this.setState({
            //     serverurl: res.body.uploadPath,
            //     thumb: res.body.thumb,
            //     step: 4,
            //     isOk: true
            // });
            onOk && onOk({ serverurl: res.body.uploadPath, cropperSrc, thumb: res.body.thumb });
        } else {
            this.setState({
                step: 2
            });
        }
    };
    handleWater = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let image = new Image();
        image.src = "./public/images/2.jpg";
        image.onload = async () => {
            ctx.drawImage(image, 0, 0);
            ctx.fillText("Hello World!", 10, 50);
            let DataURL = canvas.toDataURL();
            let file = convertDataUrlToFile(DataURL, "2.jpg");
            let bloburl = URL.createObjectURL(file);
        };
        // let canvas = this.cropper.getCroppedCanvas();
        // canvas.drawText("222222222", 0, 0);
    };
    render() {
        let { imginfo, newfile, bloburl, step, showServer, edit, aspectRatio, isOk } = this.state;
        let { className, onHide } = this.props;
        return ReactDOM.createPortal(
            <div className={`${styles.uploadwarper} ${className}`}>
                <ActionBar
                    isOk={isOk}
                    step={step}
                    aspectRatio={aspectRatio}
                    handleSetAspectRatio={this.handleSetAspectRatio}
                    handleRotate={this.handleRotate}
                    handleScaleX={this.handleScaleX}
                    handleScaleY={this.handleScaleY}
                    handleOverCropper={this.handleOverCropper}
                    handleReBuild={this.handleReBuild}
                    handleUpload={this.handleUploadChange}
                    handleChange={this.handleChange}
                    onHide={onHide}
                />
                <div className={styles.cropperEdit}>
                    <div className={styles.CropperDiv}>
                        <div className={styles.preview} style={{ zIndex: edit ? -1 : 9999 }}>
                            <img src={bloburl} className={styles.previewimage} />
                        </div>
                        <img id="image" className={styles.image} ref={ele => (this.img = ele)} src={bloburl} />
                        {/* <WaterMark /> */}
                    </div>
                    <div className={styles.crooperaction}>
                        <div className={"iconfont icon-tianjiatupian " + styles.uploadfile}>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={this.handleFileChange}
                                className={styles.uploadinput}
                            />
                        </div>
                        <div className={styles.actiondiv}>
                            <Button onClick={this.handleShowServer} style={{ width: "100%" }} type="primary">
                                从图库中选择
                            </Button>
                        </div>
                        <ImgInfo imginfo={imginfo} newfile={newfile} />
                    </div>
                </div>
                {showServer && (
                    <ResourceManager onHide={this.handleHideImgList} onOk={this.handleChangeImg} resourceType="image" />
                )}
            </div>,
            document.getElementById(rootDom)
        );
    }
}

export default UploadImg;
