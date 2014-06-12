describe("buttons", function () {
    browser.get("e2e/buttons/buttons_spec.html");

    describe("toggleButton", function () {
        var one;
        var toggleValue;
        beforeEach(function () {
            one = $("#one");
            toggleValue = element(by.binding("toggleValue"));
        });


        it("should be a button", function () {
            expect(one.getTagName()).toBe("button");
        });

        it("should have a 'pure-button' class", function () {
            expect(one.getAttribute("class")).toContain("pure-button");
        });

        it("should default the ngModel to false", function () {
            expect(toggleValue.getText()).toBe("false");
        });

        it("should NOT have a 'pure-button-active' class", function () {
            expect(one.getAttribute("class")).not.toContain("pure-button-active");
        });

        it("should have the text 'Click me' inside the button", function () {
            expect(one.getText()).toBe("Click me");
        });

        describe("first click", function () {
            beforeEach(function () {
                browser.driver.navigate().refresh();
                one.click();
            });

            it("should have a toggleValue of true", function () {
                expect(toggleValue.getText()).toBe("true");
            });

            it("should have a 'pure-button-active' class", function () {
                expect(one.getAttribute("class")).toContain("pure-button-active");
            });
        });

        describe("second click", function () {
            beforeEach(function () {
                browser.driver.navigate().refresh();
                one.click();
                one.click();
            });

            it("should have a toggleValue of false", function () {
                expect(toggleValue.getText()).toBe("false");
            });


            it("should NOT have a 'pure-button-active' class", function () {
                expect(one.getAttribute("class")).not.toContain("pure-button-active");
            });
        });

        describe("update from #two", function () {
            beforeEach(function () {
                browser.driver.navigate().refresh();
                $("#two").click();
            });

            it("should update the class of #one to 'pure-button-active'", function () {
                expect(one.getAttribute("class")).toContain("pure-button-active");
            });
        });

    });
});