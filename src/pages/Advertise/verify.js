export const verifyUrl = (url) => {
    let urlReg = /^(https?|ftp|file):\/\/.+$/;
    return urlReg.test(url);
}

export const verifyPhone = (phone) => {
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return phoneReg.test(phone);
}

export const verifyEmail = (email) => {
    let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return emailReg.test(email);
}