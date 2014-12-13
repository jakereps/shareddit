// nocontext hotlink - master file
// coded by /u/iGGNoRe

(function () {
  
  alert('For the latest version please change your url to:\nhttps://cdn.rawgit.com/iGGNoRe/shareddit/20c78dfec461414be8c6067dfe91e91e00f77f8a/main.js');

  function checkDocumentHeight(callback) {
    var lastHeight = document.body.clientHeight, newHeight, timer;

    (function run() {
      newHeight = document.body.clientHeight;
      if (lastHeight !== newHeight) {
        callback();
      }
      lastHeight = newHeight;
      timer = setTimeout(run, 200);
    }());

  }

  function shareddit() {

    var comm = document.getElementsByClassName('id-' + this.name);
    comm = comm[0];

    var permalink = comm.getElementsByClassName('bylink')[0].getAttribute('href');
    permalink = permalink.replace('www.', 'np.');

    var title = comm.getElementsByClassName('md')[0].textContent;
    title = encodeURIComponent(title);

    var user = '/u/' + comm.getElementsByClassName('author')[0].textContent;

    var sub = '';

    if (this.value === '') {

      return false;

    } else if (this.value === 'bestof') {

      title = user + ' [DESCRIPTION]';
      title = encodeURI(title);
      sub = 'bestof';

    } else if (this.value === 'nocontext') {

      sub = 'nocontext';

    } else if (this.value === 'retiredgif') {

      title = user + ' retires [GIF]';
      title = encodeURI(title);
      sub = 'retiredgif';

    }

    var context = prompt('How many parent comments to include for context?', 1);
    if (context < 0 || context === '' || context === null) {

      context = 0;

    }

    var dest = '//www.reddit.com/r/' + sub + '/submit?title=' + title + '&url=' + permalink + '?context=' + context;
    window.location = dest;

  }

  function generateShareDrops(comments) {

    var i = comments.length - 1;
    var id = '';
    var drop = '';

    for (i; i >= 0; i--) {

      if (!comments[i].classList.contains('shareddit')) {

        id = comments[i].getAttribute('data-fullname');

        drop = document.createElement('select');

        drop.name = id;
        drop.onchange = shareddit;
        drop.innerHTML = "<option value='' selected>-- Select Destination --</option> \
                  <option value='bestof'>/r/bestof</option> \
                  <option value='nocontext'>/r/nocontext</option> \
                  <option value='retiredgif'>/r/retiredgif</option>";

        comments[i].getElementsByClassName('flat-list')[0].appendChild(drop);

        comments[i].className = comments[i].className + " shareddit";

      }

    }

  }

  function generateXPosts(entries) {

    var i = entries.length - 1;
    var j = 0;
    var dupeBlock = '/';
    var listingTitle = '';
    var listingLink = '';
    var listingSub = '';
    var postID = [];
    var xPost = '';
    
    for (j = 0; j < Math.floor((Math.random() + 1) * 3); j++) {
          dupeBlock = dupeBlock + '/';
    }

    for (i; i >= 0; i--) {

      if (!entries[i].classList.contains('shareddit') && !entries[i].getElementsByClassName('sponsored-tagline').length && entries[i].getElementsByClassName('title').length) {

        listingTitle = entries[i].getElementsByTagName('a')[0].innerHTML;
        listingLink = entries[i].getElementsByTagName('a')[0].getAttribute('href');

        if (listingLink.split('/')[1] === 'r') {
          if (document.URL.split(':')[0] === 'https') {
            listingLink = "https://www.reddit.com" + listingLink;
          } else {
            listingLink = "http://www.reddit.com" + listingLink;
          }
        }

        listingLink = encodeURIComponent(listingLink);

        listingSub = entries[i].getElementsByClassName('comments')[0].getAttribute("href").split('/');

        listingSub = "/r/" + listingSub[listingSub.indexOf('r') + 1];

        listingTitle = encodeURIComponent(listingTitle + " (x-post " + listingSub + ")");
        
        xPost = "<li><a href=\"//www.reddit.com/submit?title=" + listingTitle + "&url=" + listingLink + "/" + dupeBlock + "\">x-post this link</a></li>";

        entries[i].getElementsByClassName('flat-list')[0].innerHTML = entries[i].getElementsByClassName('flat-list')[0].innerHTML + xPost;
        entries[i].className = entries[i].className + " shareddit";

      }

    }

  }

  function main() {

    var entries = document.getElementsByClassName('entry');
    generateXPosts(entries);

    var comments = document.getElementsByClassName('comment');
    generateShareDrops(comments);

  }

    main();
    checkDocumentHeight(main);

}());
