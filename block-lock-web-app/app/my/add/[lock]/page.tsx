'use client'

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import lockAbi from "../../../../public/lockAbi.json"
import { useRouter } from "next/navigation";

const MyAdd = () => {
    const [propertyName,setPropertyName] = useState("");
    const [location,setLocation] = useState("");
    const pathname = usePathname();
    const router = useRouter()

    const walletAddress = useMemo(()=>{
        const tempArr = pathname.split('/');
        return tempArr[tempArr.length-1];
    },[pathname])

    const { config } = usePrepareContractWrite({
        address: `0x${walletAddress}`,
        abi: lockAbi,
        functionName: 'addProperty',
        args: [propertyName,location],
    });

    const { write, isSuccess, isLoading } = useContractWrite(config);

    const addProperty = () => {
        write && write()
    }

    useEffect(()=>{
        if(isSuccess && !isLoading){
            router.replace("/my")
        }
    },[isSuccess,isLoading])
    
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Let's create a property</h2>
                </div>

                <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="propertyName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Property Name</label>
                        <input value={propertyName} onChange={(event) => setPropertyName(event.target.value)} name="propertyName" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="tokenAddress" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
                        <input name="tokenAddress" value={location} onChange={(event) => setLocation(event.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="flex items-center justify-between sm:col-span-2">
                        <button onClick={addProperty} className="inline-block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyAdd;