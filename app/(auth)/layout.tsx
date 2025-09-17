export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9152DE] via-[#5F29A1] to-[#204782]">
      {children}
    </div>
  );
}