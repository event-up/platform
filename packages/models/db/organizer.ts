import { UserRole } from "./user";


export type Organizer = {
    userId: string
    email: string
    role: UserRole
    profileImgUrl: string
}