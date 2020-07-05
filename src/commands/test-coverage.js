const shellSpawn = require('../shellSpawn');
const pathFinder = require('../utils/pathFinder');
const path = require('path');

function testCoverage() {
    const jestDefaultConfigPath = path.resolve(__dirname, '../../etc/jest.config.js');
    const jestLocalConfigPath = './jest.config.js';

    const jestConfigPath = pathFinder(jestLocalConfigPath, jestDefaultConfigPath);

    shellSpawn('./node_modules/.bin/jest', [ '--config', jestConfigPath, '--rootDir', './', '--coverage' ]);
}

module.exports = testCoverage;