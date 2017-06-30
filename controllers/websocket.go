package controllers

import (
	"net/http"

	"encoding/json"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
	"github.com/grayzone/websocket/models"
)

type WebSocketController struct {
	beego.Controller
}

func (c *WebSocketController) Get() {
	uname := c.GetString("uname")
	beego.Info("user name:", uname)
	if len(uname) == 0 {
		c.Redirect("/", 302)
		return
	}
	c.TplName = "websocket.html"
	c.Layout = "layout.html"
	c.Data["UserName"] = uname
}

func (c *WebSocketController) Join() {
	uname := c.GetString("uname")
	if len(uname) == 0 {
		c.Redirect("/", 302)
		return
	}

	ws, err := websocket.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(c.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		beego.Error("cannot setup WebSocket connection:", err)
		return
	}

	Join(uname, ws)
	defer Leave(uname)

	for {
		_, p, err := ws.ReadMessage()
		if err != nil {
			return
		}
		publish <- newEvent(models.EVENT_MESSAGE, uname, string(p))
	}

}

func broadcastWebSocket(event models.Event) {
	data, err := json.Marshal(event)
	if err != nil {
		beego.Error("Fail to marshal event:", err)
		return
	}

	for sub := subscribers.Front(); sub != nil; sub = sub.Next() {
		ws := sub.Value.(Subscriber).Conn
		if ws != nil {
			if ws.WriteMessage(websocket.TextMessage, data) != nil {
				unsubscribe <- sub.Value.(Subscriber).Name
			}
		}
	}

}
