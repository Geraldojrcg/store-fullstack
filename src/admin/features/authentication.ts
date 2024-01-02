import { type CurrentAdmin, DefaultAuthProvider, type DefaultAuthenticatePayload } from "adminjs";

import { componentLoader } from "../componentLoader";

// Placeholder authentication function, add your logic for authenticating users
const authenticate = ({
  email,
  password,
}: DefaultAuthenticatePayload): Promise<CurrentAdmin | null> => {
  if (email !== "admin@email.com" && password !== "qwe123qwe") return Promise.resolve(null);

  return Promise.resolve({ email });
};

export const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
});
