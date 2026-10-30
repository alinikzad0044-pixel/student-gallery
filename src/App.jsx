
import { useState } from "react";
import "./App.css";

const roles = [
  { id: "admin", title: "مدیریت", color: "purple" },
  { id: "teacher", title: "معلم", color: "pink" },
  { id: "parent", title: "والدین", color: "green" },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 20 5v6c0 5.2-3.4 9-8 11-4.6-2-8-5.8-8-11V5l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.5-4.2 3.3-6.5 8-6.5s7.5 2.3 8 6.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.4-3.8 2.6-5.8 6.5-5.8s6.1 2 6.5 5.8" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.7M17 14.5c2.8.5 4.2 2.3 4.5 5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M10 18h4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="10" width="16" height="12" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {hidden ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11 11 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.2 4.1" />
          <path d="M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7c1 0 2-.2 2.8-.5" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function App() {
  const [role, setRole] = useState("admin");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const selectedRole = roles.find((item) => item.id === role);

  function handleLogin(event) {
    event.preventDefault();
    setMessage(
      "سامانه ورود هنوز به سیستم احراز هویت متصل نشده است. در مرحله بعد ورود امن کاربران را راه‌اندازی می‌کنیم."
    );
  }

  function changeRole(nextRole) {
    setRole(nextRole);
    setMessage("");
  }

  return (
    <main className="login-page" dir="rtl">
      <div className="background-overlay" />

      <div className="login-container">
        <section className="intro-panel">
          <div className="brand">
            <div className="brand-mark">
              <span />
            </div>
            <div className="brand-name">قاب مدرسه</div>
          </div>

          <div className="brand-caption">
            سامانه اشتراک عکس و خاطرات مدرسه
          </div>

          <div className="intro-copy">
            <h1>
              خاطرات شیرین،
              <br />
              <span>همیشه ماندگار</span>
            </h1>

            <p>
              اینجا لحظه‌های قشنگ مدرسه،
              <br />
              در قاب عکس‌ها برای همیشه ثبت می‌شوند.
            </p>
          </div>

          <div className="intro-bottom">
            <span className="intro-line" />
            <span>قاب مدرسه؛ همراه لحظه‌های زیبای کودکی</span>
          </div>
        </section>

        <section className="login-card">
          <div className="role-tabs" role="tablist" aria-label="انتخاب نوع کاربر">
            {roles.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={role === item.id}
                className={`role-tab ${item.color} ${
                  role === item.id ? "active" : ""
                }`}
                onClick={() => changeRole(item.id)}
              >
                <span className="tab-icon">
                  {item.id === "admin" && <ShieldIcon />}
                  {item.id === "teacher" && <UserIcon />}
                  {item.id === "parent" && <UsersIcon />}
                </span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="card-heading">
            <h2>ورود به پنل {selectedRole.title}</h2>
            <p>لطفاً اطلاعات حساب کاربری خود را وارد کنید.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="field">
              <div className="input-box">
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="username"
                  placeholder="شماره موبایل یا نام کاربری"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  required
                  aria-label="شماره موبایل یا نام کاربری"
                />
                <span className="field-icon">
                  <PhoneIcon />
                </span>
              </div>
            </div>

            <div className="field">
              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  aria-label="رمز عبور"
                />
                <span className="field-icon">
                  <LockIcon />
                </span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                >
                  <EyeIcon hidden={!showPassword} />
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>مرا به خاطر بسپار</span>
              </label>

              <button
                type="button"
                className="forgot-link"
                onClick={() =>
                  setMessage("بازیابی رمز عبور پس از اتصال سامانه فعال می‌شود.")
                }
              >
                فراموشی رمز عبور؟
              </button>
            </div>

            <button
              type="submit"
              className={`submit-button ${selectedRole.color}`}
            >
              <span>ورود به پنل {selectedRole.title}</span>
              <span className="submit-arrow">←</span>
            </button>

            {message && (
              <div className="form-message" role="status">
                {message}
              </div>
            )}
          </form>

          <div className="card-footer">
            <span className="footer-shield">
              <ShieldIcon />
            </span>
            <span>ورود امن به دنیای خاطرات مدرسه</span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
