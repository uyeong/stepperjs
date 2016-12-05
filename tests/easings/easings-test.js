import easings from '../../src/easings';

describe('Test of the Easing functions.', function() {
    describe('The user should be able to know the current progress by linear', () => {
        it('should be able to know the current progress through linear()', () => {
            assert.equal(easings.linear(.5), .5);
        });
    });

    describe('The user should be able to know the current progress by quad', () => {
        it('should be able to know the current progress through inQuad()', () => {
            assert.equal(easings.inQuad(.5), .25);
        });

        it('should be able to know the current progress through outQuad()', () => {
            assert.equal(easings.outQuad(.5), .75);
        });

        it('should be able to know the current progress through inOutQuad()', () => {
            assert.equal(easings.inOutQuad(.5), .5);
            assert.equal(easings.inOutQuad(.25), .125);
        });
    });

    describe('The user should be able to know the current progress by cube', () => {
        it('should be able to know the current progress through inCube()', () => {
            assert.equal(easings.inCube(.5), .125);
        });

        it('should be able to know the current progress through outCube()', () => {
            assert.equal(easings.outCube(.5), .875);
        });

        it('should be able to know the current progress through inOutCube()', () => {
            assert.equal(easings.inOutCube(.5), .5);
            assert.equal(easings.inOutCube(.25), .0625);
        });
    });

    describe('The user should be able to know the current progress by quart', () => {
        it('should be able to know the current progress through inQuart()', () => {
            assert.equal(easings.inQuart(.5), .0625);
        });

        it('should be able to know the current progress through outQuart()', () => {
            assert.equal(easings.outQuart(.5), .9375);
        });

        it('should be able to know the current progress through inOutQuart()', () => {
            assert.equal(easings.inOutQuart(.5), .5);
            assert.equal(easings.inOutQuart(.25), .03125);
        });
    });

    describe('The user should be able to know the current progress by qunit', () => {
        it('should be able to know the current progress through inQunit()', () => {
            assert.equal(easings.inQunit(.5), .03125);
        });

        it('should be able to know the current progress through outQunit()', () => {
            assert.equal(easings.outQunit(.5), .96875);
        });

        it('should be able to know the current progress through inOutQunit()', () => {
            assert.equal(easings.inOutQunit(.5), .5);
            assert.equal(easings.inOutQunit(.25), .015625);
        });
    });

    describe('The user should be able to know the current progress by sine', () => {
        it('should be able to know the current progress through inSine()', () => {
            assert.equal(easings.inSine(.5).toFixed(2), .29);
        });

        it('should be able to know the current progress through outSine()', () => {
            assert.equal(easings.outSine(.5).toFixed(2), .71);
        });

        it('should be able to know the current progress through inOutSine()', () => {
            assert.equal(easings.inOutSine(.5).toFixed(2), '0.50');
            assert.equal(easings.inOutSine(.25).toFixed(2), .15);
        });
    });

    describe('The user should be able to know the current progress by expo', () => {
        it('should be able to know the current progress through inExpo()', () => {
            assert.equal(easings.inExpo(0), 0);
            assert.equal(easings.inExpo(.5).toFixed(2), .03);
        });

        it('should be able to know the current progress through outExpo()', () => {
            assert.equal(easings.outExpo(1), 1);
            assert.equal(easings.outExpo(.5).toFixed(2), .97);
        });

        it('should be able to know the current progress through inOutExpo()', () => {
            assert.equal(easings.inOutExpo(0), 0);
            assert.equal(easings.inOutExpo(1), 1);
            assert.equal(easings.inOutExpo(.25).toFixed(2), .02);
            assert.equal(easings.inOutExpo(.5), .5);
        });
    });

    describe('The user should be able to know the current progress by circ', () => {
        it('should be able to know the current progress through inCirc()', () => {
            assert.equal(easings.inCirc(.5).toFixed(2), .13);
        });

        it('should be able to know the current progress through outCirc()', () => {
            let v = .5;

            assert.equal(easings.outCirc(.5).toFixed(2), .87);
        });

        it('should be able to know the current progress through inOutCirc()', () => {
            assert.equal(easings.inOutCirc(.25).toFixed(2), .07);
            assert.equal(easings.inOutCirc(.6).toFixed(2), '0.80');
        });
    });

    describe('The user should be able to know the current progress by back', () => {
        it('should be able to know the current progress through inBack()', () => {
            assert.equal(easings.inBack(.75).toFixed(2), .18);
        });

        it('should be able to know the current progress through outBack()', () => {
            assert.equal(easings.outBack(.75).toFixed(2), 1.06);
        });

        it('should be able to know the current progress through inOutBack()', () => {
            assert.equal(easings.inOutBack(.25).toFixed(2), -.10);
            assert.equal(easings.inOutBack(.75).toFixed(2), 1.10);
        });
    });

    describe('The user should be able to know the current progress by bounce', () => {
        it('should be able to know the current progress through inBounce()', () => {
            assert.equal(easings.inBounce(.75).toFixed(2), .53);
        });

        it('should be able to know the current progress through outBounce()', () => {
            assert.equal(easings.outBounce(.1).toFixed(2), .08);
            assert.equal(easings.outBounce(.25).toFixed(2), .47);
            assert.equal(easings.outBounce(.75).toFixed(2), .97);
            assert.equal(easings.outBounce(.99).toFixed(2), .99);
        });

        it('should be able to know the current progress through inOutBounce()', () => {
            assert.equal(easings.inOutBounce(.25).toFixed(2), .12);
            assert.equal(easings.inOutBounce(.75).toFixed(2), .88);
        });
    });

    describe('The user should be able to know the current progress by elastic', () => {
        it('should be able to know the current progress through inElastic()', () => {
            assert.equal(easings.inElastic(0), 0);
            assert.equal(easings.inElastic(1), 1);
            assert.equal(easings.inElastic(.75).toFixed(3), -.125);
            assert.equal(easings.inElastic(.1).toFixed(2), '0.00');
        });

        it('should be able to know the current progress through outElastic()', () => {
            assert.equal(easings.outElastic(0), 0);
            assert.equal(easings.outElastic(1), 1);
            assert.equal(easings.outElastic(.75).toFixed(2), '1.00');
        });

        it('should be able to know the current progress through inOutElastic()', () => {
            assert.equal(easings.inOutElastic(0), 0);
            assert.equal(easings.inOutElastic(1), 1);
            assert.equal(easings.inOutElastic(.25).toFixed(2), '0.00');
            assert.equal(easings.inOutElastic(.75).toFixed(2), '1.00');
        });
    });
});
