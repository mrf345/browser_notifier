# browser_notifier
overlay notifier if specific browser is not used

### Setup:
```JavaScript
var BN = browserNotifier({
    browser: 'Firefox', // browser to notify if not used
    iconClass: 'fa-firefox'
}, onload=function () {
    console.log('when overlay loads')
}, callback=function () {
    console.log('when overlay gets removed')
})
```

Var | Desc
---------|----------
`localStorage.browserNotifier` | if occupied `BN.__init__()` will be escaped
 `BN.__init__()` | Append overlay to the body and fade-in
 `BN.__exit__()` | Fade-out the overlay and remove it
 