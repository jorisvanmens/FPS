	var div_title = document.getElementById('div_title');
	var div_slogan = document.getElementById('div_slogan');
	var div_loading = document.getElementById('div_loading');
	var div_app = document.getElementById('div_app');
	var div_agebars = document.getElementById('div_agebars');
	var div_genderpie = document.getElementById('div_genderpie');
	var div_relationpies = document.getElementById('div_relationpies');
	var div_statusupdates = document.getElementById('div_statusupdates'); 
	var div_wallposters = document.getElementById('div_wallposters');
	var div_wallposts = document.getElementById('div_wallposts');
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
	var div_privacy = document.getElementById('div_privacy');
	var div_debug = document.getElementById('div_debug');
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
	
	var StatusUpdatesCommentCount = new Array();
	var StatusUpdatesLikeCount = new Array();
	var StatusUpdatesMessages = new Array();
	var StatusUpdatesDates = new Array();
	
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
	var MePic;
	var FrObj; //friends info array (from REST)
	var FrLikesObj; //friends likes (from FQL)
	var PhotoObj;
	var MyWallObj;
	var MyPostsObj;
	var WallObj;
	
	var TopInteractorIds = new Array(5);for (counter=0;counter<5;counter=counter+1){TopInteractorIds[counter] = 0;}
	var TopStatusUpdates = new Array(5);for (counter=0;counter<5;counter=counter+1){TopStatusUpdates[counter] = 0;}
	var WallInteracts = {};
	

	//Rotating loading img
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FF6342,FFFFFF00&chdl=A|B|C\");",500);
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FF6342,ADDE63&chdl=A|B|C\");",1000);
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FFFFFF00,FFFFFF00&chdl=A|B|C\");",1500);		
	setInterval(function(){
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FF6342,ADDE63&chdl=A|B|C\");",1000);
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FF6342,FFFFFF00&chdl=A|B|C\");",500);
	setTimeout("$(\"#loadingimg\").attr(\"src\",\"https://chart.googleapis.com/chart?cht=v&chs=200x100&chf=bg,s,00000000&chd=t:100,80,60,30,30,30,10&chco=63C6DE,FFFFFF00,FFFFFF00&chdl=A|B|C\");",1500);	
	},1500);
	
	//$("#loadingimg").attr("src","https://chart.googleapis.com/chart?cht=v&chs=200x100&chd=t:100,80,60,30,30,30,10&chco=FFFFFF,ADDE63,63C6DE&chdl=A|B|C");
	
	function getmypic()
	{
		FB.api('/me?fields=picture', function(response)
		{
			MePic = response;
			//getfrinfo();
			//$("#sharelink").attr("href", "https://www.facebook.com/dialog//feed?link=https://apps.facebook.com/statistics&picture=http://fb.smartcoupons.nl/logo.gif&name=Facebook Friends & Profile Statistics&caption=Stats about your friends!");
		});	
	}
	
	function anl_showjoindateinfo()
	{
		if(FrObj.length < 6)
		{
			div_joindateinfo_title1.innerHTML+="<br>Not enough friends to rank them by join date.";
			return;
		}
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
	
	function ExtractInteractData()//recursive method for getting the data from all wall response pages
	{
		for (var counter=0;counter<MyWallObj.data.length;counter=counter+1)
		{
			
			if((MyWallObj.data[counter].from.id == MeObj.authResponse.userID) && (MyWallObj.data[counter].type != "photo"))//count comments and likes to posts from me
			{				
				if(typeof MyWallObj.data[counter].comments != 'undefined')//the post in questions has comments
				{
					for (var counterdos=0;counterdos<MyWallObj.data[counter].comments.data.length;counterdos=counterdos+1)
					{
						div_debug.innerHTML+=counter + "!";
						for (var countertres=0;countertres<FrObj.length;countertres=countertres+1)//check whose comment it is and +1 his # of comments
						{
							if (typeof MyWallObj.data[counter].comments.data[counterdos].from != 'undefined')
							{
								if (FrObj[countertres].id == MyWallObj.data[counter].comments.data[counterdos].from.id) 
								{ 
									WallInteracts.Comments[countertres]++;
									break; //zou het sneller moeten maken
								}
							}
						}
					}					
				}
				
				//This part is for the popular status updates
				if(MyWallObj.data[counter].type == "status")
				{
					StatusUpdatesMessages.push(MyWallObj.data[counter].message);
					StatusUpdatesDates.push(MyWallObj.data[counter].created_time.substring(0,10));
					if(typeof MyWallObj.data[counter].comments != 'undefined') 
					{ 
						StatusUpdatesCommentCount.push(MyWallObj.data[counter].comments.count);
					}
					else StatusUpdatesCommentCount.push(0);
					if(typeof MyWallObj.data[counter].likes != 'undefined') 
					{ 
						StatusUpdatesLikeCount.push(MyWallObj.data[counter].likes.count);
					}
					else StatusUpdatesLikeCount.push(0);
				}

				
				
				
				/*if(MyWallObj.data[counter].likes != undefined)//we have likes on my post
				{
					for (var counterdos=0;counterdos<MyWallObj.data[counter].likes.data.length;counterdos=counterdos+1)
					{
						for (var countertres=0;countertres<FrObj.length;countertres=countertres+1)//check whose like it is and +1 his # of likes
						{
							//div_debug.innerHTML+= "|" + counter + "." + counterdos + "." + countertres + "|";
							if (FrObj[countertres].id == MyWallObj.data[counter].likes.data[counterdos].id) 
							{ 
								WallInteracts.Likes[countertres]++;
								div_debug.innerHTML+= "<br>FOUND LIKE: " + FrObj[countertres].name + "-" + WallInteracts.Posts[countertres] + "-" + WallInteracts.Comments[countertres] + "-" + WallInteracts.Likes[countertres];
								break;
							}
						}			
					}
				}*/				
			}
			else if (typeof MyWallObj.data[counter].to != 'undefined')
			{
				if((MyWallObj.data[counter].to.data.length == 1) && (MyWallObj.data[counter].to.data[0].id == MeObj.authResponse.userID))//someone posted to my wall
				{
					for (var counterdos=0;counterdos<FrObj.length;counterdos=counterdos+1)//check whose it is and +1 his # of posts
					{
						//div_debug.innerHTML+= "|" + counter + "." + counterdos + "." + countertres + "|";
						if (FrObj[counterdos].id == MyWallObj.data[counter].from.id) 
						{ 
							WallInteracts.Posts[counterdos]++;
							break;
						}
					}
				}
			
			}	
		}
				
		
		
		if(typeof MyWallObj.paging != 'undefined')
		{
			$.getJSON(MyWallObj.paging.next, function(response) {
					MyWallObj = response;
					if(MyWallObj.data.length != 0){ExtractInteractData(response);}//rrreeecccuuurrrsssiiiooonnn
					else
					{
						/*for (a=0;a<5;a=a+1)
						{
						div_debug.innerHTML+= FrObj[TopInteractorIds[a]].name + "-" + WallInteracts.Posts[TopInteractorIds[a]] + "-" + WallInteracts.Comments[TopInteractorIds[a]] + "-" + WallInteracts.Likes[TopInteractorIds[a]];
						}*/
						
						for (var a=0;a<5;a=a+1)//make top 5 for wall posters
						{
							for (var b=0;b<FrObj.length;b=b+1)
							{
								
								if((WallInteracts.Posts[b] + WallInteracts.Comments[b]) > (WallInteracts.Posts[TopInteractorIds[a]] + WallInteracts.Comments[TopInteractorIds[a]]))
								{
									alreadyinlist=0;
									for(var c=0;c<5;c=c+1)//check of we deze al hebben, anders toevoegen
									{
										if(TopInteractorIds[c] == b)
										{
											alreadyinlist=1;
											break;
										}
									}
									if(alreadyinlist == 0){ TopInteractorIds[a] = b; };
								}
							}
							//alert(TopInteractorIds[0] + " " +TopInteractorIds[1] + " " +TopInteractorIds[2] + " " +TopInteractorIds[3] + " " +TopInteractorIds[4] + " ");
						}

						for (var a=0;a<5;a=a+1)//make top 5 for status updates
						{
							for (var b=0;b<StatusUpdatesMessages.length;b=b+1)
							{
								if((StatusUpdatesLikeCount[b] + StatusUpdatesCommentCount[b]) > (StatusUpdatesLikeCount[TopStatusUpdates[a]] + StatusUpdatesCommentCount[TopStatusUpdates[a]]))
								{
									alreadyinlist=0;
									for(var c=0;c<5;c=c+1)//check of we deze al hebben, anders toevoegen
									{
										if(TopStatusUpdates[c] == b)
										{
											alreadyinlist=1;
											break;
										}
									}
									if(alreadyinlist == 0){ TopStatusUpdates[a] = b; };
								}
							}			
						}
						
						
						//This part is for the popular status updates
						div_statusupdates.innerHTML = div_statusupdates.innerHTML.slice(0,-16);
						div_statusupdates.innerHTML += "These are your top status updates ranked by most comments and likes.";
						for (i=0;i<5;i=i+1)
						{
							if((StatusUpdatesCommentCount[TopStatusUpdates[i]] + StatusUpdatesLikeCount[TopStatusUpdates[i]]) > 0)
							{
								addstr = "";
								addstr += "<div class='statusupdate'>"
								if(typeof MePic.picture.data.url != 'undefined') { addstr += "<img src='" + MePic.picture.data.url + "' class='mepic'>"; }
								if(StatusUpdatesMessages[TopStatusUpdates[i]].length > 200)
								{
									addstr += StatusUpdatesMessages[TopStatusUpdates[i]].substring(0,200) + " ...";
								}
								else
								{
									addstr += StatusUpdatesMessages[TopStatusUpdates[i]];
								}
								addstr += "<br><span style='color:gray;'>" + StatusUpdatesDates[TopStatusUpdates[i]] + "   ";
								addstr += "<img src='msgicon.png' class='smallicon'>" + StatusUpdatesCommentCount[TopStatusUpdates[i]];
								addstr += "   <img src='likeicon.png' class='smallicon'>" + StatusUpdatesLikeCount[TopStatusUpdates[i]];
								addstr += "</span></div>";//<span style='clear: both;'></span>";
								div_statusupdates.innerHTML += addstr;
								//div_debug.innerHTML += "<br>" + StatusUpdatesMessages[i] + " L:" + StatusUpdatesLikeCount[i] + " C:" + StatusUpdatesCommentCount[i];
							}
						}
						
						div_wallposters.innerHTML = div_wallposters.innerHTML.slice(0,-16);//remove loading msg
						div_wallposters.innerHTML+="The number of posts shown is the sum of the number of posts to your wall and comments on your status updates.<br>";
						for (a=0;a<5;a=a+1)
						{
							if((WallInteracts.Posts[TopInteractorIds[a]] + WallInteracts.Comments[TopInteractorIds[a]]) > 0)
							{
								addstr = "";
								addstr+= "<img src='" + FrObj[TopInteractorIds[a]].picture.data.url + "' style='width:50; float:left; margin:8px;'><br>";
								addstr+= FrObj[TopInteractorIds[a]].name;
								addstr+= "<br>" + "<img src='msgicon.png' class='smallicon'>" + (WallInteracts.Posts[TopInteractorIds[a]] + WallInteracts.Comments[TopInteractorIds[a]]) + " posts";
								//addstr+= "&nbsp&nbsp" + "<img src='likeicon.png' class='smallicon'>" + WallInteracts.Likes[TopInteractorIds[a]] + " likes";
								addstr+="<br style='clear: both;'>";
								div_wallposters.innerHTML+=addstr;
							}
							
						}
					}
			});
		}
		else
		{
			div_wallposters.innerHTML = div_wallposters.innerHTML.slice(0,-16);//remove loading msg
			div_wallposters.innerHTML+="<br>Not enough wall posts to show these stats.";
			return;
		}
		
	}
	
	function anl_showwallposters()
	{
		//does both analyses for 1) top posters on your wall and 2) most popular status updates
		div_wallposters.innerHTML+="<br>(loading...)";
		div_statusupdates.innerHTML+="<br>(loading...)";
		WallInteracts.Posts = new Array(FrObj.length);for (counter=0;counter<FrObj.length;counter=counter+1){WallInteracts.Posts[counter] = 0;}
		WallInteracts.Comments = new Array(FrObj.length);for (counter=0;counter<FrObj.length;counter=counter+1){WallInteracts.Comments[counter] = 0;}
		WallInteracts.Likes = new Array(FrObj.length);for (counter=0;counter<FrObj.length;counter=counter+1){WallInteracts.Likes[counter] = 0;}
		
		$.getJSON('https://graph.facebook.com/me/feed?access_token=' + MeObj.authResponse.accessToken + '&limit=100000', function(response) {
			MyWallObj = response;
			ExtractInteractData(response);
						
		});
			
	}
	
	function anl_showwallposts()
	{
		/*
		var TopWallPosts = {};
		TopWallPosts.Likes = new Array(3);for (counter=0;counter<3;counter=counter+1){TopWallPosts.Likes[counter] = 0;}
		TopWallPosts.Comments = new Array(3);for (counter=0;counter<3;counter=counter+1){TopWallPosts.Comments[counter] = 0;}
		TopWallPosts.Message = new Array(3);for (counter=0;counter<3;counter=counter+1){TopWallPosts.Message[counter] = "";}
	
		div_wallposts.innerHTML+="<br><br><br><b>The most popular posts on your wall</b><br>";

		FB.api('/me/feed?limit=1000000', function(response) 
		{	
			MyWallObj = response;
			for (i=0;i<MyWallObj.data.length;i=i+1)
			{
				
				if((MyWallObj.data[i].comments != undefined) && (MyWallObj.data[i].likes != undefined))
				{
					if((MyWallObj.data[i].likes.count + MyWallObj.data[i].comments.count) > (TopWallPosts.Comments[0] + TopWallPosts.Likes[0]))
					{
						TopWallPosts.Comments[0] = MyWallObj.data[i].comments.count;
						TopWallPosts.Likes[0] = MyWallObj.data[i].likes.count;
						TopWallPosts.Message[0] = MyWallObj.data[i].message;
					}

					div_wallposts.innerHTML+= "<br>" + MyWallObj.data[i].message + " - " + MyWallObj.data[i].comments.count + " - " + MyWallObj.data[i].likes.count;
				}
				
			}
		
		div_wallposts.innerHTML+=TopWallPosts.Message[0] + " (" + TopWallPosts.Comments[0] + " comments, " + TopWallPosts.Likes[0] + " likes)";
			
		});
	*/
	}
	
	function anl_drawgenderpie()
	{

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
		
		if((malenum + femalenum)==0)
		{
			div_genderpie.innerHTML+="<br>Not enough friends specified their gender to display this graph.";
			return;
		}
		
		div_genderpie.innerHTML+="Of all your Facebook friends " + (malenum + femalenum) + " specified their gender.";
			
		maleperc = (malenum / (malenum + femalenum)).toFixed(2); //calc percentages
		femaleperc = (femalenum / (malenum + femalenum)).toFixed(2);
		
		//make graph
		div_genderpie.innerHTML+=
			"<br><br><img src=\"https://chart.googleapis.com/chart?cht=p3&chd=t:" 
			+ maleperc + "," + femaleperc 
			+ "&chs=500x150&chf=bg,s,00000000&chl="
			+ parseInt(100*maleperc) + "% " + "male|"
			+ parseInt(100*femaleperc) + "% " + "female\">";

		//div_genderpie.innerHTML+="<br><br><a href='javascript:onClick=post_ag()'>Publish</a> the age and gender statistics to your wall!";

		poststrgender = "\n* Gender ratio of my friends: " + parseInt(femaleperc*100) + "% female, " + parseInt(maleperc*100) + "% male";
		
	}

	function anl_drawrelationpies()
	{
		var RelationDefined = 0; //number of people who defined their relationship
		var RelationTypes = {}; //dictionary object with relationship types

		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if (typeof FrObj[counter].relationship_status != 'undefined')
			{
				RelationDefined++;
				if(typeof RelationTypes[FrObj[counter].relationship_status] == 'undefined')
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

		if(RelationDefined==0)
		{
			div_relationpies.innerHTML+="<br>Not enough friends specified their relationship status to display this graph.";
			return;
		}
		
		div_relationpies.innerHTML+="Of all your Facebook friends " + RelationDefined + " specified their relationship status.";
		
		var key;
		/*for (key in RelationTypes)
		{
			div_relationpies.innerHTML+= key + ": ";
			div_relationpies.innerHTML+= parseInt(100*(RelationTypes[key] / RelationDefined).toFixed(3)); //percentage with 1 decimal
			div_relationpies.innerHTML+= "%<br>";
		}*/
		
		//make graph
		div_relationpies.innerHTML+= "<br><br>";
		var RelationPieImg = "<img src=\"https://chart.googleapis.com/chart?chco=4CC417&cht=p3&chd=t:";
		for (key in RelationTypes) //pie parts
		{
			RelationPieImg+= (RelationTypes[key] / RelationDefined).toFixed(3);
			RelationPieImg+= ",";
		}	
		
		RelationPieImg = RelationPieImg.slice(0,-1); //remove last comma
		RelationPieImg+= "&chs=500x150&chf=bg,s,00000000&chl="
		
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
		var OldestFriends = {};
		OldestFriends.Age = new Array(3);for (counter=0;counter<3;counter=counter+1){OldestFriends.Age[counter] = 0;}
		OldestFriends.Id = new Array(3);for (counter=0;counter<3;counter=counter+1){OldestFriends.Id[counter] = 0;}
		var YoungestFriends = {};
		YoungestFriends.Age = new Array(3);for (counter=0;counter<3;counter=counter+1){YoungestFriends.Age[counter] = 100;}
		YoungestFriends.Id = new Array(3);for (counter=0;counter<3;counter=counter+1){YoungestFriends.Id[counter] = 0;}
		
		
		//first, extract age data
		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if(typeof FrObj[counter].birthday != 'undefined'){  if (FrObj[counter].birthday.length == 10) 
			{ 
				//we can get age
				birthyearspec = birthyearspec + 1;
				
				//calc correct age
				FrAge[counter] = ( today.getFullYear() - parseInt(FrObj[counter].birthday.substr(6,4)) ); 
				if ((today.getMonth() + 1) < parseInt(FrObj[counter].birthday.substr(0,2)))
				{
					FrAge[counter] = FrAge[counter] - 1;
				}
				else if ((today.getMonth() + 1) == parseInt(FrObj[counter].birthday.substr(0,2)))
				{
					if ((today.getDate() < parseInt(FrObj[counter].birthday.substr(3,2))))
					{
						FrAge[counter] = FrAge[counter] - 1;	
					}
				}
				
				if (FrAge[counter] > OldestFriends.Age[0])
				{
					OldestFriends.Age[2] = OldestFriends.Age[1];
					OldestFriends.Age[1] = OldestFriends.Age[0];
					OldestFriends.Id[2] = OldestFriends.Id[1];
					OldestFriends.Id[1] = OldestFriends.Id[0];
					OldestFriends.Age[0] = FrAge[counter];
					OldestFriends.Id[0] = counter;
				}
				else if (FrAge[counter] > OldestFriends.Age[1])
				{
					OldestFriends.Age[2] = OldestFriends.Age[1];
					OldestFriends.Id[2] = OldestFriends.Id[1];
					OldestFriends.Age[1] = FrAge[counter];
					OldestFriends.Id[1] = counter;
				}
				else if (FrAge[counter] > OldestFriends.Age[2])
				{
					OldestFriends.Age[2] = FrAge[counter];
					OldestFriends.Id[2] = counter;
				}
				
				if (FrAge[counter] < YoungestFriends.Age[0])
				{
					YoungestFriends.Age[2] = YoungestFriends.Age[1];
					YoungestFriends.Age[1] = YoungestFriends.Age[0];
					YoungestFriends.Id[2] = YoungestFriends.Id[1];
					YoungestFriends.Id[1] = YoungestFriends.Id[0];
					YoungestFriends.Age[0] = FrAge[counter];
					YoungestFriends.Id[0] = counter;
				}
				else if (FrAge[counter] < YoungestFriends.Age[1])
				{
					YoungestFriends.Age[2] = YoungestFriends.Age[1];
					YoungestFriends.Id[2] = YoungestFriends.Id[1];
					YoungestFriends.Age[1] = FrAge[counter];
					YoungestFriends.Id[1] = counter;
				}
				else if (FrAge[counter] < YoungestFriends.Age[2])
				{
					YoungestFriends.Age[2] = FrAge[counter];
					YoungestFriends.Id[2] = counter;
				}
			
				numofage[FrAge[counter]] = numofage[FrAge[counter]] + 1;
				if (numofage[FrAge[counter]] > highestnum) { highestnum = numofage[FrAge[counter]];}
				//div_agebars.innerHTML+=FrObj[counter].name + FrAge[counter] + "<br>";
			}}
		}
		
		if(birthyearspec==0)
		{
			div_agebars.innerHTML+="<br>Not enough friends specified their date of birth to display this graph.";
			return;
		}
		//we now have the frequency of ages in numofage[0-199]
		//also, the specific age per person in FrAge[0-FrObj.length - 1]
		div_agebars.innerHTML+="Of all your Facebook friends " + birthyearspec + " specified their full date of birth.";
		
		// average
		for (counter=0;counter<100;counter=counter+1){totalforavg = totalforavg + numofage[counter] * counter}
		div_agebars.innerHTML+="<br>The average age of your friends is " + (totalforavg / birthyearspec).toFixed(1) + ".";
				
		/*
		//first 10-40 bar
		agebarstr = "https://chart.googleapis.com/chart?chxt=x,x,y&chxl=1:||Age (10-40)|&cht=bvs&chco=76A4FB&chs=600x200&chbh=16,1&chd=t:";
		agebarstr+= (100 * numofage[10] / highestnum).toFixed(2);
		for (counter=11;counter<=40;counter=counter+1){	agebarstr += "," + (100 * numofage[counter] / highestnum).toFixed(2);};
		agebarstr+="&chxr=0,10,40|2,0," + highestnum;
		div_agebars.innerHTML+="<br><br><img src=\"" + agebarstr + "\">";*/
			
		//now 0-80
		agebarstr = "https://chart.googleapis.com/chart?chxt=x,x,y&chf=bg,s,00000000&chxl=1:|||||Age|0:|%23 of people|&cht=bvs&chco=76A4FB&chs=720x200&chbh=7,1&chd=t:";
		agebarstr+= (100 * numofage[11] / highestnum).toFixed(2);
		for (counter=6;counter<90;counter=counter+1){	agebarstr += "," + (100 * numofage[counter] / highestnum).toFixed(2);};
		agebarstr+="&chxr=0,5,91,5|2,0," + highestnum;
		div_agebars.innerHTML+="<br><br><img src=\"" + agebarstr + "\"><br>";
		
	
		var addstr = "";
		addstr+="<div style='width:300px; float: left;'>";
		addstr+="<br>Youngest friends: <br>";
		for (counter=0;counter<3;counter=counter+1){
			addstr+= "<img src='" + FrObj[YoungestFriends.Id[counter]].picture.data.url + "' style='width:50; float:left; margin:8px;'>";
			addstr+= "<br>" + FrObj[YoungestFriends.Id[counter]].name + "<br>" + YoungestFriends.Age[counter] + " years old";
			addstr+="<br style='clear: both;'>";
		}

		addstr+="</div><div style='width:300px; float: left;'>";
		addstr+="<br>Oldest friends: <br>";
		for (counter=0;counter<3;counter=counter+1){
			addstr+= "<img src='" + FrObj[OldestFriends.Id[counter]].picture.data.url + "' style='width:50; float:left; margin:8px;'>";
			addstr+= "<br>" + FrObj[OldestFriends.Id[counter]].name + "<br>" + OldestFriends.Age[counter] + " years old";
			addstr+="<br style='clear: both;'>";
		}
		addstr+="</div><br style='clear: both;'>";
		
		div_agebars.innerHTML+=addstr;
		
		poststrage = "\n* Average age of my friends: " + (totalforavg / birthyearspec).toFixed(1);
	}
	
	function anl_drawfriendsmap()
	{
	
		//div_friendsmap_title.innerHTML+="(can only show a few friends due to fair use limitations of the Google Maps API)<br><br>";
		//div_friendsmap_title.innerHTML+="<br>(Click here for a fullscreen map)<br><br>";
		
				//div_friendsmap_map.style.display="inline"; //show map

		
		for (counter=0;counter<FrObj.length;counter=counter+1)
		{
			if(typeof FrObj[counter].location != 'undefined')
			{	
				if(typeof FrObj[counter].location.name != 'undefined')
				{
					FLO[locnum] = FrObj[counter];
					//div_friendsmap_title.innerHTML+="<br>" + locnum + FLO[locnum].name + " in " + FLO[locnum].location.name;
					locnum++;	
				}
			}
		}
	
		div_friendsmap_title.innerHTML+="Of all your Facebook friends " + locnum + " specified their location.";
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
		


		//div_publishlink.innerHTML+="<br><a href='javascript:onClick=post_aboutapp()'><big><b>Share with your friends now!</b></big></a> Thanks for using!<br><br>";
	
	}
	
	
	function gcandmark(person)
	{
		
		
		numloaded++;
		
		//div_friendsmap_numload.innerHTML+="<br>" + person.name + " in " + person.location.name;
		
		if(typeof person != 'undefined')
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
		FB.api('/me/friends?fields=name,id,gender,birthday,locale,location,relationship_status,picture', function(response) 
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
	
		div_photoinfo.innerHTML+="<br>(loading...)";
	
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
					
					div_photoinfo.innerHTML = div_photoinfo.innerHTML.slice(0,-16);//remove loading msg
					
					if(PhotoObj[0].fql_result_set.length == 0)
					{
						div_photoinfo.innerHTML+="<br>Couldn't find enough photos to make a ranking.";	
						return;
					}
					
					div_photoinfo.innerHTML+="These are the photos uploaded by you or with your tag in it, ranked by most comments and likes.<br><br>";						
					
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
									//div_wallposters.innerHTML+= "<br>" + topnamestr[abc] + " " + FrObj[counter].name + "SDFSD";
								}
								
								chck=0;
								
							}
						}
						
						//if(abc==0){if(highestpostnum==0){div_wallposters.innerHTML="<br><br><br><b>Your friends by posts on your wall</b><br>Oops.. I think there's not enough posts on your wall to make a ranking!<br><br><br><br><br>";}}
						if(highestinteractsnum>0){
												
							div_photoinfo.innerHTML+= "<table><tr><td>" + (abc+1) + ". </td><td>" +	"<a href=\"" + PhotoObj[0].fql_result_set[topobject_id[abc]].link + "\"><img height=\"100\" src=\"" + PhotoObj[0].fql_result_set[topobject_id[abc]].images[2].source + "\"></a>" +
							"</td><td><img src='msgicon.png' class='smallicon'>" + PhotoObj[0].fql_result_set[topobject_id[abc]].cmts + " comments<br><img src='likeicon.png' class='smallicon'>" + PhotoObj[0].fql_result_set[topobject_id[abc]].likes + " likes" +
							"</td></tr></table>";				
										
						}
						highestinteractsnum = 0;
					}
			

					}
			
		
					
			);
			
	}
	
	function anl_showpopularlikes()
	{
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

			div_popularmovies.innerHTML+="<br><br>Your friends' favorite movies:<br>";
			
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
				addstr = "";
				addstr+="<div style='width:700; height:30; position:absolute; margin:6;'>&nbsp" + MoviesArray[itemnum] + " (" + MoviesLikesCountArray[itemnum] + " likes)" + "</div><span style='background-color:#C2DFFF; height:30; margin:3;'>";
				for(k=0;k<MoviesLikesCountArray[itemnum];k=k+1){addstr+="&nbsp&nbsp";}
				addstr+="</span><br>";
				div_popularmovies.innerHTML+=addstr;
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
				addstr = "";
				addstr+="<div style='width:700; height:30; position:absolute; margin:6;'>&nbsp" + TvShowsArray[itemnum] + " (" + TvShowsLikesCountArray[itemnum] + " likes)" + "</div><span style='background-color:#C2DFFF; height:30; margin:3;'>";
				for(k=0;k<TvShowsLikesCountArray[itemnum];k=k+1){addstr+="&nbsp&nbsp";}
				addstr+="</span><br>";
				div_populartvshows.innerHTML+=addstr;
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

				addstr = "";
				addstr+="<div style='width:700; height:30; position:absolute; margin:6;'>&nbsp" + MusicArray[itemnum] + " (" + MusicLikesCountArray[itemnum] + " likes)" + "</div><span style='background-color:#C2DFFF; height:30; margin:3;'>";
				for(k=0;k<MusicLikesCountArray[itemnum];k=k+1){addstr+="&nbsp&nbsp";}
				addstr+="</span><br>";
				div_popularmusic.innerHTML+=addstr;
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
			
				if(!itemnum){div_popularbooks.innerHTML+= "Oops! Not enough friends specified their book preferences."; break;}

				addstr = "";
				addstr+="<div style='width:700; height:30; position:absolute; margin:6;'>&nbsp" + BooksArray[itemnum] + " (" + BooksLikesCountArray[itemnum] + " likes)" + "</div><span style='background-color:#C2DFFF; height:30; margin:3;'>";
				for(k=0;k<BooksLikesCountArray[itemnum];k=k+1){addstr+="&nbsp&nbsp";}
				addstr+="</span><br>";
				div_popularbooks.innerHTML+=addstr;
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
				
				if(!itemnum){div_popularfirstnames.innerHTML+= "Oops! Didn't find enough friends to do this.";break;}

				addstr = "";
				addstr+="<div style='width:700; height:30; position:absolute; margin:6;'>&nbsp" + FirstNamesArray[itemnum] + " (" + FirstNamesLikesCountArray[itemnum] + " friends)" + "</div><span style='background-color:#C2DFFF; height:30; margin:3;'>";
				for(k=0;k<FirstNamesLikesCountArray[itemnum];k=k+1){addstr+="&nbsp&nbsp";}
				addstr+="</span><br>";
				div_popularfirstnames.innerHTML+=addstr;
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
		anl_showwallposters();
		anl_showwallposts();
		anl_showphotoinfo();
		anl_showjoindateinfo();
		anl_drawfriendsmap();
		anl_showpopularlikes();
		showpublishlink();
		//thanks.innerHTML+="<br><br><b>Thanks for using!</b><br><br><img src=\"fonz.jpg\">";
		FB.Canvas.setAutoGrow();
		//setTimeout("FB.Canvas.setAutoGrow();", 15000);
	}
	
	div_statusupdates.style.display='none';//hide status updates because it don't work so well
	FB.getLoginStatus(function(response) { MeObj = response; getfrinfo(); getmypic(); }); //wait until ready, then do getfrinfo
	//setTimeout("FB.Canvas.setAutoGrow();", 6000);
	
