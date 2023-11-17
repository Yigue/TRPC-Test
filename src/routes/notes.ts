import {publicProcedure,router} from '../trpc'
import {z} from 'zod'
import  Note  from "../models/note";



const getNotes=publicProcedure.query(async()=>{
  const notes = await Note.find() 
  return notes
})


const createNote = publicProcedure
.input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    console.log(input);
    const newNote=new Note(input)
    const saveNote=await newNote.save()

    return saveNote;
  });

const deleteNote = publicProcedure.input(z.string()).mutation(
  async ({input})=>{
 
    const foundNote= await Note.findByIdAndDelete(input)
    if(foundNote){
     return true;
     }else{
      throw new Error("Not found")
    }
  }
)
const toggleNote = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const foundNote = await Note.findById(input);
    if (foundNote) {
      foundNote.done= !foundNote.done
      await foundNote.save()
      return true;
    } else {
      throw new Error("Not found");
    }
  });


export const notesRouter = router({
  get: getNotes,
  create: createNote,
  delete: deleteNote,
  toggle: toggleNote,
});