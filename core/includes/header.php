<?php
	require_once($_SERVER['DOCUMENT_ROOT'].'/core/includes/functions.php');
	$dirPath = getcwd();
	$curDir = explode('/', $dirPath);
	(end($curDir) == '-current') ? $dirName = '-current' : $dirName = getFileName($issueName);
?>
<!DOCTYPE html>  

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ --> 
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	
	<title>Lumina Foundation: Focus | <?php echo $issueName ?></title>
	<meta name="description" content="Lumina Foundation Focus features human-interest stories that highlight higher education issues in a reader-friendly, magazine-style format.">
	<meta name="author" content="Lumina Foundation for Education"> 
	<link type="text/plain" rel="author" href="humans.txt" />
	
	<link href="/feed/feed.xml" type="application/atom+xml" rel="feed" title="Lumina Foundation Focus"/>
	
	<!-- CSS : implied media="all" -->
	<!--[if !lte IE 6]><!--> <link rel="stylesheet" href="<?php autoVer('/core/css/style.css'); ?>"> <!--<![endif]-->
	
	<!-- Styles for those archaic browsers -->
	<!--[if lte IE 6]> <link rel="stylesheet" href="<?php autoVer('/core/css/ie6.css'); ?>" media="screen, projection"> <![endif]-->
	
	<link rel="stylesheet" media="screen" href="<?php autoVer('/archives/'.$dirName.'/issue/css/'.getFileName($issueName).'.css'); ?>">
	
	<!-- All JavaScript at the bottom, except for Modernizr (includes Yepnope) -->
	<script src="/core/js/libs/modernizr.custom.js"></script>
		
</head>

<body>

	<div class="nav" id="siteNav" role="navigation">
		<hr />
		<a href="http://www.luminafoundation.org" class="ir" id="home">Home</a>
		<div class="sans">
			<a href="http://www.luminafoundation.org/publications.html">Publications</a>
			<a href="http://www.luminafoundation.org/publications/order_printed_copies/focus.html">Order</a>
			<a href="http://www.luminafoundation.org/about_us/contact_us.html" class="last">Contact Us</a>
		</div>
		<form action="http://www.luminafoundation.org/" method="get" name="search" role="search">
			<input class="sans" value="Search" name="s" size="13" />
			<button class="ir" type="submit">Search</button>
		</form>
	</div>
	
	<a href="#" id="tttop" class="hidden sans">&uarr; To the top</a>
	
	<div id="container">
	
		<div id="toolbar" role="toolbar">
			<div>
				<div class="textadjust"><a href="#" class="smaller">A </a><a href="#" class="bigger">A </a> <a href="#" class="sans reset">reset font size</a></div>
				<a href="#" class="sans" id="low-light">Low light</a>
				<a href="#" class="sans" id="bright-light">Bright light</a>
				<a id="bookmark-icon" class="ir tooltip" href="#" title="double-click to clear bookmark">Bookmark</a>
			</div>
		</div>
		
		<div id="bookmark" class="not-set fixed">
			<div class="tooltip" title="click and drag to bookmark a spot"></div>
			<hr />
		</div>
		
		<noscript><p class="sans noscript">It looks like your browser has <em>JavaScript</em> disabled. <a href="http://www.enable-javascript.com" target="_blank">Enable it to experience Focus publication at its best!</a></p></noscript>
		
		<div id="index" class="nav corner-flip sans" role="navigation">
			<a href="#" id="index-close" class="ir">Close</a>
			<div class="condensed visuallyhidden">
				<p><a href="#" class="extras active">Extras</a> | <a href="#" class="inside">Inside</a></p>
				<div class="hr"></div> <!--Firefox puts a 1px bottom border over the 1px tall body of an <hr />-->
			</div>