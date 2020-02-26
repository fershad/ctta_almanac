function generateSupporter (data) {
    return {
      ...data,
      eventCount: data.events.length,
    }
  }

  module.exports = generateSupporter