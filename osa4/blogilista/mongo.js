require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
if (!url) {
  console.log('MONGODB_URI missing from .env')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const usage = () => {
  console.log('Usage:')
  console.log('  node mongo.js                      # list blogs')
  console.log('  node mongo.js "title" "author" "url" likes   # add blog')
}

const main = async () => {
  if (process.argv.length === 2) {
    const blogs = await Blog.find({})
    blogs.forEach((b) => console.log(b))
    return
  }

  
  if (process.argv.length !== 6) {
    usage()
    return
  }

  const likes = Number(process.argv[5])
  if (Number.isNaN(likes)) {
    console.log('Likes must be a number. You gave:', process.argv[5])
    return
  }

  const blog = new Blog({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes,
  })

  await blog.save()
  console.log('blog saved!')
}

main()
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
