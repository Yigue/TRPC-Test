import React, { ChangeEvent, FormEvent, useState } from "react";
import {trpc} from '../trpc'
function NoteForm() {

  const createNote=trpc.note.create.useMutation()

  const utils= trpc.useContext()



  const [note, setNote] = useState({
    title: "",
    description:""
  });
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(note);

    createNote.mutate(note,{
      onSuccess:()=>{
        console.log("nota creada");
        utils.note.get.invalidate()
      },
      onError:()=>{
      }
    })
    
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({...note,[e.target.name]:e.target.value})
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        placeholder="title"
        name="title"
        autoFocus
      />

      <textarea
        onChange={handleChange}
        name="description"
        placeholder="description"
      ></textarea>

      <button>save</button>
    </form>
  );
}

export default NoteForm;
