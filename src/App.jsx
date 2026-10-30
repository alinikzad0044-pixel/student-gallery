
import { useState } from "react";
import "./App.css";

const roles = [
  { id: "admin", title: "مدیریت", icon: "👑", color: "purple" },
  { id: "teacher", title: "معلم", icon: "🍎", color: "pink" },
  { id: "parent", title: "والدین", icon: "💗", color: "green" },
];

function App() {
  const [role, setRole] = useState("parent");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const selectedRole = roles.find((item) => item.id === role);

  function handleLogin(e) {
    e.preventDefault();
    setMessage("صفحه ورود هنوز به سیستم احراز هویت متصل نشده است. مرحله اتصال به Supabase بعداً انجام می‌شود.");
  }

  return (
    <main className="login-page" dir="rtl">
      <div className="decoration decoration-one">✦</div>
      <div className="decoration decoration-two">☁️</div>
      <div className="decoration decoration-three">🌼</div>
      <div className="decoration decoration-four">★</div>

      <section className="login-layout">

        <div className="welcome-section">
          <div className="brand">
            <div className="brand-icon">🖼️</div>
            <span>قاب مدرسه</span>
          </div>

          <div className="welcome-content">
            <span className="welcome-label">دنیای قشنگ خاطره‌ها</span>

            <h1>
              لبخندهای کوچک،
              <br />
              <span>خاطره‌های بزرگ!</span>
            </h1>

            <p>
              اینجا لحظه‌های شیرین کودکی در قاب خاطرات
              مدرسه ثبت می‌شوند تا همیشه کنار خانواده‌ها بمانند.
            </p>

            <div className="illustration">
              <div className="sun">☀️</div>
              <div className="cloud cloud-one">☁️</div>
              <div className="cloud cloud-two">☁️</div>
              <div className="rainbow">🌈</div>
              <div className="kids">🧒🏻 👧🏻</div>
              <div className="flower flower-one">🌸</div>
              <div className="flower flower-two">🌷</div>
              <div className="flower flower-three">🌼</div>
            </div>
          </div>

          <div className="welcome-footer">
            <span>💛</span>
            هر روز، یک خاطره شیرین‌تر
          </div>
        </div>

        <div className="form-section">
          <div className="form-card">

            <div className="mobile-brand">
              🖼️ <span>قاب مدرسه</span>
            </div>

            <div className="form-heading">
              <div className="heading-icon">{selectedRole.icon}</div>
              <h2>خوش آمدید!</h2>
              <p>برای ورود به حساب خود، نقش خود را انتخاب کنید.</p>
            </div>

            <div className="role-tabs">
              {roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`role-tab ${role === item.id ? `active ${item.color}` : ""}`}
                  onClick={() => {
                    setRole(item.id);
                    setMessage("");
                  }}
                >
                  <span>{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin}>
              <label htmlFor="mobile">شماره موبایل</label>
              <div className="input-wrapper">
                <span>📱</span>
                <input
                  id="mobile"
                  type="tel"
                  inputMode="tel"
                  placeholder="مثلاً 09123456789"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="password">رمز عبور</label>
              <div className="input-wrapper">
                <span>🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور خود را وارد کنید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="show-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="نمایش یا مخفی کردن رمز"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" />
                  مرا به خاطر بسپار
                </label>
                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => setMessage("بازیابی رمز عبور پس از اتصال سیستم ورود فعال می‌شود.")}
                >
                  رمز عبور را فراموش کرده‌اید؟
                </button>
              </div>

              <button className={`login-button ${selectedRole.color}`} type="submit">
                ورود به پنل {selectedRole.title}
                <span> ← </span>
              </button>

              {message && (
                <div className="login-message" role="status">
                  {message}
                </div>
              )}
            </form>

            <div className="form-bottom">
              <span>✨</span>
              ورود امن به دنیای خاطرات مدرسه
              <span>✨</span>
            </div>
          </div>
        </div>

      </section>

      <footer className="page-footer">
        ساخته شده با عشق برای دنیای زیبای کودکان 💛
      </footer>
    </main>
  );
}

export default App;
