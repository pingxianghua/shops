(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a)
					return a(o, !0);
				if (i)
					return i(o, !0);
				throw new Error("Cannot find module '" + o + "'");
			}
			var f = n[o] = {
				exports : {}
			};
			t[o][0].call(f.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, f, f.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++)
		s(r[o]);
	return s
})
		(
				{
					1 : [
							function(require, module, exports) {
								var template = function(tpl, values) {
									return tpl.replace(/\{\{\s*(.+?)\s*\}\}/g,
											function(m, v) {
												return values[v] || ""
											})
								};
								var adsMod = {
									api : "//pcapi.vip.com/cmc/index.php?callback=?",
									tpl : '<a href="{{ link }}" target="">{{ content }}</a>',
									init : function() {
										var that = this;
										$(".J-ads").each(function() {
											var adsid = $(this).data("adsid");
											that.fetch(adsid, $(this))
										});
										return this
									},
									fetch : function(ids, $this) {
										var that = this;
										$.getJSON(this.api, {
											type : ids
										}, function(res) {
											if ($this.data("bg"))
												that.bg(res, $this);
											else
												that.render(res, $this)
										})
									},
									bg : function(res, $this) {
										for ( var k in res) {
											var item = res[k].items[0];
											$this.css("background-image",
													"url(" + item.img + ")")
										}
									},
									render : function(res, $this) {
										$this.empty();
										var tplel = $this.data("tpl");
										var adtpl = tplel ? $(tplel).html()
												: this.tpl;
										for ( var k in res) {
											var items = res[k].items, i, len = items.length;
											for (i = 0; i < len; i++) {
												var item = items[i];
												if (item.img) {
													var imgtpl = '<img src="{{ img }}" alt="{{ name }}" />';
													item.content = template(
															imgtpl, item)
												} else
													item.content = item.name;
												var $item = $(template(adtpl,
														item));
												if (!item.link)
													if ($item.is("a"))
														$item
																.removeAttr("href");
													else
														$item.find("a")
																.removeAttr(
																		"href");
												else if (item.blank)
													if ($item.is("a"))
														$item.attr("target",
																"_blank");
													else
														$item.find("a").attr(
																"target",
																"_blank");
												$this.append($item)
											}
										}
									}
								};
								window.adsMod = adsMod;
								module.exports = adsMod
							}, {} ],
					2 : [
							function(require, module, exports) {
								(function(root) {
									var capslock = {
										detect : function(e) {
											var valueCapsLock = e.keyCode ? e.keyCode
													: e.which;
											var valueShift = e.shiftKey ? e.shiftKey
													: valueCapsLock == 16 ? true
															: false;
											if (valueCapsLock >= 65
													&& valueCapsLock <= 90
													&& !valueShift
													|| valueCapsLock >= 97
													&& valueCapsLock <= 122
													&& valueShift)
												return true;
											else
												return false
										}
									};
									if (typeof define === "function"
											&& define.cmd)
										define(function(require, exports,
												module) {
											module.exports = capslock
										});
									else
										root.capslock = capslock;
									$(function() {
										document.msCapsLockWarningOff = true
									})
								})(window)
							}, {} ],
					3 : [
							function(require, module, exports) {
								var Mars = {
									maxHeapHeight : 10,
									hoverHeap : [],
									inputHeap : [],
									init : function() {
										var that = this;
										$("body").delegate(
												"[passport_mars_sead_hover]",
												"mouseenter", function() {
													that.hoverProcess(this)
												}).delegate(
												"[passport_mars_sead_input]",
												"keydown", function() {
													that.inputProcess(this)
												})
									},
									hoverProcess : function(target) {
										if (this.hoverHeap.length >= this.maxHeapHeight)
											this.hoverHeap.pop();
										var c = new Coordinate(
												getElementLeft(target),
												getElementTop(target));
										var r = new HoverRec(c);
										this.hoverHeap.unshift(r)
									},
									inputProcess : function(target) {
										if (this.inputHeap.length >= this.maxHeapHeight)
											this.inputHeap.pop();
										var r = new InputRec($(target).attr(
												"passport_mars_sead_input"));
										this.inputHeap.unshift(r)
									},
									send : function() {
										var hasMar = typeof Mar != "undefined"
												&& (typeof Mar.Seed != "undefined" && typeof Mar.Seed.request == "function");
										if (this.hoverHeap.length > 0 && hasMar)
											Mar.Seed.request("span", "hover",
													"active_login_ck_collect",
													{
														"platform" : "web",
														"data" : this.hoverHeap
													});
										if (this.inputHeap.length > 0 && hasMar)
											Mar.Seed
													.request(
															"input",
															"change",
															"active_login_keystroke_collect",
															{
																"platform" : "web",
																"data" : this.inputHeap
															})
									}
								};
								var InputRec = function(name) {
									this.t = "" + (new Date).getTime();
									this.x = name
								};
								var HoverRec = function(coordinate) {
									this.t = "" + (new Date).getTime();
									this.position = [ {
										"c1" : "" + coordinate
									} ]
								};
								var Coordinate = function(x, y) {
									this.x = x, this.y = y
								};
								Coordinate.prototype.toString = function() {
									return this.x + ":" + this.y
								};
								function getElementLeft(element) {
									var actualLeft = element.offsetLeft;
									var current = element.offsetParent;
									while (current !== null) {
										actualLeft += current.offsetLeft;
										current = current.offsetParent
									}
									return actualLeft
								}
								function getElementTop(element) {
									var actualTop = element.offsetTop;
									var current = element.offsetParent;
									while (current !== null) {
										actualTop += current.offsetTop;
										current = current.offsetParent
									}
									return actualTop
								}
								module.exports = Mars
							}, {} ],
					4 : [
							function(require, module, exports) {
								var PasswordRules = {
									letterPattern : /[a-zA-Z]+/,
									numbericPattern : /[0-9]+/,
									specialPattern : /[\(!@#\$%\^&\*\),\._]+/,
									illegalPattern : /[^a-zA-Z0-9\(!@#\$%\^&\*\),\._]+/,
									validate : function(pwd) {
										var len = pwd.length;
										var result = {
											success : false,
											strength : "w",
											message : ""
										};
										if (len < 8) {
											result.message = "\u8bf7\u8f93\u51658-20\u4f4d\u5bc6\u7801";
											return result
										}
										if (len > 20) {
											result.message = "\u8bf7\u8f93\u51658-20\u4f4d\u5bc6\u7801";
											return result
										}
										var category = this
												.calcCharsCategory(pwd);
										if (category <= 1) {
											result.message = "\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355\uff0c\u6709\u88ab\u76d7\u98ce\u9669\uff0c\u5efa\u8bae\u60a8\u66f4\u6539\u4e3a\u590d\u6742\u5bc6\u7801";
											return result
										}
										if (category === 2)
											if (len >= 8 && len <= 11) {
												result.success = true;
												result.strength = "m"
											} else if (len > 11 && len <= 20) {
												result.success = true;
												result.strength = "s"
											} else {
												result.success = false;
												result.strength = "s"
											}
										else if (len >= 8 && len <= 9) {
											result.success = true;
											result.strength = "m"
										} else if (len > 9 && len <= 20) {
											result.success = true;
											result.strength = "s"
										} else {
											result.success = false;
											result.strength = "s"
										}
										if (this.illegalPattern.test(pwd)) {
											result.success = false;
											result.message = "\u5bc6\u7801\u4e2d\u5305\u542b\u975e\u6cd5\u5b57\u7b26"
										}
										return result
									},
									calcCharsCategory : function(pwd) {
										var category = 0;
										if (this.letterPattern.test(pwd))
											category++;
										if (this.numbericPattern.test(pwd))
											category++;
										if (this.specialPattern.test(pwd))
											category++;
										return category
									}
								};
								module.exports = PasswordRules
							}, {} ],
					5 : [
							function(require, module, exports) {
								(function($) {
									var supportPlaceholder = "placeholder" in document
											.createElement("input");
									var placeholder = function() {
										var $placeholderInputs;
										if (!supportPlaceholder) {
											$placeholderInputs = this
													.find(
															"input:text, input:password")
													.filter(
															function() {
																var text = $(
																		this)
																		.attr(
																				"placeholder");
																return text
																		&& text !== ""
															});
											$placeholderInputs
													.each(function() {
														var $me = $(this), $placeholderSpan, text = $me
																.attr("placeholder"), spanHtml;
														text = text || "";
														spanHtml = '<span class="ie-placeholder">'
																+ text
																+ "</span>";
														$me.after(spanHtml);
														$placeholderSpan = $me
																.next(".ie-placeholder");
														$me
																.on(
																		"keydown",
																		function(
																				e) {
																			$placeholderSpan
																					.hide()
																		});
														$me
																.on(
																		"blur",
																		function(
																				e) {
																			var $target = $(e.target);
																			var val = $target
																					.val();
																			if (val.length === 0)
																				$placeholderSpan
																						.show();
																			else
																				$placeholderSpan
																						.hide()
																		});
														$placeholderSpan.on(
																"click",
																function() {
																	$me.focus()
																})
													})
										}
										return this
									};
									if (typeof define === "function"
											&& define.cmd)
										define(function(require, exports,
												module) {
											$.fn.placeholder = placeholder
										});
									else
										$.fn.placeholder = placeholder
								})(jQuery)
							}, {} ],
					6 : [
							function(require, module, exports) {
								var metadataConfig = {
									ajaxOldValue : "ajaxOldValue",
									verified : "verified",
									rules : {
										"required" : "data-rule-required",
										"minlength" : "data-rule-minlength",
										"maxlength" : "data-rule-maxlength",
										"rangelength" : "data-rule-rangelength",
										"min" : "data-rule-min",
										"max" : "data-rule-max",
										"range" : "data-rule-range",
										"equalTo" : "data-rule-equalto",
										"regex" : "data-rule-regex"
									},
									messages : {
										"required" : "data-msg-required",
										"minlength" : "data-msg-minlength",
										"maxlength" : "data-msg-maxlength",
										"rangelength" : "data-msg-rangelength",
										"min" : "data-msg-min",
										"max" : "data-msg-max",
										"range" : "data-msg-range",
										"equalTo" : "data-msg-equalto",
										"regex" : "data-msg-regex"
									},
									infos : "data-info-tips",
									templates : {
										warningTips : '<div class="ui-tooltips ui-tooltips-warning validator-tooltips-warning">'
												+ '<div class="ui-tooltips-arrow">'
												+ '<i class="arrow arrow-out">&#9670;</i>'
												+ '<i class="arrow">&#9670;</i>'
												+ "</div>"
												+ '<div class="ui-tooltips-content">'
												+ '<p class="ui-tooltips-msg validator-msg">'
												+ '<i class="vipFont if-sigh">&#xe603;</i>'
												+ "</p>" + "</div>" + "</div>",
										infoTips : '<div class="ui-tooltips ui-tooltips-info validator-tooltips-info">'
												+ '<div class="ui-tooltips-arrow">'
												+ '<i class="arrow arrow-out">&#9670;</i>'
												+ '<i class="arrow">&#9670;</i>'
												+ "</div>"
												+ '<div class="ui-tooltips-content">'
												+ '<p class="validator-msg"></p>'
												+ "</div>" + "</div>",
										successIcon : '<i class="ui-input-success vipFont if-success" style="display: none;">&#xe61e;</i>',
										warningIcon : '<i class="vipFont if-sigh">&#xe603;</i>'
									}
								};
								$.smartValidation = function(opts, form) {
									this.settings = opts;
									this.errorsMap = {};
									this.infosMap = {};
									this.$form = form;
									this.$submit = this.$form
											.find(this.settings.selectors.submit);
									this.$firstErrorElement = null;
									this.timers = {};
									this.init()
								};
								$
										.extend(
												$.smartValidation,
												{
													defaults : {
														namespace : ".validator",
														metadata : false,
														infos : {},
														messages : {},
														rules : {},
														classNames : {
															tipsIn : "z-ui-tooltips-in",
															tipsOut : "z-ui-tooltips-out",
															tipsDirection : "ui-tooltips-bottom-left-arrow",
															itemGroup : "ui-form-item-group",
															warningItemGroup : "z-ui-form-item-warning",
															warningTips : "validator-tooltips-warning",
															infoTips : "validator-tooltips-info",
															successIcon : "z-ui-form-item-success",
															customWarningTips : "custom-tooltips-warning",
															customInfoTips : "custom-tooltips-info",
															btnLoading : "z-ui-btn-loading",
															btnDisable : "ui-btn-disable"
														},
														selectors : {
															submit : 'input[type="submit"], .form-submit',
															successIcon : ".if-success"
														},
														templates : {
															warningTips : metadataConfig.templates.warningTips,
															infoTips : metadataConfig.templates.infoTips,
															successIcon : metadataConfig.templates.successIcon,
															warningIcon : metadataConfig.templates.warningIcon
														},
														tipsStayTime : 2E3,
														dependon : {},
														showSuccessIcon : true,
														onsubmit : function() {
														}
													},
													prototype : {
														init : function() {
															this.initConfig();
															this.initTips();
															this.initEvents()
														},
														initConfig : function() {
															var _this = this, metadataRules = {}, metadataMessages = {}, metadataInfos = {}, tempValue, $elements, $el;
															if (this.settings.metadata) {
																$elements = this.$form
																		.find("[data-rule-^]");
																$
																		.each(
																				$elements,
																				function() {
																					var $me = $(this), name = this.name
																							|| this.id;
																							tempRuleKey,
																							tempMsgKey;
																					for ( var key in metadataConfig.rules) {
																						tempKey = "rules-"
																								+ metadataConfig.rules[key];
																						if ($me
																								.data(tempKey) !== undefined)
																							metadataRules[name][key] = $me
																									.data(tempKey)
																					}
																					for ( var key in metadataConfig.messages) {
																						tempKey = "rules-"
																								+ metadataConfig.messages[key];
																						if ($me
																								.data(tempKey) !== undefined)
																							metadataMessages[name][key] = $me
																									.data(tempKey)
																					}
																					metadataInfos[name] = $me
																							.attr(metadataConfig.infos)
																				});
																this.validatorRules = $
																		.extend(
																				true,
																				{},
																				metadataRules,
																				this.settings.rules);
																this.validatorMessages = $
																		.extend(
																				true,
																				{},
																				metadataMessages,
																				this.settings.messages);
																this.validatorInfos = $
																		.extend(
																				true,
																				{},
																				metadataInfos,
																				this.settings.infos)
															} else {
																this.validatorRules = this.settings.rules;
																this.validatorMessages = this.settings.messages;
																this.validatorInfos = this.settings.infos
															}
															for ( var ruleName in this.validatorRules) {
																if (this.validatorInputs === undefined)
																	this.validatorInputs = this
																			.findElement(ruleName);
																else
																	this.validatorInputs = this.validatorInputs
																			.add(this
																					.findElement(ruleName));
																if (this.validatorRules[ruleName]["ajax"]) {
																	$el = this
																			.findElement(ruleName);
																	tempValue = $.smartValidation
																			.getValue($el);
																	$el
																			.data(
																					metadataConfig.ajaxOldValue,
																					tempValue)
																}
															}
															for ( var infoName in this.validatorInfos)
																this.infosMap[infoName] = this.validatorInfos[infoName]
														},
														initTips : function() {
															var _this = this, $el, $parent, $temp;
															for ( var key in this.validatorInfos) {
																$el = this
																		.findElement(key);
																$parent = $el
																		.parents("."
																				+ this.settings.classNames.itemGroup);
																$parent
																		.prepend(this.settings.templates.infoTips);
																$temp = $parent
																		.children(
																				"."
																						+ this.settings.classNames.infoTips)
																		.first();
																$el
																		.data(
																				"infoTips",
																				$temp)
															}
															for ( var key in this.validatorRules) {
																$el = this
																		.findElement(key);
																$parent = $el
																		.parents("."
																				+ this.settings.classNames.itemGroup);
																$parent
																		.prepend(this.settings.templates.warningTips);
																$temp = $parent
																		.children(
																				"."
																						+ this.settings.classNames.warningTips)
																		.first();
																$el
																		.data(
																				"warningTips",
																				$temp);
																if (this.settings.showSuccessIcon)
																	if ($el
																			.is("input")
																			&& !this
																					.isCheckable($el))
																		$el
																				.eq(
																						0)
																				.before(
																						this.settings.templates.successIcon)
															}
															this.warningTips = this.$form
																	.find("."
																			+ this.settings.classNames.warningTips);
															this.infoTips = this.$form
																	.find("."
																			+ this.settings.classNames.infoTips);
															this.warningTips
																	.addClass(this.settings.classNames.tipsDirection);
															this.infoTips
																	.addClass(this.settings.classNames.tipsDirection)
														},
														initEvents : function() {
															var _this = this, $checkableElements;
															function onblur(e) {
																_this.onvalidate
																		.call(
																				_this,
																				e)
															}
															function onfocus(e) {
																var $target = $(e.target);
																_this.focusElement
																		.call(
																				_this,
																				$target)
															}
															function onsubmit(e) {
																if (e.target.tagName
																		.toLowerCase() === "a")
																	e
																			.preventDefault();
																e
																		.stopPropagation();
																if (!_this.$submit
																		.hasClass(_this.settings.classNames.btnDisable)
																		&& !_this.$submit
																				.hasClass(_this.settings.classNames.btnLoading)) {
																	_this.$submit
																			.addClass(_this.settings.classNames.btnLoading);
																	_this.validateAllElements
																			.call(
																					_this,
																					_this.settings.onsubmit)
																}
															}
															if (this.validatorInputs
																	&& this.validatorInputs.length > 0) {
																this.validatorInputs
																		.on(
																				"blur"
																						+ this.settings.namespace,
																				onblur);
																this.validatorInputs
																		.on(
																				"focus"
																						+ this.settings.namespace,
																				onfocus);
																$checkableElements = this.validatorInputs
																		.filter(function() {
																			return _this
																					.isCheckable($(this))
																		});
																if ($checkableElements.length > 0)
																	$checkableElements
																			.on(
																					"click"
																							+ this.settings.namespace,
																					$
																							.proxy(
																									this.onvalidate,
																									this))
															}
															this.$submit.on(
																	"click",
																	onsubmit);
															this.$submit
																	.on(
																			"submitCompelted",
																			function() {
																				_this.$submit
																						.removeClass(_this.settings.classNames.btnLoading)
																			})
														},
														onvalidate : function(e) {
															e.stopPropagation();
															var $target = $(e.target);
															var $parent = $target
																	.parents("."
																			+ this.settings.classNames.itemGroup);
															var $customTips = $parent
																	.find("."
																			+ this.settings.classNames.customWarningTips
																			+ ", ."
																			+ this.settings.classNames.customInfoTips);
															$target
																	.off("keydown"
																			+ this.settings.namespace);
															this
																	.hideCustomTips($customTips);
															this
																	.tipsOnBlur($target);
															this.validateElement
																	.call(this,
																			$target)
														},
														optional : function($el) {
															return !$.smartValidation.methods.required
																	.call(this,
																			$el)
														},
														getMethodParam : function(
																$el, rule,
																method) {
															var result = [], args = rule[method]["param"]
																	|| rule[method];
															result.push($el);
															switch (method) {
															case "required":
																break;
															case "equalTo":
																if (typeof args === "string")
																	result
																			.push($(
																					args,
																					this.$form));
																else if (args
																		&& args instanceof jQuery)
																	result
																			.push(args);
																break;
															default:
																if (args.constructor === Array)
																	for (var i = 0, j = args.length; i < j; i++)
																		result
																				.push(args[i]);
																else
																	result
																			.push(args)
															}
															return result
														},
														check : function($el) {
															var name = $el
																	.attr("name"), rule = this.validatorRules[name], hasAjax = rule["ajax"] === undefined ? false
																	: true, nameDependon = this.settings.dependon[name], isDependency = this
																	.checkDependon(nameDependon), onValidCallback = this.settings.onvalid ? this.settings.onvalid[name]
																	: null, onInvalidCallback = this.settings.oninvalid ? this.settings.oninvalid[name]
																	: null, invalidLength = 0, msg;
															if (isDependency) {
																for ( var method in rule) {
																	var args, tempValue, dependon, invoke = true;
																	if (method !== "ajax") {
																		dependon = rule[method]["dependon"];
																		invoke = this
																				.checkDependon(dependon);
																		args = this
																				.getMethodParam(
																						$el,
																						rule,
																						method);
																		if (invoke === true)
																			if ($.smartValidation.methods[method]
																					.apply(
																							this,
																							args)) {
																				tempValue = $.smartValidation
																						.getValue($el);
																				delete this.errorsMap[name];
																				this
																						.hideItemWarning($el);
																				if (this
																						.isCheckable($el))
																					this
																							.hideWarningTips($el);
																				continue
																			} else {
																				msg = this.validatorMessages[name][method]
																						|| "";
																				$el
																						.data(
																								metadataConfig.verified,
																								false);
																				this.errorsMap[name] = msg;
																				this
																						.hideSuccessIcon($el);
																				this
																						.showItemWarning($el);
																				invalidLength++;
																				onInvalidCallback
																						&& onInvalidCallback();
																				break
																			}
																	}
																}
																if (invalidLength === 0) {
																	if (!hasAjax
																			|| $el
																					.data(metadataConfig.ajaxOldValue) === tempValue
																			&& $el
																					.data(metadataConfig.verified) === true) {
																		$el
																				.data(
																						metadataConfig.verified,
																						true);
																		this
																				.showSuccessIcon($el)
																	}
																	onValidCallback
																			&& onValidCallback()
																}
															}
														},
														checkDependon : function(
																dependon) {
															var invoke = true;
															if (dependon)
																switch (typeof dependon) {
																case "boolean":
																	invoke = dependon;
																	break;
																case "string":
																	invoke = this.$form
																			.find(dependon).length > 0;
																	break;
																case "function":
																	invoke = dependon
																			.call(this);
																	break
																}
															return invoke
														},
														validateElement : function(
																$el) {
															this.check($el);
															this
																	.validateAjax($el)
														},
														validateAllElements : function(
																callback) {
															var _this = this, error, ajaxs = [], $customTips = this.$form
																	.find("."
																			+ this.settings.classNames.customWarningTips
																			+ ", ."
																			+ this.settings.classNames.customInfoTips);
															this
																	.hideCustomTips($customTips);
															if (this.validatorInputs
																	&& this.validatorInputs.length > 0)
																this.validatorInputs
																		.each(function() {
																			var $me = $(this);
																			var name = $me
																					.attr("name");
																			var rule = _this.validatorRules[name];
																			_this
																					.check($me);
																			if (rule["ajax"]
																					&& typeof rule["ajax"] === "object")
																				_this
																						.appendAjaxList(
																								$me,
																								ajaxs)
																		});
															if (ajaxs.length > 0)
																$.when
																		.apply(
																				$,
																				ajaxs)
																		.done(
																				function() {
																					_this.handleSubmit
																							.call(
																									_this,
																									callback)
																				});
															else
																_this.handleSubmit
																		.call(
																				_this,
																				callback)
														},
														handleSubmit : function(
																callback) {
															var error;
															if ($
																	.isEmptyObject(this.errorsMap)) {
																this.$firstErrorElement = null;
																callback
																		&& callback()
															} else {
																this.$submit
																		.trigger("submitCompelted");
																error = this
																		.getFirstError();
																if (error) {
																	this.$firstErrorElement = error.$el;
																	this
																			.showError(
																					error.$el,
																					error.msg)
																}
															}
														},
														validateAjax : function(
																$el) {
															var name = $el
																	.attr("name"), nameDependon = this.settings.dependon[name], isDependency = this
																	.checkDependon(nameDependon), rule = this.validatorRules[name];
															if (isDependency)
																if (!this.errorsMap[name])
																	if (rule["ajax"]
																			&& typeof rule["ajax"] === "object") {
																		var remoteParam = [];
																		var tempValue = $.smartValidation
																				.getValue($el);
																		if (tempValue !== $el
																				.data(metadataConfig.ajaxOldValue)
																				|| $el
																						.data(metadataConfig.verified) === false) {
																			$el
																					.data(
																							metadataConfig.ajaxOldValue,
																							tempValue);
																			$el
																					.data(
																							metadataConfig.verified,
																							false);
																			remoteParam
																					.push($el);
																			remoteParam
																					.push(rule["ajax"]);
																			return $.smartValidation.methods["ajax"]
																					.apply(
																							this,
																							remoteParam)
																		}
																	}
														},
														appendAjaxList : function(
																$el, list) {
															var deferred = this
																	.validateAjax($el);
															if (deferred)
																list
																		.push(deferred)
														},
														getFirstError : function() {
															var _this = this, result = null;
															this.validatorInputs
																	.each(function() {
																		var $me = $(this), name = $me
																				.attr("name");
																		if (_this.errorsMap[name]) {
																			result = {
																				$el : $me,
																				name : name,
																				msg : _this.errorsMap[name]
																			};
																			return false
																		}
																	});
															return result
														},
														reset : function() {
															var _this = this;
															this.validatorInputs
																	.each(function() {
																		var $me = $(this);
																		_this
																				.resetTimer($me);
																		_this
																				.hideItemWarning($me);
																		_this
																				.hideSuccessIcon($me);
																		_this
																				.hideWarningTips($me);
																		$me
																				.removeData(metadataConfig.verified);
																		$me
																				.removeData(metadataConfig.ajaxOldValue)
																	});
															$
																	.each(
																			this.infoTips,
																			function(
																					index,
																					value) {
																				var $input = _this.$form
																						.find('[name="'
																								+ index
																								+ '"]');
																				_this
																						.resetTimer($me);
																				_this
																						.hideInfoTips($input)
																			});
															this.errorsMap = {};
															this.infosMap = {};
															this.firstErrorElement = null
														},
														focusElement : function(
																$el) {
															this
																	.resetTimer($el);
															var name = $el
																	.attr("name"), $warningTips = $el
																	.data("warningTips"), $infoTips = $el
																	.data("infoTips"), $parent = $el
																	.parents("."
																			+ this.settings.classNames.itemGroup), $customWarningTips = this.$form
																	.find("."
																			+ this.settings.classNames.customWarningTips), $customInfoTips = this.$form
																	.find("."
																			+ this.settings.classNames.customInfoTips), _this = this;
															this
																	.hideSuccessIcon($el);
															this
																	.hideItemWarning($el);
															function onkeydown() {
																if (_this.settings.tipsStayTime > 0)
																	_this.timers["warning_"
																			+ name] = setTimeout(
																			function() {
																				$warningTips
																						.addClass(_this.settings.classNames.tipsOut);
																				_this.timers["warning2_"
																						+ name] = setTimeout(
																						function() {
																							_this
																									.hideWarningTips($el)
																						},
																						150)
																			},
																			_this.settings.tipsStayTime)
															}
															if (this.errorsMap[name]) {
																if ($warningTips) {
																	this
																			.hideCustomTips($customWarningTips);
																	this
																			.hideCustomTips($customInfoTips);
																	if (this.$firstErrorElement
																			&& !this.$firstErrorElement
																					.is($el)) {
																		this
																				.resetTimer(this.$firstErrorElement);
																		this
																				.hideWarningTips(this.$firstErrorElement)
																	}
																	this
																			.showWarningTips(
																					$el,
																					this.errorsMap[name]);
																	$el
																			.one(
																					"keydown"
																							+ this.settings.namespace,
																					onkeydown)
																}
															} else if ($infoTips) {
																this
																		.hideCustomTips($customWarningTips);
																this
																		.hideCustomTips($customInfoTips);
																if (this.$firstErrorElement
																		&& !this.$firstErrorElement
																				.is($el)) {
																	this
																			.resetTimer(this.$firstErrorElement);
																	this
																			.hideWarningTips(this.$firstErrorElement)
																}
																this
																		.showInfoTips(
																				$el,
																				this.infosMap[name])
															}
														},
														tipsOnBlur : function(
																$el) {
															this
																	.resetTimer($el);
															var _this = this, name = $el
																	.attr("name"), $warningTips = $el
																	.siblings("."
																			+ this.settings.classNames.warningTips), $infoTips = $el
																	.siblings("."
																			+ this.settings.classNames.infoTips);
															if ($warningTips.length > 0) {
																$warningTips
																		.addClass(this.settings.classNames.tipsOut);
																this.timers["warning2_"
																		+ name] = setTimeout(
																		function() {
																			$warningTips
																					.removeClass(_this.settings.classNames.tipsIn
																							+ " "
																							+ _this.settings.classNames.tipsOut)
																		}, 150)
															}
															if ($infoTips.length > 0) {
																$infoTips
																		.addClass(this.settings.classNames.tipsOut);
																this.timers["info_"
																		+ name] = setTimeout(
																		function() {
																			$infoTips
																					.removeClass(_this.settings.classNames.tipsIn
																							+ " "
																							+ _this.settings.classNames.tipsOut)
																		}, 150)
															}
														},
														findElement : function(
																name) {
															var $el = this.$form
																	.find('[name="'
																			+ name
																			+ '"]');
															return $el
														},
														resetTimer : function(
																$el) {
															var name = $el
																	.attr("name"), warningName = "warning_"
																	+ name, warningName2 = "waring2_"
																	+ name, infoName = "info_"
																	+ name;
															if (this.timers[warningName])
																clearTimeout(this.timers[warningName]);
															if (this.timers[warningName2])
																clearTimeout(this.timers[warningName2]);
															if (this.timers[infoName])
																clearTimeout(this.timers[infoName])
														},
														isPassword : function(
																$el) {
															return /password/i
																	.test($el
																			.attr("type"))
														},
														isCheckable : function(
																$el) {
															return /radio|checkbox/i
																	.test($el
																			.attr("type"))
														},
														getLength : function(
																$el) {
															switch ($el[0].tagName
																	.toLowerCase()) {
															case "select":
																return $(
																		"option:selected",
																		$el).length;
															case "input":
																if (this
																		.isCheckable($el))
																	return this
																			.findElement(
																					$el
																							.attr("name"))
																			.filter(
																					":checked").length
															}
															return $el.val().length
														},
														showSuccessIcon : function(
																$el) {
															var $successIcon = $el
																	.prev(this.settings.selectors.successIcon);
															if ($el.is("input")
																	&& (!this
																			.isCheckable($el) && $successIcon.length > 0)) {
																$successIcon
																		.show();
																$el
																		.parents(
																				"."
																						+ this.settings.classNames.itemGroup)
																		.addClass(
																				this.settings.classNames.successIcon)
															}
														},
														hideSuccessIcon : function(
																$el) {
															var $successIcon = $el
																	.prev(this.settings.selectors.successIcon);
															if ($successIcon.length > 0) {
																$successIcon
																		.hide();
																$el
																		.parents(
																				"."
																						+ this.settings.classNames.itemGroup)
																		.removeClass(
																				this.settings.classNames.successIcon)
															}
														},
														showItemWarning : function(
																$el) {
															$el
																	.parents(
																			"."
																					+ this.settings.classNames.itemGroup)
																	.addClass(
																			this.settings.classNames.warningItemGroup)
														},
														hideItemWarning : function(
																$el) {
															$el
																	.parents(
																			"."
																					+ this.settings.classNames.itemGroup)
																	.removeClass(
																			this.settings.classNames.warningItemGroup)
														},
														showError : function(
																$el, errorMsg) {
															this
																	.showItemWarning($el);
															this
																	.showWarningTips(
																			$el,
																			errorMsg);
															this
																	.hideSuccessIcon($el)
														},
														hideError : function(
																$el) {
															this
																	.hideItemWarning($el);
															this
																	.hideWarningTips($el)
														},
														addErrorState : function(
																$el, errorMsg) {
															var name = $el
																	.attr("name");
															this.errorsMap[name] = errorMsg
														},
														removeErrorState : function(
																$el) {
															var name = $el
																	.attr("name");
															if (this.errorsMap[name])
																delete this.errorsMap[name]
														},
														showWarningTips : function(
																$el, errorMsg) {
															var $warningTips = $el
																	.data("warningTips");
															if ($warningTips) {
																$warningTips
																		.find(
																				".validator-msg")
																		.html(
																				this.settings.templates.warningIcon
																						+ errorMsg);
																if (!$warningTips
																		.hasClass(this.settings.classNames.tipsIn))
																	$warningTips
																			.addClass(this.settings.classNames.tipsIn)
															}
														},
														hideWarningTips : function(
																$el) {
															var $warningTips = $el
																	.data("warningTips");
															if ($warningTips)
																$warningTips
																		.removeClass(this.settings.classNames.tipsIn
																				+ " "
																				+ this.settings.classNames.tipsOut)
														},
														showInfoTips : function(
																$el, msg) {
															var $infoTips = $el
																	.data("infoTips");
															if ($infoTips) {
																$infoTips
																		.find(
																				".validator-msg")
																		.html(
																				msg);
																if (!$infoTips
																		.hasClass(this.settings.classNames.tipsIn))
																	$infoTips
																			.addClass(this.settings.classNames.tipsIn)
															}
														},
														hideInfoTips : function(
																$el) {
															var $infoTips = $el
																	.data("infoTips");
															if ($infoTips)
																$infoTips
																		.removeClass(this.settings.classNames.tipsIn
																				+ " "
																				+ this.settings.classNames.tipsOut)
														},
														showCustomTips : function(
																$tips, msg) {
															if ($tips.length > 0)
																$tips
																		.find(
																				".validator-msg")
																		.html(
																				msg)
																		.end()
																		.removeClass(
																				this.settings.classNames.tipsIn
																						+ " "
																						+ this.settings.classNames.tipsOut)
																		.addClass(
																				this.settings.classNames.tipsIn)
														},
														hideCustomTips : function(
																$tips) {
															if ($tips.length > 0)
																$tips
																		.removeClass(this.settings.classNames.tipsIn
																				+ " "
																				+ this.settings.classNames.tipsOut)
														}
													},
													getValue : function($el) {
														if ($el.is("input")
																|| ($el
																		.is("textarea") || $el
																		.is("select")))
															return $.trim($el
																	.val());
														else
															return $el
																	.attr("data-value")
													},
													addMethod : function(name,
															method) {
														$.smartValidation.methods[name] = method
													},
													serializeForm : function(
															$form) {
														var $inputs = $form
																.find('input[type="text"], input[type="password"], input[type="hidden"], input[type="file"], input[type="checkbox"], input[type="radio"], select, textarea');
														var result = [];
														var groups = {};
														$inputs
																.each(function() {
																	var _this = $(this);
																	var name = _this
																			.attr("name");
																	if (groups[name])
																		groups[name]
																				.push(_this);
																	else
																		groups[name] = [ _this ]
																});
														$
																.each(
																		groups,
																		function(
																				key,
																				value) {
																			var temp, checkTemp = [], checkTempValue = "", radioTempValue = "", isRadioChecked = false, len, $el, keepSpace;
																			if (value[0]
																					.is('[type="text"]')
																					|| (value[0]
																							.is('[type="password"]') || (value[0]
																							.is('[type="hidden"]') || (value[0]
																							.is('[type="file"]') || (value[0]
																							.is("select") || value[0]
																							.is("textarea"))))))
																				for ( var i in value)
																					if (value[i]
																							.data("keep-space") === true)
																						result
																								.push(key
																										+ "="
																										+ value[i]
																												.val());
																					else
																						result
																								.push(key
																										+ "="
																										+ $
																												.trim(value[i]
																														.val()));
																			else if (value[0]
																					.is('[type="checkbox"]')) {
																				if (value instanceof Array
																						&& value.length > 1) {
																					len = value.length;
																					for (var i = 0; i < len; i++) {
																						$el = value[i];
																						if ($el
																								.is(":checked")) {
																							keepSpace = $el
																									.data("keep-space");
																							checkTempValue = keepSpace === true ? $el
																									.val()
																									: $
																											.trim($el
																													.val());
																							checkTemp
																									.push(checkTempValue)
																						}
																					}
																				} else if (value[0]
																						.is(":checked")) {
																					$el = value[0];
																					keepSpace = $el
																							.data("keep-space");
																					checkTempValue = keepSpace === true ? $el
																							.val()
																							: $
																									.trim($el
																											.val());
																					checkTemp
																							.push(checkTempValue)
																				}
																				if (checkTemp.length > 0)
																					result
																							.push(key
																									+ "="
																									+ checkTemp
																											.join(","))
																			} else if (value[0]
																					.is('[type="radio"]')) {
																				if (value instanceof Array
																						&& value.length > 1) {
																					len = value.length;
																					for (var i = 0; i < len; i++) {
																						$el = value[i];
																						if ($el
																								.is(":checked")) {
																							isRadioChecked = true;
																							keepSpace = $el
																									.data("keep-space");
																							radioTempValue = keepSpace === true ? $el
																									.val()
																									: $
																											.trim($el
																													.val());
																							break
																						}
																					}
																				} else if (value[0]
																						.is(":checked")) {
																					isRadioChecked = true;
																					$el = value[0];
																					keepSpace = $el
																							.data("keep-space");
																					radioTempValue = keepSpace === true ? $el
																							.val()
																							: $
																									.trim($el
																											.val())
																				}
																				if (isRadioChecked)
																					result
																							.push(key
																									+ "="
																									+ radioTempValue)
																			}
																		});
														return result.join("&")
													},
													methods : {
														required : function($el) {
															if ($el[0].tagName
																	.toLowerCase() === "select") {
																var val = $el
																		.val();
																return val
																		&& val.length > 0
															}
															if (this
																	.isCheckable($el))
																return this
																		.getLength($el) > 0;
															if (this
																	.isPassword($el))
																return $el
																		.val().length > 0;
															return $.trim($el
																	.val()).length > 0
														},
														minlength : function(
																$el, length) {
															var val = $el.val();
															return this
																	.optional($el)
																	|| val.length >= length
														},
														maxlength : function(
																$el, length) {
															var val = $el.val();
															return this
																	.checkOptionsl($el)
																	|| val.length <= length
														},
														rangelength : function(
																$el, min, max) {
															var val = $el.val();
															return this
																	.optional($el)
																	|| val.length >= min
																	&& val.length <= max
														},
														min : function($el,
																digit) {
															var val = $el.val(), num;
															if (this
																	.optional($el)
																	&& typeof val === "string") {
																num = parseInt(val);
																return num >= digit
															}
															return false
														},
														max : function($el,
																digit) {
															var val = $el.val(), num;
															if (this
																	.optional($el)
																	&& typeof val === "string") {
																num = parseInt(val);
																return num <= digit
															}
															return false
														},
														range : function($el,
																min, max) {
															var val = $el.val(), num;
															if (this
																	.optional($el)
																	&& typeof val === "string") {
																num = parseInt(val);
																return num >= min
																		&& num <= max
															}
															return false
														},
														equalTo : function(
																$elOne, $elTwo) {
															var valOne = $elOne
																	.val(), valTwo = $elTwo
																	.val();
															return valOne === valTwo
														},
														regex : function($el,
																pattern) {
															var val = $el.val();
															return this
																	.optional($el)
																	|| pattern
																			.test(val)
														},
														ajax : function($el,
																options) {
															if (this
																	.optional($el))
																return;
															var _this = this, name = $el
																	.attr("name");
															var ajaxOpts = {
																dataType : "json",
																success : function(
																		data) {
																	if (typeof options.callback !== "function") {
																		$
																				.error("the ajax method missing callback function.");
																		return
																	}
																	var result = options
																			.callback(data);
																	var tempValue = $.smartValidation
																			.getValue($el);
																	if (result.valid) {
																		$el
																				.data(
																						metadataConfig.verified,
																						true);
																		delete _this.errorsMap[name];
																		_this
																				.hideItemWarning($el);
																		_this
																				.showSuccessIcon($el)
																	} else {
																		$el
																				.data(
																						metadataConfig.verified,
																						false);
																		_this.errorsMap[name] = result.msg;
																		_this
																				.showItemWarning($el);
																		_this
																				.hideSuccessIcon($el)
																	}
																}
															};
															var opts = $
																	.extend(
																			true,
																			{},
																			options,
																			ajaxOpts);
															return $.ajax(opts)
														}
													}
												});
								var validator = function(options) {
									var opts = $
											.extend(true, {},
													$.smartValidation.defaults,
													options), smartValidator;
									if (this.length === 0) {
										$
												.error("Nothing element selected for validating");
										return
									}
									smartValidator = $.data(this.eq(0),
											"smartValidator");
									if (smartValidator
											&& smartValidator instanceof $.smartValidation)
										return smartValidator;
									smartValidator = new $.smartValidation(
											opts, this.eq(0));
									$.data(this.eq(0), "smartValidator",
											smartValidator);
									return smartValidator
								};
								if (typeof define === "function" && define.cmd)
									define(function(require, exports, module) {
										$.fn.smartValidator = validator
									});
								else
									$.fn.smartValidator = validator
							}, {} ],
					7 : [
							function(require, module, exports) {
								require("capslock.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/capslock.js */);
								require("placeholder.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/placeholder.js */);
								require("smart-validator.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/smart-validator.js */);
								var PasswordRules = require("password-rules.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/password-rules.js */);
								require("md5.js"/* tpa=https://member-ssl.vipstatic.com/js/public/plugins/md5.js */);
								var AD = require("ads.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/ads.js */);
								var mars = require("mars-1.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/mars.js */);
								document.msCapsLockWarningOff = true;
								$.smartValidation
										.addMethod(
												"checkpwd",
												function($el) {
													var val = $el.val(), name = $el
															.attr("name"), result = PasswordRules
															.validate(val);
													if (result.success)
														delete this.validatorMessages[name]["checkpwd"];
													else
														this.validatorMessages[name]["checkpwd"] = result.message;
													if ($el.attr("id") == "J_email_pwd") {
														var loginName = $
																.trim($(
																		"#J_email_name")
																		.val());
														if (val == loginName) {
															this.validatorMessages[name]["checkpwd"] = "\u5bc6\u7801\u4e0d\u80fd\u4e0e\u767b\u5f55\u540d\u4e00\u81f4";
															result.success = false
														}
													}
													return result.success
												});
								var registerForm = {
									domain : "https://member-ssl.vipstatic.com/js/public/passport/1/.vip.com",
									activeStatus : "active_status",
									activeMailName : "active_mail_name",
									init : function() {
										AD.init();
										mars.init();
										var mobileConfig, emailConfig;
										if (typeof registerFormPageSourceType === "undefined")
											registerForm.pageSource = 0;
										else
											registerForm.pageSource = registerFormPageSourceType;
										registerForm.initMarsSeed();
										registerForm.initControls();
										registerForm.tryShowEmailForm();
										registerForm.trySetSingleRegisterLink();
										registerForm.controls.password
												.on(
														"keyup",
														registerForm.events.checkStrength);
										registerForm.controls.password
												.on(
														"keypress",
														registerForm.events.checkCapsLock);
										registerForm.controls.confirmPwd
												.on(
														"keypress",
														registerForm.events.checkConfirmPwdCapsLock);
										registerForm.controls.btnVerifyCode.on(
												"click",
												registerForm.sms.sendSms);
										registerForm.controls.inputVerifyCode
												.on(
														"focus",
														registerForm.sms.focusVerifyCode);
										registerForm.controls.regFormLink
												.on(
														"click",
														registerForm.events.showEnterForm);
										registerForm.controls.systemErrorTips
												.find(".close")
												.on(
														"click",
														registerForm.hideSystemErrorTips);
										registerForm.controls.diaClose.on(
												"click",
												registerForm.floating.close);
										registerForm.controls.diaMailbox
												.on(
														"click",
														registerForm.floating.loginMailbox);
										registerForm.controls.diaTimedown
												.on(
														"click",
														registerForm.floating.showTimeTip);
										$(window)
												.on(
														"resize",
														registerForm.floating.setPosition);
										registerForm.controls.formWrapper
												.placeholder();
										if (isThirdLogin) {
											mobileConfig = registerForm.configs.mobileRegister;
											emailConfig = registerForm.configs.emailRegister
										} else {
											mobileConfig = $
													.extend(
															true,
															{},
															registerForm.configs.mobileRegister);
											emailConfig = $
													.extend(
															true,
															{},
															registerForm.configs.emailRegister)
										}
										registerForm.mobileValidation = registerForm.controls.moForm
												.smartValidator(mobileConfig);
										registerForm.emailValidation = registerForm.controls.emForm
												.smartValidator(emailConfig)
									},
									initMarsSeed : function() {
										var $el, mars;
										if (typeof registerFormMarsSeed !== "undefined")
											for ( var key in registerFormMarsSeed) {
												$el = $(key);
												mars = registerFormMarsSeed[key];
												if (mars.indexOf("ff=") > -1)
													if ($el.attr("href")
															.indexOf("?") < 0)
														$el.attr("href", $el
																.attr("href")
																+ "?" + mars);
													else
														$el.attr("href", $el
																.attr("href")
																+ "&" + mars);
												else
													$el.attr("mars_sead", mars)
											}
									},
									initControls : function() {
										var $formWrapper = $("#reg-form-wrapper");
										var $dialogMail = $("#dialog_tip");
										registerForm.controls = {
											formWrapper : $formWrapper,
											password : $formWrapper
													.find('input[name="password"]'),
											btnVerifyCode : $formWrapper
													.find(".btn-verify-code"),
											regFormLink : $formWrapper
													.find(".reg-form-link"),
											systemErrorTips : $formWrapper
													.find(".ui-tips1"),
											loginLink : $("#J_normal_loginlink"),
											inputVerifyCode : $formWrapper
													.find(".ipt-verify-code"),
											confirmPwd : $formWrapper
													.find(".confirm-pwd"),
											moForm : $("#reg_mobile_form"),
											moMobile : $("#J_mobile_name"),
											moMan : $("#J_mobile_man"),
											moWoman : $("#J_mobile_woman"),
											moPassword : $("#J_mobile_pwd"),
											moConfirmPassword : $("#J_mobile_confirm_pwd"),
											moCode : $("#J_mobile_code"),
											moVerifyCodeBtn : $("#J_mobile_verifycode_btn"),
											moRegBtn : $("#J_mobile_reg_button"),
											moAgree : $("#J_mobile_agree"),
											emForm : $("#reg_email_form"),
											emName : $("#J_email_name"),
											emMan : $("#J_email_man"),
											emWoman : $("#J_email_woman"),
											emPassword : $("#J_email_pwd"),
											emConfirmPassword : $("#J_email_confirm_pwd"),
											emMobile : $("#J_email_mobile"),
											emCode : $("#J_email_code"),
											emVerifyCodeBtn : $("#J_email_verifycode_btn"),
											emRegBtn : $("#J_email_reg_button"),
											emAgree : $("#J_email_agree"),
											thirdChannel : $("#thirdChannel"),
											bindToken : $("#bind_token"),
											dialogMail : $dialogMail,
											diaMedium : $("#j-dialog-medium"),
											diaMask : $dialogMail
													.find(".ui-window-mask"),
											diaMain : $dialogMail
													.find(".main_tip"),
											diaTime : $dialogMail
													.find(".tip_time"),
											diaClose : $dialogMail
													.find(".ui-dialog-close"),
											diaMailbox : $dialogMail
													.find(".login_mailbox"),
											diaMailAcc : $dialogMail
													.find(".mail_account"),
											diaTimedown : $dialogMail
													.find(".repeat_send"),
											diaSuccess : $dialogMail
													.find(".success_tip"),
											diaFailure : $dialogMail
													.find(".failure_tip"),
											singleSignLink : $formWrapper
													.find(".single-sign-link"),
											successCode : $("#J_success_code")
										}
									},
									showSystemErrorTips : function(errorMsg) {
										registerForm.controls.systemErrorTips
												.removeClass("hidden").find(
														".info-msg").html(
														errorMsg);
										registerForm.systemErrorTimer = setTimeout(
												function() {
													registerForm
															.hideSystemErrorTips()
												}, 5E3)
									},
									hideSystemErrorTips : function() {
										if (registerForm.systemErrorTimer)
											clearTimeout(registerForm.systemErrorTimer);
										registerForm.controls.systemErrorTips
												.addClass("hidden").find(
														".info-msg").html("")
									},
									callb2c : function(signedApiUrl) {
										$
												.ajax({
													url : signedApiUrl
															+ "&callback=?",
													cache : false,
													crossDomain : true,
													contentType : "application/json",
													dataType : "jsonp",
													success : function(result) {
														if (result.status == 1)
															redirect2Src();
														else
															alert("\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5 ")
													},
													error : function(jqXHR,
															textStatus,
															errorThrown) {
														redirect2Src();
														return
													}
												})
									},
									tryShowEmailForm : function() {
										var link;
										var regByEmail = getQueryStringByName("regbyemail");
										if (regByEmail === "true") {
											registerForm.controls.moForm
													.addClass("hidden");
											registerForm.controls.emForm
													.removeClass("hidden");
											registerForm.tryShowFloating()
										}
										if (registerForm.controls.loginLink.length > 0) {
											link = registerForm.controls.loginLink
													.attr("href");
											link = link.indexOf("?") > -1 ? link
													.substr(0, link
															.indexOf("?"))
													: link;
											registerForm.controls.loginLink
													.attr("href", link
															+ "?ff=125|2|1|1")
										}
									},
									tryShowFloating : function() {
										var activeStatus = $.Cookie
												.get(registerForm.activeStatus);
										var emailName = $.Cookie
												.get(registerForm.activeMailName);
										if (activeStatus == "false"
												&& emailName != "")
											registerForm.floating.open()
									},
									resetSecretFields : function() {
										var $indicator = registerForm.controls.formWrapper
												.find(".strength-indicator");
										var mobileSecret = [
												registerForm.controls.moPassword,
												registerForm.controls.moConfirmPassword,
												registerForm.controls.moCode ];
										var emailSecret = [
												registerForm.controls.emPassword,
												registerForm.controls.emConfirmPassword,
												registerForm.controls.emCode ];
										registerForm.resetFields(
												registerForm.mobileValidation,
												mobileSecret);
										if (!registerForm
												.isSupportPlaceholder())
											for (var i = 0, j = mobileSecret.length; i < j; i++)
												mobileSecret[i].siblings(
														".ie-placeholder")
														.show();
										registerForm.resetFields(
												registerForm.emailValidation,
												emailSecret);
										if (!registerForm
												.isSupportPlaceholder())
											for (var i = 0, j = emailSecret.length; i < j; i++)
												emailSecret[i].siblings(
														".ie-placeholder")
														.show();
										$indicator
												.removeClass(
														"login-pwd-w login-pwd-m login-pwd-s")
												.hide();
										registerForm.controls.moPassword
												.parents(".control-group")
												.removeClass("mb0");
										registerForm.controls.emPassword
												.parents(".control-group")
												.removeClass("mb0")
									},
									resetFields : function(validation, eles) {
										var len = eles.length;
										var $el;
										for (var i = 0; i < len; i++) {
											$el = eles[i];
											$el.val("");
											validation.hideError($el);
											validation.hideSuccessIcon($el);
											validation.removeErrorState($el)
										}
									},
									trySetSingleRegisterLink : function() {
										var href, returnUrl;
										if (registerForm.controls.singleSignLink.length > 0) {
											href = registerForm.controls.singleSignLink
													.attr("href");
											href = href.indexOf("?") > -1 ? href
													+ "&"
													: href + "?";
											returnUrl = document.referrer ? document.referrer
													: "";
											href += "src="
													+ encodeURIComponent(returnUrl);
											registerForm.controls.singleSignLink
													.attr("href", href)
										}
									},
									isSupportPlaceholder : function() {
										var result = "placeholder" in document
												.createElement("input");
										return result
									},
									floating : {
										setPosition : function() {
											var ele = registerForm.controls.diaMedium;
											var oWin = $(window);
											var diaLeft, diaTop;
											if (ele.length > 0) {
												diaLeft = (oWin.width() - ele
														.outerWidth()) / 2;
												diaTop = (oWin.height() - ele
														.outerHeight())
														* 0.45
														+ oWin.scrollTop();
												ele.css({
													left : diaLeft,
													top : diaTop
												})
											}
										},
										open : function() {
											var ele = registerForm.controls.diaMedium;
											var emailName = $.Cookie
													.get(registerForm.activeMailName);
											registerForm.floating.setPosition();
											ele.addClass("z-ui-dialog-in");
											registerForm.controls.diaMask
													.show();
											registerForm.controls.diaMailAcc
													.html(emailName)
										},
										close : function() {
											var target = $(this).parents(
													".z-ui-dialog-in");
											target.addClass("z-ui-dialog-out");
											registerForm.controls.diaMask
													.hide();
											setTimeout(
													function() {
														target
																.removeClass("z-ui-dialog-in z-ui-dialog-out")
													}, 350);
											window
													.clearInterval(registerForm.tiemDown);
											registerForm.controls.diaSuccess
													.hide();
											registerForm.controls.diaFailure
													.hide();
											registerForm.controls.diaTime
													.html("120");
											registerForm.resetSecretFields()
										},
										loginMailbox : function() {
											var url = registerForm.controls.diaMailAcc
													.text().split("@")[1];
											for ( var i in registerForm.configs.emailboxLogin)
												if (url.match(i))
													window.location.href = registerForm.configs.emailboxLogin[url];
												else
													window.location.href = "http://mail./"
															+ url
										},
										showTimeTip : function() {
											$
													.ajax({
														"type" : "post",
														"url" : ctx
																+ "/account/sendMail",
														"data" : {
															"mailName" : registerForm.controls.diaMailAcc
																	.text(),
															"pageSource" : registerForm.pageSource
														},
														"success" : function(
																rtn) {
															if (registerForm.tiemDown) {
																clearInterval(registerForm.tiemDown);
																registerForm.controls.diaTime
																		.html("120")
															}
															if (rtn.errorCode == "0") {
																registerForm.tiemDown = setInterval(
																		registerForm.floating.timedown,
																		1E3);
																registerForm.controls.diaSuccess
																		.show();
																registerForm.controls.diaFailure
																		.hide()
															} else if (rtn.errorCode == "1") {
																registerForm.controls.diaSuccess
																		.hide();
																registerForm.controls.diaFailure
																		.show()
															} else if (rtn.errorCode == "2") {
																registerForm.floating
																		.close();
																location.href = location.href
															}
														},
														"error" : function(rtn) {
															registerForm.controls.diaSuccess
																	.hide();
															registerForm.controls.diaFailure
																	.show()
														},
														"dataType" : "json"
													})
										},
										timedown : function() {
											var time = parseInt(registerForm.controls.diaTime
													.html());
											time--;
											registerForm.controls.diaTime
													.html(time);
											if (time == 0) {
												window
														.clearInterval(registerForm.tiemDown);
												registerForm.controls.diaSuccess
														.hide();
												registerForm.controls.diaFailure
														.hide();
												registerForm.controls.diaTime
														.html("120")
											}
										}
									},
									sms : {
										countdown : function($el, cookieTime) {
											var time = 60;
											var countdownHtml = '<span class="countdown-time f-pink">'
													+ time
													+ "</span>\u79d2\u540e\u91cd\u65b0\u83b7\u53d6";
											var tempHtml;
											$el.html(countdownHtml)
													.removeClass(
															"ui-btn-secondary")
													.addClass("ui-btn-disable");
											registerForm.smsTimer = setInterval(
													function() {
														time--;
														if (time === 0) {
															if (cookieTime === 0)
																$el
																		.html(
																				"\u83b7\u53d6\u9a8c\u8bc1\u7801")
																		.addClass(
																				"ui-btn-disable")
																		.removeClass(
																				"ui-btn-secondary");
															else
																$el
																		.html(
																				"\u83b7\u53d6\u9a8c\u8bc1\u7801")
																		.removeClass(
																				"ui-btn-disable")
																		.addClass(
																				"ui-btn-secondary");
															clearInterval(registerForm.smsTimer)
														} else if (time > 0) {
															tempHtml = '<span class="countdown-time f-pink">'
																	+ time
																	+ "</span>\u79d2\u540e\u91cd\u65b0\u83b7\u53d6";
															$el.html(tempHtml)
														}
													}, 1E3)
										},
										stopCountdown : function($form) {
											var $btn = $form
													.find(".btn-verify-code");
											$btn
													.html(
															"\u83b7\u53d6\u9a8c\u8bc1\u7801")
													.removeClass(
															"ui-btn-disable")
													.addClass(
															"ui-btn-secondary");
											if (registerForm.smsTimer)
												clearInterval(registerForm.smsTimer)
										},
										sendSms : function(e) {
											e.stopPropagation();
											var $target = $(e.target);
											if (!$target
													.hasClass("btn-verify-code"))
												return;
											var $form = $target.parents("form");
											var $phone = $form
													.find(".ipt-phone");
											var $verifyInput = $form
													.find(".ipt-verify-code");
											var $customInfoTips = $target
													.parents(
															".ui-form-item-group")
													.find(
															".custom-tooltips-info");
											var key = "times_"
													+ $.trim($phone.val());
											var cookieTime = $.Cookie.get(key);
											var leftCookieTime;
											var validation = $form
													.is(registerForm.controls.moForm) ? registerForm.mobileValidation
													: registerForm.emailValidation;
											validation.hideError($verifyInput);
											validation
													.removeErrorState($verifyInput);
											if (cookieTime === "0")
												validation
														.showCustomTips(
																$customInfoTips,
																registerForm.configs.smsInfoTips["exceedLimited"]);
											function handleSmsData(data) {
												if (data.head.result == "success") {
													if (cookieTime == "") {
														validation
																.showCustomTips(
																		$customInfoTips,
																		registerForm.configs.smsInfoTips["other"]);
														leftCookieTime = 9;
														$.Cookie
																.set(
																		key,
																		leftCookieTime,
																		registerForm.domain,
																		null,
																		24)
													} else {
														leftCookieTime = parseInt(cookieTime) - 1;
														switch (cookieTime) {
														case "3":
														case "2":
														case "1":
															validation
																	.showCustomTips(
																			$customInfoTips,
																			registerForm.configs.smsInfoTips[cookieTime]);
															$.Cookie
																	.set(
																			key,
																			leftCookieTime,
																			registerForm.domain,
																			null,
																			24);
															break;
														default:
															validation
																	.showCustomTips(
																			$customInfoTips,
																			registerForm.configs.smsInfoTips["other"]);
															$.Cookie
																	.set(
																			key,
																			leftCookieTime,
																			registerForm.domain,
																			null,
																			24)
														}
													}
													registerForm.sms.countdown(
															$target,
															leftCookieTime);
													$phone.data("pvssid",
															data.body.data)
												} else {
													var errmsg = registerForm.configs.smsErrorCode[data.head.code];
													errmsg = errmsg === undefined ? registerForm.configs.smsInfoTips["occurError"]
															: errmsg;
													validation.showCustomTips(
															$customInfoTips,
															errmsg)
												}
											}
											if (!$target
													.hasClass("ui-btn-disable")
													&& cookieTime !== "0") {
												$phone.data("pvssid", "");
												$
														.ajax({
															"type" : "POST",
															"url" : ctx
																	+ "/register/send_phone_verify",
															"data" : {
																phone : $
																		.trim($phone
																				.val())
															},
															cache : false,
															success : function(
																	data) {
																handleSmsData(data)
															},
															error : function() {
																validation
																		.showCustomTips(
																				$customInfoTips,
																				registerForm.configs.smsInfoTips["occurError"])
															},
															"dataType" : "json"
														})
											}
										},
										setSmsButtonStatus : function($form,
												isPhoneValid) {
											var $phone = $form
													.find(".ipt-phone");
											var key = "times_"
													+ $.trim($phone.val());
											var cookieTime = $.Cookie.get(key);
											var $btn = $form
													.find(".btn-verify-code");
											registerForm.sms
													.stopCountdown($form);
											if (isPhoneValid) {
												if (cookieTime === "0")
													$btn
															.removeClass(
																	"ui-btn-secondary")
															.addClass(
																	"ui-btn-disable")
											} else
												$btn
														.removeClass(
																"ui-btn-secondary")
														.addClass(
																"ui-btn-disable")
										},
										focusVerifyCode : function(e) {
											var $target = $(e.target);
											var $form = $target.parents("form");
											var $customInfoTips = $target
													.parents(
															".ui-form-item-group")
													.find(
															".custom-tooltips-info");
											var validation = $form
													.is(registerForm.controls.moForm) ? registerForm.mobileValidation
													: registerForm.emailValidation;
											validation
													.hideCustomTips($customInfoTips)
										}
									},
									data : {
										checkUserName : function(data,
												userType, $form) {
											var result = {};
											var errorCodeMap;
											if (typeof data.result != "undefined"
													&& data.result == "haslogin") {
												if (clsoseMessenger())
													return false;
												redirect2Src();
												return
											}
											if (userType === 0)
												errorCodeMap = registerForm.configs.mobileCheckerErrorCode;
											else
												errorCodeMap = registerForm.configs.emailCheckerErrorCode;
											if (typeof data.result !== "undefined"
													&& data.result === "success") {
												result.valid = true;
												if ($form)
													registerForm.sms
															.setSmsButtonStatus(
																	$form, true)
											} else if (typeof data.result !== "undefined"
													&& data.result === "error") {
												result.valid = errorCodeMap[data.errorCode][0];
												result.msg = registerForm.data
														.addSeedForTipsLoginLink(
																data.errorCode,
																errorCodeMap[data.errorCode][1],
																userType);
												if ($form)
													registerForm.sms
															.setSmsButtonStatus(
																	$form,
																	errorCodeMap[data.errorCode][0])
											} else {
												result.valid = false;
												result.msg = "\u7cfb\u7edf\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5";
												if ($form)
													registerForm.sms
															.setSmsButtonStatus(
																	$form,
																	false)
											}
											return result
										},
										addSeedForTipsLoginLink : function(
												errorCode, msg, userType) {
											if (errorCode === 9)
												return msg
														.replace(
																/\{0\}/g,
																registerForm.configs.tipsLoginSeed[registerForm.pageSource][userType]);
											return msg
										}
									},
									events : {
										checkStrength : function(e) {
											var $target = $(e.target), $form = $target
													.parents("form"), $indicator = $form
													.find(".strength-indicator"), result = PasswordRules
													.validate($target.val());
											$target.parents(".control-group")
													.addClass("mb0");
											$indicator.show();
											$indicator
													.removeClass("login-pwd-w login-pwd-m login-pwd-s");
											$indicator.addClass("login-pwd-"
													+ result.strength)
										},
										checkCapsLock : function(e) {
											var isCapsLock = capslock.detect(e), $target = $(e.target), $infoTips;
											if ($target.data("verified") === undefined
													|| $target.data("verified") === true) {
												$infoTips = $target
														.parents(
																".ui-form-item-group")
														.find(
																".validator-tooltips-info");
												if (isCapsLock) {
													$infoTips
															.find(
																	".validator-msg")
															.html(
																	"\u952e\u76d8\u5927\u5199\u9501\u5b9a\u5df2\u6253\u5f00\uff0c\u8bf7\u6ce8\u610f\u5927\u5c0f\u5199");
													if (!$infoTips
															.hasClass("z-ui-tooltips-in"))
														$infoTips
																.addClass("z-ui-tooltips-in")
												} else
													$infoTips
															.find(
																	".validator-msg")
															.html(
																	"\u5bc6\u7801\u75316-20\u4f4d\u5b57\u6bcd\uff0c\u6570\u5b57\u548c\u7b26\u53f7\u81f3\u5c11\u4e24\u79cd\u4ee5\u4e0a\u5b57\u7b26\u7ec4\u5408\uff0c\u533a\u5206\u5927\u5c0f\u5199")
											}
										},
										showEnterForm : function(e) {
											e.preventDefault();
											var $target = $(e.target);
											var $form = $target.parents("form");
											var link;
											$form.addClass("hidden");
											$form.siblings(".register-form")
													.removeClass("hidden");
											if (registerForm.controls.loginLink.length > 0) {
												link = registerForm.controls.loginLink
														.attr("href");
												link = link.indexOf("?") > -1 ? link
														.substr(0, link
																.indexOf("?"))
														: link;
												if ($target.attr("id") === "J_mobile_to_email")
													registerForm.controls.loginLink
															.attr(
																	"href",
																	link
																			+ "?ff=125|2|2|1");
												else if ($target.attr("id") === "J_email_to_mobile")
													registerForm.controls.loginLink
															.attr(
																	"href",
																	link
																			+ "?ff=125|2|1|1")
											}
											if ($target.attr("id") === "J_mobile_to_email"
													|| $target.attr("id") === "J_mobile_third_email")
												registerForm.tryShowFloating()
										},
										checkConfirmPwdCapsLock : function(e) {
											var isCapsLock = capslock.detect(e), $target = $(e.target), $infoTips;
											if ($target.data("verified") === undefined
													|| $target.data("verified") === true) {
												$infoTips = $target
														.parents(
																".ui-form-item-group")
														.find(
																".custom-tooltips-info");
												if (isCapsLock) {
													$infoTips
															.find(
																	".validator-msg")
															.html(
																	"\u952e\u76d8\u5927\u5199\u9501\u5b9a\u5df2\u6253\u5f00\uff0c\u8bf7\u6ce8\u610f\u5927\u5c0f\u5199");
													if (!$infoTips
															.hasClass("z-ui-tooltips-in"))
														$infoTips
																.addClass("z-ui-tooltips-in")
												} else
													$infoTips
															.removeClass("z-ui-tooltips-in z-ui-tooltips-out")
											}
										}
									},
									configs : {
										mobileRegister : {
											rules : {
												"loginName" : {
													"required" : true,
													"regex" : /^[1][3,4,5,7,8][0-9]{9}$/,
													"ajax" : {
														url : ctx
																+ "/register/checkUserNameExistsOrBound",
														cache : false,
														type : "POST",
														data : {
															"loginName" : function() {
																return $
																		.trim($(
																				"#J_mobile_name")
																				.val())
															}
														},
														callback : function(
																data) {
															return registerForm.data
																	.checkUserName(
																			data,
																			0,
																			registerForm.controls.moForm)
														}
													}
												},
												"password" : {
													"required" : true,
													"checkpwd" : true
												},
												"confirmPassword" : {
													"required" : true,
													"equalTo" : "#J_mobile_pwd"
												},
												"pvcode" : {
													"required" : true,
													"regex" : /^\d{6}$/
												},
												"agree" : {
													"required" : true
												}
											},
											messages : {
												"loginName" : {
													"required" : "\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a",
													"regex" : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"
												},
												"password" : {
													"required" : "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"
												},
												"confirmPassword" : {
													"required" : "\u8bf7\u8f93\u5165\u786e\u8ba4\u5bc6\u7801",
													"equalTo" : "\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u8bd5"
												},
												"pvcode" : {
													"required" : "\u8bf7\u8f93\u51656\u4f4d\u6570\u5b57\u624b\u673a\u9a8c\u8bc1\u7801",
													"regex" : "\u8bf7\u8f93\u51656\u4f4d\u6570\u5b57\u624b\u673a\u9a8c\u8bc1\u7801"
												},
												"agree" : {
													"required" : "\u63a5\u53d7\u670d\u52a1\u6761\u6b3e\u624d\u80fd\u6ce8\u518c"
												}
											},
											infos : {
												"loginName" : "\u8bf7\u8f93\u5165\u60a8\u768411\u4f4d\u624b\u673a\u53f7\u7801",
												"password" : "\u5bc6\u7801\u75316-20\u4f4d\u5b57\u6bcd\uff0c\u6570\u5b57\u548c\u7b26\u53f7\u81f3\u5c11\u4e24\u79cd\u4ee5\u4e0a\u5b57\u7b26\u7ec4\u5408\uff0c\u533a\u5206\u5927\u5c0f\u5199"
											},
											oninvalid : {
												"loginName" : function() {
													registerForm.sms
															.setSmsButtonStatus(
																	registerForm.controls.moForm,
																	false)
												}
											},
											onsubmit : function() {
												mars.send();
												var channel, bindToken;
												var url, formData, isAgreeChecked, agree;
												var $agreeChecked = registerForm.controls.moAgree
														.filter(":checked");
												if ($agreeChecked.length > 0) {
													isAgreeChecked = true;
													agree = $agreeChecked.val()
												} else
													isAgreeChecked = false;
												formData = {
													"loginName" : $
															.trim(registerForm.controls.moMobile
																	.val()),
													"password" : md5(registerForm.controls.moPassword
															.val()),
													"pvssid" : registerForm.controls.moMobile
															.data("pvssid"),
													"pvcode" : $
															.trim(registerForm.controls.moCode
																	.val())
												};
												if (isAgreeChecked)
													formData["agree"] = agree;
												if (isThirdLogin) {
													channel = registerForm.controls.thirdChannel
															.val();
													bindToken = registerForm.controls.bindToken
															.val();
													url = ctx + "/binding/"
															+ channel
															+ "/mobile?v="
															+ Math.random();
													formData["bind_token"] = bindToken
												} else
													url = ctx
															+ "/register/phone?v="
															+ Math.random();
												if (registerForm.controls.successCode.length > 0)
													formData["SUCCESS_CODE"] = registerForm.controls.successCode
															.val();
												registerForm.controls.moForm
														.find(
																".custom-tooltips-info")
														.removeClass(
																"z-ui-tooltips-in z-ui-tooltips-out");
												$
														.post(
																url,
																formData,
																function(data) {
																	var $el, $warningTips, tempHtml;
																	if (typeof data.result !== "undefined"
																			&& data.result === "haslogin") {
																		if (clsoseMessenger())
																			return false;
																		redirect2Src();
																		return
																	}
																	if (typeof data.result !== "undefined"
																			&& data.result === "error")
																		if (data.errorCode === 10
																				|| data.errorCode === 11)
																			registerForm
																					.showSystemErrorTips(registerForm.configs.mobileFormErrorCode[data.errorCode]);
																		else {
																			$el = $(registerForm.configs.mobileFormErrorCode[data.errorCode][0]);
																			tempHtml = registerForm.configs.mobileFormErrorCode[data.errorCode][1];
																			tempHtml = registerForm.data
																					.addSeedForTipsLoginLink(
																							data.errorCode,
																							tempHtml,
																							0);
																			registerForm.mobileValidation
																					.showError(
																							$el,
																							tempHtml)
																		}
																	else if (typeof data.result !== "undefined"
																			&& data.result === "success")
																		registerForm
																				.callb2c(data.data.signedApiUrl);
																	else
																		registerForm
																				.showSystemErrorTips("\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5")
																}, "json")
														.done(
																function() {
																	registerForm.controls.moRegBtn
																			.removeClass("z-ui-btn-loading")
																})
											}
										},
										emailRegister : {
											rules : {
												"loginName" : {
													"required" : true,
													"regex" : /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
													"ajax" : {
														url : ctx
																+ "/register/checkUserNameExistsOrBound",
														type : "POST",
														data : {
															"loginName" : function() {
																return $
																		.trim($(
																				"#J_email_name")
																				.val())
															},
															"anticache" : (new Date)
																	.getTime()
														},
														callback : function(
																data) {
															return registerForm.data
																	.checkUserName(
																			data,
																			1)
														}
													}
												},
												"password" : {
													"required" : true,
													"checkpwd" : true
												},
												"confirmPassword" : {
													"required" : true,
													"equalTo" : "#J_email_pwd"
												},
												"verified" : {
													"required" : true,
													"regex" : /^[1][3,4,5,7,8][0-9]{9}$/,
													"ajax" : {
														url : ctx
																+ "/register/checkUserNameExistsOrBound",
														type : "POST",
														data : {
															"loginName" : function() {
																return $
																		.trim(registerForm.controls.emMobile
																				.val())
															},
															"anticache" : (new Date)
																	.getTime()
														},
														callback : function(
																data) {
															return registerForm.data
																	.checkUserName(
																			data,
																			0,
																			registerForm.controls.emForm)
														}
													}
												},
												"pvcode" : {
													"required" : true,
													"regex" : /^\d{6}$/
												},
												"agree" : {
													"required" : true
												}
											},
											messages : {
												"loginName" : {
													"required" : "\u90ae\u7bb1\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a",
													"regex" : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1\u8d26\u53f7"
												},
												"password" : {
													"required" : "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"
												},
												"confirmPassword" : {
													"required" : "\u8bf7\u8f93\u5165\u786e\u8ba4\u5bc6\u7801",
													"equalTo" : "\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u8bd5"
												},
												"verified" : {
													"required" : "\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a",
													"regex" : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"
												},
												"pvcode" : {
													"required" : "\u8bf7\u8f93\u51656\u4f4d\u6570\u5b57\u624b\u673a\u9a8c\u8bc1\u7801",
													"regex" : "\u8bf7\u8f93\u51656\u4f4d\u6570\u5b57\u624b\u673a\u9a8c\u8bc1\u7801"
												},
												"agree" : {
													"required" : "\u63a5\u53d7\u670d\u52a1\u6761\u6b3e\u624d\u80fd\u6ce8\u518c"
												}
											},
											infos : {
												"loginName" : "\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1\u8d26\u53f7",
												"verified" : "\u8bf7\u8f93\u5165\u60a8\u768411\u4f4d\u624b\u673a\u53f7\u7801",
												"password" : "\u5bc6\u7801\u75316-20\u4f4d\u5b57\u6bcd\uff0c\u6570\u5b57\u548c\u7b26\u53f7\u81f3\u5c11\u4e24\u79cd\u4ee5\u4e0a\u5b57\u7b26\u7ec4\u5408\uff0c\u533a\u5206\u5927\u5c0f\u5199"
											},
											oninvalid : {
												"verified" : function() {
													registerForm.sms
															.setSmsButtonStatus(
																	registerForm.controls.emForm,
																	false)
												}
											},
											onsubmit : function() {
												mars.send();
												var channel, bindToken;
												var url, formData, isAgreeChecked, agree;
												var redirectSrc = getQueryStringByName("src");
												var $agreeChecked = registerForm.controls.emAgree
														.filter(":checked");
												if ($agreeChecked.length > 0) {
													isAgreeChecked = true;
													agree = $agreeChecked.val()
												} else
													isAgreeChecked = false;
												formData = {
													"loginName" : $
															.trim(registerForm.controls.emName
																	.val()),
													"password" : md5(registerForm.controls.emPassword
															.val()),
													"verified" : $
															.trim(registerForm.controls.emMobile
																	.val()),
													"pvssid" : registerForm.controls.emMobile
															.data("pvssid"),
													"pvcode" : $
															.trim(registerForm.controls.emCode
																	.val()),
													"pageSource" : registerForm.pageSource
												};
												if (isAgreeChecked)
													formData["agree"] = agree;
												if (isThirdLogin) {
													channel = registerForm.controls.thirdChannel
															.val();
													bindToken = registerForm.controls.bindToken
															.val();
													url = ctx + "/binding/"
															+ channel
															+ "/email?v="
															+ Math.random();
													formData["bind_token"] = bindToken
												} else
													url = ctx
															+ "/register/mail?v="
															+ Math.random();
												if (registerForm.controls.successCode.length > 0)
													formData["SUCCESS_CODE"] = registerForm.controls.successCode
															.val();
												if (redirectSrc)
													formData["redirectSrc"] = redirectSrc;
												registerForm.controls.emForm
														.find(
																".custom-tooltips-info")
														.removeClass(
																"z-ui-tooltips-in z-ui-tooltips-out");
												$
														.post(
																url,
																formData,
																function(data) {
																	var $el, $warningTips, tempHtml;
																	if (typeof data.result !== "undefined"
																			&& data.result === "error")
																		if (data.errorCode === 10
																				|| data.errorCode === 11)
																			registerForm
																					.showSystemErrorTips(registerForm.configs.emailFormErrorCode[data.errorCode]);
																		else {
																			$el = $(registerForm.configs.emailFormErrorCode[data.errorCode][0]);
																			tempHtml = registerForm.configs.emailFormErrorCode[data.errorCode][1];
																			tempHtml = registerForm.data
																					.addSeedForTipsLoginLink(
																							data.errorCode,
																							tempHtml,
																							1);
																			registerForm.emailValidation
																					.showError(
																							$el,
																							tempHtml)
																		}
																	else if (typeof data.result != "undefined"
																			&& data.result == "success")
																		if (isThirdLogin
																				&& registerForm.controls.successCode
																						.val() === "2")
																			registerForm
																					.callb2c(data.data.signedApiUrl);
																		else {
																			registerForm.sms
																					.stopCountdown(registerForm.controls.emForm);
																			registerForm.floating
																					.open()
																		}
																	else
																		registerForm
																				.showSystemErrorTips("\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5")
																}, "json")
														.done(
																function() {
																	registerForm.controls.emRegBtn
																			.removeClass("z-ui-btn-loading")
																})
											}
										},
										smsErrorCode : {
											22001 : "\u8be5\u624b\u673a\u83b7\u53d6\u9a8c\u8bc1\u7801\u5df2\u8fbe\u4e0a\u9650\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5",
											20205 : "\u8be5\u624b\u673a\u83b7\u53d6\u9a8c\u8bc1\u7801\u5df2\u8fbe\u4e0a\u9650\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5",
											22101 : "\u624b\u673a\u53f7\u7801\u8f93\u5165\u9519\u8bef\uff0c\u65e0\u6cd5\u83b7\u53d6\u9a8c\u8bc1\u7801"
										},
										smsInfoTips : {
											3 : '\u6821\u9a8c\u7801\u5df2\u53d1\u51fa\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\u77ed\u4fe1\uff0c\u4eca\u65e5\u8fd8\u53ef\u83b7\u53d6<span class="f-pink">2\u6b21</span>\u9a8c\u8bc1\u7801',
											2 : '\u6821\u9a8c\u7801\u5df2\u53d1\u51fa\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\u77ed\u4fe1\uff0c\u4eca\u65e5\u8fd8\u53ef\u83b7\u53d6<span class="f-pink">1\u6b21</span>\u9a8c\u8bc1\u7801',
											1 : "\u6821\u9a8c\u7801\u5df2\u53d1\u51fa\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\u77ed\u4fe1\uff0c\u4eca\u65e5\u83b7\u53d6\u6b21\u6570\u5df2\u8fbe\u4e0a\u9650",
											"other" : "\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u8bf7\u67e5\u6536\u77ed\u4fe1",
											"exceedLimited" : "\u8be5\u624b\u673a\u83b7\u53d6\u9a8c\u8bc1\u7801\u5df2\u8fbe\u4e0a\u9650\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5",
											"occurError" : "\u83b7\u53d6\u9a8c\u8bc1\u7801\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"
										},
										mobileFormErrorCode : {
											1 : [ "#J_mobile_agree",
													"\u672a\u540c\u610f\u6ce8\u518c\u534f\u8bae" ],
											2 : [ "#J_mobile_name",
													"\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a" ],
											3 : [ "#J_mobile_name",
													"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801" ],
											4 : [ "#J_mobile_man",
													"\u8bf7\u9009\u62e9\u6027\u522b" ],
											5 : [ "#J_mobile_pwd",
													"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a" ],
											6 : [ "#J_mobile_pwd",
													"\u5bc6\u7801\u9700\u8981md5\u52a0\u5bc6\u4f20\u8f93" ],
											9 : [
													"#J_mobile_name",
													'\u8be5\u624b\u673a\u53f7\u5df2\u88ab\u6ce8\u518c\uff0c\u8bf7\u66f4\u6362\uff0c\u6216<a href="http://err.vip.com/404.html" class="reg-link-blue">\u7acb\u5373\u767b\u9646</a>' ],
											10 : "\u7cfb\u7edf\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5",
											11 : "\u5df2\u8d85\u8fc7\u6ce8\u518c\u9650\u5236\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5",
											14 : [
													"#J_mobile_name",
													"\u8be5\u624b\u673a\u53f7\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u8bf7\u66f4\u6362" ],
											21 : [ "#J_mobile_code",
													"\u6ca1\u6709\u8fdb\u884c\u624b\u673a\u9a8c\u8bc1" ],
											22 : [ "#J_mobile_code",
													"\u6ca1\u6709\u624b\u673a\u9a8c\u8bc1\u7801" ],
											23 : [ "#J_mobile_code",
													"\u9a8c\u8bc1\u7801\u9519\u8bef" ],
											24 : [ "#J_mobile_code",
													"\u9a8c\u8bc1\u7801\u8fc7\u671f" ],
											25 : [
													"#J_mobile_code",
													"\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\u8d85\u8fc7\u6b21\u6570\u9650\u5236" ],
											26 : [ "#J_mobile_code",
													"\u624b\u673a\u53f7\u548c\u9a8c\u8bc1\u7801\u4e0d\u5339\u914d" ]
										},
										emailFormErrorCode : {
											1 : [ "#J_email_agree",
													"\u672a\u540c\u610f\u6ce8\u518c\u534f\u8bae" ],
											2 : [ "#J_email_name",
													"\u90ae\u7bb1\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a" ],
											3 : [ "#J_email_name",
													"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1\u8d26\u53f7" ],
											4 : [ "#J_email_man",
													"\u8bf7\u9009\u62e9\u6027\u522b" ],
											5 : [ "#J_email_pwd",
													"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a" ],
											6 : [ "#J_email_pwd",
													"\u5bc6\u7801\u9700\u8981md5\u52a0\u5bc6\u4f20\u8f93" ],
											9 : [
													"#J_email_name",
													'\u8be5\u90ae\u7bb1\u8d26\u53f7\u5df2\u88ab\u6ce8\u518c\uff0c\u8bf7\u66f4\u6362\uff0c\u6216<a href="http://err.vip.com/404.html" class="reg-link-blue">\u7acb\u5373\u767b\u9646</a>' ],
											10 : "\u7cfb\u7edf\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5",
											11 : "\u5df2\u8d85\u8fc7\u6ce8\u518c\u9650\u5236\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5",
											12 : [ "#J_email_name",
													"\u90ae\u7bb1\u8d26\u53f7\u6ca1\u6709\u6fc0\u6d3b" ],
											14 : [
													"#J_email_mobile",
													"\u8be5\u624b\u673a\u53f7\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u8bf7\u66f4\u6362" ],
											15 : [ "#J_email_name",
													"\u90ae\u7bb1\u8d26\u53f7\u5df2\u88ab\u7ed1\u5b9a" ],
											16 : [
													"#J_email_name",
													"\u8d85\u8fc7\u5355\u4e2a\u90ae\u7bb1\u6bcf\u65e5\u6700\u5927\u90ae\u4ef6\u53d1\u9001\u6b21\u6570" ],
											17 : [ "#J_email_mobile",
													"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801" ],
											21 : [ "#J_email_code",
													"\u6ca1\u6709\u8fdb\u884c\u624b\u673a\u9a8c\u8bc1" ],
											22 : [ "#J_email_code",
													"\u6ca1\u6709\u624b\u673a\u9a8c\u8bc1\u7801" ],
											23 : [ "#J_email_code",
													"\u9a8c\u8bc1\u7801\u9519\u8bef" ],
											24 : [ "#J_email_code",
													"\u9a8c\u8bc1\u7801\u8fc7\u671f" ],
											25 : [
													"#J_email_code",
													"\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\u8d85\u8fc7\u6b21\u6570\u9650\u5236" ],
											26 : [ "#J_email_code",
													"\u624b\u673a\u53f7\u548c\u9a8c\u8bc1\u7801\u4e0d\u5339\u914d" ]
										},
										mobileCheckerErrorCode : {
											2 : [ false,
													"\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a" ],
											9 : [
													false,
													'\u8be5\u624b\u673a\u53f7\u5df2\u88ab\u6ce8\u518c\uff0c\u8bf7\u66f4\u6362\uff0c\u6216<a href="http://err.vip.com/404.html" class="reg-link-blue">\u7acb\u5373\u767b\u9646</a>' ],
											10 : [ false,
													"\u7cfb\u7edf\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5" ],
											11 : [
													false,
													"\u5df2\u8d85\u8fc7\u6ce8\u518c\u9650\u5236\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5" ],
											12 : [ false,
													"\u90ae\u7bb1\u8d26\u53f7\u6ca1\u6709\u6fc0\u6d3b" ],
											13 : [
													false,
													"\u8be5\u624b\u673a\u53f7\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u8bf7\u66f4\u6362" ]
										},
										emailCheckerErrorCode : {
											2 : [ false,
													"\u90ae\u7bb1\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a" ],
											9 : [
													false,
													'\u8be5\u90ae\u7bb1\u8d26\u53f7\u5df2\u88ab\u6ce8\u518c\uff0c\u8bf7\u66f4\u6362\uff0c\u6216<a href="http://err.vip.com/404.html" class="reg-link-blue">\u7acb\u5373\u767b\u9646</a>' ],
											10 : [ false,
													"\u7cfb\u7edf\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5" ],
											11 : [
													false,
													"\u5df2\u8d85\u8fc7\u6ce8\u518c\u9650\u5236\uff0c\u8bf7\u9694\u65e5\u91cd\u8bd5" ],
											12 : [ false,
													"\u90ae\u7bb1\u8d26\u53f7\u6ca1\u6709\u6fc0\u6d3b" ],
											13 : [
													false,
													"\u8be5\u90ae\u7bb1\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u8bf7\u66f4\u6362" ]
										},
										emailboxLogin : {
											"https://member-ssl.vipstatic.com/js/public/passport/1/qq.com" : "http://mail.qq.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/gmail.com" : "http://mail.google.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/sina.com" : "http://mail.sina.com.cn/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/163.com" : "http://mail.163.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/126.com" : "http://mail.126.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/yeah.net" : "http://www.yeah.net/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/sohu.com" : "http://mail.sohu.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/tom.com" : "http://mail.tom.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/sogou.com" : "http://mail.sogou.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/139.com" : "http://mail.10086.cn/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/hotmail.com" : "http://www.hotmail.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/live.com" : "http://login.live.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/live.cn" : "http://login.live.cn/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/live.com.cn" : "http://login.live.com.cn/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/189.com" : "http://webmail16.189.cn/webmail/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/yahoo.com.cn" : "http://mail.cn.yahoo.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/yahoo.cn" : "http://mail.cn.yahoo.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/eyou.com" : "http://www.eyou.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/21cn.com" : "http://mail.21cn.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/188.com" : "http://www.188.com/",
											"https://member-ssl.vipstatic.com/js/public/passport/1/foxmail.coom" : "http://www.foxmail.com/"
										},
										tipsLoginSeed : {
											0 : [ "?ff=125|2|1|13",
													"?ff=125|2|2|17" ],
											1 : [ "?ff=382|2|3|12",
													"?ff=382|2|3|28" ],
											2 : [ "?ff=383|2|4|14" ],
											3 : [ "?ff=384|2|5|19",
													"?ff=384|2|5|33" ]
										}
									}
								};
								function getQueryStringByName(name) {
									var result = location.search
											.match(new RegExp("[?&]" + name
													+ "=([^&]+)", "i"));
									if (result == null || result.length < 1)
										return "";
									return result[1]
								}
								$(function() {
									registerForm.init()
								})
							},
							{
								"md5.js"/* tpa=https://member-ssl.vipstatic.com/js/public/plugins/md5.js */: 8,
								"ads.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/ads.js */: 1,
								"capslock.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/capslock.js */: 2,
								"mars-1.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/mars.js */: 3,
								"password-rules.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/password-rules.js */: 4,
								"placeholder.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/placeholder.js */: 5,
								"smart-validator.js"/* tpa=https://member-ssl.vipstatic.com/js/public/passport/1/modules/smart-validator.js */: 6
							} ],
					8 : [ function(require, module, exports) {
						window.md5 = require("./modules/SecurityPlugin/md5");
						$.Listeners.pub("md5.loaded").success()
					}, {
						"./modules/SecurityPlugin/md5" : 9
					} ],
					9 : [
							function(require, module, exports) {
								(function($) {
									function safe_add(x, y) {
										var lsw = (x & 65535) + (y & 65535), msw = (x >> 16)
												+ (y >> 16) + (lsw >> 16);
										return msw << 16 | lsw & 65535
									}
									function bit_rol(num, cnt) {
										return num << cnt | num >>> 32 - cnt
									}
									function md5_cmn(q, a, b, x, s, t) {
										return safe_add(bit_rol(
												safe_add(safe_add(a, q),
														safe_add(x, t)), s), b)
									}
									function md5_ff(a, b, c, d, x, s, t) {
										return md5_cmn(b & c | ~b & d, a, b, x,
												s, t)
									}
									function md5_gg(a, b, c, d, x, s, t) {
										return md5_cmn(b & d | c & ~d, a, b, x,
												s, t)
									}
									function md5_hh(a, b, c, d, x, s, t) {
										return md5_cmn(b ^ c ^ d, a, b, x, s, t)
									}
									function md5_ii(a, b, c, d, x, s, t) {
										return md5_cmn(c ^ (b | ~d), a, b, x,
												s, t)
									}
									function binl_md5(x, len) {
										x[len >> 5] |= 128 << len % 32;
										x[(len + 64 >>> 9 << 4) + 14] = len;
										var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
										for (i = 0; i < x.length; i += 16) {
											olda = a;
											oldb = b;
											oldc = c;
											oldd = d;
											a = md5_ff(a, b, c, d, x[i], 7,
													-680876936);
											d = md5_ff(d, a, b, c, x[i + 1],
													12, -389564586);
											c = md5_ff(c, d, a, b, x[i + 2],
													17, 606105819);
											b = md5_ff(b, c, d, a, x[i + 3],
													22, -1044525330);
											a = md5_ff(a, b, c, d, x[i + 4], 7,
													-176418897);
											d = md5_ff(d, a, b, c, x[i + 5],
													12, 1200080426);
											c = md5_ff(c, d, a, b, x[i + 6],
													17, -1473231341);
											b = md5_ff(b, c, d, a, x[i + 7],
													22, -45705983);
											a = md5_ff(a, b, c, d, x[i + 8], 7,
													1770035416);
											d = md5_ff(d, a, b, c, x[i + 9],
													12, -1958414417);
											c = md5_ff(c, d, a, b, x[i + 10],
													17, -42063);
											b = md5_ff(b, c, d, a, x[i + 11],
													22, -1990404162);
											a = md5_ff(a, b, c, d, x[i + 12],
													7, 1804603682);
											d = md5_ff(d, a, b, c, x[i + 13],
													12, -40341101);
											c = md5_ff(c, d, a, b, x[i + 14],
													17, -1502002290);
											b = md5_ff(b, c, d, a, x[i + 15],
													22, 1236535329);
											a = md5_gg(a, b, c, d, x[i + 1], 5,
													-165796510);
											d = md5_gg(d, a, b, c, x[i + 6], 9,
													-1069501632);
											c = md5_gg(c, d, a, b, x[i + 11],
													14, 643717713);
											b = md5_gg(b, c, d, a, x[i], 20,
													-373897302);
											a = md5_gg(a, b, c, d, x[i + 5], 5,
													-701558691);
											d = md5_gg(d, a, b, c, x[i + 10],
													9, 38016083);
											c = md5_gg(c, d, a, b, x[i + 15],
													14, -660478335);
											b = md5_gg(b, c, d, a, x[i + 4],
													20, -405537848);
											a = md5_gg(a, b, c, d, x[i + 9], 5,
													568446438);
											d = md5_gg(d, a, b, c, x[i + 14],
													9, -1019803690);
											c = md5_gg(c, d, a, b, x[i + 3],
													14, -187363961);
											b = md5_gg(b, c, d, a, x[i + 8],
													20, 1163531501);
											a = md5_gg(a, b, c, d, x[i + 13],
													5, -1444681467);
											d = md5_gg(d, a, b, c, x[i + 2], 9,
													-51403784);
											c = md5_gg(c, d, a, b, x[i + 7],
													14, 1735328473);
											b = md5_gg(b, c, d, a, x[i + 12],
													20, -1926607734);
											a = md5_hh(a, b, c, d, x[i + 5], 4,
													-378558);
											d = md5_hh(d, a, b, c, x[i + 8],
													11, -2022574463);
											c = md5_hh(c, d, a, b, x[i + 11],
													16, 1839030562);
											b = md5_hh(b, c, d, a, x[i + 14],
													23, -35309556);
											a = md5_hh(a, b, c, d, x[i + 1], 4,
													-1530992060);
											d = md5_hh(d, a, b, c, x[i + 4],
													11, 1272893353);
											c = md5_hh(c, d, a, b, x[i + 7],
													16, -155497632);
											b = md5_hh(b, c, d, a, x[i + 10],
													23, -1094730640);
											a = md5_hh(a, b, c, d, x[i + 13],
													4, 681279174);
											d = md5_hh(d, a, b, c, x[i], 11,
													-358537222);
											c = md5_hh(c, d, a, b, x[i + 3],
													16, -722521979);
											b = md5_hh(b, c, d, a, x[i + 6],
													23, 76029189);
											a = md5_hh(a, b, c, d, x[i + 9], 4,
													-640364487);
											d = md5_hh(d, a, b, c, x[i + 12],
													11, -421815835);
											c = md5_hh(c, d, a, b, x[i + 15],
													16, 530742520);
											b = md5_hh(b, c, d, a, x[i + 2],
													23, -995338651);
											a = md5_ii(a, b, c, d, x[i], 6,
													-198630844);
											d = md5_ii(d, a, b, c, x[i + 7],
													10, 1126891415);
											c = md5_ii(c, d, a, b, x[i + 14],
													15, -1416354905);
											b = md5_ii(b, c, d, a, x[i + 5],
													21, -57434055);
											a = md5_ii(a, b, c, d, x[i + 12],
													6, 1700485571);
											d = md5_ii(d, a, b, c, x[i + 3],
													10, -1894986606);
											c = md5_ii(c, d, a, b, x[i + 10],
													15, -1051523);
											b = md5_ii(b, c, d, a, x[i + 1],
													21, -2054922799);
											a = md5_ii(a, b, c, d, x[i + 8], 6,
													1873313359);
											d = md5_ii(d, a, b, c, x[i + 15],
													10, -30611744);
											c = md5_ii(c, d, a, b, x[i + 6],
													15, -1560198380);
											b = md5_ii(b, c, d, a, x[i + 13],
													21, 1309151649);
											a = md5_ii(a, b, c, d, x[i + 4], 6,
													-145523070);
											d = md5_ii(d, a, b, c, x[i + 11],
													10, -1120210379);
											c = md5_ii(c, d, a, b, x[i + 2],
													15, 718787259);
											b = md5_ii(b, c, d, a, x[i + 9],
													21, -343485551);
											a = safe_add(a, olda);
											b = safe_add(b, oldb);
											c = safe_add(c, oldc);
											d = safe_add(d, oldd)
										}
										return [ a, b, c, d ]
									}
									function binl2rstr(input) {
										var i, output = "";
										for (i = 0; i < input.length * 32; i += 8)
											output += String
													.fromCharCode(input[i >> 5] >>> i % 32 & 255);
										return output
									}
									function rstr2binl(input) {
										var i, output = [];
										output[(input.length >> 2) - 1] = undefined;
										for (i = 0; i < output.length; i += 1)
											output[i] = 0;
										for (i = 0; i < input.length * 8; i += 8)
											output[i >> 5] |= (input
													.charCodeAt(i / 8) & 255) << i % 32;
										return output
									}
									function rstr_md5(s) {
										return binl2rstr(binl_md5(rstr2binl(s),
												s.length * 8))
									}
									function rstr_hmac_md5(key, data) {
										var i, bkey = rstr2binl(key), ipad = [], opad = [], hash;
										ipad[15] = opad[15] = undefined;
										if (bkey.length > 16)
											bkey = binl_md5(bkey,
													key.length * 8);
										for (i = 0; i < 16; i += 1) {
											ipad[i] = bkey[i] ^ 909522486;
											opad[i] = bkey[i] ^ 1549556828
										}
										hash = binl_md5(ipad
												.concat(rstr2binl(data)),
												512 + data.length * 8);
										return binl2rstr(binl_md5(opad
												.concat(hash), 512 + 128))
									}
									function rstr2hex(input) {
										var hex_tab = "0123456789abcdef", output = "", x, i;
										for (i = 0; i < input.length; i += 1) {
											x = input.charCodeAt(i);
											output += hex_tab
													.charAt(x >>> 4 & 15)
													+ hex_tab.charAt(x & 15)
										}
										return output
									}
									function str2rstr_utf8(input) {
										return unescape(encodeURIComponent(input))
									}
									function raw_md5(s) {
										return rstr_md5(str2rstr_utf8(s))
									}
									function hex_md5(s) {
										return rstr2hex(raw_md5(s))
									}
									function raw_hmac_md5(k, d) {
										return rstr_hmac_md5(str2rstr_utf8(k),
												str2rstr_utf8(d))
									}
									function hex_hmac_md5(k, d) {
										return rstr2hex(raw_hmac_md5(k, d))
									}
									function md5(string, key, raw) {
										if (!key) {
											if (!raw)
												return hex_md5(string);
											return raw_md5(string)
										}
										if (!raw)
											return hex_hmac_md5(key, string);
										return raw_hmac_md5(key, string)
									}
									if (typeof define === "function"
											&& define.amd)
										define(function() {
											return md5
										});
									else
										$.md5 = md5;
									module.exports = md5
								})(this)
							}, {} ]
				}, {}, [ 7 ]);
