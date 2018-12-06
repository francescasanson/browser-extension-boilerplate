// Listen for messages
browser.runtime.onMessage.addListener(receiver);
const body = document.querySelector("body");

// A message is received
function receiver(request, sender, sendResponse) {
  if (request.active) {
    //do something
    body.classList.toggle("my-beautiful-extension")
  } else {
    //do else
    body.classList.toggle("my-beautiful-extension")
  }
}

var streamSelector = 'div[id^="topnews_main_stream"]';
var storySelector = 'div[id^="hyperfeed_story_id"]';
var sponsoredSelectors = [
  'a[href^="https://www.facebook.com/about/ads"]',
  'a[href^="https://www.facebook.com/ads/about"]',
  'a[href^="/about/ads"]',
  'a[href^="/ads/about"]',
  'a[href*="https://l.facebook.com/l.php"]'
];

var mutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

function block(story) {
  if (!story) {
    return;
  }
  var s = story.querySelector("s");
  if (window.getComputedStyle(s, null).getPropertyValue("display") == "none") {
    story.setAttribute("sponsored","false")
  }else{
  	story.setAttribute("sponsored","true")
  }
}

function process() {
  // Locate the stream every iteration to allow for FB SPA navigation which
  // replaces the stream element
  var stream = document.querySelector(streamSelector);

  if (!stream) {
    return;
  }

  var stories = stream.querySelectorAll(storySelector);
  if (!stories.length) {
    return;
  }

  var i;
  for (i = 0; i < stories.length; i++) {
    block(stories[i]);
  }
}

var observer = new mutationObserver(process);
observer.observe(document.querySelector("body"), {
  childList: true,
  subtree: true
});