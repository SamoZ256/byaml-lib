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
};
