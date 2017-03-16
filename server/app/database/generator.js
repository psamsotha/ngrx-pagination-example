/**
 * Genearators to generate posts and users data and insert into
 * LokiJS database
 */
module.exports = {
  generateUsers: generateUsers,
  generatePosts: generatePosts
}


// =========================================
//   Users data
// =========================================

const USERS = [
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
]

function User(id, name, username, location, avatartId) {
  this.id = id
  this.name = name
  this.username = username
  this.location = location
  this.password = 'secret'
  this.email = this.username + '@email.com'
  this.avatartUrl = 'http://lorempixel.com/200/200/people/' + avatartId
  this.dateCreated = getRandomDate();
}

function generateUsers(users) {
  let counter = 0
  USERS.forEach(user => {
    counter++;
    users.insert(new User(counter, user[0], user[1], user[2], counter))
  })
}


// =========================================
//    Posts data
// =========================================

const POST_TITLES = [
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
]

const CONTENT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula et erat et malesuada."
const POSTS_PER_USER = 10

function Post(id, title, authorId) {
  this.id = id

  this.title = title
  this.dateCreated = getRandomDate()
  this.authorId = authorId
  this.content = CONTENT
}

function generatePosts(posts) {
  let id
  let titleIdx
  for (let i = 0; i < USERS.length; i++) {
    for (let j = 0; j < POSTS_PER_USER; j++) {
      id = i == 0
          ? j
          : parseInt((i + '') + (j + ''));
      titleIdx = Math.floor(Math.random() * POST_TITLES.length - 1)
      posts.insert(new Post(
        (id + 1),
        POST_TITLES[titleIdx],
        (i + 1)))
    }
  }
}


// =========================================
//   Helpers
// =========================================

const YEAR_MILLIS = 1000 * 60 * 60 * 24 * 30 * 12

function getRandomDate() {
  let date = new Date();
  let millis = date.getTime()

  millis = millis
    - Math.floor(Math.random() * (YEAR_MILLIS * 2)) // random last two years

  return new Date(millis)
}
