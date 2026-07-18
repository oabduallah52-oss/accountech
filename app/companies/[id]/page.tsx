import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getCompany(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/companies/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load company");
  }

  return res.json();
}

export default async function CompanyDetailsPage({
  params,
}: Props) {

  const { id } = await params;

  const company = await getCompany(id);

  return (

    <div className="min-h-screen bg-[#071426] p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">

            {company.name}

          </h1>

          <p className="mt-2 text-slate-400">

            Company Details

          </p>

        </div>

        <Link
          href="/companies"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"
        >
          Back
        </Link>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="rounded-2xl bg-[#111C34] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            Company Information
          </h2>

          <div className="space-y-4 text-slate-300">

            <div>
              <span className="text-slate-500">
                Company Name
              </span>

              <p>{company.name}</p>
            </div>

            <div>
              <span className="text-slate-500">
                Legal Name
              </span>

              <p>{company.legalName}</p>
            </div>

            <div>
              <span className="text-slate-500">
                Country
              </span>

              <p>{company.country}</p>
            </div>

            <div>
              <span className="text-slate-500">
                Currency
              </span>

              <p>{company.currency}</p>
            </div>

            <div>
              <span className="text-slate-500">
                Industry
              </span>

              <p>{company.industry}</p>
            </div>

            <div>
              <span className="text-slate-500">
                Fiscal Year
              </span>

              <p>{company.fiscalYear}</p>
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-[#111C34] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            Statistics
          </h2>

          <div className="space-y-5">

            <div className="rounded-xl bg-[#162344] p-5">

              <p className="text-slate-400">
                Branches
              </p>

              <h3 className="text-3xl font-bold text-white">
                0
              </h3>

            </div>

            <div className="rounded-xl bg-[#162344] p-5">

              <p className="text-slate-400">
                Users
              </p>

              <h3 className="text-3xl font-bold text-white">
                0
              </h3>

            </div>

            <div className="rounded-xl bg-[#162344] p-5">

              <p className="text-slate-400">
                Accounts
              </p>

              <h3 className="text-3xl font-bold text-white">
                0
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-[#111C34] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full rounded-xl bg-cyan-500 p-4 font-semibold text-black">
              Manage Branches
            </button>

            <button className="w-full rounded-xl bg-blue-500 p-4 font-semibold text-white">
              Chart of Accounts
            </button>

            <button className="w-full rounded-xl bg-emerald-500 p-4 font-semibold text-white">
              Users
            </button>

            <button className="w-full rounded-xl bg-orange-500 p-4 font-semibold text-white">
              Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}