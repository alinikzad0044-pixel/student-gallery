import { useState } from 'react'
import './App.css'

const initialPhotos = [
  {
    id: 1,
    student: 'آرین احمدی',
    classroom: 'اول الف',
    teacher: 'خانم محمدی',
    description: 'فعالیت نقاشی در کلاس',
    date: '۱۴۰۵/۰۷/۲۸',
    status: 'pending',
    color: '#dceaff',
    emoji: '🎨',
  },
  {
    id: 2,
    student: 'سارا محمدی',
    classroom: 'اول الف',
    teacher: 'آقای رضایی',
    description: 'فعالیت گروهی دانش‌آموزان',
    date: '۱۴۰۵/۰۷/۲۸',
    status: 'pending',
    color: '#fbe4d5',
    emoji: '🧩',
  },
  {
    id: 3,
    student: 'پارسا رضایی',
    classroom: 'دوم ب',
    teacher: 'خانم احمدی',
    description: 'نمایشگاه کاردستی',
    date: '۱۴۰۵/۰۷/۲۷',
    status: 'approved',
    color: '#d8f3e5',
    emoji: '✂️',
  },
  {
    id: 4,
    student: 'هستی کریمی',
    classroom: 'دوم ب',
    teacher: 'آقای کریمی',
    description: 'فعالیت علمی در کلاس',
    date: '۱۴۰۵/۰۷/۲۷',
    status: 'rejected',
    color: '#f4e1f6',
    emoji: '🔬',
  },
]

const statusLabels = {
  pending: 'در انتظار بررسی',
  approved: 'تأیید شده',
  rejected: 'رد شده',
}

function App() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')

  const visiblePhotos = photos.filter(photo => {
    const matchesFilter = filter === 'all' || photo.status === filter
    const query = search.trim().toLowerCase()
    const matchesSearch =
      photo.student.toLowerCase().includes(query) ||
      photo.classroom.toLowerCase().includes(query) ||
      photo.teacher.toLowerCase().includes(query)

    return matchesFilter && matchesSearch
  })

  function changeStatus(id, status) {
    setPhotos(current =>
      current.map(photo =>
        photo.id === id ? { ...photo, status } : photo
      )
    )

    setNotice(
      status === 'approved'
        ? 'عکس در این نسخه آزمایشی تأیید شد.'
        : 'عکس در این نسخه آزمایشی رد شد.'
    )
  }

  function deletePhoto(id) {
    const confirmed = window.confirm('از حذف این مورد مطمئن هستی؟')
    if (!confirmed) return

    setPhotos(current => current.filter(photo => photo.id !== id))
    setNotice('مورد انتخاب‌شده از فهرست آزمایشی حذف شد.')
  }

  const pendingCount = photos.filter(photo => photo.status === 'pending').length
  const approvedCount = photos.filter(photo => photo.status === 'approved').length
  const rejectedCount = photos.filter(photo => photo.status === 'rejected').length

  return (
    <div className="app" dir="rtl">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">📸</span>
          <div>
            <h1>قاب مدرسه</h1>
            <p>سامانه مدیریت تصاویر دانش‌آموزان</p>
          </div>
        </div>
        <span className="status">پنل مدیریت</span>
      </header>

      <main className="main admin-main">
        <section className="admin-heading">
          <div>
            <span className="eyebrow">مدیریت محتوا</span>
            <h2>بررسی عکس‌های ارسالی</h2>
            <p>عکس‌ها را بررسی کن و پیش از انتشار برای والدین تصمیم بگیر.</p>
          </div>
          <span className="admin-shield">🛡️</span>
        </section>

        <section className="stats">
          <article className="stat-card">
            <span className="stat-icon pending-icon">⏳</span>
            <div>
              <p>در انتظار بررسی</p>
              <strong>{pendingCount}</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-icon approved-icon">✓</span>
            <div>
              <p>تأیید شده</p>
              <strong>{approvedCount}</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-icon rejected-icon">×</span>
            <div>
              <p>رد شده</p>
              <strong>{rejectedCount}</strong>
            </div>
          </article>
        </section>

        <section className="review-section">
          <div className="review-toolbar">
            <h3>فهرست عکس‌ها</h3>
            <input
              type="search"
              placeholder="جست‌وجوی دانش‌آموز یا معلم..."
              value={search}
              onChange={event => setSearch(event.target.value)}
              aria-label="جست‌وجو"
            />
          </div>

          <div className="filter-tabs">
            {[
              ['all', 'همه'],
              ['pending', 'در انتظار بررسی'],
              ['approved', 'تأیید شده'],
              ['rejected', 'رد شده'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={filter === value ? 'filter-tab active' : 'filter-tab'}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {notice && (
            <p className="admin-notice" role="status">{notice}</p>
          )}

          {visiblePhotos.length === 0 ? (
            <div className="empty-state">
              <span>🔎</span>
              <p>موردی با این فیلتر پیدا نشد.</p>
            </div>
          ) : (
            <div className="admin-photo-grid">
              {visiblePhotos.map(photo => (
                <article className="admin-photo-card" key={photo.id}>
                  <div
                    className="mock-photo"
                    style={{ backgroundColor: photo.color }}
                  >
                    <span>{photo.emoji}</span>
                    <small>تصویر نمونه</small>
                  </div>

                  <div className="admin-photo-info">
                    <div className="student-title">
                      <h4>{photo.student}</h4>
                      <span className={`photo-status ${photo.status}`}>
                        {statusLabels[photo.status]}
                      </span>
                    </div>

                    <p>{photo.classroom} · {photo.date}</p>
                    <p>ارسال‌کننده: {photo.teacher}</p>
                    <p className="photo-description">{photo.description}</p>

                    <div className="admin-actions">
                      {photo.status !== 'approved' && (
                        <button
                          type="button"
                          className="approve-button"
                          onClick={() => changeStatus(photo.id, 'approved')}
                        >
                          ✓ تأیید
                        </button>
                      )}
                      {photo.status !== 'rejected' && (
                        <button
                          type="button"
                          className="reject-button"
                          onClick={() => changeStatus(photo.id, 'rejected')}
                        >
                          × رد عکس
                        </button>
                      )}
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deletePhoto(photo.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="admin-footer">
          نسخه آزمایشی — تغییرات هنوز در سرور ذخیره نمی‌شوند.
        </p>
      </main>
    </div>
  )
}

export default App