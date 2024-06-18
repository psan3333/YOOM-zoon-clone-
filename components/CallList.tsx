"use client";

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MeetingCard from './MeetingCard';

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {

    const { endedCalls, upcomingCalls, callRecordings } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch(type){
            case "ended":
                return endedCalls;
            case "recordings":
                return recordings;
            case "upcoming":
                return upcomingCalls;
            default:
                return [];
        }
    };
    
    const getNoCallsMessage = () => {
        switch(type){
            case "ended":
                return "No previous calls";
            case "recordings":
                return "No recordings";
            case "upcoming":
                return "No upcoming calls";
            default:
                return '';
        }
    };

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording, index) => {
                // console.log((meeting as Call).state.);
                return <MeetingCard key={index} meetingId={(meeting as Call).id}/>;
            }) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
}
export default CallList