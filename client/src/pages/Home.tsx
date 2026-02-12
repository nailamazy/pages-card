import { useState, useRef } from "react";
import {
  defaultStudent,
  defaultUniversity,
  cardThemes,
  generateRandomStudent,
  calculateMasaAktifByJenjang,
  type StudentData,
  type UniversityData,
  fakultasList,
  jenjangList
} from "@/lib/ktm-data";
import { KTMCardFront } from "@/components/ktm-card-front";
import { KTMCardBack } from "@/components/ktm-card-back";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useCreateCard } from "@/hooks/use-cards";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Shuffle,
  Save,
  RotateCw,
  Upload,
  GraduationCap,
  User,
  Palette,
  School
} from "lucide-react";

export default function Home() {
  const [student, setStudent] = useState<StudentData>(defaultStudent);
  const [university, setUniversity] = useState<UniversityData>(defaultUniversity);
  const [theme, setTheme] = useState(cardThemes[0]);
  const [activeTab, setActiveTab] = useState("student");
  const [isCustomCardNumber, setIsCustomCardNumber] = useState(false);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const createCardMutation = useCreateCard();

  const buildNoKartu = (nim: string) => `KTM-${nim}-${new Date().getFullYear()}`;

  const handleRandomize = () => {
    const randomStudent = generateRandomStudent();
    setStudent(randomStudent);
    setIsCustomCardNumber(false);
    toast({
      title: "Data Randomized",
      description: "Student data has been filled with random values.",
    });
  };

  const handleDownload = async (elementRef: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!elementRef.current) return;

    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Download Started",
        description: `Downloading ${fileName}...`,
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Could not generate image. Please try again.",
      });
    }
  };

  const handleSave = () => {
    createCardMutation.mutate(
      {
        studentData: student,
        universityData: university,
        themeId: theme.id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Card Saved",
            description: "Your card configuration has been saved successfully.",
          });
        },
      }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'student' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'student') {
          setStudent(prev => ({ ...prev, photoUrl: reader.result as string }));
        } else {
          setUniversity(prev => ({ ...prev, logoUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudentChange = (key: keyof StudentData, value: string) => {
    setStudent((prev) => {
      if (key === "nim") {
        const next = { ...prev, nim: value };

        // Keep noKartu and serialNumber synced with NIM unless user has edited it manually.
        if (!isCustomCardNumber) {
          next.noKartu = buildNoKartu(value);
          next.serialNumber = value;
        }
        return next;
      }

      if (key === "jenjang") {
        return {
          ...prev,
          jenjang: value,
          masaAktif: calculateMasaAktifByJenjang(value, prev.diterbitkan),
        };
      }

      if (key === "diterbitkan") {
        return {
          ...prev,
          diterbitkan: value,
          masaAktif: calculateMasaAktifByJenjang(prev.jenjang, value),
        };
      }

      if (key === "noKartu") {
        setIsCustomCardNumber(value !== buildNoKartu(prev.nim));
      }

      return { ...prev, [key]: value };
    });
  };

  const handleUniversityChange = (key: keyof UniversityData, value: string) => {
    setUniversity(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              KTM Generator
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRandomize}
              className="hidden sm:flex"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Randomize
            </Button>
            {import.meta.env.VITE_API_ENABLED !== "false" && (
              <Button
                onClick={handleSave}
                disabled={createCardMutation.isPending}
                className="shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
              >
                <Save className="mr-2 h-4 w-4" />
                {createCardMutation.isPending ? "Saving..." : "Save Card"}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Controls Section */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <Card className="border-0 shadow-lg shadow-black/5 bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="bg-slate-900/5 px-6 py-4 border-b">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Customize Card
                </h2>
              </div>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 rounded-none bg-transparent border-b p-0 h-12">
                    <TabsTrigger
                      value="student"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Student
                    </TabsTrigger>
                    <TabsTrigger
                      value="university"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
                    >
                      <School className="w-4 h-4 mr-2" />
                      University
                    </TabsTrigger>
                    <TabsTrigger
                      value="theme"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Signature
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                    <TabsContent value="student" className="mt-0 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label>Photo Upload</Label>
                          <div className="flex gap-4 items-center">
                            <div className="h-16 w-16 rounded-md bg-slate-100 border flex items-center justify-center overflow-hidden">
                              {student.photoUrl ? (
                                <img src={student.photoUrl} alt="Preview" className="h-full w-full object-cover" />
                              ) : (
                                <User className="h-8 w-8 text-slate-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e, 'student')}
                                className="cursor-pointer file:cursor-pointer"
                              />
                              <p className="text-xs text-muted-foreground mt-1">Recommended: Square ratio, max 2MB</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Nama Lengkap</Label>
                          <Input
                            value={student.nama}
                            onChange={(e) => handleStudentChange("nama", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>NIM</Label>
                          <Input
                            value={student.nim}
                            onChange={(e) => handleStudentChange("nim", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Serial Number</Label>
                          <Input
                            value={student.serialNumber}
                            onChange={(e) => handleStudentChange("serialNumber", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Place of Birth</Label>
                          <Input
                            value={student.tempatLahir}
                            onChange={(e) => handleStudentChange("tempatLahir", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Date of Birth</Label>
                          <Input
                            value={student.tanggalLahir}
                            onChange={(e) => handleStudentChange("tanggalLahir", e.target.value)}
                            placeholder="DD/MM/YYYY"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Degree (Jenjang)</Label>
                          <Select
                            value={student.jenjang}
                            onValueChange={(val) => handleStudentChange("jenjang", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              {jenjangList.map(j => (
                                <SelectItem key={j} value={j}>{j}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Faculty</Label>
                          <Select
                            value={student.fakultas}
                            onValueChange={(val) => handleStudentChange("fakultas", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select faculty" />
                            </SelectTrigger>
                            <SelectContent>
                              {fakultasList.map(f => (
                                <SelectItem key={f} value={f}>{f}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Study Program</Label>
                          <Input
                            value={student.programStudi}
                            onChange={(e) => handleStudentChange("programStudi", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Tahun Akademik</Label>
                          <Input
                            value={student.tahunAkademik}
                            onChange={(e) => handleStudentChange("tahunAkademik", e.target.value)}
                            placeholder="2024 - 2028"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Masa Aktif</Label>
                          <Input
                            value={student.masaAktif}
                            onChange={(e) => handleStudentChange("masaAktif", e.target.value)}
                            placeholder="14 - Maret - 2028"
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Academic Advisor</Label>
                          <Input
                            value={student.dosenWali}
                            onChange={(e) => handleStudentChange("dosenWali", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>No. Kartu</Label>
                          <Input
                            value={student.noKartu}
                            onChange={(e) => handleStudentChange("noKartu", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Tanggal Diterbitkan</Label>
                          <Input
                            value={student.diterbitkan}
                            onChange={(e) => handleStudentChange("diterbitkan", e.target.value)}
                            placeholder="DD/MM/YYYY"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="university" className="mt-0 space-y-4">
                      <div className="space-y-2">
                        <Label>Logo Upload</Label>
                        <div className="flex gap-4 items-center">
                          <div className="h-16 w-16 rounded-full bg-slate-100 border flex items-center justify-center overflow-hidden">
                            {university.logoUrl ? (
                              <img src={university.logoUrl} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                              <School className="h-8 w-8 text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, 'logo')}
                              className="cursor-pointer file:cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>University Name</Label>
                        <Input
                          value={university.name}
                          onChange={(e) => handleUniversityChange("name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                          value={university.address}
                          onChange={(e) => handleUniversityChange("address", e.target.value)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="theme" className="mt-0 space-y-6">
                      {/* Theme Selector Removed as we use template image now */}

                      <div className="space-y-3">
                        <Label>Signature Style</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[0, 1, 2, 3, 4].map((idx) => (
                            <button
                              key={idx}
                              onClick={() => setStudent(prev => ({ ...prev, signatureIndex: idx }))}
                              className={`
                                h-16 border rounded-lg flex items-center justify-center bg-white p-2
                                transition-all hover:border-primary/50
                                ${student.signatureIndex === idx ? "border-primary ring-1 ring-primary" : "border-slate-200"}
                              `}
                            >
                              <span className="font-handwriting text-lg text-slate-800 italic">Signature {idx + 1}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Mobile-only Randomize Button */}
            <Button
              variant="outline"
              onClick={handleRandomize}
              className="w-full sm:hidden"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Randomize Data
            </Button>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <div className="flex flex-col items-center gap-8">

              {/* Front Card */}
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <h3 className="font-semibold text-slate-500">Front Side</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                    onClick={() => handleDownload(frontRef, `KTM-${student.nim}-Front`)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>

                <div className="relative group perspective-1000">
                  <div className="relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <div ref={frontRef}>
                      <KTMCardFront
                        student={student}
                        university={university}
                        theme={theme}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Card */}
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full max-w-[540px]">
                  <h3 className="font-semibold text-slate-500">Back Side</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                    onClick={() => handleDownload(backRef, `KTM-${student.nim}-Back`)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>

                <div className="relative group perspective-1000">
                  <div className="relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <div ref={backRef}>
                      <KTMCardBack
                        student={student}
                        university={university}
                        theme={theme}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
