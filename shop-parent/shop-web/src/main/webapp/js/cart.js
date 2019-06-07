(function(e) {
	e.topbar = {
		init : function() {
			if (e(".SZY-USER-NAME").size() > 0) {
				e.get("/site/user", {}, function(i) {
					if (i.code == 0 && i.data != null) {
						e.sidebar.renderLogin(i.data);
						e.sidebar.initLogin = true;
						var t = i.data;
						if (t.site_id != undefined) {
							if (t.site_id == 0) {
								e.get("/subsite/selector", {}, function(i) {
									if (i.code == 0 && i.data != null) {
										var t = e(e.parseHTML(i.data, true));
										e("body").append(t)
									}
								}, "json")
							}
							if (t.site_change != undefined
									|| t.site_change != null) {
								if (e(".SZY-SUBSITE").size() > 0) {
									e(".SZY-SUBSITE").html(t.site_change)
								}
							}
						}
					}
				}, "json")
			}
		}
	};
	e.sidebar = {
		initLogin : false,
		init : function() {
			e(".sidebar-historybox-trigger").click(
					function() {
						var i = this;
						if (e(i).data("load")) {
							return
						}
						e.get("/history/box-goods-list", {}, function(t) {
							if (t.code == 0) {
								e(".sidebar-historybox").find(
										".sidebar-historybox-goods-list").html(
										t.data)
							}
							e(i).data("load", true)
						}, "json")
					});
			e(".sidebar-user-trigger").mouseover(function() {
				if (e.sidebar.initLogin) {
					return
				}
				e.get("/site/user", {}, function(i) {
					if (i.code == 0 && i.data != null) {
						e.sidebar.renderLogin(i.data)
					}
				});
				e.sidebar.initLogin = true
			})
		},
		renderLogin : function(i) {
			if (i && i.cart) {
				var t = i.cart.goods_count;
				if (t > 99) {
					t = "99+"
				}
				e(".SZY-CART-COUNT").html(t)
			}
			if (i && i.user_name) {
				var o = e(".SZY-USER-ALREADY-LOGIN");
				e(o).find(".SZY-USER-NAME").html(i.user_name);
				e(o).find(".SZY-USER-PIC").attr("src", i.headimg);
				if (i.user_rank) {
					e(o).find(".SZY-USER-RANK-IMG").attr("src",
							i.user_rank.rank_img);
					e(o).find(".SZY-USER-RANK-NAME")
							.html(i.user_rank.rank_name)
				}
				e(o).find(".SZY-USER-LAST-LOGIN").html(i.last_time_format);
				e(".SZY-USER-NOT-LOGIN").hide();
				e(".SZY-USER-ALREADY-LOGIN").show()
			} else {
				e(".SZY-USER-NOT-LOGIN").show();
				e(".SZY-USER-ALREADY-LOGIN").hide()
			}
		},
		fly : function(i, t, o) {
			if (i && t && e(o).size() > 0) {
				var s = e(o).offset();
				var n = e('<img class="fly-img" src="' + i + '">');
				if (e.isFunction(n.fly)) {
					n.fly({
						start : {
							left : t.pageX - 20,
							top : t.pageY - e(window).scrollTop()
						},
						end : {
							left : s.left + 20,
							top : s.top - e(window).scrollTop() + 50,
							width : 0,
							height : 0
						},
						onEnd : function() {
							this.destory()
						}
					})
				}
			}
		}
	};
	e.cartbox = {
		lasttime : 0,
		count : 0,
		init : function() {
			e(".cartbox").mouseenter(
					function() {
						var i = (new Date).getTime();
						if (e.cartbox.lasttime == 0
								|| i - e.cartbox.lasttime > 5 * 1e3) {
							e.cartbox.load()
						}
						e(this).find(".cartbox-goods-list").show()
					}).mouseleave(function() {
				e(this).find(".cartbox-goods-list").hide()
			});
			e(".sidebar-cartbox-trigger").click(
					function() {
						var i = (new Date).getTime();
						if (e.cartbox.lasttime == 0
								|| i - e.cartbox.lasttime > 5 * 1e3) {
							e.cartbox.load()
						}
					})
		},
		load : function() {
			e.cartbox.lasttime = (new Date).getTime();
			if (e(".cartbox").size() > 0 || e(".sidebar-cartbox").size() > 0) {
				e.get("/cart/box-goods-list", {}, function(i) {
					if (i.code == 0) {
						e.cartbox.count = i.count;
						e.cartbox.renderCount();
						var t = e(".cartbox").find(".cartbox-goods-list");
						if (t.size() > 0) {
							e(t).html(i.data[0])
						}
						var o = e(".sidebar-cartbox").find(
								".sidebar-cartbox-goods-list");
						if (o.size() > 0) {
							e(o).html(i.data[1]);
							e(".sidebar-cartbox").find(".cart-panel-content")
									.height(e(window).height() - 90);
							e(".sidebar-cartbox").find(".bonus-panel-content")
									.height(e(window).height() - 40)
						}
					}
				}, "json")
			}
		},
		add : function(e) {
			this.count = parseInt(this.count) + parseInt(e);
			this.lasttime = 0;
			this.renderCount()
		},
		renderCount : function(i) {
			if (!i) {
				i = this.count
			}
			if (i > 99) {
				i = "99+"
			}
			e(".cartbox").find(".SZY-CART-COUNT").html(i);
			e(".sidebar-cartbox-trigger").find(".SZY-CART-COUNT").html(i)
		}
	};
	e.cart = {
		loading : false,
		request : null,
		quickBuy : function(i, t, o) {
			e.loading.start();
			var s = {
				sku_id : i,
				number : t
			};
			if (o && o.group_sn) {
				s.group_sn = o.group_sn
			}
			e.post("http://www.szy.yunmall.68mall.com/cart/quick-buy.html", s,
					function(i) {
						if (i.code == 0) {
							e.go(i.data)
						} else {
							e.msg(i.message, {
								time : 5e3
							})
						}
					}, "json").always(function() {
				e.loading.stop()
			})
		},
		add : function(i, t, o) {
			var s = {
				is_sku : true,
				image_url : undefined,
				event : undefined,
				callback : undefined
			};
			o = e.extend(true, s, o);
			var n = {
				sku_id : i,
				number : t
			};
			if (o.shop_id != undefined && o.shop_id != 0) {
				n.shop_id = o.shop_id
			}
			if (o.is_sku) {
				e.post("/cart/add", n, function(i) {
					if (i.code == 0) {
						e.msg(i.message);
						e.cartbox.add(t);
						e.sidebar.fly(o.image_url, o.event,
								e(".sidebar-cartbox-trigger"))
					} else {
						e.msg(i.message, {
							time : 5e3
						})
					}
					if (e.isFunction(o.callback)) {
						o.callback.call(e.cart, i)
					}
				}, "json")
			} else {
				e.post("/cart/add", {
					goods_id : i,
					number : t
				}, function(i) {
					if (i.code == 0) {
						e.msg(i.message);
						e.cartbox.add(t);
						e.sidebar.fly(o.image_url, o.event,
								e(".sidebar-cartbox-trigger"))
					} else if (i.code == 98) {
						e("body").append(i.data)
					} else {
						e.msg(i.message, {
							time : 5e3
						})
					}
					if (e.isFunction(o.callback)) {
						o.callback.call(e.cart, i)
					}
				}, "json")
			}
		},
		remove : function(i, t) {
			if (this.request != null && e.isFunction(this.request.abort)) {
				this.request.abort()
			}
			this.request = e.post("/cart/remove", {
				cart_ids : i
			}, function(i) {
				if (i.code == 0) {
					if (i.message != null && i.message.length > 0) {
						e.msg(i.message)
					}
					e.cartbox.load()
				} else {
					e.msg(i.message, {
						time : 5e3
					})
				}
				if (e.isFunction(t)) {
					t.call(e.cart, i)
				}
			}, "json");
			return this.request
		},
		del : function(i, t) {
			if (this.request != null && e.isFunction(this.request.abort)) {
				this.request.abort()
			}
			this.request = e.post("/cart/delete", {
				cart_ids : i
			}, function(i) {
				if (i.code == 0) {
					if (i.message.length > 0) {
						e.msg(i.message)
					}
					e.cartbox.load()
				} else {
					e.msg(i.message, {
						time : 5e3
					})
				}
				if (e.isFunction(t)) {
					t.call(e.cart, i)
				}
			}, "json");
			return this.request
		},
		getSkuId : function(i, t) {
			var o = i.join("|");
			if (t[o]) {
				return t[o]["sku_id"]
			} else {
				var s = e.toPermute(i);
				for (var n = 0; n < s.length; n++) {
					i = s[n];
					i = i.join("|");
					if (t[i]) {
						return t[i]["sku_id"]
					}
				}
				return null
			}
		},
		changeNumber : function(i, t, o) {
			if (this.request != null && e.isFunction(this.request.abort)) {
				this.request.abort()
			}
			this.request = e.post("/cart/change-number", {
				sku_id : i,
				number : t
			}, function(i) {
				if (i.code == 0) {
				} else {
					e.msg(i.message, {
						time : 5e3
					})
				}
				if (e.isFunction(o)) {
					o.call(e.cart, i)
				}
			}, "json");
			return this.request
		},
		select : function(i, t) {
			if (this.request != null && e.isFunction(this.request.abort)) {
				this.request.abort()
			}
			this.request = e.post("/cart/select", {
				cart_ids : i.join(",")
			}, function(i) {
				if (i.code == 0) {
				} else {
					e.msg(i.message, {
						time : 5e3
					})
				}
				if (e.isFunction(t)) {
					t.call(e.cart, i)
				}
			}, "json");
			return this.request
		}
	};
	e.openim = function(i) {
		var t = "webcall";
		var o = 700;
		var s = 580;
		var n = (window.screen.availHeight - 30 - s) / 2;
		var a = (window.screen.availWidth - 10 - o) / 2;
		var r = window
				.open(
						"",
						t,
						"height="
								+ s
								+ ",,innerHeight="
								+ s
								+ ",width="
								+ o
								+ ",innerWidth="
								+ o
								+ ",top="
								+ n
								+ ",left="
								+ a
								+ ",status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no");
		r.document
				.write('<html><head><title>正在连接客服，请稍后...</title><meta charset="utf-8" /><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" /><link type="text/css" rel="stylesheet" href="common.css"/*tpa=http://www.szy.yunmall.68mall.com/css/common.css*/ /></head><body><div class="loading"><div class="loading-img"><img src="aliim-loading.gif"/*tpa=http://www.szy.yunmall.68mall.com/images/aliim-loading.gif*/></div></div></body></html>');
		var c = {
			goods_id : null,
			order_id : null,
			shop_id : null
		};
		i = e.extend(c, i);
		var l = i.goods_id;
		var d = i.order_id;
		var u = i.shop_id;
		e
				.get(
						"http://www.szy.yunmall.68mall.com/user/im/check.html",
						{},
						function(e) {
							var i = "http://www.szy.yunmall.68mall.com/user/im/open.html";
							if (l) {
								i += "?goods_id=" + l
							} else if (d) {
								i += "?order_id=" + d
							} else if (u) {
								i += "?shop_id=" + u
							}
							r.location = i
						}, "json")
	};
	e.sidebar.comparebox = {
		lasttime : 0,
		count : 0,
		init : function() {
			if (e(".sidebar-comparebox").size() == 0) {
				return
			}
			e(".sidebar-comparebox-trigger")
					.click(
							function() {
								var i = (new Date).getTime();
								if (e.sidebar.comparebox.lasttime == 0
										|| i - e.sidebar.comparebox.lasttime > 5 * 1e3) {
									e.sidebar.comparebox.load()
								}
							})
		},
		load : function() {
			if (e(".sidebar-comparebox").size() == 0) {
				return
			}
			e.sidebar.comparebox.lasttime = (new Date).getTime();
			e.get("/compare/box-goods-list", {}, function(i) {
				if (i.code == 0) {
					e(".sidebar-comparebox").find(
							".sidebar-comparebox-goods-list").html(i.data)
				}
			}, "json")
		},
		reset : function() {
			e.sidebar.comparebox.lasttime = 0
		}
	};
	e.compare = {
		toggle : function(i, t, o, s) {
			e.post("/compare/toggle", {
				goods_id : i
			}, function(i) {
				if (i.code == 0) {
					e.sidebar.comparebox.reset();
					if (i.data == 1) {
						e.sidebar.fly(t, o, e(".sidebar-comparebox-trigger"))
					}
				} else {
					e.msg(i.message)
				}
				if (e.isFunction(s)) {
					s.call(e.compare, i)
				}
			}, "json")
		},
		add : function(i, t, o, s) {
			e.post("/compare/add", {
				goods_id : i
			}, function(i) {
				if (i.code == 0) {
					e.sidebar.comparebox.reset();
					e.sidebar.fly(t, o, e(".sidebar-comparebox-trigger"))
				} else {
					e.msg(i.message)
				}
				if (e.isFunction(s)) {
					s.call(e.compare, i)
				}
			}, "json")
		},
		remove : function(i, t) {
			e.post("/compare/remove", {
				goods_id : i
			}, function(o) {
				if (o.code == 0) {
					e.sidebar.comparebox.load()
				} else {
					e.msg(o.message, {
						time : 5e3
					})
				}
				if (e.isFunction(t)) {
					t.call(e.compare, o)
				}
				if (e.isFunction(e.compare.removeCallback)) {
					e.compare.removeCallback.call(e.compare, i, o)
				}
			}, "json")
		},
		clear : function() {
			e.post("/compare/clear", {}, function(i) {
				if (i.code == 0) {
					e.sidebar.comparebox.load()
				} else {
					e.msg(i.message, {
						time : 5e3
					})
				}
				if (e.isFunction(e.compare.clearCallback)) {
					e.compare.clearCallback.call(e.compare, i)
				}
			}, "json")
		},
		getGoodsList : function(i, t) {
			var o = {
				goods_ids : i
			};
			e.get("http://www.szy.yunmall.68mall.com/compare/goods-list.html",
					o, function(i) {
						if (e.isFunction(t)) {
							t.call(this, i)
						}
					}, "json")
		},
		clearCallback : null,
		removeCallback : null
	};
	e.collect = {
		toggleGoods : function(i, t, o, s) {
			if (!t) {
				t = 0
			}
			var n = {
				goods_id : i,
				sku_id : t
			};
			if (s) {
				n.show_count = 1
			}
			e
					.post(
							"http://www.szy.yunmall.68mall.com/user/collect/toggle.html",
							n, function(i) {
								if (i.code == 0) {
									if (i.data == 1) {
									} else {
									}
									e.msg(i.message)
								} else {
									e.msg(i.message, {
										time : 5e3
									})
								}
								if (e.isFunction(o)) {
									o.call(this, i)
								}
							}, "json")
		},
		toggleShop : function(i, t, o) {
			var s = {
				shop_id : i
			};
			if (o) {
				s.show_count = 1
			}
			e
					.post(
							"http://www.szy.yunmall.68mall.com/user/collect/toggle.html",
							s, function(i) {
								if (i.code == 0) {
									if (i.bonus_info && i.bonus_info.html) {
										e("body").append(i.bonus_info.html)
									} else {
										e.msg(i.message)
									}
								} else {
									e.msg(i.message, {
										time : 5e3
									})
								}
								if (e.isFunction(t)) {
									t.call(this, i)
								}
							}, "json")
		},
		addGoods : function(i, t, o) {
			if (!t) {
				t = 0
			}
			e.post("http://www.szy.yunmall.68mall.com/user/collect/add.html", {
				goods_id : i,
				sku_id : t
			}, function(i) {
				e.msg(i.message);
				if (e.isFunction(o)) {
					o.call(this, i)
				}
			}, "json")
		},
		addShop : function(i, t) {
			e.post("http://www.szy.yunmall.68mall.com/user/collect/add.html", {
				shop_id : i
			}, function(i) {
				if (i.bonus_info && i.bonus_info.html) {
					e("body").append(i.bonus_info.html)
				} else {
					e.msg(i.message)
				}
				if (e.isFunction(t)) {
					t.call(this, i)
				}
			}, "json")
		},
		removeGoods : function(i, t, o) {
			e
					.post(
							"http://www.szy.yunmall.68mall.com/user/collect/remove.html",
							{
								goods_id : i,
								sku_id : t
							}, function(i) {
								e.msg(i.message);
								if (e.isFunction(o)) {
									o.call(this, i)
								}
							}, "json")
		},
		removeShop : function(i, t) {
			e
					.post(
							"http://www.szy.yunmall.68mall.com/user/collect/remove.html",
							{
								shop_id : i
							}, function(i) {
								e.msg(i.message);
								if (e.isFunction(t)) {
									t.call(this, i)
								}
							}, "json")
		},
		getGoodsList : function(i, t, o) {
			if (!t) {
				t = 0
			}
			var s = {
				goods_ids : i,
				sku_ids : t
			};
			e
					.get(
							"http://www.szy.yunmall.68mall.com/user/collect/goods-list.html",
							s, function(i) {
								if (e.isFunction(o)) {
									o.call(this, i)
								}
							}, "json")
		}
	};
	e.bonus = {
		receive : function(i, t) {
			return e
					.post(
							"http://www.szy.yunmall.68mall.com/user/bonus/receive.html",
							{
								bonus_id : i
							}, function(i) {
								if (e.isFunction(t)) {
									t.call(this, i)
								}
							}, "JSON")
		}
	};
	if (!e("body").data("cart-js-init")) {
		e.topbar.init();
		e.sidebar.init();
		e.cartbox.init();
		e.sidebar.comparebox.init();
		e("body").data("cart-js-init", true)
	}
})(jQuery);