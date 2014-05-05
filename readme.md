##jsjsdoc
[![NPM version](https://badge.fury.io/js/jsjsdoc.svg)](http://badge.fury.io/js/jsjsdoc)

Documentation generator for javascript using JSON within comments to describe
the documentation to be generated. Keep the docs with the code, and precisely
define the documentation you want.

See [grunt-jsjsdoc](https://github.com/Coggle/grunt-jsjsdoc) for a [grunt](http://gruntjs.com)
task runner to run jsjsoc automatically.

### Example
#### Source
```js
/**!jsjsdoc
 *
 * doc.CoggleApi = {
 *    $brief: "The Coggle API client.",
 * }
 *
 * doc.CoggleApi.$constructor = {
 *   $brief: "Create a new instance of the Coggle API client.",
 *   $examples: "new CoggleApi({token:user_auth_token})",
 *   $parameters: {
 *     options: {
 *      $type: "Object",
 *      $brief: "Possible Options:\n  * **`token`**, **required**: API user "+
 *              "authentication token"
 *     }
 *   }
 * }
 */
var CoggleApi = function CoggleApi(options){
    // ...
}

CoggleApi.prototype = {
  /**!jsjsdoc
   *
   * doc.CoggleApi.createDiagram = {
   *   $brief: "Create a new Coggle diagram.",
   *   $parameters: {
   *     title: {
   *       $type: "String",
   *       $brief: "Title for the created diagram."
   *     },
   *     callback: {
   *       $type: "Function",
   *       $brief: "Callback accepting (Error, CoggleApiDiagram)",
   *     }
   *   }
   * }
   */
  createDiagram: function(title, callback){
    // ...
  }
  
  /**!jsjsdoc
   *
   * doc.CoggleApi.post = {
   *   $api: "private",
   *   $brief: "POST to an endpoint on the Coggle API",
   *   $parameters: {
   *     endpoint: {
   *       $type: "String",
   *       $brief: "URL of endpoint to post to (relative to the domain)",
   *       $example: "Use `/api/1/diagrams` to create a new diagram."
   *     },
   *     body: "The body to post. Will be converted to JSON.",
   *     callback: {
   *       $type: "Function",
   *       $brief: "Callback accepting (error, body) that will be called "+
   *               "with the result. The response returned from the server "+
   *               "is parsed as JSON and returned as `body`.",
   *     }
   *   }
   * }
   */
  post: function(endpoint, body, callback){
    // ...
  }
};
```

#### Generated Documentation
Note that the post() method is ommitted from the documentation because it was
marked as `$api:"private"`.

    ```markdown
    ##Class `CoggleApi`
    The Coggle API client.
    
    ###Constructor
    Create a new instance of the Coggle API client.
    
    Example:
    \`\`\`js
    new CoggleApi({token:user_auth_token})
    \`\`\`
    Parameters:
      * **`options`** type: `Object`  
         Possible Options:
      * **`token`**, **required**: API user authentication token
    
    ###Method `createDiagram()`
    Create a new Coggle diagram.
    
    Parameters:
      * **`title`** type: `String`  
         Title for the created diagram.
      * **`callback`** type: `Function`  
         Callback accepting (Error, CoggleApiDiagram)
    ```


### Reference

#### Comment format
Only comments starting with `/**!jsjsdoc` will be parsed.

#### Tags
Properties starting with `$` on documentation objects have special meanings.

##### `$brief`
Brief description of the documented object. Currently there's no long-form of
this, so $brief can be quite long.

##### `$examples`
String describing examples of using the thing function or class.

##### `$parameters`
Describe the parameters for a function or constructor by assigning properties
to `doc.*.function.parameters`. Describe parameters in the order they are
accepted by the function. Descriptions may either be strings or objects with
`$brief` and `$type` properties.

```js
doc.myFunction = {
  $brief: 'brief description here',
  $parameters: {
    foo: "this is the foo parameter",
    blah: {
      $brief: 'pass a blah to myFunction to do awesome things',
      $type: 'Blah'
    }
  }
}
```

##### `$constructor`
Assign the documentation for the class constructor to
`doc.ClassName.$constructor`. Doc objects that have a `$constructor` property
are assumed to describe classes.

##### `$type`
Explicitly set the object type. This is not normally necessary. Available types
are `class`, `function`, `namespace`.

Additionally, `doc.*.function.$parameter.paramName.$type` can be used to document the
type that is expected by the parameter of a function. In this case the values
for `.$type` are unrestricted.

##### `$api`
Describe the API to which the documentation object belongs. Currently only
`object.$api = 'private'` is supported, which restricts documentation from
being produce for the specified object.

