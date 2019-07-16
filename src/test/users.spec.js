import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import userModel from '../models/methods/user';
import app from '../app';

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

const endPoint = '/api/v1/auth';

// standard error response
const assertError = (path, errorCode, user, done, keyString) => chai
  .request(app)
  .post(`${endPoint}/${path}`)
  .send(user)
  .end((err, res) => {
    expect(res).to.have.status(errorCode);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.be.equal('error');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.include(keyString);
    done();
  });

// User Sign up
describe('POST /auth/signup', () => {
  describe('User sign Up', () => {
    it('should create a new user and return 201, and proper response body ', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore',
        email: 'adama@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      chai
        .request(app)
        .post(`${endPoint}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data.id).to.be.a('number');
          expect(res.body.data.id % 1).to.be.equal(0);
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data.first_name).to.be.a('string');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data.last_name).to.be.a('string');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.a('string');
          done();
        });
    });

    // check first_name validations
    it('should return 400 if first name is omitted', (done) => {
      const user = {
        last_name: 'traore',
        email: 'adaoma@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'kindly put in');
    });

    it('should return 400 if first name contains numbers', (done) => {
      const user = {
        first_name: 'adama1',
        last_name: 'traore',
        email: 'adaima@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'alphabets');
    });

    it('should return 400 if first name is less than 3 characters', (done) => {
      const user = {
        first_name: 'ad',
        last_name: 'traore',
        email: 'adapma@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, '3');
    });

    it('should return 400 if first name is more than 20 characters', (done) => {
      const user = {
        first_name: 'traorembadigweoneofohafia',
        last_name: 'traore',
        email: 'adawma@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, '20');
    });

    it('should return 400 if first name contains whitespace', (done) => {
      const user = {
        first_name: 'alan u',
        last_name: 'traore',
        email: 'adamkoar@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'no white spaces');
    });

    // check last_name validations
    it('should return 400 if last name is omitted', (done) => {
      const user = {
        first_name: 'adama',
        email: 'adamba@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'kindly put in');
    });

    it('should return 400 if last name contains numbers', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore1',
        email: 'adamak@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'alphabets');
    });

    it('should return 400 if last name is less than 3 characters', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'tr',
        email: 'adavma@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, '3');
    });

    it('should return 400 if last name is more than 20 characters', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traorembadigweoneofohafia',
        email: 'adamay@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, '20');
    });

    it('should return 400 if last name contains whitespace', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'tr aore',
        email: 'adama@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'no white spaces');
    });

    // check email address validations
    it('should return 400 if email address is omitted', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'kindly put in');
    });

    it('should return 400 if email address contains whitespace', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore',
        email: 'ad ama@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'no white spaces');
    });

    it('should return 409 if email address already exists', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore',
        email: 'adama@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 409, user, done, 'email');
    });

    it('should return 400 if password is omitted', (done) => {
      const user = {
        first_name: 'adama',
        last_name: 'traore',
        email: 'adama@gmail.com',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 400, user, done, 'kindly put in');
    });

    it('should return 500 for a server error', (done) => {
      // tell the user model function for creating a user to throw an error regardless
      sinon.stub(userModel, 'signup').throws();

      const user = {
        first_name: 'adama',
        last_name: 'traore',
        email: 'adaqma@gmail.com',
        password: 'bellerin',
        phone_number: 19039361852,
        address: '3 benson anorue',
        is_admin: false,
      };
      assertError('signup', 500, user, done, 'server');
    });
  });
});

// User Sign in
describe('POST /auth/signin', () => {
  describe('User sign in', () => {
    it('should sign in a new user and return 200, and proper response body ', (done) => {
      const user = {
        email: 'adama@gmail.com',
        password: 'bellerin',
      };
      chai
        .request(app)
        .post(`${endPoint}/signin`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data.first_name).to.be.a('string');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data.last_name).to.be.a('string');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.a('string');
          done();
        });
    });

    // check email address validations
    it('should return 400 if email address is omitted', (done) => {
      const user = {
        password: 'bellerin',
      };
      assertError('signin', 400, user, done, 'kindly put in');
    });

    it('should return 400 if email address contains whitespace', (done) => {
      const user = {
        email: 'ad ama@gmail.com',
        password: 'bellerin',
      };
      assertError('signin', 400, user, done, 'no white spaces');
    });

    it('should return 404 if email address does not match any email in the database', (done) => {
      const user = {
        email: 'christiewu@gmail.com',
        password: 'Iamthegoat',
      };
      assertError('signin', 404, user, done, 'email');
    });

    // Password validations
    it('should return 400 if password is omitted', (done) => {
      const user = {
        email: 'adama@gmail.com',
      };
      assertError('signin', 400, user, done, 'kindly put in');
    });

    it('should return 403 if password is incorrect', (done) => {
      const user = {
        email: 'adama@gmail.com',
        password: 'tellmemore',
      };
      assertError('signin', 403, user, done, 'password');
    });

    // it('should return 500 for a server error', (done) => {
    //   // tell the user model function for creating a user to throw an error regardless
    //   sinon.stub(userModel, 'signin').throws();

    //   const user = {
    //     email: 'chrisewu@gmail.com',
    //     password: 'chrisewu',
    //   };
    //   assertError('signin', 500, user, done, 'server');
    // });
  });
});
