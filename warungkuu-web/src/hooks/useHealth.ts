import { useEffect, useState } from "react";
import { api } from "../api/warungkuApi";

export interface HealthData {
  status: "ok" | "degraded";
  latencyMs: number;
  uptime: number;
  timestamp: number;
  services: Record<string, string>;
  system: {
    memory: {
      rss: number;
      heapUsed: number;
      heapTotal: number;
    };
  };
}

export function useHealth() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getHealth() {
    try {
      const response = await api.get("/health");
      setHealth(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch health data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHealth();

    const interval = setInterval(() => {
      getHealth();
    }, 5000); // auto refresh tiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return { health, loading, error };
}
