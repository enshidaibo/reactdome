import React, { Component } from "react";
import { box, boxselect, mask, title, editBtn } from "./FilesBox.scss";

export const Box = ({ children, selected = false, ...props }) => (
    <div className={selected ? boxselect : box} {...props}>
        {children}
    </div>
);

export const Mask = ({ ...props }) => <div className={mask} {...props} />;

export const Title = ({ children, ...props }) => (
    <div className={title} {...props}>
        {children}
    </div>
);

export const EditBtn = ({ children, ...props }) => (
    <div className={editBtn} {...props}>
        {children}
    </div>
);
