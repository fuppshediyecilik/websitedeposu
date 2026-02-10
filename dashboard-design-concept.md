# NexGen AI - Billing Dashboard Tasarım Konsepti

## Genel Tasarım Felsefesi

**Obsidian Luxe** temasına uygun, profesyonel ve modern bir dashboard arayüzü. Kullanıcıların abonelik durumlarını hızlıca görebilecekleri, faturaları yönetebilecekleri ve plan değişiklikleri yapabilecekleri bir platform.

## Layout Yapısı

### 1. Header Bölümü
- Kullanıcı adı ve profil bilgisi
- Logout butonu
- Breadcrumb navigation

### 2. Sidebar Navigation
- Dashboard (Ana sayfa)
- Abonelik Yönetimi
- Faturalar
- Ayarlar
- Destek

### 3. Main Content Area

#### A. Abonelik Kartı (Üst Bölüm)
- Mevcut plan adı ve fiyatı
- Durum göstergesi (Aktif, Paused, İptal Edildi)
- Dönem bilgisi (Başlangıç ve Bitiş tarihleri)
- Plan özellikleri listesi
- Action butonları:
  - Plan Yükselt (Upgrade)
  - Plan Düşür (Downgrade)
  - Aboneliği İptal Et (Cancel)

#### B. Kullanım İstatistikleri (Orta Bölüm)
- Aylık kullanım özeti
- Kalan kredi/generation sayısı
- Progress barlar
- Upgrade önerisi (sınıra yaklaşıldığında)

#### C. Fatura Tablosu (Alt Bölüm)
- Tarih
- Açıklama (Plan adı)
- Tutar
- Durum (Paid, Pending, Failed)
- İşlemler (PDF İndir, Detaylar)
- Pagination

## Renk Şeması (Obsidian Luxe)
- **Arka Plan**: oklch(0.10 0.01 270) - Obsidian siyahı
- **Kartlar**: oklch(0.13 0.01 270) - Hafif gri
- **Accent (Aktif)**: oklch(0.82 0.17 75) - Amber/Altın
- **Accent (Secondary)**: oklch(0.75 0.14 200) - Cyan
- **Metin**: oklch(0.70 0.005 90) - Açık gri
- **Başlık**: Beyaz

## Tipografi
- **Başlıklar**: Sora Bold
- **Body**: Inter Regular
- **Monospace**: JetBrains Mono (fiyatlar için)

## Animasyonlar
- Kartlar: Soft fade-in on scroll
- Butonlar: Smooth hover effects
- Modals: Glassmorphism with blur
- Transitions: 300ms cubic-bezier(0.4, 0, 0.2, 1)

## Responsive Design
- **Desktop**: Full sidebar + content
- **Tablet**: Collapsible sidebar
- **Mobile**: Bottom navigation + full-width content

## Bileşen Hiyerarşisi

```
Dashboard Layout
├── Header
│   ├── Logo/Brand
│   ├── User Info
│   └── Logout
├── Sidebar
│   ├── Navigation Links
│   └── Collapse Toggle
└── Main Content
    ├── Subscription Card
    │   ├── Plan Info
    │   ├── Status Badge
    │   ├── Period Info
    │   ├── Features List
    │   └── Action Buttons
    ├── Usage Statistics
    │   ├── Summary Cards
    │   ├── Progress Bars
    │   └── Upgrade Prompt
    └── Invoices Section
        ├── Table Header
        ├── Invoice Rows
        ├── Pagination
        └── Empty State
```

## Kullanıcı Akışları

### Abonelik Yökseltme (Upgrade)
1. Kullanıcı "Plan Yükselt" butonuna tıklar
2. Modal açılır, mevcut ve yeni plan karşılaştırması gösterilir
3. Onay butonuna tıklandığında Stripe checkout'a yönlendirilir
4. Başarılı ödeme sonrası dashboard güncellenir

### Abonelik İptali (Cancel)
1. Kullanıcı "Aboneliği İptal Et" butonuna tıklar
2. Uyarı modalı gösterilir
3. Onay sonrası abonelik iptal edilir
4. Durum "Canceled" olarak güncellenir

### Fatura İndirme
1. Fatura satırında "İndir" butonuna tıklanır
2. PDF dosyası indirilir
3. Toast notification gösterilir

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation desteği
- Screen reader friendly
- High contrast mode support
- Focus indicators visible

## Performance Optimizations
- Lazy loading for invoices
- Memoized components
- Optimistic updates
- Skeleton loaders during fetch
