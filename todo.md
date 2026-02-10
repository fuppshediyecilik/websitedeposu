# NexGen AI - Production Platform TODO

## Phase 1: Kredi Sistemi ve User Dashboard
- [ ] User credits tablosu (users_credits) oluşturma
- [ ] Credit transaction logging tablosu
- [ ] User dashboard sayfası (/dashboard)
- [ ] Credit balance gösterimi
- [ ] Generated videos history
- [ ] Video download linki

## Phase 2: Video/Image Generator Interface
- [ ] Generator sayfası (/generator)
- [ ] Prompt input form
- [ ] Generation settings (style, quality, duration, vb)
- [ ] Progress indicator
- [ ] Generated content preview
- [ ] Download button

## Phase 3: AI Generation Backend
- [ ] Manus image generation API entegrasyonu
- [ ] Video synthesis (image sequence → video)
- [ ] Generation queue sistemi
- [ ] Error handling ve retry logic
- [ ] Generation history tracking

## Phase 4: Storage ve Download
- [ ] Google Cloud Storage setup
- [ ] File upload ve storage
- [ ] 2 dakika auto-delete logic
- [ ] Download link generation
- [ ] Expiring URL'ler

## Phase 5: Admin Panel
- [ ] Admin dashboard (/admin)
- [ ] User analytics (total users, active users, daily visitors)
- [ ] Revenue tracking (total revenue, monthly revenue)
- [ ] Payment history
- [ ] Generated content stats
- [ ] User management (suspend, delete, vb)

## Phase 6: Payment ve Kredi Purchase
- [ ] Kredi purchase page
- [ ] Stripe integration (kredi packages)
- [ ] Credit deduction on generation
- [ ] Free tier (ilk 3 video)
- [ ] Paid tier (10 kredi/video)
- [ ] Usage tracking

## Phase 7: Testing ve Optimization
- [ ] Unit tests (credit system, generation, storage)
- [ ] Integration tests (full flow)
- [ ] Performance optimization
- [ ] Error handling
- [ ] Security audit

## Phase 8: Production Deploy
- [ ] Final checkpoint
- [ ] Production configuration
- [ ] Monitoring setup
- [ ] Backup strategy
