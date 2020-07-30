import { beforeTestWarehouse } from '../../service/warehouse.service.specs';
import { signInTest } from '../../service/auth.service.test';
import { app } from '../../../app/server';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


describe('warehouse.controller.js', () => {

  before(async () => {
    await beforeTestWarehouse();
  });

  it('Create', async (done) => {
    const formLogin = {
      username: 'tanduy899@gmail.com',
      password: '1234'
    };
    const {token, user} = await signInTest(formLogin);
    const createForm = {
      name: 'Nha kho 1',
      address: '09 ung van khiem',
      userId: user.id
    };
    await chai.request(app)
      .post('/api/warehouse')
      .set('Authorization', `Bearer ${token}`)
      .send(createForm)
      .end((err, res) => {
        console.log('vaooooooo');
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql(createForm.name);
        res.body.should.have.property('address').eql(createForm.address);
        res.body.should.have.property('userId').eql(createForm.userId);
        done();
      });
  });

  // it('Update', async (done) => {
  //   console.log('44444');
  //   done();
  // });
});
