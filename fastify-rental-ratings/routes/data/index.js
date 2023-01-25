'use strict'
const DataService = require('../../services/data.service')

module.exports = async function (fastify, opts) {
  const dataService = new DataService()

  fastify.get('/getAll', async function (request, reply) {
    let res = {
      statusCode: 400,
      message: 'No search type provided'
    }

    if (request.query.searchType === 'landlord') {
      res = await dataService.getAllLandlords()
    }
    if (request.query.searchType === 'property') {
      res = await dataService.getAllProperties()
    }
    if (request.query.searchType === 'city') {
      res = await dataService.getAllCities()
    }

    reply
      .code(res.statusCode)
      .send(res.message)
  })

  fastify.get('/search', async function (request, reply) {
    let res = {
      statusCode: 400,
      message: 'Error with query'
    }

    if (request.query.searchType === 'landlord')
      res = await dataService.searchLandlords(request.query.searchQuery)
    if (request.query.searchType === 'property')
      res = await dataService.searchProperties(request.query.searchQuery)
    if (request.query.searchType === 'city')
      res = await dataService.searchCities(request.query.searchQuery)

    reply
      .code(res.statusCode)
      .send(res.message)
  })

  fastify.get('/getReviews', async function (request, reply) {
    let res = {
      statusCode: 400,
      message: 'Error with query'
    }

    if (request.query.searchType === 'landlord')
      res = await dataService.getLandlordReviews(request.query.id)
    if (request.query.searchType === 'property')
      res = await dataService.getPropertyReviews(request.query.id)
    if (request.query.searchType === 'city')
      res = await dataService.getCityReviews(request.query.id)

    reply
      .code(res.statusCode)
      .send(res.message)
  })
}