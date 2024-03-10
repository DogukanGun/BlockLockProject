"use client"
import { useRouter } from "next/navigation"
import lockManagerAbi from "../../../public/lockManagerAbi.json";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const MyHeader = () => {

    const [lockAddress, setLockAddress] = useState("");

    const { config } = usePrepareContractWrite({
        abi: lockManagerAbi,
        address: "0x876DD35DF84213db30d3E35260D6EefdbAE039FD",
        functionName: "getLockAddress",
        onSuccess(data) {
            setLockAddress(data.result as string)
        },
        enabled: true,
    });

    useContractWrite(config);

    const router = useRouter()

    const onButtonAddProperty = () => {
        router.push(`/my/add/${lockAddress.replace("0x","")}`)
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between">
                    <div className="mb-4 sm:mb-8 lg:mb-0">
                        <h2 className="text-center text-xl font-bold text-indigo-500 sm:text-2xl lg:text-left lg:text-3xl">Welcome Back Your Lock</h2>
                    </div>
                    <div className="flex flex-col items-center lg:items-end">
                        <div className="mb-3 flex w-full max-w-md gap-2">
                            <button onClick={onButtonAddProperty} className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Add Property</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyHeader;