// nocontext hotlink bookmarlet - master file
// coded by /u/iGGNoRe


$.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js", function () {


        // adds drop-down menu to every VISIBLE comment, won't add to comments
        // that are revealed after clicking on "show more" links without
        // using it again
        $(".flat-list:has(a:contains('permalink'))").each(function (index) { 
                
                // checks to stop duplicates
                if($(this).hasClass("shareddit") === false) {
                    var permalink = encodeURIComponent($("a:contains('permalink')", $(this)).get(0)); 
                    permalink = permalink.replace("www.", "np.");
                    var title = $(this).prev().text(); 
                    title = encodeURIComponent(title); 
                    var user = "/u/" + $(this).prev().prev().find("a.author").text();
                    var drop = $("<form name='menuform'> \
                                           <select name='menu1'> \
                                           <option value='' selected>-- Select Destination --</option> \
                                           <option value=''>/r/bestof</option> \
                                           <option value=''>/r/nocontext</option> \
                                           <option value=''>/r/retiredgif</option> \
                                           </select> \
                                           </form>");
                    drop.click(function () {
                        if ($("option:selected", drop).text() === "-- Select Destination --") {
                            return false;
                        } else if ($("option:selected", drop).text() === "/r/bestof") {
                            title = user + " [DESCRIPTION]";
                            title = encodeURI(title);
                            sub = "bestof";
                        } else if ($("option:selected", drop).text() === "/r/nocontext") {
                            sub = "nocontext";
                        } else if ($("option:selected", drop).text() === "/r/retiredgif") {
                            title = user + " retires [GIF]";
                            title = encodeURI(title);
                            sub = "retiredgif";
                        }
                        var context = prompt("How many parent comments to include for context?", 1); 
                        if (context < 0 || context == "" || context == null) {
                            context = 0;
                        }
                        var dest = "http://www.reddit.com/r/" + sub + "/submit?title=" + title + "&url=" + permalink + "?context=" + context; 
                        window.location = dest; 
                    });
                    $(this).append($("<li></li>").append(drop));
                    $(this).addClass("shareddit");
                }

        });

        // adds x-post links to each post on the page
        $(".flat-list").has("a.comments").each(function (index) {
                
                // checks to stop duplicates
                if($(this).hasClass("shareddit") === false) {
                    
                    var listingLink = $(this).prevUntil('div.entry').find("a.title").attr("href");
                    var listingTitle = $(this).prevUntil('div.entry').find("a.title").text();
                    

                    var selfPostCheck = $(this).prevUntil('div.entry').find('a.title').attr("href").split('/');
                    
                    // checks to see if link is a self post and formats url correctly
                    if (selfPostCheck[1] === 'r') {
                        listingLink = "http://www.reddit.com" + listingLink;
                    };

                    listingLink = encodeURIComponent(listingLink);

                    var listingSub = $(this).find("a.comments").attr("href").split('/');
        
                    listingSub = "/r/" + listingSub[listingSub.indexOf('r') + 1];
                    listingTitle = encodeURIComponent(listingTitle + " (x-post " + listingSub + ")");
        
                    //getting the subreddit takes so many lines because "a.subreddit" is not available once you are
                    //inside of a subreddit, so this way it works from /r/all, frontpage, and inside of any subreddit.
        
                    var xPost = $("<li><a href=\"http://www.reddit.com/submit?title=" + listingTitle + "&url=" + listingLink + "/\">x-post this link</a></li>");
        
                    $(this).append("<li class='shareddit'></li>").append(xPost);
                    $(this).addClass("shareddit");
                }
        });

    var jQuery1_4 = $.noConflict(true); // I have no idea what this line does, I assume it's essential...


});
