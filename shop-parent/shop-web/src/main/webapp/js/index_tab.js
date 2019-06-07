$(function() {
	$(".tabs-brand").each(
			function() {
				var i = 0;
				var t = 10;
				var n = $(this).find(".brand-list").first().children().length;
				var s = $(this).find(".brand-list").children().width();
				var a = n * s;
				var r = n - t;
				$(this).find(".brand-right").click(
						function() {
							$(this).parents(".brand-con").find(".brand-list")
									.css("width", a + "px");
							i++;
							if (i > r) {
								i = r
							}
							var t = -s * i;
							$(this).closest($(this).parents(".brand")).find(
									".brand-list").stop().animate({
								left : t + "px"
							}, 500)
						});
				$(this).find(".brand-left").click(
						function() {
							$(this).parents(".brand-con").find(".brand-list")
									.css("width", "" + a + "px");
							i--;
							if (i < 0) {
								i = 0
							}
							var t = -s * i;
							$(this).closest($(this).parents(".brand")).find(
									".brand-list").stop().animate({
								left : t + "px"
							}, 500)
						})
			})
});
function Move(i, t, n, s, a) {
	var r = $(n).first().children().length;
	var d = $(n).children().width();
	var c = r * d;
	var f = r - a;
	$(n).css("width", "" + c + "px");
	var e = 0;
	$(i).click(function() {
		e++;
		if (e > f) {
			e = f
		}
		var i = -d * e;
		$(this).closest(s).find(n).stop().animate({
			left : "" + i + "px"
		}, 500)
	});
	$(t).click(function() {
		e--;
		if (e < 0) {
			e = 0
		}
		var i = d * e;
		$(this).closest(s).find(n).stop().animate({
			left : "" + -i + "px"
		}, 500)
	})
}