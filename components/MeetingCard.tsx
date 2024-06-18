"use client";

import { format } from "date-fns";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

import Image from 'next/image';
import { useGetCallByID } from "@/hooks/useGetCallById";

const MeetingCard = ({ meetingId }: { meetingId: string }) => {

    const { toast } = useToast();
    const router = useRouter();
    const { call, isCallLoading } = useGetCallByID(meetingId);
    const state = call?.state;
    const callMembers = state?.session?.participants.map((participant) => {
        return participant.user;
    });
    // const callMembers = call?.state.members.map((member) => member.user);

    // console.log(state?.session?.participants[0]);

    if (!!call && !isCallLoading) {
        return (
            <div className='
                h-[258px] 
                w-full 
                bg-dark-1 
                text-white
                flex
                flex-col
                py-[32px]
                px-[24px]
                gap-9
            '>
                <div className="flex flex-col gap-[14px]">
                    <Image
                        src="/icons/upcoming.svg"
                        alt="Upcoming meeting"
                        width={30}
                        height={30}
                    />
                    <div className='flex flex-col gap-[10px]'>
                        <label className="text-[24px] font-bold">{state?.custom.description}</label>
                        <label className='text-[16px] leading-[22.4px] font-normal'>{!!state?.startsAt && format(state?.startsAt, "MMMM d, yyyy - h:mm aa")}</label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex">
                        {!!callMembers && callMembers.slice(0, callMembers.length > 5 ? 4 : callMembers.length).map((callMember, index) => (
                            callMember?.image ? (
                                <Image
                                    src={callMember.image}
                                    alt={callMember.id}
                                    key={callMember.id+index}
                                    height={47}
                                    width={47}
                                    className={`
                                        relative
                                        z-[${index}]
                                        ${index !== 0 ? "ml-[-23.5px]" : ""}
                                        rounded-full 
                                        bg-dark-3 
                                        p-[3px]
                                    `}
                                />
                            ) :
                                (
                                    <div
                                        className="
                                        w-[50px]
                                        h-[50px]
                                        rounded-full
                                        bg-dark-3
                                    "
                                        key={callMember.id}
                                    >

                                    </div>
                                )
                        ))}
                        {!!callMembers && callMembers.length > 5 && (
                            <div
                                className="
                            w-[50px]
                            h-[50px]
                            rounded-full
                            bg-dark-3
                            flex justify-center items-center
                        ">
                                +{callMembers.length - 4}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-[7px] items-center">
                        <Button
                            className="rounded-[4px] bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onClick={() => { router.push(`/meeting/${call.id}`); }}
                        >
                            Start
                        </Button>
                        <Button
                            className='rounded-[4px] bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onClick={() => {
                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id})`);
                                toast({ title: "Link copied!" });
                            }}
                        >
                            <Image src="/icons/copy.svg" alt="Copy Icon" width={14} height={14} />&nbsp;
                            {'Copy Invitation'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='
                h-[258px] 
                w-full 
                bg-dark-1 
                text-white
                flex
                flex-col
                py-[32px]
                px-[24px]
                gap-9
                text-[30px]
            '>
                Call Not Loaded yet
            </div>
        )
    }
}

export default MeetingCard