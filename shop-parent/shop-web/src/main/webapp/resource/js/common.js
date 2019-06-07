$()
		.ready(
				function() {
					try {
						$(
								".menu-item .menu")
								.hover(function() {
									$(this).find(".menu-bd").show()
								}, function() {
									$(this).find(".menu-bd").hide()
								})
					} catch (i) {
					}
					try {
						$(".search-type").hover(function() {
							$(this).css({
								height : "auto",
								overflow : "visible"
							})
						}, function() {
							$(this).css({
								height : 36,
								overflow : "hidden"
							})
						});
						var e = $(".SZY-SEARCH-BOX-KEYWORD")
								.attr("placeholder");
						$('.search-type li:not(".curr")').click(
								function() {
									var i = $(this).text();
									var s = $(this).attr("num");
									var t = $(this).siblings(".curr").text();
									var n = $(this).siblings(".curr").attr(
											"num");
									if (s == 1) {
										$(".SZY-SEARCH-BOX-KEYWORD").attr(
												"placeholder", "")
									} else {
										$(".SZY-SEARCH-BOX-KEYWORD").attr(
												"placeholder", e)
									}
									$(this).text(t).attr("num", n).siblings(
											".curr").text(i).attr("num", s);
									$(".searchtype").val(s);
									$(".search-type").css({
										height : 36,
										overflow : "hidden"
									})
								})
					} catch (i) {
					}
					try {
						$(".category-box-border .home-category").hover(
								function() {
									$(".expand-menu").css("display",
											"inline-block")
								}, function() {
									$(".expand-menu").css("display", "none")
								})
					} catch (i) {
					}
					try {
						$(".breadcrumb .crumbs-nav").hover(function() {
							$(this).toggleClass("curr")
						})
					} catch (i) {
					}
					try {
						$(".list")
								.each(
										function() {
											var i = [];
											var e = $(this)
													.find(".subitems dl").length;
											for (var s = 0; s < e; s++) {
												i.push(parseInt($(this).find(
														".subitems dl").eq(s)
														.find("dt").find("em")
														.text().length));
												$(this).find(".subitems dl")
														.eq(s).find("dt").find(
																"a")
														.outerWidth()
											}
											$(this).find(".subitems dl dt")
													.width(
															Math.max.apply(
																	null, i)
																	+ "em")
										});
						$(".list").hover(function() {
							$(this).find(".categorys").show()
						}, function() {
							$(this).find(".categorys").hide()
						})
					} catch (i) {
					}
					try {
						$(window).scroll(function() {
							if ($(this).scrollTop() > $(window).height()) {
								$(".returnTop").show()
							} else {
								$(".returnTop").hide()
							}
						});
						$(".returnTop").click(function() {
							$("body,html").animate({
								scrollTop : 0
							}, 800);
							return false
						});
						$(
								".quick-login .quick-links-a,.quick-login .quick-login-a,.customer-service-online a")
								.click(function() {
									$(".pop-login,.pop-mask").show()
								});
						$(".quick-area").mouseover(function() {
							$(this).find(".quick-sidebar").show()
						});
						$(".quick-area").mouseout(function() {
							$(this).find(".quick-sidebar").hide()
						});
						$(".right-sidebar-panel li").mouseenter(
								function() {
									$(this).children(".popup").stop().animate({
										left : -92,
										queue : true
									});
									$(this).children(".popup").css(
											"visibility", "visible");
									$(this).children(".ibar_login_box").css(
											"display", "block")
								});
						$(".right-sidebar-panel li").mouseleave(
								function() {
									$(this).children(".popup").css(
											"visibility", "hidden");
									$(this).children(".popup").stop().animate({
										left : -121,
										queue : true
									});
									$(this).children(".ibar_login_box").css(
											"display", "none")
								});
						$(".sidebar-tabs")
								.click(
										function() {
											if ($(".right-sidebar-main")
													.hasClass(
															"right-sidebar-main-open")
													&& $(this).hasClass(
															"current")) {
												$(".right-sidebar-main")
														.removeClass(
																"right-sidebar-main-open");
												$(this).removeClass("current");
												$(".right-sidebar-panels")
														.eq($(this).index() - 1)
														.removeClass(
																"animate-in")
														.addClass("animate-out")
														.css("z-index", 1)
											} else {
												$(this)
														.addClass("current")
														.siblings(
																".sidebar-tabs")
														.removeClass("current");
												$(".right-sidebar-main")
														.addClass(
																"right-sidebar-main-open");
												$(".right-sidebar-panels")
														.eq($(this).index() - 1)
														.addClass("animate-in")
														.removeClass(
																"animate-out")
														.css("z-index", 2)
														.siblings(
																".right-sidebar-panels")
														.removeClass(
																"animate-in")
														.addClass("animate-out")
														.css("z-index", 1)
											}
										});
						$(".right-sidebar-panels").on(
								"click",
								".close-panel",
								function() {
									$(".sidebar-tabs").removeClass("current");
									$(".right-sidebar-main").removeClass(
											"right-sidebar-main-open");
									$(".right-sidebar-panels").removeClass(
											"animate-out")
								});
						$(document)
								.click(
										function(i) {
											var e = $(i.target);
											if (e.closest(".right-sidebar-con").length == 0) {
												$(".right-sidebar-main")
														.removeClass(
																"right-sidebar-main-open");
												$(".sidebar-tabs").removeClass(
														"current");
												$(".right-sidebar-panels")
														.removeClass(
																"animate-in")
														.addClass("animate-out")
														.css("z-index", 1)
											}
										})
					} catch (i) {
					}
					$(".ajax-login").click(function() {
						$.login.show()
					});
					$(".QR-code li")
							.hover(
									function() {
										var i = $(this).index();
										$(this).addClass("current").siblings()
												.removeClass("current");
										$(
												".QR-code .code")
												.eq(i).removeClass("hide")
												.siblings().addClass("hide")
									});
					$(".service-online").click(function() {
						var i = $(this).data("goods_id");
						var e = $(this).data("shop_id");
						var s = $(this).data("order_id");
						$.openim({
							goods_id : i,
							shop_id : e,
							order_id : s
						})
					})
				});
function serviceOnLine(i) {
	$.openim({
		shop_id : i
	})
}
function setTab(e, s, t) {
	for (i = 1; i <= t; i++) {
		var n = $("#" + e + i);
		var a = $("#con_" + e + "_" + i);
		if (i == s) {
			$(a).show();
			$(n).addClass("active")
		} else {
			$(a).hide();
			$(n).removeClass("active")
		}
	}
}