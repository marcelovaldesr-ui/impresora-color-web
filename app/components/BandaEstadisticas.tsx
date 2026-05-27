const STATS = [
  {
    icon: "🏆",
    value: "35 años",
    label: "de experiencia",
    color: "#E91E8F",
    bg: "bg-[#E91E8F]/10",
    border: "border-[#E91E8F]/20",
  },
  {
    icon: "😊",
    value: "+500",
    label: "clientes satisfechos",
    color: "#2D3E9F",
    bg: "bg-[#2D3E9F]/10",
    border: "border-[#2D3E9F]/20",
  },
  {
    icon: "💬",
    value: "WhatsApp",
    label: "Atención rápida",
    color: "#47B7E8",
    bg: "bg-[#47B7E8]/10",
    border: "border-[#47B7E8]/20",
  },
];

export default function BandaEstadisticas() {
  return (
    <section className="bg-white py-10 px-4 border-b border-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map((s) => (
          <div
            key={s.value}
            className={`flex items-center gap-5 ${s.bg} border ${s.border} rounded-2xl px-7 py-6`}
          >
            <span className="text-4xl shrink-0">{s.icon}</span>
            <div>
              <p className="text-2xl font-black" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-gray-600 font-medium text-sm">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
