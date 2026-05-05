import { NextRequest } from "next/server";
import { stations } from "@/lib/data";
import { logger } from "@/lib/logger";
import type { StationType, ApiResponse, ResponseMeta } from "@/types";
import type { MonitoringStation } from "@/types";

export async function GET(request: NextRequest) {
  const start = Date.now();
  const { searchParams } = request.nextUrl;

  const city = searchParams.get("city") ?? undefined;
  const type = (searchParams.get("type") as StationType | null) ?? undefined;
  const sort = (searchParams.get("sort") ?? "name") as "aqi" | "name" | "city";
  const order = (searchParams.get("order") ?? "asc") as "asc" | "desc";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)),
  );

  try {
    const validSorts = ["aqi", "name", "city"];
    if (!validSorts.includes(sort)) {
      logger.warn("stations_list: invalid sort param", { sort });
      return Response.json(
        { success: false, error: "Невірне значення параметра sort", code: 400 },
        { status: 400 },
      );
    }

    let result: MonitoringStation[] = [...stations];

    if (city)
      result = result.filter((s) => s.city.toLowerCase() === city.toLowerCase());
    if (type) result = result.filter((s) => s.type === type);

    result.sort((a, b) => {
      let av: string | number, bv: string | number;
      if (sort === "aqi") {
        av = a.currentData.aqi;
        bv = b.currentData.aqi;
      } else if (sort === "city") {
        av = a.city;
        bv = b.city;
      } else {
        av = a.name;
        bv = b.name;
      }
      if (av < bv) return order === "asc" ? -1 : 1;
      if (av > bv) return order === "asc" ? 1 : -1;
      return 0;
    });

    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);

    logger.info("stations_list", {
      city: city ?? null,
      type: type ?? null,
      sort,
      order,
      page,
      limit,
      total,
      duration_ms: Date.now() - start,
    });

    const meta: ResponseMeta = { total, page, limit, totalPages };
    const body: ApiResponse<MonitoringStation[]> = { success: true, data, meta };
    return Response.json(body);
  } catch (err) {
    logger.error("stations_list: unexpected error", {
      error: err instanceof Error ? err.message : String(err),
      duration_ms: Date.now() - start,
    });
    return Response.json(
      { success: false, error: "Внутрішня помилка сервера", code: 500 },
      { status: 500 },
    );
  }
}
