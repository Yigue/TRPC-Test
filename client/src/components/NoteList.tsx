import { json } from "express";
import { trpc } from "../trpc";
import NoteCard from "./NoteCard";

function NoteList() {
  const { data, isLoading, isError,error } = trpc.note.get.useQuery();
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>error {error.message}</div>;
     

  return (
    <>
        {
          data.map((note:any)=>{
            return <NoteCard note={note} key={note._id} />;
          })
        }
    </>
  );
}

export default NoteList;
