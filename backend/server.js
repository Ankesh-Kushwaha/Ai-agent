import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from  'mongoose'
const app = express();
const PORT = process.env.PORT || 3000;
import finalRoute from './routes/routes.js'
import { serve }  from 'inngest/express'
import  { inngest }  from "./ingest/client.js"
import { OnuserSignUp } from './ingest/functions/on-signup.js'
import  { onTicketCreated}  from './ingest/functions/on-ticket-create.js'


app.use(cors());
app.use(express.json());

//connectToDB();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.log(err.message);
  });

app.use('/api/v1/', finalRoute); 

app.use('/api/inngest',
  serve({
    client: inngest,
    functions:[OnuserSignUp,onTicketCreated]
  })
)

app.listen(PORT, () => {
  console.log(`server is running at ${process.env.APP_URL}`);
})