<!DOCTYPE html>
<html xmlns="//www.w3.org/1999/xhtml" xmlns:fb="//www.facebook.com/2008/fbml">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">

<link href="style.css" rel="stylesheet" type="text/css" />

<meta property="fb:app_id" content="120125298051178" /> 
<meta property="og:title" content="Friends &amp; Profile Statistics - profile stats app" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://www.facebook.com/apps/application.php?id=120125298051178" />
<meta property="og:image" content="https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/575655_293366660738378_293363467405364_706456_973013895_n.jpg" />
<meta property="og:site_name" content="Friends &amp; Profile Statistics - profile stats app" />
<meta property="fb:app_id" content="120125298051178" />


<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script><!-- jQuery !-->

<meta name="description" content="Facebook Friends & Profile Statistics analyses your Facebook profile and gives info on your friends' age and gender and their home location on Google Maps.">

<script type="text/javascript">//GA

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23582895-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>

<body>
<div id="fb-root"></div>
<script src="//connect.facebook.net/en_US/all.js"></script>
<script>
	$(document).ready(function(){
		FB.Canvas.setSize();
	});
</script>
<script>
	FB.init
	({
		appId  : '120125298051178',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true  // parse XFBML
	});
</script>


<script src="//connect.facebook.net/en_US/all.js"></script>

<div id="div_app">
	<br><br>
	<div id="div_header" class="appdivs">
		<img src="logosm.gif" id="logo">
		<h1>Facebook Friends & Profile Statistics</h1>
		<div id="div_slogan">Stats about your Facebook friends</div>
	</div>
	<div id="div_welcome" class="appdivs">
		<br><br><br><br><br>
		<div id="div_praise">
			Over 50,000 installs<br><br>
			<img src="rating45.png" style="vertical-align:middle;"><span style="vertical-align:middle"> - rated 4.5 out of 5</span>
			<br><br><br><br>
		</div>
		<div id="getyourstats"><a href="https://www.facebook.com/dialog/permissions.request?app_id=120125298051178&display=page&next=https://apps.facebook.com/statistics&response_type=token&fbconnect=1&perms=friends_birthday,friends_location,read_stream,user_photo_video_tags,friends_photo_video_tags,user_photos,friends_photos,friends_likes,friends_relationships,user_status" target="_top">Get your stats!</a></div>
		<br><br>
		<div id="div_descript">
		Facebook Friends & Profile Statistics shows you stats such as:<br>
		- Charts showing the age of your friends and the male/female ratio<br>
		- The friends that have posted most on your Facebook wall<br>
		- Your most popular photos<br>
		- The friends who joined Facebook first and last<br>
		- The location of your friends on the world map<br>
		- The things your friends like most, such as music, movies, TV shows and books<br>
		</div>
		
	</div>
	
	<div id="div_likebutton" class="appdivs"><div class="fb-like" data-href="https://apps.facebook.com/statistics" data-send="true" data-width="550" data-show-faces="true"></div></div>
	
	<div id="div_disclaimer" class="appdivs">
		Built by Joris van Mens<br>
		<a href="./privacy.html">Privacy policy</a>
	</div>
	
	<div id="div_floatlikebutton" style="position:fixed; top:30px; right:10px;"><div class="fb-like" data-href="https://apps.facebook.com/statistics" data-send="true" data-layout="box_count" data-width="100" data-show-faces="true"></div></div>
	
</div>


<br>


<script>
FB.getLoginStatus(function(response) { 

			FB.api({ method: 'users.hasAppPermission', ext_perm: 'user_status' }, function(resp) {
				if (resp === "1") {
					//alert('Permission granted');
					window.location = "stats.html";
				} else {
					//alert("Permission not granted");
				}
			});
 });
</script>


<!--<div class="fb-like" data-href="http://www.facebook.com/apps/application.php?id=120125298051178" data-send="false" data-width="550" data-show-faces="true"></div>-->

</body></html>