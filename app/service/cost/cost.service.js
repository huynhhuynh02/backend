import db from '../../db/models';
import {createCostPurpose,updateCostPurpose,removeCostPurpose} from '../../service/cost/cost-purpose.service';
import { badRequest, FIELD_ERROR } from '../../config/error';
const {Op} = db.Sequelize;

export async function costs(search,order,offset,limit){
    let where = {};
    if(search.name && search.name.length >0 && search.partnerCompanyId && search.partnerPersonId && search.dateFrom && search.dateTo)
    {
        where= {
            name:{
                [Op.like]: `%${search.name}%`   
            },
            partnerCompanyId:{
                [Op.eq]: `${search.partnerCompanyId}`
            },
            partnerPersonId:{
                [Op.eq]: `${search.partnerPersonId}`
            },
            dateFrom:{
                [Op.eq]: `${search.dateFrom}`
            },
            dateTo:{
                [Op.eq]: `${search.dateTo}`
            }
        }
    }
    console.log(where);
    const cost = await db.Cost.findAndCountAll({
        order,
        where,
        attributes:[
            'id','name','type','amount','processedDate','createdDate','lastModifiedDate','remark'
        ],
        include:[
            {
                model: db.PartnerPerson,as:'partnerPerson',
                include:[{
                    model: db.Person,
                    as:'person',
                    atrributes:['id','name']
                }],
            }
            ,{
                model: db.PartnerCompany,as:'partnerCompany',
                include:[{
                    model: db.Company,
                    as:'company',
                    atrributes:['id','name']
                }]
            }
        ],
        offset,
        limit
    });
    return cost;
    // await mapData(count,rows);
}
// async function mapData(count,rows){
//   const dataArr = [];
//   rows.forEach(element => {
//     let item = {
//       "id": element.id,
//       "name": element.name,
//       "type": element.type,
//       "amount":element.amount,
//       "partnerCompany":{
//         "id":element.partnerCompany.company.id,
//         "name":element.partnerCompany.company.name,
//       },
//       "partnerPerson":{
//         "id":element.partnerPerson.person.id,
//         "name":element.partnerPerson.person.firstName+" "+element.partnerPerson.person.lastName,
//       },
//       "processedDate":element.processedDate,
//       "createdDate": element.createdDate,
//       "lastModifiedDate":element.lastModifiedDate,
//       "remark": element.remark
//     }
//     dataArr.push(item);
//   });
//   const data = {
//     "count":count,
//     "rows":dataArr
//   }
//   return data;
// }
export async function createCost(user,createForm)
{
  const transaction = await db.sequelize.transaction();

  try {
    const cost = await db.Cost.create({
      name: createForm.name,
      remark: createForm.remark,
      companyId: createForm.companyId,
      type: createForm.type,
      partnerCompanyId: createForm.partnerCompanyId,
      partnerPersonId: createForm.partnerPersonId,
      processedDate: new Date(),
      amount: createForm.amount,
      createdById: user.id,
      createdDate: new Date(),
      companyId: user.companyId
    }, {transaction});
    // console.log(createForm.purposeId,createForm.relativeId);
    if (createForm.purposeId && createForm.purposeId.length && createForm.relativeId && createForm.relativeId.length) {
       await createCostPurpose(cost.id,createForm.purposeId,createForm.relativeId,transaction);
    }
    await transaction.commit();
    return cost;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
export async function getCost(cId) {
    const cost = await db.Cost.findOne({
      where: {
        id: cId
      },
      include:[
        {
            model: db.PartnerPerson,as:'partnerPerson',
            include:[{
                model: db.Person,
                as:'person'
            }],
        }
        ,{
            model: db.PartnerCompany,as:'partnerCompany',
            include:[{
                model: db.Company,
                as:'company'
            }]
        }
    ]
    });
    if (!cost) {
      throw badRequest('cost', FIELD_ERROR.INVALID, 'cost not found');
    }
    return cost;
}
export async function updateCost(cId, user, updateForm) {

  const existedCost = await db.Cost.findByPk(cId);
  if (!existedCost) {
    throw badRequest('cost', FIELD_ERROR.INVALID, 'cost not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    await existedCost.update({
      name: updateForm.name,
      remark: updateForm.remark,
      type: updateForm.type,
      partnerCompanyId: updateForm.partnerCompanyId,
      partnerPersonId: updateForm.partnerPersonId,
      processedDate: updateForm.processedDate,
      amount:updateForm.amount,
      lastModifiedDate:new Date(),
      lastModifiedById: user.id
    }, transaction);

    if (updateForm.purposeId && updateForm.purposeId.length && updateForm.relativeId && updateForm.relativeId.length) {
      await updateCostPurpose(existedCost.id,updateForm.purposeId,updateForm.relativeId,transaction);
    }
    await transaction.commit();
    return existedCost;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

}

export async function removeCost(costId) {
  const checkCost = await db.Cost.findByPk(costId);
  if (!checkCost) {
    throw badRequest('cost', FIELD_ERROR.INVALID, 'cost not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    await removeCostPurpose(checkCost.id, transaction);
    const cost = db.Cost.destroy({
      where: { id: checkCost.id }
    }, {transaction});
    await transaction.commit();
    return cost;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}