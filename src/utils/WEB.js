import  Stomp  from "stompjs";

class WebSocket {

    stompClient = null;

    socketTask = null;

    constructor () {
        /*setInterval是用来发心跳包的，而小程序没有window对象*/
        Stomp.setInterval = function (interval, f) {
            return setInterval(f, interval);
        };
        Stomp.clearInterval = function (id) {
            return clearInterval(id);
        };
    }

    /**
     * 建立websocket连接
     * @param webSocketUrl 连接地址
     */
    buildConnect (webSocketUrl,channel,monitorFun) {
        if (!this.getSocketStatus()) {
            var socketTask = wx.connectSocket({
                url: webSocketUrl
            });
            var ws = {
                send: function (frame) {
                    socketTask.send({data: frame});
                },
                close: function (frame) {
                    socketTask.close(frame);
                }
            };
            socketTask.onOpen(function (frame) {
                ws.onopen(frame)
            });
            socketTask.onMessage(function (frame) {
                ws.onmessage(frame)
            });
            socketTask.onClose(function (frame) {
                console.log("websocket 断开了");
            });
            var stompClient = Stomp.over(ws);
            var that = this;
            stompClient.connect({},
                function (frame) {
                    console.log("The connection is successful: ", frame);
                    that.socketTask = socketTask;
                    that.stompClient = stompClient;
                    that.setMessageMonitor(channel,monitorFun)
                }
            );
        }
    }

    /**
     * 设置消息监听器
     * @param channel    频道
     * @param monitorFun 函数
     */
    setMessageMonitor (channel, monitorFun) {
        if (this.getSocketStatus()) {
            this.stompClient.subscribe(channel, monitorFun);
            console.log("channel listener ...", channel);
        }
    }

    /**
     * 发送消息
     * @param channel 频道
     * @param header  消息头
     * @param body    消息体
     */
    sendMessage (channel, header, body) {
        if (this.getSocketStatus()) {
            this.stompClient.send(channel, header, JSON.stringify(body));
        }
    }

    /**
     * 获取连接状态
     * @return boolean
     */
    getSocketStatus () {
        if (this.socketTask && this.socketTask.readyState) {
            return this.socketTask.readyState === 1 ? true : false;
        } else {
            console.log("websocket 连接还未建立");
        }
    }

    /**
     * 关闭连接
     */
    close () {
        if (this.getSocketStatus()) {
            this.stompClient.disconnect();
            this.stompClient = null;
            this.socketTask = null;
        }
    }
}

export {
    WebSocket
}
