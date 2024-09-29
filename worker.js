const { parentPort, workerData } = require("worker_threads")

const mainFunction = eval(`(${workerData.mainFunction})`)
const res = mainFunction()

parentPort.postMessage(res)