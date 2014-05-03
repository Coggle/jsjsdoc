##jsjsdoc

Documentation generator for javascript using JSON to describe the documentation to produce.

### Comment format

```js
/**!jsjsdoc
 *
 * doc.CoggleApi = {
 *    $brief: "The Coggle API client.",
 * }
 *
 * doc.CoggleApi.$constructor = {
 *   $brief: "Create a new instance of the Coggle API client.",
 *   $parameters: {
 *     options: "Options: {}"
 *   }
 * }
 *
 */

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

```
