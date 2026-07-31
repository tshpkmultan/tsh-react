export default function StatsCard({
  title,
  value,
  icon,
  border,
}) {

  return (

    <div className={`bg-white rounded-[35px] p-8 border-t-[6px] ${border} shadow-lg hover:-translate-y-1 transition-all duration-300`}>

      <div className="flex items-center gap-5">

        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl">
          {icon}
        </div>

        <div>

          <p className="text-slate-500 font-bold text-lg">
            {title}
          </p>

          <h2 className="text-5xl font-black text-[#032B38] mt-2">
            {value}
          </h2>

        </div>

      </div>

    </div>
  );
}