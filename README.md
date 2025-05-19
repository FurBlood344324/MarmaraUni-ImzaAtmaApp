# MarmaraUni-ImzaAtmaApp

Bu proje, Flask tabanlı bir API, React frontend ve PostgreSQL (alpine) veritabanından oluşan tam yığınlı bir web uygulamasıdır. Docker Compose aracılığıyla kolayca başlatılabilir.

---

## 🔧 Kullanılan Teknolojiler

- **Frontend:** React
- **Backend:** Flask (Python)
- **Database:** PostgreSQL (alpine)
- **Web Server:** Nginx
- **Container Orchestration:** Docker Compose

---

## 🚀 Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın (opsiyonel)

```bash
git clone https://github.com/FurBlood344324/MarmaraUni-ImzaAtmaApp.git
cd MarmaraUni-ImzaAtmaApp
```

### 2. Frontend Config Ayarını Yap

```bash
cd frontend/src
```
Bu klasörün içindeki config.js dosyasını açıp aşagıdaki gibi düzenleyin 

```config.js
export const B_PORT = '5000'
export const F_PORT = '3000'
export const IP = '<your_local_ip>'
export const URL = `http://${IP}:${B_PORT}`
export const F_URL = `http://${IP}:${F_PORT}`
```

---

### 3. Nginx Yapılandırması

`nginx.conf` dosyasını root dizinine aşağıdaki içerikle oluştur:

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }
}
```

> Bu yapılandırma, React uygulamasının derlenmiş halini sunmak için kullanılır ve URL yönlendirmelerini SPA mimarisiyle uyumlu hale getirir.

---

### 4. Ortam Değişkenlerini Tanımla

Kök dizine aşağıdaki içerikle bir `.env` dosyası oluştur:

```env
# PostgreSQL Ayarları
DATABASE_URL= postgresql://<your_username>:<your_password>@<your_dbservicename>:5432/<your_dbname>
POSTGRES_USER=your_username
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=your_dbname

# Flask Ayarları
FLASK_APP=backend/app.py
FLASK_ENV=production
SQLALCHEMY_TRACK_MODIFICATIONS=False
HOST=0.0.0.0
SECRET_KEY=<your_secretkey>
```

> `FLASK_APP` değeri senin Flask dosyanın yoluna göre ayarlanmalıdır. Örneğin `backend/app.py` dosyasını çalıştırıyorsan yukarıdaki gibi bırakabilirsin.

> `FLASK_ENV` değeri hangi modda çalıştıracagına göre ayarlanmalıdır. WSGI server ile çalıştıracaksan production yapılmalıdır.

### 5. Frontend Projesini Kur ve Derle

```bash
cd frontend
yarn install
yarn format
yarn build
```

Bu adım React projesini derleyerek `build/` klasörü oluşturur.

---

### 6. Docker Compose ile Uygulamayı Başlat

Tüm servisleri başlatmak için aşağıdaki komutu çalıştırın:

```bash
docker-compose -p my-app up --build -d
```

Bu komut, tanımlı servisleri (backend, frontend, veritabanı ve nginx) arka planda ayağa kaldırır.

---

## 🛠️ Kodlama Ortamını Hazırlama

### 1. Sanal Ortam Oluşturun

Python 3 yüklü olduğundan emin olun.

```bash
cd backend
python -m venv venv
```

Bu komut, proje dizininde `venv` klasörünü oluşturur.

### 3. Sanal Ortamı Aktifleştirin

#### ✅ Windows

**PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

> Hata alırsanız şu komutla geçici izin verebilirsiniz:
>
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
> ```

**CMD:**

```cmd
venv/Scripts/activate.bat
```

**GitBash:**

```bash
source venv/Scripts/activate
```

#### ✅ macOS / Linux

```bash
source venv/bin/activate
```

### 4. Gereksinimleri Yükleyin

```bash
pip install -r requirements.txt
```
> Eger çalışmazsa psycopg2 paketi yok demektir onu yüklemek için aşaıdaki komutu giriniz:
>
>```bash
>pip install psycopg2
>```

> Yeni bir paket eklediginizde aşagıdaki komutla requirements.txt'i güncelleyin 
>
>```bash
>pip freeze > requirements.txt
>```

> Not: psycopg2 paketini sakın requirements.txt'ye yazmayın hata alırsınız.

### 5. Ortam Degiskenkerini Ayarlayın

```env
# PostgreSQL Ayarları
DATABASE_URL= postgresql://<your_username>:<your_password>@localhost:5432/postgres
POSTGRES_USER=<your_username>
POSTGRES_PASSWORD=<your_password>
POSTGRES_DB=<your_database_name>

# Flask Ayarları
FLASK_APP=backend/app.py
FLASK_ENV=development
SQLALCHEMY_TRACK_MODIFICATIONS=False
HOST=0.0.0.0
SECRET_KEY=<your_secret_key>
```

> `FLASK_APP` değeri senin Flask dosyanın yoluna göre ayarlanmalıdır. Örneğin `backend/app.py` dosyasını çalıştırıyorsan yukarıdaki gibi bırakabilirsin.

> `FLASK_ENV` değeri hangi modda çalıştıracagına göre ayarlanmalıdır. WSGI server ile çalıştıracaksan production yapılmalıdır.


### 6. Projeyi Çalıştırın

> Bu adım projeye özeldir. Örnek:

```bash
python app.py
```

---

## 📁 Proje Yapısı

```plaintext
MarmaraUni-ImzaAtmaApp
├── backend/              # Flask API
├── frontend/             # React frontend
├── .env                  # Ortam değişkenleri
├── docker-compose.yml    # Docker Compose yapılandırması
└── README.md
```

---

## 📌 Notlar

- Nginx, React build klasörünü sunar ve backend API'ye yönlendirme yapılacaksa ayrıca bir `location /api` bloğu tanımlanmalıdır.
- `.env` dosyasındaki bilgilerin backend ve veritabanı container'ları ile uyumlu olması gereklidir.

Her şeyin doğru çalıştığını kontrol etmek için frontend arayüzünü `http://localhost` üzerinden tarayıcınızda açabilirsiniz.
