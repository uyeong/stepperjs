import createStub from 'raf-stub';
import Stepper from '../src/Stepper';
import linear from '../src/easings/linear';
import inBack from '../src/easings/inBack';

describe('Test of the Stepper Class.', function() {
    beforeEach(() => {
        this.rafStub = createStub();

        sinon.stub(window, 'requestAnimationFrame', this.rafStub.add);
        sinon.stub(window, 'cancelAnimationFrame', this.rafStub.remove);
    });

    afterEach(() => {
        window.requestAnimationFrame.restore();
        window.cancelAnimationFrame.restore();
    });

    describe('사용자는 Stepper 클래스의 새로운 인스턴스를 생성할 수 있다.', () => {
        it('new 키워드로 인스턴스를 생성하면 새로운 인스턴스가 생성된다.', () => {
            // Given
            // When
            const stepper = new Stepper();

            // Then
            assert.isObject(stepper);
            assert.instanceOf(stepper, Stepper);
        });

        it('옵션 인자를 생략하면 기본 옵션으로 설정된 인스턴스가 생성된다.', () => {
            // Given
            // When
            const stepper = new Stepper();

            // Then
            assert.strictEqual(stepper.option('duration'), 0);
            assert.equal(stepper.option('easing'), linear);
            assert.isFalse(stepper.option('loop'));
            assert.isFalse(stepper.option('reverse'));
        });

        it('옵션 인자를 전달하면 전달한 옵션으로 설정된 인스턴스가 생성된다.', () => {
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

    describe('사용자는 stepper 객체의 option() 메서드를 이용해 옵션 값을 변경할 수 있다.', () => {
        it('옵션명과 값을 전달하면 지정한 옵션이 변경된다.', () => {
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

        it('옵션명과 값 셋을 객체로 전달하면 여러개의 옵션이 일괄로 변경된다.', () => {
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

    describe('사용자는 stepper 객체의 on() 메서드를 이용해 이벤트 리스너를 등록할 수 있다.', () => {
        it('이벤트명과 리스너를 전달하면 지정한 이벤트 리스너가 등록된다.', () => {
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

        it('이벤트명과 리스너 셋을 객체로 전달하면 여러개의 이벤트 리스너가 등록된다.', () => {
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

    describe('사용자는 stepper 객체의 off() 메서드를 이용해 이벤트 리스너를 해제할 수 있다.', () => {
        it('이벤트명과 리스너를 전달하면 지정한 이벤트 리스너가 해제된다.', () => {
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

        it('아무것도 전달하지 않으면 이벤트 리스너가 모두 해제된다.', () => {
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

    describe('사용자는 stepper 객체의 start() 메서드를 이용해 progress 계산을 시작할 수 있다.', () => {
        it('progress 계산이 시작되면 start 이벤트가 발생된다.', () => {
            // Given
            const onStart = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('start', onStart);

            // When
            stepper.start();

            // Then
            assert.isTrue(onStart.called);
        });

        it('duration을 1 이상 설정 했을 때만 progress 계산이 시작된다.', () => {
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

        it('계산 중이 아닐 때만 progress 계산이 시작된다.', () => {
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

        it('progress 값이 바뀔때마다 현재 progress 값과 함께 update 이벤트가 발생된다.', () => {
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

        it('reverse 옵션을 true로 설정하면 progress 값이 거꾸로 계산된다.', () => {
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

        it('loop 옵션을 true로 설정하면 progress 계산이 반복된다.', () => {
            const onUpdate = sinon.spy();
            const onEneded = sinon.spy();
            const stepper = new Stepper({
                duration: 300,
                loop: true
            });

            stepper.on({
                update: onUpdate,
                ended: onEneded
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

        it('progress 계산이 끝나면 ended 이벤트가 발생된다.', () => {
            // Given
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('ended', onEnded);

            // When
            stepper.start();

            this.rafStub.step(1, 0);
            this.rafStub.step(1, 301);

            // Then
            assert.isTrue(onEnded.called);
        });

        it('progress 계산이 끝나면 더이상 update 이벤트가 발생하지 않는다.', () => {
            // Given
            const onUpdate = sinon.spy();
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on('update', onUpdate);
            stepper.on('ended', onEnded);

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

    describe('사용자는 stepper 객체의 pause() 메서드를 이용해 progress 계산을 일시 정지할 수 있다.', () => {
        it('progress 계산이 일시 정지 되면 paused 이벤트가 발생된다.', () => {
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

        it('일시 정지 상태가 아닐 때만 progress 계산이 일시 정지된다.', () => {
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

        it('progress 계산이 일시 정지되면 update 이벤트가 발생하지 않는다.', () => {
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

        it('일시 정지 상태에서 play() 메서드를 호출하면 progress 계산이 이어서 시작된다.', () => {
            const onUpdate = sinon.spy();
            const onPaused = sinon.spy();
            const onEnded = sinon.spy();
            const stepper = new Stepper({duration: 300});

            stepper.on({
                update: onUpdate,
                paused: onPaused,
                ended: onEnded
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

    describe('사용자는 stepper 객체의 stop() 메서드를 이용해 progress 계산을 중지할 수 있다.', () => {
        it('progress 계산이 중지되면 stoped 이벤트가 발생된다.', () => {
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

        it('중지 상태가 아닐 때만 progress 계산이 중지된다.', () => {
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

        it('progress 계산이 중지되면 더이상 update 이벤트가 발생하지 않는다.', () => {
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

        it('일시 중지 상태에서 stop() 메서드를 호출하면 계산이 중지된다.', () => {
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

        it('중지 상태에서 play() 메서드를 호출하면 progress 계산이 처음부터 시작된다.', () => {
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
