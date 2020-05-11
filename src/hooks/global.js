/* global AppConfig */

import { useEffect } from "react";

const siteName = AppConfig.siteName || '云上视界融媒云'

export const useTitle = (title) => {
    return useEffect(() => {
        document.title = title + '-' + siteName;
        return () => {
            document.title = siteName
        }
    }, [])
}