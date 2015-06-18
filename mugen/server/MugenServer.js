var rootPath = process.env.PWD;

var Mugen = {
    rootPath: process.env.PWD + "/",
    controllerTemplatePath: 'mugen/controllers/TemplateController.js',
//    controllerDestinationPath: "lib/controllers/",
//    controllerPrefix: "Controller.js",
    collectionTemplatePath: 'mugen/collections/TemplateCollection.js',
//    collectionDestinationPath: "lib/collections/",
//    collectionPrefix: ".js",
    viewTemplatePath: 'mugen/views/',
//    viewDestinationPath: "client/views/",
    viewPrefixJs: ".js",
    viewPrefixHtml: ".html",
    routerTemplatePath: 'mugen/routers/templateRouter.js',
//    routerDestinationPath: "client/routers/",
//    routerPrefix: ".js",
    serverTemplatePath: 'mugen/server/TemplateServer.js',
//    serverDestinationPath: "server/",
//    serverPrefix: "Server.js",
    pkgeTemplatePath: 'mugen/templatePackage.js',
    pkgI18nTemplatePath: 'mugen/templatePackage-tap.i18n',
    i18nTemplatePath: 'mugen/i18n/',


    /* write file to path */
    write: function(path, content) {
        fs.writeFile(this.rootPath + path, content, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved to " + path);
            }
        });
    },
    /* read file from path */
    read: function(path) {
        return Assets.getText(path);
    },
    mkdir: function(path) {
        try {
            fs.mkdirSync(this.rootPath + path);
        }
        catch (err) {
            if (err.code.indexOf("EEXIST") < 0) console.log(err);
            console.log(this.rootPath + path + " recreated.")
        }

    },
    /* replace all string to desired string */
    replaceAll: function(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    },
    toTitleCase: function(str) {
//        return str.replace(/\w\S*/g, function(txt) {
//            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//        });
        var words = str.split(' ');
        var results = [];
        for (var i = 0; i < words.length; i++) {
            var letter = words[i].charAt(0).toUpperCase();
            results.push(letter + words[i].slice(1));
        }
        return results.join(' ');
    },
    /* convert str to collectionCase ex: HeroSkills to heroSkills */
    toCollectionCase: function(str) {
        var words = str.split(' ');
        var results = [];
        for (var i = 0; i < words.length; i++) {
            var letter = words[i].charAt(0).toLowerCase();
            results.push(letter + words[i].slice(1));
        }
        return results.join(' ');
    },

    testMe: function(element, collection) {
        var path = MugenUtils.preparePath(element, collection)
        console.log("Helloooo " + path);
        this.mkdir(path);

    },

    /* generate your controller from template, then replacing with collection */
    generateController: function(collection, fields) {

        //get controller template content
        var controllerTemplate = this.read(this.controllerTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.controllerDestinationPath + this.toTitleCase(collection) + this.controllerPrefix;
        var path = MugenUtils.preparePath("controllers", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        this.mkdir(MugenUtils.preparePath("dir_lib", collection));


        //get the content, replace the template with desired collection
        var content = this.replaceAll(controllerTemplate, "Replacement", this.toTitleCase(collection));
        content = this.replaceAll(content, "replacement", this.toCollectionCase(collection));

        //reformat fields as string, and replacing [subscriptionFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var belongToCollection = obj.belongToCollection ? obj.belongToCollection : null;
            if (belongToCollection)
                stringFields += "this.subs.subscribe('" + Mugen.toCollectionCase(belongToCollection) + "', {});\n";
        });
        content = content.replace("[subscriptionFields]", stringFields);

        //reformat fields as string, and replacing [criteriaFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            stringFields += "{" + name + ": {$regex: search, $options: 'i'}},\n";
        });
        content = content.replace("[criteriaFields]", stringFields);

        //reformat fields as string, and replacing [docFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            if (type == "Date")
                stringFields += name + ": t.find('#" + name + "').value? new Date(t.find('#" + name + "').value):null,\n";
            else if (type == "Number")
                stringFields += name + ": t.find('#" + name + "').value? Number(t.find('#" + name + "').value):null,\n";
            else
                stringFields += name + ": t.find('#" + name + "').value,\n";
        });
        content = content.replace("[docFields]", stringFields);

        //finally write it
        this.write(path, content);
    },
    /* generate your collection from template, then replacing with collection */
    generateCollection: function(collection, fields) {
        //get collection template content
        var collectionTemplate = this.read(this.collectionTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.collectionDestinationPath + this.toTitleCase(collection) + this.collectionPrefix;
        var path = MugenUtils.preparePath("collections", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        this.mkdir(MugenUtils.preparePath("dir_lib", collection));

        //get the content, replace the template with desired collection
        var content = this.replaceAll(collectionTemplate, "Replacement", this.toTitleCase(collection));
        content = this.replaceAll(content, "replacement", collection);

        //reformat fields as string, and replace it with [mugenCollectionFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            var label = obj.label;
            var isRequired = obj.isRequired ? "" : "optional: true,\n";
            stringFields +=
                    name + ":{\n" +
                    "type:" + type + ",\n" +
                    "label: '" + label + "',\n" +
                    isRequired +
                    "},\n";
        });
        content = content.replace("[collectionFields]", stringFields);

        //reformat fields as string, and replace it with [mugenCollectionHelpers]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var belongToCollection = obj.belongToCollection;
            var relationKey = obj.relationKey;
            if (belongToCollection) {
                stringFields +=
                        relationKey + ': function() {\n' +
                        'return ' + belongToCollection + '.findOne(this.' + name + ');\n' +
                        '},\n';
            }
        });
        content = content.replace("[collectionHelpers]", stringFields);

        //finally write it
        this.write(path, content);
    },
    generateView: function(collection, fields) {
        //create directory for views first
//        this.mkdir(this.viewDestinationPath + this.toCollectionCase(collection));
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        this.mkdir(MugenUtils.preparePath("dir_client", collection));
        this.mkdir(MugenUtils.preparePath("dir_views", collection));


        //================= generate _form ===============//
        //get view template content
        var action = "_form";
        var viewTemplate_formHtml = this.read(this.viewTemplatePath + action + this.viewPrefixHtml);
        var viewTemplate_formJs = this.read(this.viewTemplatePath + action + this.viewPrefixJs);

        //get destinationPath, and set the file name
//        var path_formHtml = this.viewDestinationPath + this.toCollectionCase(collection) + "/_form" + this.viewPrefixHtml;
//        var path_formJs = this.viewDestinationPath + this.toCollectionCase(collection) + "/_form" + this.viewPrefixJs;

        var path_formHtml = MugenUtils.preparePath("viewsActionHtml", collection, action);
        var   path_formJs = MugenUtils.preparePath(  "viewsActionJs", collection, action);

        //get the content, replace the template with desired collection
        var content_formHtml = this.replaceAll(viewTemplate_formHtml, "Replacement", this.toTitleCase(collection));
        content_formHtml = this.replaceAll(content_formHtml, "replacement", this.toCollectionCase(collection));
        var content_formJs = this.replaceAll(viewTemplate_formJs, "Replacement", this.toTitleCase(collection));
        content_formJs = this.replaceAll(content_formJs, "replacement", this.toCollectionCase(collection));

        //reformat fields as string, and replace it with [formFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            if (type == "Date") {
                stringFields += "$('#" + name + "').datepicker();"
            }
        });
        content_formJs = content_formJs.replace("[formRendered]", stringFields);

        //reformat fields as string, and replace it with [formHelpers]
        var stringFields = "";
        fields.forEach(function(obj) {
            var belongToCollection = obj.belongToCollection ? obj.belongToCollection : null;
            if (belongToCollection) {
                stringFields += belongToCollection.toLowerCase() + ': function() {\n' +
                        'return ' + belongToCollection + '.find({});\n' +
                        '},\n';
            }
        });
        content_formJs = content_formJs.replace("[formHelpers]", stringFields);

        //reformat fields as string, and replace it with [formFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            var label = obj.label;
            var isRequired = obj.isRequired ? "*" : "";
            var belongToCollection = obj.belongToCollection ? obj.belongToCollection : null;

            stringFields +=
                    '<div class="form-group {{#if error ' + "'" + name + "'" + '}}has-error{{/if}}">\n' +
                    '<label for="' + name + '" class="control-label">' + label + " " + isRequired + '</label>\n';
            if (type == "Date") {
                stringFields += '<input type="text" id="' + name + '" value="{{moFormat ' + name + ' "L"' + '}}" placeholder="' + label + '" class="form-control">\n';
            } else if (type == "Number") {
                stringFields += '<input type="number" id="' + name + '" value="{{' + name + '}}" placeholder="' + label + '" class="form-control">\n';
            } else if (type == "String" && belongToCollection) {
                stringFields += '<select id="' + name + '" class="form-control">\n' +
                        '<option value=""></option>\n' +
                        '{{#each ' + Mugen.toCollectionCase(belongToCollection) + '}}\n' +
                        '<option value="{{_id}}" {{selected ../' + name + '}}>{{name}}' +
                        ' Using ' + Mugen.toCollectionCase(belongToCollection) + '.name here for record "{{_id}}". Correct it in the file : ' + path_formHtml +
                        '</option>\n' +
                        '{{/each}}\n' +
                        '</select>\n';
            } else {
                stringFields += '<input type="text" id="' + name + '" value="{{' + name + '}}" placeholder="' + label + '" class="form-control">\n';
            }
            stringFields += '<span class="help-block">{{error "' + name + '"}}</span>\n' + '</div>\n';
        });
        content_formHtml = content_formHtml.replace("[formFields]", stringFields);

        //finally write it
        this.write(path_formHtml, content_formHtml);
        this.write(path_formJs, content_formJs);
        //================= generate _form ===============//

        //================= generate index ===============//
        //get view template content
        var action = "index";
        var viewTemplateindexHtml = this.read(this.viewTemplatePath + action + this.viewPrefixHtml);
        var viewTemplateindexJs = this.read(this.viewTemplatePath + action + this.viewPrefixJs);

        //get destinationPath, and set the file name
