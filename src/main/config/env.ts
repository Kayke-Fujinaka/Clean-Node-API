export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'ha&1=1-1r3_a'
}
