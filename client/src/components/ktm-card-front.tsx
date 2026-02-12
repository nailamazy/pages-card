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
  // Theme is largely ignored for background now, but we might use it for text colors if needed.
  // For realism, we stick to black/grey as per reference photo.

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
      {/* Header Section */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "0",
          right: "0",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          {university.logoUrl && (
            <img
              src={university.logoUrl}
              alt="Logo"
              style={{
                height: "55px",
                width: "55px",
                objectFit: "contain",
                position: "absolute",
                left: "30px",
                top: "5px"
              }}
            />
          )}

          <div style={{ textAlign: "center", width: "100%", paddingLeft: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold", letterSpacing: "1px" }}>REPUBLIK INDONESIA</div>
            <div style={{ fontSize: "22px", fontWeight: "800", textTransform: "uppercase", margin: "2px 0" }}>
              {university.name.replace("Universitas Negeri Yogyakarta", "YOGYAKARTA STATE UNIVERSITY")}
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>{university.address}</div>
          </div>
        </div>

        <div style={{
          width: "90%",
          height: "2px",
          backgroundColor: "#000",
          marginTop: "6px",
          marginBottom: "4px"
        }} />
      </div>

      {/* Main Content */}
      <div style={{
        position: "absolute",
        top: "105px",
        left: "30px",
        right: "30px",
        bottom: "20px",
      }}>
        {/* Title */}
        <div style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "800",
          textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          KARTU TANDA MAHASISWA
        </div>

        <div style={{ display: "flex", width: "100%", gap: "20px" }}>
          {/* Photos */}
          <div style={{ width: "140px", flexShrink: 0 }}>
            <div style={{
              width: "140px",
              height: "175px",
              backgroundColor: "#ddd",
              overflow: "hidden",
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

          {/* Data Fields */}
          <div style={{ flex: 1, paddingTop: "0px" }}>
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
                    <td style={{ fontSize: "11px", fontWeight: "500", padding: "1px 0", width: "110px", verticalAlign: "top" }}>{label}</td>
                    <td style={{ fontSize: "11px", fontWeight: "500", padding: "1px 5px", width: "10px", verticalAlign: "top" }}>:</td>
                    <td style={{ fontSize: "11px", fontWeight: "600", padding: "1px 0", verticalAlign: "top" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Barcode/Serial, QR, Signature */}
        <div style={{
          marginTop: "15px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          // borderTop: "1px solid red" // Debug
        }}>

          {/* Barcode & Serial */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Barcode
              value={student.noKartu.replace(/[^0-9]/g, "").substring(0, 12) || "000000000000"}
              format="CODE128"
              width={1.5}
              height={30}
              displayValue={false}
              margin={0}
              background="transparent"
            />
            <div style={{ fontSize: "11px", fontWeight: "500", marginTop: "2px" }}>
              Serial: {student.serialNumber}
            </div>
          </div>

          {/* QR Code */}
          <div style={{ marginBottom: "5px" }}>
            <QRCodeSVG
              value={qrValue}
              size={50}
              level="M"
            />
          </div>

          {/* Signature */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "180px"
          }}>
            <img
              src={sigImg}
              alt="Signature"
              style={{ width: "100px", height: "auto", marginBottom: "-5px" }}
            />
            <div style={{ fontSize: "11px", fontWeight: "600", textAlign: "center", whiteSpace: "nowrap" }}>
              {student.dosenWali}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
