<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "精选房源" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
    "keywords" => "" ,
    "description" => "" ,
    "match_stylesheet" => true , //是否需要匹配路由的样式表
    "extra_stylesheets" => array(
        STATIC_DOMAIN . "/" . MODULE_NAME."/css/document/common.min.css"
    ) ,
    "match_javascript" => false  //是否需要匹配路由的脚本        
) ;
?>
<?php require_once("../components/head.php") ; ?>            
<!--<h1>抢房源攻略</h1>-->
<h2>精选房源标准</h2>
<ul>
    <li>有实景照片7张以上<small>系统要求的是室内6张+户型图1张</small></li>    
    <li>卖点各项总字数不少于50字<small>房源卖点不少于30字，业主心态不少于10字，周边配套不少于10字。</small></li>    
</ul>
<h2>实景照片</h2>
<ul>
    <li>客厅2张+卧室2张+厨房1张+卫生间1张+户型图1张</li>
    <li>客厅和卧室请分别从不同角度拍摄2张照片，尽量把房间的空间感拍摄出来。<small>照片中能看到上下左右前5面墙</small></li>        
</ul>
<dl>
    <dt>客厅</dt>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
</dl>
<dl>
    <dt>卧室</dt>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
</dl>
<dl>
    <dt>厨房</dt>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
</dl>
<p>卫生间因为空间小，所以拍照时要把相机拿高，进行俯拍。</p>
<dl>
    <dt>卫生间</dt>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
</dl>
<dl>
    <dt>户型图</dt>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
    <dd><img src="https://placeholdit.imgix.net/~text?txtsize=24&txt=350%C3%97150&w=168&h=128" class="img-responsive"></dd>
</dl>
<h2>卖点</h2>
<ul>
    <li>房源卖点不小于30字，业主心态不小于10字，周边配套不小于10字。</li>
    <li>房源卖点（不少于30字）<small>小区环境优美，采光无遮房型方正。房子一梯两户，一房朝南，一房朝北，厅南北通，厨房卫生间全明户型！</small></li>    
    <li>业主心态（不少于10字）<small>房东是上海人，之前一直是自己住，装修都很不错，现在因为资金出现缺口，所以低于行情价出售。</small></li>    
    <li>周边配套（不少于10字）<small>周边配套成熟，生活设施齐全，交通便利！小区出门就是餐饮，购物广场，学校，医院。</small></li>    
</ul>
<?php require_once("../components/footer.php") ; ?>