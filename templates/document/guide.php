<?php require_once("../global.php") ; ?>
<?php
$confs = array(
    "page_title" => "抢房源攻略" , //每个页面标题会在这个字符串后面自动追加 " - 有房有客M站"
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
<!--<h1>抢房源攻略</h1>-->
<h2>什么是抢房源</h2>
<p>定义：抢房源是指经纪人通过相应的购买规则，抢平台中的房源，将房源抢为独家专属房源；</p>
<p>方式：通过点击房源列表页各套房源的“抢”标签获得，抢得的房源将展示在“我的房源”模块列表中。</p>
<h2>抢房源的好处</h2>
<ol class="son">
    <li>抢到的房源将成为经纪人的独家专属房源，其他经纪人如需经营该房源需与房源发布人合作，达成合作共识后方可进行后续操作；</li>
    <li>抢到的房源完成发布后，该经纪人在该房源的C端详情页优先展示，并获得悟空币奖励；</li>
    <li>将房源完善成精选，离好经纪人更近一步。</li>
</ol>
<h2>抢房源的规则</h2>
<ol class="son">
    <li>非VIP用户无法享受抢房源功能，付费成为VIP用户后即可抢房源；</li>
    <li>每位经纪人的个人专属服务房源中，如已有10套非精选房源，则不得再抢房源，需将有效房源编辑成为精选房源，或将房源拉无效，方可再抢；</li>
    <li>每位经纪人的个人专属服务房源中，每月将房源拉无效次数至多10次，超出次数需支付15悟空币／次。</li>
</ol>
<h2>抢房源的攻略</h2>
<ol class="son">
    <li>首先大圣需要多关注自己的主营区域板块；</li>
    <li>一旦发现有新出的盘源，立即点击进行抢房源；</li>
    <li>抢完房源之后，大圣一定要记住赶紧与业主取得联系；</li>
    <li>在联系的过程中千万不要在电话中要询问业主电话号码；</li>
    <li>询问并约下拜访时间，做后续业主房源跟进。</li>
</ol>
<?php require_once("../components/footer.php") ; ?>