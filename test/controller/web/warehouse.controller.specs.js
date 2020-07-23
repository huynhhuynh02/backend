import db from '../../../app/db/models';

import {app} from "../../../app/server";

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('warehouse.controller.js', () => {
  beforeEach(async () => {
    const transaction = await db.sequelize.transaction();
    try {
      await db.WareHouse.truncate({transaction});
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  });

  it('Create', async (done) => {
    console.log('duyuyuyuyuyuy');
    const formLogin = {
      username: 'lephuoccanh@gmail.com',
      password: '1234'
    };

    const user = await chai.request(app).post('/api/sign-in')
      .send(formLogin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username').eq(formLogin.username);
        res.body.should.have.property('password').eq(formLogin.password);
        console.log(res.body);
        done();
      });

    console.log('vaooooooo');
    console.log(user);
    // const form = {
    //   username: 'lephuoccanh@gmail.com',
    //   password: '1234'
    // };
    // chai.request(app)
    //   .post('/api/register')
    //   .send(form)
    //   .end((err, res) => {
    //     res.should.have.status(200);
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('username').eq(form.username);
    //     res.body.should.have.property('password').eq;
    //     console.log(res.body);
    //     done();
    //   });
  });
});
