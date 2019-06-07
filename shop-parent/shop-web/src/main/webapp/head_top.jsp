<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="header-top">
	<div class="header-box">
		<!-- 站点 -->
		<!--站点 start-->
		<div class="SZY-SUBSITE">
		</div>
		<!--站点 end-->

		<!-- 登录信息 -->
		<font id="login-info" class="login-info SZY-USER-NOT-LOGIN">
			<!--<em>欢迎来到爱上快购! </em>-->
			<a class="login color" href="${ctx}/user/toLogin.html" target="_top">请登录</a>
			<a class="register" href="${ctx}/user/toRegister.html" target="_top">免费注册</a>
		</font>
		<font id="login-info" class="login-info SZY-USER-ALREADY-LOGIN" style="display: none;">
			<em>
				<a href="" target="_blank" class="color SZY-USER-NAME"></a>
				<!--欢迎您回来!-->
			</em>
			<a href="login.html" data-method="post">退出</a>
		</font>

		<ul>
			<li>
				<a class="menu-hd home" href="index.htm" target="_top">
					<i></i>
					商城首页
				</a>
			</li>
			<li class="menu-item">
				<div class="menu">
					<a class="menu-hd myinfo" href=""  target="_blank">
						<i></i>
						我的商城
						<b></b>
					</a>
					<div id="menu-2" class="menu-bd">
						<span class="menu-bd-mask"></span>
						<div class="menu-bd-panel">
							<a href="javascript:void(0);" target="_blank">已买到的宝贝</a>
							<a href="javascript:void(0);" target="_blank">我的地址管理</a>
							<a href="javascript:void(0);" target="_blank">我收藏的宝贝</a>
							<a href="javascript:void(0);" target="_blank">我收藏的店铺</a>
						</div>
					</div>
				</div>
			</li>
			<li class="menu-item cartbox">
				<div class="menu">
					<a class="menu-hd cart" href="" target="_top">
						<i></i>
						购物车
						<span class="SZY-CART-COUNT">0</span>
						<b></b>
					</a>
					<div id="menu-4" class="menu-bd cart-box-main">
						<span class="menu-bd-mask"></span>
						<div class="dropdown-layer">
							<div class="spacer"></div>
							<div class="dropdown-layer-con cartbox-goods-list">
								<!-- 正在加载 -->
								<div class="cart-type">
									<i class="cart-type-icon"></i>
									<div class="cart-type-text">
										您的购物车是空的
										<br>
										<a class="color" href="javascript:void(0);" title="再去看看吧" target="_blank">再去看看吧</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li>
				<a class="menu-hd" href="" target="_blank">卖家中心</a>
			</li>
			
			<li class="menu-item">
				<div class="menu">
					<a class="menu-hd we-chat" href="" target="_top">
						<i></i>
						关注商城
						<b></b>
					</a>
					<div id="menu-5" class="menu-bd we-chat-qrcode">
						<span class="menu-bd-mask"></span>
						<a target="_top">
							<img src="mall_wx_qrcode_0.jpg" alt="官方微信" />
						</a>
						<p class="font-14">关注官方微信</p>
					</div>
				</div>
			</li>
			<li class="menu-item">
				<div class="menu">
					<a href="" class="menu-hd site-nav" target="_blank">
						商家支持
						<b></b>
					</a>
					<div id="menu-7" class="menu-bd site-nav-main">
						<span class="menu-bd-mask"></span>
						<div class="menu-bd-panel">
							<div class="site-nav-con">
								
								<a href="javascript:void(0);" target="_blank"  title="测试1">测试1</a>
								
								<a href="1.html" target="_blank"  title="新手上路">新手上路</a>
								
								<a href="2.html" target="_blank"  title="支付方式">支付方式</a>
								
								<a href="3.html" target="_blank"  title="配送服务">配送服务</a>
								
								<a href="4.html" target="_blank"  title="售后服务">售后服务</a>
								
								<a href="5.html" target="_blank"  title="商家合作">商家合作</a>
								
								<a href="list-17.html" target="_blank"  title="店铺街">店铺街</a>
								
								<a href="2-1.html" target="_blank"  title="测试2">测试2</a>
								
							</div>
						</div>
					</div>
				</div>
			</li>
			
		</ul>
	</div>
</div>