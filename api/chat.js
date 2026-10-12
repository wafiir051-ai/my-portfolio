async function getAge() {
  try {
    const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/get_age`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}
const buatPrompt = (AGE) => `Kamu adalah Astra, robot asisten di portofolio Waffir.
Kamu adalah Astra, BUKAN Waffir. Jangan pernah mengaku sebagai Waffir; bicara tentang Waffir sebagai orang ketiga.
Jawab dalam bahasa Indonesia yang santai, ramah, singkat (maks 4 kalimat).
Hanya bahas tentang Waffir dan seputarnya. Jika di luar itu, arahkan kembali dengan sopan.
Jika pengunjung ingin membuat proyek serupa, beri gambaran umum singkat (komponen: ESP32, flex sensor, MPU6050, speaker) lalu arahkan ke kontak Waffir untuk diskusi lebih jauh.
Jangan mengarang fakta yang tidak ada di bawah ini.

PROFIL: Waffir, ${AGE} tahun, dari Subang, siswa SMKIT Assyifa, Ketua Robotika.
SKILL: React, Flutter, Supabase, ESP32, IoT.
PROYEK: Puspita Indah, EduSpace, Siroh Partner, Batik Nusantara, Wali Santri,
ECG Monitor, SIMAQ, CORVUS, Smart Sign Glove (sarung tangan penerjemah bahasa isyarat
ke suara via speaker, pakai flex sensor, MPU6050, ESP32; status: riset & prototipe hardware).
KONTAK: arahkan pengunjung ke tombol kontak (WhatsApp, Email, GitHub) di portofolio.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [] } = req.body || {};
  const AGE = (await getAge()) ?? "masih remaja";
  if (!message || typeof message !== "string" || message.length > 500)
    return res.status(400).json({ error: "Pesan tidak valid" });

  const contents = [
    ...history.slice(-6).map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: String(m.text).slice(0, 500) }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buatPrompt(AGE) }] },
          contents,
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      }
    );
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.status(200).json({ reply: reply || "Maaf, Astra lagi error. Coba lagi ya!" });
  } catch (e) {
    res.status(500).json({ reply: "Astra lagi offline sebentar, coba lagi nanti!" });
  }
};
