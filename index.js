const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());


const users =[
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
  
app.get('/',(req,res)=>{
    res.send('Artstry server')
});

app.get('/arts',(req,res)=>{
    res.send(users);

})
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})