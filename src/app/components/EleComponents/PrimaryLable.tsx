export default function PrimaryLable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`text-sm mb-1 ${className} dark:text-darkTextPrimary`}>
      {children}
    </label>
  );
}
