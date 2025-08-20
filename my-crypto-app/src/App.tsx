function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Sidebar</h2>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-800 text-white flex items-center px-4">
          <h1 className="text-xl font-semibold">Crypto Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-1 bg-gray-100">
          <div className="bg-white shadow rounded-xl p-6">
            <p className="text-gray-700">🚀 Tailwind is working!</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
