export interface AuthActivityResource {
    type: AuthActivityType;
    userId: string;
    sessionId: string;
    actionedAt: string | null;
}

export enum AuthActivityType {
    Login,
    Logout,
    SessionRevoked
}