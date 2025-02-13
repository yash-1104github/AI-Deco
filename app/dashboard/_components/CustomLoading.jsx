import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'



const CustomLoading = ({ loading }) => {
    return (
        <div>
            <AlertDialog open={loading}>

                <AlertDialogContent>
                    <div className='bg-white flex flex-col items-center mt-10 justify-center'>
                      <Image src={'/rooling.gif'}   alt='loading'
                        width={100}
                        height={100}/>
                        <h2>Redesiging your Room... </h2>
                    </div>

                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default CustomLoading
