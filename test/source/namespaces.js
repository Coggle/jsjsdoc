/**!jsjsdoc
 *
 * doc.outer_object = {
 *   $brief: "This object contains more things"
 * }
 *
 */
var outer_object = {
    /**!jsjsdoc
     *
     * doc.outer_object.nested_object = {
     *   $brief: "object within an object",
     * }
     *
     */
    nested_object: {
        /**!jsjsdoc
         *
         * doc.outer_object.nested_object.foo = {
         *   $brief: "function nested within two namespaces that does foo",
         *   $parameters: {
         *      blah: "the blah parameter is simple",
         *      moo: {
         *        $type: "Moo",
         *        $brief: "The moo parameter must always be an instance of Moo"
         *      }
         *   }
         * }
         */
        foo: function(blah, moo){
        },
        
        /**!jsjsdoc
         *
         * doc.outer_object.nested_object.superSecret = {
         *   $api: "private",
         *   $brief: "does things the user doesn't need to know about"
         * }
         *
         */
        superSecret: function(){
        }
    }
};

