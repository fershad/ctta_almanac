const groq = require('groq')
const client = require('../sanityClient')

function generateSite (data) {
    return {
      ...data
    }
  }
  
  async function getSiteData () {
    const filter = groq`*[_type == "site" && !(_id in path("drafts.**"))]`
    const projection = groq`{
      ...
    }`
    const order = `| order(_updatedAt desc) [0]`
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepSite = docs
    //console.log(prepareWorks)
    return prepSite
  }
  
  module.exports = getSiteData