//        var pathindexHtml = this.viewDestinationPath + this.toCollectionCase(collection) + "/index" + this.viewPrefixHtml;
//        var pathindexJs = this.viewDestinationPath + this.toCollectionCase(collection) + "/index" + this.viewPrefixJs;
        var pathindexHtml = MugenUtils.preparePath("viewsActionHtml", collection, action);
        var   pathindexJs = MugenUtils.preparePath(  "viewsActionJs", collection, action);

        //get the content, replace the template with desired collection
        var contentindexHtml = this.replaceAll(viewTemplateindexHtml, "Replacement", this.toTitleCase(collection));
        contentindexHtml = this.replaceAll(contentindexHtml, "replacement", this.toCollectionCase(collection));
        var contentindexJs = this.replaceAll(viewTemplateindexJs, "Replacement", this.toTitleCase(collection));
        contentindexJs = this.replaceAll(contentindexJs, "replacement", this.toCollectionCase(collection));

        //reformat fields as string, and replace it with [thFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var label = obj.label;
            stringFields += '<th id="btnSort' + name + '" class="{{meteorisGridViewSortClass ' + "'" + name + "'" + '}}">' + label + '</th>\n';
        });
        contentindexHtml = contentindexHtml.replace("[thFields]", stringFields);

        //reformat fields as string, and replace it with [tdFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            var belongToCollection = obj.belongToCollection ? obj.belongToCollection : null;
            var relationKey = obj.relationKey ? obj.relationKey : null;

            if (type == "Date")
                stringFields += "<td>{{moFormat " + name + ' "LL"}}</td>\n';
            else if (belongToCollection && relationKey && type == "String")
                stringFields += '<td>{{' + relationKey + '.name}}</td>\n';
            else
                stringFields += '<td>{{' + name + '}}</td>\n';
        });
        contentindexHtml = contentindexHtml.replace("[tdFields]", stringFields);

        //reformat fields as string, and replace it with [sortFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var label = obj.label;
            stringFields +=
                    "/* sorting by parameter */\n" +
                    "'click #btnSort" + name + "': function(e) {\n" +
                    "MeteorisGridView.sort('" + name + "');\n" +
                    "},\n";
        });
        contentindexJs = contentindexJs.replace("[sortFields]", stringFields);

        //finally write it
        this.write(pathindexHtml, contentindexHtml);
        this.write(pathindexJs, contentindexJs);
        //================= generate index ===============//

        //================= generate insert ===============//
        //get view template content
        var action = "insert";
        var viewTemplateinsertHtml = this.read(this.viewTemplatePath + action + this.viewPrefixHtml);
        var viewTemplateinsertJs = this.read(this.viewTemplatePath + action + this.viewPrefixJs);

        //get destinationPath, and set the file name
