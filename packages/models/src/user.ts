
export enum UserRole {
    ORGANIZER = "organizer",
    ADMIN = "admin",
}

export type User = {
    userId: string
    email: string
    role: UserRole
    profileImgUrl: string
}