# Get Fastest Url
### Test the speed of server endpoints
Returns the fastest endpoint, given an array of urls.

## Installation

`npm install`

## Testing

`npm t`

## Example

```javascript

const getFastestUrl = require('get-fastest-url');

(async () => {
  const { url, elapsedMS } = await getFastestUrl([
    'https://www.reddit.com/user/ScottRatigan/m/js_lounge/',
    'https://news.ycombinator.com/',
    'https://www.twitter.com'
  ])
  console.log(`The fastest url was ${url} responding in ${elapsedMS} ms.`)
})()

```

Produces the following output:
```
The fastest url was https://www.cnn.com responding in 104.397 ms.
```

## Example with Custom Timeout (ms)

```javascript

const getFastestUrl = require('get-fastest-url')
const fetchTimeoutMS = 2000

(async () => {
  const { url, elapsedMS } = await getFastestUrl([
    'https://www.reddit.com/user/ScottRatigan/m/js_lounge/',
    'https://news.ycombinator.com/',
    'https://www.twitter.com'
  ], fetchTimeoutMS)
  console.log(`The fastest url was ${url} responding in ${elapsedMS} ms.`)
})()

```

## Notes

If no endpoint responds before the timeout, url defaults to the first in the array.