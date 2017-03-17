import * as loki from 'lokijs';
import { Generator } from './generator';


const db = new loki('example.db');
const users = db.addCollection('users');
const posts = db.addCollection('posts');

const generator = new Generator();
generator.generateUsers(users);
generator.generatePosts(posts);


let props = ['authorId', 'dateCreated'];
let items = posts.find().sort((a, b) => {

  for (let prop of props) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
  }
  return 0;

})

.slice(0, 10)

.map((post: any) => {
  return {
    authorId: post.authorId,
    dateCreated: post.dateCreated
  }
});



print(items)



function print(data) {
  console.log(JSON.stringify(data, null, 2))
}
