module.exports = {
    'Homepage Available': function(browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 1000)
            .end();
    }
};