import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import type { StudentData, UniversityData, CardTheme } from "@/lib/ktm-data";
import { signatureImages, cardTemplateBg } from "@/lib/ktm-data";

interface KTMCardFrontProps {
  student: StudentData;
  university: UniversityData;
  theme?: CardTheme;
}

export function KTMCardFront({ student, university }: KTMCardFrontProps) {
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

  // Clean NIM for barcode (numbers only)
  const barcodeValue = student.nim.replace(/[^0-9]/g, "") || "000000000000";

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
          top: "22px",
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", width: "100%", paddingLeft: "35px", paddingRight: "20px" }}>
          {/* Logo - Top Left of header area */}
          {university.logoUrl && (
            <img
              src={university.logoUrl}
              alt="Logo"
              style={{
                height: "58px",
                width: "58px",
                objectFit: "contain",
                marginTop: "2px"
              }}
            />
          )}

          <div style={{ flex: 1, textAlign: "center", marginRight: "30px", marginTop: "2px" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold", letterSpacing: "0.5px" }}>REPUBLIK INDONESIA</div>
            <div style={{ fontSize: "21px", fontWeight: "800", textTransform: "uppercase", margin: "1px 0", transform: "scaleY(1.1)" }}>
              {university.name.replace("Universitas Negeri Yogyakarta", "YOGYAKARTA STATE UNIVERSITY")}
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>{university.address}</div>
          </div>
        </div>

        {/* Horizontal Line */}
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
        top: "110px",
        left: "35px",
        right: "30px",
        bottom: "15px",
      }}>
        {/* Title */}
        <div style={{
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "800",
          textTransform: "uppercase",
          marginBottom: "12px",
          letterSpacing: "0.5px"
        }}>
          KARTU TANDA MAHASISWA
        </div>

        <div style={{ display: "flex", width: "100%", gap: "20px" }}>
          {/* Photo Frame - Left */}
          <div style={{ width: "135px", flexShrink: 0 }}>
            <div style={{
              width: "135px",
              height: "170px",
              backgroundColor: "#e2e2e2",
              overflow: "hidden",
              position: "relative"
            }}>
              {student.photoUrl ? (
                <img src={student.photoUrl} alt="Student" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: "14px", flexDirection: "column" }}>
                  <span>No Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Data Fields - Right */}
          <div style={{ flex: 1, paddingTop: "2px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Nama Lengkap", student.nama],
                  ["TTL", formatTTL()],
                  ["NIM", student.nim],
                  ["Fakultas", student.fakultas],
                  ["Program Studi", student.programStudi],
                  ["Jenjang", student.jenjang],
                  ["Tahun Akademik", student.tahunAkademik || "2024 - 2028"],
                  ["Masa Aktif Kartu", student.masaAktif],
                  ["Status", "Mahasiswa Aktif"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    {/* Labels aligned left */}
                    <td style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      padding: "1.5px 0",
                      width: "115px",
                      verticalAlign: "top",
                      color: "#000"
                    }}>
                      {label === "Nama Lengkap" ? "Nama Lengkap" : label}
                    </td>

                    {/* Colon aligned */}
                    <td style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      padding: "1.5px 5px",
                      width: "10px",
                      verticalAlign: "top",
                      color: "#000"
                    }}>:</td>

                    {/* Values */}
                    <td style={{
                      fontSize: "11px",
                      fontWeight: (label === "Nama Lengkap" || label === "Status" || label === "NIM") ? "bold" : "bold",
                      padding: "1.5px 0",
                      verticalAlign: "top",
                      color: "#000"
                    }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Section: Barcode, QR, Signature */}
        <div style={{
          marginTop: "auto",
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingBottom: "5px"
        }}>

          {/* Barcode & Serial - Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginLeft: "0px" }}>
            <Barcode
              value={barcodeValue}
              format="CODE128"
              width={1.4}
              height={28}
              displayValue={false}
              margin={0}
              background="transparent"
            />
            <div style={{ fontSize: "10px", fontWeight: "bold", marginTop: "2px" }}>
              Serial: {student.serialNumber || barcodeValue}
            </div>
          </div>

          {/* QR Code - Center */}
          <div style={{ marginBottom: "5px", marginLeft: "10px" }}>
            <QRCodeSVG
              value={qrValue}
              size={55}
              level="M"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          {/* Signature - Right */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "160px",
            marginRight: "-10px"
          }}>
            {/* Signature Image */}
            <img
              src={sigImg}
              alt="Signature"
              style={{
                width: "90px",
                height: "auto",
                marginBottom: "-5px",
              }}
            />
            {/* Official Name */}
            <div style={{
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              marginTop: "2px"
            }}>
              {student.dosenWali}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
