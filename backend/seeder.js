import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import users from './data/users.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // await Order.deleteMany()
    // await Product.deleteMany()
    // await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    // await User.insertMany(createdUsers)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)

    process.exit()
  } catch (err) {
    console.error(`💥💥💥 ${err}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.underline)

    process.exit()
  } catch (err) {
    console.error(`💥💥💥 ${err}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
