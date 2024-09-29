const http = require("http")
const { Worker } = require("worker_threads")

class ServerZ {
    constructor() {
        this.handlers = {}
        this.server = http.createServer((req, res) => {
            const {url, method} = req
            const reqKey = `${method}: ${url}`

            if (this.handlers[reqKey]) this.handlers[reqKey](req, res)
            else {
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({
                    status: 400,
                    error: "Handler not defined"
                }))
            }
        })
    }

    getReq(url, handler) {
        const reqKey = `GET: ${url}`
        this.handlers[reqKey] = handler
    }

    postReq(url, handler) {
        const reqKey = `POST: ${url}`
        this.handlers[reqKey] = handler
    }

    updateReq(url, handler) {
        const reqKey = `UPDATE: ${url}`
        this.handlers[reqKey] = handler
    }

    deleteReq(url, handler) {
        const reqKey = `DELETE: ${url}`
        this.handlers[reqKey] = handler
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }
}

class CPUIntensiveTaskExecuter {
    constructor(main) {
        this.worker = new Worker("./worker.js", {
            workerData: { mainFunction: main.toString() }
        })
    }

    executeCpuIntensiveTask(callback) {
        try {
            this.worker.on("message", result => callback(result))
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = { ServerZ, CPUIntensiveTaskExecuter }