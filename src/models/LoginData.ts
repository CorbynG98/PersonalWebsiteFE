export type LoginData = {
  username: string | null | undefined;
  password: string | null | undefined;
};

export type LoginResponse = {
  username: string | null | undefined;
  sessionToken: string | null | undefined;
};
