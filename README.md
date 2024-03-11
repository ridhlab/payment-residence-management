# Panduan Instalasi

## Requirement
Agar berjalan optimal, pastikan terinstall PHP v8.1, mysql v8.0, composer v2.2, serta node js v20.4


## Langkah langkah instalasi 

1. Clone repository ini.
2. Setup Backend
   - Buat database di mysql.
   - Buat file `.env` di dalam folder backend. Terus copy semua isi dari `.env.example` dan paste di file `.env`. Sesuaikan `DB_DATABASE` , `DB_USERNAME` ,`DB_PASSWORD`.
   - Install package dengan perintah `composer Install` .
   - Migrate database dengan perintah `php artisan migrate`.
   - Jalankan perintah `php artisan storage:link` untuk link public stroage.
   - Jalankan seeder dengan perintah `php artisan db:seed`.
   - Jalankan server dengan `php artisan serve`.
3. Setup Frontend
   - Buat file `.env` di dalam folder backend. Terus copy semua isi dari `.env.example` dan paste di file `.env`. 
   - Install package dengan `yarn install`.
   - Build Frontend dengan `yarn build`.
   - Jalankan aplikasi dengan `yarn preview`.
   - Buka link http://localhost:4173 untuk melihat aplikasi. 


