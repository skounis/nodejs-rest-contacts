import { Contact } from '.'

let contact

beforeEach(async () => {
  contact = await Contact.create({ firstname: 'test', lastname: 'test', email: 'test', phones : [{ phoneType: 'test', phoneNumber: 'test'}] })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = contact.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contact.id)
    expect(view.firstname).toBe(contact.firstname)
    expect(view.lastname).toBe(contact.lastname)
    expect(view.phones[0].phoneType).toBe(contact.phones[0].phoneType)
    expect(view.phones[0].phoneNumber).toBe(contact.phones[0].phoneNumber)
    expect(view.email).toBe(contact.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = contact.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contact.id)
    expect(view.firstname).toBe(contact.firstname)
    expect(view.lastname).toBe(contact.lastname)
    expect(view.phones[0].phoneType).toBe(contact.phones[0].phoneType)
    expect(view.phones[0].phoneNumber).toBe(contact.phones[0].phoneNumber)
    expect(view.email).toBe(contact.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
