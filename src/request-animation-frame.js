export function createRequestAnimtionFrame() {
    let lastTime = 0
    let vendors = ['webkit', 'moz', 'ms', 'o']

    let raf
    let caf

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        raf = window[vendors[x] + 'RequestAnimationFrame']
        caf = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!raf) {
        raf = function (callback) {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currTime - lastTime))
            let id = window.setTimeout(function () { return callback(currTime + timeToCall); }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!caf) {
        caf = function (id) {
            clearTimeout(id)
        }
    }
    return {
        raf,
        caf
    }
}