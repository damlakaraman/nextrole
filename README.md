# NextRole

İş başvurularını ve mülakat süreçlerini tek yerde takip et.

Track job applications and interviews in one place.

---

## Türkçe

### Proje hakkında

NextRole, iş ve staj arayan kişilerin başvurularını, süreç durumlarını
ve görüşme notlarını tek bir ekranda takip edebilmesi için geliştirilmiş
bir web uygulamasıdır.

Dağınık başvuru kayıtlarını düzenlemeyi ve hangi başvurunun hangi
aşamada olduğunu görmeyi kolaylaştırmayı amaçlar.

Bu proje, sertifikalı eğitim programının web geliştirme projesi
kapsamında hazırlanmıştır.

### Özellikler

- Şirket, pozisyon, başvuru tarihi ve durum bilgileriyle başvuru ekleme
- Başvurulara isteğe bağlı ilan bağlantısı ve not ekleme
- Başvuruları listeleme, düzenleme ve onay alarak silme
- Şirket veya pozisyon adına göre arama
- Başvuru durumuna göre filtreleme
- Toplam başvuru, mülakat ve teklif sayılarını görüntüleme
- Kayıtları LocalStorage ile kullanılan tarayıcıda saklama
- Farklı ekran genişliklerine uyum sağlayan tasarım
- Zorunlu alan ve HTTP/HTTPS bağlantı kontrolü
- Boş liste, işlem sonucu ve depolama hatası bildirimleri

Başvuru durumları: Başvuruldu, Mülakat, Teklif ve Olumsuz.

Özet sayaçları tüm kayıtlar üzerinden hesaplanır.
Arama ve durum filtresi yalnızca görüntülenen listeyi etkiler.

### Kullanılan teknolojiler

| Teknoloji | Kullanım amacı |
| --- | --- |
| React | Bileşen tabanlı kullanıcı arayüzü |
| JavaScript | Veri işleme ve kullanıcı etkileşimleri |
| CSS | Tasarım ve farklı ekran boyutlarına uyum |
| Vite | Geliştirme sunucusu ve üretim derlemesi |
| LocalStorage | Tarayıcıda veri saklama |
| ESLint | Kod kurallarının denetlenmesi |
| Git ve GitHub | Sürüm takibi ve kaynak kod paylaşımı |

### Çalışma mantığı

Başvuru kayıtları JavaScript nesnelerinden oluşan bir dizi içinde tutulur.
React useState ile başvuru listesi, form alanları ve filtre seçimleri yönetilir.

Her başvuruya crypto.randomUUID() ile benzersiz bir kimlik atanır.
Düzenleme ve silme işlemlerinde ilgili kayıt bu kimlik üzerinden bulunur.

Ekleme, düzenleme ve silme işlemlerinde güncel liste JSON.stringify()
ile metne dönüştürülerek LocalStorage'a yazılır.
Saklama işlemi başarılı olduğunda ekrandaki liste güncellenir.
Uygulama açılırken kayıtlar JSON.parse() ile okunur.

Uygulama makine öğrenmesi veya tahmin modeli kullanmaz.
Sayaçlar mevcut başvuru kayıtlarından hesaplanır.

### Bilgisayarda çalıştırma

Ön koşullar: Projedeki Vite sürümüyle uyumlu Node.js ve npm.
Depoyu klonlamak için Git gerekir.

