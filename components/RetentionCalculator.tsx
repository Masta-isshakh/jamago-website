"use client";

import { useMemo, useState } from "react";

type RetentionCalculatorProps = {
  locale: "en" | "ar";
};

export function RetentionCalculator({ locale }: RetentionCalculatorProps) {
  const [cameras, setCameras] = useState(16);
  const [bitrate, setBitrate] = useState(4);
  const [days, setDays] = useState(30);

  const tb = useMemo(() => {
    const megabits = cameras * bitrate * 60 * 60 * 24 * days;
    const terabytes = megabits / 8 / 1024 / 1024;
    return Number(terabytes.toFixed(2));
  }, [cameras, bitrate, days]);

  const copy =
    locale === "ar"
      ? {
          title: "حاسبة تخزين تسجيلات CCTV",
          subtitle: "تقدير مبدئي للسعة المطلوبة (لا يغني عن التصميم الفني)",
          cameras: "عدد الكاميرات",
          bitrate: "متوسط البت ريت لكل كاميرا (Mbps)",
          days: "عدد أيام الاحتفاظ",
          result: "السعة المطلوبة تقريبيا",
          note: "يشمل عوامل الضغط والنسخ الاحتياطي ضمن دراسة الموقع.",
        }
      : {
          title: "CCTV Storage Calculator",
          subtitle: "Quick planning estimate for required recording storage",
          cameras: "Number of cameras",
          bitrate: "Average bitrate per camera (Mbps)",
          days: "Retention days",
          result: "Estimated storage",
          note: "Final design should include codec, scene complexity, and redundancy.",
          download: "Download report",
        };

  const downloadReport = () => {
    const lines = [
      locale === "ar" ? "تقرير تقدير تخزين CCTV" : "CCTV Storage Estimate Report",
      `${locale === "ar" ? "عدد الكاميرات" : "Cameras"}: ${cameras}`,
      `${locale === "ar" ? "البت ريت" : "Bitrate"}: ${bitrate} Mbps`,
      `${locale === "ar" ? "الاحتفاظ" : "Retention"}: ${days} ${locale === "ar" ? "يوم" : "days"}`,
      `${locale === "ar" ? "السعة التقريبية" : "Estimated storage"}: ${tb} TB`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = locale === "ar" ? "cctv-storage-report-ar.txt" : "cctv-storage-report-en.txt";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="card calculator" aria-label={copy.title}>
      <h3>{copy.title}</h3>
      <p>{copy.subtitle}</p>
      <label>
        {copy.cameras}
        <input
          type="range"
          min={1}
          max={200}
          value={cameras}
          onChange={(event) => setCameras(Number(event.target.value))}
        />
        <strong>{cameras}</strong>
      </label>
      <label>
        {copy.bitrate}
        <input
          type="range"
          min={1}
          max={15}
          value={bitrate}
          onChange={(event) => setBitrate(Number(event.target.value))}
        />
        <strong>{bitrate} Mbps</strong>
      </label>
      <label>
        {copy.days}
        <input
          type="range"
          min={7}
          max={180}
          step={1}
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
        />
        <strong>{days}</strong>
      </label>
      <div className="calc-result">
        <span>{copy.result}</span>
        <h4>{tb} TB</h4>
      </div>
      <small>{copy.note}</small>
      <div className="wizard-actions">
        <button type="button" onClick={downloadReport}>
          {locale === "ar" ? "تحميل التقرير" : copy.download}
        </button>
      </div>
    </section>
  );
}
