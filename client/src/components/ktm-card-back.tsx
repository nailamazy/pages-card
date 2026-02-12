import Barcode from "react-barcode";
import type { StudentData, UniversityData, CardTheme } from "@/lib/ktm-data";
import { cardThemes, signatureImages } from "@/lib/ktm-data";

interface KTMCardBackProps {
  student: StudentData;
  university: UniversityData;
  theme?: CardTheme;
}

export function KTMCardBack({ student, university, theme }: KTMCardBackProps) {
  const t = theme || cardThemes[0];
  const sigImg = signatureImages[student.signatureIndex % signatureImages.length];

  return (
    <div
      data-testid="ktm-card-back"
      style={{
        width: "540px",
        height: "380px",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "'Open Sans', sans-serif",
        position: "relative",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: t.gradient,
          padding: "16px 20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
          SYARAT DAN KETENTUAN
        </div>
      </div>

      <div style={{ padding: "16px 20px", flex: 1, fontSize: "8.5px", color: "#444", lineHeight: "1.6" }}>
        <ol style={{ margin: 0, paddingLeft: "16px" }}>
          <li style={{ marginBottom: "4px" }}>Kartu ini merupakan identitas resmi mahasiswa {university.name}.</li>
          <li style={{ marginBottom: "4px" }}>Kartu ini tidak dapat dipindahtangankan kepada pihak lain.</li>
          <li style={{ marginBottom: "4px" }}>Jika kartu ini ditemukan, harap mengembalikan ke alamat kampus.</li>
          <li style={{ marginBottom: "4px" }}>Penyalahgunaan kartu ini akan dikenakan sanksi sesuai peraturan yang berlaku.</li>
          <li style={{ marginBottom: "4px" }}>Kartu ini berlaku selama mahasiswa berstatus aktif.</li>
          <li style={{ marginBottom: "4px" }}>Jika kartu hilang atau rusak, segera lapor ke bagian akademik.</li>
        </ol>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "8px 20px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ fontSize: "6.5px", color: "#888", lineHeight: "1.5" }}>
          <div>No. Kartu: {student.noKartu}</div>
          <div>Diterbitkan: {student.diterbitkan}</div>
          <div style={{ marginTop: "4px" }}>
            <Barcode
              value={student.noKartu || "KTM-0000"}
              width={1}
              height={22}
              fontSize={0}
              margin={0}
              displayValue={false}
              background="transparent"
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "165px" }}>
          <div style={{ fontSize: "8px", color: "#666", marginBottom: "2px" }}>Dosen Wali,</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "52px", width: "100%" }}>
            <img
              src={sigImg}
              alt="Tanda Tangan"
              style={{
                height: "50px",
                width: "auto",
                maxWidth: "150px",
                objectFit: "contain",
              }}
            />
          </div>
          <div style={{ width: "150px", borderTop: "1px solid #333", paddingTop: "3px", textAlign: "center" }}>
            <span style={{ fontSize: "7.5px", color: "#333", fontWeight: 600 }}>
              {student.dosenWali}
            </span>
          </div>
        </div>

        <div>
          {university.logoUrl ? (
            <img
              src={university.logoUrl}
              alt="Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
          ) : (
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: t.photoBg,
                border: `1px solid ${t.photoBorder}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7px",
                color: t.accentColor,
                opacity: 0.6,
                fontWeight: 600,
              }}
            >
              LOGO
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: t.bottomBar,
        }}
      />
    </div>
  );
}
