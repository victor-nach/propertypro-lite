import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Property from '../models/methods/property';
import app from '../app';

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

const endPoint = '/api/v1/';

let userToken;
let adminToken;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImNsaWVudCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NTQ5NDg0NzZ9.LRxxMH6TWXP_JaiaXYHyrOR_ApRDUlnfCJIwds4LC_';

// let userAccountNumber;

const userData = {
  email: 'user@gmail.com',
  password: 'password',
};
const adminData = {
  email: 'admin@gmail.com',
  password: 'password',
};

// standard error response
const assertError = (path, errorCode, user, done, keyString, token) => chai
  .request(app)
  .post(`${endPoint}${path}`)
  .set('Authorization', `Bearer ${token}`)
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

before('get user token', (done) => {
  chai.request(app)
    .post(`${endPoint}/auth/signin`)
    .send(userData)
    .end((err, res) => {
      userToken = res.body.data.token;
      done();
    });
});

before('get admin token', (done) => {
  chai.request(app)
    .post(`${endPoint}/auth/signin`)
    .send(adminData)
    .end((err, res) => {
      adminToken = res.body.data.token;
      done();
    });
});

describe('POST /property', () => {
  describe('Agent can create property', () => {
    it('user should be able to create a new property', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      chai
        .request(app)
        .post(`${endPoint}/property`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(property)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data.id).to.be.a('number');
          expect(res.body.data).to.have.property('status');
          expect(res.body.data.status).to.be.a('string');
          expect(res.body.data).to.have.property('type');
          expect(res.body.data.type).to.be.a('string');
          expect(res.body.data).to.have.property('state');
          expect(res.body.data.state).to.be.a('string');
          expect(res.body.data).to.have.property('city');
          expect(res.body.data.city).to.be.a('string');
          expect(res.body.data).to.have.property('address');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('created_on');
          expect(res.body.data).to.have.property('image_url');
          done();
        });
    });

    // check price validations
    it('should return 400 if price is omitted', (done) => {
      const property = {
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // check state validations
    it('should return 400 if state omited', (done) => {
      const property = {
        price: 123,
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // check city validations
    it('should return 400 if city omited', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // check address validations
    it('should return 400 if address omited', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // check type validations
    it('should return 400 if type is omited', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // check image url validations
    it('should return 400 if image url is omited', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
      };
      assertError('property', 400, property, done, 'kindly put in', adminToken);
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      const account = {
        type: 'savings',
        openingBalance: 1000,
      };
      chai
        .request(app)
        .post(`${endPoint}/property`)
        .send(account)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      const account = {
        type: 'savings',
        openingBalance: 1000,
      };
      assertError('property', 400, account, done, 'invalid', invalidToken);
    });

    // check token validations
    it('should return 400 if authentication token is invalid', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 400, property, done, 'invalid', invalidToken);
    });

    it('should return 401 if authentication token is user token', (done) => {
      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 401, property, done, 'unauthorized', userToken);
    });

    // check 500 for server error
    it('should return 500 for a server error', (done) => {
      const createProperty = sinon.stub(Property, 'createProperty');
      createProperty.throws();

      const property = {
        price: 123,
        state: 'oshodi',
        city: 'lagos island',
        address: '13 banana island',
        type: '3 bedroom flat',
        image_url: 'http://res.cloudinary.com/dtbyclgla/image/upload/v1563106186/h9mc2pg4hz5ivwblwglu.jpg',
      };
      assertError('property', 500, property, done, 'server', adminToken);
    });
  });
});
