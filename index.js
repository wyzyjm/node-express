const express = require("express")

const { getFilieData, savaData } = require("./utils/readfile")
const app = express()

// 接收数据格式
app.use(express.json()) // 解析post 请求体, application/json 格式的
app.use(express.urlencoded()) // 解析post 请求体, application/x-www-form-urlencoded 格式的

app.get("/", (req, res) => {
    /**
     * 请求
        req.url:    请求地址
        req.method: 请求 方式
        req.header: 请求 头
        req.params: 请求路径参数
     */

    /**
     * 响应
        res.statusCode:  设置响应状态码
        res.setHeader: 设置响应头
        res.end() | send(): 结束响应
        res.status(404).end('error 链式调用')

        res.cookie('key','value')   返回cookie
     */
    console.log(req.url, req.method)
    res.send("hellow world")
})

// 获取 列表
app.get("/list", async (req, res) => {
    try {
        const data = await getFilieData("list.json")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})
// 获取单个
app.get("/detail/:id", async (req, res) => {
    try {
        const data = await getFilieData("list.json")
        const item = data.list.find(v => v.id === req.params.id)
        if (!item) return res.status(404).end()
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// 添加
app.post("/list", async (req, res) => {
    /**
     req.body 获取请求体
     */
    try {
        const content = req.body
        if (!content) return res.status(400).json({ error: "请发送内容啊!" })
        // 存数据
        const data = await getFilieData("list.json")
        const itemId = data.list[data.list.length - 1]
        data.list.push({
            id: itemId ? itemId.id + 1 : 1, // id的处理
            username: content.username,
            age: content.age
        })
        savaData("list.json", data)
        res.status(200).json({
            data: "success"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// 修改
app.patch("/list", (req, res) => {
    res.send("post请求 /")
})
// 删除
app.delete("/list/:id", (req, res) => {
    res.send(`delete请求 /${req.params.id}`)
})

app.listen(4000, () => {
    console.log("express run localhost:4000 ...")
})
