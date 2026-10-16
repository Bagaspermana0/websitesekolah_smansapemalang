"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiLock,
  FiUser,
  FiFileText,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiExternalLink,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiHome,
  FiImage,
  FiSave,
  FiX,
  FiKey,
  FiShield,
  FiEye,
} from "react-icons/fi";
import {
  getBeritaList,
  saveBeritaItem,
  deleteBeritaItem,
  getSekolahData,
  saveSekolahData,
  loginAdmin,
  logoutAdmin,
  isAuthenticated,
  changeAdminPassword,
  compressImageToBase64,
} from "@/utils/storage";
import ImageSlot from "@/components/ImageSlot";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Login Form State
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab: "berita" | "sekolah" | "akun"
  const [activeTab, setActiveTab] = useState("berita");

  // Berita State
  const [beritaList, setBeritaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isCompressingImg, setIsCompressingImg] = useState(false);
  const [beritaForm, setBeritaForm] = useState({
    judul: "",
    kategori: "Kegiatan",
    tanggal: "",
    tanggalISO: "",
    ringkasan: "",
    isi: "",
    gambar: "",
  });

  // Sekolah State
  const [sekolahForm, setSekolahForm] = useState({
    nama: "",
    slogan: "",
    kepalaSekolah: "",
    akreditasi: "",
    nilaiAkreditasi: "",
    tahunAkreditasi: "",
    kurikulum: "",
    alamat: "",
    telepon: "",
    email: "",
    website: "",
  });
  const [sekolahSaveSuccess, setSekolahSaveSuccess] = useState(false);

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Notification Toast
  const [toast, setToast] = useState({ show: false, text: "", type: "success" });

  const showToast = (text, type = "success") => {
    setToast({ show: true, text, type });
    setTimeout(() => {
      setToast({ show: false, text: "", type: "success" });
    }, 3500);
  };

  // 1. Initial Load & Auth Check
  useEffect(() => {
    setMounted(true);
    const authStatus = isAuthenticated();
    setLoggedIn(authStatus);

    if (authStatus) {
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    const bList = getBeritaList();
    setBeritaList(bList);

    const sData = getSekolahData();
    setSekolahForm({
      nama: sData.nama || "",
      slogan: sData.slogan || "",
      kepalaSekolah: sData.kepalaSekolah || "",
      akreditasi: sData.akreditasi || "",
      nilaiAkreditasi: sData.nilaiAkreditasi || "",
      tahunAkreditasi: sData.tahunAkreditasi || "",
      kurikulum: sData.kurikulum || "",
      alamat: sData.alamat || "",
      telepon: sData.telepon || "",
      email: sData.email || "",
      website: sData.website || "",
    });
  };

  // ── Handler Login ──
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    setTimeout(() => {
      const res = loginAdmin(loginForm.username, loginForm.password);
      if (res.success) {
        setLoggedIn(true);
        loadAllData();
        showToast("Login berhasil! Selamat datang di Panel Admin.");
      } else {
        setLoginError(res.message);
      }
      setIsLoggingIn(false);
    }, 400);
  };

  // ── Handler Logout ──
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin logout dari dashboard admin?")) {
      logoutAdmin();
      setLoggedIn(false);
      setLoginForm({ username: "", password: "" });
      showToast("Berhasil logout.", "info");
    }
  };

  // ── Handler Modal Berita ──
  const openAddModal = () => {
    setEditingItem(null);
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const tanggalFormatted = today.toLocaleDateString("id-ID", options);
    const isoString = today.toISOString().split("T")[0];

    setBeritaForm({
      judul: "",
      kategori: "Kegiatan",
      tanggal: tanggalFormatted,
      tanggalISO: isoString,
      ringkasan: "",
      isi: "",
      gambar: "/smansa_foto1.webp",
    });
    setImagePreview("/smansa_foto1.webp");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    const isiText = Array.isArray(item.isi) ? item.isi.join("\n\n") : item.isi || "";
    setBeritaForm({
      judul: item.judul || "",
      kategori: item.kategori || "Kegiatan",
      tanggal: item.tanggal || "",
      tanggalISO: item.tanggalISO || "",
      ringkasan: item.ringkasan || "",
      isi: isiText,
      gambar: item.gambar || "/smansa_foto1.webp",
    });
    setImagePreview(item.gambar || "/smansa_foto1.webp");
    setIsModalOpen(true);
  };

  // ── Handler Upload Gambar Berita ──
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressingImg(true);
      const base64Data = await compressImageToBase64(file, 1000, 0.75);
      setImagePreview(base64Data);
      setBeritaForm((prev) => ({ ...prev, gambar: base64Data }));
      showToast("Foto berhasil dimuat & dikompresi!");
    } catch (err) {
      alert(err.message || "Gagal memproses gambar!");
    } finally {
      setIsCompressingImg(false);
    }
  };

  // ── Simpan Berita (Tambah / Edit) ──
  const handleSaveBerita = (e) => {
    e.preventDefault();
    if (!beritaForm.judul.trim()) {
      alert("Judul berita wajib diisi!");
      return;
    }
    if (!beritaForm.ringkasan.trim()) {
      alert("Ringkasan berita wajib diisi!");
      return;
    }

    try {
      const payload = {
        ...beritaForm,
        id: editingItem ? editingItem.id : undefined,
      };

      saveBeritaItem(payload);
      setBeritaList(getBeritaList());
      setIsModalOpen(false);
      showToast(
        editingItem ? "Berita berhasil diperbarui!" : "Berita baru berhasil ditambahkan!"
      );
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan berita.");
    }
  };

  // ── Hapus Berita ──
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteBeritaItem(deleteTarget.id);
    setBeritaList(getBeritaList());
    setDeleteTarget(null);
    showToast("Berita berhasil dihapus!", "info");
  };

  // ── Simpan Info Profil Sekolah ──
  const handleSaveSekolah = (e) => {
    e.preventDefault();
    try {
      saveSekolahData(sekolahForm);
      setSekolahSaveSuccess(true);
      showToast("Data profil sekolah berhasil disimpan!");
      setTimeout(() => setSekolahSaveSuccess(false), 3000);
    } catch (err) {
      alert("Gagal menyimpan profil sekolah.");
    }
  };

  // ── Ubah Password Admin ──
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({
        type: "error",
        text: "Konfirmasi password baru tidak cocok!",
      });
      return;
    }

    const res = changeAdminPassword(
      passwordForm.oldPassword,
      passwordForm.newPassword
    );
    if (res.success) {
      setPasswordMsg({ type: "success", text: res.message });
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password admin berhasil diperbarui!");
    } else {
      setPasswordMsg({ type: "error", text: res.message });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#E8F7FD] flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2A5BA8] border-t-transparent"></div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // TAMPILAN 1: HALAMAN LOGIN ADMIN
  // ═══════════════════════════════════════════════════════════════
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F7FD] via-white to-[#A9E1F7]/30 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
        {/* Tombol kembali ke website publik */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-[#173E7A] hover:text-orange-600 px-5 py-2.5 rounded-full font-bold text-sm shadow-md border-2 border-[#173E7A]/20 hover:-translate-y-0.5 transition-all"
          >
            <FiHome size={16} />
            Kembali ke Website Sekolah
          </Link>
        </div>

        <div className="w-full max-w-md bg-white rounded-[2.5rem] border-4 border-[#173E7A] shadow-[8px_8px_0px_#173E7A] p-8 sm:p-10 relative overflow-hidden">
          {/* Header Card */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-2xl border-2 border-orange-500 shadow-[3px_3px_0px_#ea580c] flex items-center justify-center text-orange-600">
              <FiLock size={36} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#173E7A] tracking-tight uppercase">
              PORTAL ADMIN
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-bold mt-1">
              SMA Negeri 1 Pemalang
            </p>
          </div>

          {/* Alert Error */}
          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 text-xs sm:text-sm font-bold flex items-center gap-2.5">
              <FiAlertCircle size={18} className="shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                Username
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  placeholder="Masukkan username"
                  className="w-full pl-11 pr-4 py-3 bg-[#E8F7FD]/50 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <FiKey
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Masukkan password"
                  className="w-full pl-11 pr-4 py-3 bg-[#E8F7FD]/50 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-orange-500 hover:bg-orange-600 active:translate-y-0.5 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-orange-600 shadow-[0_4px_0_#ea580c] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <FiLock size={16} />
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          {/* Info Akun Default UTS */}
          <div className="mt-8 p-3.5 rounded-2xl bg-[#FFF1C9] border-2 border-[#FFD83A] text-[#173E7A] text-xs font-semibold">
            <div className="flex items-center gap-1.5 font-black uppercase text-[11px] mb-1 text-orange-700">
              <FiShield size={13} />
              Kredensial Default (UTS)
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Username: <strong className="text-black">admin</strong></span>
              <span>Password: <strong className="text-black">admin123</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // TAMPILAN 2: DASHBOARD ADMIN
  // ═══════════════════════════════════════════════════════════════
  const filteredBerita = beritaList.filter(
    (b) =>
      b.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kategori?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0F7FA] font-sans text-gray-800 flex flex-col">
      {/* ── Toast Notification ── */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl border-2 flex items-center gap-3 text-sm font-bold text-white ${
              toast.type === "success"
                ? "bg-emerald-600 border-emerald-700"
                : "bg-blue-600 border-blue-700"
            }`}
          >
            <FiCheckCircle size={18} />
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* ── Topbar Khusus Admin ── */}
      <header className="bg-white border-b-4 border-[#173E7A] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Judul Dashboard */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#2A5BA8] text-white rounded-xl border-2 border-[#173E7A] shadow-[2px_2px_0px_#173E7A] flex items-center justify-center font-black text-lg">
              SA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-[#173E7A] tracking-tight uppercase leading-none">
                  ADMIN DASHBOARD
                </h1>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-300">
                  LocalStorage Active
                </span>
              </div>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                SMA Negeri 1 Pemalang
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#E8F7FD] text-[#2A5BA8] border-2 border-[#2A5BA8]/40 hover:bg-[#2A5BA8] hover:text-white px-3.5 py-2 rounded-xl transition-all"
              title="Buka Website Sekolah di Tab Baru"
            >
              <FiExternalLink size={15} />
              <span className="hidden sm:inline">Lihat Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-600 hover:text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <FiLogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container: Sidebar Tabs + Content Area ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Sidebar Navigasi Tab ── */}
        <aside className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-sm p-3 flex flex-row lg:flex-col gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("berita")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer whitespace-nowrap text-left border-2 ${
                activeTab === "berita"
                  ? "bg-[#2A5BA8] text-white border-[#173E7A] shadow-[0_4px_0_#173E7A]"
                  : "bg-white text-gray-700 border-transparent hover:bg-gray-100"
              }`}
            >
              <FiFileText size={18} />
              <span>Kelola Berita ({beritaList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sekolah")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer whitespace-nowrap text-left border-2 ${
                activeTab === "sekolah"
                  ? "bg-[#2A5BA8] text-white border-[#173E7A] shadow-[0_4px_0_#173E7A]"
                  : "bg-white text-gray-700 border-transparent hover:bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              <span>Profil Sekolah</span>
            </button>

            <button
              onClick={() => setActiveTab("akun")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer whitespace-nowrap text-left border-2 ${
                activeTab === "akun"
                  ? "bg-[#2A5BA8] text-white border-[#173E7A] shadow-[0_4px_0_#173E7A]"
                  : "bg-white text-gray-700 border-transparent hover:bg-gray-100"
              }`}
            >
              <FiKey size={18} />
              <span>Akun &amp; Password</span>
            </button>
          </div>

          {/* Info Card Kecil di Bawah Nav */}
          <div className="hidden lg:block bg-[#FFF1C9] border-2 border-[#FFD83A] rounded-3xl p-5 text-xs text-[#173E7A]">
            <h4 className="font-black uppercase mb-1.5 flex items-center gap-1.5 text-orange-800">
              <FiCheckCircle size={14} /> Sinkronisasi Otomatis
            </h4>
            <p className="font-medium text-gray-700 leading-relaxed">
              Semua penambahan berita atau pembaruan profil yang Anda simpan di sini akan langsung disimpan di browser <strong>LocalStorage</strong> dan tampil di halaman publik sekolah.
            </p>
          </div>
        </aside>

        {/* ── Content Area Sesuai Tab Aktif ── */}
        <section className="lg:col-span-9">
          {/* ═══════════════════════════════════════════════════════
              TAB 1: KELOLA BERITA
             ═══════════════════════════════════════════════════════ */}
          {activeTab === "berita" && (
            <div className="space-y-6">
              {/* Header Tab Berita + Search + Tombol Tambah */}
              <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#173E7A]">
                    Daftar Berita &amp; Kegiatan
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                    Kelola artikel, informasi PPDB, dan prestasi sekolah
                  </p>
                </div>

                <button
                  onClick={openAddModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:translate-y-0.5 text-white px-5 py-3 rounded-2xl font-black text-sm uppercase tracking-wide border-2 border-orange-600 shadow-[0_4px_0_#ea580c] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <FiPlus size={18} />
                  Tambah Berita Baru
                </button>
              </div>

              {/* Bar Pencarian */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-2.5 flex items-center gap-3">
                <FiSearch size={20} className="text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Cari berita berdasarkan judul atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* List Berita */}
              {filteredBerita.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <FiFileText size={40} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-bold text-gray-600">
                    Tidak ada berita yang cocok
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Coba ganti kata kunci pencarian atau tambah berita baru.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBerita.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border-2 border-gray-200 hover:border-[#2A5BA8] transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm group"
                    >
                      {/* Thumbnail & Detail Teks */}
                      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-gray-200 relative bg-gray-100">
                          <ImageSlot
                            src={item.gambar}
                            alt={item.judul}
                            label="foto"
                            className="w-full h-full"
                            imageClassName="object-cover"
                            sizes="100px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-orange-200">
                              {item.kategori}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">
                              {item.tanggal}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#2A5BA8] transition-colors line-clamp-1">
                            {item.judul}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-500 font-medium line-clamp-2 mt-1">
                            {item.ringkasan}
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <Link
                          href={`/berita/${item.id}`}
                          target="_blank"
                          className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300 transition-colors"
                          title="Lihat di halaman publik"
                        >
                          <FiEye size={16} />
                        </Link>

                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs border border-blue-200 transition-all cursor-pointer"
                          title="Edit Berita"
                        >
                          <FiEdit size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 font-bold text-xs border border-rose-200 transition-all cursor-pointer"
                          title="Hapus Berita"
                        >
                          <FiTrash2 size={14} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 2: PROFIL SEKOLAH
             ═══════════════════════════════════════════════════════ */}
          {activeTab === "sekolah" && (
            <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-sm p-6 sm:p-8">
              <div className="border-b-2 border-gray-100 pb-5 mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[#173E7A]">
                  Informasi Identitas Sekolah
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Ubah data pokok sekolah. Perubahan akan langsung tampil di navbar, footer, dan profil sekolah.
                </p>
              </div>

              {sekolahSaveSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
                  <FiCheckCircle size={18} className="text-emerald-600" />
                  <span>Data profil sekolah berhasil disimpan ke LocalStorage!</span>
                </div>
              )}

              <form onSubmit={handleSaveSekolah} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Nama Sekolah
                    </label>
                    <input
                      type="text"
                      required
                      value={sekolahForm.nama}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, nama: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      value={sekolahForm.kepalaSekolah}
                      onChange={(e) =>
                        setSekolahForm({
                          ...sekolahForm,
                          kepalaSekolah: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      value={sekolahForm.telepon}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, telepon: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Email Resmi
                    </label>
                    <input
                      type="email"
                      value={sekolahForm.email}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Akreditasi
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Huruf (A)"
                        value={sekolahForm.akreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            akreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] rounded-xl font-semibold text-gray-800 outline-none text-sm text-center"
                      />
                      <input
                        type="number"
                        placeholder="Nilai (96)"
                        value={sekolahForm.nilaiAkreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            nilaiAkreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] rounded-xl font-semibold text-gray-800 outline-none text-sm text-center"
                      />
                      <input
                        type="number"
                        placeholder="Tahun (2022)"
                        value={sekolahForm.tahunAkreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            tahunAkreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] rounded-xl font-semibold text-gray-800 outline-none text-sm text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                      Kurikulum
                    </label>
                    <input
                      type="text"
                      value={sekolahForm.kurikulum}
                      onChange={(e) =>
                        setSekolahForm({
                          ...sekolahForm,
                          kurikulum: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Slogan / Tagline Sekolah
                  </label>
                  <input
                    type="text"
                    value={sekolahForm.slogan}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, slogan: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={3}
                    value={sekolahForm.alamat}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, alamat: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Domain Website Resmi
                  </label>
                  <input
                    type="text"
                    value={sekolahForm.website}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, website: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#E8F7FD]/30 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:translate-y-0.5 text-white px-7 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide border-2 border-orange-600 shadow-[0_4px_0_#ea580c] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <FiSave size={18} />
                    Simpan Perubahan Profil
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 3: AKUN & KEAMANAN
             ═══════════════════════════════════════════════════════ */}
          {activeTab === "akun" && (
            <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-sm p-6 sm:p-8 max-w-xl">
              <div className="border-b-2 border-gray-100 pb-5 mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[#173E7A]">
                  Ganti Password Admin
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Ubah password akun admin yang tersimpan di LocalStorage
                </p>
              </div>

              {passwordMsg.text && (
                <div
                  className={`mb-6 p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center gap-2 ${
                    passwordMsg.type === "success"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-red-50 border-red-300 text-red-800"
                  }`}
                >
                  {passwordMsg.type === "success" ? (
                    <FiCheckCircle size={18} className="text-emerald-600 shrink-0" />
                  ) : (
                    <FiAlertCircle size={18} className="text-red-600 shrink-0" />
                  )}
                  <span>{passwordMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder="Masukkan password saat ini"
                    className="w-full px-4 py-3 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Password Baru (Minimal 5 Karakter)
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Masukkan password baru"
                    className="w-full px-4 py-3 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-2 tracking-wide">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Ketik ulang password baru"
                    className="w-full px-4 py-3 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl font-semibold text-gray-800 outline-none text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#2A5BA8] hover:bg-[#173E7A] active:translate-y-0.5 text-white px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide border-2 border-[#173E7A] shadow-[0_4px_0_#173E7A] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <FiKey size={16} />
                    Perbarui Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════
          MODAL: TAMBAH & EDIT BERITA
         ═══════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] border-4 border-[#173E7A] shadow-[8px_8px_0px_#173E7A] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b-2 border-gray-100 flex items-center justify-between bg-[#E8F7FD]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                  {editingItem ? <FiEdit size={18} /> : <FiPlus size={20} />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#173E7A]">
                    {editingItem ? "Edit Berita Sekolah" : "Tambah Berita Baru"}
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">
                    Isi informasi artikel berita dan unggah foto
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white border-2 border-gray-200 text-gray-500 hover:text-black hover:border-black flex items-center justify-center transition-all cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form
              onSubmit={handleSaveBerita}
              className="p-6 space-y-5 overflow-y-auto flex-1 text-sm font-semibold text-gray-700"
            >
              <div>
                <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tim Robotik SMAN 1 Pemalang Raih Medali Emas"
                  value={beritaForm.judul}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, judul: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                    Kategori
                  </label>
                  <select
                    value={beritaForm.kategori}
                    onChange={(e) =>
                      setBeritaForm({ ...beritaForm, kategori: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl text-gray-800 outline-none"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="PPDB">PPDB</option>
                    <option value="OSIS">OSIS</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Olahraga">Olahraga</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                    Tanggal Tampilan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 16 Oktober 2026"
                    value={beritaForm.tanggal}
                    onChange={(e) =>
                      setBeritaForm({ ...beritaForm, tanggal: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl text-gray-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                  Ringkasan Singkat (Muncul di kartu berita) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di beranda..."
                  value={beritaForm.ringkasan}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, ringkasan: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                  Isi Lengkap Berita (Pisahkan paragraf dengan baris baru / Enter)
                </label>
                <textarea
                  rows={5}
                  placeholder="Tuliskan isi berita lengkap di sini..."
                  value={beritaForm.isi}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, isi: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#E8F7FD]/40 border-2 border-gray-200 focus:border-[#2A5BA8] focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-xs font-black uppercase text-[#173E7A] mb-1.5 tracking-wide">
                  Upload Foto Berita
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-300 relative bg-gray-100 shrink-0">
                    <ImageSlot
                      src={imagePreview || "/smansa_foto1.webp"}
                      alt="Preview Foto"
                      label="preview"
                      className="w-full h-full"
                      imageClassName="object-cover"
                      sizes="100px"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 bg-[#2A5BA8] hover:bg-[#173E7A] text-white px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all border border-[#173E7A]">
                      <FiImage size={15} />
                      <span>{isCompressingImg ? "Mengompresi..." : "Pilih File Foto"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">
                      Pilih file foto dari laptop/HP Anda. Foto otomatis dioptimalkan dan disimpan ke LocalStorage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isCompressingImg}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:translate-y-0.5 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 border-orange-600 shadow-[0_3px_0_#ea580c] cursor-pointer"
                >
                  <FiSave size={15} />
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL: KONFIRMASI HAPUS BERITA
         ═══════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-rose-600 shadow-[8px_8px_0px_#e11d48] w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center border-2 border-rose-300">
              <FiTrash2 size={28} />
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-2">
              Hapus Berita Ini?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6">
              Berita &ldquo;<strong className="text-gray-900">{deleteTarget.judul}</strong>&rdquo; akan dihapus dari daftar berita dan LocalStorage.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 border-rose-700 shadow-[0_3px_0_#be123c] cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
