<!DOCTYPE html>
<html lang="zh-cn">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <title><?php echo $confs["page_title"] ; ?> - 有房有客</title>
        <meta name="keywords" content="<?php echo $confs["keywords"] ; ?>">
        <meta name="description" content="<?php echo $confs["description"] ; ?>"> 
        <!-- 引入stylesheet资源 -->               
        <link rel="stylesheet" href="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/css/app.min.css">
        <!--如果需要额外的样式表文件-->
        <?php if( sizeof($confs["extra_stylesheets"]) > 0 ) {
            for($m = 0 ; $m < sizeof($confs["extra_stylesheets"]) ; $m ++ ) {
        ?>
        <link rel="stylesheet" href="<?php echo $confs["extra_stylesheets"][$m] ; ?>">
        <?php } } ?>
        <!--如果需要匹配路由的样式表-->
        <?php
            if($confs["match_stylesheet"]) {
        ?>
        <link rel="stylesheet" href="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/css/<?php echo $router["controller"] ; ?>/<?php echo $router["method"] ; ?>.min.css">
        <?php } ?>
    </head>
    <body>