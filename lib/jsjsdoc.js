var acorn = require('acorn');
var async = require('async');
var fs = require('fs');

exports.process = function(files, options, callback){
    if(typeof options === 'function'){
        callback = options;
        options = {};
    }

    async.map(files, function(file, cb){
        exports.parse(file, options, function(err, doc_object){
            if(err)
                return cb(err);
            exports.format(doc_object, options, function(err, doc_text){
                cb(err, doc_text);
            });
        });
    }, function(err, output){
        if(err)
            callback(err);
        
        var all_doc_text = output.join('\n');
        
        if(options.output){
            fs.writeFile(options.output, all_doc_text, function(err){
                callback(err, all_doc_text);
            });
        }else{
            callback(false, all_doc_text);
        }
    });
    
};

exports.parse = function(file, options, callback){
    fs.readFile(file, function(err, data){
        if(err)
            return callback(err);
        options._source_file = file;
        exports.parseString(data, options, callback);
    });
};

exports.parseString = function(string, options, callback){
    var acorn_opts = {
         onComment: onComment,
        sourceFile: options._source_file,
         locations: true
    };
    var defs = '';

    function onComment(block, text, start, end){
        if(/^[*\/]\s*!jsjsdoc/.test(text)){
            processed = text.replace(/^[*\/]\s*!jsjsdoc\s?/, '').replace(/^\s*\*\s?/gm, '');
            defs += '\n;\n' + processed;
        }
    }

    acorn.parse(string, acorn_opts);

    // !!! use eval for now, because it's easy, really should parse and execute
    // assignment statements only from the doc though.
    //
    // eval the defs into a function scope, each doc comment should add a
    // property to a global variable called `doc`
    var doc_object = (function(){
        var doc = {};
        eval(defs); // jshint ignore:line
        return doc;
    })();

    callback(false, doc_object);
};

// build Markdown documentation from the doc object
exports.format = function(doc_object, options, callback){
    function guessObjectType(object){
        if('$type' in object)
            return object.$type;
        if('$constructor' in object)
            return 'class';
        if('$parameters' in object)
            return 'function';
        return 'namespace';
    }

    function header(level){
        return '\n' + Array(level+3).join('#');
    }

    function nameIsInternal(name){
        return name.indexOf('$') === 0;
    }

    function formatConstructor(object, level){
        var doc = '';
        doc += header(level) + 'Constructor\n';
        if('$brief' in object)
            doc += object.$brief + '\n';
        if('$examples' in object)
            doc += formatExamples(object.$examples, level);
        if('$parameters' in object)
            doc += formatParameters(object.$parameters, level);
        return doc;
    }

    function formatClass(object, level){
        var doc = '';
        doc += object.$brief || '';
        doc += '\n';
        doc += formatConstructor(object.$constructor, level);
        for(var name in object){
            if(nameIsInternal(name))
                continue;
            doc += formatObject(object[name], name, level);
        }
        return doc;
    }

    function formatExamples(object, level){
        var doc = '';
        if(typeof(object) === 'string'){
            doc += '\nExample:\n```js\n';
            doc += object;
            doc += '\n```';
        }else{
            // !!! not implemented yet: richer example support: array of
            // strings, objects with more properties, etc.
        }
        return doc;
    }

    function formatParameters(parameters, level){
        var doc = '';
        doc += parameters.$brief || '';
        doc += '\n';
        var has_parameters = false;
        for(var name in parameters){
            if(nameIsInternal(name))
                continue;
            var o = parameters[name];
            if(!has_parameters){
                has_parameters = true;
                doc += 'Parameters:\n';
            }
            doc += '  * **`' + name + '`**';
            if(typeof(o) === 'string'){
                doc += ' ' + o;
            }else{
                if('$type' in o)
                    doc += ' type: `'+o.$type+'`';
                if('$brief' in o)
                    doc += o.$brief;
            }
            doc += '\n';
        }
        return doc;
    }

    function formatFunction(object, level){
        var doc = '';
        doc += object.$brief || '';
        doc += '\n';
        if('$examples' in object)
            doc += formatExamples(object.$examples, level);
        if('$parameters' in object)
            doc += formatParameters(object.$parameters, level);
        return doc;
    }
    
    function formatObject(object, name, level){
        var doc = '';
        var type = guessObjectType(object);
        if(object.api === 'private' && !options.include_private)
          return '';

        if(type == 'class'){
            doc += header(level) + 'Class `' + name + '`\n';
            doc += formatClass(object, level+1);
        }else if(type == 'function'){
            doc += header(level) + 'Method `' + name + '`\n';
            doc += formatFunction(object, level+1);
        }else if(type == 'namespace'){
            doc += header(level) + '`' + name + '`\n';
        }else{
            throw new Error('unknown object type: "'+type+'"');
        }
        return doc;
    }

    var formatted = '';
    try{
        for(var name in doc_object){
            if(!nameIsInternal(name))
                formatted += formatObject(doc_object[name], name, 0);
        }
    }catch(err){
        return callback(err);
    }

    callback(false, formatted);
};

