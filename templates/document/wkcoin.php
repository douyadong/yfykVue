<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "悟空币说明" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
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
<!--<h1>悟空币说明</h1>-->
<p>悟空币是流通于有房有客APP中的一种货币，可用于该APP软件中的所有消耗点，它的价值等同于RMB，可在充值渠道通过RMB对自己的账号进行充值，兑换比例为1:1，即1元RMB=1个悟空币。</p>
<?php require_once("../components/footer.php") ; ?>