```bash
git clone https://github.com/damlakaraman/nextrole.git
cd nextrole
npm install
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda açın.

Kod kurallarını kontrol etmek için:

```bash
npm run lint
```

Üretim derlemesi oluşturmak için:

```bash
npm run build
```

Oluşturulan üretim derlemesini yerel ortamda önizlemek için:

```bash
npm run preview
```

Üretim dosyaları dist klasöründe oluşturulur.

### Veri saklama ve sınırlamalar

- Uygulama sunucu veya uzak veritabanı kullanmaz.
- Kayıtlar kullanılan tarayıcı profiline ve site adresine bağlıdır.
- Normal kullanımda sekme veya tarayıcı kapatıldığında kayıtlar korunur.
- Site verilerinin temizlenmesi kayıtların silinmesine neden olabilir.
- Gizli gezinme oturumu sona erdiğinde kayıtlar silinebilir.
- Kayıtlar farklı cihaz veya tarayıcılar arasında eşitlenmez.
- Yerel geliştirme adresi ile yayımlanan site ayrı kayıt alanlarına sahiptir.
- Kullanıcı hesabı, bulut yedekleme ve dışa aktarma özellikleri bulunmaz.
- Kaynak kodun public olması tarayıcıdaki başvuru kayıtlarını yayımlamaz.
- LocalStorage şifreli bir kasa değildir; hassas bilgiler saklanmamalıdır.

### Kontrol senaryoları

- Başvuru eklenince liste ve sayaçların güncellenmesi
- Düzenleme işleminin yeni kayıt oluşturmadan mevcut kaydı değiştirmesi
- Düzenlemeden vazgeçildiğinde kaydın değişmemesi
- Silme işleminin yalnızca kullanıcı onayıyla gerçekleşmesi
- Arama ve durum filtresinin birlikte çalışması
- Sayfa yenilendiğinde kayıtların korunması
- Zorunlu alan ve bağlantı kontrollerinin çalışması
- Dar ekranlarda form ve listenin kullanılabilir olması

Bu senaryolar manuel kontrol listesidir.
ESLint ve üretim derlemesi, kullanıcı etkileşimi testlerinin yerine geçmez.

### Teslim durumu

- Kaynak kod: https://github.com/damlakaraman/nextrole
- Canlı site: Henüz yayımlanmadı.
- Ekran görüntüsü: Teslim hazırlığında eklenecek.

### Gelecek geliştirmeler

- JSON biçiminde yedek indirme ve yedekten geri yükleme
- Başvuruları tarihe göre sıralama
- Mülakat tarihi ve takip hatırlatmaları
- Kullanıcı hesabı ve cihazlar arasında eşitleme

Bu özellikler mevcut sürüme dahil değildir.

---

## English

### About

NextRole is a web application that helps job and internship seekers
track applications, recruitment stages, and interview notes in one place.

It aims to organize scattered application records and make each
application's current stage easier to follow.

The project was developed as the web development assignment
of a certified training program.

### Features

- Add applications with company, position, application date, and status
- Include optional job posting links and notes
- List, edit, and delete applications with confirmation
- Search by company or position
- Filter by application status
- View total application, interview, and offer counts
- Store records in the current browser using LocalStorage
- Responsive layout for different screen widths
- Required field and HTTP/HTTPS link validation
- Empty states, action feedback, and storage error messages

Application statuses: Applied, Interview, Offer, and Rejected.
The current user interface displays these statuses in Turkish.

Summary counts are calculated from all records.
Search and status filters only affect the displayed list.

### Technologies

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| JavaScript | Data processing and user interactions |
| CSS | Styling and responsive layout |
| Vite | Development server and production build |
| LocalStorage | Browser-based data storage |
| ESLint | Code linting |
| Git and GitHub | Version control and source code sharing |

### How it works

Applications are stored as an array of JavaScript objects.
React useState manages the application list, form fields, and filters.

Each application receives a unique identifier through crypto.randomUUID().
Editing and deletion use this identifier to locate the relevant record.

When an application is added, edited, or deleted, the updated list is
serialized using JSON.stringify() and written to LocalStorage.
The displayed list is updated after storage succeeds.
Saved records are read using JSON.parse() when the application loads.

The application does not use machine learning or prediction models.
Summary counts are calculated from existing application records.

### Run locally

Prerequisites: Node.js and npm compatible with the project's Vite version.
Git is required to clone the repository.

```bash
git clone https://github.com/damlakaraman/nextrole.git
cd nextrole
npm install
npm run dev
```

Open the local address shown in the terminal.

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Production files are generated in the dist directory.

### Storage and limitations

- The application does not use a backend or remote database.
- Records belong to the current browser profile and site origin.
- Records persist when a tab or browser is closed during normal use.
- Clearing site data may delete saved records.
- Private browsing records may be removed when the private session ends.
- Records do not sync across devices or browsers.
- Local development and the deployed site use separate storage areas.
- User accounts, cloud backups, and data export are not included.
- Publishing the source code does not publish browser-stored applications.
- LocalStorage is not an encrypted vault; sensitive information should not be stored.

### Verification scenarios

- Adding an application updates the list and summary counts
- Editing changes the existing record without creating a duplicate
- Canceling an edit leaves the record unchanged
- Deletion requires user confirmation
- Search and status filters work together
- Records persist after a page refresh
- Required field and link validation work
- The form and list remain usable on narrow screens

These scenarios are a manual checklist.
Linting and a successful production build do not replace interaction testing.

### Delivery status

- Source code: https://github.com/damlakaraman/nextrole
- Live site: Not deployed yet.
- Screenshot: To be added during delivery preparation.

### Future improvements

- JSON backup export and import
- Sorting applications by date
- Interview dates and follow-up reminders
- User accounts and cross-device synchronization

These features are not included in the current version.