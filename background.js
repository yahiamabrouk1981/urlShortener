chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    details.requestHeaders.push({
      name: "Access-Control-Allow-Origin",
      value: "*",
    });
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["http://localhost:5000/*"] },
  ["requestHeaders", "blocking"]
);
