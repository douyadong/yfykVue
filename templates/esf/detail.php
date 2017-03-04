<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "二手房详情" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
    "keywords" => "" ,
    "description" => "" ,
    "match_stylesheet" => true , //是否需要匹配路由的样式表        
    "match_javascript" => true  //是否需要匹配路由的脚本        
) ;
?>
<?php require_once("../components/head.php") ; ?>            
<?php require_once("../components/album.php") ; ?>
<?php require_once("./detail/summary-section.php") ; ?>
<?php require_once("./detail/basic-section.php") ; ?>
<?php require_once("./detail/estate-section.php") ; ?>
<?php require_once("../components/comment.php") ; ?>
<?php require_once("./detail/location-section.php") ; ?>
<?php require_once("./detail/similar-section.php") ; ?>
<?php require_once("./detail/drift-tools.php") ; ?>
<?php require_once("../components/footer.php") ; ?>