'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const SALT_ROUNDS = 8

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  status: { type: Number, enum: [1, 0], default: 1, select: false },
  lang: { type: String, enum: ['es', 'en'], default: 'es' },
  admin: { type: Number, enum: [1, 0], default: 0 }
})

UserSchema.pre('save', async function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    user.password = await hashPassword(user.password)
    next()
  } catch (error) {
    return error
  }
})

UserSchema.pre('updateOne', async function(next) {
  const user = this._update
  
  if (user && !user.password) return next()

  try {
    user.password = await hashPassword(user.password)
    next()
  } catch (error) {
    return error
  }
})

UserSchema.method('comparePassword', function(candidatePassword) {
  const user = this
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
})

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
      if (err) return reject(err)
  
      resolve(hash)
    })
  })
}

module.exports = mongoose.model('User', UserSchema, 'user')
