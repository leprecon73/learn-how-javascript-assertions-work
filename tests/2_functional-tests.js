const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({"surname": "Colombo"})
        .end(function (err, res) {
          assert.equal(res.status, 200, '200 expected');
          assert.equal(res.type, 'application/json', 'should be application/json');
          assert.equal(res.body.name, 'Cristoforo', 'should be Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 'should be Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({"surname": "da Verrazzano"})
        .end(function (err, res) {
          assert.equal(res.status, 200, '200 expected');
          assert.equal(res.type, 'application/json', 'should be application/json');
          assert.equal(res.body.name, 'Giovanni', 'should be Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano', 'should be da Verrazzano');      

          done();

        });
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://learn-how-javascript-assertions-work.onrender.com'; // Your URL here

suite('Functional Tests with Zombie.js', function () {
  const browser = new Browser();
  suiteSetup(function(done) {
  
    return browser.visit('/', done);
  });

  this.timeout(5000);

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        });
      });
    });
    // #6
    //Fill in the form with the surname Vespucci
    //Press the submit button
    //And within the pressButton callback:
    //Assert that status is OK 200
    //Assert that the text inside the element span#name is 'Amerigo'
    //Assert that the text inside the element span#surname is 'Vespucci'
    //Assert that the element(s) span#dates exist and their count is 1
    //Do not forget to remove the assert.fail() call.
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      
        browser.fill('surname', 'Vespucci').pressButton('submit', function () {
          browser.assert.success();
          browser.assert.equal('span#status', 200, '200 expected');
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        });


    });
  });
});


