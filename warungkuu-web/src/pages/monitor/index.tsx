import { useHealth } from "../../hooks/useHealth";

const Info = ({ text }: { text: string }) => (
    <span className="ml-2 text-xs text-gray-500 italic">({text})</span>
);

export default function HealthDashboard() {
    const { health, loading, error } = useHealth();

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!health) return <p className="p-6">No data</p>;

    const formatBytes = (bytes: number) =>
        (bytes / 1024 / 1024).toFixed(2) + " MB";

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    System Monitoring Dashboard
                </h1>

                {/* STATUS */}
                <div
                    className={`p-4 rounded-xl text-white ${health.status === "ok" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                >
                    <p className="text-lg font-semibold">
                        Status: {health.status.toUpperCase()}
                        <Info text="Kondisi keseluruhan sistem" />
                    </p>
                    <p>
                        Latency: {health.latencyMs} ms
                        <Info text="Waktu respon server (lebih kecil lebih cepat)" />
                    </p>
                </div>

                {/* SERVICES */}
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Services</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(health.services).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex justify-between items-center border p-3 rounded"
                            >
                                <span className="font-medium capitalize">{key}</span>
                                <span
                                    className={`px-2 py-1 rounded text-sm ${value === "connected"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SYSTEM */}
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">System</h2>
                    <div className="space-y-2">
                        <p>
                            Uptime: {(health.uptime / 60).toFixed(2)} minutes
                            <Info text="Berapa lama server berjalan tanpa restart" />
                        </p>

                        <p>
                            RSS: {formatBytes(health.system.memory.rss)}
                            <Info text="Total memori yang dipakai aplikasi (RAM)" />
                        </p>

                        <p>
                            Heap Used: {formatBytes(health.system.memory.heapUsed)}
                            <Info text="Memori yang sedang dipakai aktif oleh aplikasi" />
                        </p>

                        <p>
                            Heap Total: {formatBytes(health.system.memory.heapTotal)}
                            <Info text="Total memori yang dialokasikan untuk aplikasi" />
                        </p>
                    </div>
                </div>

                {/* TIMESTAMP */}
                <div className="text-sm text-gray-500">
                    Last updated: {new Date(health.timestamp).toLocaleString()}
                </div>
            </div>
        </div>
    );
}