//        var pathinsertHtml = this.viewDestinationPath + this.toCollectionCase(collection) + "/insert" + this.viewPrefixHtml;
//        var pathinsertJs = this.viewDestinationPath + this.toCollectionCase(collection) + "/insert" + this.viewPrefixJs;
        var pathinsertHtml = MugenUtils.preparePath("viewsActionHtml", collection, action);
        var   pathinsertJs = MugenUtils.preparePath(  "viewsActionJs", collection, action);

        //get the content, replace the template with desired collection
        var contentinsertHtml = this.replaceAll(viewTemplateinsertHtml, "Replacement", this.toTitleCase(collection));
        contentinsertHtml = this.replaceAll(contentinsertHtml, "replacement", this.toCollectionCase(collection));
        var contentinsertJs = this.replaceAll(viewTemplateinsertJs, "Replacement", this.toTitleCase(collection));
        contentinsertJs = this.replaceAll(contentinsertJs, "replacement", this.toCollectionCase(collection));

        //finally write it
        this.write(pathinsertHtml, contentinsertHtml);
        this.write(pathinsertJs, contentinsertJs);
        //================= generate insert ===============//

        //================= generate update ===============//
        //get view template content
        var action = "update";
        var viewTemplateupdateHtml = this.read(this.viewTemplatePath + action + this.viewPrefixHtml);
        var viewTemplateupdateJs = this.read(this.viewTemplatePath + action + this.viewPrefixJs);

        //get destinationPath, and set the file name
