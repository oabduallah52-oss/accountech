import CompanyToolbar from "@/components/companies/CompanyToolbar";
import CompanyStats from "@/components/companies/CompanyStats";
import CompanyFilters from "@/components/companies/CompanyFilters";
import CompanyTable from "@/components/companies/CompanyTable";
import CompanyPagination from "@/components/companies/CompanyPagination";

export default function CompaniesPage() {
  return (
    <div className="space-y-8">

      <CompanyToolbar />

      <CompanyStats />

      <CompanyFilters />

      <CompanyTable />

      <CompanyPagination />

    </div>
  );
}