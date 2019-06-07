$(function() {
	if ($("#nav li").length > 0) {
		var i = $("#nav li").find(".current").parents("li");
		if ($(i).size() == 0) {
			i = $("#nav li").eq(0)
		}
		$("#nav .wrap-line").css({
			left : $(i).position().left,
			width : $(i).outerWidth()
		});
		$("#nav li").hover(function() {
			$("#nav .wrap-line").stop().animate({
				left : $(this).position().left,
				width : $(this).outerWidth()
			})
		}, function() {
			$("#nav .wrap-line").stop().animate({
				left : $(i).position().left,
				width : $(i).outerWidth()
			})
		})
	}
	try {
		$(".list").hover(function() {
			$(this).find(".categorys").show()
		}, function() {
			$(this).find(".categorys").hide()
		})
	} catch (t) {
	}
});