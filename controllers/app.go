package controllers

import (
	"github.com/astaxie/beego"
)

type AppController struct {
	beego.Controller
}

func (c *AppController) Get() {
	c.TplName = "welcome.html"
	c.Layout = "layout.html"
}

func (c *AppController) Join() {
	uname := c.GetString("uname")
	tech := "websocket"
	beego.Info("app info, tech:", tech)

	if len(uname) == 0 {
		c.Redirect("/", 302)
		return
	}

	switch tech {
	case "websocket":
		c.Redirect("/ws?uname="+uname, 302)
	default:
		c.Redirect("/", 302)
	}
	return
}