//        var pathupdateHtml = this.viewDestinationPath + this.toCollectionCase(collection) + "/update" + this.viewPrefixHtml;
//        var pathupdateJs = this.viewDestinationPath + this.toCollectionCase(collection) + "/update" + this.viewPrefixJs;
        var pathupdateHtml = MugenUtils.preparePath("viewsActionHtml", collection, action);
        var   pathupdateJs = MugenUtils.preparePath(  "viewsActionJs", collection, action);

        //get the content, replace the template with desired collection
        var contentupdateHtml = this.replaceAll(viewTemplateupdateHtml, "Replacement", this.toTitleCase(collection));
        contentupdateHtml = this.replaceAll(contentupdateHtml, "replacement", this.toCollectionCase(collection));
        var contentupdateJs = this.replaceAll(viewTemplateupdateJs, "Replacement", this.toTitleCase(collection));
        contentupdateJs = this.replaceAll(contentupdateJs, "replacement", this.toCollectionCase(collection));

        //finally write it
        this.write(pathupdateHtml, contentupdateHtml);
        this.write(pathupdateJs, contentupdateJs);
        //================= generate update ===============//

        //================= generate view ===============//
        //get view template content
        var action = "view";
        var viewTemplateviewHtml = this.read(this.viewTemplatePath + action + this.viewPrefixHtml);
        var viewTemplateviewJs = this.read(this.viewTemplatePath + action + this.viewPrefixJs);

        //get destinationPath, and set the file name
