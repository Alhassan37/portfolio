# ملف HTML المحدث مع الصور وزرار CV الصحيح

## 1. تعديل Navigation Section

```html
<!-- في بداية ملف index.html -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-brand">
            <!-- إضافة اللوجو هنا -->
            <img src="assets/images/logo.png" alt="Alhassan Osman Logo" class="logo-img">
            <span class="brand-text">Alhassan Osman</span>
        </div>
        <!-- باقي كود النافيجيشن -->
    </div>
</nav>
```

## 2. تعديل Hero Section مع الصورة الشخصية

```html
<section id="home" class="hero">
    <div class="hero-bg">
        <div class="dna-helix" id="dna-helix"></div>
        <div class="molecules"></div>
    </div>
    <div class="hero-content">
        <div class="hero-text">
            <h1 class="hero-title">
                <span class="typing-text" id="typing-text"></span>
                <span class="cursor">|</span>
            </h1>
            <p class="hero-subtitle">Biotechnology Student & Aspiring Bioinformatician</p>
            <p class="hero-university">Menoufia University (MNF) • Class of 2026</p>
            <!-- تعديل زرار CV هنا -->
            <div class="cta">
                <a class="btn primary" href="assets/documents/CV.pdf" download="Alhassan_Osman_CV.pdf" target="_blank">
                    <i class="fas fa-download"></i> Download CV
                </a>
                <a class="btn" href="https://github.com/Alhassan37" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a class="btn" href="https://www.linkedin.com/in/elhassanahmed/" target="_blank">
                    <i class="fab fa-linkedin"></i> LinkedIn
                </a>
            </div>
        </div>
        <!-- إضافة الصورة الشخصية -->
        <div class="hero-image">
            <img src="assets/images/profile-photo.jpg" alt="Alhassan Osman" class="profile-img">
        </div>
    </div>
</section>
```

## 3. تعديل Projects Section مع صور المشاريع

```html
<section id="projects">
    <h2 class="section-title">Projects</h2>
    <div class="projects">
        <article class="project card">
            <!-- إضافة صور المشاريع -->
            <img src="assets/images/project-1.jpg" alt="Microbial Protein Production" class="project-img">
            <h3>Microbial Protein Production</h3>
            <p>Reproducible analysis and visualization of fermentation data with Python and R.</p>
            <a class="btn" href="#" target="_blank">
                <i class="fas fa-arrow-up-right-from-square"></i> View Project
            </a>
        </article>
        
        <article class="project card">
            <img src="assets/images/project-2.jpg" alt="Genome Browser Track" class="project-img">
            <h3>Genome Browser Track</h3>
            <p>Built a UCSC custom track with annotated SNPs and gene features.</p>
            <a class="btn" href="#" target="_blank">
                <i class="fas fa-arrow-up-right-from-square"></i> View Project
            </a>
        </article>
        
        <article class="project card">
            <img src="assets/images/project-3.jpg" alt="Phylogenetic Trees" class="project-img">
            <h3>Phylogenetic Analysis Pipeline</h3>
            <p>Multiple sequence alignment and tree building (Clustal Omega → IQ-TREE).</p>
            <a class="btn" href="#" target="_blank">
                <i class="fas fa-arrow-up-right-from-square"></i> View Project
            </a>
        </article>
    </div>
</section>
```

## 4. CSS للصور الجديدة

```css
/* إضافة هذا CSS في ملف style.css */

/* تنسيق اللوجو */
.logo-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    object-fit: cover;
    border: 2px solid var(--accent);
}

/* تنسيق الصورة الشخصية */
.hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-img {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-img:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

/* تنسيق صور المشاريع */
.project-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease;
    border: 1px solid rgba(255,255,255,0.1);
}

.project-img:hover {
    transform: scale(1.02);
}

/* للهواتف المحمولة */
@media (max-width: 768px) {
    .hero-content {
        flex-direction: column;
        text-align: center;
    }
    
    .profile-img {
        width: 200px;
        height: 200px;
        margin-top: 20px;
    }
    
    .logo-img {
        width: 35px;
        height: 35px;
    }
}
```

## 5. بدائل لحل مشكلة عدم ظهور الصور

إذا لم تظهر الصور، يمكنك استخدام صور مؤقتة:

```html
<!-- صور مؤقتة من الإنترنت لحين إضافة صورك -->
<img src="https://via.placeholder.com/40x40/22d3ee/ffffff?text=AO" alt="Logo" class="logo-img">

<img src="https://via.placeholder.com/280x280/22d3ee/ffffff?text=Profile" alt="Alhassan Osman" class="profile-img">

<img src="https://via.placeholder.com/400x180/22d3ee/ffffff?text=Project+1" alt="Project 1" class="project-img">
```

## 6. JavaScript لتحسين تحميل CV

```javascript
// إضافة هذا في ملف app.js
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/documents/CV.pdf';
    link.download = 'Alhassan_Osman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // إظهار رسالة تأكيد
    alert('تم بدء تحميل السيرة الذاتية!');
}

// يمكن ربط هذه الوظيفة بالزرار:
// <button class="btn primary" onclick="downloadCV()">Download CV</button>
```

## ملخص الخطوات:

1. إنشئ مجلد `assets` بالمجلدات الفرعية
2. أضف ملف `CV.pdf` في `assets/documents/`
3. أضف الصور في `assets/images/`
4. عدّل ملف HTML بالأكواد المذكورة أعلاه
5. أضف CSS للصور في ملف `style.css`
6. اختبر الموقع في المتصفح

بهذه الطريقة ستحصل على موقع كامل مع الصور وزرار CV يعمل بشكل صحيح!