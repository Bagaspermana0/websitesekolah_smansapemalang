"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
    }, 300);
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
    setIsLogoutModalOpen(false);
    setLoginForm({ username: "", password: "" });
    showToast("Berhasil logout.", "info");
  };

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

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteBeritaItem(deleteTarget.id);
    setBeritaList(getBeritaList());
    setDeleteTarget(null);
    showToast("Berita berhasil dihapus!", "info");
  };

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
      <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // TAMPILAN 1: HALAMAN LOGIN ADMIN (Modern, Soft, Style Home)
  // ═══════════════════════════════════════════════════════════════
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#fff7ed] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
        {/* Tombol kembali ke website sekolah */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-gray-700 hover:text-orange-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-orange-500/10 border border-gray-100 hover:-translate-y-0.5 transition-all"
          >
            &larr; Kembali ke Website Sekolah
          </Link>
        </div>

        {/* Outer Blue Wrapper (Persis seperti section profil di Home) */}
        <div className="w-full max-w-md bg-[#b3e5fc] border-4 sm:border-[8px] border-[#81d4fa] p-3 sm:p-4 rounded-[2.5rem] shadow-2xl shadow-sky-500/20">
          {/* Inner Clean Card */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-white shadow-sm">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                SMAN 1 Pemalang
              </span>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Portal Admin
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Silakan masuk untuk mengelola berita &amp; profil sekolah
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl font-medium text-gray-800 outline-none text-sm transition-all focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl font-medium text-gray-800 outline-none text-sm transition-all focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide cursor-pointer"
                >
                  {isLoggingIn ? "Memverifikasi..." : "Masuk ke Dashboard"}
                </button>
              </div>
            </form>

            {/* Kotak Info Kuning (Persis inner card kuning di Home) */}
            <div className="mt-8 p-4 rounded-xl bg-[#fff9c4] border-2 border-[#fde047] text-gray-800 text-xs">
              <div className="font-bold text-orange-700 mb-1">
                Kredensial Default:
              </div>
              <div className="flex justify-between items-center text-gray-700 font-medium">
                <span>Username: <strong className="text-black">admin</strong></span>
                <span>Password: <strong className="text-black">admin123</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // TAMPILAN 2: DASHBOARD ADMIN (Style Home: Biru, Kuning, Putih, Orange)
  // ═══════════════════════════════════════════════════════════════
  const filteredBerita = (beritaList || []).filter(
    (b) =>
      b &&
      (b.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.kategori?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#fff7ed] font-sans text-gray-800 flex flex-col">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="px-6 py-3 rounded-full shadow-xl bg-orange-500 text-white text-sm font-bold">
            {toast.text}
          </div>
        </div>
      )}

      {/* ── Top Header Banner (Biru Seger seperti Header Berita) ── */}
      <section className="bg-[#b3e5fc] pt-10 pb-16 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="inline-block bg-white/70 backdrop-blur-sm text-orange-600 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider mb-2">
              Panel Pengelola
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#0284c7]">
              Dashboard Admin
            </h1>
            <p className="text-[#0f3756] text-xs sm:text-sm font-bold mt-1">
              SMA Negeri 1 Pemalang &bull; Data tersimpan di LocalStorage
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              Lihat Website
            </Link>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-red-500/20 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Wave Divider Transition ke Konten */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none translate-y-1">
          <svg
            className="relative block w-full h-[35px] sm:h-[45px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C320,110 520,10 720,70 C920,120 1120,20 1440,65 L1440,120 L0,120 Z"
              fill="#fff7ed"
            ></path>
          </svg>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* Navigation Tabs (Pill Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("berita")}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "berita"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                : "bg-white text-gray-700 hover:text-orange-600 border border-gray-200 shadow-sm"
            }`}
          >
            Kelola Berita ({beritaList.length})
          </button>

          <button
            onClick={() => setActiveTab("sekolah")}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "sekolah"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                : "bg-white text-gray-700 hover:text-orange-600 border border-gray-200 shadow-sm"
            }`}
          >
            Profil Sekolah
          </button>

          <button
            onClick={() => setActiveTab("akun")}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "akun"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                : "bg-white text-gray-700 hover:text-orange-600 border border-gray-200 shadow-sm"
            }`}
          >
            Ganti Password
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════
            TAB 1: KELOLA BERITA
           ═══════════════════════════════════════════════════════ */}
        {activeTab === "berita" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-orange-500/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl font-black text-gray-800">
                  Daftar Berita SMANSA
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Tambah, ubah, atau hapus artikel berita sekolah
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Cari judul / kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-full text-xs font-medium outline-none transition-all"
                />

                <button
                  onClick={openAddModal}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer"
                >
                  + Tambah Berita
                </button>
              </div>
            </div>

            {/* List Berita Cards */}
            {filteredBerita.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-400 font-medium text-sm">
                Tidak ada berita yang ditemukan.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredBerita.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 shadow-xl shadow-orange-500/5 rounded-2xl p-4 flex gap-4 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                      <ImageSlot
                        src={item.gambar}
                        alt={item.judul}
                        label="foto"
                        className="w-full h-full"
                        imageClassName="object-cover"
                        sizes="120px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            {item.kategori}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {item.tanggal}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-gray-800 line-clamp-2 leading-snug">
                          {item.judul}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                        <Link
                          href={`/berita/${item.id}`}
                          target="_blank"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                        >
                          Lihat
                        </Link>
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ml-auto"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            TAB 2: PROFIL SEKOLAH (Outer Blue Box Style Home)
           ═══════════════════════════════════════════════════════ */}
        {activeTab === "sekolah" && (
          <div className="bg-[#b3e5fc] border-4 sm:border-[8px] border-[#81d4fa] p-3 sm:p-6 rounded-[2rem] shadow-xl shadow-sky-500/15">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-white shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
                  Data Pokok
                </span>
                <h2 className="text-2xl font-black text-gray-900">
                  Identitas Sekolah
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Perubahan akan otomatis tersimpan di LocalStorage dan tampil di Navbar, Footer, serta Profil sekolah.
                </p>
              </div>

              {sekolahSaveSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                  Data profil sekolah berhasil disimpan!
                </div>
              )}

              <form onSubmit={handleSaveSekolah} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Nama Sekolah
                    </label>
                    <input
                      type="text"
                      required
                      value={sekolahForm.nama}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, nama: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
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
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      value={sekolahForm.telepon}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, telepon: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Resmi
                    </label>
                    <input
                      type="email"
                      value={sekolahForm.email}
                      onChange={(e) =>
                        setSekolahForm({ ...sekolahForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Akreditasi (Grade / Nilai / Tahun)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="A"
                        value={sekolahForm.akreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            akreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none text-center"
                      />
                      <input
                        type="number"
                        placeholder="96"
                        value={sekolahForm.nilaiAkreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            nilaiAkreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none text-center"
                      />
                      <input
                        type="number"
                        placeholder="2022"
                        value={sekolahForm.tahunAkreditasi}
                        onChange={(e) =>
                          setSekolahForm({
                            ...sekolahForm,
                            tahunAkreditasi: e.target.value,
                          })
                        }
                        className="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
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
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Slogan / Tagline Sekolah
                  </label>
                  <input
                    type="text"
                    value={sekolahForm.slogan}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, slogan: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={sekolahForm.alamat}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, alamat: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Domain Website
                  </label>
                  <input
                    type="text"
                    value={sekolahForm.website}
                    onChange={(e) =>
                      setSekolahForm({ ...sekolahForm, website: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            TAB 3: AKUN & KEAMANAN
           ═══════════════════════════════════════════════════════ */}
        {activeTab === "akun" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl shadow-orange-500/5 p-6 sm:p-8">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
                Keamanan
              </span>
              <h2 className="text-2xl font-black text-gray-900">
                Ganti Password Admin
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Password baru akan disimpan di LocalStorage browser ini
              </p>
            </div>

            {passwordMsg.text && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs font-bold text-center ${
                  passwordMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {passwordMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Password Baru
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
                  placeholder="Minimal 5 karakter"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Perbarui Password
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════════
          MODAL: TAMBAH & EDIT BERITA (Soft Card Style)
         ═══════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-orange-500/10 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {editingItem ? "Edit Berita" : "Tambah Berita"}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Isi data berita dan unggah foto
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSaveBerita}
              className="p-6 space-y-4 overflow-y-auto flex-1 text-sm font-medium text-gray-700"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Judul artikel berita..."
                  value={beritaForm.judul}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, judul: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={beritaForm.kategori}
                    onChange={(e) =>
                      setBeritaForm({ ...beritaForm, kategori: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-gray-800 outline-none"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Tanggal
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 16 Oktober 2026"
                    value={beritaForm.tanggal}
                    onChange={(e) =>
                      setBeritaForm({ ...beritaForm, tanggal: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-gray-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Ringkasan Singkat *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di beranda..."
                  value={beritaForm.ringkasan}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, ringkasan: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Isi Lengkap Berita (Gunakan Enter untuk baris baru)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan isi berita lengkap..."
                  value={beritaForm.isi}
                  onChange={(e) =>
                    setBeritaForm({ ...beritaForm, isi: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-xl text-gray-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Foto Berita
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-100 shrink-0">
                    <ImageSlot
                      src={imagePreview || "/smansa_foto1.webp"}
                      alt="Preview Foto"
                      label="preview"
                      className="w-full h-full"
                      imageClassName="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="inline-block bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full text-xs uppercase cursor-pointer transition-colors border border-orange-200">
                      <span>{isCompressingImg ? "Mengompresi..." : "Pilih File Foto"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Otomatis dioptimalkan dan disimpan ke LocalStorage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-full text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isCompressingImg}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow-md shadow-orange-500/20 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL: KONFIRMASI HAPUS
         ═══════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-gray-900 mb-2">
              Hapus Berita?
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              Berita &ldquo;<strong className="text-gray-900">{deleteTarget.judul}</strong>&rdquo; akan dihapus.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-full text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide shadow-md shadow-red-500/20 cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL: KONFIRMASI LOGOUT
         ═══════════════════════════════════════════════════════════ */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-gray-900 mb-2">
              Konfirmasi Logout
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar dari Panel Pengelola Admin?
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-5 py-2 rounded-full text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide shadow-md shadow-red-500/20 cursor-pointer"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
