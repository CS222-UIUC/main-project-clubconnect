"use strict";
/*
  Considerations:
    - type of ids for events, user, orgs, do you want it to be a string?
    - converting special types like dates into their mongodb counterparts
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestType = void 0;
var InterestType;
(function (InterestType) {
    InterestType[InterestType["Professional"] = 0] = "Professional";
    InterestType[InterestType["Recreational"] = 1] = "Recreational";
    InterestType[InterestType["Other"] = 2] = "Other";
})(InterestType || (exports.InterestType = InterestType = {}));
