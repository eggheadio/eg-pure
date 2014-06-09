describe('buttons', function () {
    describe('egToggleButtons', function () {
        it('should have a "Hello World" components', function () {
            browser.baseUrl = "http://localhost:63342/eg-pure/";
            browser.get('e2e/buttons/buttons_spec.html');

            var one = $("#one");

            expect(one.getText()).toBe("Hello World");
        })

    })
})
