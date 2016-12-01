"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Status = function () {
    function Status() {
        _classCallCheck(this, Status);

        this.stopped = true;
        this.paused = false;
    }

    _createClass(Status, [{
        key: "play",
        value: function play() {
            this.stopped = false;
            this.paused = false;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.paused = true;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.stopped = true;
        }
    }, {
        key: "isPlaying",
        value: function isPlaying() {
            return !this.stopped && !this.paused;
        }
    }, {
        key: "isPaused",
        value: function isPaused() {
            return this.paused;
        }
    }, {
        key: "isStopped",
        value: function isStopped() {
            return this.stopped;
        }
    }]);

    return Status;
}();

exports.default = Status;