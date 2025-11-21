"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
  
function CreateBudget({refreshData}) {

    const [emojiIcon,setEmojiIcon]=useState('😀');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);

    const [name,setName]=useState();
    const [amount,setAmount]=useState();

    const {user}=useUser();

    /**
     * Used to Create New Budget
     */
    const onCreateBudget=async()=>{
        const result=await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result)
        {
            refreshData()
            toast('New Budget Created!')
        }
    }
  return (
    <div>
       
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-slate-100 p-4 sm:p-6 md:p-10 rounded-md
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
            justify-center transition-all duration-200'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-light text-gray-600'>+</h2>
                <h2 className='text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center px-2'>
                    Create New Budget
                </h2>
            </div>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[400px] mx-auto">
                <DialogHeader className="text-center pb-2">
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                        Create New Budget
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-xs sm:text-sm md:text-base">
                        Set up a new budget to track your expenses
                    </DialogDescription>
                </DialogHeader>
                
                <div className='mt-4 space-y-4 px-2'>
                    <div className="flex flex-col items-center relative">
                        <h2 className='text-black font-medium mb-2 text-xs sm:text-sm md:text-base'>Choose Icon</h2>
                        <Button variant="outline"
                            className="text-xl sm:text-2xl md:text-3xl h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                            onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                        >{emojiIcon}</Button>
                        {openEmojiPicker && (
                            <div className='absolute top-full mt-2 z-50 left-1/2 transform -translate-x-1/2'>
                                <EmojiPicker
                                    open={openEmojiPicker}
                                    onEmojiClick={(e)=>{
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }}
                                    width={250}
                                    height={300}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <h2 className='text-black font-medium mb-2 text-xs sm:text-sm md:text-base'>Budget Name</h2>
                        <Input 
                            placeholder="e.g. Home Decor"
                            className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 w-full"
                            onChange={(e)=>setName(e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <h2 className='text-black font-medium mb-2 text-xs sm:text-sm md:text-base'>Budget Amount</h2>
                        <Input
                            type="number"
                            placeholder="e.g. 5000"
                            className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 w-full"
                            onChange={(e)=>setAmount(e.target.value)} 
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6 px-2">
                    <DialogClose asChild>
                        <Button 
                            disabled={!(name&&amount)}
                            onClick={()=>onCreateBudget()}
                            className="w-full h-9 sm:h-10 md:h-11 text-xs sm:text-sm md:text-base"
                        >
                            Create Budget
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateBudget