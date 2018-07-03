import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Contact, { schema } from './model'

const router = new Router()
const { firstname, lastname, phones, email } = schema.tree

/**
 * @api {post} /contacts Create contact
 * @apiName CreateContact
 * @apiGroup Contact
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam firstname Contact's firstname.
 * @apiParam lastname Contact's lastname.
 * @apiParam phones Contact's phones.
 * @apiParam email Contact's email.
 * @apiSuccess {Object} contact Contact's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contact not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(), // Auth with master
  // token({ required: true, roles: ['user'] }), // Auth with User
  body({ firstname, lastname, phones, email }),
  create)

/**
 * @api {get} /contacts Retrieve contacts
 * @apiName RetrieveContacts
 * @apiGroup Contact
 * @apiUse listParams
 * @apiSuccess {Object[]} contacts List of contacts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /contacts/:id Retrieve contact
 * @apiName RetrieveContact
 * @apiGroup Contact
 * @apiSuccess {Object} contact Contact's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contact not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /contacts/:id Update contact
 * @apiName UpdateContact
 * @apiGroup Contact
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam firstname Contact's firstname.
 * @apiParam lastname Contact's lastname.
 * @apiParam email Contact's email.
 * @apiSuccess {Object} contact Contact's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contact not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ firstname, lastname, email }),
  update)

/**
 * @api {delete} /contacts/:id Delete contact
 * @apiName DeleteContact
 * @apiGroup Contact
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Contact not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
