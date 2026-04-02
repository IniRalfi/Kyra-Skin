FROM php:8.2-cli-alpine

# Masuk ke folder kerja di dalam Docker
WORKDIR /app

# Install pustaka Linux untuk bisa pakai PostgreSQL (Supabase)
RUN apk add --no-cache postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Pinjam Composer dari Docker image resmi
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Salin semua file back-end kita ke dalam container
COPY . .

# Paksa install pustaka PHP tanpa ba-bi-bu
RUN composer install --ignore-platform-reqs --no-dev --optimize-autoloader

# Izinkan port dinamis
EXPOSE 8000

# Jalan pakai server sakti bawaan Laravel
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
