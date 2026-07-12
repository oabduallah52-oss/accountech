export default function CompanyFilters() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111C34] p-6 shadow-lg">

      <div className="grid grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="🔍 Search Company..."
          className="rounded-xl border border-slate-700 bg-[#071426] px-5 py-3 text-white outline-none transition focus:border-cyan-500"
        />

        <select className="rounded-xl border border-slate-700 bg-[#071426] px-5 py-3 text-white">
          <option>All Countries</option>
          <option>Egypt</option>
          <option>UAE</option>
          <option>Saudi Arabia</option>
          <option>Qatar</option>
        </select>

        <select className="rounded-xl border border-slate-700 bg-[#071426] px-5 py-3 text-white">
          <option>All Industries</option>
          <option>Aviation</option>
          <option>Cargo</option>
          <option>Tourism</option>
          <option>Ground Handling</option>
        </select>

        <button className="rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-600">
          Search
        </button>

      </div>

    </div>
  );
}