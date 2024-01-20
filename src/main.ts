import {PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
    // ... your Prisma Client queries will go here
    // const newArtist = await prisma.artist.create({
    //     data: {

    //         email: "new_artist@prisma.com",
    //         name: "new_artist",
    //         songs: {
    //             create:{
    //                 title: "bitch i am back!",
    //                 content: "bitch i am back, yo iamma back!",
    //             }
    //         }
    //     }
    // })
    // console.log("created new artist ", newArtist);
  }

  const allArtist = await prisma.artist.findMany({
    include: {songs: true}
  })
  console.log("all artists" )
  console.dir(allArtist, { depth: null })
  
  main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())


 //add a new artist 
    //-> use data api to pass in the data 
    //-> use create api to create something 
 //list all artists   