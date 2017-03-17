

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
];

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
];

const CONTENT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula et erat et malesuada.";
const POSTS_PER_USER = 10;


class User {
  id: number;
  name: string;
  username: string;
  location: string;
  password: string;
  email: string;
  avatartUrl: string;
  dateCreated: Date;

  constructor(id, name, username, location, avatartId) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.location = location;
    this.password = 'secret';
    this.email = this.username + '@email.com';
    this.avatartUrl = 'http://lorempixel.com/200/200/people/' + avatartId;
    this.dateCreated = getRandomDate();
  }
}


class Post {
  id: number;
  title: string;
  dateCreated: Date;
  authorId: number;
  content: string;

  constructor(id: number, title: string, authorId: number) {
    this.id = id;
    this.title = title;
    this.dateCreated = getRandomDate();
    this.authorId = authorId;
    this.content = CONTENT;
  }
}


const YEAR_MILLIS = 1000 * 60 * 60 * 24 * 30 * 12;

function getRandomDate() {
  let date = new Date();
  let millis = date.getTime();

  millis = millis
    - Math.floor(Math.random() * (YEAR_MILLIS * 2)); // random last two years

  return new Date(millis);
}


export class Generator {

  generateUsers(users) {
    let counter = 0
    USERS.forEach(user => {
      counter++;
      users.insert(new User(counter, user[0], user[1], user[2], counter));
    });
  }

  generatePosts(posts) {
    let id;
    let title;
    let titleIdx;
    let authorId;
    for (let i = 0; i < USERS.length; i++) {
      for (let j = 0; j < POSTS_PER_USER; j++) {
        id = i == 0
          ? j
          : parseInt((i + '') + (j + ''));
        titleIdx = Math.floor(Math.random() * POST_TITLES.length - 1);
        title = POST_TITLES[titleIdx];
        id = (id + 1);
        authorId = (i + 1);
        posts.insert(new Post(id, title, authorId));
      }
    }
  }
}
