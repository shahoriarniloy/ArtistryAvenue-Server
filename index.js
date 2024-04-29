const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const arts =[
    {
      id: 1,
      image: "https://i.ibb.co/wJKT9vL/48a8b088688ac81138c2742a3805451e.jpg",
      item_name: "Mountain View Canvas",
      subcategory_Name: "Landscape Painting",
      short_description: "Beautiful canvas depicting a serene mountain landscape.",
      price: "$100",
      rating: 4.6,
      customization: "Yes",
      processing_time: "2-3 weeks"
    },
    {
      id: 2,
      image: "https://i.ibb.co/x8sg6cG/7c50eaa84e8a3a176013d6e3c4d66bc8.jpg",
      item_name: "Forest Based Landscape Painting",
      subcategory_Name: "Landscape Painting",
      short_description: "Captivating painting capturing the tranquility of a forest landscape.",
      price: "$120",
      rating: 4.8,
      customization: "Yes",
      processing_time: "3-4 weeks"
    },
    {
      id: 3,
      image: "https://i.ibb.co/McRb1VM/9793776abf41959dfc00a3f9e477580a.jpg",
      item_name: "Pencil Sketch Portrait",
      subcategory_Name: "Portrait Drawing",
      short_description: "Detailed pencil sketch capturing the essence of the subject.",
      price: "$80",
      rating: 4.5,
      customization: "Yes",
      processing_time: "1-2 weeks"
    },
  ];



  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://niloyshahoriar:WcBAHfnEVRLwhjm7@cluster0.dxgrzuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("artsDB");
    const artsCollection =database.collection("arts");
    const userCollection = client.db('artsDB').collection('arts');


    app.get('/arts',async(req,res)=>{
        const cursor = artsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    
    })

    
    app.post('/arts',async(req,res)=>{
        const newArts= req.body;
        newArts.id = arts.length+1;
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

    app.delete('/userarts/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }; 
        const result = await userCollection.deleteOne(query);
        res.json(result);
       
    });
    
    
    



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
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