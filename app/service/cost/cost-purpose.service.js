import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';

export function createCostPurpose(costId, purposeId, relativeId, transaction) {
    try {
        return db.CostPurpose.create({
            costId: costId,
            purposeId: purposeId,
            relativeId: relativeId
        },{transaction});
    } catch (error) {
        throw error;
    }
}
export function updateCostPurpose(costId, purposeId, relativeId, transaction) {
    const costPurposeUpdate = db.CostPurpose.findByPk(costId);
    try {
        return costPurposeUpdate.update({
            purposeId: purposeId,
            relativeid: relativeId
        },{transaction});
        
    } catch (error) {
        throw error;
    }
}
export function removeCostPurpose(costId,transaction) {
    try {
        return db.CostPurpose.destroy(
            {
                where:{costId:costId}
            },{transaction});  
    } catch (error) {
        throw error;
    }
}