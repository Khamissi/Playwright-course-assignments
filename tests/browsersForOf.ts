const browsers = ["Chrome", "Firefox", "WebKit"];

for (const browser of browsers) {
    if (browser === browsers[browsers.length - 1]) {
        console.log(`Last browser is ${browser}`);
    }
}