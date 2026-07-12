export interface Company {
  id: number;

  name: string;
  legalName: string;
  industry: string;
  country: string;
  currency: string;
  fiscalYear: string;

  email?: string | null;
  phone?: string | null;
  address?: string | null;

  createdAt: Date;
  updatedAt: Date;
}


export interface CreateCompanyInput {

  name: string;
  legalName: string;
  industry: string;
  country: string;
  currency: string;
  fiscalYear: string;

  email?: string | null;
  phone?: string | null;
  address?: string | null;

}