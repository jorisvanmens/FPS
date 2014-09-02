	var div_title = document.getElementById('div_title');
	var div_loading = document.getElementById('div_loading');
	var div_app = document.getElementById('div_app');
	var div_agebars = document.getElementById('div_agebars');
	var div_genderpie = document.getElementById('div_genderpie');
	var div_relationpies = document.getElementById('div_relationpies');
	var div_wallinfo = document.getElementById('div_wallinfo');
	var div_photoinfo = document.getElementById('div_photoinfo');
	var div_joindateinfo_title1 = document.getElementById('div_joindateinfo_title1');
	var div_joindateinfo_name1 = document.getElementById('div_joindateinfo_name1');
	var div_joindateinfo_name2 = document.getElementById('div_joindateinfo_name2');
	var div_joindateinfo_name3 = document.getElementById('div_joindateinfo_name3');
	var div_joindateinfo_title2 = document.getElementById('div_joindateinfo_title2');
	var div_joindateinfo_name4 = document.getElementById('div_joindateinfo_name4');
	var div_joindateinfo_name5 = document.getElementById('div_joindateinfo_name5');
	var div_joindateinfo_name6 = document.getElementById('div_joindateinfo_name6');
	var div_friendsmap = document.getElementById('div_friendsmap');
	var div_friendsmap_title = document.getElementById('div_friendsmap_title');	
	var div_friendsmap_numload = document.getElementById('div_friendsmap_numload');
	var div_friendsmap_map = document.getElementById('div_friendsmap_map');
	var div_popularmovies = document.getElementById('div_popularmovies');
	var div_populartvshows = document.getElementById('div_populartvshows');
	var div_popularmusic = document.getElementById('div_popularmusic');
	var div_popularbooks = document.getElementById('div_popularbooks');
	var div_popularfirstnames = document.getElementById('div_popularfirstnames');
	var div_publishlink = document.getElementById('div_publishlink');	
	var div_likebutton = document.getElementById('div_likebutton');
	var div_writereview = document.getElementById('div_writereview');
	var poststrage;
	var poststrgender;
	var poststrwallpost;
	var poststrfbjoinf;
	var poststrfbjoinl;
	var poststrmovie;
	var poststrmusic;
	var poststrbook;
	var poststrtv;
	var poststrname;
	
	var myLatlng;
	var map;
	var geocoder;

	var FLO = new Array();
	var topnamestr = new Array(5);for (counter=0;counter<10000;counter=counter+1){topnamestr[counter] = "";}
	var totalforavg = 0;
	var birthyearspec = 0;
	var maleperc = 0;
	var femaleperc = 0;
	var firstjoinyear = 2005;
	
	var numloaded = 0;
	var locnum = 0;

	var MeObj; //my info
	var FrObj; //friends info array (from REST)
	var FrLikesObj; //friends likes (from FQL)
	var PhotoObj;
	var MyWallObj;
	var WallObj;

	function getmyinfo()
	{
		FB.api('/me?fields=id,name', function(response)
		{
			MeObj = response;
		});	
	}
	
	function anl_showjoindateinfo()
	{
		div_joindateinfo_title1.innerHTML="<br><br><b>Friends who joined Facebook first and last</b><br>";
		div_joindateinfo_title1.innerHTML+="";
		div_joindateinfo_title1.innerHTML+="<br>First Facebook joiners:<br>";
		div_joindateinfo_name1.innerHTML="1. " + FrObj[0].name;
		div_joindateinfo_name2.innerHTML="2. " + FrObj[1].name;
		div_joindateinfo_name3.innerHTML="3. " + FrObj[2].name;
		div_joindateinfo_title2.innerHTML+="<br>Latest Facebook joiners:<br>";
		div_joindateinfo_name4.innerHTML="1. " + FrObj[FrObj.length-1].name;
		div_joindateinfo_name5.innerHTML="2. " + FrObj[FrObj.length-2].name;
		div_joindateinfo_name6.innerHTML="3. " + FrObj[FrObj.length-3].name;
		
		/* This part used to get the join date, but it seems way off..
		FB.api('/' + FrObj[0].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name1.innerHTML="1. " + FrObj[0].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name1.innerHTML+="unknown)";
			}
			else
			{
				div_joindateinfo_name1.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name1.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name1.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
				firstjoinyear = WallObj.data[WallObj.data.length-1].created_time.substr(0,4);
			}
			
			poststrfbjoinf = "\n* First Facebook joiner: " + FrObj[0].name;
			
		});
		
		FB.api('/' + FrObj[1].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name2.innerHTML="2. " + FrObj[1].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name2.innerHTML+="unknown)";
			}
			else
			{
				div_joindateinfo_name2.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name2.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name2.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
			}
		});
		
		FB.api('/' + FrObj[2].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name3.innerHTML="3. " + FrObj[2].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name3.innerHTML+="unknown)";
			}
			else
			{
				div_joindateinfo_name3.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name3.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name3.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
			}
		});
		
		
		div_joindateinfo_title2.innerHTML+="<br>Latest Facebook joiners:<br>";

		FB.api('/' + FrObj[FrObj.length-1].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name4.innerHTML="1. " + FrObj[FrObj.length-1].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name4.innerHTML+="unknown)";
			}
			else
			{			
				div_joindateinfo_name4.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name4.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name4.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
			}

			poststrfbjoinl = "\n* Latest Facebook joiner: " + FrObj[FrObj.length-1].name;
		
		});
		
		FB.api('/' + FrObj[FrObj.length-2].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name5.innerHTML="2. " + FrObj[FrObj.length-2].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name5.innerHTML+="unknown)";
			}
			else
			{
				div_joindateinfo_name5.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name5.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name5.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
			}
		});
		
		FB.api('/' + FrObj[FrObj.length-3].id + '/feed?limit=1000000', function(response) 
		{
			WallObj = response;
			div_joindateinfo_name6.innerHTML="3. " + FrObj[FrObj.length-3].name + " (";
			if(WallObj.data.length==0)
			{
				div_joindateinfo_name6.innerHTML+="unknown)";
			}
			else
			{
				div_joindateinfo_name6.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(8,2) + "/";
				div_joindateinfo_name6.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(5,2) + "/";
				div_joindateinfo_name6.innerHTML+=WallObj.data[WallObj.data.length-1].created_time.substr(0,4) + ")";
				//div_joindateinfo_name6.innerHTML+="<br><br><a href='javascript:onClick=post_joindateinfo()'>Post</a> this to your wall!";
			}
		
		});
		*/
		
	}
	
	function anl_showwallinfo()
	{
		var numfromname = new Array(FrObj.length);for (counter=0;counter<FrObj.length;counter=counter+1){numfromname[counter] = 0;}
		var highestpostnum = 0;
		var chck = 0;
		div_wallinfo.innerHTML+="<br><br><br><b>Your friends by posts on your wall</b><br>(loading...)<br><br><br><br><br><br><br>";
		div_wallinfo.innerHTML+="<div height='1600'></div>";

		FB.api('/me/feed?limit=1000000', function(response) 
		{	
			MyWallObj = response;
			//div_wallinfo.innerHTML+="<br>There are " + MyWallObj.data.length + " posts on your wall.";
			for (counter=0;counter<MyWallObj.data.length;counter=counter+1)
			{
				for (counterdos=0;counterdos<FrObj.length;counterdos=counterdos+1)
				{
					if (FrObj[counterdos].name == MyWallObj.data[counter].from.name) 
					{ 
						numfromname[counterdos] = numfromname[counterdos] + 1;
						break; //zou het sneller moeten maken
					}
				}
				
				//div_wallinfo.innerHTML+= "<br>" + MyWallObj.data[counter].from.name;
				//div_wallinfo.innerHTML+= numfromname[counterdos]; //debug dingen
			}
		
			// nu weten we het aantal wallposts pp
			
			//div_wallinfo.innerHTML+="<br>Most posts are from:";
			div_wallinfo.innerHTML="<br><br><br><b>Friends that posted most on your wall </b>";			
			for (abc=0;abc<5;abc=abc+1)
			{
				for (counter=0;counter<FrObj.length;counter=counter+1)
				{
					if (numfromname[counter] > highestpostnum)
					{
						for(bcd=0;bcd<abc;bcd=bcd+1) //checken dat we deze naam niet al hadden
						{
							if(!(FrObj[counter].name == topnamestr[bcd]))
							{
								chck = chck + 1;
							}
						}
						
						if(chck == abc)
						{	
							topnamestr[abc] = FrObj[counter].name;
							highestpostnum = numfromname[counter];
							//div_wallinfo.innerHTML+= "<br>" + topnamestr[abc] + " " + FrObj[counter].name + "SDFSD";
						}
						
						chck=0;
						
					}
				}
				
				if(abc==0){if(highestpostnum==0)
				{
					div_wallinfo.innerHTML="<br><br><br><b>Friends that posted most on your wall</b><br>Oops.. I think there's not enough posts on your wall to make a ranking!<br><br><br><br><br>";
				}}
				
				if(highestpostnum>0)
				{
					div_wallinfo.innerHTML+= "<br>" + (abc+1) + ". " + topnamestr[abc] + " with " + highestpostnum + " posts     ";canpost=1;
				}
				highestpostnum = 0;
			}
	

			poststrwallpost = "\n* Top poster on my wall: " + topnamestr[0];
	
			
		});
	
	}
	
	function anl_drawgenderpie()
	{
		div_genderpie.innerHTML+="<br><br><b>The gender of your friends</b>";
		var malenum = 0;
		var femalenum = 0;
		//var maleperc = 0;
		//var femaleperc = 0;
	
		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if (FrObj[counter].gender == "male") 
			{ 
				malenum = malenum + 1;
			}
			else if (FrObj[counter].gender == "female") 
			{ 
				femalenum = femalenum + 1; 
			}
		}

		div_genderpie.innerHTML+="<br>Of all your Facebook friends " + (malenum + femalenum) + " specified their gender.";
			
		maleperc = (malenum / (malenum + femalenum)).toFixed(2); //calc percentages
		femaleperc = (femalenum / (malenum + femalenum)).toFixed(2);
		
		//make graph
		div_genderpie.innerHTML+=
			"<br><br><img src=\"https://chart.googleapis.com/chart?cht=p&chd=t:" 
			+ maleperc + "," + femaleperc 
			+ "&chs=340x200&chl="
			+ parseInt(100*maleperc) + "% " + "male|"
			+ parseInt(100*femaleperc) + "% " + "female\">";

		//div_genderpie.innerHTML+="<br><br><a href='javascript:onClick=post_ag()'>Publish</a> the age and gender statistics to your wall!";

		poststrgender = "\n* Gender ratio of my friends: " + parseInt(femaleperc*100) + "% female, " + parseInt(maleperc*100) + "% male";
		
	}

	function anl_drawrelationpies()
	{
		div_relationpies.innerHTML+="<br><br><b>The relationship status of your friends</b>";
		var RelationDefined = 0; //number of people who defined their relationship
		var RelationTypes = {}; //dictionary object with relationship types

		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if (FrObj[counter].relationship_status != undefined)
			{
				RelationDefined++;
				if(RelationTypes[FrObj[counter].relationship_status] == undefined)
				{
					RelationTypes[FrObj[counter].relationship_status] = 1;
				}
				else
				{
					RelationTypes[FrObj[counter].relationship_status]++;
				}
				//div_relationpies.innerHTML+= FrObj[counter].name + ": " + FrObj[counter].relationship_status + "<br>";
			}			
		}

		div_relationpies.innerHTML+="<br>Of all your Facebook friends " + RelationDefined + " specified their relationship status.";
		
		var key;
		/*for (key in RelationTypes)
		{
			div_relationpies.innerHTML+= key + ": ";
			div_relationpies.innerHTML+= parseInt(100*(RelationTypes[key] / RelationDefined).toFixed(3)); //percentage with 1 decimal
			div_relationpies.innerHTML+= "%<br>";
		}*/
		
		//make graph
		div_relationpies.innerHTML+= "<br><br>";
		var RelationPieImg = "<img src=\"https://chart.googleapis.com/chart?chco=4CC417&cht=p&chd=t:";
		for (key in RelationTypes) //pie parts
		{
			RelationPieImg+= (RelationTypes[key] / RelationDefined).toFixed(3);
			RelationPieImg+= ",";
		}	
		
		RelationPieImg = RelationPieImg.slice(0,-1); //remove last comma
		RelationPieImg+= "&chs=500x200&chl="
		
		for (key in RelationTypes) //labels
		{
			RelationPieImg+= parseInt(100*(RelationTypes[key] / RelationDefined).toFixed(3));
			RelationPieImg+= "% " + key + "|";
		}	

		RelationPieImg = RelationPieImg.slice(0,-1); //remove last |

		RelationPieImg+="\">";
		//alert(RelationPieImg);
		div_relationpies.innerHTML+= RelationPieImg;
		//poststrgender = "\n* Gender ratio of my friends: " + parseInt(femaleperc*100) + "% female, " + parseInt(maleperc*100) + "% male";*/
		
	}
	
	function anl_drawagebars()
	{
	
		//var birthyearspec = 0;
		var numofage = new Array(200);for (counter=0;counter<200;counter=counter+1){numofage[counter] = 0;}
		var FrAge = new Array(FrObj.length);for (counter=0;counter<FrObj.length;counter=counter+1){FrAge[counter] = 0;}
		var today = new Date();
		var highestnum = 0;
		//var totalforavg = 0;
		var agebarstr = "";
		
		div_agebars.innerHTML+="<br><br><b>The age of your friends</b>";
		
		//first, extract age data
		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if(FrObj[counter].birthday != undefined){  if (FrObj[counter].birthday.length == 10) 
			{ 
				//div_agebars.innerHTML+=FrAge[counter] + "!" + FrObj.length;
				//we can get age
				birthyearspec = birthyearspec + 1;
				
				//calc correct age
				FrAge[counter] = ( today.getFullYear() - parseInt(FrObj[counter].birthday.substr(6,4)) ); 
				if ((today.getMonth() + 1) < parseInt(FrObj[counter].birthday.substr(0,2)))
				{
					FrAge[counter] = FrAge[counter] - 1; //div_agebars.innerHTML+="---";
					//div_agebars.innerHTML+="$$$" + FrAge[counter];
				}
				else if ((today.getMonth() + 1) == parseInt(FrObj[counter].birthday.substr(0,2)))
				{
					if ((today.getDate() < parseInt(FrObj[counter].birthday.substr(3,2))))
					{
						FrAge[counter] = FrAge[counter] - 1;
					}
				}
				
				numofage[FrAge[counter]] = numofage[FrAge[counter]] + 1;
				if (numofage[FrAge[counter]] > highestnum) { highestnum = numofage[FrAge[counter]];}
				//div_agebars.innerHTML+=FrObj[counter].name + FrAge[counter] + "<br>";
			}}
		}
			
		//we now have the frequency of ages in numofage[0-199]
		//also, the specific age per person in FrAge[0-FrObj.length - 1]
		div_agebars.innerHTML+="<br>Of all your Facebook friends " + birthyearspec + " specified their full date of birth.";
		
		// average
		for (counter=0;counter<100;counter=counter+1){totalforavg = totalforavg + numofage[counter] * counter}
		div_agebars.innerHTML+="<br>The average age of your friends is " + (totalforavg / birthyearspec).toFixed(1) + ".";
					
		//first 10-40 bar
		agebarstr = "https://chart.googleapis.com/chart?chxt=x,x,y&chxl=1:||Age (10-40)|&cht=bvs&chco=76A4FB&chs=550x200&chbh=12,1&chd=t:";
		agebarstr+= (100 * numofage[10] / highestnum).toFixed(2);
		for (counter=11;counter<=40;counter=counter+1){	agebarstr += "," + (100 * numofage[counter] / highestnum).toFixed(2);};
		agebarstr+="&chxr=0,10,40|2,0," + highestnum;
		div_agebars.innerHTML+="<br><br><img src=\"" + agebarstr + "\">";
			
		//now 0-100
		agebarstr = "https://chart.googleapis.com/chart?chxt=x,x,y&chxl=1:|||||Age (0-100)|&cht=bvs&chco=76A4FB&chs=550x200&chbh=5,0&chd=t:";
		agebarstr+= (100 * numofage[0] / highestnum).toFixed(2);
		for (counter=1;counter<=100;counter=counter+1){	agebarstr += "," + (100 * numofage[counter] / highestnum).toFixed(2);};
		agebarstr+="&chxr=0,0,100,5|2,0," + highestnum;
		div_agebars.innerHTML+="<br><br><img src=\"" + agebarstr + "\">";
	
		poststrage = "\n* Average age of my friends: " + (totalforavg / birthyearspec).toFixed(1);
	}
	
	function anl_drawfriendsmap()
	{
	
		div_friendsmap_title.innerHTML+="<br><br><b>Your friends' location on the world map</b>";
		//div_friendsmap_title.innerHTML+="(can only show a few friends due to fair use limitations of the Google Maps API)<br><br>";
		//div_friendsmap_title.innerHTML+="<br>(Click here for a fullscreen map)<br><br>";
		
				//div_friendsmap_map.style.display="inline"; //show map

		
		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if(FrObj[counter].location != undefined)
			{	
				if(FrObj[counter].location.name != undefined)
				{
					FLO[locnum] = FrObj[counter];
					//div_friendsmap_title.innerHTML+="<br>" + locnum + FLO[locnum].name + " in " + FLO[locnum].location.name;
					locnum++;	
				}
			}
		}
	
		div_friendsmap_title.innerHTML+="<br>Of all your Facebook friends " + locnum + " specified their location.";
		div_friendsmap_numload.innerHTML= "(loaded 0 of " + locnum + ")<br><br>"
		div_friendsmap_title.innerHTML+="<br>Loading is a bit slow due to Google Maps API fair use policy. To see the name at a marker, hover your mouse over it. ";
		div_friendsmap_title.innerHTML+="To see all people living in one city, zoom in on the relevant marker to a high zoom level.";


		var gcmarker; // = new google.maps.Marker();
		var gcdone = 0;
			
		myLatlng = new google.maps.LatLng(40,-35);
		myOptions = 
		{
			zoom: 2,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(div_friendsmap_map, myOptions);		
		geocoder = new google.maps.Geocoder();


		do1000markers();

		
		//div_friendsmap_map.style.visibility="visible";
	
		/*for (counter = 0;counter<locnum;counter++)
		{
			gcandmark(FLO[counter]);
			//div_friendsmap_title.innerHTML+="<br>" + FLO[counter].name + " in " + FLO[counter].location.name;
		}*/

		//if(FrObj[0] != undefined){if(FrObj[0].location != undefined){if(FrObj[0].location.name != undefined){gcandmark(FrObj[0]);}}}
	
		/*setTimeout("for (counter=445;counter<455;counter=counter+1){if(FrObj[counter] != undefined){if(FrObj[counter].location != undefined){if(FrObj[counter].location.name != undefined){gcandmark(FrObj[counter]);}}}}", 5000);
		*/
		
	}
	
	
	function post_ag()
	{
		
		var descriptionstr = "Of my Facebook friends " + parseInt(femaleperc*100) + "% is female and " + parseInt(maleperc*100) + "% is male. Their average age is " + (totalforavg / birthyearspec).toFixed(1) + ". Check out your own stats!";

		FB.ui(
		   {
			 method: 'feed',
			 name: 'Facebook Friends & Profile Statistics',
			 link: 'https://apps.facebook.com/statistics',
			 description: descriptionstr,
			 message: ''
		   },
		   function(response) {
			 if (response && response.post_id) {
			   alert('Post was published on your wall. Thanks!');
			 } else {
			   alert('Post was not published. Try again!');
			 }
		   }
		 );
	}

	function post_wallinfo()
	{
		var descriptionstr = topnamestr[0] + " posted most on my wall, followed by " + topnamestr[1] + "! Check out your own stats!";
		
		FB.ui(
		   {
			 method: 'feed',
			 name: 'Facebook Friends & Profile Statistics',
			 link: 'https://apps.facebook.com/statistics',
			 description: descriptionstr,
			 message: ''
		   },
		   function(response) {
			 if (response && response.post_id) {
			   alert('Post was published.');
			 } else {
			   alert('Post was not published.');
			 }
		   }
		 );
	}

	function post_joindateinfo()
	{
		var descriptionstr = "Of all my Facebook friends, " + FrObj[0].name + " joined Facebook first, already in " + firstjoinyear + "! Check out your own stats!";

		FB.ui(
		   {
			 method: 'feed',
			 name: 'Facebook Friends & Profile Statistics',
			 link: 'https://apps.facebook.com/statistics',
			 description: descriptionstr,
			 message: ''
		   },
		   function(response) {
			 if (response && response.post_id) {
			   alert('Post was published.');
			 } else {
			   alert('Post was not published.');
			 }
		   }
		 );
	}

	function post_aboutapp()
	{
		var descriptionstr = "Check out your friends' stats at Facebook Friends & Profile Statistics!";
		var messagestr = "Stats about my friends: ";
		if (document.forms[0].cb6.checked){messagestr+=poststrmusic;}
		if (document.forms[0].cb7.checked){messagestr+=poststrmovie;}
		if (document.forms[0].cb8.checked){messagestr+=poststrtv;}
		if (document.forms[0].cb9.checked){messagestr+=poststrbook;}
		if (document.forms[0].cb1.checked){messagestr+=poststrage;}
		if (document.forms[0].cb2.checked){messagestr+=poststrgender;}
		if (document.forms[0].cb3.checked){messagestr+=poststrwallpost;}
		if (document.forms[0].cb4.checked){messagestr+=poststrfbjoinf;}
		if (document.forms[0].cb5.checked){messagestr+=poststrfbjoinl;}
		if (document.forms[0].cb10.checked){messagestr+=poststrname;}		
		
		var params = {};
		params['message'] = messagestr;
		params['name'] = 'Facebook Friends & Profile Statistics';
		params['description'] = descriptionstr;
		params['link'] = 'https://apps.facebook.com/statistics';
		params['picture'] = 'https://fpl.websites.xs4all.nl/FPS/v2/chart128.png';
		params['caption'] = 'Stats about your friends!';


				
		FB.api('/me/feed', 'post', params, function(response) {
		  if (!response || response.error) {
			alert('Oops! Couldn\'t publish the post.');
		  } else {
			alert('Posted on your wall, thanks for using!');
		  }
		});
		
		/*
		FB.ui(
		   {
			 method: 'feed',
			 name: messagestr,
			 link: 'https://apps.facebook.com/statistics',
			 description: descriptionstr,
			 message: messagestr,
			 picture: 'https://fpl.websites.xs4all.nl/FPS/v2/chart128.png',
			 actions: [{ name: 'Check your stats', link: 'https://apps.facebook.com/statistics' }]
		   },
		   function(response) {
			 if (response && response.post_id) {
			   alert('Post was published on your wall. Thanks for using!');
			 } else {
			   alert('Post was not published, try again!');
			 }
		   }
		 );*/

	}

	
	
	function showpublishlink()
	{
		//div_publishlink.innerHTML+="<br><b>Post stats to your wall!</b><br>";
		//div_publishlink.innerHTML+="<br>Select the stats you want to post<br>";
		


		div_publishlink.innerHTML+="<br><a href='javascript:onClick=post_aboutapp()'><big><b>Post on your wall now!</b></big></a> Thanks for using!<br><br>";
	
	}
	
	
	function gcandmark(person)
	{
		
		
		numloaded++;
		
		//div_friendsmap_numload.innerHTML+="<br>" + person.name + " in " + person.location.name;
		
		if(person != undefined)
		{
			if(numloaded <= locnum){div_friendsmap_numload.innerHTML= "(loaded " + numloaded + " of " + locnum + ")<br><br>";}
			
			geocoder.geocode({'address': person.location.name}, function(results, status) 
			{
				//div_friendsmap_numload.innerHTML+="<br>got geocode for: " + person.name;// + results[0].geometry.location.lat();
				if (status == google.maps.GeocoderStatus.OK)
				{
					var rndpos = new google.maps.LatLng(results[0].geometry.location.lat()-0.005+Math.random()*0.01, results[0].geometry.location.lng()-0.005+Math.random()*0.01);
					gcmarker = new google.maps.Marker({
						position: rndpos,
						map: map,
						title: person.name
					});							
				}
				else
				{
				//alert("Geocode for" + person.name + " in " + person.location.name + " was not successful for the following reason: " + status);
				}
			});
		}
	}

	function getfrinfo()
	{
		FB.api('/me/friends?fields=name,id,gender,birthday,locale,location,relationship_status', function(response) 
		{
			FrObj = response.data;
			div_loading.style.display="none"; //hide loading message
			div_app.style.visibility="visible"; //show app page
			scroll(0,0);
			drawstats();
			//FB.Canvas.setAutoGrow();
		
		});
	}
	
	function anl_titleinfo()
	{
		div_title.innerHTML+="<br>Statistics for " + FrObj.length + " of your Facebook friends (excluding private profiles)";
	}

	function anl_showphotoinfo()
	{

			div_photoinfo.innerHTML="<br><br><b>Your most popular photos</b>";			
			div_photoinfo.innerHTML+="<br>(loading)<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";	
				
			FB.api(
					{
					method: 'fql.multiquery',
					queries: {'query1':'SELECT images, object_id, pid, link FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject=me()) OR aid IN (SELECT aid FROM album WHERE owner=me())', //photos with me tagged or in my albums
							'query2':'SELECT text, object_id FROM comment WHERE object_id IN (SELECT object_id FROM #query1)',
							'query3':'SELECT object_id FROM like WHERE object_id IN (SELECT object_id FROM #query1)'
					}
					},
					function(response2) {
					

					
					PhotoObj = response2;
					
					div_photoinfo.innerHTML="<br><br><b>Your most popular photos</b>";			
					div_photoinfo.innerHTML+="<br>These are the photos uploaded by you or with your tag in it, ranked by most comments and likes.<br><br>";						
					
					for (counter=0;counter<PhotoObj[0].fql_result_set.length;counter=counter+1)
					{
						//div_photoinfo.innerHTML+="<a href=\"" + PhotoObj[0].fql_result_set[counter].link + "\"><img src=\"" + PhotoObj[0].fql_result_set[counter].images[2].source + "\"></a>";
						
						cmts = 0;
						for (ctr2=0;ctr2<PhotoObj[1].fql_result_set.length;ctr2=ctr2+1)
						{
							if(PhotoObj[1].fql_result_set[ctr2].object_id==PhotoObj[0].fql_result_set[counter].object_id){cmts=cmts+1}
						}
						PhotoObj[0].fql_result_set[counter].cmts = cmts;
						PhotoObj[0].fql_result_set[counter].interacts = cmts;							
						//div_photoinfo.innerHTML+= PhotoObj[0].fql_result_set[counter].cmts + " comments<br>";
						
						likes = 0;
						for (ctr2=0;ctr2<PhotoObj[2].fql_result_set.length;ctr2=ctr2+1)
						{
							if(PhotoObj[2].fql_result_set[ctr2].object_id==PhotoObj[0].fql_result_set[counter].object_id){likes=likes+1}
						}
						PhotoObj[0].fql_result_set[counter].likes = likes;
						PhotoObj[0].fql_result_set[counter].interacts += likes;
						//div_photoinfo.innerHTML+= PhotoObj[0].fql_result_set[counter].likes + " likes<br>";
					}
					
					//now for sorting
					var topobject_id = new Array(5);for (counter=0;counter<PhotoObj[0].fql_result_set.length;counter=counter+1){topobject_id[counter] = 0;}
					var highestinteractsnum = 0;
					var chck = 0;
					
					for (abc=0;abc<5;abc=abc+1)
					{
						for (counter=0;counter<PhotoObj[0].fql_result_set.length;counter=counter+1)
						{
							if (PhotoObj[0].fql_result_set[counter].interacts > highestinteractsnum)
							{
								for(bcd=0;bcd<abc;bcd=bcd+1) //checken dat we deze naam niet al hadden
								{
									if(!(counter == topobject_id[bcd]))
									{
										chck = chck + 1;
									}
								}
								
								if(chck == abc)
								{	
									topobject_id[abc] = counter; //PhotoObj[0].fql_result_set[counter].object_id;
									highestinteractsnum = PhotoObj[0].fql_result_set[counter].interacts;
									//div_wallinfo.innerHTML+= "<br>" + topnamestr[abc] + " " + FrObj[counter].name + "SDFSD";
								}
								
								chck=0;
								
							}
						}
						
						//if(abc==0){if(highestpostnum==0){div_wallinfo.innerHTML="<br><br><br><b>Your friends by posts on your wall</b><br>Oops.. I think there's not enough posts on your wall to make a ranking!<br><br><br><br><br>";}}
						if(highestinteractsnum>0){
												
						div_photoinfo.innerHTML+= "<table><tr><td>" + (abc+1) + ". </td><td>" +
							"<a href=\"" + PhotoObj[0].fql_result_set[topobject_id[abc]].link + "\"><img height=\"100\" src=\"" + PhotoObj[0].fql_result_set[topobject_id[abc]].images[2].source + "\"></a>" +
							"</td><td>" + PhotoObj[0].fql_result_set[topobject_id[abc]].cmts + " comments<br>" + PhotoObj[0].fql_result_set[topobject_id[abc]].likes + " likes" +
							"</td></tr></table>";				
										
						}
						highestinteractsnum = 0;
					}
			

					}
			
		
					
			);
			
	}
	
	function anl_showpopularlikes()
	{
		div_popularmovies.innerHTML="<br><br><b>The things your friends like most</b><br><br>Your friends' favorite movies:<br>(loading...)<br><br><br>";	
		div_populartvshows.innerHTML="<br>Your friends' favorite TV shows:<br>(loading...)<br><br><br>";
		div_popularmusic.innerHTML="<br>Your friends' favorite music:<br>(loading...)<br><br><br>";
		div_popularbooks.innerHTML="<br>Your friends' favorite books:<br>(loading...)<br><br><br>";
		div_popularfirstnames.innerHTML="<br>Your friends' most common first names:<br>(loading...)<br><br>";

		var highestcount = 0;
		var itemnum;
		
		//var currentTime = new Date()
		//var sec = currentTime.getTime()
		//div_popularmovies.innerHTML+= "<br>NOW " + sec;

		
		
		
		//now movies			

		FB.api(
		{
			method: 'fql.query',
			//query: 'SELECT activities, music, tv, movies, books, hs_info FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' //info about friends
			query: 'SELECT movies FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			},
			
			function(response3) {	

			div_popularmovies.innerHTML="<br><br><b>The things your friends like most</b><br><br>Your friends' favorite movies:<br>";
			
			var MoviesArray = new Array(1);
			var MoviesLikesCountArray = new Array(1);
			var foundmovie = 0;
			var FrLikesObj = response3;
			highestcount = 0;
						
			for (counter=0;counter<FrLikesObj.length;counter=counter+1)
			{
				if(FrLikesObj[counter].movies)
				{
					var tempar = new Array();
					//div_popularmovies.innerHTML+="defined: ";
					tempar = FrLikesObj[counter].movies.split(',')
					for(i=0;i<tempar.length;i=i+1)
					{
						for(j=0;j<MoviesArray.length;j=j+1)
						{
							if(tempar[i] == MoviesArray[j])
							{
								MoviesLikesCountArray[j] = MoviesLikesCountArray[j] + 1;
								foundmovie = 1;
								break;
							}
						}
						
						if(foundmovie == 0){ MoviesArray.push(tempar[i]); MoviesLikesCountArray.push(1)}
						foundmovie = 0;				
					}		
				}
				//div_popularmovies.innerHTML+=FrLikesObj[counter].movie + "<br>";
			
			}

			for (j=0;j<3;j=j+1)
			{
				for (i=0;i<MoviesArray.length;i=i+1)
				{
					if(MoviesLikesCountArray[i]>highestcount){itemnum=i; highestcount = MoviesLikesCountArray[i]}
					//div_popularmovies.innerHTML+= i + ": " + MoviesArray[i] + " with " + MoviesLikesCountArray[i] + " likes <br>";
				}
			
				if(!itemnum){div_popularmovies.innerHTML+= "Oops! Not enough friends specified their movie preferences."; break; }
				div_popularmovies.innerHTML+= (j+1) + ". " + MoviesArray[itemnum] + " (" + MoviesLikesCountArray[itemnum] + " likes)<br>";
				MoviesLikesCountArray[itemnum] = 0;
				highestcount = 0;
				
				if(j==0){poststrmovie = "\n* My friends' favorite movie: " + MoviesArray[itemnum];}
			}	
		})
		


		//now tv shows		
		
		FB.api(
		{
			method: 'fql.query',
			//query: 'SELECT activities, music, tv, movies, books, hs_info FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' //info about friends
			query: 'SELECT tv FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			},
			
			function(response3) {	
	
			div_populartvshows.innerHTML="<br>Your friends' favorite TV shows:<br>";
			
			var TvShowsArray = new Array(1);
			var TvShowsLikesCountArray = new Array(1);
			var foundmovie = 0;
			var FrLikesObj = response3;
			highestcount = 0;
			
				
			for (counter=0;counter<FrLikesObj.length;counter=counter+1)
			{
				if(FrLikesObj[counter].tv)
				{
					var tempar = new Array();
					//div_popularmovies.innerHTML+="defined: ";
					tempar = FrLikesObj[counter].tv.split(',')
					for(i=0;i<tempar.length;i=i+1)
					{
						for(j=0;j<TvShowsArray.length;j=j+1)
						{
							if(tempar[i] == TvShowsArray[j])
							{
								TvShowsLikesCountArray[j] = TvShowsLikesCountArray[j] + 1;
								foundmovie = 1;
								break;
							}
						}
						
						if(foundmovie == 0){ TvShowsArray.push(tempar[i]); TvShowsLikesCountArray.push(1)}
						foundmovie = 0;
						
					}
				}
				//div_popularmovies.innerHTML+=FrLikesObj[counter].movie + "<br>";
			
			}

			for (j=0;j<3;j=j+1)
			{
				for (i=0;i<TvShowsArray.length;i=i+1)
				{
					if(TvShowsLikesCountArray[i]>highestcount){itemnum=i; highestcount = TvShowsLikesCountArray[i]}
					//div_popularmovies.innerHTML+= i + ": " + TvShowsArray[i] + " with " + TvShowsLikesCountArray[i] + " likes <br>";		
				}
			
				if(!itemnum){div_populartvshows.innerHTML+= "Oops! Not enough friends specified their TV show preferences."; break; }
				div_populartvshows.innerHTML+= (j+1) + ". " + TvShowsArray[itemnum] + " (" + TvShowsLikesCountArray[itemnum] + " likes)<br>";
				TvShowsLikesCountArray[itemnum] = 0;
				highestcount = 0;
			
				if(j==0){poststrtv = "\n* My friends' favorite TV show: " + TvShowsArray[itemnum];}			
			}	
			
		})
		
		
		
		
		FB.api(
		{
			method: 'fql.query',
			//query: 'SELECT activities, music, tv, movies, books, hs_info FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' //info about friends
			query: 'SELECT music FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			},
			
			function(response3) {	

			var MusicArray = new Array(1);
			var MusicLikesCountArray = new Array(1);
			var foundmusic = 0;
			var FrLikesObj = response3;
			highestcount = 0;
			
			for (counter=0;counter<FrLikesObj.length;counter=counter+1)
			{
				if(FrLikesObj[counter].music)
				{
					var tempar = new Array();
					//div_popularmovies.innerHTML+="defined: ";
					tempar = FrLikesObj[counter].music.split(',')
					for(i=0;i<tempar.length;i=i+1)
					{
						for(j=0;j<MusicArray.length;j=j+1)
						{
							if(tempar[i] == MusicArray[j])
							{
								MusicLikesCountArray[j] = MusicLikesCountArray[j] + 1;
								foundmusic = 1;
								break;
							}
						}
						
						if(foundmusic == 0){ MusicArray.push(tempar[i]); MusicLikesCountArray.push(1)}
						foundmusic = 0;
						
					}
					
				}
				//div_popularmovies.innerHTML+=FrLikesObj[counter].music + "<br>";
			
			}

			div_popularmusic.innerHTML="<br>Your friends' favorite music:<br>";
			
			for (j=0;j<3;j=j+1)
			{
				for (i=0;i<MusicArray.length;i=i+1)
				{
					if(MusicLikesCountArray[i]>highestcount){itemnum=i; highestcount = MusicLikesCountArray[i]}
					//div_popularmovies.innerHTML+= i + ": " + MusicArray[i] + " with " + MusicLikesCountArray[i] + " likes <br>";
					
				}
			
				if(!itemnum){div_popularmusic.innerHTML+= "Oops! Not enough friends specified their musical preferences."; break; }
				div_popularmusic.innerHTML+= (j+1) + ". " + MusicArray[itemnum] + " (" + MusicLikesCountArray[itemnum] + " likes)<br>";
				MusicLikesCountArray[itemnum] = 0;
				highestcount = 0;

				if(j==0){poststrmusic = "\n* My friends' favorite music: " + MusicArray[itemnum];}
					
			}
	
		
		
		})


		
		FB.api(
		{
			method: 'fql.query',
			//query: 'SELECT activities, music, tv, movies, books, hs_info FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' //info about friends
			query: 'SELECT books FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			},
			
			function(response3) {	

			div_popularbooks.innerHTML="<br>Your friends' favorite books:<br>";
			
			
			var BooksArray = new Array(1);
			var BooksLikesCountArray = new Array(1);
			var foundbook = 0;
			var FrLikesObj = response3;
			highestcount = 0;
			
				
			for (counter=0;counter<FrLikesObj.length;counter=counter+1)
			{
				if(FrLikesObj[counter].books)
				{
					var tempar = new Array();
					//div_popularmovies.innerHTML+="defined: ";
					tempar = FrLikesObj[counter].books.split(',')
					for(i=0;i<tempar.length;i=i+1)
					{
						for(j=0;j<BooksArray.length;j=j+1)
						{
							if(tempar[i] == BooksArray[j])
							{
								BooksLikesCountArray[j] = BooksLikesCountArray[j] + 1;
								foundbook = 1;
								break;
							}
						}
						
						if(foundbook == 0){ BooksArray.push(tempar[i]); BooksLikesCountArray.push(1)}
						foundbook = 0;
						
					}
					
				}
				//div_popularmovies.innerHTML+=FrLikesObj[counter].book + "<br>";
			
			}


			//div_popularmovies.innerHTML+="<br><b>The most popular first names among your friends</b><br>";			

			for (j=0;j<3;j=j+1)
			{
				for (i=0;i<BooksArray.length;i=i+1)
				{
					if(BooksLikesCountArray[i]>highestcount){itemnum=i; highestcount = BooksLikesCountArray[i]}
					//div_popularmovies.innerHTML+= i + ": " + BooksArray[i] + " with " + BooksLikesCountArray[i] + " likes <br>";
					
				}
			
				if(!itemnum){div_popularbooks.innerHTML+= "Oops! Not enough friends specified their book preferences."; }
				div_popularbooks.innerHTML+= (j+1) + ". " + BooksArray[itemnum] + " (" + BooksLikesCountArray[itemnum] + " likes)<br>";
				BooksLikesCountArray[itemnum] = 0;
				highestcount = 0;
				
				if(j==0){poststrbook = "\n* My friends' favorite book: " + BooksArray[itemnum];}
				
			}	
			
			
			
		})
		


		FB.api(
		{
			method: 'fql.query',
			//query: 'SELECT activities, music, tv, movies, books, hs_info FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' //info about friends
			query: 'SELECT first_name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			},
			
			function(response3) {	

			div_popularfirstnames.innerHTML="<br>Most common first names among your friends:<br>";
			
			
			var FirstNamesArray = new Array(1);
			var FirstNamesLikesCountArray = new Array(1);
			var foundfirstname = 0;
			var FrLikesObj = response3;
			highestcount = 0;
				
			for (counter=0;counter<FrLikesObj.length;counter=counter+1)
			{
				if(FrLikesObj[counter].first_name)
				{
					var tempar = new Array();
					//div_popularmovies.innerHTML+="defined: ";
					tempar = FrLikesObj[counter].first_name.split(',')
					for(i=0;i<tempar.length;i=i+1)
					{
						for(j=0;j<FirstNamesArray.length;j=j+1)
						{
							if(tempar[i] == FirstNamesArray[j])
							{
								FirstNamesLikesCountArray[j] = FirstNamesLikesCountArray[j] + 1;
								foundfirstname = 1;
								break;
							}
						}
						
						if(foundfirstname == 0){ FirstNamesArray.push(tempar[i]); FirstNamesLikesCountArray.push(1)}
						foundfirstname = 0;
						
					}
					
				}
				//div_popularmovies.innerHTML+=FrLikesObj[counter].firstname + "<br>";
			
			}


			//div_popularmovies.innerHTML+="<br><b>The most popular first names among your friends</b><br>";			

			for (j=0;j<3;j=j+1)
			{
				for (i=0;i<FirstNamesArray.length;i=i+1)
				{
					if(FirstNamesLikesCountArray[i]>highestcount){itemnum=i; highestcount = FirstNamesLikesCountArray[i]}
					//div_popularmovies.innerHTML+= i + ": " + FirstNamesArray[i] + " with " + FirstNamesLikesCountArray[i] + " likes <br>";
					
				}
			
				//if(!itemnum){div_popularmovies.innerHTML+= "Oops! Not enough friends specified their firstname preferences.";}
				div_popularfirstnames.innerHTML+= (j+1) + ". " + FirstNamesArray[itemnum] + " (" + FirstNamesLikesCountArray[itemnum] + " friends)<br>";
				FirstNamesLikesCountArray[itemnum] = 0;
				highestcount = 0;

				if(j==0){poststrname = "\n* My friends' most common first name: " + FirstNamesArray[itemnum];}
			}	
			
		})

	}
	
	
	function drawstats()
	{
		//anl_titleinfo();
		//getmyinfo();
		anl_drawagebars();
		anl_drawgenderpie();
		anl_drawrelationpies();
		anl_showwallinfo();
		anl_showphotoinfo();
		anl_showjoindateinfo();
		anl_drawfriendsmap();
		anl_showpopularlikes();
		showpublishlink();
		//thanks.innerHTML+="<br><br><b>Thanks for using!</b><br><br><img src=\"fonz.jpg\">";
		FB.Canvas.setAutoGrow();
		//setTimeout("FB.Canvas.setAutoGrow();", 15000);
	}
	
	FB.getLoginStatus(function(response) { getfrinfo(); }); //wait until ready, then do getfrinfo
	//setTimeout("FB.Canvas.setAutoGrow();", 6000);
	
