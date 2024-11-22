"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganization = createOrganization;
exports.getOrganizationById = getOrganizationById;
const organization_1 = require("./organization");
function createOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // does the organization field exist in the body
        if (req.body.organization == undefined) {
            res.status(400).json({ message: "No organization field in request body" });
            return;
        }
        // try to parse the organization from the body
        if (!isOrganization(req.body.organization)) {
            res.status(400).json({ message: "Incorrect JSON structure for organization. Check fields" });
            return;
        }
        const parsedOrganization = req.body.organization;
        const newOrganization = new organization_1.organizationModel(parsedOrganization);
        yield newOrganization.save();
        res.sendStatus(200);
    });
}
/** Used to retrieve organizations by their MongoDB _id
 * We chose to use ids because it is what users will store in their database object when they follow an org
 */
function getOrganizationById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const organizationId = req.query.id;
            if (organizationId == undefined) {
                res.status(400).json({ message: "Provide an id query parameter with the mongodb id to retrieve the organization" });
                return;
            }
            const organizationObject = yield organization_1.organizationModel.findOne({ _id: organizationId });
            if (organizationObject == null) {
                res.status(404).json({ message: "Organization with provided id could not be found" });
                return;
            }
            res.status(200).json({ response: JSON.stringify(organizationObject) });
        }
        catch (error) {
            res.status(400).json({ message: JSON.stringify(error) });
        }
    });
}
function isOrganization(requestBodyOrganization) {
    try {
        requestBodyOrganization;
        return true;
    }
    catch (_a) {
        return false;
    }
}
