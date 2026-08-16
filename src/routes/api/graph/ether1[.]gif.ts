import { createFileRoute } from "@tanstack/react-router";

const SOURCES = [
  "http://117.121.207.223:2627/graphs/iface/ether1/daily.gif",
  "http://192.168.35.1/graphs/iface/ether1/daily.gif",
];

async function fetchGraph(url: string): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength === 0) return null;
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "image/gif",
        "Cache-Control": "no-store",
        "X-Graph-Source": url,
      },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const Route = createFileRoute("/api/graph/ether1.gif")({
  server: {
    handlers: {
      GET: async () => {
        for (const url of SOURCES) {
          const res = await fetchGraph(url);
          if (res) return res;
        }
        return new Response("Graph tidak tersedia", {
          status: 502,
          headers: { "Cache-Control": "no-store" },
        });
      },
    },
  },
});
