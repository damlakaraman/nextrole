# NextRole

İş başvurularını ve mülakat süreçlerini tek yerde takip et.

Track job applications and interviews in one place.

**[Canlı Uygulama / Live Demo](https://poetic-gelato-818674.netlify.app)** ·
**[Ekran Görüntüleri / Screenshots](docs/screenshots)**

---

## Türkçe

### Proje hakkında

NextRole, iş ve staj arayan kişilerin başvurularını, süreç durumlarını
ve görüşme notlarını tek bir ekranda takip edebilmesi için geliştirilmiş
bir web uygulamasıdır.

Proje, farklı platformlarda yapılan başvuruların dağınık kalması ve
hangi başvurunun hangi aşamada olduğunun takip edilememesi problemine
odaklanır.

Sertifikalı eğitim programının web geliştirme projesi kapsamında
hazırlanmıştır. İlk sürüm, kişisel başvuru takibinin temel işlevlerini sunar.

### Özellikler

- Şirket, pozisyon, başvuru tarihi ve durum bilgileriyle başvuru ekleme
- İsteğe bağlı ilan bağlantısı ve not ekleme
- Başvuruları listeleme ve düzenleme
- Kullanıcı onayıyla başvuru silme
- Şirket veya pozisyon adına göre arama
- Başvuru durumuna göre filtreleme
- Toplam başvuru, mülakat ve teklif sayılarını görüntüleme
- LocalStorage ile tarayıcıda veri saklama
- Farklı ekran genişliklerine uyum sağlayan tasarım
- Zorunlu alan, boşluk ve HTTP/HTTPS bağlantı kontrolleri
- Boş liste, işlem sonucu ve depolama hatası bildirimleri

Başvuru durumları: **Başvuruldu, Mülakat, Teklif ve Olumsuz.**

Özet sayaçları tüm kayıtlar üzerinden hesaplanır.
Arama ve durum filtresi yalnızca görüntülenen listeyi etkiler.

Mülakat sayacı, mevcut durumu Mülakat olan kayıtları gösterir;
geçmişte yapılan toplam görüşme sayısını göstermez.

### Ekran görüntüleri

Uygulamanın genel görünümü, arama ve filtreleme işlemleriyle ilgili
ekran görüntülerine aşağıdaki klasörden ulaşabilirsiniz.

**[Tüm ekran görüntülerini görüntüle](docs/screenshots)**

Görsellerdeki kayıtlar uygulamayı ziyaret eden kişilere otomatik yüklenmez.

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
| Netlify | Canlı yayın ve GitHub üzerinden otomatik dağıtım |

### Çalışma mantığı ve tasarım kararları

Başvuru kayıtları JavaScript nesnelerinden oluşan bir dizi içinde tutulur.
React useState ile başvuru listesi, form alanları ve filtre seçimleri yönetilir.

Her başvuruya crypto.randomUUID() ile benzersiz bir kimlik atanır.
Düzenleme ve silme işlemlerinde ilgili kayıt bu kimlikle bulunur.

Ekleme, düzenleme ve silme işlemlerinde güncel liste JSON.stringify()
ile metne dönüştürülerek LocalStorage'a yazılır.
Saklama işlemi başarılı olduğunda ekrandaki liste güncellenir.
Uygulama açılırken kayıtlar JSON.parse() ile okunur.

React, arayüzü veri değişiklikleriyle birlikte güncellemek için seçilmiştir.
LocalStorage ise ilk sürümü sunucu ve uzak veritabanı kurmadan
kullanılabilir hale getirmek için tercih edilmiştir.

Zorunlu alan ve bağlantı kontrolleri hatalı veri girişini azaltır.
Silme onayı, yanlışlıkla kayıt silinmesini önlemeye yardımcı olur.
Depolama başarısız olursa kullanıcıya hata mesajı gösterilir.

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

Üretim derlemesini yerel ortamda önizlemek için:

```bash
npm run preview
```

Üretim dosyaları dist klasöründe oluşturulur.

### Canlı yayın

**[NextRole'u aç](https://poetic-gelato-818674.netlify.app)**

Proje, GitHub deposunun main dalına bağlı olarak Netlify üzerinde
yayımlanır. Netlify, npm run build komutunu çalıştırır ve dist
klasöründeki çıktıyı sunar.

main dalına gönderilen yeni commit'ler otomatik dağıtım sürecini başlatır.
Dağıtım başarılı olduğunda canlı site güncellenir.

### Veri saklama ve sınırlamalar

- Uygulama sunucu veya uzak veritabanı kullanmaz.
- Kayıtlar kullanılan tarayıcı profiline ve site adresine bağlıdır.
- Normal kullanımda sekme veya tarayıcı kapatıldığında kayıtlar korunur.
- Site verilerinin temizlenmesi kayıtların silinmesine neden olabilir.
- Gizli gezinme oturumu sona erdiğinde kayıtlar silinebilir.
- Kayıtlar farklı cihaz veya tarayıcılar arasında eşitlenmez.
- Yerel geliştirme adresi ve canlı site ayrı kayıt alanlarına sahiptir.
- İlk kez açan kullanıcı boş bir başvuru listesi görür.
- Kullanıcı hesabı, bulut yedekleme ve dışa aktarma özellikleri bulunmaz.
- Kaynak kodun public olması tarayıcıdaki başvuru kayıtlarını yayımlamaz.
- LocalStorage şifreli bir kasa değildir; hassas bilgiler saklanmamalıdır.

### Kontrol senaryoları

- Başvuru eklenince liste ve sayaçların güncellenmesi
- Düzenlemenin yeni kayıt oluşturmadan mevcut kaydı değiştirmesi
- Düzenlemeden vazgeçildiğinde kaydın değişmemesi
- Silmenin yalnızca kullanıcı onayıyla gerçekleşmesi
- Arama ve durum filtresinin birlikte çalışması
- Sayfa yenilendiğinde kayıtların korunması
- Zorunlu alan ve bağlantı kontrollerinin çalışması
- Dar ekranlarda form ve listenin kullanılabilir olması

Bu senaryolar manuel kontrol listesidir.
ESLint ve üretim derlemesi, kullanıcı etkileşimi testlerinin yerine geçmez.

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

It addresses the difficulty of organizing applications submitted
through different platforms and following their current stages.

The project was developed as the web development assignment of a
certified training program. The first version provides the core
features of personal application tracking.

### Features

- Add applications with company, position, application date, and status
- Include optional job posting links and notes
- List and edit applications
- Delete applications with user confirmation
- Search by company or position
- Filter by application status
- View total application, interview, and offer counts
- Store records in the browser using LocalStorage
- Responsive layout for different screen widths
- Required field, whitespace, and HTTP/HTTPS link validation
- Empty states, action feedback, and storage error messages

Application statuses: **Applied, Interview, Offer, and Rejected.**
The current interface displays these statuses in Turkish.

Summary counts are calculated from all records.
Search and status filters only affect the displayed list.

The Interview count represents applications currently at that stage,
not the total number of past interviews.

### Screenshots

Screenshots of the dashboard, search, and filtering features
are available in the folder below.

**[View all screenshots](docs/screenshots)**

Screenshot records are not automatically loaded for visitors.

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
| Netlify | Hosting and automatic deployment from GitHub |

### How it works and design decisions

Applications are stored as an array of JavaScript objects.
React useState manages the application list, form fields, and filters.

Each application receives a unique identifier through crypto.randomUUID().
Editing and deletion use this identifier to locate the relevant record.

When an application is added, edited, or deleted, the updated list is
serialized using JSON.stringify() and written to LocalStorage.
The displayed list is updated after storage succeeds.
Saved records are read using JSON.parse() when the application loads.

React was chosen to keep the interface updated as application data changes.
LocalStorage was selected to make the first version usable without
setting up a backend or remote database.

Required field and link validation reduce invalid input.
Deletion confirmation helps prevent accidental removal.
Storage failures are reported to the user.

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

### Deployment

**[Open NextRole](https://poetic-gelato-818674.netlify.app)**

The project is deployed on Netlify from the GitHub repository's main branch.
Netlify runs npm run build and serves the output from the dist directory.

New commits pushed to main trigger automatic deployment.
The live site is updated after a successful deployment.

### Storage and limitations

- The application does not use a backend or remote database.
- Records belong to the current browser profile and site origin.
- Records persist when a tab or browser is closed during normal use.
- Clearing site data may delete saved records.
- Private browsing records may be removed when the private session ends.
- Records do not sync across devices or browsers.
- Local development and the live site use separate storage areas.
- First-time visitors see an empty application list.
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

### Future improvements

- JSON backup export and import
- Sorting applications by date
- Interview dates and follow-up reminders
- User accounts and cross-device synchronization

These features are not included in the current version.