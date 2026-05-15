export const metadata = {
  title: "Sanity Studio",
  description: "Admin dashboard for Nandanam Arts",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
