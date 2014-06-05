describe('buttons', function () {
    describe('egToggleButtons', function () {
        it('should have a "Hello World" components', function () {
            browser.get('http://localhost:63342/eg-pure/src/buttons/buttons_spec.html');

            var one = element(by.id("one"));

            expect(one.getText()).toBe("Hello World");
        })

    })
})
