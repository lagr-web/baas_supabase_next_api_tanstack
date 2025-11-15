

"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  close: () => void;
  id: number;
};

const ConfirmDelete = ({ close, id }: Props) => {
    
  const queryClient = useQueryClient();

  const [statusMsg, setStatusMsg] = useState("");

  const deletePost = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {

      const res = await fetch(`http://localhost:3000/api/supa/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Fejl ved sletning");
      }

      return res.json();
    },

    // Når sletning lykkes
    onSuccess: () => {
      console.log("Post slettet!");
      queryClient.invalidateQueries({ queryKey: ["mydata"] });

      // Vis besked
      setStatusMsg("Slettet!");

      // Luk efter et kort øjeblik
      setTimeout(() => {
        close();
      }, 1000);
    },

    // Ved fejl
    onError: (error) => {
      console.error("Fejl:", error);
      setStatusMsg("Noget gik galt ved sletning.");
    },

  });

  return (

    <section
      className="absolute grid-rows-4 w-2xs bg-white rounded top-40 left-1/2 -translate-x-1/2 text-sm p-4 shadow-2xl"
      role="dialog"
      aria-modal="true"
    >
      <p className="mb-10">Vil du slette denne post?</p>

      <div className="grid justify-end grid-cols-2 pb-4">

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mx-6 rounded cursor-pointer"
          value="cancel"
          onClick={close}
        >
          Annuller
        </button>

        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
          value="confirm"
          onClick={() => deletePost.mutate(String(id))}
          disabled={deletePost.isPending}
        >
          Slet
        </button>
      </div>

      <div className="block text-gray-600 text-center mt-2 font-medium text-base" role="status">
        {deletePost.isPending
          ? "Sletter..."
          : statusMsg
          ? statusMsg
          : ""}
      </div>
    </section>
    
  );
};

export default ConfirmDelete;
