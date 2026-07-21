import Link from "next/link";

import {
  BookOpen,
  Receipt,
  Wallet,
  Plane,
  Cpu,
  Fuel,
  Wrench,
  FileBarChart2,
  Bot,
} from "lucide-react";


const modules = [
  {
    title: "Chart of Accounts",
    desc: "Financial Structure",
    href: "/accounting/chart-of-accounts",
    icon: BookOpen,
  },
  {
    title: "Journal Entries",
    desc: "Accounting Transactions",
    href: "/accounting/journal-entries",
    icon: Receipt,
  },
  {
    title: "Treasury",
    desc: "Cash & Banks",
    href: "/treasury",
    icon: Wallet,
  },
  {
    title: "Aircraft",
    desc: "Fleet Management",
    href: "/aircraft",
    icon: Plane,
  },
  {
    title: "Engines",
    desc: "Engine Tracking",
    href: "/engines",
    icon: Cpu,
  },
  {
    title: "Flights",
    desc: "Flight Operations",
    href: "/flights",
    icon: Plane,
  },
  {
    title: "Fuel",
    desc: "Fuel Control",
    href: "/fuel",
    icon: Fuel,
  },
  {
    title: "Maintenance",
    desc: "Maintenance Center",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Reports",
    desc: "Financial Reports",
    href: "/reports",
    icon: FileBarChart2,
  },
  {
    title: "AI Assistant",
    desc: "Smart Assistant",
    href: "/ai",
    icon: Bot,
  },
];


export default function DashboardPage() {

  return (

    <div className="relative space-y-8 overflow-hidden">


      {/* Background Aircraft */}

      <div
        className="
        pointer-events-none
        absolute
        right-0
        top-20
        h-[500px]
        w-[600px]
        bg-[url('/images/aircraft.png')]
        bg-contain
        bg-no-repeat
        opacity-10
        "
      />


      {/* Hero */}

      <section
        className="
        relative
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-r
        from-[#07111F]
        via-[#102A43]
        to-[#07111F]
        p-10
        "
      >

        <div className="relative z-10">


          <span
            className="
            rounded-full
            bg-cyan-500/20
            px-3
            py-1
            text-xs
            font-semibold
            text-cyan-400
            "
          >
            Enterprise Aviation Edition
          </span>


          <h1
            className="
            mt-5
            text-4xl
            font-bold
            text-white
            "
          >
            Financial Advisor ERP
          </h1>


          <p
            className="
            mt-3
            text-slate-300
            "
          >
            Aviation Financial Management System
          </p>


        </div>


      </section>



      {/* KPI */}

      <section
        className="
        grid
        grid-cols-4
        gap-4
        "
      >

        {[
          ["Cash Balance","$2.35M","💰"],
          ["Revenue","$865K","📈"],
          ["Expenses","$320K","💸"],
          ["Net Profit","$545K","✅"],
        ].map((item)=>(

          <div
            key={item[0]}
            className="
            rounded-2xl
            border
            border-slate-800
            bg-[#0D1728]
            p-4
            "
          >

            <div className="flex justify-between">

              <p className="text-xs text-slate-400">
                {item[0]}
              </p>

              <span>
                {item[2]}
              </span>

            </div>


            <h2
              className="
              mt-2
              text-xl
              font-bold
              text-white
              "
            >
              {item[1]}
            </h2>


          </div>

        ))}

      </section>




      {/* Modules */}

      <section>


        <h2
          className="
          mb-4
          text-2xl
          font-bold
          text-white
          "
        >
          Business Modules
        </h2>



        <div
          className="
          grid
          grid-cols-4
          gap-4
          "
        >

        {modules.map((item)=>{

          const Icon=item.icon;


          return (

            <Link
              href={item.href}
              key={item.title}
              className="
              group
              rounded-2xl
              border
              border-slate-800
              bg-[#0D1728]
              p-5
              transition
              hover:-translate-y-1
              hover:border-cyan-500
              "
            >

              <Icon
                size={30}
                className="
                text-cyan-400
                "
              />


              <h3
                className="
                mt-3
                text-base
                font-bold
                text-white
                "
              >
                {item.title}
              </h3>


              <p
                className="
                mt-1
                text-xs
                text-slate-400
                "
              >
                {item.desc}
              </p>


            </Link>

          )

        })}


        </div>


      </section>


    </div>

  );
}