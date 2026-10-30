
import { useEffect, useState } from "react";
import "./TeacherPanel.css";
import { supabase } from "../lib/supabase";

function TeacherPanel() {
  const [students, setStudents] = useState([]);
  const [classroomId, setClassroomId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState("");
  const [message, setMessage] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    loadClassroom();
  }, []);

  async function loadClassroom() {
    setLoading(true);
    setMessage("");

    try {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (authError || !user) {
        setMessage("ابتدا باید معلم وارد حساب کاربری شود.");
        return;
      }

      const { data: teacher, error: teacherError } = await supabase
        .from("teachers")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (teacherError) throw teacherError;

      setTeacherName(teacher.full_name);

      const { data: classroom, error: classroomError } =
        await supabase
          .from("classrooms")
          .select("id, class_name, grade")
          .eq("teacher_id", user.id)
          .single();

      if (classroomError) throw classroomError;

      setClassroomId(classroom.id);

      const { data: studentList, error: studentsError } =
        await supabase
          .from("students")
          .select("id, full_name")
          .eq("classroom_id", classroom.id)
          .order("full_name");

      if (studentsError) throw studentsError;

      setStudents(studentList || []);
    } catch (error) {
      console.error(error);
      setMessage("دریافت اطلاعات کلاس با خطا مواجه شد: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadPhoto(student, file) {
    if (!file || !classroomId) return;

    if (!file.type.startsWith("image/")) {
      setMessage("لطفاً فقط فایل عکس انتخاب کنید.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("حجم عکس نباید بیشتر از ۱۰ مگابایت باشد.");
      return;
    }

    setUploading(student.id);
    setMessage("");

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath =
        `${classroomId}/${student.id}/${crypto.randomUUID()}-${safeName}`;

      const { error } = await supabase.storage
        .from("class-photos")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) throw error;

      setMessage(`عکس ${student.full_name} با موفقیت بارگذاری شد.`);
    } catch (error) {
      console.error(error);
      setMessage("آپلود عکس انجام نشد: " + error.message);
    } finally {
      setUploading("");
    }
  }

  if (loading) {
    return <div className="teacher-loading">در حال دریافت اطلاعات کلاس...</div>;
  }

  return (
    <main dir="rtl" className="teacher-panel">
      <header className="teacher-header">
        <div>
          <span className="teacher-caption">قاب مدرسه</span>
          <h1>پنل معلم</h1>
          <p>خوش آمدید {teacherName}</p>
        </div>
        <div className="class-badge">کلاس اول ۱</div>
      </header>

      <section className="teacher-summary">
        <div>
          <span>تعداد دانش‌آموزان</span>
          <strong>{students.length} نفر</strong>
        </div>
        <div>
          <span>سال تحصیلی</span>
          <strong>۱۴۰۵–۱۴۰۶</strong>
        </div>
      </section>

      {message && (
        <div className="teacher-message" role="status">
          {message}
        </div>
      )}

      <section className="students-section">
        <h2>فهرست دانش‌آموزان</h2>
        <p>برای هر دانش‌آموز می‌توانی عکس جداگانه بارگذاری کنی.</p>

        <div className="students-grid">
          {students.map((student, index) => (
            <article className="student-card" key={student.id}>
              <div className="student-number">{index + 1}</div>

              <div className="student-info">
                <h3>{student.full_name}</h3>
                <span>دانش‌آموز کلاس اول ۱</span>
              </div>

              <label className="upload-button">
                {uploading === student.id
                  ? "در حال آپلود..."
                  : "انتخاب عکس"}

                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading !== ""}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) uploadPhoto(student, file);
                    event.target.value = "";
                  }}
                />
              </label>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeacherPanel;
