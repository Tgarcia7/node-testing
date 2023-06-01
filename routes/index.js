'use strict'

const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.get('/health', (req, res) => {
  res.status(200).send({ message: 'UP' })
})

router.get('/users', auth, userController.findAll)
router.get('/users/:id', auth, userController.findById)
router.put('/users/:id', auth, userController.update)
router.post('/signup', userController.signUp)
router.post('/signin', auth, userController.signIn)
router.delete('/users/:id', auth, userController.deleteOne)
router.post('/users/refresh-token', auth, userController.refreshToken)
router.delete('/users/refresh-token/:id', auth, userController.deleteRefreshToken)
router.patch('/users/:id/change-password/', auth, userController.changePassword)

// Handle 404
router.use((req, res) => {
  res.status(404).send({ message: 'Not found' })
})

module.exports = router
