"use client";

import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Page = () => {

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
    },

  });


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPerson.mutate({ name, lastname });
  };

  return (

    <div className="grid grid-col items-center justify-center h-screen bg-gray-400">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Tilføj person
        </h2>

        <div className="grid grid-col gap-3">

          <input
            type="text"
            name="name"
            value={name}
            placeholder="Fornavn"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Efternavn"
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <button
            type="submit"
            disabled={addPerson.isPending}
            className={`rounded-lg p-2 text-white font-medium transition ${addPerson.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
              }`}
          >
            {addPerson.isPending ? "Sender..." : "Send"}
          </button>

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

export default Page;
