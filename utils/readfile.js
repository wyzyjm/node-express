const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const readFilePromise = promisify(fs.readFile)
const writeFilePromise = promisify(fs.writeFile)

exports.getFilieData = async url => {
    const realPath = path.join(__dirname, "../files", url)
    const data = await readFilePromise(realPath, "utf-8")
    return JSON.parse(data)
}

exports.savaData = async (url, data) => {
    const dataStr = JSON.stringify(data, null, "  ") // 格式化文件
    writeFilePromise(url, dataStr)
}
