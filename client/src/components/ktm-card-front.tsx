import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import type { StudentData, UniversityData, CardTheme } from "@/lib/ktm-data";
import { signatureImages, cardTemplateBg } from "@/lib/ktm-data";

interface KTMCardFrontProps {
  student: StudentData;
  university: UniversityData;
  theme?: CardTheme;
}

export function KTMCardFront({ student, university, theme }: KTMCardFrontProps) {
  const bulanMap: Record<string, string> = {
    "01": "Januari", "02": "Februari", "03": "Maret", "04": "April",
    "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus",
    "09": "September", "10": "Oktober", "11": "November", "12": "Desember",
  };

  const formatTTL = () => {
    const parts = student.tanggalLahir.split("/");
    if (parts.length === 3) {
      const bulan = bulanMap[parts[1]] || parts[1];
      // Format: Temanggung, 10 November 2005
      return `${student.tempatLahir}, ${parseInt(parts[0])} ${bulan} ${parts[2]}`;
    }
    return `${student.tempatLahir}, ${student.tanggalLahir}`;
  };

  const qrValue = student.noKartu || `KTM-${student.nim}-${new Date().getFullYear()}`;
  const sigImg = signatureImages[student.signatureIndex % signatureImages.length];
  const barcodeValue = (student.noKartu || "000000000000").replace(/[^0-9]/g, "").substring(0, 12) || "000000000000";

  // White-card area coordinates tuned to the template image proportions.
  const frame = {
    left: 160,
    top: 82,
    width: 312,
    height: 205,
  };

  return (
    <div
      data-testid="ktm-card-front"
      style={{
        width: "600px",
        height: "380px",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: "'Arial', sans-serif",
        position: "relative",
        backgroundImage: `url(${cardTemplateBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        color: "#000",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${frame.left}px`,
          top: `${frame.top}px`,
          width: `${frame.width}px`,
          height: `${frame.height}px`,
          borderRadius: "14px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "6px 8px 6px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              flexShrink: 0,
              borderRadius: "5px",
              overflow: "hidden",
              backgroundColor: "#f1f5f9",
              border: "1px solid #dbe1eb",
            }}
          >
            {university.logoUrl ? (
              <img
                src={university.logoUrl}
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </div>

          <div style={{ flex: 1, minWidth: 0, textAlign: "center", lineHeight: 1.2 }}>
            <div style={{ fontSize: "8.6px", fontWeight: 700, letterSpacing: "0.4px" }}>REPUBLIK INDONESIA</div>
            <div
              style={{
                fontSize: "7px",
                fontWeight: 800,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {university.name.replace("Universitas Negeri Yogyakarta", "YOGYAKARTA STATE UNIVERSITY")}
            </div>
            <div
              style={{
                fontSize: "5.3px",
                color: "#334155",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {university.address}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: "5px",
          borderTop: "1px solid #0f172a",
          paddingTop: "3px",
          textAlign: "center",
          fontSize: "6.6px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.4px",
        }}>
          KARTU TANDA MAHASISWA
        </div>

        <div style={{ display: "flex", width: "100%", gap: "8px", marginTop: "6px" }}>
          <div style={{ width: "92px", flexShrink: 0 }}>
            <div style={{
              width: "92px",
              height: "104px",
              backgroundColor: "#ddd",
              overflow: "hidden",
              borderRadius: "3px",
            }}>
              {student.photoUrl ? (
                <img src={student.photoUrl} alt="Student" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: "12px" }}>
                  No Photo
                </div>
              )}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Nama Lengkap", student.nama],
                  ["TTL", formatTTL()],
                  ["NIM", student.nim],
                  ["Fakultas", student.fakultas],
                  ["Program Studi", student.programStudi],
                  ["Jenjang", student.jenjang],
                  ["Tahun Akademik", student.tahunAkademik],
                  ["Masa Aktif Kartu", student.masaAktif],
                  ["Status", "Mahasiswa Aktif"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ fontSize: "6.1px", fontWeight: 600, padding: "0.4px 0", width: "73px", verticalAlign: "top", color: "#111827" }}>{label}</td>
                    <td style={{ fontSize: "6.1px", fontWeight: 600, padding: "0.4px 4px", width: "6px", verticalAlign: "top" }}>:</td>
                    <td
                      style={{
                        fontSize: "6.1px",
                        fontWeight: 700,
                        padding: "0.4px 0",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "128px",
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Barcode
              value={barcodeValue}
              format="CODE128"
              width={1.04}
              height={21}
              displayValue={false}
              margin={0}
              background="transparent"
            />
            <div style={{ fontSize: "5.6px", fontWeight: 600, marginTop: "1px" }}>
              Serial: {student.serialNumber || student.nim}
            </div>
          </div>

          <div style={{ marginBottom: "2px", marginLeft: "4px" }}>
            <QRCodeSVG
              value={qrValue}
              size={38}
              level="M"
            />
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "94px",
            marginLeft: "4px",
          }}>
            <img
              src={sigImg}
              alt="Signature"
              style={{ width: "72px", height: "auto", marginBottom: "-2px" }}
            />
            <div
              style={{
                fontSize: "5.2px",
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {student.dosenWali}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
