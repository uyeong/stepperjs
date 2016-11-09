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
    duration: 300,
    easing: linear,
    start: () => ... ,
    doing: (n) => ... ,
    ended: () => ...
});
```

for Browser

```html
<script type="text/javascript" src="stepperjs.browser-0.0.0.min.js"></script></head>
```

```js
var stepper = new Stepper();

stepper.start({
    duration: 300,
    easing: Stepper.easings.linear,
    start: function () { ... } ,
    doing: function (n) { ... } ,
    ended: function () { ... }
});
```

## Supported browsers

 - Latest Firefox
 - Latest Chrome
 - Latest Safari
 - IE8 through latest

## License

MIT
