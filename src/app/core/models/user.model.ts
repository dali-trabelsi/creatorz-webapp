export type UserModel = {
  email: string;
  password: string;
  fname: string;
  lname: string;
  dob: Date;
  phone: string;
  avatar: string;
  address: {
    country: string;
    city: string;
    street: string;
    postcode: number;
  };
  role: string;
};
