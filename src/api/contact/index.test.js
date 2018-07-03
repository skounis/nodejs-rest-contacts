import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Contact } from '.'

const app = () => express(apiRoot, routes)

let contact;

beforeEach(async () => {
  contact = await Contact.create({});
})

test('POST /contacts 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, firstname: 'test', lastname: 'test', email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.firstname).toEqual('test')
  expect(body.lastname).toEqual('test')
  expect(body.email).toEqual('test')
})

test('POST /contacts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /contacts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /contacts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${contact.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(contact.id)
})

test('GET /contacts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /contacts/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${contact.id}`)
    .send({ access_token: masterKey, firstname: 'test', lastname: 'test', email: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(contact.id)
  expect(body.firstname).toEqual('test')
  expect(body.lastname).toEqual('test')
  expect(body.email).toEqual('test')
})

test('PUT /contacts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${contact.id}`)
  expect(status).toBe(401)
})

test('PUT /contacts/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, firstname: 'test', lastname: 'test', email: 'test' })
  expect(status).toBe(404)
})

test('DELETE /contacts/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${contact.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /contacts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${contact.id}`)
  expect(status).toBe(401)
})

test('DELETE /contacts/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
