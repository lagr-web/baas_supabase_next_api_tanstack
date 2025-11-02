 import React, { useState } from 'react'

type Props = {

  modal: boolean;
  close: () => void;

 } 


  const ConFirmDelete = ({ modal, close }: Props) => {

   if (!modal) return false;

     const [deleted, setDeleted] = useState<boolean>(false);


     const deletePost = async () => {


        console.log('close');


  }


     return (
        <section className="absolute grid-rows-4 w-2xs bg-white rounded top-40 left-1/2 -translate-x-1/2 text-sm p-4 shadow-2xl" role="dialog" aria-modal="true">

        <p className="mb-10">Vil du slette denne post</p>

        <div className="flex justify-end grid-cols-2 pb-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mx-6 rounded cursor-pointer" value="cancel" onClick={close}>Annuller</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer" value="confirm" onClick={deletePost}>Slet</button>
        </div>

        <div className={deleted ? "block text-gray-600" : "hidden"} role="status">
          Din post blev slettet
        </div>

      </section>
     )
  }

 export default ConFirmDelete;
