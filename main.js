// nocontext hotlink - master file
// coded by /u/iGGNoRe

(function () {

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

    var comm = $('.id-' + this.name)[0];

    var permalink = comm.getElementsByClassName('bylink')[0].getAttribute('href');
    permalink = permalink.replace('www.', 'np.');

    var title = comm.getElementsByClassName('md')[0].textContent;
    title = encodeURIComponent(title);

    var user = '/u/' + comm.getElementsByClassName('author')[0].textContent;

    var sub = '';

    if (!this.value) {

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

    } else if (this.value === 'other') {
      sub = prompt('Where would you like to share this?', '/r/');
      sub = sub.split('/');
      sub = sub[sub.length - 1];

      title = user + " said " + title;

      if (!sub.trim().length) {
        return false;
      }
    }

    var context = prompt('How many parent comments to include for context?', 1);
    if (context < 0 || context === '' || context === null) {

      context = 0;

    }

    var dest = '//www.reddit.com/r/' + sub + '/submit?title=' + title + '&url=' + permalink + '?context=' + context;
    window.location = dest;

  }

  function generateShareDrop() {

    var comm = $('.id-' + this.name)[0];
    var id = '';
    var drop = '';

    if (!comm.classList.contains('shareddit-drop')) {

      id = comm.getAttribute('data-fullname');

      drop = document.createElement('select');

      drop.name = id;
      drop.onclick = shareddit;
      drop.innerHTML = "<option value='' selected>-- Select Destination --</option>" +
      "<option value='bestof'>/r/bestof</option>" +
      "<option value='nocontext'>/r/nocontext</option>" +
      "<option value='retiredgif'>/r/retiredgif</option>" +
      "<option value='other'>other...</option>";

      comm.getElementsByClassName('flat-list')[0].appendChild(drop);

      comm.className = comm.className + " shareddit-drop";

      this.remove();

    }

  }

  function generateShareLinks(comments) {
    var i = comments.length - 1;
    var id = '';
    var link = '';
    var listItem = '';

    for (i; i >= 0; i--) {

      if (!comments[i].classList.contains('shareddit')) {

        id = comments[i].getAttribute('data-fullname');

        listItem = document.createElement('li');
        link = document.createElement('a');

        link.name = id;
        link.onclick = generateShareDrop;
        link.href = 'javascript:void(0)';
        link.innerHTML = "shareddit";

        listItem.appendChild(link);

        comments[i].getElementsByClassName('flat-list')[0].appendChild(listItem);

        comments[i].className = comments[i].className + " shareddit";

      }

    }
  }

  function generateXPosts(entries) {

    var i = entries.length - 1;
    var listingTitle = '';
    var listingLink = '';
    var listingSub = '';
    var xPost = '';

    for (i; i >= 0; i--) {

      if (!entries[i].classList.contains('shareddit') && !entries[i].getElementsByClassName('sponsored-tagline').length && entries[i].getElementsByClassName('title').length) {

        listingTitle = entries[i].getElementsByTagName('a')[0].innerHTML;
        listingLink = entries[i].getElementsByTagName('a')[0].getAttribute('href');

        if (listingLink.split('/')[1] === 'r') {
          listingLink = "https://www.reddit.com" + listingLink;
        }

        listingLink = encodeURIComponent(listingLink);

        listingSub = entries[i].getElementsByClassName('comments')[0].getAttribute("href").split('/');

        listingSub = "/r/" + listingSub[listingSub.indexOf('r') + 1];

        listingTitle = encodeURIComponent(listingTitle + " (x-post " + listingSub + ")");

        xPost = "<li><a href=\"//www.reddit.com/submit?title=" + listingTitle + "&url=" + listingLink + "\">x-post</a></li>";

        entries[i].getElementsByClassName('flat-list')[0].innerHTML = entries[i].getElementsByClassName('flat-list')[0].innerHTML + xPost;
        entries[i].className = entries[i].className + " shareddit";

      }

    }

  }

  function main() {

    generateXPosts($('.entry'));

    generateShareLinks($('.comment'));

  }

  var $ = document.querySelectorAll.bind(document);
  main();
  checkDocumentHeight(main);

}());
