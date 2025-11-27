import { db } from "@workspace/firebase";
import { collection, DocumentData, query, QueryDocumentSnapshot } from "firebase/firestore";
import { getEventRegistrations } from "@workspace/database/registration/get"
import { useQuery } from "react-query";
import { Registration } from "@workspace/models/db/registration";



export const useGetRegistrationQuery = (organizerId: string,
    eventId: string,
    pagination: { lastDoc: QueryDocumentSnapshot<DocumentData> | null, pageSize: number }) => {
    const { data, isLoading, error } = useQuery(
        {
            queryKey: ["registration", eventId, pagination.lastDoc?.id, pagination.pageSize],
            queryFn: () => getEventRegistrations(organizerId, eventId, { lastDoc: pagination.lastDoc, pageSize: pagination.pageSize }),
        }
    )



    return {
        registrations: data,
        isRegistrationLoading: isLoading,
        registrationError: error,
    }
}