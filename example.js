const getFastestUrl = require('./src/index.js');

(async () => {
  const { url, elapsedMS } = await getFastestUrl([
    'https://www.reddit.com/user/ScottRatigan/m/js_lounge/',
    'https://news.ycombinator.com/',
    'https://www.twitter.com'
  ])
  console.log(`The fastest url was ${url} responding in ${elapsedMS} ms.`)
  process.exit(0)
})()
