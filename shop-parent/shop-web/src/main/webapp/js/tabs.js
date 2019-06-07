(function(e) {
	e.fn.rTabs = function(n) {
		var t = {
			btnClass : ".j-tab-nav",
			conClass : ".j-tab-con",
			bind : "click",
			animation : "0",
			speed : 300,
			delay : 200,
			auto : false,
			autoSpeed : 3e3
		};
		var i = e.extend(t, n), s = i.bind, a = e(this).find(i.btnClass), c = e(
				this).find(i.conClass), o = i.animation, l = c.width(), d = c
				.height(), r = c.children().length, h = r * l, f = r * d, u = 0, r, b, p;
		return this.each(function() {
			function n() {
				var e = u * l, n = u * d;
				a.children().removeClass("current").eq(u).addClass("current");
				switch (o) {
				case "0":
					c.children().hide().eq(u).show();
					break;
				case "left":
					c.css({
						position : "absolute",
						width : h
					}).children().css({
						"float" : "left",
						display : "block"
					}).end().stop().animate({
						left : -e
					}, i.speed);
					break;
				case "up":
					c.css({
						position : "absolute",
						height : f
					}).children().css({
						display : "block"
					}).end().stop().animate({
						top : -n
					}, i.speed);
					break;
				case "fadein":
					c.children().hide().eq(u).fadeIn();
					break
				}
			}
			if (s == "hover") {
				a.children().hover(function() {
					var t = e(this).index();
					function s() {
						u = t;
						n()
					}
					p = setTimeout(s, i.delay)
				}, function() {
					clearTimeout(p)
				})
			} else {
				a.children().bind(s, function() {
					u = e(this).index();
					n()
				})
			}
			function t() {
				b = setInterval(function() {
					u++;
					if (u >= r) {
						switch (o) {
						case "left":
							c.stop().css({
								left : l
							});
							break;
						case "up":
							c.stop().css({
								top : d
							})
						}
						u = 0
					}
					n()
				}, i.autoSpeed)
			}
			if (i.auto) {
				e(this).hover(function() {
					clearInterval(b)
				}, function() {
					t()
				});
				t()
			}
		})
	}
})(jQuery);