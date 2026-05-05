import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'про проєкт' };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>про проєкт <span style={{ color: 'var(--color-primary)' }}>єПовітря</span></h1>
          <p className="hero-lead">
            відкрита платформа екологічного моніторингу для громадян України
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 content-prose">
              <h2 className="section-title mb-3">що таке єПовітря?</h2>
              <p>
                єПовітря — це відкрита платформа для моніторингу якості повітря в містах України.
                платформа збирає дані з вимірювальних станцій і надає їх у зручному,
                зрозумілому форматі для кожного.
              </p>
              <p>
                сервіс розроблено в рамках навчального проєкту з веб-розробки (лабораторна робота №1)
                з метою демонстрації можливостей Next.js, TypeScript та серверного рендерингу.
              </p>

              <h2 className="section-title mt-4 mb-3">про дані на платформі</h2>
              <p>
                всі показники станцій та вимірювань на цьому сайті є <strong>навчальними (mock)</strong>.
                вони згенеровані програмно і не відображають реальний стан атмосферного повітря.
                назви міст і приблизні координати відповідають реальним локаціям, але самі станції
                та їхні показники є вигаданими.
              </p>
              <p>
                для отримання актуальних даних звертайтесь до{' '}
                <a href="https://www.saveecobot.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>saveecobot.com</a>.
              </p>

              <h2 className="section-title mt-4 mb-3">технологічний стек</h2>
              <p>
                платформу побудовано на: Next.js 16 (App Router), TypeScript зі строгою типізацією,
                Node.js для серверної частини, Bootstrap 5.3 (CDN) та шрифті e-Ukraine.
              </p>

              <h2 className="section-title mt-4 mb-3">охоплення</h2>
              <p>
                на платформі представлено 7 станцій у 6 містах — київ, харків, дніпро, одеса,
                запоріжжя та львів. дані оновлюються щогодини з усіх активних станцій.
                API відкрите для розробників та дослідників.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
