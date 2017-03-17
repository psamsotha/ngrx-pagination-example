"use strict";
var USERS = [
    ["Paul Samsotha", "peeskillet", "Phnom Penh"],
    ["Lebron James", "kingjames", "Cleveland, OH"],
    ["Kobe Bryant", "blackmamba", "Los Angeles"],
    ["Kobe Bryant", "blackmamba", "Los Angeles"],
    ["Kevin Durant", "durantula", "Oakland, CA"],
    ["Klay Thompson", "splashbro", "Oakland, CA"],
    ["Micheal Jordan", "thegoat", "Chicago, IL"],
    ["James Harden", "thebeard", "Houston, TX"],
    ["Shaquille Oneal", "shaqdiesel", "Orlando, FL"],
    ["Vince Carter", "halfamazing", "Toronto, CN"]
];
var POST_TITLES = [
    "How the Grinch Stole The White House", "Getting Started with Angular",
    "Getting Started with ReactJS", "Getting Started with Spring Boot",
    "How to Turn Your Computer On", "How to Turn Your Computer Off",
    "Why You Shouldnt Eat Laying Down", "How to Post on Stack Overflow",
    "Why Angular Is So Cool", "How ReactJS Changed My Life",
    "Why Waking Up at 5am is Awesome", "How use NgRx with Angular",
    "Using Redux with React", "Getting Started with Jersey",
    "Getting the Most Bang for Your Buck", "How to Convince Elon Musk to Take You to Mars",
    "Vampires Originated From Aliens Mixing Human DNA with Mosquito DNA",
    "Be Happy With What You Have, But Always Strive for More",
    "How To Read 10 Books in 10 Days", "How to Create an Array in Java"
];
var CONTENT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula et erat et malesuada.";
var POSTS_PER_USER = 10;
var User = (function () {
    function User(name, username, location, avatartId) {
        this.name = name;
        this.username = username;
        this.location = location;
        this.password = 'secret';
        this.email = this.username + '@email.com';
        this.avatartUrl = 'http://lorempixel.com/200/200/people/' + avatartId;
        this.dateCreated = getRandomDate();
    }
    return User;
}());
var Post = (function () {
    function Post(title, authorId) {
        this.title = title;
        this.dateCreated = getRandomDate();
        this.authorId = authorId;
        this.content = CONTENT;
    }
    return Post;
}());
var YEAR_MILLIS = 1000 * 60 * 60 * 24 * 30 * 12;
function getRandomDate() {
    var date = new Date();
    var millis = date.getTime();
    millis = millis
        - Math.floor(Math.random() * (YEAR_MILLIS * 2)); // random last two years
    return new Date(millis);
}
var Generator = (function () {
    function Generator() {
    }
    Generator.prototype.generateUsers = function (users) {
        var counter = 0;
        USERS.forEach(function (user) {
            counter++;
            users.insert(new User(user[0], user[1], user[2], counter));
        });
    };
    Generator.prototype.generatePosts = function (posts) {
        var title;
        var titleIdx;
        var authorId;
        for (var i = 0; i < USERS.length; i++) {
            for (var j = 0; j < POSTS_PER_USER; j++) {
                titleIdx = Math.floor(Math.random() * POST_TITLES.length - 1);
                title = POST_TITLES[titleIdx];
                authorId = (i + 1);
                posts.insert(new Post(title, authorId));
            }
        }
    };
    return Generator;
}());
exports.Generator = Generator;
