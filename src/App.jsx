
import { useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import TeacherPanel from "./pages/TeacherPanel";

const roles = [
  {
    id: "admin",
    title: "مدیریت",
    subtitle: "ورود مدیر سامانه",
    color: "purple",
    description: "مدیریت و نظارت بر محتوای مدرسه",
  },
  {
    id: "teacher",
    title: "معلم",
    subtitle: "ورود کادر آموزشی",
    color: "pink",
    description: "بارگذاری و مدیریت تصاویر دانش‌آموزان",
  },
  {
    id: "parent",
    title: "والدین",
    subtitle: "ورود اولیای دانش‌آموزان",
    color: "green",
    description: "مشاهده تصاویر تأییدشده فرزندتان",
  },
];

function RoleIcon({ role }) {
  if (role === "admin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (role === "teacher") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
        <path d="M7 12v4c3 2.5 7 2.5 10 0v-4" />
        <path d="M21 10v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
      <circle cx="9.5" cy="7" r="3.5" />
      <path d="M17 11a3.5 3.5 0 1 0-1-6.8M17 14.5a4 4 0 0 1 4 4V20" />
    </svg>
  );
}

function App() {
  const [activeRole, setActiveRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRole = roles.find(
    (role) => role.id === activeRole
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("لطفاً نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    if (activeRole !== "teacher") {
      setMessage("ورود این بخش هنوز فعال نشده است.");
      return;
    }

    if (username.trim() !== "class1") {
      setMessage("نام کاربری معلم صحیح نیست.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: "teacher1@ghabmadrese.local",
        password: password,
      });

      if (error) {
        setMessage("ورود ناموفق بود. رمز عبور را بررسی کنید.");
        return;
      }

      setIsTeacherLoggedIn(true);
    } catch (error) {
      console.error(error);
      setMessage("ارتباط با سامانه برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  }

  function changeRole(role) {
    setActiveRole(role);
    setMessage("");
  }

  if (isTeacherLoggedIn) {
    return <TeacherPanel />;
  }

  return (
    <main className={`login-page theme-${activeRole}`}>
      <div className="background-image" />
      <div className="background-overlay" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <div className="login-container">
        <header className="brand-header">
          <div className="brand-mark">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M7 20 24 8l17 12v20H7V20Z" />
              <path d="M17 40V25h14v15M19 17h10M24 12v10" />
            </svg>
          </div>

          <div className="brand-copy">
            <span className="brand-name">قاب مدرسه</span>
            <span className="brand-caption">
              خاطرات ماندگار، در قاب امن مدرسه
            </span>
          </div>
        </header>

        <section className="login-card">
          <div className="card-top-line" />

          <div className="card-heading">
            <span className="eyebrow">
              SCHOOL PHOTO GALLERY
            </span>
            <h1>به قاب مدرسه خوش آمدید</h1>
            <p>برای ورود، نقش کاربری خود را انتخاب کنید</p>
          </div>

          <div
            className="role-tabs"
            role="tablist"
            aria-label="انتخاب نقش کاربری"
          >
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={activeRole === role.id}
                className={`role-tab ${
                  activeRole === role.id ? "active" : ""
                } role-${role.id}`}
                onClick={() => changeRole(role.id)}
              >
                <span className="role-icon">
                  <RoleIcon role={role.id} />
                </span>
                <span>{role.title}</span>
              </button>
            ))}
          </div>

          <div className="selected-role">
            <div className="selected-role-icon">
              <RoleIcon role={activeRole} />
            </div>

            <div>
              <strong>{selectedRole.subtitle}</strong>
              <span>{selectedRole.description}</span>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">نام کاربری</label>

            <div className="input-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>

              <input
                id="username"
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                autoComplete="username"
              />
            </div>

            <label htmlFor="password">رمز عبور</label>

            <div className="input-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
              </svg>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "مخفی کردن رمز عبور"
                    : "نمایش رمز عبور"
                }
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3 21 21M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.8M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7c1.1 0 2.1-.2 3-.6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={isLoading}
            >
              <span>
                {isLoading ? "در حال ورود..." : "ورود به سامانه"}
              </span>

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>

            {message && (
              <div className="form-message" role="status">
                {message}
              </div>
            )}
          </form>

          <div className="card-footer">
            <span className="footer-lock">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </span>
            <span>
              حریم خصوصی تصاویر شما برای ما اهمیت دارد
            </span>
          </div>
        </section>

        <footer className="page-footer">
          <span>قاب مدرسه</span>
          <i />
          <span>سامانه امن اشتراک تصاویر مدرسه</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
