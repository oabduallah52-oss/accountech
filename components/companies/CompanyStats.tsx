import {
  Building2,
  Globe2,
  Landmark,
  BriefcaseBusiness,
} from "lucide-react";

const cards = [
  {
    title: "Companies",
    value: "12",
    icon: Building2,
    color: "bg-cyan-500",
  },
  {
    title: "Branches",
    value: "36",
    icon: Globe2,
    color: "bg-emerald-500",
  },
  {
    title: "Banks",
    value: "18",
    icon: Landmark,
    color: "bg-orange-500",
  },
  {
    title: "Industries",
    value: "6",
    icon: BriefcaseBusiness,
    color: "bg-blue-500",
  },
];

export default function CompanyStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl bg-[#111C34] border border-slate-700 p-6 shadow-lg hover:scale-[1.02] transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} rounded-xl p-4`}
              >
                <Icon
                  size={30}
                  className="text-white"
                />
              </div>

            </div>

          </div>

        );

      })}

    </div>
  );
}