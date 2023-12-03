import Link, { LinkProps } from "next/link";
export const FilterButton = ({
  children,
  active,
  ...props
}: LinkProps & React.PropsWithChildren<{ active?: boolean }>) => {
  const activeClasses = active
    ? "bg-stone-100 text-slate-950"
    : "text-stone-50";
  return (
    <Link
      prefetch={false}
      {...props}
      className={`${activeClasses} text-lg font-bold border-2 border-stone-100 py-1 px-2 rounded-lg hover:bg-stone-100 hover:text-slate-950`}
    >
      {children}
    </Link>
  );
};
