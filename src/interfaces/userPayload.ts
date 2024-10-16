export interface CreateUserPayload {
  customer: {
    email: string;
    firstname: string;
    lastname: string;
  };
  password: string;
}
