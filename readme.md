# Server-Z

`server-z` is an npm package that allows you to create a simple HTTP server and offload CPU-intensive tasks to worker threads, preventing blocking of the event loop or the main thread.


## Features

1. **Simple HTTP Server Creation**:
   - Easily set up an HTTP server with methods to handle `GET`, `POST`, `UPDATE`, and `DELETE` requests.
   
2. **Offload CPU-Intensive Task**:
   - Execute a CPU-intensive task on a worker thread without blocking the main thread, ensuring smooth performance for I/O operations.


## Installation

```bash
npm install @8zali9/server-z
```


## Example - Creating an http server

```bash
const serverz = require("@8zali9/server-z")
const app = new serverz()

app.getReq("/", (req, res) => {
    res.end("hello")
})

app.listen(3000, () => {})
```


## Example - Offload CPU-Intensive Task

```bash
const { CPUIntensiveTaskExecuter } = require("./index")

const main = () => {
    return 89
}

const ite = new CPUIntensiveTaskExecuter(main)

const callback = (result) => {
    console.log(`callback done: ${result}`)
}

ite.executeCpuIntensiveTask(callback)
```


## API Reference

**ServerZ**
- getReq(url, handler): Handle GET requests at the specified URL.
- postReq(url, handler): Handle POST requests at the specified URL.
- updateReq(url, handler): Handle UPDATE requests at the specified URL.
- deleteReq(url, handler): Handle DELETE requests at the specified URL.
- listen(port, callback): Start the HTTP server on the specified port.

**IntensiveTaskExecuter**
- constructor(mainFunction): Initializes the task executor with the CPU-intensive task.
- executeCpuIntensiveTask(callback): Executes the task on a worker thread and returns the result through the callback.


## License

MIT

This `README.md` provides a clear introduction, installation instructions, examples for HTTP server creation, and offloading CPU-intensive tasks, and an API reference for your package.