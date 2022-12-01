import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("calendar-diary");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost);
      break;
    case "GET":
      const allPosts = await db.collection("posts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
    case "DELETE":
      let body = JSON.parse(req.body);
      let deletePost = await db.collection("posts").deleteOne({title : {$eq: body.title}, date: {$eq: body.date}});
      res.json(deletePost);
      break;
    case "PUT":
      let putBody = JSON.parse(req.body);
      let putPost = await db.collection("posts").updateOne(
        {title : {$eq: putBody.title}, date: {$eq: putBody.date}},
        {$set: {title: putBody.newPost.title, date: putBody.newPost.date, entry: putBody.newPost.entry}}
      );
      res.json(putPost);
      break;
  }
}