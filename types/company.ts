export interface Company {
  id: string;
  name: string;
  code: string;
  taxNumber?: string;
  country?: string;
  city?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyInput {
  name: string;
  code: string;
  taxNumber?: string;
  country?: string;
  city?: string;
}