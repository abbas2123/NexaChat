type SidebarButtonProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  selected: string;
  onSelect: (value: string) => void;
};

function SidebarButton({
  icon,
  label,
  value,
  selected,
  onSelect,
}: SidebarButtonProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        selected === value
          ? "border-l-4 border-l-green-500 bg-white/10"
          : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="text-gray-300 font-semibold text-lg">{label}</span>
    </button>
  );
}

export default SidebarButton;
