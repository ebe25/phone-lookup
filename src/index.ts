import { Prisma, PrismaClient } from '@prisma/client';
import  express from 'express';
import * as dotenv from "dotenv";
const prisma = new PrismaClient();
dotenv.config();
const app =express();

app.use(express.json());




//get all artists api endpoint
app.get('/artists', async (req,res)=>{
    const allArtists = await prisma.artist.findMany();
    res.json({
        success: true,
        payload: allArtists,
        message: "Operation Successful",
    })
})
//Fetches all released songs.
app.get("/playlist", async (req,res)=>{
    const allSongs= await prisma.song.findMany({
        where: {
            released: true,
        },
        include: {
            singer: true,
        }
    })

    res.json({
        success: true,
        payload: allSongs,
    })
})
//Fetches a specific song by its Id.
app.get("/song/:id", async (req, res) => {
    const {id} = req.params
  const songId = await prisma.song.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

    res.json({
      success: true,
      payload: songId,
      
    });

   
      
  

});



//Creates a new artist.
app.post("/artist", async(req,res)=>{
    const artist = await prisma.artist.create({
        data: {...req.body}
    })
    res.json({
        sucess: true,
        payload: artist,
    })
})


//POST	/song	Creates (or compose) a new song (unreleased)
type UnrealeasedSong = {
    title: string,
    content: string,
    realeased: boolean,
    mail_add: string,
}
app.post("/song", async(req,res)=>{
    const {title, content, mail_add}: UnrealeasedSong = req.body;
    const postedUnpublisedSong = await prisma.song.create({
        data: {
            title, 
            content, 
            released: false,
            singer: { connect: { email: mail_add } as Prisma.ArtistWhereUniqueInput} ,
        }
    })
    res.json({
        success: true,
        payload: postedUnpublisedSong,
        message: "Song created succesfully",
    })
})


//middleware to send 404, error message if path not found
//notice it has no next arg called 
app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
  });

app.listen(process.env.API_PORT, ()=>{
    console.log("API exposed on port 8000");
})