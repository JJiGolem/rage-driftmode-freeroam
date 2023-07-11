! function (t) {
    var e = {};

    function i(s) {
        if (e[s]) return e[s].exports;
        var n = e[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = t, i.c = e, i.d = function (t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (i.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(s, n, function (e) {
                return t[e]
            }.bind(null, n));
        return s
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 0)
}([function (t, e, i) {
    "use strict";
    var s;
    i.r(e),
        function (t) {
            t[t.None = 0] = "None", t[t.BronzeMedal = 1] = "BronzeMedal", t[t.GoldMedal = 2] = "GoldMedal", t[t.SilverMedal = 3] = "SilverMedal", t[t.Alert = 4] = "Alert", t[t.Crown = 5] = "Crown", t[t.Ammo = 6] = "Ammo", t[t.Armour = 7] = "Armour", t[t.Barber = 8] = "Barber", t[t.Clothes = 9] = "Clothes", t[t.Franklin = 10] = "Franklin", t[t.Bike = 11] = "Bike", t[t.Car = 12] = "Car", t[t.Gun = 13] = "Gun", t[t.Heart = 14] = "Heart", t[t.Makeup = 15] = "Makeup", t[t.Mask = 16] = "Mask", t[t.Michael = 17] = "Michael", t[t.Star = 18] = "Star", t[t.Tattoo = 19] = "Tattoo", t[t.Trevor = 20] = "Trevor", t[t.Lock = 21] = "Lock", t[t.Tick = 22] = "Tick", t[t.Sale = 23] = "Sale", t[t.ArrowLeft = 24] = "ArrowLeft", t[t.ArrowRight = 25] = "ArrowRight", t[t.Audio1 = 26] = "Audio1", t[t.Audio2 = 27] = "Audio2", t[t.Audio3 = 28] = "Audio3", t[t.AudioInactive = 29] = "AudioInactive", t[t.AudioMute = 30] = "AudioMute"
        }(s || (s = {}));
    var n, h = s;
    ! function (t) {
        t[t.ChaletLondon = 0] = "ChaletLondon", t[t.HouseScript = 1] = "HouseScript", t[t.Monospace = 2] = "Monospace", t[t.CharletComprimeColonge = 4] = "CharletComprimeColonge", t[t.ChaletLondonFixedWidthNumbers = 5] = "ChaletLondonFixedWidthNumbers", t[t.Pricedown = 7] = "Pricedown"
    }(n || (n = {}));
    var o, r = n;
    class a {
        constructor(t, e, i, s = 255) {
            this.R = t, this.G = e, this.B = i, this.A = s
        }
    }
    a.Empty = new a(0, 0, 0, 0), a.Transparent = new a(0, 0, 0, 0), a.Black = new a(0, 0, 0, 255), a.White = new a(255, 255, 255, 255), a.WhiteSmoke = new a(245, 245, 245, 255);
    class l {
        constructor(t = 0, e = 0) {
            this.Width = t, this.Height = e
        }
    }
    class c {
        constructor(t, e) {
            this.X = 0, this.Y = 0, this.X = t, this.Y = e
        }
        static Parse(t) {
            if ("object" == typeof t) {
                if (t.length) return new c(t[0], t[1]);
                if (t.X && t.Y) return new c(t.X, t.Y)
            } else if ("string" == typeof t && -1 !== t.indexOf(",")) {
                const e = t.split(",");
                return new c(parseFloat(e[0]), parseFloat(e[1]))
            }
            return new c(0, 0)
        }
    }
    class u {
        constructor() {
            this.enabled = !0
        }
    }
    class d extends u {
        constructor(t, e, i, s, n, h) {
            super(), this.caption = t, this.pos = e, this.scale = i, this.color = s || new a(255, 255, 255, 255), this.font = n || 0, this.centered = h || !1
        }
        Draw(t, e, i, s, n, h) {
            !t || e || i || s || n || h || (e = new c(this.pos.X + t.Width, this.pos.Y + t.Height), i = this.scale, s = this.color, n = this.font, h = this.centered);
            const o = e.X / 1280,
                r = e.Y / 720;
            mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(i, i), mp.game.ui.setTextColour(s.R, s.G, s.B, s.A), mp.game.ui.setTextCentre(h), mp.game.ui.setTextEntry("THREESTRINGS"), m.AddLongString(t), mp.game.ui.drawText(o, r)
        }
    }
    exports = d,
        function (t) {
            t[t.Left = 0] = "Left", t[t.Centered = 1] = "Centered", t[t.Right = 2] = "Right"
        }(o || (o = {}));
    class m extends d {
        constructor(t, e, i, s, n, h) {
            super(t, e, i, s || new a(255, 255, 255), n || 0, !1), this.TextAlignment = o.Left, this.Wrap = 0, h && (this.TextAlignment = h)
        }
        get WordWrap() {
            return new l(this.Wrap, 0)
        }
        set WordWrap(t) {
            this.Wrap = t.Width
        }
        Draw(t, e, i, s, n, h, r, a, u) {
            let d = t,
                f = h,
                g = h;
            t || (t = new l(0, 0)), t && !e && (g = this.TextAlignment, d = this.caption, e = new c(this.pos.X + t.Width, this.pos.Y + t.Height), i = this.scale, s = this.color, n = this.font, 1 == f || 0 == f ? f = this.centered : (f = void 0, r = this.DropShadow, a = this.Outline, this.WordWrap));
            const _ = 1080 * (p.width / p.height),
                I = this.pos.X / _,
                w = this.pos.Y / 1080;
            if (mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(1, i), mp.game.ui.setTextColour(s.R, s.G, s.B, s.A), void 0 !== f) mp.game.ui.setTextCentre(f);
            else {
                switch (r && mp.game.ui.setTextDropshadow(2, 0, 0, 0, 0), a && console.warn("outline not working!"), g) {
                    case o.Centered:
                        mp.game.ui.setTextCentre(!0);
                        break;
                    case o.Right:
                        mp.game.ui.setTextRightJustify(!0), mp.game.ui.setTextWrap(0, I)
                }
                if (this.Wrap) {
                    const t = (this.pos.X + this.Wrap) / _;
                    mp.game.ui.setTextWrap(I, t)
                }
            }
            mp.game.ui.setTextEntry("CELL_EMAIL_BCON"), m.AddLongString(d), mp.game.ui.drawText(I, w)
        }
        static AddLongString(t) {
            if (t.length) {
                const e = 99,
                    i = [];
                let s, n, h, o = 0;
                for (; o < t.length;) s = n = o + e > t.length ? t.length : o + e, ((h = t.substring(o, s)).match(/~/g) || []).length % 2 != 0 && o + e <= t.length ? (s = h.lastIndexOf("~"), h = t.substring(o, o + s), o += s) : o = n, i.push(h);
                for (const t of i) mp.game.ui.addTextComponentSubstringPlayerName(t)
            }
        }
    }
    const f = mp.game.graphics.getScreenActiveResolution(0, 0),
        p = {
            width: f.x,
            height: f.y,
            ResolutionMaintainRatio: () => {
                const t = f.x,
                    e = f.y;
                return new l(1080 * (t / e), 1080)
            },
            getMousePosition: (t = !1) => {
                const e = p.ResolutionMaintainRatio(),
                    i = mp.gui.cursor.position;
                let [s, n] = [i[0], i[1]];
                return t && ([s, n] = [i[0] / e.Width, i[1] / e.Height]), [s, n]
            },
            IsMouseInBounds: (t, e) => {
                const [i, s] = p.getMousePosition();
                return i >= t.X && i <= t.X + e.Width && s > t.Y && s < t.Y + e.Height
            },
            GetTextWidth: (t, e, i) => {
                mp.game.ui.setTextEntryForWidth("CELL_EMAIL_BCON"), m.AddLongString(t), mp.game.ui.setTextFont(e), mp.game.ui.setTextScale(1, i);
                const s = mp.game.ui.getTextScreenWidth(!0);
                return p.ResolutionMaintainRatio().Width * s
            },
            GetLineCount: (t, e, i, s, n) => {
                mp.game.ui.setTextGxtEntry("CELL_EMAIL_BCON"), m.AddLongString(t);
                const h = p.ResolutionMaintainRatio(),
                    o = e.X / h.Width,
                    r = e.Y / h.Height;
                if (mp.game.ui.setTextFont(i), mp.game.ui.setTextScale(1, s), n > 0) {
                    const t = e.X / h.Width + n / h.Width;
                    mp.game.ui.setTextWrap(o, t)
                }
                return mp.game.invoke("0x9040DFB09BE75706", o, r)
            }
        };
    class g {
        constructor(t, e, i, s, n = 0, h = new a(255, 255, 255)) {
            this.TextureDict = t, this.TextureName = e, this.pos = i, this.size = s, this.heading = n, this.color = h, this.visible = !0
        }
        LoadTextureDictionary() {
            for (mp.game.graphics.requestStreamedTextureDict(this._textureDict, !0); !this.IsTextureDictionaryLoaded;) mp.game.wait(0)
        }
        set TextureDict(t) {
            this._textureDict = t, this.IsTextureDictionaryLoaded || this.LoadTextureDictionary()
        }
        get TextureDict() {
            return this._textureDict
        }
        get IsTextureDictionaryLoaded() {
            return mp.game.graphics.hasStreamedTextureDictLoaded(this._textureDict)
        }
        Draw(t, e, i, s, n, h, o) {
            t = t || this.TextureDict, e = e || this.TextureName, i = i || this.pos, s = s || this.size, n = n || this.heading, h = h || this.color, (o = o || !0) && (mp.game.graphics.hasStreamedTextureDictLoaded(t) || mp.game.graphics.requestStreamedTextureDict(t, !0));
            const r = 1080 * (p.width / p.height),
                a = this.size.Width / r,
                l = this.size.Height / 1080,
                c = this.pos.X / r + .5 * a,
                u = this.pos.Y / 1080 + .5 * l;
            mp.game.graphics.drawSprite(t, e, c, u, a, l, n, h.R, h.G, h.B, h.A)
        }
    }
    class _ extends u {
        constructor(t, e, i) {
            super(), this.enabled = !0, this.pos = t, this.size = e, this.color = i
        }
        Draw(t, e, i) {
            t || (t = new l(0, 0)), e || i || (t = new c(this.pos.X + t.Width, this.pos.Y + t.Height), e = this.size, i = this.color);
            const s = e.Width / 1280,
                n = e.Height / 720,
                h = t.X / 1280 + .5 * s,
                o = t.Y / 720 + .5 * n;
            mp.game.graphics.drawRect(h, o, s, n, i.R, i.G, i.B, i.A)
        }
    }
    class I extends _ {
        constructor(t, e, i) {
            super(t, e, i)
        }
        Draw(t, e, i) {
            t || (t = new l), !t || e || i || (t = new c(this.pos.X + t.Width, this.pos.Y + t.Height), e = this.size, i = this.color);
            const s = 1080 * (p.width / p.height),
                n = e.Width / s,
                h = e.Height / 1080,
                o = t.X / s + .5 * n,
                r = t.Y / 1080 + .5 * h;
            mp.game.graphics.drawRect(o, r, n, h, i.R, i.G, i.B, i.A)
        }
    }

    function w() {
        let t, e = "";
        for (t = 0; t < 32; t += 1) switch (t) {
            case 8:
            case 20:
                e += "-", e += (16 * Math.random() | 0).toString(16);
                break;
            case 12:
                e += "-", e += "4";
                break;
            case 16:
                e += "-", e += (4 * Math.random() | 8).toString(16);
                break;
            default:
                e += (16 * Math.random() | 0).toString(16)
        }
        return e
    }
    class x {
        constructor(t, e = "", i = null) {
            this.Id = w(), this.BackColor = x.DefaultBackColor, this.HighlightedBackColor = x.DefaultHighlightedBackColor, this.ForeColor = x.DefaultForeColor, this.HighlightedForeColor = x.DefaultHighlightedForeColor, this.RightLabel = "", this.LeftBadge = h.None, this.RightBadge = h.None, this.Enabled = !0, this.Data = i, this._rectangle = new I(new c(0, 0), new l(431, 38), new a(150, 0, 0, 0)), this._text = new m(t, new c(8, 0), .33, a.WhiteSmoke, r.ChaletLondon, o.Left), this.Description = e, this._selectedSprite = new g("commonmenu", "gradient_nav", new c(0, 0), new l(431, 38)), this._badgeLeft = new g("commonmenu", "", new c(0, 0), new l(40, 40)), this._badgeRight = new g("commonmenu", "", new c(0, 0), new l(40, 40)), this._labelText = new m("", new c(0, 0), .35, a.White, 0, o.Right)
        }
        get Text() {
            return this._text.caption
        }
        set Text(t) {
            this._text.caption = t
        }
        get Description() {
            return this._description
        }
        set Description(t) {
            this._description = t, this.hasOwnProperty("Parent") && this.Parent.UpdateDescriptionCaption()
        }
        SetVerticalPosition(t) {
            this._rectangle.pos = new c(this.Offset.X, t + 144 + this.Offset.Y), this._selectedSprite.pos = new c(0 + this.Offset.X, t + 144 + this.Offset.Y), this._text.pos = new c(8 + this.Offset.X, t + 147 + this.Offset.Y), this._badgeLeft.pos = new c(0 + this.Offset.X, t + 142 + this.Offset.Y), this._badgeRight.pos = new c(385 + this.Offset.X, t + 142 + this.Offset.Y), this._labelText.pos = new c(420 + this.Offset.X, t + 148 + this.Offset.Y)
        }
        addEvent(t, ...e) {
            this._event = {
                event: t,
                args: e
            }
        }
        fireEvent() {
            this._event && mp.events.call(this._event.event, this, ...this._event.args)
        }
        Draw() {
            this._rectangle.size = new l(431 + this.Parent.WidthOffset, 38), this._selectedSprite.size = new l(431 + this.Parent.WidthOffset, 38), this.Hovered && !this.Selected && (this._rectangle.color = new a(255, 255, 255, 20), this._rectangle.Draw()), this._selectedSprite.color = this.Selected ? this.HighlightedBackColor : this.BackColor, this._selectedSprite.Draw(), this._text.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this.LeftBadge != h.None ? (this._text.pos = new c(35 + this.Offset.X, this._text.pos.Y), this._badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge), this._badgeLeft.TextureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected), this._badgeLeft.color = this.IsBagdeWhiteSprite(this.LeftBadge) ? this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148) : a.White, this._badgeLeft.Draw()) : this._text.pos = new c(8 + this.Offset.X, this._text.pos.Y), this.RightBadge != h.None && (this._badgeRight.pos = new c(385 + this.Offset.X + this.Parent.WidthOffset, this._badgeRight.pos.Y), this._badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge), this._badgeRight.TextureName = this.BadgeToSpriteName(this.RightBadge, this.Selected), this._badgeRight.color = this.IsBagdeWhiteSprite(this.RightBadge) ? this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148) : a.White, this._badgeRight.Draw()), this.RightLabel && "" !== this.RightLabel && (this._labelText.pos = new c(420 + this.Offset.X + this.Parent.WidthOffset, this._labelText.pos.Y), this._labelText.caption = this.RightLabel, this._labelText.color = this._text.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._labelText.Draw()), this._text.Draw()
        }
        SetLeftBadge(t) {
            this.LeftBadge = t
        }
        SetRightBadge(t) {
            this.RightBadge = t
        }
        SetRightLabel(t) {
            this.RightLabel = t
        }
        BadgeToSpriteLib(t) {
            switch (t) {
                case h.Sale:
                    return "mpshopsale";
                case h.Audio1:
                case h.Audio2:
                case h.Audio3:
                case h.AudioInactive:
                case h.AudioMute:
                    return "mpleaderboard";
                default:
                    return "commonmenu"
            }
        }
        BadgeToSpriteName(t, e) {
            switch (t) {
                case h.None:
                    return "";
                case h.BronzeMedal:
                    return "mp_medal_bronze";
                case h.GoldMedal:
                    return "mp_medal_gold";
                case h.SilverMedal:
                    return "medal_silver";
                case h.Alert:
                    return "mp_alerttriangle";
                case h.Crown:
                    return "mp_hostcrown";
                case h.Ammo:
                    return e ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
                case h.Armour:
                    return e ? "shop_armour_icon_b" : "shop_armour_icon_a";
                case h.Barber:
                    return e ? "shop_barber_icon_b" : "shop_barber_icon_a";
                case h.Clothes:
                    return e ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
                case h.Franklin:
                    return e ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
                case h.Bike:
                    return e ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
                case h.Car:
                    return e ? "shop_garage_icon_b" : "shop_garage_icon_a";
                case h.Gun:
                    return e ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
                case h.Heart:
                    return e ? "shop_health_icon_b" : "shop_health_icon_a";
                case h.Lock:
                    return "shop_lock";
                case h.Makeup:
                    return e ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
                case h.Mask:
                    return e ? "shop_mask_icon_b" : "shop_mask_icon_a";
                case h.Michael:
                    return e ? "shop_michael_icon_b" : "shop_michael_icon_a";
                case h.Star:
                    return "shop_new_star";
                case h.Tattoo:
                    return e ? "shop_tattoos_icon_b" : "shop_tattoos_icon_a";
                case h.Tick:
                    return "shop_tick_icon";
                case h.Trevor:
                    return e ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
                case h.Sale:
                    return "saleicon";
                case h.ArrowLeft:
                    return "arrowleft";
                case h.ArrowRight:
                    return "arrowright";
                case h.Audio1:
                    return "leaderboard_audio_1";
                case h.Audio2:
                    return "leaderboard_audio_2";
                case h.Audio3:
                    return "leaderboard_audio_3";
                case h.AudioInactive:
                    return "leaderboard_audio_inactive";
                case h.AudioMute:
                    return "leaderboard_audio_mute";
                default:
                    return ""
            }
        }
        IsBagdeWhiteSprite(t) {
            switch (t) {
                case h.Lock:
                case h.Tick:
                case h.Crown:
                    return !0;
                default:
                    return !1
            }
        }
        BadgeToColor(t, e) {
            switch (t) {
                case h.Lock:
                case h.Tick:
                case h.Crown:
                    return e ? new a(255, 0, 0, 0) : new a(255, 255, 255, 255);
                default:
                    return new a(255, 255, 255, 255)
            }
        }
    }
    x.DefaultBackColor = a.Empty, x.DefaultHighlightedBackColor = a.White, x.DefaultForeColor = a.WhiteSmoke, x.DefaultHighlightedForeColor = a.Black;
    class S extends x {
        constructor(t, e = !1, i = "") {
            super(t, i), this.Checked = !1;
            this._checkedSprite = new g("commonmenu", "shop_box_blank", new c(410, 95), new l(50, 50)), this.Checked = e
        }
        SetVerticalPosition(t) {
            super.SetVerticalPosition(t), this._checkedSprite.pos = new c(380 + this.Offset.X + this.Parent.WidthOffset, t + 138 + this.Offset.Y)
        }
        Draw() {
            super.Draw(), this._checkedSprite.pos = this._checkedSprite.pos = new c(380 + this.Offset.X + this.Parent.WidthOffset, this._checkedSprite.pos.Y);
            const t = this.HighlightedForeColor == x.DefaultHighlightedForeColor;
            this.Selected && t ? this._checkedSprite.TextureName = this.Checked ? "shop_box_tickb" : "shop_box_blankb" : this._checkedSprite.TextureName = this.Checked ? "shop_box_tick" : "shop_box_blank", this._checkedSprite.color = this.Enabled ? this.Selected && !t ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._checkedSprite.Draw()
        }
        SetRightBadge(t) {
            return this
        }
        SetRightLabel(t) {
            return this
        }
    }
    class C {
        constructor(t = "", e = null) {
            this.Id = w(), this.DisplayText = t, this.Data = e
        }
    }
    class M {
        constructor(t) {
            if (0 === t.length) throw new Error("ItemsCollection cannot be empty");
            this.items = t
        }
        length() {
            return this.items.length
        }
        getListItems() {
            const t = [];
            for (const e of this.items) e instanceof C ? t.push(e) : "string" == typeof e ? t.push(new C(e)) : "number" == typeof e && t.push(new C(e.toString()));
            return t
        }
    }
    class T extends x {
        constructor(t, e = "", i = new M([]), s = 0, n = null) {
            super(t, e, n), this.ScrollingEnabled = !0, this.HoldTimeBeforeScroll = 200, this.currOffset = 0, this.collection = [], this._index = 0;
            this.Collection = i.getListItems(), this.Index = s, this._arrowLeft = new g("commonmenu", "arrowleft", new c(110, 105), new l(30, 30)), this._arrowRight = new g("commonmenu", "arrowright", new c(280, 105), new l(30, 30)), this._itemText = new m("", new c(290, 104), .35, a.White, r.ChaletLondon, o.Right)
        }
        get Collection() {
            return this.collection
        }
        set Collection(t) {
            if (!t) throw new Error("The collection can't be null");
            this.collection = t
        }
        set SelectedItem(t) {
            const e = this.Collection.findIndex(e => e.Id === t.Id);
            this.Index = e > 0 ? e : 0
        }
        get SelectedItem() {
            return this.Collection.length > 0 ? this.Collection[this.Index] : null
        }
        get SelectedValue() {
            return null == this.SelectedItem ? null : null == this.SelectedItem.Data ? this.SelectedItem.DisplayText : this.SelectedItem.Data
        }
        get Index() {
            return null == this.Collection ? -1 : null != this.Collection && 0 == this.Collection.length ? -1 : this._index % this.Collection.length
        }
        set Index(t) {
            if (null == this.Collection) return;
            if (null != this.Collection && 0 == this.Collection.length) return;
            this._index = 1e5 - 1e5 % this.Collection.length + t;
            const e = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ";
            this.currOffset = p.GetTextWidth(e, this._itemText && this._itemText.font ? this._itemText.font : 0, .35)
        }
        setCollection(t) {
            this.Collection = t.getListItems()
        }
        setCollectionItem(t, e, i = !0) {
            if (t > this.Collection.length) throw new Error("Index out of bounds");
            "string" == typeof e && (e = new C(e)), this.Collection.splice(t, 1, e), i && (this.Index = 0)
        }
        SetVerticalPosition(t) {
            this._arrowLeft.pos = new c(300 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y), this._arrowRight.pos = new c(400 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y), this._itemText.pos = new c(300 + this.Offset.X + this.Parent.WidthOffset, t + 147 + this.Offset.Y), super.SetVerticalPosition(t)
        }
        SetRightLabel(t) {
            return this
        }
        SetRightBadge(t) {
            return this
        }
        Draw() {
            super.Draw();
            const t = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ",
                e = this.currOffset;
            this._itemText.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._itemText.caption = t, this._arrowLeft.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowRight.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowLeft.pos = new c(380 - e + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.pos.Y), this.Selected ? (this._arrowLeft.Draw(), this._arrowRight.Draw(), this._itemText.pos = new c(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y)) : this._itemText.pos = new c(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y), this._itemText.Draw()
        }
    }
    Number.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    };
    const O = t => Number.isInteger(t) ? t : parseFloat(t.toFixed(10));
    class D extends x {
        constructor(t, e = "", i = 0, s = 10, n = 0, h = null) {
            super(t, e, h), this.ScrollingEnabled = !0, this.HoldTimeBeforeScroll = 200, this.currOffset = 0, this._leftMoveThreshold = 1, this._rightMoveThreshold = 1, this._lowerThreshold = 0, this._upperThreshold = 10, this._preText = "";
            this.LowerThreshold = i, this.UpperThreshold = i > s ? i : s, this.SelectedValue = n < i || n > s ? i : n, this._arrowLeft = new g("commonmenu", "arrowleft", new c(110, 105), new l(30, 30)), this._arrowRight = new g("commonmenu", "arrowright", new c(280, 105), new l(30, 30)), this._itemText = new m("", new c(290, 104), .35, a.White, r.ChaletLondon, o.Right)
        }
        get PreCaptionText() {
            return this._preText
        }
        set PreCaptionText(t) {
            if ("string" != typeof t) throw new Error("The pre caption text must be a string");
            this._preText = t, this.currOffset = p.GetTextWidth(this.PreCaptionText + this._value.toString(), this._itemText && this._itemText.font ? this._itemText.font : 0, .35)
        }
        get LeftMoveThreshold() {
            return this._leftMoveThreshold
        }
        set LeftMoveThreshold(t) {
            if (!t) throw new Error("The left threshold can't be null");
            this._leftMoveThreshold = t
        }
        get RightMoveThreshold() {
            return this._rightMoveThreshold
        }
        set RightMoveThreshold(t) {
            if (!t) throw new Error("The right threshold can't be null");
            this._rightMoveThreshold = t
        }
        get LowerThreshold() {
            return this._lowerThreshold
        }
        set LowerThreshold(t) {
            if ("number" != typeof t && !t) throw new Error("The lower threshold can't be null");
            this._lowerThreshold = t, this.SelectedValue < this._lowerThreshold && (this.SelectedValue = this._lowerThreshold)
        }
        get UpperThreshold() {
            return this._upperThreshold
        }
        set UpperThreshold(t) {
            if ("number" != typeof t && !t) throw new Error("The upper threshold can't be null");
            this._upperThreshold = t, this.SelectedValue > this._upperThreshold && (this.SelectedValue = this._upperThreshold)
        }
        get SelectedValue() {
            return this._value
        }
        set SelectedValue(t) {
            if (t < this._lowerThreshold || t > this._upperThreshold) throw new Error("The value can not be outside the lower or upper limits");
            this._value = O(t), this.currOffset = p.GetTextWidth(this.PreCaptionText + this._value.toString(), this._itemText && this._itemText.font ? this._itemText.font : 0, this._itemText && this._itemText.scale ? this._itemText.scale : .35)
        }
        SetVerticalPosition(t) {
            this._arrowLeft.pos = new c(300 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y), this._arrowRight.pos = new c(400 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y), this._itemText.pos = new c(300 + this.Offset.X + this.Parent.WidthOffset, t + 147 + this.Offset.Y), super.SetVerticalPosition(t)
        }
        SetRightLabel(t) {
            return this
        }
        SetRightBadge(t) {
            return this
        }
        Draw() {
            super.Draw();
            const t = this.currOffset;
            this._itemText.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._itemText.caption = this.PreCaptionText + this._value.toString(), this._arrowLeft.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowRight.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowLeft.pos = new c(380 - t + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.pos.Y), this.Selected ? (this._arrowLeft.Draw(), this._arrowRight.Draw(), this._itemText.pos = new c(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y)) : this._itemText.pos = new c(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y), this._itemText.Draw()
        }
    }
    class b extends x {
        get Index() {
            return this._index % this._items.length
        }
        set Index(t) {
            this._index = 1e8 - 1e8 % this._items.length + t
        }
        constructor(t, e, i, s = "", n = !1, h = null) {
            super(t, s, h);
            this._items = e, this._arrowLeft = new g("commonmenutu", "arrowleft", new c(0, 105), new l(15, 15)), this._arrowRight = new g("commonmenutu", "arrowright", new c(0, 105), new l(15, 15)), this._rectangleBackground = new I(new c(0, 0), new l(150, 9), new a(4, 32, 57, 255)), this._rectangleSlider = new I(new c(0, 0), new l(75, 9), new a(57, 116, 200, 255)), this._rectangleDivider = new I(new c(0, 0), new l(2.5, 20), n ? a.WhiteSmoke : a.Transparent), this.Index = i
        }
        SetVerticalPosition(t) {
            this._rectangleBackground.pos = new c(250 + this.Offset.X + this.Parent.WidthOffset, t + 158.5 + this.Offset.Y), this._rectangleSlider.pos = new c(250 + this.Offset.X + this.Parent.WidthOffset, t + 158.5 + this.Offset.Y), this._rectangleDivider.pos = new c(323.5 + this.Offset.X + this.Parent.WidthOffset, t + 153 + this.Offset.Y), this._arrowLeft.pos = new c(235 + this.Offset.X + this.Parent.WidthOffset, 155.5 + t + this.Offset.Y), this._arrowRight.pos = new c(400 + this.Offset.X + this.Parent.WidthOffset, 155.5 + t + this.Offset.Y), super.SetVerticalPosition(t)
        }
        IndexToItem(t) {
            return this._items[t]
        }
        Draw() {
            super.Draw(), this._arrowLeft.color = this.Enabled ? this.Selected ? a.Black : a.WhiteSmoke : new a(163, 159, 148), this._arrowRight.color = this.Enabled ? this.Selected ? a.Black : a.WhiteSmoke : new a(163, 159, 148);
            let t = (this._rectangleBackground.size.Width - this._rectangleSlider.size.Width) / (this._items.length - 1) * this.Index;
            this._rectangleSlider.pos = new c(250 + this.Offset.X + t + +this.Parent.WidthOffset, this._rectangleSlider.pos.Y), this.Selected && (this._arrowLeft.Draw(), this._arrowRight.Draw()), this._rectangleBackground.Draw(), this._rectangleSlider.Draw(), this._rectangleDivider.Draw()
        }
        SetRightBadge(t) {}
        SetRightLabel(t) {}
    }
    class R extends _ {
        constructor(t, e, i) {
            super(t, e, i), this.Items = []
        }
        addItem(t) {
            this.Items.push(t)
        }
        Draw(t) {
            if (!this.enabled) return;
            t = t || new l;
            const e = 1080 * (p.width / p.height),
                i = this.size.Width / e,
                s = this.size.Height / 1080,
                n = (this.pos.X + t.Width) / e + .5 * i,
                h = (this.pos.Y + t.Height) / 1080 + .5 * s;
            for (var o of (mp.game.graphics.drawRect(n, h, i, s, this.color.R, this.color.G, this.color.B, this.color.A), this.Items)) o.Draw(new l(this.pos.X + t.Width, this.pos.Y + t.Height))
        }
    }
    class L {
        static PlaySound(t, e) {
            mp.game.audio.playSound(-1, t, e, !1, 0, !0)
        }
    }
    class v {
        constructor() {
            this.handlers = []
        }
        on(t) {
            this.handlers.push(t)
        }
        off(t) {
            this.handlers = this.handlers.filter(e => e !== t)
        }
        emit(...t) {
            this.handlers.slice(0).forEach(e => e(...t))
        }
        expose() {
            return this
        }
        count() {
            return this.handlers.length
        }
    }
    i.d(e, "default", function () {
        return P
    });
    let A = [];
    class P {
        constructor(t, e, i, s, n) {
            this.Id = w(), this._visible = !0, this.counterPretext = "", this.counterOverride = void 0, this.lastUpDownNavigation = 0, this.lastLeftRightNavigation = 0, this.extraOffset = 0, this.ParentMenu = null, this.ParentItem = null, this._defaultTitleScale = 1.15, this.WidthOffset = 0, this.MouseControlsEnabled = !1, this._justOpened = !0, this._justOpenedFromPool = !1, this._justClosedFromPool = !1, this._poolOpening = null, this.safezoneOffset = new c(0, 0), this._activeItem = 1e3, this.MaxItemsOnScreen = 9, this._maxItem = this.MaxItemsOnScreen, this.recalculateDescriptionNextFrame = 1, this.AUDIO_LIBRARY = "HUD_FRONTEND_DEFAULT_SOUNDSET", this.AUDIO_UPDOWN = "NAV_UP_DOWN", this.AUDIO_LEFTRIGHT = "NAV_LEFT_RIGHT", this.AUDIO_SELECT = "SELECT", this.AUDIO_BACK = "BACK", this.AUDIO_ERROR = "ERROR", this.MenuItems = [], this.IndexChange = new v, this.ListChange = new v, this.DynamicListChange = new v, this.SliderChange = new v, this.SliderSelect = new v, this.CheckboxChange = new v, this.ItemSelect = new v, this.MenuOpen = new v, this.MenuClose = new v, this.MenuChange = new v, this.MouseEdgeEnabled = !0, i instanceof c || (i = c.Parse(i)), this.title = t, this.subtitle = e, this.spriteLibrary = s || "commonmenu", this.spriteName = n || "interaction_bgd", this.offset = new c(i.X, i.Y), this.Children = new Map, this._mainMenu = new R(new c(0, 0), new l(700, 500), new a(0, 0, 0, 0)), this._logo = new g(this.spriteLibrary, this.spriteName, new c(0 + this.offset.X, 0 + this.offset.Y), new l(431, 107)), this._mainMenu.addItem(this._title = new m(this.title, new c(215 + this.offset.X, 20 + this.offset.Y), this._defaultTitleScale, new a(255, 255, 255), 1, o.Centered)), "" !== this.subtitle && (this._mainMenu.addItem(new I(new c(0 + this.offset.X, 107 + this.offset.Y), new l(431, 37), new a(0, 0, 0, 255))), this._mainMenu.addItem(this._subtitle = new m(this.subtitle, new c(8 + this.offset.X, 110 + this.offset.Y), .35, new a(255, 255, 255), 0, o.Left)), this.subtitle.startsWith("~") && (this.counterPretext = this.subtitle.substr(0, 3)), this._counterText = new m("", new c(425 + this.offset.X, 110 + this.offset.Y), .35, new a(255, 255, 255), 0, o.Right), this.extraOffset += 37), this._upAndDownSprite = new g("commonmenu", "shop_arrows_upanddown", new c(190 + this.offset.X, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new l(50, 50)), this._extraRectangleUp = new I(new c(0 + this.offset.X, 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new l(431, 18), new a(0, 0, 0, 200)), this._extraRectangleDown = new I(new c(0 + this.offset.X, 162 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new l(431, 18), new a(0, 0, 0, 200)), this._descriptionBar = new I(new c(this.offset.X, 123), new l(431, 4), a.Black), this._descriptionRectangle = new g("commonmenu", "gradient_bgd", new c(this.offset.X, 127), new l(431, 30)), this._descriptionText = new m("", new c(this.offset.X + 5, 125), .35, new a(255, 255, 255, 255), r.ChaletLondon, o.Left), this._descriptionText.Wrap = 400, this._background = new g("commonmenu", "gradient_bgd", new c(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset), new l(290, 25)), this._visible = !1, mp.events.add("render", this.render.bind(this)), console.log(`Created Native UI! ${this.title}`)
        }
        get TitleScale() {
            return this._title.scale
        }
        set TitleScale(t) {
            this._title.scale = t
        }
        GetTitle() {
            return this._title
        }
        get TitleText() {
            return this._title.caption
        }
        set TitleText(t) {
            this._title.caption = t
        }
        get SubTitle() {
            return this._subtitle
        }
        get SubTitleText() {
            return this._subtitle.caption
        }
        set SubTitleText(t) {
            this._subtitle.caption = t
        }
        get Visible() {
            return this._visible
        }
        set Visible(t) {
            if (this._visible = t, L.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), t && this.UpdateDescriptionCaption(), !0 !== this._justOpenedFromPool)
                if (t) {
                    if (this._justOpened = !0, this.MenuOpen.emit(), null === this.ParentMenu && !A.includes(this) && this !== this._poolOpening) {
                        const t = A.length ? A[A.length - 1] : null;
                        A.push(this), t !== this._poolOpening && null !== t && (t._justClosedFromPool = !0, t.Visible = !1)
                    }
                } else {
                    if (!0 === this._justClosedFromPool) return void(this._justClosedFromPool = !1);
                    null === this.ParentMenu && A.includes(this) && A.length && (A[A.length - 1] === this && (A.pop(), this._justOpenedFromPool = !0, A.length || (this._poolOpening = null)), A.length && (this._poolOpening = A[A.length - 1], A[A.length - 1].Visible = !0)), 0 === A.length && mp.game.invoke("0x8DB8CFFD58B62552".toUpperCase(), 1)
                }
            else this._justOpenedFromPool = !1
        }
        get CurrentSelection() {
            return this._activeItem % this.MenuItems.length
        }
        set CurrentSelection(t) {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = P.__maxItems - P.__maxItems % this.MenuItems.length + t, this.CurrentSelection > this._maxItem ? (this._maxItem = this.CurrentSelection, this._minItem = this.CurrentSelection - this.MaxItemsOnScreen) : this.CurrentSelection < this._minItem && (this._maxItem = this.MaxItemsOnScreen + this.CurrentSelection, this._minItem = this.CurrentSelection), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.UpdateDescriptionCaption()
        }
        RecalculateDescriptionPosition() {
            const t = this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.MaxItemsOnScreen + 2 : this.MenuItems.length;
            this._descriptionBar.size = new l(431 + this.WidthOffset, 4), this._descriptionRectangle.size = new l(431 + this.WidthOffset, 30), this._descriptionBar.pos = new c(this.offset.X, 112 + this.extraOffset + this.offset.Y), this._descriptionRectangle.pos = new c(this.offset.X, 112 + this.extraOffset + this.offset.Y), this._descriptionText.pos = new c(this.offset.X + 8, 118 + this.extraOffset + this.offset.Y), this._descriptionBar.pos = new c(this.offset.X, 38 * t + this._descriptionBar.pos.Y), this._descriptionRectangle.pos = new c(this.offset.X, 38 * t + this._descriptionRectangle.pos.Y), this._descriptionText.pos = new c(this.offset.X + 8, 38 * t + this._descriptionText.pos.Y)
        }
        SetMenuWidthOffset(t) {
            if (this.WidthOffset = t, null != this._logo && (this._logo.size = new l(431 + this.WidthOffset, 107)), this._mainMenu.Items[0].pos = new c(215 + this.offset.X + this.WidthOffset / 2, 20 + this.offset.Y), this._counterText && (this._counterText.pos = new c(425 + this.offset.X + t, 110 + this.offset.Y)), this._mainMenu.Items.length >= 2) {
                this._mainMenu.Items[1].size = new l(431 + this.WidthOffset, 37)
            }
        }
        AddItem(t) {
            this._justOpened && (this._justOpened = !1), t.Offset = this.offset, t.Parent = this, t.SetVerticalPosition(25 * this.MenuItems.length - 37 + this.extraOffset), this.MenuItems.push(t), this.RefreshIndex()
        }
        RemoveItem(t) {
            for (let e = 0; e < this.MenuItems.length; e++)
                if (this.MenuItems[e] === t) {
                    this.MenuItems.splice(e, 1);
                    break
                } this.RefreshIndex()
        }
        RefreshIndex() {
            if (0 == this.MenuItems.length) return this._activeItem = 1e3, this._maxItem = this.MaxItemsOnScreen, void(this._minItem = 0);
            for (let t = 0; t < this.MenuItems.length; t++) this.MenuItems[t].Selected = !1;
            this._activeItem = P.__maxItems - P.__maxItems % this.MenuItems.length, this._maxItem = this.MaxItemsOnScreen, this._minItem = 0, this._visible && this.UpdateDescriptionCaption()
        }
        Clear() {
            this.MenuItems = [], this.RecalculateDescriptionPosition()
        }
        Open() {
            this.Visible = !0
        }
        CleanUp(t = !1) {
            t && this.Children.forEach(t => {
                t.Close(!0)
            }), this.RefreshIndex()
        }
        Close(t = !1) {
            this.Visible = !1, this.CleanUp(t), this.MenuClose.emit(!0)
        }
        set Subtitle(t) {
            this.subtitle = t, this._subtitle.caption = t
        }
        GoLeft() {
            if ((this.MenuItems[this.CurrentSelection] instanceof T || this.MenuItems[this.CurrentSelection] instanceof D || this.MenuItems[this.CurrentSelection] instanceof b) && this.MenuItems[this.CurrentSelection].Enabled)
                if (this.MenuItems[this.CurrentSelection] instanceof T) {
                    const t = this.MenuItems[this.CurrentSelection];
                    if (0 == t.Collection.length) return;
                    t.Index--, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(t, t.Index), this.UpdateDescriptionCaption()
                } else if (this.MenuItems[this.CurrentSelection] instanceof D) {
                const t = this.MenuItems[this.CurrentSelection];
                t.SelectedValue <= t.LowerThreshold ? t.SelectedValue = t.UpperThreshold : t.SelectedValue -= t.LeftMoveThreshold, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.DynamicListChange.emit(t, t.SelectedValue), this.UpdateDescriptionCaption()
            } else if (this.MenuItems[this.CurrentSelection] instanceof b) {
                const t = this.MenuItems[this.CurrentSelection];
                t.Index = t.Index - 1, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.SliderChange.emit(t, t.Index, t.IndexToItem(t.Index)), this.UpdateDescriptionCaption()
            }
        }
        GoRight() {
            if ((this.MenuItems[this.CurrentSelection] instanceof T || this.MenuItems[this.CurrentSelection] instanceof D || this.MenuItems[this.CurrentSelection] instanceof b) && this.MenuItems[this.CurrentSelection].Enabled)
                if (this.MenuItems[this.CurrentSelection] instanceof T) {
                    const t = this.MenuItems[this.CurrentSelection];
                    if (0 == t.Collection.length) return;
                    t.Index++, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(t, t.Index)
                } else if (this.MenuItems[this.CurrentSelection] instanceof D) {
                const t = this.MenuItems[this.CurrentSelection];
                t.SelectedValue >= t.UpperThreshold ? t.SelectedValue = t.LowerThreshold : t.SelectedValue += t.RightMoveThreshold, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.DynamicListChange.emit(t, t.SelectedValue)
            } else if (this.MenuItems[this.CurrentSelection] instanceof b) {
                const t = this.MenuItems[this.CurrentSelection];
                t.Index++, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.SliderChange.emit(t, t.Index, t.IndexToItem(t.Index))
            }
        }
        SelectItem() {
            if (!this.MenuItems[this.CurrentSelection].Enabled) return void L.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
            const t = this.MenuItems[this.CurrentSelection];
            if (this.MenuItems[this.CurrentSelection] instanceof S) t.Checked = !t.Checked, L.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.CheckboxChange.emit(t, t.Checked);
            else if (L.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.ItemSelect.emit(t, this.CurrentSelection), this.Children.has(t.Id)) {
                const e = this.Children.get(t.Id);
                this.Visible = !1, e.Visible = !0, this.MenuChange.emit(e, !0)
            }
            t.fireEvent()
        }
        CurrentSelectionHasChildren() {
            const t = this.MenuItems[this.CurrentSelection];
            return !!(this.MenuItems[this.CurrentSelection] instanceof x && this.Children.has(t.Id))
        }
        IsMouseInListItemArrows(t, e, i) {
            mp.game.invoke("0x54ce8ac98e120cab".toUpperCase(), "jamyfafi"), mp.game.ui.addTextComponentSubstringPlayerName(t.Text);
            let s = p.ResolutionMaintainRatio();
            let n = 1080 * (s.Width / s.Height);
            const h = 5 + mp.game.invoke("0x85f061da64ed2f67".toUpperCase(), 0) * n * .35 + 10,
                o = 431 - h;
            return p.IsMouseInBounds(e, new l(h, 38)) ? 1 : p.IsMouseInBounds(new c(e.X + h, e.Y), new l(o, 38)) ? 2 : 0
        }
        ProcessMouse() {
            if (!this.Visible || this._justOpened || 0 == this.MenuItems.length || !this.MouseControlsEnabled) return void this.MenuItems.filter(t => t.Hovered).forEach(t => t.Hovered = !1);
            mp.gui.cursor.visible || (mp.gui.cursor.visible = !0);
            let t = this.MenuItems.length - 1,
                e = 0;
            this.MenuItems.length > this.MaxItemsOnScreen + 1 && (t = this._maxItem), p.IsMouseInBounds(new c(0, 0), new l(30, 1080)) && this.MouseEdgeEnabled ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() + 5), mp.game.ui.setCursorSprite(6)) : p.IsMouseInBounds(new c(p.ResolutionMaintainRatio().Width - 30, 0), new l(30, 1080)) && this.MouseEdgeEnabled ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() - 5), mp.game.ui.setCursorSprite(7)) : this.MouseEdgeEnabled && mp.game.ui.setCursorSprite(1);
            for (let i = this._minItem; i <= t; i++) {
                let t = this.offset.X,
                    s = this.offset.Y + 144 - 37 + this.extraOffset + 38 * e,
                    n = (this.offset.Y, this.extraOffset, this.safezoneOffset.Y, this.CurrentSelection, 431 + this.WidthOffset);
                const h = 38,
                    o = this.MenuItems[i];
                if (p.IsMouseInBounds(new c(t, s), new l(n, h))) {
                    o.Hovered = !0;
                    const e = this.IsMouseInListItemArrows(this.MenuItems[i], new c(t, s), 0);
                    if (o.Hovered && 1 == e && (this.MenuItems[i] instanceof T || this.MenuItems[i] instanceof D) && mp.game.invoke("0x8DB8CFFD58B62552".toUpperCase(), 5), mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24))
                        if (o.Selected && o.Enabled)
                            if ((this.MenuItems[i] instanceof T || this.MenuItems[i] instanceof D) && this.IsMouseInListItemArrows(this.MenuItems[i], new c(t, s), 0) > 0) switch (e) {
                                case 1:
                                    L.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.MenuItems[i].fireEvent(), this.ItemSelect.emit(this.MenuItems[i], i);
                                    break;
                                case 2:
                                    let t = this.MenuItems[i];
                                    (null == t.Collection ? t.Items.Count : t.Collection.Count) > 0 && (t.Index++, L.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(t, t.Index))
                            } else this.SelectItem();
                            else o.Selected ? !o.Enabled && o.Selected && L.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY) : (this.CurrentSelection = i, L.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.SelectItem(), this.UpdateDescriptionCaption())
                } else o.Hovered = !1;
                e++
            }
            const i = 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset + this.safezoneOffset.Y,
                s = this.safezoneOffset.X + this.offset.X;
            this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (p.IsMouseInBounds(new c(s, i), new l(431 + this.WidthOffset, 18)) ? (this._extraRectangleUp.color = new a(30, 30, 30, 255), (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp())) : this._extraRectangleUp.color = new a(0, 0, 0, 200), p.IsMouseInBounds(new c(s, i + 18), new l(431 + this.WidthOffset, 18)) ? (this._extraRectangleDown.color = new a(30, 30, 30, 255), (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown())) : this._extraRectangleDown.color = new a(0, 0, 0, 200))
        }
        ProcessControl() {
            this.Visible && (this._justOpened ? this._justOpened = !1 : (mp.game.controls.isControlJustReleased(0, 177) && this.GoBack(), 0 != this.MenuItems.length && (mp.game.controls.isControlPressed(0, 172) && this.lastUpDownNavigation + 120 < Date.now() ? (this.lastUpDownNavigation = Date.now(), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp()) : mp.game.controls.isControlJustReleased(0, 172) ? this.lastUpDownNavigation = 0 : mp.game.controls.isControlPressed(0, 173) && this.lastUpDownNavigation + 120 < Date.now() ? (this.lastUpDownNavigation = Date.now(), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown()) : mp.game.controls.isControlJustReleased(0, 173) ? this.lastUpDownNavigation = 0 : mp.game.controls.isControlPressed(0, 174) && this.lastLeftRightNavigation + 100 < Date.now() ? (this.lastLeftRightNavigation = Date.now(), this.GoLeft()) : mp.game.controls.isControlJustReleased(0, 174) ? this.lastLeftRightNavigation = 0 : mp.game.controls.isControlPressed(0, 175) && this.lastLeftRightNavigation + 100 < Date.now() ? (this.lastLeftRightNavigation = Date.now(), this.GoRight()) : mp.game.controls.isControlJustReleased(0, 175) ? this.lastLeftRightNavigation = 0 : mp.game.controls.isControlJustPressed(0, 201) && this.SelectItem())))
        }
        GoUpOverflow() {
            this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (this._activeItem % this.MenuItems.length <= this._minItem ? this._activeItem % this.MenuItems.length == 0 ? (this._minItem = this.MenuItems.length - this.MaxItemsOnScreen - 1, this._maxItem = this.MenuItems.length - 1, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = P.__maxItems - P.__maxItems % this.MenuItems.length, this._activeItem += this.MenuItems.length - 1, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this._minItem--, this._maxItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0), L.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.UpdateDescriptionCaption())
        }
        GoUp() {
            this.MenuItems.length > this.MaxItemsOnScreen + 1 || (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, L.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.UpdateDescriptionCaption())
        }
        GoDownOverflow() {
            this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (this._activeItem % this.MenuItems.length >= this._maxItem ? this._activeItem % this.MenuItems.length == this.MenuItems.length - 1 ? (this._minItem = 0, this._maxItem = this.MaxItemsOnScreen, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = P.__maxItems - P.__maxItems % this.MenuItems.length, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this._minItem++, this._maxItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0), L.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.UpdateDescriptionCaption())
        }
        GoDown() {
            this.MenuItems.length > this.MaxItemsOnScreen + 1 || (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, L.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]), this.UpdateDescriptionCaption())
        }
        GoBack() {
            this.Visible = !1, null != this.ParentMenu ? (this.ParentMenu.Visible = !0, this.MenuChange.emit(this.ParentMenu, !1)) : this.CleanUp(!0), this.MenuClose.emit(!1)
        }
        BindMenuToItem(t, e) {
            this.MenuItems.includes(e) || this.AddItem(e), t.ParentMenu = this, t.ParentItem = e, this.Children.set(e.Id, t)
        }
        ReleaseMenuFromItem(t) {
            if (!this.Children.has(t.Id)) return !1;
            const e = this.Children.get(t.Id);
            return e.ParentItem = null, e.ParentMenu = null, this.Children.delete(t.Id), !0
        }
        UpdateDescriptionCaption() {
            this.MenuItems.length && this.recalculateDescriptionNextFrame++
        }
        CalculateDescription() {
            if (this.MenuItems.length > 0 && (this.recalculateDescriptionNextFrame > 0 && this.recalculateDescriptionNextFrame--, this._descriptionText.caption = this.MenuItems[this._activeItem % this.MenuItems.length].Description, this.RecalculateDescriptionPosition(), this._descriptionText.caption && "" !== this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim())) {
                const t = p.GetLineCount(this._descriptionText.caption, this._descriptionText.pos, this._descriptionText.font, this._descriptionText.scale, this._descriptionText.Wrap);
                this._descriptionRectangle.size = new l(431 + this.WidthOffset, 25 * t + 15), 0 === t && this.recalculateDescriptionNextFrame++
            }
        }
        render() {
            if (!this.Visible) return;
            this._justOpened && (null == this._logo || this._logo.IsTextureDictionaryLoaded || this._logo.LoadTextureDictionary(), this._background.IsTextureDictionaryLoaded || this._background.LoadTextureDictionary(), this._descriptionRectangle.IsTextureDictionaryLoaded || this._descriptionRectangle.LoadTextureDictionary(), this._upAndDownSprite.IsTextureDictionaryLoaded || this._upAndDownSprite.LoadTextureDictionary(), this.recalculateDescriptionNextFrame || this.recalculateDescriptionNextFrame++), this._mainMenu.Draw(), this.ProcessMouse(), this.ProcessControl(), this._background.size = this.MenuItems.length > this.MaxItemsOnScreen + 1 ? new l(431 + this.WidthOffset, 38 * (this.MaxItemsOnScreen + 1)) : new l(431 + this.WidthOffset, 38 * this.MenuItems.length), this._background.Draw(), this.recalculateDescriptionNextFrame && this.CalculateDescription(), this.MenuItems.length > 0 && (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, "" !== this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim() && (this._descriptionBar.Draw(), this._descriptionRectangle.Draw(), this._descriptionText.Draw()));
            let t = 0;
            if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) {
                for (const e of this.MenuItems) e.SetVerticalPosition(38 * t - 37 + this.extraOffset), e.Draw(), t++;
                this._counterText && this.counterOverride && (this._counterText.caption = this.counterPretext + this.counterOverride, this._counterText.Draw())
            } else {
                for (let e = this._minItem; e <= this._maxItem; e++) {
                    let i = this.MenuItems[e];
                    i.SetVerticalPosition(38 * t - 37 + this.extraOffset), i.Draw(), t++
                }
                if (this._extraRectangleUp.size = new l(431 + this.WidthOffset, 18), this._extraRectangleDown.size = new l(431 + this.WidthOffset, 18), this._upAndDownSprite.pos = new c(190 + this.offset.X + this.WidthOffset / 2, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), this._extraRectangleUp.Draw(), this._extraRectangleDown.Draw(), this._upAndDownSprite.Draw(), this._counterText) {
                    if (this.counterOverride) this._counterText.caption = this.counterPretext + this.counterOverride;
                    else {
                        const t = this.CurrentSelection + 1 + " / " + this.MenuItems.length;
                        this._counterText.caption = this.counterPretext + t
                    }
                    this._counterText.Draw()
                }
            }
            this._logo.Draw()
        }
    }
    P.__maxItems = 1e3, exports.Menu = P, exports.UIMenuItem = x, exports.UIMenuListItem = T, exports.UIMenuDynamicListItem = D, exports.UIMenuCheckboxItem = S, exports.UIMenuSliderItem = b, exports.BadgeStyle = h, exports.Point = c, exports.Size = l, exports.Color = a, exports.Font = r, exports.ItemsCollection = M, exports.ListItem = C
}]);