import mongoose, { Schema } from 'mongoose'

const contactSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  phones: [{
    phoneType: String,
    phoneNumber: String
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

contactSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phones: this.phones,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Contact', contactSchema)

export const schema = model.schema
export default model
