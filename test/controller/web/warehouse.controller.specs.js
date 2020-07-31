import {beforeTest} from '../../service/warehouse.service.specs';
import {signInTest} from '../../service/auth.service.test';
import {app} from '../../../app/server';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


describe('warehouse.controller.js', () => {
  let user;
  let token;
  let warehouseId;
  before(async () => {
    await beforeTest();
    const formLogin = {
      username: 'tanduy899@gmail.com',
      password: '1234'
    };
    const signResponse = await signInTest(formLogin);
    ({token, user} = signResponse);
  });

  it('Create', async () => {
    const createForm = {
      name: 'Nha kho 1',
      address: '09 ung van khiem',
      userId: user.id
    };
    const res = await chai.request(app)
      .post('/api/warehouse')
      .set('Authorization', `Bearer ${token}`)
      .send(createForm);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('name').eql(createForm.name);
    res.body.should.have.property('address').eql(createForm.address);
    res.body.should.have.property('userId').eql(createForm.userId);
    warehouseId = res.body.id;
  });

  it('Update', async () => {
    const formUpdate = {
      name: 'Nha kho 2',
      address: '006 nguyen duy hieu',
      userId: user.id
    };
    const res = await chai.request(app)
      .post(`/api/warehouse/${warehouseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(formUpdate);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('name').eql(formUpdate.name);
    res.body.should.have.property('address').eql(formUpdate.address);
    res.body.should.have.property('userId').eql(formUpdate.userId);
  });

  it('GetAllWarehouse', async () => {
    const res = await chai.request(app)
      .get(`/api/warehouse`)
      .set('Authorization', `Bearer ${token}`);
    res.should.have.status(200);
    console.log(res.body);
  });

  it('getById', async () => {
    const res = await chai.request(app)
      .get(`/api/warehouse/${warehouseId}`)
      .set('Authorization', `Bearer ${token}`);
    res.should.have.status(200);
    console.log(res.body);
  });

  it('delete', async () => {
    const res = await chai.request(app)
      .delete(`/api/warehouse/${warehouseId}`)
      .set('Authorization', `Bearer ${token}`);
    res.should.have.status(200);
    console.log(res.body);
  });
});
