"use client";

import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";

interface Company {
  id: number;
  name: string;
  legalName: string;
 country: string;
  currency: string;
  industry: string;
  fiscalYear: string;
}

interface EditCompanyModalProps {
  company: Company;
  onUpdated?: () => void;
}

export default function EditCompanyModal({
  company,
  onUpdated,
}: EditCompanyModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    legalName: "",
    country: "",
    currency: "",
    industry: "",
    fiscalYear: "",
  });

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name || "",
        legalName: company.legalName || "",
        country: company.country || "",
        currency: company.currency || "",
        industry: company.industry || "",
        fiscalYear: company.fiscalYear || "",
      });
    }
  }, [company]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function updateCompany() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/companies/${company.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert("Company updated successfully");

      setOpen(false);

      if (onUpdated) {
        onUpdated();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update company");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-500 p-3 hover:bg-blue-600 transition"
      >
        <Pencil size={18} className="text-white" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="w-[720px] rounded-2xl border border-slate-700 bg-[#111C34] p-8">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Edit Company
              </h2>

              <button onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Company Name"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

              <input
                name="legalName"
                value={form.legalName}
                onChange={handleChange}
                placeholder="Legal Name"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

              <input
                name="currency"
                value={form.currency}
                onChange={handleChange}
                placeholder="Currency"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

              <input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="Industry"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

              <input
                name="fiscalYear"
                value={form.fiscalYear}
                onChange={handleChange}
                placeholder="Fiscal Year"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none"
              />

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-600 px-5 py-3 text-white"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={updateCompany}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-600 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}