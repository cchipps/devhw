// JavaScript Document
$(function(){
		
    $('#loading').html('<div class="center-block"><h3 class="text-center text-muted"><center>Loading...</center></h3></div>');
  
    var requrl = "http://www.reddit.com/r/business/";    
    var fullurl = requrl + ".json";
	var index_start = 0; //1st 4 items
	var index_end = 4; //1st 4 items
	var upbtn	   = $('#up-btn');
	var downbtn	   = $('#down-btn');
	
	$.getJSON(fullurl, function(json){
		
	  var listing = json.data.children;
	  
	  $items = [];
	  $.each(listing, function( key, val ) {
		
		var obj 	  = val.data;	
		var votes     = obj.score;
		var title     = obj.title;
		var subtime   = obj.created_utc;
		var thumb     = obj.thumbnail;
		var num_comments  = obj.num_comments;
		var author 	  = obj.author;
		var subrdt    = "/r/"+obj.subreddit;
		var redditurl = "http://www.reddit.com"+obj.permalink;
		var subrdturl = "http://www.reddit.com/r/"+obj.subreddit+"/";
		var exturl    = obj.url;	
    	var timeago = timeSince(subtime);
		
		var html = '<div class="panel panel-default shadow">\n';
		html += '<div class="panel-body">';
		html += '<h2>'+title+'</h2>\n';
		html += '<p class="color-grey">posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a> '+timeago+'</p>';
		html += '</div>\n <div class="panel-footer">';
		html += '<p class="color-light-blue pull-left">'+num_comments+' comments</p>';
		html += '<p class="color-grey pull-right">Submitted by '+author+'comments</p>';
		html += '</div>\n </div>\n';		  
		$items.push(html);
	  });
	  
	  index_total = $items.length;
	
  	  outputH($items.slice( 0, 4 ));//initialize

  }); //end getJSON()

function outputH(html) {    
    $('#loading').html(html);
    //console.log(html);
}

//cancel button  
upbtn.on('click', function() {		        
	if (index_start > 0){
	  $('#loading').fadeOut(function(){
		  
			index_start = index_start-5;
			//console.log("start "+index_start);
			index_end = index_end-5;
			//console.log("end "+index_end);			
			outputH($items.slice( index_start, index_end ));		
			  
	  }).fadeIn();//reload content into dom	
	}	
});

downbtn.on('click', function() {
	if (index_end < index_total){		        
	  $('#loading').fadeOut(function(){
		  
			index_start = index_start+5;
			//console.log("start "+index_start);
			index_end = index_end+5;
			//console.log("end "+index_end);			
			outputH($items.slice( index_start, index_end ));		
			  
	  }).fadeIn();//reload content into dom	
	}	
});

});

/**
   * Return time since link was posted
   * https://stackoverflow.com/a/3177838/477958
  **/
  function timeSince(date) {
    var seconds = Math.floor(((new Date().getTime()/1000) - date))

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      if(interval == 1) return interval + " year ago";
      else 
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      if(interval == 1) return interval + " month ago";
      else
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      if(interval == 1) return interval + " day ago";
      else
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      if(interval == 1) return interval + " hour ago";
      else
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      if(interval == 1) return interval + " minute ago";
      else
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }