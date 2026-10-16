import { useState } from 'react'
import './App.css'

const STORAGE_KEY = 'nextrole-applications-v1'
const statuses = ['Başvuruldu', 'Mülakat', 'Teklif', 'Olumsuz']
const statusClasses = {
  Başvuruldu: 'applied',
  Mülakat: 'interview',
  Teklif: 'offer',
  Olumsuz: 'rejected',
}

const emptyForm = {
  company: '',
  position: '',
  date: '',
  status: 'Başvuruldu',
  url: '',
  notes: '',
}

function loadApplications() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) return []

    return saved.filter((item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.company === 'string' &&
      typeof item.position === 'string' &&
      typeof item.date === 'string' &&
      statuses.includes(item.status)
    )
  } catch {
    return []
  }
}

function formatDate(value) {
  return value ? value.split('-').reverse().join('.') : 'Tarih belirtilmedi'
}

function safeUrl(value) {
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function App() {
  const [applications, setApplications] = useState(loadApplications)
  const [form, setForm] = useState({ ...emptyForm })
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')
  const [message, setMessage] = useState(null)

  const interviewCount = applications.filter(
    (item) => item.status === 'Mülakat'
  ).length

  const offerCount = applications.filter(
    (item) => item.status === 'Teklif'
  ).length

  const visibleApplications = applications.filter((item) => {
    const text = `${item.company} ${item.position}`.toLocaleLowerCase('tr')
    return (
      text.includes(search.trim().toLocaleLowerCase('tr')) &&
      (statusFilter === 'Tümü' || item.status === statusFilter)
    )
  })

  function notify(text, type = 'success') {
    setMessage({ text, type })
  }

  function saveApplications(nextApplications) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextApplications))
      setApplications(nextApplications)
      return true
    } catch {
      notify('Kayıt saklanamadı. Tarayıcı depolama ayarlarını kontrol et.', 'error')
      return false
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function resetForm() {
    setForm({ ...emptyForm })
    setEditingId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.company.trim() || !form.position.trim()) {
      notify('Şirket ve pozisyon alanlarını doldurmalısın.', 'error')
      return
    }

    const url = form.url.trim()
    if (url && !safeUrl(url)) {
      notify('Geçerli bir http:// veya https:// bağlantısı gir.', 'error')
      return
    }

    const application = {
      ...form,
      company: form.company.trim(),
      position: form.position.trim(),
      notes: form.notes.trim(),
      url,
      id: editingId ?? crypto.randomUUID(),
    }

    const nextApplications = editingId !== null
      ? applications.map((item) =>
          item.id === editingId ? application : item
        )
      : [application, ...applications]

    if (saveApplications(nextApplications)) {
      notify(editingId !== null ? 'Başvuru güncellendi.' : 'Yeni başvuru eklendi.')
      resetForm()
    }
  }

  function handleEdit(application) {
    setForm({
      company: application.company,
      position: application.position,
      date: application.date,
      status: application.status,
      url: application.url || '',
      notes: application.notes || '',
    })
    setEditingId(application.id)
    setMessage(null)
    document.getElementById('company').focus()
  }

  function handleDelete(application) {
    if (!window.confirm(`${application.company} başvurusu silinsin mi?`)) return

    if (saveApplications(
      applications.filter((item) => item.id !== application.id)
    )) {
      if (editingId === application.id) resetForm()
      notify('Başvuru silindi.')
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="./" aria-label="NextRole ana sayfa">
          <span className="brand-icon" aria-hidden="true">↗</span>
          NextRole<span className="brand-dot">.</span>
        </a>
        <span className="workspace-label">
          <span className="live-dot" />
          Kişisel çalışma alanı
        </span>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">BİR SONRAKİ ADIMIN İÇİN</p>
            <h1>Yeni fırsatlara yer aç.</h1>
            <p className="hero-description">
              Başvuruların, görüşmelerin ve notların. Hepsi tek bir yerde.
            </p>
          </div>
          <div className="hero-tag">
            <span aria-hidden="true">✦</span> Küçük adımlar, yeni başlangıçlar.
          </div>
        </section>

        <section className="stats-grid" aria-label="Tüm başvuruların özeti">
          <article className="stat-card">
            <div>
              <p>Toplam başvuru</p>
              <strong>{applications.length}</strong>
              <span className="stat-caption">Kaydettiğin tüm fırsatlar</span>
            </div>
            <span className="stat-icon blue" aria-hidden="true">↗</span>
          </article>
          <article className="stat-card">
            <div>
              <p>Mülakat</p>
              <strong>{interviewCount}</strong>
              <span className="stat-caption">Görüşme aşamasındaki başvurular</span>
            </div>
            <span className="stat-icon purple" aria-hidden="true">◷</span>
          </article>
          <article className="stat-card">
            <div>
              <p>Teklif</p>
              <strong>{offerCount}</strong>
              <span className="stat-caption">Bir sonraki adımına daha yakın</span>
            </div>
            <span className="stat-icon green" aria-hidden="true">✓</span>
          </article>
        </section>

        <div className="workspace-grid">
          <aside className="form-panel" aria-labelledby="form-title">
            <div className="panel-heading">
              <span className="panel-icon" aria-hidden="true">
                {editingId !== null ? '✎' : '+'}
              </span>
              <div>
                <h2 id="form-title">
                  {editingId !== null ? 'Başvuruyu düzenle' : 'Yeni başvuru'}
                </h2>
                <p>Bir fırsatı daha kayıt altına al.</p>
              </div>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              <label htmlFor="company">
                Şirket <span className="required">*</span>
                <input
                  id="company"
                  name="company"
                  placeholder="Örn. Atlas Teknoloji"
                  value={form.company}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </label>

              <label htmlFor="position">
                Pozisyon <span className="required">*</span>
                <input
                  id="position"
                  name="position"
                  placeholder="Örn. Frontend Developer"
                  value={form.position}
                  onChange={handleChange}
                  maxLength={120}
                  required
                />
              </label>

              <div className="form-row">
                <label htmlFor="date">
                  Başvuru tarihi *
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="status">
                  Durum
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label htmlFor="url">
                İlan bağlantısı
                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  value={form.url}
                  onChange={handleChange}
                  maxLength={2000}
                />
              </label>

              <label htmlFor="notes">
                Notların
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Görüşme detayları, hatırlamak istediklerin..."
                  value={form.notes}
                  onChange={handleChange}
                  maxLength={2000}
                />
              </label>

              <button className="primary-button" type="submit">
                {editingId !== null ? 'Değişiklikleri kaydet' : '+ Başvuru ekle'}
              </button>

              {editingId !== null && (
                <button
                  className="cancel-button"
                  type="button"
                  onClick={() => {
                    resetForm()
                    setMessage(null)
                  }}
                >
                  Düzenlemekten vazgeç
                </button>
              )}
            </form>

            <p className="storage-note">
              <span aria-hidden="true">ⓘ</span>
              Kayıtların bu tarayıcıda saklanır.
            </p>
          </aside>

          <section className="list-panel" aria-labelledby="list-title">
            <div className="list-heading">
              <div>
                <p className="eyebrow">FIRSATLARINI TAKİP ET</p>
                <h2 id="list-title">Başvurularım</h2>
              </div>
              <span className="record-count">
                {visibleApplications.length} / {applications.length} kayıt
              </span>
            </div>

            <div className="filters">
              <label className="search-field">
                <span className="sr-only">Şirket veya pozisyon ara</span>
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Şirket veya pozisyon ara..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <label className="filter-field">
                <span className="sr-only">Duruma göre filtrele</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="Tümü">Tüm durumlar</option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            {message && (
              <div className={`feedback ${message.type}`} role="status">
                {message.text}
              </div>
            )}

            <div className="application-list">
              {visibleApplications.map((application) => {
                const link = safeUrl(application.url)
                return (
                  <article className="application-card" key={application.id}>
                    <div className="card-top">
                      <div className="company-avatar" aria-hidden="true">
                        {application.company.slice(0, 2).toLocaleUpperCase('tr')}
                      </div>
                      <div className="application-info">
                        <h3>{application.position}</h3>
                        <p>{application.company}</p>
                      </div>
                      <span
                        className={`status-badge ${statusClasses[application.status]}`}
                      >
                        <span aria-hidden="true">●</span>
                        {application.status}
                      </span>
                    </div>

                    {application.notes && (
                      <p className="application-notes">{application.notes}</p>
                    )}

                    <div className="card-bottom">
                      <time dateTime={application.date}>
                        {formatDate(application.date)}
                      </time>
                      <div className="card-actions">
                        {link && (
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            İlan ↗
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleEdit(application)}
                          aria-label={`${application.company} başvurusunu düzenle`}
                        >
                          Düzenle
                        </button>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => handleDelete(application)}
                          aria-label={`${application.company} başvurusunu sil`}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}

              {visibleApplications.length === 0 && (
                <div className="empty-state">
                  <span className="empty-icon" aria-hidden="true">↗</span>
                  <h3>
                    {applications.length === 0
                      ? 'Yeni bir başlangıç.'
                      : 'Bir eşleşme bulamadık.'}
                  </h3>
                  <p>
                    {applications.length === 0
                      ? 'İlk başvurunu formdan ekle. Kariyer yolculuğunu birlikte düzenleyelim.'
                      : 'Başka bir kelime veya durum seçerek tekrar dene.'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="page-footer">
          <span>NextRole · Bir sonraki adımın.</span>
          <span>Veriler cihazlar arasında eşitlenmez.</span>
        </footer>
      </main>
    </div>
  )
}

export default App