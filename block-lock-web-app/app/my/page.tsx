"use client"

import { useEffect, useState } from "react";
import MyHeader from "./components/MyHeader";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import lockAbi from "../../public/lockAbi.json";
import lockManagerAbi from "../../public/lockManagerAbi.json";
import propertyAbi from "../../public/property.json";
import Link from "next/link";

const My = () => {

    const [lockAddress, setLockAddress] = useState("");
    const [index, setIndex] = useState(0);
    const [selectedProperty, setSelectedProperty] = useState("")
    const [proporties, setProporties] = useState<any[]>([]);
    const [proportiesName, setProportiesName] = useState<any[]>([]);

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

    const { config:configForOpenningDoor } = usePrepareContractWrite({
        abi: propertyAbi,
        address: `0x${selectedProperty?.replace("0x","")}`,
        functionName: "openDoor",
    });

    const {write} = useContractWrite(configForOpenningDoor);

    const fetchProperty = useContractRead({
        abi: lockAbi,
        address: `0x${lockAddress.replace("0x", "")}`,
        functionName: "properties",
        args: [index],
        onSuccess(data: any) {
            setProporties((prev) => [...prev, data])
        },
    })

    const fetchPropertyName = useContractRead({
        abi: lockAbi,
        address: `0x${lockAddress.replace("0x", "")}`,
        functionName: "propertyMap",
        args: [proporties[index]],
        onSuccess(data: any) {
            setProportiesName((prev) => [...prev, data])
        },
    })

    useEffect(() => {
        if (lockAddress !== ""){
            fetchProperty.refetch();
            fetchPropertyName.refetch();
        }
    }, [lockAddress])

    return (
        <>
            <MyHeader />
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Property Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Property Name
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {proporties.map((property: any, index: number) => {
                                return (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {property}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {proportiesName[index]}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p><Link href={`/my/property/${property.replace("0x", "")}-${proportiesName[index]}`}>
                                                Rent Apartment
                                            </Link></p>
                                            <button onClick={() => {
                                                setSelectedProperty(`0x${property?.replace("0x","")}`);
                                                write && write()
                                            }}>
                                                Open Door
                                            </button>
                                        </th>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

            </>
        </>
    )
}

export default My;