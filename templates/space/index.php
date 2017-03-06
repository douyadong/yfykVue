<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "个人店铺首页" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
    "keywords" => "" ,
    "description" => "" ,
    "match_stylesheet" => true , //是否需要匹配路由的样式表        
    "match_javascript" => true  //是否需要匹配路由的脚本        
) ;
?>
<?php require_once("../components/head.php") ; ?>            
<?php require_once("./index/summary-section.php") ; ?>
<?php require_once("./index/rate-section.php") ; ?>
<?php require_once("./index/house-section.php") ; ?>
<?php require_once("./index/drift-tools.php") ; ?>
<div id="nomatch-section">没有合适的房源？告诉我您的需求立即匹配房源 ></div>
<?php require_once("../components/footer.php") ; ?>