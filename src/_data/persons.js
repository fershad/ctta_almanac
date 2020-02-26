const getPersonsData = require('../utils/data/persons');

module.exports = async () => {
    return await getPersonsData()
}