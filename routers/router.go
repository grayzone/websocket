package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/websocket/controllers"
)

func init() {
	beego.Router("/", &controllers.AppController{})

	//	beego.Router("/websocket", &controllers.MainController{}, "GET:WebSocket")
	beego.Router("/join", &controllers.AppController{}, "POST:Join")

	beego.Router("/ws", &controllers.WebSocketController{})
	beego.Router("/ws/join", &controllers.WebSocketController{}, "GET:Join")

}
