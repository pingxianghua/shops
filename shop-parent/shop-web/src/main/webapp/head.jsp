<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="header">
	<div class="w1210">
		<div class="logo-info">
			<a href="index.htm" class="logo">
				<img src="${ctx}/resource/images/szy/mall_logo_0.png" />
			</a>
			
			<!-- logo右侧小广告 _start -->
			<a href="" class="logo-right">
				<img src="" />
			</a>
			<!-- logo右侧小广告 _end -->
			
		</div>
		<div class="search SZY-SEARCH-BOX">
			<form class="search-form SZY-SEARCH-BOX-FORM" method="get" action="search.html">
				<div class="search-info">
					<div class="search-type-box">
						<ul class="search-type">
							<li class="search-li curr" num="0">宝贝</li>
							<li class="search-li" num="1">店铺</li>
						</ul>
						<i></i>
					</div>
					<div class="search-box">
						<div class="search-box-con">
							<input type="text" class="keyword search-box-input SZY-SEARCH-BOX-KEYWORD" name="keyword" tabindex="9" autocomplete="off" data-searchwords="洁面乳" placeholder="好用的洁面乳" value="" />
						</div>
					</div>
					<input type='hidden' id="searchtype" name='type' value="0" class="searchtype" />
					<input type="button" id="btn_search_box_submit" value="搜索" class="button bg-color btn_search_box_submit SZY-SEARCH-BOX-SUBMIT" />
				</div>
				<!---热门搜索热搜词显示--->
				
				<div class="search-results hide SZY-SEARCH-BOX-HELPER">
					<ul class="history-results">
						<li class="title">
							<span>最近搜索</span>
							<a href="javascript:void(0);" class="clear-history clear">
								<i></i>
								清空
							</a>
						</li>
						<!---->
					</ul>
					<ul class="rec-results">
						<li class="title">
							<span>正在热搜中</span>
							<i class="close"></i>
						</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=电视.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=电视" title="电视">电视</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=全身镜.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=全身镜" title="全身镜">全身镜</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=躺椅折叠午休.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=躺椅折叠午休" title="躺椅折叠午休">躺椅折叠午休</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=榨汁机.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=榨汁机" title="榨汁机">榨汁机</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=科11.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=科11" title="科11">科11</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=凉鞋.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=凉鞋" title="凉鞋">凉鞋</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=雀巢.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=雀巢" title="雀巢">雀巢</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=连衣裙.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=连衣裙" title="连衣裙">连衣裙</a>
					</li>
					
					<li>
						<a target="_blank" href="search.html-keyword=洁面乳.htm" tppabs="http://www.szy.yunmall.68mall.com/search.html?keyword=洁面乳" title="洁面乳">洁面乳</a>
					</li>
					
				</ul>
			</div>
		</form>
			<ul class="hot-query">
				<!-- 默认搜索词 -->
				
				<li class="first">
					<a href="search.html-keyword=.htm" title=""></a>
				</li>
				
			</ul>
		</div>
		<!-- 搜索框右侧小广告 _start -->
		<div class="header-right">
			<a href="javascript:void(0);" target="_blank" title="">
				<img src="${ctx}/resource/images/szy/mall_search_right_ad_image_0.png" />
			</a>
		</div>
		<!-- 搜索框右侧小广告 _end -->
	</div>
</div>