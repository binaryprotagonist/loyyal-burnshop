export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  programCode: string;
  memberId: string;
  pointBalance: number | null;
  token?: string | null;
  refreshToken: string;
  programId: number;
  city: string;
  country: string;
  membershipTier: string;
  jwtToken: string;
}

export interface ILoginValues {
  username: string;
  password: string;
  programCode: string;
}

export interface IMember {
  firstName: string;
  lastName: string;
  email: string;
  programCode: string;
  memberId: string;
  pointBalance: string;
  token: string | null;
  refreshToken: string;
  programId: number;
  city: string;
  country: string;
  membershipTier: string;
  jwtToken: string;
}
