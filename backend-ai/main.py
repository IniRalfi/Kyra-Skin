import os
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.neighbors import NearestNeighbors
from sqlalchemy import create_engine, text

load_dotenv()

app = FastAPI(
    title="Kyra AI Engine",
    description="Intelligence Layer — Case-Based Reasoning dengan KNN",
    version="1.0.0",
)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../backend-web/database/laravel")


# ── Schema Request ──────────────────────────────────────────────────────────
class RecommendRequest(BaseModel):
    user_id: int | str
    age: int
    gender: int  # 1=Pria, 2=Wanita
    skin_type: int  # 1-5


# ── Health Check ────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "message": "Kyra AI Engine aktif! 🧠✨"}


# ── Endpoint Rekomendasi (Core CBR) ─────────────────────────────────────────
@app.post("/recommend")
def recommend(req: RecommendRequest):
    """
    Fase CBR:
    1. Retrieve  → Ambil semua profil pengguna dari DB
    2. KNN       → Cari K profil terdekat (Euclidean Distance)
    3. Reuse     → Ambil produk yang pernah dibeli neighbor terdekat
    4. Return    → Kirim daftar product_id ke Laravel
    """
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

    with engine.connect() as conn:
        # Ambil semua profil + riwayat pembelian mereka (kecuali user saat ini)
        rows = conn.execute(
            text(
                """
            SELECT
                up.user_id,
                up.age,
                up.gender,
                up.skin_type,
                oi.product_id
            FROM user_profiles up
            LEFT JOIN orders     o  ON o.user_id  = up.user_id
            LEFT JOIN order_items oi ON oi.order_id = o.id
            WHERE up.user_id != :uid
        """
            ),
            {"uid": req.user_id},
        ).fetchall()

    # ── Fallback: belum ada data di database ──
    if not rows:
        return {
            "recommended_product_ids": [],
            "method": "fallback_no_data",
        }

    df = pd.DataFrame(
        rows, columns=["user_id", "age", "gender", "skin_type", "product_id"]
    )

    # Profil unik untuk fit KNN
    profiles = df[["user_id", "age", "gender", "skin_type"]].drop_duplicates("user_id")

    K = min(5, len(profiles))

    # ── Fallback: data terlalu sedikit untuk KNN ──
    if K < 2:
        return {
            "recommended_product_ids": [],
            "method": "fallback_insufficient_data",
        }

    # ── Retrieve: KNN Euclidean Distance ──
    features = profiles[["age", "gender", "skin_type"]].values.astype(float)
    knn = NearestNeighbors(n_neighbors=K, metric="euclidean")
    knn.fit(features)

    user_vector = np.array([[req.age, req.gender, req.skin_type]], dtype=float)
    _, indices = knn.kneighbors(user_vector)

    neighbor_ids = profiles.iloc[indices[0]]["user_id"].tolist()

    # ── Reuse: ambil produk yang pernah dibeli neighbor ──
    neighbor_products = (
        df[df["user_id"].isin(neighbor_ids)]["product_id"].dropna().unique().tolist()
    )

    return {
        "recommended_product_ids": neighbor_products,
        "method": "knn_cbr",
        "k_neighbors": K,
    }
