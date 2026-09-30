import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calculator, Check, ClipboardList, ExternalLink, FileText, MapPin, MoonStar, Navigation, Package, RotateCcw, TicketPercent, User, X, Zap } from 'lucide-react';
import { FARE, SERVICES, VOUCHERS, buildWaMessage, formatIDR, validateVoucher, waLink, type ServiceId } from '../data';
import { LIMITS, isValidAddress, isValidName, isValidNote, normalizeVoucherCode, sanitizeText } from '../lib/validation';
import { Reveal } from './ui/Reveal';
import { WhatsappIcon } from './icons';
import { MapPicker, mapsLink, reverseGeocode, type MapPoint } from './MapPicker';

const STEPS = ['Layanan', 'Jarak & Opsi', 'Hasil'];

export function OngkirCalculator() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceId>('kurir');
  const [km, setKm] = useState<number>(5);
  const [express, setExpress] = useState(false);
  const [malam, setMalam] = useState(false);
  const [besar, setBesar] = useState(false);
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  const result = useMemo(() => {
    const cfg = FARE[service];
    const base = cfg.base;
    const jarak = cfg.perKm * km;
    const ex = express ? 20000 : 0;
    const ml = malam ? 10000 : 0;
    const bs = besar ? 15000 : 0;
    const total = base + jarak + ex + ml + bs;
    return { base, jarak, ex, ml, bs, total, low: total, high: Math.round(total * 1.1) };
  }, [service, km, express, malam, besar]);

  const voucherRes = useMemo(
    () => validateVoucher(appliedCode, result.total),
    [appliedCode, result.total],
  );
  const finalTotal = result.total - voucherRes.discount;

  function toggle(set: (v: boolean) => void, v: boolean) {
    return () => set(!v);
  }

  function goToOrder() {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <section className="section" id="ongkir" style={{ paddingTop: 10 }}>
      <div className="container">
        <Reveal className="section-head">
          <h2>Cek estimasi harga, transparan</h2>
          <p>Harga final dikunci admin via WA. Estimasi ini 90% akurat.</p>
        </Reveal>
        <div className="split">
          <Reveal>
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calculator size={22} /> Simulasi ongkir</h3>
            <p className="sub">Ikuti 3 langkah cepat — kurang dari 1 menit.</p>

            <div className="stepper" role="tablist" aria-label="Langkah simulasi">
              {STEPS.map((label, i) => (
                <span key={label} style={{ display: 'contents' }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={step === i}
                    className={`stepper-item ${step === i ? 'active' : ''} ${step > i ? 'done' : ''}`}
                    onClick={() => setStep(i)}
                  >
                    <span className="stepper-dot">{step > i ? <Check size={15} strokeWidth={3} /> : i + 1}</span>
                    <span className="stepper-label">{label}</span>
                  </button>
                  {i < STEPS.length - 1 && <span className={`stepper-line ${step > i ? 'done' : ''}`} aria-hidden />}
                </span>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="field">
                    <label>Pilih layanan dulu</label>
                    <div className="svc-opt-grid">
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        const selected = service === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            className={`svc-opt ${selected ? 'selected' : ''}`}
                            onClick={() => { setService(s.id); setStep(1); }}
                            aria-pressed={selected}
                          >
                            <span className="svc-icon" style={{ background: s.bubble, color: s.iconColor, width: 44, height: 44 }}>
                              <Icon size={22} />
                            </span>
                            <span>
                              <b>{s.title}</b>
                              <small>{s.priceNote}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="field" style={{ textAlign: 'center' }}>
                    <label>Berapa jauh jaraknya?</label>
                    <div className="km-display">{km} <small>km</small></div>
                    <input type="range" min={1} max={25} value={km} onChange={(e) => setKm(Number(e.target.value))} aria-label="Jarak estimasi dalam kilometer" />
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                      {[3, 5, 10, 15].map((v) => (
                        <button key={v} type="button" className={`chip-check ${km === v ? 'on' : ''}`} onClick={() => setKm(v)}>{v} km</button>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Opsi tambahan</label>
                    <div className="checks">
                <button type="button" className={`chip-check ${express ? 'on' : ''}`} onClick={toggle(setExpress, express)}><Zap size={15} aria-hidden /> Express +Rp20rb</button>
                <button type="button" className={`chip-check ${malam ? 'on' : ''}`} onClick={toggle(setMalam, malam)}><MoonStar size={15} aria-hidden /> Malam/hujan +Rp10rb</button>
                <button type="button" className={`chip-check ${besar ? 'on' : ''}`} onClick={toggle(setBesar, besar)}><Package size={15} aria-hidden /> Besar/berat +Rp15rb</button>
                    </div>
                  </div>
                  <div className="stepper-nav">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(0)}><ArrowLeft size={15} /> Kembali</button>
                    <button type="button" className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setStep(2)}>Lihat Hasil <ArrowRight size={15} /></button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="calc-result">
                    <small>Estimasi biaya {FARE[service].label} • {km} km</small>
                    <div className="price">{formatIDR(result.low)} – {formatIDR(result.high)}</div>
                    <ul>
                      <li><span>Base fare</span><span>{formatIDR(result.base)}</span></li>
                      <li><span>Jarak ({km} km)</span><span>{formatIDR(result.jarak)}</span></li>
                      {result.ex > 0 && <li><span>Express</span><span>{formatIDR(result.ex)}</span></li>}
                      {result.ml > 0 && <li><span>Malam/hujan</span><span>{formatIDR(result.ml)}</span></li>}
                      {result.bs > 0 && <li><span>Barang besar</span><span>{formatIDR(result.bs)}</span></li>}
                      {voucherRes.ok && <li><span>Voucher {voucherRes.voucher?.code}</span><span>−{formatIDR(voucherRes.discount)}</span></li>}
                    </ul>
                    {voucherRes.ok && (
                      <div className="calc-total">Total bayar: {formatIDR(finalTotal)}</div>
                    )}
                  </div>
                  <div className="voucher-box">
                    <label><TicketPercent size={15} aria-hidden /> Punya kode voucher?</label>
                    {voucherRes.ok ? (
                      <div className="voucher-applied">
                        <span><Check size={14} strokeWidth={3} aria-hidden /> {voucherRes.voucher?.code}</span>
                        <button type="button" onClick={() => { setAppliedCode(''); setVoucherInput(''); }} aria-label="Hapus voucher">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="voucher-row">
                          <input
                            placeholder="cth: URUSIN10"
                            value={voucherInput}
                            maxLength={LIMITS.voucher}
                            onChange={(e) => setVoucherInput(normalizeVoucherCode(e.target.value))}
                            onKeyDown={(e) => { if (e.key === 'Enter') setAppliedCode(voucherInput); }}
                            aria-label="Kode voucher"
                          />
                          <button type="button" className="btn btn-primary btn-sm" onClick={() => setAppliedCode(voucherInput)}>
                            Pakai
                          </button>
                        </div>
                        {voucherRes.message && <p className="voucher-msg">{voucherRes.message}</p>}
                        <div className="voucher-list">
                          {VOUCHERS.map((v) => (
                            <button
                              key={v.code}
                              type="button"
                              className="chip-check"
                              onClick={() => { setVoucherInput(v.code); setAppliedCode(v.code); }}
                              title={v.desc}
                            >
                              <TicketPercent size={13} aria-hidden /> {v.code}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="stepper-nav">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(0)}><RotateCcw size={15} /> Ulangi</button>
                    <button type="button" className="btn btn-wa btn-sm" style={{ flex: 1 }} onClick={goToOrder}><WhatsappIcon size={15} /> Order Sekarang</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </Reveal>
          <Reveal delay={0.1}>
          <div className="card" id="order">
            <OrderForm
              servicePreset={service}
              kmPreset={km}
              voucherCode={voucherRes.ok ? voucherRes.voucher?.code ?? null : null}
              voucherDiscount={voucherRes.discount}
              finalTotal={voucherRes.ok ? finalTotal : null}
            />
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function OrderForm({
  servicePreset = 'jastip' as ServiceId,
  kmPreset = 5,
  voucherCode = null,
  voucherDiscount = 0,
  finalTotal = null,
}: {
  servicePreset?: ServiceId;
  kmPreset?: number;
  voucherCode?: string | null;
  voucherDiscount?: number;
  finalTotal?: number | null;
}) {
  const [nama, setNama] = useState('');
  const [layanan, setLayanan] = useState<ServiceId>(servicePreset);
  const [jemput, setJemput] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [catatan, setCatatan] = useState('');
  const [point, setPoint] = useState<MapPoint | null>(null);
  const [locating, setLocating] = useState(false);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    setLayanan(servicePreset);
  }, [servicePreset]);
  const svcLabel = SERVICES.find((s) => s.id === layanan)?.title ?? layanan;

  async function pickPoint(p: MapPoint) {
    setPoint(p);
    setResolving(true);
    const addr = await reverseGeocode(p);
    setResolving(false);
    setJemput(addr ?? `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`);
  }

  function useMyLocation() {
    if (!('geolocation' in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        void pickPoint({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const cleanNama = sanitizeText(nama, LIMITS.nama);
  const cleanJemput = sanitizeText(jemput, LIMITS.lokasi);
  const cleanTujuan = sanitizeText(tujuan, LIMITS.tujuan);
  const cleanCatatan = sanitizeText(catatan, LIMITS.catatan);
  const detailParts = [cleanTujuan, cleanCatatan, `(Estimasi jarak: ${kmPreset} km)`];
  if (voucherCode && voucherDiscount > 0 && finalTotal !== null) {
    detailParts.push(`(Voucher ${voucherCode}: hemat ${formatIDR(voucherDiscount)}, estimasi bayar ${formatIDR(finalTotal)})`);
  }
  const detail = detailParts.filter(Boolean).join(' ');
  const lokasi = [cleanJemput, point ? mapsLink(point) : '']
    .filter(Boolean)
    .join('\n');
  const message = buildWaMessage({
    nama: cleanNama,
    lokasi,
    layanan: svcLabel,
    detail,
  });
  const waHref = waLink(message);
  const valid =
    isValidName(nama) &&
    isValidAddress(jemput) &&
    isValidAddress(tujuan, LIMITS.tujuan) &&
    isValidNote(catatan);

  return (
    <div>
      <Reveal y={14}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ClipboardList size={22} /> Form order cepat</h3>
        <p className="sub">
          Isi 30 detik, otomatis terkirim ke WhatsApp admin. Tanpa login.
        </p>
      </Reveal>
      <Reveal y={14} delay={0.06}>
        <div className="field">
          <label>Nama kamu</label>
          <div className="field-icon">
            <User size={18} aria-hidden />
            <input placeholder="cth: Nadia" value={nama} maxLength={LIMITS.nama} onChange={(e) => setNama(e.target.value)} />
          </div>
        </div>
      </Reveal>
      <Reveal y={14} delay={0.1}>
        <div className="field">
          <label>Layanan yang dibutuhkan</label>
          <div className="svc-opt-grid">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const selected = layanan === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`svc-opt ${selected ? 'selected' : ''}`}
                  onClick={() => setLayanan(s.id)}
                  aria-pressed={selected}
                >
                  <span className="svc-icon" style={{ background: s.bubble, color: s.iconColor, width: 42, height: 42 }}>
                    <Icon size={20} />
                  </span>
                  <span>
                    <b>{s.title}</b>
                    <small>{s.priceNote}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
      <Reveal y={14} delay={0.14}>
        <div className="field">
          <label>Lokasi jemput</label>
          <div className="field-icon">
            <MapPin size={18} aria-hidden />
            <input
              placeholder="cth: Kos Elang Jl. Mawar No.10"
              value={jemput}
              maxLength={LIMITS.lokasi}
              onChange={(e) => { setJemput(e.target.value); }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="chip-check"
                  onClick={useMyLocation}
                  disabled={locating}
                >
                  <Navigation size={15} aria-hidden /> {locating ? 'Mencari…' : 'Gunakan lokasi saya'}
                </button>
                {point && (
                  <a
                    className="chip-check"
                    href={mapsLink(point)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <ExternalLink size={15} aria-hidden /> Buka di Maps
                  </a>
                )}
          </div>
          <div style={{ marginTop: 10 }}>
            <MapPicker point={point} onPick={(p) => { void pickPoint(p); }} height={220} />
            <p style={{ fontSize: 12.5, margin: '8px 0 0', opacity: 0.75 }}>
              {resolving
                ? 'Mencari alamat titik…'
                : point
                  ? 'Tap peta / geser pin untuk mengubah titik.'
                  : 'Tap peta untuk menandai titik jemput — alamat terisi otomatis.'}
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal y={14} delay={0.18}>
        <div className="field">
          <label>Tujuan / yang dititip</label>
          <div className="field-icon">
            <Package size={18} aria-hidden />
            <input
              placeholder="cth: Seblak Teh Nita 2 porsi level 3"
              value={tujuan}
              maxLength={LIMITS.tujuan}
              onChange={(e) => setTujuan(e.target.value)}
            />
          </div>
        </div>
      </Reveal>
      <Reveal y={14} delay={0.22}>
        <div className="field">
          <label>Catatan (opsional)</label>
          <div className="field-icon field-icon--area">
            <FileText size={18} aria-hidden />
            <textarea rows={2} placeholder="cth: jangan pedas banget, talangi dulu ya" value={catatan} maxLength={LIMITS.catatan} onChange={(e) => setCatatan(e.target.value)} />
          </div>
        </div>
      </Reveal>
      <Reveal y={14} delay={0.26}>
        <div className="order-summary">
          <div><span>Nama</span><b>{nama || '-'}</b></div>
          <div><span>Lokasi</span><b>{jemput || '-'}</b></div>
          <div><span>Layanan</span><b>{svcLabel}</b></div>
          <div><span>Detail</span><b>{tujuan || '-'}{catatan.trim() ? ` • ${catatan.trim()}` : ''}</b></div>
          {voucherCode && voucherDiscount > 0 && finalTotal !== null && (
            <div><span>Voucher {voucherCode}</span><b>−{formatIDR(voucherDiscount)} • Bayar {formatIDR(finalTotal)}</b></div>
          )}
        </div>
        <a className="btn btn-wa" href={waHref} target="_blank" rel="noreferrer" style={{ width: '100%', opacity: valid ? 1 : 0.6 }}>
          <WhatsappIcon size={17} /> {valid ? 'Kirim via WhatsApp' : 'Lengkapi dulu untuk kirim'}
        </a>
        <div className="wa-preview">
          {message}
        </div>
      </Reveal>
    </div>
  );
}
