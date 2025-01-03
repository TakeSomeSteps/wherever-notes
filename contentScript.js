chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelection') {
    sendResponse({ selectedText: window.getSelection().toString() });
  } else if (request.action === 'getScrollPosition') {
    sendResponse({ scrollPosition: window.pageYOffset });
  }
});

