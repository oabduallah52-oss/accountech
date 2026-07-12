import AccountsToolbar from "@/components/chart-of-accounts/AccountsToolbar";
import AccountsStats from "@/components/chart-of-accounts/AccountsStats";
import AccountsFilters from "@/components/chart-of-accounts/AccountsFilters";
import AccountsTable from "@/components/chart-of-accounts/AccountsTable";

export default function ChartOfAccountsPage() {
  return (
    <div className="space-y-6">

      <AccountsToolbar />

      <AccountsStats />

      <AccountsFilters />

      <AccountsTable />

    </div>
  );
}