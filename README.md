# StepperJS
[![Build Status](https://travis-ci.org/UYEONG/stepperjs.svg?branch=master)](https://travis-ci.org/UYEONG/stepperjs)
[![codecov](https://codecov.io/gh/UYEONG/stepperjs/graph/badge.svg?token=Eg1MUAW9he)](https://codecov.io/gh/UYEONG/stepperjs)


A tiny requestAnimationFrame wrapper to improve usability.  - [Demo](https://uyeong.github.io/stepperjs/)

## Installation

### npm

```bash
$ npm install --save stepperjs
```

### Usage

#### for Babel

```js
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';

const stepper = new Stepper({
    duration: 300, // default: 0
    easing: linear, // default: linear
    loop: true, // default: false
    reverse: true // default: false
}).on({
    start() { ... },
    update(n) { ... },
    paused() { ... },
    ended() { ... },
    stopped() { ... }
});

stepper.start();
```

If you want to change options after creating the object

```js
const stepper = new Stepper();

stepper.option('duration', 500);
stepper.option('easing', linear);
stepper.option('loop', false);
stepper.option('reverse', false);

// or

stepper.option({
    duration: 500,
    easing: linear,
    loop: false,
    reverse: false
});

```

If you want to use multiple easing function.

```js
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import inBack from 'stepperjs/dist/easings/inBack';

const stepper = new Stepper({
    duration: 300,
    easing: [linear, inBack]
}).on({
    update: (n1, n2) => {
        console.log(n1); // value of linear
        console.log(n2); // value of inBack
    }
});

stepper.start();
```

#### for Browser

```html
<script type="text/javascript" src="stepperjs.browser-0.2.1.min.js"></script>
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
