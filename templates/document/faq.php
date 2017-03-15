<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "常见问题" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
    "keywords" => "" ,
    "description" => "" ,
    "match_stylesheet" => false , //是否需要匹配路由的样式表        
    "extra_stylesheets" => array(
        STATIC_DOMAIN . "/" . MODULE_NAME."/css/document/common.min.css"
    ) ,
    "match_javascript" => false  //是否需要匹配路由的脚本        
) ;
?>
<?php require_once("../components/head.php") ; ?>            
<!--<h1>常见问题</h1>-->
<ul>
    <li>
        <h2>1、悟空币如何获取？</h2>
        <ol class="son" type="A">
            <li>活跃：每日登入奖励5悟空币</li>
            <li>发布房源：每成功发布一套房源奖励30悟空币</li>
            <li>精选：成功成为精选房源，每套奖励30悟空币</li>
            <li>委托：成功发布一套委托房源奖励30悟空币</li>
            <li>发布客源：每发布一个有效客源奖励30悟空币</li>
            <li>新房带看：完成一次新房带看奖励100悟空币</li>
            <li>二手房带看：完成一次二手房带看奖励30悟空币</li>            
        </ol>
    </li>
    <li>
        <h2>2、悟空币如何消耗？</h2>
        <ol class="son" type="A">
            <li>平台浏览：首次浏览平台房源每套扣除5悟空币</li>
            <li>平台认领：认领平台房源每套扣除15悟空币</li>
            <li>认领笋客：每个微聊笋客扣除50悟空币；每个电话笋客扣除100悟空币</li>
            <li>获得新微聊/悬赏：获得一个新微聊或悬赏客户扣除50悟空币</li>
            <li>点击无效房源：每月10次免费无效房源后，每次扣除15悟空币（当非精选房源大于五套后，需通过释放无效房源后才可继续认领）</li>
        </ol>
    </li>    
</ul>
<?php require_once("../components/footer.php") ; ?>