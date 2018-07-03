import { success, notFound } from '../../services/response/'
import { Contact } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
    console.log("Create contact: " + JSON.stringify(body));
    return Contact.create(body)
      .then((contact) => contact.view(true))
      .then(success(res, 201))
      .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Contact.find(query, select, cursor)
    .then((contacts) => contacts.map((contact) => contact.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Contact.findById(params.id)
    .then(notFound(res))
    .then((contact) => contact ? contact.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Contact.findById(params.id)
    .then(notFound(res))
    .then((contact) => contact ? Object.assign(contact, body).save() : null)
    .then((contact) => contact ? contact.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Contact.findById(params.id)
    .then(notFound(res))
    .then((contact) => contact ? contact.remove() : null)
    .then(success(res, 204))
    .catch(next)
