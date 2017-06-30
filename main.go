package main

import (
	"github.com/astaxie/beego"
	_ "github.com/grayzone/websocket/routers"
)

func main() {
	beego.Run()
}
