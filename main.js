// nocontext hotlink bookmarklet - master file
// coded by /u/iGGNoRe

(function(){
	
	alert("Please update your bookmarklet URL to use the following instead:\n\nhttps://cdn.rawgit.com/iGGNoRe/shareddit/master/main.js\n\nThis alert will stay active for a day or so.");

	if (document.URL.split('?')[0] === 'http://www.reddit.com/submit'){
			
		var url = document.getElementById('url');
		url.value = url.value.substr(0, url.value.length - 8);
		
	} else {

		main();
		checkDocumentHeight(main);

	}
		
	function main(){
			
		var entries = document.getElementsByClassName('entry');
		generateXPosts(entries);

		var comments = document.getElementsByClassName('comment');
		generateShareDrops(comments);
	
	};

	function checkDocumentHeight(callback){
	    var lastHeight = document.body.clientHeight, newHeight, timer;
	    
	    (function run(){
	        newHeight = document.body.clientHeight;
	        if( lastHeight != newHeight )
	            callback();
	        lastHeight = newHeight;
	        timer = setTimeout(run, 200);
	    })();
	
	};

	function generateShareDrops(comments){

		for (var i = comments.length - 1; i >= 0; i--) {

			if (!comments[i].classList.contains('shareddit')){

				id = comments[i].getAttribute('data-fullname');

				var drop = document.createElement('select');
				
				drop.name = id;
				drop.onchange = shareddit;
				drop.innerHTML = "<option value='' selected>-- Select Destination --</option> \
									<option value='bestof'>/r/bestof</option> \
									<option value='nocontext'>/r/nocontext</option> \
									<option value='retiredgif'>/r/retiredgif</option>";

				comments[i].querySelector('ul').appendChild(drop);

				comments[i].className = comments[i].className + " shareddit";

			};
			
		};

	};

	function generateXPosts(entries) {

		for (var i = entries.length - 1; i >= 0; i--) {

			if (!entries[i].classList.contains('shareddit') && !entries[i].getElementsByClassName('sponsored-tagline').length && entries[i].getElementsByClassName('title').length){

				var listingTitle = entries[i].getElementsByTagName('a')[0].innerHTML;
				var listingLink = entries[i].getElementsByTagName('a')[0].getAttribute('href');

				if (listingLink.split('/')[1] === 'r') {
					listingLink = "http://www.reddit.com" + listingLink;
				};

				listingLink = encodeURIComponent(listingLink);

				var listingSub = entries[i].getElementsByClassName('comments')[0].getAttribute("href").split('/');
	        
				listingSub = "/r/" + listingSub[listingSub.indexOf('r') + 1];

	            listingTitle = encodeURIComponent(listingTitle + " (x-post " + listingSub + ")");

	            var postID = new Array(8).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 7);
	            var xPost = "<li><a href=\"http://www.reddit.com/submit?title=" + listingTitle + "&url=" + listingLink + "/?" + postID + "\">x-post this link</a></li>";

				entries[i].getElementsByClassName('flat-list')[0].innerHTML = entries[i].getElementsByClassName('flat-list')[0].innerHTML + xPost;
				entries[i].className = entries[i].className + " shareddit";

			};
			
		};

	};

	function shareddit(){ 

		var comm = document.getElementsByClassName('id-' + this.name);
		comm = comm[0]; 

		var permalink = comm.getElementsByClassName('bylink')[0].getAttribute('href');
		permalink = permalink.replace('www.', 'np.');
		
		var title = comm.getElementsByClassName('md')[0].textContent;
		title = encodeURIComponent(title);
		
		var user = '/u/' + comm.getElementsByClassName('author')[0].textContent;
		
		if (this.value === '') {

			return false;
		
		} else if(this.value === 'bestof'){
		
			title = user + ' [DESCRIPTION]';
	        title = encodeURI(title);
			sub = 'bestof';
		
		} else if(this.value === 'nocontext'){
		
			sub = 'nocontext';
		
		} else if(this.value === 'retiredgif'){
		
			title = user + ' retires [GIF]';
			title = encodeURI(title);
			sub = 'retiredgif';

		}

		var context = prompt('How many parent comments to include for context?', 1); 
		if (context < 0 || context == '' || context == null) {
		
			context = 0;
	    
	    }
		
		var dest = 'http://www.reddit.com/r/' + sub + '/submit?title=' + title + '&url=' + permalink + '?context=' + context;
		window.location = dest; 
		
	};

})();
