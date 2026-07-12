import {
  Eye,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

const companies = [
  {
    id: 1,
    name: "Sky Vision Airlines",
    legal: "Sky Vision Aviation Services",
    country: "Egypt",
    currency: "USD",
    industry: "Aviation",
    status: "Active",
  },
  {
    id: 2,
    name: "Sky Vision Cargo",
    legal: "Sky Vision Cargo LLC",
    country: "UAE",
    currency: "AED",
    industry: "Cargo",
    status: "Active",
  },
];

export default function CompanyTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111C34] shadow-xl">

      <table className="w-full">

        <thead className="bg-[#0B162C]">

          <tr className="text-left text-slate-300">

            <th className="p-5">Company</th>
            <th className="p-5">Legal Name</th>
            <th className="p-5">Country</th>
            <th className="p-5">Currency</th>
            <th className="p-5">Industry</th>
            <th className="p-5">Status</th>
            <th className="p-5 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {companies.map((company) => (

            <tr
              key={company.id}
              className="border-t border-slate-700 hover:bg-[#162344] transition-all"
            >

              <td className="p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500">

                    <Building2
                      className="text-white"
                      size={22}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {company.name}
                    </h3>

                    <p className="text-xs text-slate-400">
                      Company ID : {company.id}
                    </p>

                  </div>

                </div>

              </td>

              <td className="p-5 text-slate-300">
                {company.legal}
              </td>

              <td className="p-5 text-slate-300">
                {company.country}
              </td>

              <td className="p-5 text-slate-300">
                {company.currency}
              </td>

              <td className="p-5 text-slate-300">
                {company.industry}
              </td>

              <td className="p-5">

                <span className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white">
                  {company.status}
                </span>

              </td>

              <td className="p-5">

                <div className="flex justify-center gap-3">

                  <button className="rounded-lg bg-cyan-500 p-3 hover:bg-cyan-600">
                    <Eye size={18} className="text-white" />
                  </button>

                  <button className="rounded-lg bg-blue-500 p-3 hover:bg-blue-600">
                    <Pencil size={18} className="text-white" />
                  </button>

                  <button className="rounded-lg bg-red-500 p-3 hover:bg-red-600">
                    <Trash2 size={18} className="text-white" />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}