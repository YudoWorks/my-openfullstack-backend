require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ?
  process.env.TEST_MONGO_ATLAS_URI : process.env.MONGO_ATLAS_URI

module.exports = {
  PORT, MONGODB_URI
}
