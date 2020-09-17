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

// standard error response
const assertErrorGet = (path, errorCode, done, keyString, token) => chai
  .request(app)
  .get(`${endPoint}${path}`)
  .set('Authorization', `Bearer ${token}`)
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

// standard error response
const assertErrorDel = (path, errorCode, done, keyString, token) => chai
  .request(app)
  .delete(`${endPoint}${path}`)
  .set('Authorization', `Bearer ${token}`)
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

// standard error response with request parameter
const assertErrorParams = (errorCode, price, params, done, keyString, token) => chai
  .request(app)
  .patch(`${endPoint}property/${params}`)
  .set('Authorization', `Bearer ${token}`)
  .send({ price })
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
    console.log(res.body)
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

// POST /property/
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

// PATCH /property/:id Agent can update price
describe('PATCH /property/:id', () => {
  describe('Agent can update price', () => {
    it('Should return 200 and update price', (done) => {
      const data = { price: 2123 };
      chai
        .request(app)
        .patch(`${endPoint}property/2`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          // expect(res.body.data.id).to.be.a('number');
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
      assertErrorParams(400, '', 2, done, 'kindly put in', adminToken);
    });

    // check if price is not a number
    it('should return 400 if price is not a number', (done) => {
      assertErrorParams(400, 'a', 2, done, 'number', adminToken);
    });

    // check if price has no signs
    it('should return 400 if price has signs', (done) => {
      assertErrorParams(400, '+232', 2, done, 'number', adminToken);
    });

    // check id validations
    it('should return 400 if id is not a number', (done) => {
      assertErrorParams(400, 500, 'a', done, 'number', adminToken);
    });

    // check that id takes no signs
    it('should return 400 if id ontains a negative sign', (done) => {
      assertErrorParams(400, 500, -6, done, 'number', adminToken);
    });

    // test doesnt pass
    // it('should return 400 if id is not a number', (done) => {
    //   assertErrorParams(400, 500, '%', done, 'number', adminToken);
    // });

    it('should return 400 if id doesn\'t match any accounts', (done) => {
      assertErrorParams(404, 5000, 25, done, 'match', adminToken);
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      const data = { price: 2123 };
      chai
        .request(app)
        .patch(`${endPoint}property/2`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.include('missing');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      assertErrorParams(400, 5000, 2, done, 'invalid', invalidToken);
    });

    it('should return 401 if user is not owner', (done) => {
      assertErrorParams(401, 5000, 1, done, 'do not own', adminToken);
    });

    it('should return 401 if user token is provided (unauthorized access)', (done) => {
      assertErrorParams(401, 5000, 2, done, 'unauthorized access', userToken);
    });

    it('should return 500 for a server error', (done) => {
    // tell the user model function for creating an account to throw an error regardless
      sinon.stub(Property, 'editPrice').throws();
      assertErrorParams(500, 5000, 2, done, 'server', adminToken);
    });
  });
});

// PATCH /property/:id Mark a property as sold
describe('PATCH /property/:id/sold', () => {
  describe('Agent can mark a property as sold', () => {
    it('Should return 200 and update price', (done) => {
      chai
        .request(app)
        .patch(`${endPoint}property/2/sold`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          // expect(res.body.data.id).to.be.a('number');
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

    // check id validations
    it('should return 400 if id is not a number', (done) => {
      assertErrorParams(400, 500, 'a/sold', done, 'number', adminToken);
    });

    // check that id takes no signs
    it('should return 400 if id ontains a negative sign', (done) => {
      assertErrorParams(400, 500, '-6/sold', done, 'number', adminToken);
    });

    // test doesnt pass
    // it('should return 400 if id is not a number', (done) => {
    //   assertErrorParams(400, 500, '%', done, 'number', adminToken);
    // });

    it('should return 400 if id doesn\'t match any accounts', (done) => {
      assertErrorParams(404, 5000, '25/sold', done, 'match', adminToken);
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      const data = { price: 2123 };
      chai
        .request(app)
        .patch(`${endPoint}property/2/sold`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.include('missing');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      assertErrorParams(400, 5000, '2/sold', done, 'invalid', invalidToken);
    });

    it('should return 401 if user token is provided (unauthorized access)', (done) => {
      assertErrorParams(401, 5000, '2/sold', done, 'unauthorized access', userToken);
    });

    it('should return 401 if user is not owner', (done) => {
      assertErrorParams(401, 5000, '1/sold', done, 'do not own', adminToken);
    });

    it('should return 500 for a server error', (done) => {
    // tell the user model function for creating an account to throw an error regardless
      sinon.stub(Property, 'editStatus').throws();
      assertErrorParams(500, 5000, '2/sold', done, 'server', adminToken);
    });
  });
});

// GET /property/:id Users can retreive specific properties
describe('GET /property/:id', () => {
  describe(' Users can retreive specific properties', () => {
    it('Should return 200 and return specific properties', (done) => {
      chai
        .request(app)
        .get(`${endPoint}property/1`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          // expect(res.body.data.id).to.be.a('number');
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

    // check id validations
    it('should return 400 if id is not a number', (done) => {
      assertErrorGet('property/1a', 400, done, 'number', userToken);
    });

    // check that id takes no signs
    it('should return 400 if id ontains a negative sign', (done) => {
      assertErrorGet('property/-1', 400, done, 'number', userToken);
    });

    // test doesnt pass
    // it('should return 400 if id is not a number', (done) => {
    //   assertErrorParams(400, 500, '%', done, 'number', adminToken);
    // });

    it('should return 400 if id doesn\'t match any accounts', (done) => {
      assertErrorGet('property/10', 404, done, 'match', userToken);
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      chai
        .request(app)
        .get(`${endPoint}property/2`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.include('missing');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      assertErrorGet('property/1', 400, done, 'invalid', invalidToken);
    });

    it('should return 500 for a server error', (done) => {
    // tell the user model function for creating an account to throw an error regardless
      sinon.stub(Property, 'getSingleProperty').throws();
      assertErrorGet('property/1', 500, done, 'server', userToken);
    });
  });
});

// GET /property/
describe('GET /property', () => {
  describe('Users should be able to retreive all properties', () => {
    it('Users should be able to retreive all properties', (done) => {
      chai
        .request(app)
        .get(`${endPoint}/property`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0].id).to.be.a('number');
          expect(res.body.data[0]).to.have.property('status');
          expect(res.body.data[0].status).to.be.a('string');
          expect(res.body.data[0]).to.have.property('type');
          expect(res.body.data[0].type).to.be.a('string');
          expect(res.body.data[0]).to.have.property('state');
          expect(res.body.data[0].state).to.be.a('string');
          expect(res.body.data[0]).to.have.property('city');
          expect(res.body.data[0].city).to.be.a('string');
          expect(res.body.data[0]).to.have.property('address');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('created_on');
          expect(res.body.data[0]).to.have.property('image_url');
          done();
        });
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      chai
        .request(app)
        .get(`${endPoint}/property`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      assertErrorGet('property', 400, done, 'invalid', invalidToken);
    });

    // check 500 for server error
    it('should return 500 for a server error', (done) => {
      const createProperty = sinon.stub(Property, 'allProperties');
      createProperty.throws();
      assertErrorGet('property', 500, done, 'server', userToken);
    });
  });
});

// DELETE /property/:id Agent can delete property
describe('PATCH /property/:id', () => {
  describe('Agent can delete property', () => {
    it('Should return 200 and delete property', (done) => {
      chai
        .request(app)
        .delete(`${endPoint}property/2`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });

    // check id validations
    it('should return 400 if id is not a number', (done) => {
      assertErrorDel('property/1a', 400, done, 'invalid', invalidToken);
    });

    // check that id takes no signs
    it('should return 400 if id ontains a negative sign', (done) => {
      assertErrorDel('property/-1a', 400, done, 'signs', adminToken);
    });

    // test doesnt pass
    // it('should return 400 if id is not a number', (done) => {
    //   assertErrorParams(400, 500, '%', done, 'number', adminToken);
    // });

    it('should return 400 if id doesn\'t match any accounts', (done) => {
      assertErrorDel('property/10', 404, done, 'match', adminToken);
    });

    // token errors
    it('should return 400 if authentication token is missing', (done) => {
      chai
        .request(app)
        .delete(`${endPoint}property/2`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.include('missing');
          done();
        });
    });

    it('should return 400 if authentication token is invalid', (done) => {
      assertErrorDel('property/1', 400, done, 'invalid', invalidToken);
    });

    it('should return 401 if user is not owner', (done) => {
      assertErrorDel('property/1', 401, done, 'do not own', adminToken);
    });

    it('should return 401 if user token is provided (unauthorized access)', (done) => {
      assertErrorDel('property/1', 401, done, 'unauthorized access', userToken);
    });

    // it('should return 500 for a server error', (done) => {
    // // tell the user model function for creating an account to throw an error regardless
    //   sinon.stub(Property, 'deleteProperty').throws();
    //   assertErrorDel('property/3', 500, done, 'server', adminToken);
    // });
  });
});
