<?php
	// Auto-version files passed Ex: style.123456.css
	function autoVer($url) {
	    $path = pathinfo($url);
	    $ver = '.'.filemtime($_SERVER['DOCUMENT_ROOT'].$url).'.';
	    echo $path['dirname'].'/'.str_replace('.', $ver, $path['basename']);
	}
	
	// Get the name of the unique JS and CSS files for each isse, give the issue's title
	function getFileName($var) {
		$lowercase = strtolower($var);
		$fileName = str_replace(' ', '', $lowercase);
		return $fileName;
	} 
	
	// Get the current URL for injecting into social sharing widgets
	function getPageURL() {
		$pageURL = 'http';
		if ($_SERVER["HTTPS"] == "on") { $pageURL .= "s"; }
		$pageURL .= "://";
		if ($_SERVER["SERVER_PORT"] != "80") {
			$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
		} else {
			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		}
		return rawurlencode($pageURL);
	}
?>