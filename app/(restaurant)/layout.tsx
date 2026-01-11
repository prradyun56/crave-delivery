import 'leaflet/dist/leaflet.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* We can add a Sidebar here later */}
      <nav className="bg-white shadow p-4 mb-6">
        <h1 className="text-xl font-bold text-orange-600">Restaurateur Panel</h1>
      </nav>
      
      <main>
        {children}
      </main>
    </div>
  );
}