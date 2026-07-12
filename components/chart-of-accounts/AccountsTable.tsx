export default function AccountsTable() {

  return (

<div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111C34]">

<table className="w-full">

<thead className="bg-[#0D1730]">

<tr>

<th className="p-5 text-left text-slate-300">Code</th>
<th className="p-5 text-left text-slate-300">Account</th>
<th className="p-5 text-left text-slate-300">Type</th>
<th className="p-5 text-left text-slate-300">Parent</th>
<th className="p-5 text-left text-slate-300">Balance</th>
<th className="p-5 text-left text-slate-300">Status</th>

</tr>

</thead>

<tbody>

<tr className="border-t border-slate-700 hover:bg-[#162344]">

<td className="p-5 text-white">1000</td>
<td className="p-5 text-white font-semibold">
Cash
</td>
<td className="p-5 text-slate-300">
Asset
</td>
<td className="p-5 text-slate-300">
Current Assets
</td>
<td className="p-5 text-green-400">
Debit
</td>
<td className="p-5">
<span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
Active
</span>
</td>

</tr>

</tbody>

</table>

</div>

  );

}