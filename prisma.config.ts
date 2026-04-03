import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Gunakan koneksi bypass pooling (DIRECT_URL) khusus untuk CLI Migration!
    url: env("DIRECT_URL"),
  },
});
