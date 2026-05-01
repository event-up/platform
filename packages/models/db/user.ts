export interface User<DateTime = string> {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    profileImageUrl?: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export enum UserRole {
    ORGANIZER = "organizer",
    ADMIN = "admin",
}
