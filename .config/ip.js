const os = require('os')

module.exports = function () {
    let ifaces = os.networkInterfaces()
    let ip = '',
        result = []
    for (let dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (ip === '' && details.family === 'IPv4' && !details.internal) {
                ip = details.address
                return;
            }
        })
    }
    return ip || '0.0.0.0'
}