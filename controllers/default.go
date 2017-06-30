package controllers

import (
	"fmt"

	"time"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
)

type Person struct {
	Name string
	Age  int
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.TplName = "index.html"
	c.Layout = "layout.html"
}

func (c *MainController) WebSocket() {
	conn, err := upgrader.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	for {
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		if string(msg) == "ping" {
			fmt.Println("ping")
			time.Sleep(2 * time.Second)
			err = conn.WriteMessage(msgType, []byte("pong"))
			if err != nil {
				fmt.Println(err)
				return
			}
		} else {
			conn.Close()
			fmt.Println(string(msg))
			return
		}
	}
	fmt.Println("Client subcribed")

}
