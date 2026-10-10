import sekolah from "@/data/sekolah";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export const metadata = {
  title: "Kontak — SMA Negeri 1 Pemalang",
  description: "Hubungi kami melalui form kontak, nomor telepon, email, atau kunjungi lokasi SMA Negeri 1 Pemalang langsung via Google Maps.",
};

export default function KontakPage() {
  return (
    <>
      {/* ── HEADER BANNER ── */}
      <section className="relative pt-40 pb-20 bg-gradient-to-br from-[#ea580c] to-[#ff8c00] overflow-hidden">
        {/* Polkadot pattern / ornament */}
        <div className="absolute inset-0 bg-polkadot opacity-20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight drop-shadow-[4px_4px_0px_#c2410c]">
            Hubungi Kami
          </h1>
          <p className="mt-4 text-orange-100 text-lg font-medium max-w-2xl mx-auto">
            Sampaikan pertanyaan, kritik, maupun saran Anda kepada {sekolah.nama}.
          </p>
        </div>
        
        {/* Wave bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg className="relative block w-full h-[45px] sm:h-[65px] md:h-[85px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,45 C320,15 480,95 720,55 C960,15 1160,95 1440,50 L1440,120 L0,120 Z" fill="#fff7ed" opacity="0.5"></path>
            <path d="M0,70 C240,105 440,25 720,65 C1000,105 1200,25 1440,65 L1440,120 L0,120 Z" fill="#fff7ed"></path>
          </svg>
        </div>
      </section>

      {/* ── CONTACT CONTENT SECTION ── */}
      <section className="py-12 px-4 sm:px-6 bg-[#fff7ed]">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-white border border-gray-100 p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-orange-500/10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* LEFT: Contact Form */}
            <div>
              <h2 className="text-3xl font-black text-orange-600 mb-8 uppercase tracking-tight">Contact</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                    >
                      Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                    >
                      E-mail
                    </label>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative pt-6">
                  <textarea
                    id="message"
                    rows="4"
                    placeholder=" "
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800 resize-none"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-8 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                  >
                    Pesan
                  </label>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    *NB anda tidak perlu login untuk mengisi kritik dan saran
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <button
                      type="button"
                      className="bg-orange-500 text-white font-bold px-10 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT: Info & Map */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-gray-800 mb-4 text-center lg:text-left">{sekolah.nama}</h2>
              
              <div className="flex flex-col items-center lg:items-start gap-2 mb-8 text-gray-600 font-medium">
                <div className="flex items-start gap-2 text-center lg:text-left">
                  <FiMapPin className="text-orange-500 mt-1 shrink-0" size={18} />
                  <span>{sekolah.alamat}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-orange-500" size={18} />
                    <span>{sekolah.telepon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-orange-500" size={18} />
                    <span>{sekolah.email}</span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="flex-1 w-full min-h-[300px] rounded-xl overflow-hidden border-4 border-orange-200 relative shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9161746205844!2d109.3879201147728!3d-6.892015095018698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fc9210086c2e3%3A0xc0fb176e3d23cc2!2sSMA%20Negeri%201%20Pemalang!5e0!3m2!1sen!2sid!4v1683445831295!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps SMAN 1 Pemalang"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
