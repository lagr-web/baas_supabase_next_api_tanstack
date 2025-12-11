"use client";
import { useActionState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "@/actions/update";
import TextFields from "./Textfields";
import Button from "./Button";
import { X } from "lucide-react";

type Props = {
  close: () => void;
  id: number | null;
};

const UpdateDataAction = ({ close, id }: Props) => {

  if (id === null) return null;

  // 1. Hent eksisterende data (som før)
  const { data, isLoading } = useQuery({
    queryKey: ["mydata", id],
    queryFn: async () => {
      const res = await fetch(`/api/supa/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  // 2. Setup Server Action
  // Vi "binder" ID'et til actionen, så den ved hvilken række der skal opdateres
  const updateUserWithId = updateUserData.bind(null, id);

  const [state, formAction, isPending] = useActionState(updateUserWithId, null); //bruger useActionState til at håndtere server action. Den returnerer state, formAction og isPending
const queryClient = useQueryClient();

  // Luk modal når opdatering er succesfuld
  useEffect(() => {
    if (state?.success) {// hvis opdateringen var en succes
         queryClient.invalidateQueries({ queryKey: ["mydata"] });
      setTimeout(() => close(), 1000);
    }
  }, [state, close]);

  if (isLoading) return <div>Henter data...</div>;

  const person = data?.data ?? data;

  return (
    <section className="modal-container">
      <div className="grid grid-cols-1 items-center">
        <div className="justify-self-end" onClick={close}><X /></div>
      </div>

      {/* action={formAction} erstatter onSubmit={handleSubmit} */}
      <form action={formAction}>
        <TextFields
          label="Name"
          name="name"
          defaultValue={person?.name || ""}
        />
        <TextFields
          label="Lastname"
          name="lastname"
          defaultValue={person?.lastname || ""}
        />

        <Button disabled={isPending}>
          {isPending ? "Gemmer..." : "Opdater"}
        </Button>
      </form>

      <div className="block text-gray-600 text-center mt-2">
        {state?.success && "Opdateret!"}
        {state?.error && <span className="text-red-500">{state.error}</span>}
      </div>
    </section>
  );
};

export default UpdateDataAction;
