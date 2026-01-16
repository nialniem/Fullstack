const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

if (process.argv.length < 6) {
  console.log('give the necessary arguments to create a new blog')
  process.exit(1)
}

const password = process.argv[2]
const title = process.argv[3]
const author = process.argv[4]
const blogUrl = process.argv[5]
const likes = Number(process.argv[6])


const url = `mongodb+srv://niklasnieminen1:${password}@cluster0.kujlfmy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => {
    console.error('error connecting to MongoDB:', err.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: title,
  author: author,
  url: blogUrl,
  likes: likes,
})

blog.save().then(() => {
  console.log(`added ${title} of ${author} located in ${blogUrl} with ${likes}`)
  mongoose.connection.close()
})

