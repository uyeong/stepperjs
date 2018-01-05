import createStub from 'raf-stub/lib';
import Stepper from '../src/Stepper';
import linear from '../src/easings/linear';
import inBack from '../src/easings/inBack';

describe('Test of the Stepper Class.', function() {
    beforeEach(() => {
        this.rafStub = createStub();

        sinon.stub(window, 'requestAnimationFrame').callsFake(this.rafStub.add);
        sinon.stub(window, 'cancelAnimationFrame').callsFake(this.rafStub.remove);
    });

    afterEach(() => {
        window.requestAnimationFrame.restore();
        window.cancelAnimationFrame.restore();
    });

    describe('The user should be able to make new instance of Stepper class.', () => {
        it('should be made new instance.', () => {
            // Given
            // When
            const stepper = new Stepper();

            // Then
            assert.isObject(stepper);
            assert.instanceOf(stepper, Stepper);
        });

        it('should be made new instance with default option as option value is omit.', () => {
            // Given
            // When
            const stepper = new Stepper();

            // Then
            assert.strictEqual(stepper.option('duration'), 0);
            assert.equal(stepper.option('easing'), linear);
            assert.isFalse(stepper.option('loop'));
            assert.isFalse(stepper.option('reverse'));
        });

        it('should be made new instance with passed option as option value is passed.', () => {
            // Given
            const options = {
                duration: 300,
                easing: inBack,
                loop: true,
                reverse: true
            };

            // When
            const stepper = new Stepper(options);

            // Then
            assert.equal(stepper.option('duration'), 300);
            assert.equal(stepper.option('easing'), inBack);
            assert.isTrue(stepper.option('loop'));
            assert.isTrue(stepper.option('reverse'));
        });
    });

    describe('The user should be able to change option values of stepper object.', () => {
        it('should be changed separate option value.', () => {
            // Given
            const stepper = new Stepper({
                duration: 300,
                easing: inBack,
                loop: true,
                reverse: true
            });

            // When
            stepper.option('duration', 500);
            stepper.option('easing', linear);
            stepper.option('loop', false);
            stepper.option('reverse', false);

            // Then
            assert.equal(stepper.option('duration'), 500);
            assert.equal(stepper.option('easing'), linear);
            assert.isFalse(stepper.option('loop'));
            assert.isFalse(stepper.option('reverse'));
        });

        it('should be changed option values at a time.', () => {
            // Given
            const stepper = new Stepper();

            // When
            stepper.option({
                duration: 300,
                easing: inBack,
                loop: true,
                reverse: true
            });

            // Then
            assert.equal(stepper.option('duration'), 300);
            assert.equal(stepper.option('easing'), inBack);
            assert.isTrue(stepper.option('loop'));
            assert.isTrue(stepper.option('reverse'));
        });
    });

    describe('The user should be able to attach event listener with on method', () => {
        it('should be attached event listener as passed event name and listener.', () => {
            // Given
            const onStart = sinon.spy();
            const onUpdate = sinon.spy();
            const stepper = new Stepper();

            // When
            stepper.on('start', onStart);
            stepper.on('update', onUpdate);

            stepper.emitter.emit('start');
            stepper.emitter.emit('update');

            // Then
            assert.isTrue(onStart.called);
            assert.isTrue(onUpdate.called);
        });

        it('should be attached event listeners at a time as passed object that consist of event name and listner.', () => {
            // Given
            const onStart = sinon.spy();
            const onUpdate = sinon.spy();
            const stepper = new Stepper();

            // When
            stepper.on({
                start: onStart,
                update: onUpdate
            });

            stepper.emitter.emit('start');
            stepper.emitter.emit('update');

            // Then
            assert.isTrue(onStart.called);
            assert.isTrue(onUpdate.called);
        });
    });

    describe('The user should be able to attach event listener with once method', () => {
        it('should be attached event listener as passed event name and listener.', () => {
          // Given
          const onStart = sinon.spy();
          const onUpdate = sinon.spy();
          const stepper = new Stepper();

          // When
          stepper.once('start', onStart);
          stepper.once('update', onUpdate);

          stepper.emitter.emit('start');
          stepper.emitter.emit('update');

          // Then
          assert.isTrue(onStart.called);
          assert.isTrue(onUpdate.called);
        });

      it('should be attached event listeners at a time as passed object that consist of event name and listner.', () => {
        // Given
        const onStart = sinon.spy();
        const onUpdate = sinon.spy();
        const stepper = new Stepper();

        // When
        stepper.once({
          start: onStart,
          update: onUpdate
        });

        stepper.emitter.emit('start');
        stepper.emitter.emit('update');

        // Then
        assert.isTrue(onStart.called);
        assert.isTrue(onUpdate.called);
      });

      it('should be detached after function call', () => {
        // Given
        const onStart = sinon.spy();
        const onUpdate = sinon.spy();
        const stepper = new Stepper();

        // When
        stepper.once({
          start: onStart,
          update: onUpdate
        });

        stepper.emitter.emit('start');
        stepper.emitter.emit('start');
        stepper.emitter.emit('update');
        stepper.emitter.emit('update');

        // Then
        assert.equal(onStart.callCount, 1);
        assert.equal(onUpdate.callCount, 1);
      });
    });

    describe('The user should be able to detach event listener with off method.', () => {
        it('should be detached event listener as passed event name and listner.', () => {
            // Given
            const onStart = sinon.spy();
            const onUpdate = sinon.spy();
            const stepper = new Stepper();

            stepper.on('start', onStart);
            stepper.on('update', onUpdate);

            // When
            stepper.off('start', onStart);
            stepper.off('update', onUpdate);

            stepper.emitter.emit('start');
            stepper.emitter.emit('update');

            // Then
            assert.isFalse(onStart.called);
            assert.isFalse(onUpdate.called);
        });

        it('should be detached all event listener as no arguments', () => {
            // Given
            const onStart = sinon.spy();
            const onUpdate = sinon.spy();
            const stepper = new Stepper();

            stepper.on('start', onStart);
            stepper.on('update', onUpdate);

            // When
            stepper.off();

            stepper.emitter.emit('start');
            stepper.emitter.emit('update');

            // Then
            assert.isFalse(onStart.called);
            assert.isFalse(onUpdate.called);
        });
    });

    describe('The user should be able to start progress calculation with start method..', () => {
        it('should fire start event, when progress calculation is started.', () => {
            // Given
            const onStart = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('start', onStart);

            // When
            stepper.start();

            // Then
            assert.isTrue(onStart.called);
        });

        it('should start progress calculation, only that duration is more than 1.', () => {
            // Given
            const onStart2 = sinon.spy();
            const onStart1 = sinon.spy();
            const stepper1 = new Stepper(); // Default duration is 0
            const stepper2 = new Stepper({duration: 0});

            stepper1.on('start', onStart1);
            stepper2.on('start', onStart2);

            // When
            stepper1.start();
            stepper2.start();

            // Then
            assert.isFalse(onStart1.called);
            assert.isFalse(onStart2.called);
        });

        it('should start progress calculation, only that calculation is not processing.', () => {
            // Given
            const onStart = sinon.spy();
            const stepper = new Stepper({
                duration: 300
            });

            stepper.on('start', onStart);

            // When
            stepper.start();
            stepper.start();

            // Then
            assert.isTrue(onStart.called);
            assert.strictEqual(onStart.callCount, 1);
        });

        it('should fire update event with current value of progress whenever value of progress is changed.', () => {
            // Given
            const onUpdate = sinon.spy();
            const stepper = new Stepper({
                duration: 300,
                easing: inBack
            });

            stepper.on('update', onUpdate);

            // When
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            // Then
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), inBack(250 / 300).toFixed(2));
        });

        it('should fire update event with each current value as  multiple easing functions are passed to array', () => {
            // Given
            const onUpdate = sinon.spy();
            const stepper = new Stepper({
                duration: 300,
                easing: [linear, inBack]
            });

            stepper.on('update', onUpdate);

            // When
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            // Then
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), '0.83');
            assert.strictEqual(onUpdate.args[0][1], 0);
            assert.strictEqual(onUpdate.args[1][1].toFixed(2), inBack(250 / 300).toFixed(2));
        });

        it('should calculate backwards, if value of reverse option is true.', () => {
            // Given
            const onUpdate = sinon.spy();
            const stepper = new Stepper({
                duration: 300,
                easing: inBack,
                reverse: true
            });

            stepper.on('update', onUpdate);

            // When
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            // Then
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 1);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), (1 - inBack(250 / 300)).toFixed(2));
        });

        it('should repeat progress calculation, if loop option is true.', () => {
            const onUpdate = sinon.spy();
            const onEneded = sinon.spy();
            const stepper = new Stepper({
                duration: 300,
                loop: true
            });

            stepper.on({
                update: onUpdate,
                done: onEneded
            });

            // When
            stepper.start();

            // First time
            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);
            this.rafStub.step(1, 51); // After a total 301 millisecond.

            // Second time
            this.rafStub.step(1, 0);
            this.rafStub.step(1, 150);

            // Then
            assert.isTrue(onUpdate.called);
            assert.isFalse(onEneded.called);
            assert.strictEqual(onUpdate.callCount, 5);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), linear(250 / 300).toFixed(2));
            assert.strictEqual(onUpdate.args[2][0].toFixed(2), '1.00');
            assert.strictEqual(onUpdate.args[3][0], 0);
            assert.strictEqual(onUpdate.args[4][0].toFixed(2), linear(150 / 300).toFixed(2));
        });

        it('should fire done event, if progress calculation is finished.', () => {
            // Given
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('done', onEnded);

            // When
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 301);

            // Then
            assert.isTrue(onEnded.called);
        });

        it('should not fire update event, if progress calculation is finished.', () => {
            // Given
            const onUpdate = sinon.spy();
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('update', onUpdate);
            stepper.on('done', onEnded);

            // When
            stepper.start();

            // First time
            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);
            this.rafStub.step(1, 301);

            // Second time
            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            // Then
            assert.strictEqual(onUpdate.callCount, 3);
            assert.strictEqual(onEnded.callCount, 1);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), linear(250 / 300).toFixed(2));
        });
    });

    describe('The user should be able to pause progress calculation with pause method.', () => {
        it('should fire paused event, when progress calculation is pause.', () => {
            const onPaused = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                paused: onPaused
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.pause();

            // Then
            assert.isTrue(onPaused.called);
        });

        it('should be paused progress calculation, only that calculation state is not pause.', () => {
            const onPaused = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                paused: onPaused
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.pause();
            stepper.pause();

            // Then
            assert.isTrue(onPaused.called);
            assert.strictEqual(onPaused.callCount, 1);
        });

        it('should not fire update event, if progress calculation is paused.', () => {
            const onUpdate = sinon.spy();
            const onPaused = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                paused: onPaused
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.pause();

            this.rafStub.step(1, 0);

            // Then
            assert.isTrue(onUpdate.called);
            assert.isTrue(onPaused.called);
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), linear(250 / 300).toFixed(2));
        });

        it('should continue progress calculation, if play method is called in pause state.', () => {
            const onUpdate = sinon.spy();
            const onPaused = sinon.spy();
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                paused: onPaused,
                done: onEnded
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.pause();
            stepper.start();

            this.rafStub.step(1, 0); // Start from the paused time(250 millisecond)
            this.rafStub.step(1, 51); // After a total 301 millisecond.

            // Then
            assert.isTrue(onPaused.called);
            assert.isTrue(onUpdate.called);
            assert.isTrue(onEnded.called);
            assert.strictEqual(onUpdate.callCount, 4);
            assert.strictEqual(onUpdate.args[2][0].toFixed(2), linear(250 / 300).toFixed(2));
        });
    });

    describe('The user should be able to stop progress calculation with stop method.', () => {
        it('should fire stopped event, when progress calculation is stopped.', () => {
            const onStopped = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                stopped: onStopped
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.stop();

            // Then
            assert.isTrue(onStopped.called);
        });

        it('should stop progress calculation, only that calculation state is not stop.', () => {
            const onStopped = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                stopped: onStopped
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.stop();
            stepper.stop();

            // Then
            assert.isTrue(onStopped.called);
            assert.strictEqual(onStopped.callCount, 1);
        });

        it('should not fire update event, if progress calculation is stopped.', () => {
            const onUpdate = sinon.spy();
            const onStopped = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                stopped: onStopped
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.stop();

            this.rafStub.step(1, 0);

            // Then
            assert.isTrue(onUpdate.called);
            assert.isTrue(onStopped.called);
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), linear(250 / 300).toFixed(2));
        });

        it('should stop progress calculation, if stop method is called in pause state.', () => {
            const onUpdate = sinon.spy();
            const onPaused = sinon.spy();
            const onStopped = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                paused: onPaused,
                stopped: onStopped
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.pause();
            stepper.stop();

            this.rafStub.step(1, 0);

            // Then
            assert.isTrue(onUpdate.called);
            assert.isTrue(onPaused.called);
            assert.isTrue(onStopped.called);
            assert.strictEqual(onUpdate.callCount, 2);
            assert.strictEqual(onUpdate.args[0][0], 0);
            assert.strictEqual(onUpdate.args[1][0].toFixed(2), linear(250 / 300).toFixed(2));
        });
        it('should start progress calculation from the first, if play method is called in stop state.', () => {
            const onUpdate = sinon.spy();
            const onStopped = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                stopped: onStopped
            });

            // Then
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            stepper.stop();
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 250);

            // Then
            assert.isTrue(onUpdate.called);
            assert.isTrue(onStopped.called);
            assert.strictEqual(onUpdate.callCount, 4);
            assert.strictEqual(onUpdate.args[2][0], 0);
            assert.strictEqual(onUpdate.args[3][0].toFixed(2), linear(250 / 300).toFixed(2));
        });
    });
});
