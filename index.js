const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// After app is initialized
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Or set it to specific origins as needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

// app.use(
//     cors({
//         origin: ['http://localhost:5173', 'https://artistryavenue-2aebe.web.app'],
//         credentials: true,
//     }),
//   )

//   const corsOptions = {
//     origin: ['http://localhost:5173', 'https://artistryavenue-2aebe.web.app'],
//     credentials: true,
//     optionSuccessStatus: 200,
//     }
//     app.use(cors(corsOptions))

// app.use(cors());
// app.use(express.json());

// CORS options
// const corsOptions = {
//     origin: ['http://localhost:5173', 'https://artistryavenue-2aebe.web.app'],
//     credentials: true,
//     optionSuccessStatus: 200,
//   };
  
//   app.use(cors(corsOptions));
  app.use(express.json());




  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dxgrzuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    // strict: true,
    strict: false,

    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("artsDB");
    const artsCollection =database.collection("arts");
    const subCategoryCollection =database.collection("sub_categories");
    const reviewsCollection =database.collection("reviews");


    const userCollection = client.db('artsDB').collection('arts');


    app.get('/arts',async(req,res)=>{
        const cursor = artsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    
    })

    app.get('/subcategory',async(req,res)=>{
        const cursor = subCategoryCollection.find();
        const result = await cursor.toArray();
        console.log(result);

        res.send(result);
    
    })

 app.post('/arts',async(req,res)=>{
        const newArts= req.body;
        console.log(newArts);
        result = await artsCollection.insertOne(newArts);
        res.send(result);
    });

   

    app.get('/userArts', async (req, res) => {
        try {
            const userEmail = req.query.email; 
            const query = { user_email: userEmail }; 
            const userArts = await artsCollection.find(query).toArray(); 
            // console.log(`UserArts:`,userArts);
            res.json(userArts); 
        } catch (error) {
            console.error('Error fetching:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


    app.put('/arts/:id',async(req,res)=>{
        const id =req.params.id;
        const art = req.body;
        // console.log(id, updatedArt);
        const filter = {_id:new ObjectId(id)}
        const options = {upsert:true}
        const updatedArt = {
            $set:{
                image:art.image,
                item_name:art.item_name,
                subcategory_Name:art.subcategory_Name,
                short_description:art.short_description,
                price:art.price,
                rating:art.rating,
                customization:art.customization,
                processing_time:art.processing_time,
                stockStatus:art.stockStatus,
                user_email:art.user_email,
                user_name:art.user_name
            }            
        }
        const result = await userCollection.updateOne(filter, updatedArt, options);
        res.send(result);
    })

    app.delete('/userarts/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }; 
        const result = await userCollection.deleteOne(query);
        res.json(result);
       
    });

    app.get('/userart/:id', async(req,res)=>{
        const id= req.params.id;
        const query = {_id: new ObjectId(id)};
        const art =await userCollection.findOne(query);
        res.send(art);
    })

   
    app.get('/subcategory/arts/:name', async (req, res) => {
        const subcategory = req.params.name;
        console.log(subcategory);
    
       
            const filteredArts = await artsCollection.find({ subcategory_Name: subcategory }).toArray();
    
            res.json(filteredArts);
       
      
    });

    app.get('/users', async (req, res) => {
        try {
            const users = await artsCollection.find({}, { _id: 0, user_name: 1, user_email: 1 }).toArray();
            console.log(users);
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

     
    app.post('/reviews',async(req,res)=>{
        const newReviews= req.body;
        result = await reviewsCollection.insertOne(newReviews);
        res.send(result);
    });

    app.get('/reviews',async(req,res)=>{
        const cursor = reviewsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    
    })

 
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

  
app.get('/',(req,res)=>{
    res.send('Artstry server')
});





app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})