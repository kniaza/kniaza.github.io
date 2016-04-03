/**
 * Created by Gurami on 01/04/2016.
 */
vtbui = {};
vtbui.Installment = function (n) {
    this.init(n)
};
vtbui.Installment.prototype = {
    constructor: vtbui.Installment, _api: "http://instapi.vtb.ge", init: function (n) {
        this.UId = n.UId;
        this.ClientId = "iphoneplus";
        this.Delivery = n.Delivery;
        this.ExtraFee = n.ExtraFee;
        this.ReturnUrl = n.ReturnUrl;
        this.isOpening = !1
    }, Basket: [], Show: function (n, t) {
        var i = this, r;
        try {
            window.addEventListener ? window.addEventListener("message", this.Hide) : window.attachEvent("message", this.Hide);
            n != undefined && t != undefined && (this.Basket.length = 0, this.Basket.push({
                Name: t.Name,
                Category: t.Category,
                Price: t.Price,
                Hash: t.Hash
            }), this.UId = n, i.Basket = this.Basket)
        } catch (u) {
            this._Log(u)
        }
        if (!this.isOpening) {
            try {
                this.isOpening = !0;
                window.jQuery ? jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    url: i._api + "/api/Merchant/Verify",
                    data: JSON.stringify(i),
                    complete: function (n) {
                        if (n.readyState == 4)try {
                            i.isOpening = !1;
                            i._ShowInstallement(n.responseText)
                        } catch (t) {
                            i._Log(t)
                        }
                    }
                }) : (r = new XMLHttpRequest, r.open("POST", i._api + "/api/Merchant/Verify", !0), r.setRequestHeader("Content-Type", "application/json; charset=UTF-8"), r.onreadystatechange = function () {
                    if (r.readyState == 4)try {
                        i.isOpening = !1;
                        i._ShowInstallement(r.responseText)
                    } catch (n) {
                        i._Log(n)
                    }
                }, r.send(JSON.stringify(i)))
            } catch (u) {
                i._Log(u)
            }
            i._CreateModalContainer()
        }
        return !1
    }, _CreateModalContainer: function () {
        try {
            var n = "background: url(" + this._api + "/assets/images/1px_grey.png); position: fixed; left: 0; right: 0; bottom: 0; top: 0; z-index: 100000000; color: #fff; opacity:0; -moz-transition: all .2s ease; -o-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease;", t = "display:block;background: #fff url(" + this._api + "/assets/images/modal_loader.gif) no-repeat center center; position:absolute;left:50%;top:50%;height:60px;width:60px;margin:-30px 0 0 -30px; border-radius:10px;box-shadow:0px 0px 20px rgba(0,0,0,.5)", i = "<div id='VTBModalContainer' style='" + n + "'><span style='" + t + "'><\/span><\/div>";
            document.body.insertAdjacentHTML("afterbegin", i);
            setTimeout(function () {
                document.getElementById("VTBModalContainer").style.opacity = 1
            }, 100)
        } catch (r) {
            this._Log(r)
        }
    }, _ShowInstallement: function (n) {
        var i, t;
        try {
            i = document.getElementById("VTBModalContainer");
            i.insertAdjacentHTML("beforeend", n);
            t = document.getElementById("VtbOnlineInstallment");
            t.onload = function () {
                setTimeout(function () {
                    t.style.opacity = 1
                }, 1e3)
            }
        } catch (r) {
            this._Log(r)
        }
    }, Hide: function (n) {
        try {
            var t = document.getElementById("VTBModalContainer");
            window.removeEventListener ? window.removeEventListener("message", vtbui.Installment.prototype.Hide) : window.detachEvent("message", vtbui.Installment.prototype.Hide);
            n.data === "DontRedirect" ? t.parentNode.removeChild(t) : (t.parentNode.removeChild(t), document.location = n.data)
        } catch (i) {
            this._Log(i)
        }
    }, _Log: function (n) {
        window.console && console.log || (console = {
            log: function () {
            }, dir: function () {
            }
        });
        console.log("Vtb instalment log: " + n);
        console.dir(this)
    }
};