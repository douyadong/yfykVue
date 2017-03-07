<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "卖点范文" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
    "keywords" => "" ,
    "description" => "" ,
    "match_stylesheet" => false , //是否需要匹配路由的样式表     
    "match_javascript" => false  //是否需要匹配路由的脚本       
) ;
?>
<?php require_once("../components/head.php") ; ?>            
<!--<h1>卖点范文</h1>-->
<div style="background-color : #fff ;">
    <img src="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/images/modelEssay1.png" class="img-responsive">
    <img src="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/images/modelEssay2.png" class="img-responsive">
</div>
<?php require_once("../components/footer.php") ; ?>