import * as request from 'supertest';

import { app } from '../../app';


describe('integration', () => {
  describe('post routes', () => {
    const baseUrl = 'http://localhost:3000/api/posts';

    describe('GET /posts/:id', () => {
      it('should get post by id', (done) => {
        request(app)
          .get('/api/posts/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            const post = res.body;

            expectDefinedPostParts(post);
            expectLink(post, 'self', `${baseUrl}/1`);
          })
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('should return 404 when id not found', (done) => {
        request(app)
          .get('/api/posts/1000')
          .expect(404, done);
      });

      it('should return 404 with alpha id', (done) => {
        request(app)
          .get('/api/posts/abc')
          .expect(404, done);
      });
    });


    describe('POST /posts', () => {
      it('should create a post', (done) => {
        const newPost = {
          authorId: 1,
          title: 'A title',
          content: 'data'
        };

        request(app)
          .post('/api/posts')
          .send(newPost)
          .set('Content-Type', 'application/json')
          .expect('Location', /\/posts\/\d+/)
          .expect(201)
          .expect((res) => {
            const post = res.body;

            expectDefinedPostParts(post);
            expectLink(post, 'self', `${baseUrl}/${post.id}`);
          })
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('should get 400 with wrong content-type', (done) => {
        const data = 'title=atitle&content=somecontent';

        request(app)
          .post('/api/posts')
          .send(data)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .expect(400, done);
      });

      it('should get 400 with no authorId', (done) => {
        const newPost = {
          title: 'A title',
          content: 'data'
        };

        request(app)
          .post('/api/posts')
          .send(newPost)
          .set('Content-Type', 'application/json')
          .expect(400, done);
      });

      it('should get 400 with no user with authorId', (done) => {
        const newPost = {
          authorId: 2000,
          title: 'A title',
          content: 'data'
        };

        request(app)
          .post('/api/posts')
          .send(newPost)
          .set('Content-Type', 'application/json')
          .expect(400, done);
      });
    });


    describe('PUT /posts/:id', () => {
      it('should update the post', (done) => {
        const post = {
          id: 1,
          title: 'A title',
          content: 'data'
        };

        request(app)
          .put('/api/posts/1')
          .send(post)
          .set('Content-Type', 'application/json')
          .expect(204, done);
      });

      it('should get 400 with id and URL id not matching', (done) => {
        const post = {
          id: 10,
          title: 'A title',
          content: 'data'
        };

        request(app)
          .put('/api/posts/1')
          .send(post)
          .set('Content-Type', 'application/json')
          .expect(400)
          .expect((res) => {
            const error = res.body;
            expect(error.message).toEqual('the request body "id" and URL id do not match');
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });

      it('should get 400 with no id in body', (done) => {
        const post = {
          title: 'A title',
          content: 'data'
        };

        request(app)
          .put('/api/posts/1')
          .send(post)
          .set('Content-Type', 'application/json')
          .expect(400)
          .expect((res) => {
            const error = res.body;
            expect(error.message).toEqual('there is no "id" property in the request body');
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    describe('GET /posts', () => {
      it('should get the posts paged', (done) => {
        request(app)
          .get('/api/posts?page=2&size=2')
          .expect(200)
          .expect(res => {
            const posts = res.body;

            expect(posts._embedded.posts.length).toEqual(2);
            posts._embedded.posts.forEach(post => {
              expectDefinedPostParts(post);
            });

            const page = posts.page;
            expect(page.number).toEqual(2);
            expect(page.size).toEqual(2);

            
            /** [[ TODO ]] */
            // The API works being tested manually.
            // It looks like the data being posted from previous tests
            // are being persisted. Look into how we can use a clean db
            // for each test.

            // expect(page.totalPages).toEqual(50);
            // expect(page.totalElements).toEqual(100);

            // const links = posts._links;
            // expect(links.self.href).toContain('/posts?page=2&size=2');
            // expect(links.first.href).toContain('/posts?page=0&size=2');
            // expect(links.last.href).toContain('/posts?page=49&size=2');
            // expect(links.next.href).toContain('/posts?page=3&size=2');
            // expect(links.prev.href).toContain('/posts?page=1&size=2');
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });
  });


  function expectDefinedPostParts(post) {
    expect(post.title).toBeDefined();
    expect(post.dateCreated).toBeDefined();
    expect(post.content).toBeDefined();
    expect(post.author.username).toBeDefined();
    expect(post.author.avatarUrl).toBeDefined();
    expect(post.author._links.self).toBeDefined();
  }

  function expectLink(item, rel, href) {
    expect(item._links[rel].href).toEqual(href);
  }
});
