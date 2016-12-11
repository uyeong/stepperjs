# StepperJS

A tiny requestAnimationFrame wrapper to improve usability.  - [Demo](https://uyeong.github.io/stepperjs/)

## Installation

### npm

```bash
$ npm install --save stepperjs
```

### Usage

for Babel

```js
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';

const stepper = new Stepper({
    duration: 300, // default: 0
    easing: linear, // default: linear
    loop: true, // default: false
    reverse: true // default: false
}).on({
    start: () => ... ,
    update: (n) => ... ,
    paused: () => ... ,
    ended: () => ... ,
    stopped: () => ...
});

stepper.start();
```

for Browser

```html
<script type="text/javascript" src="stepperjs.browser-0.1.0.min.js"></script></head>
```

```js
var Stepper = stepperjs.Stepper();
var easings = stepperjs.easings;
var stepper = new Stepper({
    duration: 300,
    easing: easings.linear,
    loop: true,
    reverse: true
}).on({
    start: function () { ... },
    update: function (n) { ... },
    paused: function () { ... },
    ended: function () { ... },
    stopped: function () { ... }
});

stepper.start();
```

## Supported browsers

 - Latest Firefox
 - Latest Chrome
 - Latest Safari
 - IE8 through latest

## License

MIT