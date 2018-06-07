const BYAML = require("./../index.js");
const fs = require("fs");

describe('BYAML integration', function() 
{
    it('test', function()
    {
        this.timeout(1000 * 5);

        const orgPath = "/home/mbeboek/.ice-spear-projects/test/shrines/Dungeon000.pack/Map/CDungeon/Dungeon000/Dungeon000_Dynamic.byaml";
        const byamlOrgBuff = fs.readFileSync(orgPath);

        const byamlReader = new BYAML.Parser();
        const data = byamlReader.parse(orgPath);

        const byamlCreator = new BYAML.Creator();
        const byamlNew = byamlCreator.create(data);

        fs.writeFileSync(orgPath+".bin", byamlNew);
    });
});