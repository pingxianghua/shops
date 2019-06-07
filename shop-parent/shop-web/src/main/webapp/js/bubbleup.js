(function(t) {
	t.fn.bubbleup = function(e) {
		e = t.extend({
			tooltip : false,
			scale : 120,
			fontFamily : "Helvetica, Arial, sans-serif",
			color : "#333333",
			fontSize : 12,
			fontWeight : "bold",
			inSpeed : "fast",
			outSpeed : "fast"
		}, e);
		return this.each(function() {
			t.fn.bubbleup.runing(t(this), e)
		})
	};
	t.fn.bubbleup.runing = function(e, i) {
		var o = e.width();
		e.mouseover(function() {
			if (i.tooltip) {
				tip = t("<div>" + t(this).attr("alt") + "</div>").css({
					fontFamily : i.fontFamily,
					color : i.color,
					fontSize : i.fontSize,
					fontWeight : i.fontWeight,
					position : "absolute",
					zIndex : 1e5
				}).remove().css({
					top : 0,
					left : 0,
					visibility : "hidden",
					display : "block"
				}).appendTo(document.body);
				var s = t.extend({}, e.offset(), {
					width : this.offsetWidth,
					height : this.offsetHeight
				});
				var n = tip[0].offsetWidth;
				var l = tip[0].offsetHeight;
				tip.stop().css({
					top : s.top - l,
					left : s.left + s.width / 2 - n / 2,
					visibility : "visible"
				}).animate({
					top : "-=" + (i.scale / 2 - o / 2)
				}, i.inSpeed)
			}
			e.closest("li").css({
				"z-index" : 1e5
			});
			e.stop().css({
				"z-index" : 1e5,
				top : 0,
				left : 0,
				width : o
			}).animate({
				left : -i.scale / 2 + o / 2,
				top : -i.scale / 2 + o / 2,
				width : i.scale
			}, i.inSpeed)
		}).mouseout(function() {
			e.closest("li").css({
				"z-index" : 100
			});
			e.closest("li").next().css({
				"z-index" : 0
			});
			e.closest("li").next().css({
				"z-index" : 0
			});
			e.closest("li").next().children("img").css({
				"z-index" : 0
			});
			if (i.tooltip) {
				tip.remove()
			}
			e.stop().animate({
				left : 0,
				top : 0,
				width : o
			}, i.outSpeed, function() {
				e.css({
					"z-index" : 0
				})
			})
		})
	}
})(jQuery);