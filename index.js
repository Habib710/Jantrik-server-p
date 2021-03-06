const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = process.env.PORT || 3300

// midelware.......
app.use(cors())
app.use(express.json())

// user = jantrik
// pass = kQXB8o38eDNUZhay

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9h3fk.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    await client.connect()

    const collection = client.db('Jantrik').collection('Tools')
    const Orderscollection = client.db('Orders').collection('Data')
    const Reviewscollection = client.db('Allreviews').collection('Reviews')
    const Myprofilecollection = client.db('Myprofile').collection('prolifedata')

    app.get('/alltool', async (req, res) => {
      const queray = {}
      const cursor = collection.find(queray)
      const data = await cursor.toArray()
      res.send(data)
    })
    app.get('/reviews', async (req, res) => {
      const queray = {}
      const cursor = Reviewscollection.find(queray)
      const data = await cursor.toArray()
      res.send(data)
    })
    app.get('/profile', async (req, res) => {
      const queray = {}
      const cursor = Myprofilecollection.find(queray)
      const data = await cursor.toArray()
      res.send(data)
    })

    app.post('/reviews', async (req, res) => {
      const newreviews = req.body

      const result = await Reviewscollection.insertOne(newreviews)
      res.send(result)
    })
    app.post('/profile', async (req, res) => {
      const myinfo = req.body

      const result = await Myprofilecollection.insertOne(myinfo)
      res.send(result)
    })

    app.get('/alltool/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: id }
      console.log(query)
      const item = await collection.findOne(query)
      console.log(item)
      res.send(item)
    })

    app.get('/orders/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      console.log(query)
      const result = await Orderscollection.findOne(query)
      console.log(result)
      res.send(result)
    })

    app.post('/orders', async (req, res) => {
      const Myorders = req.body
      const result = await Orderscollection.insertOne(Myorders)
      res.send(result)
    })
    app.get('/orders', async (req, res) => {
      const queray = {}
      const cursor = Orderscollection.find(queray)
      const Orders = await cursor.toArray()
      res.send(Orders)
    })
    // deleted...........
    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const deletorder = await Orderscollection.deleteOne(query)
      res.send(deletorder)
    })
  } finally {
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening  ${port}`)
})
