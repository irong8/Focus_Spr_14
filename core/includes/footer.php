<div id="footer">
			<a href="http://luminafoundation.org"><img src="/core/images/logo-footer.png" alt="Lumina Foundation for Education" /></a>
			<address>Lumina Foundation <br />P.O. Box 1806, Indianapolis, IN 46206-1806<br /><a href="http://luminafoundation.org/">www.luminafoundation.org</a></address>
			<p class="copyright">&copy; Lumina Foundation for Education, Inc.<br />All rights reserved.</p>
			<p class="issn">~ <?php echo $footerDate ?> ~</p>
			<div id="details">
				<ul>
          <li>Writing: <span><?php echo $author ?></span></li>
					<li>Editing: <span>David S. Powell</span></li>
					<li>Editorial assistance: <span><?php echo $assistants ?></span></li>
					<li>Photography: <span><a href="http://www.shawnspence.com/" target="_blank">Shawn Spence Photography</a></span></li>
					<li>Design &amp; development: <span><a href="http://irongatecreative.com/" target="_blank">IronGate Creative</a></span></li>
					<?php if (isset($video)) : ?>
					<li>Video development: <span><a href="http://www.catalytica.biz/">Catalytica</a></span></li>
					<?php endif; ?>
					<li class="last">Multimedia production: <span>Matthew Jenkins</span></li>
				</ul>
			</div>
		</div>
	
	</div> <!--! end of #container -->


	<!-- Javascript at the bottom for fast page loading -->
	

	
  	<script>
  	    var _gaq=[['_setAccount','UA-543717-2'],['_setDomainName', 'luminafoundation.org'],['_addIgnoredRef', 'luminafoundation.org'],['_trackPageview'],['_trackPageLoadTime']];
  	    
  	    yepnope.errorTimeout = 300000;
  	    yepnope({
  	    	load: {
  	    		'audiojs': '/core/js/libs/audiojs/audio.min.js',
  	    		'typekit':	'http://use.typekit.com/hxf2snc.js',
  	    		'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js',
  	    		'plugins': '<?php autoVer("/core/js/plugins.js"); ?>',
  	    		'core': '<?php autoVer("/core/js/focus.js"); ?>',
  	    		'ga': 'http://www.google-analytics.com/ga.js'<?php if(is_dir($_SERVER['DOCUMENT_ROOT'].'/archives/'.$dirName.'/issue/js/')) : ?>,
  	    		'issueScript': '<?php autoVer('/archives/'.$dirName.'/issue/js/'.getFileName($issueName).'.js'); ?>'<?php endif; ?>
  	    	},
  	    	callback: {
  	    		'typekit': function() {
  	    			try{Typekit.load();}catch(e){}
  	    		},
  	    		'jquery': function() {
  	    			if (!window.jQuery) {
  	    			  yepnope('/core/js/libs/jquery-1.6.min.js');
  	    			}
  	    		},
  	    		'plugins': function() {
  	    			
  	    		},
  	    		'core': function() {
  	    			$(document).ready(function() {
  	    				init();
  	    				setToolTips();
  	    				audiojs.createAll();
  	    			});
  	    			$(window).load(findBookmark());
  	    		}<?php if(is_dir($_SERVER['DOCUMENT_ROOT'].'/archives/'.$dirName.'/issue/js/')) : ?>,
  	    		'issueScript': function() {
  	    			$(document).ready(function() {
  	    				setToolTips();
  	    			});
  	    		}<?php endif; ?>
  	    	}
  	    });
	</script>
	
	<!--[if lt IE 7 ]>
	<script src="/core/js/libs/dd_belatedpng.js"></script>
	<script>DD_belatedPNG.fix('.ir, .external-link, img, blockquote, #intro, #masthead');</script>
	<![endif]-->
  	
</body>
</html>
