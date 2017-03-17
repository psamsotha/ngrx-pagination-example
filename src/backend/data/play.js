"use strict";
var loki = require('lokijs');
var generator_1 = require('./generator');
var db = new loki('example.db');
var users = db.addCollection('users');
var posts = db.addCollection('posts');
var generator = new generator_1.Generator();
generator.generateUsers(users);
generator.generatePosts(posts);
var props = ['authorId', 'dateCreated'];
var items = posts.find().sort(function (a, b) {
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        if (a[prop] > b[prop]) {
            return 1;
        }
        else if (a[prop] < b[prop]) {
            return -1;
        }
    }
    return 0;
})
    .slice(0, 10)
    .map(function (post) {
    return {
        authorId: post.authorId,
        dateCreated: post.dateCreated
    };
});
print(items);
function print(data) {
    console.log(JSON.stringify(data, null, 2));
}
