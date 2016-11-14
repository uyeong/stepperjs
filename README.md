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

const stepper = new Stepper();

stepper.start({
    duration: 300, // default: 0
    easing: linear, // default: linear
    loop: true, // default: false
    reverse: true, // default: false
    start: () => ... ,
    doing: (n) => ... ,
    paused: () => ... ,
    ended: () => ... ,
    stopped: () => ...
});

stepper.pause();
stepper.stop();
```

for Browser

```html
<script type="text/javascript" src="stepperjs.browser-0.0.2.min.js"></script></head>
```

```js
var stepper = new Stepper();

stepper.start({
    duration: 300,
    easing: Stepper.easings.linear,
    loop: true,
    reverse: true,
    start: function () { ... },
    doing: function (n) { ... },
    paused: function () { ... },
    ended: function () { ... },
    stopped: function () { ... }
});

stepper.pause();
stepper.stop();
```

## Supported browsers

 - Latest Firefox
 - Latest Chrome
 - Latest Safari
 - IE8 through latest

## License

MIT