//        var pathviewHtml = this.viewDestinationPath + this.toCollectionCase(collection) + "/view" + this.viewPrefixHtml;
//        var pathviewJs = this.viewDestinationPath + this.toCollectionCase(collection) + "/view" + this.viewPrefixJs;
        var pathviewHtml = MugenUtils.preparePath("viewsActionHtml", collection, action);
        var   pathviewJs = MugenUtils.preparePath(  "viewsActionJs", collection, action);

        //get the content, replace the template with desired collection
        var contentviewHtml = this.replaceAll(viewTemplateviewHtml, "Replacement", this.toTitleCase(collection));
        contentviewHtml = this.replaceAll(contentviewHtml, "replacement", this.toCollectionCase(collection));
        var contentviewJs = this.replaceAll(viewTemplateviewJs, "Replacement", this.toTitleCase(collection));
        contentviewJs = this.replaceAll(contentviewJs, "replacement", this.toCollectionCase(collection));

        //reformat fields as string, and replace it with [trFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            var label = obj.label;
            var belongToCollection = obj.belongToCollection ? obj.belongToCollection : null;
            var relationKey = obj.relationKey ? obj.relationKey : null;

            stringFields +=
                    "<tr>\n" +
                    "<td><b>" + label + "</b></td>\n";
            if (type == "Date") {
                stringFields +=
                        "<td>{{moFormat " + name + ' "LLLL"}}</td>\n';
            } else if (belongToCollection && relationKey && type == "String") {
                stringFields +=
                        "<td>{{" + relationKey + ".name}}</td>\n";
            } else {
                stringFields +=
                        "<td>{{" + name + "}}</td>\n";
            }
            stringFields += "</tr>\n";
        });
        contentviewHtml = contentviewHtml.replace("[trFields]", stringFields);

        //finally write it
        this.write(pathviewHtml, contentviewHtml);
        this.write(pathviewJs, contentviewJs);
        //================= generate view ===============//
    },
    /* generate your controller from template, then replacing with collection */
    generateRouter: function(collection) {


        //get router template content
        var routerTemplate = this.read(this.routerTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.routerDestinationPath + this.toCollectionCase(collection) + this.routerPrefix;
        var path = MugenUtils.preparePath("router", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        this.mkdir(MugenUtils.preparePath("dir_client", collection));

        //get the content, replace the template with desired collection
        var content = this.replaceAll(routerTemplate, "Replacement", this.toTitleCase(collection));
        content = this.replaceAll(content, "replacement", this.toCollectionCase(collection));

        //finally write it
        this.write(path, content);
    },
    /* generate your controller from template, then replacing with collection */
    generateServer: function(collection, fields) {
        //get server template content
        var serverTemplate = this.read(this.serverTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.serverDestinationPath + this.toTitleCase(collection) + this.serverPrefix;
        var path = MugenUtils.preparePath("server", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        this.mkdir(MugenUtils.preparePath("dir_server", collection));

        //get the content, replace the template with desired collection
        var content = this.replaceAll(serverTemplate, "Replacement", this.toTitleCase(collection));
        content = this.replaceAll(content, "replacement", this.toCollectionCase(collection));

        //reformat fields as string, and replace it with [mugenCollectionHelpers]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var belongToCollection = obj.belongToCollection;
            if (belongToCollection) {
                stringFields +=
                        '/* return all related ' + belongToCollection + ' */\n' +
                        '{\n' +
                        'find: function(collection) {\n' +
                        'return ' + belongToCollection + '.find(collection.' + name + ');' +
                        '}\n' +
                        '},\n';
            }
        });
        content = content.replace("[serverPublishedChildren]", stringFields);

        //finally write it
        this.write(path, content);
    },
    /* generate your package definition file from template, then replacing with collection */
    generatePackage: function(collection, nameNameSpace) {
        //get pkge template content
        var pkgeTemplate = this.read(this.pkgeTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.pkgeDestinationPath + this.toCollectionCase(collection) + this.pkgePrefix;
        var path = MugenUtils.preparePath("package", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));

        //get the content, replace the template with desired collection
        var content = this.replaceAll(pkgeTemplate, "{Collection}", this.toTitleCase(collection));
        content = this.replaceAll(content, "{collection}", this.toCollectionCase(collection));
        content = this.replaceAll(content, "{nameSpace}", nameNameSpace);

        //finally write it
        this.write(path, content);
    },
    generatedI18n: function(collection, nameNameSpace) {
        //create directory for views first
//        this.mkdir(this.viewDestinationPath + this.toCollectionCase(collection));
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));
        var path = MugenUtils.preparePath("dir_i18n", collection);
        this.mkdir(path);

        var srcPath = this.i18nTemplatePath;
        var dirSrcI18n = this.rootPath + "private/" + srcPath;

//        console.log(" generating i18n from " + dirSrcI18n + " to " + this.rootPath + path);
        var filenames = fs.readdirSync(dirSrcI18n);
        for (idx in filenames) {
            var filename = filenames[idx];
            var src = srcPath + filename;
            var dst = path + "/" + filename;

            var content = this.replaceAll(this.read(src), "{Collection}", this.toTitleCase(collection));
            content = this.replaceAll(content, "{collection}", this.toCollectionCase(collection));
            content = this.replaceAll(content, "{nameSpace}", nameNameSpace);

//            console.log("src :: " + src);
//            console.log("dst :: " + dst);
            this.write(dst, content);
        };
//        console.log(" generated i18n ");
    },
    /* generate your package definition file from template, then replacing with collection */
    generatePkgI18n: function(collection, nameNameSpace) {
        //get pkge template content
        var pkgeTemplate = this.read(this.pkgI18nTemplatePath);

        //get destinationPath, and set the file name
//        var path = this.pkgeDestinationPath + this.toCollectionCase(collection) + this.pkgePrefix;
        var path = MugenUtils.preparePath("pkgI18n", collection);
        this.mkdir(MugenUtils.preparePath("dir_pkg", collection));

        //get the content, replace the template with desired collection
        var content = this.replaceAll(pkgeTemplate, "{collection}", this.toCollectionCase(collection));
        content = this.replaceAll(content, "{nameSpace}", nameNameSpace);

        //finally write it
        this.write(path, content);
    },
    /* generate your package definition file from template, then replacing with collection */
    installPackage: function(collection, nameNameSpace) {
        var METEOR_PACKAGES = ".meteor/packages";
        console.log("Adding " + nameNameSpace + ":" +  collection + " to " + METEOR_PACKAGES);
        fs.appendFile(Mugen.rootPath + METEOR_PACKAGES, '\n' + nameNameSpace + ":" +  collection, function (err) {
          if (err) throw err;
          console.log("Added " + nameNameSpace + ":" + collection + " to " + Mugen.rootPath + METEOR_PACKAGES);
        });
    }
};

