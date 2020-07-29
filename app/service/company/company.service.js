import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';

const {Op} = db.Sequelize;

export function companies(search, order, offset, limit) {
  let where = {};
  if (search) {
    if (search.name && search.name.length > 0) {
      where = {
        name: {
          [Op.like]: `%${search.name}%`
        }
      }
    }
  }
  return db.Company.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}

export async function getCompany(cId) {
  const company = await db.Company.findOne({
    where: {
      id: cId
    }
  });
  if (!company) {
    throw badRequest('company', FIELD_ERROR.INVALID, 'company not found');
  }
  return company;
}

export function createCompany(userId, createForm) {
  return db.Company.create(
    {
      name: createForm.name,
      gsm: createForm.gsm,
      address: createForm.address,
      remark: createForm.remark,
      createdDate: new Date(),
      createdById: userId
    }
  )
}

export async function updateCompany(cId, updateForm) {
  const company = await db.Company.findByPk(cId);
  if (!company) {
    throw badRequest('company', FIELD_ERROR.INVALID, 'company not found');
  }
  company.name = updateForm.name;
  company.gsm = updateForm.gsm;
  company.address =  updateForm.address;
  company.remark = updateForm.remark;
  return company.save();
}

export async function removeCompany (cId) {
  const company = await db.Company.findByPk(cId);
  if (!company) {
    throw badRequest('company', FIELD_ERROR.INVALID, 'company not found');
  }
  return db.Company.destroy({
    where: { id: company.id }
  });
}
