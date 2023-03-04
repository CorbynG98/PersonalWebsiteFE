type State = {
  username: string | undefined | null;
  token: string | undefined | null;
  isLoggedIn: boolean;
  activeLink: "home" | "projects" | "about" | "connect";
};
export type { State };
