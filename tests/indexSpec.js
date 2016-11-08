import Stepper from '../src/index';

describe('Test of the Stepper.', function() {
    it('sayHello', () => {
        assert.equal((new Stepper()).sayHello(), 'Hello World!!');
    });
});
