/* global app */

const { yssjfetch } = app

export const httpGetMediaInfo = async (form) => await yssjfetch.post('admin/vms/editAudio.vms', form);