Meteor.methods({
    "Mugen.write": function(path, content) {
        Mugen.write(path, content);
    },
    "Mugen.read": function(path) {
        Mugen.read(path);
    },
    "Mugen.testMe": function(A, B, C) {
        Mugen.testMe(A, B, C);
    },
    "Mugen.generateController": function(collection, fields) {
        Mugen.generateController(collection, fields);
    },
    "Mugen.generateCollection": function(collection, fields) {
        Mugen.generateCollection(collection, fields);
    },
    "Mugen.generateView": function(collection, fields) {
        Mugen.generateView(collection, fields);
    },
    "Mugen.generateRouter": function(collection) {
        Mugen.generateRouter(collection);
    },
    "Mugen.generateServer": function(collection, fields) {
        Mugen.generateServer(collection, fields);
    },
    "Mugen.generatePackage": function(collection, nameSpace) {
        Mugen.generatePackage(collection, nameSpace);
    },
    "Mugen.generatePkgI18n": function(collection, nameSpace) {
        Mugen.generatePkgI18n(collection, nameSpace);
    },
    "Mugen.generatedI18n": function(collection, nameSpace) {
        Mugen.generatedI18n(collection, nameSpace);
    },
    "Mugen.installPackage": function(collection, nameSpace) {
        Mugen.installPackage(collection, nameSpace);
    },
    "Mugen.generateAll": function(collection, fields, nameSpace) {
        Mugen.generateController(collection, fields);
        Mugen.generateCollection(collection, fields);
        Mugen.generateView(collection, fields);
        Mugen.generateRouter(collection);
        Mugen.generateServer(collection, fields);
        Mugen.generatePackage(collection, nameSpace);
        Mugen.generatePkgI18n(collection, nameSpace);
        Mugen.generatedI18n(collection, nameSpace);
        Mugen.installPackage(collection, nameSpace);
    },
});
