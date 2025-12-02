"use client";

import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextFields from "./Textfields";
import Button from "./Button";

type Props = {

    close: () => void;
   
}

const PostData = ({ close }: Props) => {

  //rammer den nøjagtige samme cache, som din hydrering og dine useQuery hooks bruger.

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");


  const addPerson = useMutation({

    mutationFn: async (newPerson: { name: string; lastname: string }) => {

      const res = await fetch("/api/supa/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newPerson),
      });

      if (!res.ok) throw new Error("Failed to post data");
      return res.json();
    },

    onSuccess: () => {
      console.log("posted with success");
      // Opdater evt. liste
      queryClient.invalidateQueries({ queryKey: ["mydata"] });
      setName("");
      setLastName("");
       setTimeout(() => close(), 1000);
    },

  });


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPerson.mutate({ name, lastname });
  };

  return (

    <div className="absolute grid-rows-4 w-2xs bg-white rounded top-40 left-1/2 -translate-x-1/2 text-sm pt-2 px-4 pb-4 shadow-2xl">

      <form
        onSubmit={handleSubmit}
     
      >

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Tilføj person
        </h2>

        <div className="grid grid-col gap-0">

             <TextFields
                   
                    name="name"
                    value={name}
                     placeholder="Fornavn"
                    onChange={(e) => setName(e.target.value)}
                />

                   <TextFields
                   
                    name="lastname"
                    value={lastname}
                     placeholder="Efternavn"
                    onChange={(e) => setLastName(e.target.value)}
                />

        <Button 
         className={`transition ${addPerson.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-500 cursor-pointer"
              }`} 
             > 
            Send
        </Button>
 
        </div>

        {/* Feedback-sektion */}
        <div className="mt-4 text-center">
          {addPerson.isSuccess && (
            <p className="text-grey-600 font-medium"> Dine data er gemt!</p>
          )}
          {addPerson.isError && (
            <p className="text-red-600 font-medium">
              Der opstod en fejl. Prøv igen.
            </p>
          )}
        </div>


      </form>
    </div>


  );
};

export default PostData;
