import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Kita gunakan process.env bawaan node yang tidak akan error walau nilainya kosong.
    // Jika Vercel lupa ngasih link saat fase build, kita sumpal dengan dummy asalkan format uri nya valid.
    url: process.env.DIRECT_URL || "postgresql://dummy:pass@localhost:5432/dummy",
  },
});
