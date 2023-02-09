import { useDispatch, useSelector } from "react-redux";
import { addAnswer, addIntent, onReset } from "../store/slices/messages";
import api from "../api";
import { useEffect, useState } from "react";

export const useMessages = () => {
    const { allMessages } = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if(!location) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                setLocation({
                    lat,
                    long
                })
            });
        }
    },[location]);

    const startAddingAnswer = async (utterance) => {
        const {
            data: { answer = 'Please come again' }
        } = await api.post('/api/nlp', { ...(location && location ), utterance });
        console.log('data', answer);
        dispatch(addAnswer(answer));
    }

    const startAddingIntent = (intent) => {
        dispatch(addIntent(intent));
        startAddingAnswer(intent);
    }

    const reset = () => {
        dispatch(onReset());
    }

    return {
        allMessages,
        reset,
        startAddingAnswer,
        startAddingIntent,
    }
}
