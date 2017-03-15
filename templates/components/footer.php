        <!--页面脚本区域-->
        <script src="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME ; ?>/config.js"></script>
        <script src="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/js/app.min.js"></script>
        <?php
            for( $n = 0 ; $n < sizeof($confs["extra_javascripts"]) ; $n ++ ) {
        ?>
        <script src="<?php echo $confs["extra_javascripts"][$n] ; ?>"></script>
        <?php } ?>
        <?php if($confs["match_javascript"]) { ?><script data-main="<?php echo STATIC_DOMAIN . '/' . MODULE_NAME; ?>/js/<?php echo $router["controller"] ; ?>/<?php echo $router["method"] ; ?>.min.js" src="<?php echo STATIC_DOMAIN ; ?>/fe_public_library/wkzf/js/require.min.js"></script>  <?php } ?>      
    </body>
</html>