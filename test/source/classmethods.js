/**!jsjsdoc
 *
 * doc.TestClass = {
 *   $brief: "Test Class"
 * }
 *
 * doc.TestClass.$constructor = {
 *   $brief: "Create an instance of TestClass",
 *   $examples: "`new TestClass(foo)`",
 *   $parameters: {
 *      foo: "An instance of a foo."
 *   }
 * }
 *
 */
var TestClass = function(foo){
}


TestClass.prototype = {
    /**!jsjsdoc
     *
     * doc.TestClass.someMethod = {
     *  $brief: "do something on a TestClass"
     * }
     *
     */
    someMethod: function(){
    },

    /**!jsjsdoc
     *
     * doc.TestClass.someOtherMethod = {
     *  $brief: "do something on a TestClass",
     *  // test out all possible ways of documenting parameters: yes, you can
     *  // have comments in your doc comments!
     *  $parameters: {
     *    a: "",
     *    b: {type: "B"},
     *    c: {$brief: "this is a c"},
     *    d: {}, // no documentation here!
     *    e: {
     *      $brief: "an e",
     *      $type: "E"
     *    }
     *  },
     *  $examples: "(new TestClass(foo)).someOtherMethod(a, b, c, d, e)"
     * }
     *
     */
    someOtherMethod: function(a, b, c, d, e){
    }
};


