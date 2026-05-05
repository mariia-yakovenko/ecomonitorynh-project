import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'довідник забруднювачів' };

const pollutants = [
  {
    symbol: 'PM2.5',
    name: 'дрібні тверді частинки',
    limit: '25 мкг/м³',
    sources: 'транспорт, промисловість, спалювання',
    health: 'проникають глибоко в легені, підвищують ризик серцево-судинних захворювань',
  },
  {
    symbol: 'PM10',
    name: 'зависні тверді частинки',
    limit: '50 мкг/м³',
    sources: 'дорожній пил, будівництво, сільське господарство',
    health: 'подразнення дихальних шляхів, загострення астми',
  },
  {
    symbol: 'NO₂',
    name: 'діоксид азоту',
    limit: '40 мкг/м³',
    sources: 'автомобільний та промисловий транспорт',
    health: 'подразнення легенів, зниження імунітету до інфекцій',
  },
  {
    symbol: 'SO₂',
    name: 'діоксид сірки',
    limit: '20 мкг/м³',
    sources: 'ТЕС, металургія, спалювання вугілля',
    health: 'кислотні дощі, бронхоспазм, загострення астми',
  },
  {
    symbol: 'CO',
    name: 'монооксид вуглецю',
    limit: '10 мг/м³',
    sources: 'вихлопні гази, неповне згорання палива',
    health: 'знижує здатність крові переносити кисень',
  },
  {
    symbol: 'O₃',
    name: 'озон (приземний)',
    limit: '100 мкг/м³',
    sources: 'утворюється під впливом сонця з NO₂ та летких органічних сполук',
    health: 'подразнення очей та дихальних шляхів, зниження функції легенів',
  },
];

export default function GuidePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>довідник <span style={{ color: 'var(--color-primary)' }}>забруднювачів</span></h1>
          <p className="hero-lead">
            основні атмосферні забруднювачі, їх джерела та вплив на здоров&#x27;я людини
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 className="section-title">що означають показники AQI?</h2>
          <p className="section-sub">
            індекс якості повітря (AQI) розраховується на основі концентрацій шести основних забруднювачів
          </p>

          <div className="row g-4">
            {pollutants.map((p) => (
              <div key={p.symbol} className="col-12 col-md-6 col-lg-4">
                <div className="pollutant-card">
                  <span className="p-symbol">{p.symbol}</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>{p.name}</h3>
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div>
                      <dt className="info-box-label">норма (річна)</dt>
                      <dd className="info-box-value" style={{ margin: 0, fontWeight: 600 }}>{p.limit}</dd>
                    </div>
                    <div>
                      <dt className="info-box-label">основні джерела</dt>
                      <dd className="info-box-value" style={{ margin: 0, color: 'var(--color-muted)' }}>{p.sources}</dd>
                    </div>
                    <div>
                      <dt className="info-box-label">вплив на здоров&#x27;я</dt>
                      <dd className="info-box-value" style={{ margin: 0, color: 'var(--color-muted)' }}>{p.health}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>

          <div className="info-highlight">
            <h3>джерела нормативів</h3>
            <p>
              граничні значення наведені відповідно до рекомендацій ВООЗ (2021) та директиви ЄС 2008/50/EC.
              норми для України встановлені ДСП 201-97 та ДСТУ.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
