
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    profileImageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    ORGANIZER = "organizer",
    ADMIN = "admin",
}
