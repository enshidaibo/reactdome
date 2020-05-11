import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { stringify } from "qs";

const Links = ({ to, iframe, children, staticContext, ...props }) => {
    if (typeof to === "string" && (to.indexOf("https://") == 0 || to.indexOf("http://") == 0)) {
        if (iframe) {
            return (
                <Link
                    {...props}
                    to={{
                        pathname: "/iframe",
                        search: stringify({ outlink: to }),
                        state: { outlink: to }
                    }}
                >
                    {children}
                </Link>
            );
        }
        to =
            to +
            "?" +
            stringify({ sessionKey: memoryStorage.getItem('sessionKey'), _site_id_param: localStorages._site_id_param });
        return (
            <a {...props} href={to}>
                {children}
            </a>
        );
    }
    return (
        <Link to={{ pathname: to, search: stringify({ red: to }) }} {...props}>
            {children}
        </Link>
    );
};

export default Links;
