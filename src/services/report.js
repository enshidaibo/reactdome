/* global app */
const { yssjfetch } = app

export const updateReportColumn = async data => yssjfetch.post("admin/web/column/save", data);
export const deleteReportColumn = async data => yssjfetch.post("admin/web/column/delete", data);