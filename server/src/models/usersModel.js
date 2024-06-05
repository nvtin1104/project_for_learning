import {ObjectId} from 'mongodb'

const Joi = require('joi')
const {GET_DB} = require('~/config/mongodb')
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().default(null),
    password: Joi.string().max(60).required(),
    avatar: Joi.string().default('https://www.gravatar.com/avatar/'),
    birthday: Joi.date
    ().default(null),
    gender:
        Joi.string().valid('men', 'women', 'other').default('other'),
    createdAt:
        Joi.date().default(Date.now()),
    updatedAt:
        Joi.date().default(null),
    verifiedDate:
        Joi.date().default(null),
    refreshToken:
        Joi.string(),
    status:
        Joi.string().valid('active', 'inactive').default('active'),
    type:
        Joi.string().valid('student', 'teacher', 'parent').default('student'),
    role:
        Joi.string().valid('user', 'admin').default('user')
})
const userUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().max(60),
    avatar: Joi.string(),
    birthday: Joi.date().timestamp('javascript').raw(),
    updatedAt: Joi.date().default(Date.now()),
    gender: Joi.string().valid('men', 'women', 'other'),
    status: Joi.string().valid('active', 'inactive'),
    verifiedDate: Joi.date(),
    refreshToken: Joi.string(),
    type: Joi.string().valid('student', 'teacher', 'parent')
})

const create = async (data) => {
    try {
        const validData = await userSchema.validateAsync(data, {abortEarly: true})
        const db = await GET_DB()
        const result = await db.collection('users').insertOne(validData)
        const user = await db.collection('users').findOne({_id: result.insertedId})
        delete user.password
        return user
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const validData = await userUpdateSchema.validateAsync(data, {abortEarly: true})
        const db = await GET_DB()
        await db.collection('users').updateOne({_id: new ObjectId(id)}, {$set: validData})
        const user = await db.collection('users').findOne({_id: new ObjectId(id)})
        delete user.password
        return user
    } catch (error) {
        throw new Error(error)
    }
}
const getAll = async () => {
    try {
        const db = await GET_DB()
        const users = await db.collection('users').find({}).toArray()
        users.forEach(user => {
            delete user.password
        })
        return users
    } catch (error) {
        throw new Error(error)
    }
}
const getUserBy = async (data, option) => {
    try {
        const db = await GET_DB()
        const user = await db.collection('users').findOne({[option]: data})
        if (user) {
            delete user.password
        }
        return user
    } catch (error) {
        throw new Error(error)
    }
}
const deleteUserById = async (id) => {
    try {
        const db = await GET_DB()
        return await db.collection('users').deleteOne({_id: new ObjectId(id)})
    } catch (error) {
        throw new Error(error)
    }
}
export const UserModel = {
    create,
    getAll,
    getUserBy,
    deleteUserById,
    update
}