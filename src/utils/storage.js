import defaultBerita from "@/data/berita";
import defaultSekolah from "@/data/sekolah";

export const STORAGE_KEYS = {
  BERITA: "sman1_berita_data",
  SEKOLAH: "sman1_sekolah_data",
  AUTH: "sman1_admin_auth",
  CREDS: "sman1_admin_creds",
};

const DEFAULT_CREDS = {
  username: "admin",
  password: "admin123",
};

const isBrowser = () => typeof window !== "undefined";

// ── 1. Berita Helpers ──

export function getBeritaList() {
  if (!isBrowser()) return defaultBerita;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BERITA);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(defaultBerita));
      return defaultBerita;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultBerita;
  } catch (err) {
    console.error("Gagal membaca berita dari localStorage:", err);
    return defaultBerita;
  }
}

export function getBeritaById(id) {
  const list = getBeritaList();
  return list.find((b) => String(b.id) === String(id)) || null;
}

export function saveBeritaItem(item) {
  if (!isBrowser()) return null;
  try {
    const currentList = [...getBeritaList()];
    let savedItem;

    // Pastikan isi berupa array of paragraph
    let cleanIsi = item.isi;
    if (typeof cleanIsi === "string") {
      cleanIsi = cleanIsi
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }
    if (!Array.isArray(cleanIsi) || cleanIsi.length === 0) {
      cleanIsi = [item.ringkasan || ""];
    }

    if (item.id) {
      // Edit mode
      const index = currentList.findIndex((b) => String(b.id) === String(item.id));
      if (index !== -1) {
        savedItem = {
          ...currentList[index],
          ...item,
          isi: cleanIsi,
        };
        currentList[index] = savedItem;
      } else {
        savedItem = {
          ...item,
          isi: cleanIsi,
        };
        currentList.unshift(savedItem);
      }
    } else {
      // Create mode
      const slug = (item.judul || "berita")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 50);
      const generatedId = `${slug}-${Date.now().toString().slice(-4)}`;

      savedItem = {
        ...item,
        id: generatedId,
        isi: cleanIsi,
        tanggalISO: item.tanggalISO || new Date().toISOString().split("T")[0],
      };
      currentList.unshift(savedItem);
    }

    localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(currentList));
    window.dispatchEvent(
      new CustomEvent("sman1_data_updated", { detail: { type: "berita" } })
    );
    return savedItem;
  } catch (err) {
    console.error("Gagal menyimpan berita:", err);
    throw err;
  }
}

export function deleteBeritaItem(id) {
  if (!isBrowser()) return false;
  try {
    const currentList = getBeritaList();
    const updated = currentList.filter((b) => String(b.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent("sman1_data_updated", { detail: { type: "berita" } })
    );
    return true;
  } catch (err) {
    console.error("Gagal menghapus berita:", err);
    return false;
  }
}

// ── 2. Data Sekolah / Profil Helpers ──

export function getSekolahData() {
  if (!isBrowser()) return defaultSekolah;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEKOLAH);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(defaultSekolah));
      return defaultSekolah;
    }
    const parsed = JSON.parse(raw);
    return { ...defaultSekolah, ...parsed };
  } catch (err) {
    console.error("Gagal membaca profil sekolah dari localStorage:", err);
    return defaultSekolah;
  }
}

export function saveSekolahData(newData) {
  if (!isBrowser()) return null;
  try {
    const current = getSekolahData();
    const merged = { ...current, ...newData };
    localStorage.setItem(STORAGE_KEYS.SEKOLAH, JSON.stringify(merged));
    window.dispatchEvent(
      new CustomEvent("sman1_data_updated", { detail: { type: "sekolah" } })
    );
    return merged;
  } catch (err) {
    console.error("Gagal menyimpan data sekolah:", err);
    throw err;
  }
}

// ── 3. Autentikasi Admin Helpers ──

export function getAdminCreds() {
  if (!isBrowser()) return DEFAULT_CREDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(DEFAULT_CREDS));
      return DEFAULT_CREDS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_CREDS;
  }
}

export function loginAdmin(username, password) {
  if (!isBrowser()) return { success: false, message: "Browser tidak didukung" };
  const creds = getAdminCreds();
  if (
    username.trim().toLowerCase() === creds.username.toLowerCase() &&
    password === creds.password
  ) {
    const session = {
      loggedIn: true,
      user: creds.username,
      loginAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
    return { success: true };
  }
  return { success: false, message: "Username atau password salah!" };
}

export function logoutAdmin() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}

export function isAuthenticated() {
  if (!isBrowser()) return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session?.loggedIn);
  } catch {
    return false;
  }
}

export function changeAdminPassword(oldPassword, newPassword) {
  if (!isBrowser()) return { success: false, message: "Browser tidak didukung" };
  const creds = getAdminCreds();
  if (oldPassword !== creds.password) {
    return { success: false, message: "Password lama tidak sesuai!" };
  }
  if (!newPassword || newPassword.length < 5) {
    return { success: false, message: "Password baru minimal 5 karakter!" };
  }

  const updatedCreds = { ...creds, password: newPassword };
  localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(updatedCreds));
  return { success: true, message: "Password berhasil diperbarui!" };
}

// ── 4. Kompresi Foto ke Base64 (Aman dari kuota localStorage) ──

export function compressImageToBase64(file, maxWidth = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("File tidak ditemukan"));
    }
    if (!file.type.startsWith("image/")) {
      return reject(new Error("File harus berupa gambar (JPG, PNG, WEBP)"));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.src = readerEvent.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Kompres ke webp jika didukung browser, fallback ke jpeg
        try {
          const compressed = canvas.toDataURL("image/webp", quality);
          resolve(compressed);
        } catch (e) {
          const fallback = canvas.toDataURL("image/jpeg", quality);
          resolve(fallback);
        }
      };
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
  });
}
