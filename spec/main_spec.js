"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("测试描述", function(){
    sinon.spy(console, 'log');

   it("input the postcode of 5 bit", function () {

        var result = main('12345');
        var expect_string = '|:::||::|:|::||::|::|:|:|::|:|:|';

        expect(expect_string).to.equal(result);
    });

    it("input the postcode of 9 bit", function () {

        var result = main('023456789');
        var expect_string = '|||:::::|:|::||::|::|:|:|::||::|:::||::|:|:|:::||::|';

        expect(expect_string).to.equal(result);
    });

    it("input the postcode of 10 bit", function () {

        var result = main('17359-0628');
        var expect_string = '|:::|||:::|::||::|:|:|:|::||::::||::::|:||::|:|:|::|';

        expect(expect_string).to.equal(result);
    });

    it("input the barcode of 5 bit", function () {

        var result = main('|:::||::|:|::||::|::|:|:|::|:|:|');
        var expect_string = '12345';

        expect(expect_string).to.equal(result);
    });

    it("input the barcode of 9 bit", function () {

        var result = main('|||:::::|:|::||::|::|:|:|::||::|:::||::|:|:|:::||::|');
        var expect_string = '02345-6789';

        expect(expect_string).to.equal(result);
    });
      
});
