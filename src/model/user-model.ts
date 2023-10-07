// TODO: chunk this into many to avoid optional
export interface user {
    pk1?: string;
    first_name: string;
    last_name: string;
    username: string;
    password?: string;
    phone_number: string;
    roles: userRole;
    createddt?: string;
}

export interface createUser extends Omit<user, "createddt" | "roles">{
    role: string;
}

export interface userRole {
    id: string;
    role: string;
}