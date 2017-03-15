<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "邀请码说明" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
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
<!--<h1>邀请码说明</h1>-->
<p>通过邀请码可以在经纪人成为VIP时，获得一定优惠。</p>
<p>个人付费经纪人（个人VIP）会获得4个邀请码， 被邀请的经纪人将获得支付优惠；每邀请1个付费经纪人（需发布一套房源）平台给予500元返现，最高可获得2000元。</p>
<p>团队付费经纪人（团队VIP）会获得20个免费邀请码，邀请来的经纪人免费拥有个人VIP权限，如果团队负责人退出平台，邀请的用户也将关闭所有权限。</p>
<?php require_once("../components/footer.php") ; ?>