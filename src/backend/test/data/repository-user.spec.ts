import * as loki from 'lokijs';

import { UserRepository, PageRequest } from '../../data';



describe('data', () => {
  describe('UserRepository', () => {
    let users;
    let repo;

    beforeEach(() => {
      const db = new loki('example.db');

      users = db.addCollection('users');
      repo = new UserRepository(db);

      users.insert([
        { username: 'userone', password: 'secret'},
        { username: 'usertwo', password: 'secre'}
      ])
    });


    describe('findOne()', () => {
      it('should remove user password', () => {
        const user = repo.findOne(1);

        expect(user.username).toEqual('userone');
        expect(user.password).toBeUndefined();
      });
    });


    describe('findAll()', () => {
      it('should remove user passwords', () => {
        const userss = repo.findAll();

        expect(userss[0].username).toEqual('userone');
        expect(userss[0].password).toBeUndefined();
        expect(userss[1].username).toEqual('usertwo');
        expect(userss[1].password).toBeUndefined();
      });
    });


    describe('findAllPaged()', () => {
      it('should remove user passwords', () => {
        const request = new PageRequest(0, 2);
        const userss = repo.findAllPaged(request).content;

        expect(userss[0].username).toEqual('userone');
        expect(userss[0].password).toBeUndefined();
        expect(userss[1].username).toEqual('usertwo');
        expect(userss[1].password).toBeUndefined();
      });
    });


    describe('create()', () => {
      it('should remove user password', () => {
        const user = repo.create({ username: 'userthree', password: 'secret' });

        expect(user.username).toEqual('userthree');
        expect(user.password).toBeUndefined();
      });
    });


    describe('update()', () => {
      it('should remove the password', () => {
        const newUser = users.insert({ username: 'userfour', password: 'secret' });
        const user = repo.update({ id: newUser['$loki'], username: 'updated' });

        expect(user.username).toEqual('updated');
        expect(user.password).toBeUndefined();
      });
    });
  });
});