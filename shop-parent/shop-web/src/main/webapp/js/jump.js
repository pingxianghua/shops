function JumpObj(t, n, i, o) {
	var e = n = n || 6;
	i = i || function() {
	};
	o = o || function() {
	};
	var u = 0;
	var s = 1;
	f();
	function f() {
		t.style.position = "relative";
		c()
	}
	function c() {
		t.onmouseover = function(t) {
			if (!u)
				a()
		}
	}
	function p() {
		t.onmouseover = null
	}
	function a() {
		var n = parseInt(t.style.top);
		if (!u)
			l();
		else {
			var i = n - s * u;
			if (i >= -e && i <= 0)
				t.style.top = i + "px";
			else if (i < -e)
				u = -1;
			else {
				var o = e / 2;
				if (o < 1) {
					r();
					return
				}
				e = o;
				u = 1
			}
		}
		setTimeout(function() {
			a()
		}, 200 / (e + 3) + u * 3)
	}
	function l() {
		i.apply(this);
		t.style.top = "0";
		u = 1
	}
	function r() {
		o.apply(this);
		e = n;
		u = 0;
		t.style.top = "0"
	}
	this.jump = a;
	this.active = c;
	this.deactive = p
}
$(function() {
	$(".store-con img").each(function(t, n) {
		new JumpObj(n, 10)
	})
});