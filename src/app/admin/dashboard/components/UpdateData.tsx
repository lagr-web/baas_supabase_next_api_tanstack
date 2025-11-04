//src/app/admin/dashboard/components/UpdateData.tsx

import TextFields from './Textfields';
import Button from './Button';
import { X } from "lucide-react";

type Props = {

    close: () => void;
    id: number; // eller id: number | undefined

}

const UpdateData = ({ close, id }: Props) => {

    return (

        <section
            className="absolute grid-rows-4 w-2xs bg-white rounded top-40 left-1/2 -translate-x-1/2 text-sm pt-2 px-4 pb-4 shadow-2xl"
            role="dialog"
            aria-modal="true"
        >
            <div className="grid grid-cols-1 items-center">

                <div className="justify-self-end" onClick={close}><X /></div>
            </div>

            <form>

                <TextFields
                    label="Name"
                    name="name"

                />
                <span className="text-gray-400 text-sm">
                </span>

                <TextFields
                    label="Lastname"
                    name="lastname"

                />
                <span className="text-gray-400 text-sm">
                </span>

                <Button />

            </form>

        </section>

    )
}

export default UpdateData;
