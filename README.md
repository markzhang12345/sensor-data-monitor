# sensor-data-monitor

23-zwz

## 项目简介

基于 React，Tauri 和 Express 框架的上位机平台，通过 MQTT 协议与嵌入式互联网设备进行通信，同时使用 Mongodb 数据库存储历史信息与操作日志

本项目共有三个层次：

- frontend 是基于 React 和 Tauri 的桌面端 web 应用，通过给后端发送 http 请求来获取相应信息，并集成了可视化操作界面
- server 是基于 Express 的服务器，通过 MQTT 协议和下位机通信，并与 Mongodb 的云服务器相连
- Mqtt-broker 是作业提供的模拟 MQTT 客户端的代码，修改后能将信息以 json 格式发布

## 已实现功能

- 通过后端接收基于 TCP 协议的 MQTT 信息
- 在前端操作页面中显示传感器的当前状态
- 在前端操作页面中集成操作按键
  ![图片](/images/操作界面.png "操作界面")
- 在前端历史页面中显示最近 20 条状态历史
  ![图片](/images/历史记录.png "历史记录")

## 未实现功能

- 操作按键的信息发送
- 后端对按键请求的响应逻辑
- 操作日志的页面显示
