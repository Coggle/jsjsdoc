var assert = require('assert');

describe("module", function(){
  var jsjsdoc = require("../");

  describe("function", function(){
    it('should generate documentation', function(done){
      jsjsdoc.process("./test/source/function.js", function(err, doc){
        if(err)
          throw err;
        describe("function:doctest", function(){
          // very crude test that we're generating something
          it('should contain documentation of freeFunction', function(){
            assert(doc.indexOf('freeFunction') !== -1);
          });
        });
        done();
      });
    });
  });

  describe("class", function(){
    it('should generate documentation', function(done){
    jsjsdoc.process("./test/source/class.js", function(err, doc){
        if(err)
          throw err;
        describe("class:doctest", function(){
          // very crude test that we're generating something
          it('should contain documentation of TestClass', function(){
            assert(doc.indexOf('TestClass') !== -1);
          });
        });
        done();
      });
    });
  });

  describe("classmethods", function(){
    it('should generate documentation', function(done){
    jsjsdoc.process("./test/source/classmethods.js", function(err, doc){
        if(err)
          throw err;
        describe("classmethods:doctest", function(){
          // very crude test that we're generating something
          it('should contain documentation of TestClass', function(){
            assert(doc.indexOf('TestClass') !== -1);
          });
          it('should contain documentation of someMethod', function(){
            assert(doc.indexOf('someMethod') !== -1);
          });
          it('should contain documentation of someOtherMethod', function(){
            assert(doc.indexOf('someOtherMethod') !== -1);
          });
          it('should contain the example', function(){
            assert(doc.indexOf('(new TestClass(foo)).someOtherMethod(a, b, c, d, e)') !== -1);
          });
        });
        done();
      });
    });
  });

  describe("namespaces", function(){
    it('should generate documentation', function(done){
    jsjsdoc.process("./test/source/namespaces.js", function(err, doc){
        if(err)
          throw err;
        describe("namespaces:doctest", function(){
          // very crude test that we're generating something
          it('should contain documentation of outer_object', function(){
            assert(doc.indexOf('outer_object') !== -1);
          });
          it('should contain documentation of nested_object', function(){
            assert(doc.indexOf('nested_object') !== -1);
          });
          it('should NOT contain documentation of superSecret', function(){
            assert(doc.indexOf('superSecret') === -1);
          });
        });
        done();
      });
    });
  });
  

  describe("detail", function(){
    it('should generate detail sections', function(done){
    jsjsdoc.process("./test/source/detail.js", function(err, doc){
        if(err)
          throw err;
        describe("detail:classdetail", function(){
          // very crude test that we're generating something
          it('should contain the detailed description', function(){
            assert(doc.indexOf('second paragraph') !== -1);
          });
        });
        done();
      });
    });
  });

});
