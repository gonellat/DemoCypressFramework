describe('My Second Test Suite', function () {

    it('My FirstTest case', function () {

        cy.request({
            method: 'POST',
            url: 'http://216.10.245.166/Library/Addbook.php',
            body: {
                "name": "Learn Appium Automation with Java Test",
                "isbn": "bcde",
                "aisle": "227ss",
                "author": "John foe new"
            },
        }).then(function (response) {
            expect(response.body).to.have.property("Msg", "successfully added");
            expect(response.status).to.eq(200);
        });

    });
});
