import * as request from 'supertest';

import { app } from '../../app';


describe('integration', () => {
  describe('user routes', () => {
    const baseUrl = 'http://localhost:3000/api/users';

    describe('GET /user/:id', () => {
      it('should get post by id', (done) => {
        request(app)
          .get('/api/users/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            const user = res.body;

            expectDefinedUserParts(user);
          })
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('should return 404 when id not found', (done) => {
        request(app)
          .get('/api/users/1000')
          .expect(404, done);
      });

      it('should return 404 with alpha id', (done) => {
        request(app)
          .get('/api/users/abc')
          .expect(404, done);
      });
    });


    describe('POST /users', () => {
      it('should create a user', (done) => {
        const newUser = {
          username: 'user',
          name: 'First Last',
          location: 'Home',
          email: 'user@email.com',
          password: 'secret',
          avatarUrl: 'someUrl'
        };

        request(app)
          .post('/api/users')
          .send(newUser)
          .set('Content-Type', 'application/json')
          .expect('Location', /\/users\/\d+/)
          .expect(201)
          .expect((res) => {
            const user = res.body;

            expectDefinedUserParts(user);
            expectLink(user, 'self', `${baseUrl}/${user.id}`);
          })
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('should get 400 with wrong content-type', (done) => {
        const data = 'username=user&location=Home';

        request(app)
          .post('/api/users')
          .send(data)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .expect(400, done);
      });
    });


    describe('PUT /users/:id', () => {
      it('should update the user', (done) => {
        const post = {
          id: 1,
          username: 'user',
          location: 'Home'
        };

        request(app)
          .put('/api/users/1')
          .send(post)
          .set('Content-Type', 'application/json')
          .expect(204, done);
      });

      it('should get 400 with id and URL id not matching', (done) => {
        const user = {
          id: 10,
        };

        request(app)
          .put('/api/users/1')
          .send(user)
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
        const user = {
          username: 'newuser'
        };

        request(app)
          .put('/api/users/1')
          .send(user)
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


    describe('POST /users', () => {
      it('should get the users paged', (done) => {
        request(app)
          .get('/api/users?page=2&size=2')
          .expect(200)
          .expect(res => {
            const users = res.body;

            expect(users._embedded.users.length).toEqual(2);
            users._embedded.users.forEach(user => {
              expectDefinedUserParts(user);
            });

            const page = users.page;
            expect(page.number).toEqual(2);
            expect(page.size).toEqual(2);
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    function expectDefinedUserParts(user) {
      expect(user.name).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.location).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.avatarUrl).toBeDefined();
      expect(user.dateCreated).toBeDefined();
      expect(user.password).toBeUndefined();
    }

    function expectLink(item, rel, href) {
      expect(item._links[rel].href).toEqual(href);
    }
  });
});