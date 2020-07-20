import db from '../../db/models';
import { HTTP_ERROR, HttpError } from '../../config/error';

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
  const company = await db.Company.findByPk({
    where: {
      id: cId
    }
  });
  if (!company) {
    throw new HttpError(HTTP_ERROR.NOT_FOUND, 'Invalid Company');
  }
  await company.update({
    name: updateForm.name,
    gsm: updateForm.gsm,
    address: updateForm.address,
    remark: updateForm.remark
  });

  return company;
}

export function removeCompany (cId) {
  return db.Company.destroy({
    where: { id: cId }
  });
}
