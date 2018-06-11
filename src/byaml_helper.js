/**
* @copyright 2018 - Max Bebök
* @author Max Bebök
* @license GNU-GPLv3 - see the "LICENSE" file in the root directory
*/

const BYAML_Value = require("./byaml_value.js");

const nodeTypes = require("./node_types.json");
const idByName = {};

for(let id in nodeTypes)
{
    if(nodeTypes[id].dataType)
        idByName[nodeTypes[id].dataType] = id;
}

module.exports = class BYAML_Helper
{
    static createValue(typeName, value = undefined)
    {
        if(idByName[typeName])
            return new BYAML_Value(idByName[typeName], value);
    }

    static deepCopy(data)
    {
        if(data instanceof BYAML_Value)
            return data.copy();

        const newData = {};
        for(let name in data)
        {
            newData[name] = BYAML_Helper.deepCopy(data[name]);
        }
        
        return newData;
    }

    static toJSON(data)
    {
        return JSON.stringify(data, null, 4);
    }

    static fromJSON(str)
    {
        let byamlObj = JSON.parse(str);
        return BYAML_Helper._addObjectTypes(byamlObj);
    }

    static _addObjectTypes(obj)
    {
        if(obj.hasOwnProperty("type") && obj.hasOwnProperty("value"))
        {
            return new BYAML_Value(obj.type, obj.value);
        }

        for(const name in obj)
        {
            obj[name] = BYAML_Helper._addObjectTypes(obj[name]);
        }

        return obj;
    }
};
