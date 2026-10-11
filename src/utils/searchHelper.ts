import { KanjiItem } from '../data/kanjiData';

// Cyrillic to Romaji simple conversion for cross-matching
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[ё]/g, 'е')
    .replace(/[й]/g, 'и')
    .replace(/[-_.,!?:;«»"'\(\)\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert Russian transcription to approximate Romaji for flexible matching
// (например "хи" -> "hi", "мидзу" -> "mizu", "ка" -> "ka", "си" -> "shi/si")
export function cyrillicToRomajiApprox(cyr: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya', 'дз': 'z', 'дзи': 'ji', 'дзё': 'jo', 'дзю': 'ju',
    'си': 'shi', 'ти': 'chi', 'цу': 'tsu', 'фу': 'fu'
  };

  let res = cyr.toLowerCase();
  // Multi-char replacements first
  res = res.replace(/дзи/g, 'ji')
           .replace(/дзё/g, 'jo')
           .replace(/дзю/g, 'ju')
           .replace(/дз/g, 'z')
           .replace(/си/g, 'shi')
           .replace(/ти/g, 'chi')
           .replace(/цу/g, 'tsu')
           .replace(/фу/g, 'fu');

  return res.split('').map(char => map[char] || char).join('');
}

// Check if a Kanji item matches the search query
export function matchesKanji(item: KanjiItem, rawQuery: string, categoryFilter: string = 'all'): boolean {
  // Category filtering
  if (categoryFilter !== 'all' && categoryFilter !== '') {
    if (categoryFilter.startsWith('lesson-')) {
      const lessonNum = parseInt(categoryFilter.replace('lesson-', ''), 10);
      if (item.lesson !== lessonNum) return false;
    } else if (item.category !== categoryFilter) {
      return false;
    }
  }

  const q = rawQuery.trim();
  if (!q) return true;

  // Direct kanji match
  if (item.kanji === q) return true;

  const normQ = normalizeText(q);

  // Lesson number match (e.g. "урок 1", "урок 2", "lesson 1", "л1")
  const lessonMatch = normQ.match(/^(?:урок|lesson|л)?\s*(\d+)$/i);
  if (lessonMatch) {
    const lNum = parseInt(lessonMatch[1], 10);
    if (item.lesson === lNum) return true;
  }

  // Stroke count match (e.g. "4 черты", "3 штриха")
  const strokeMatch = normQ.match(/^(\d+)\s*(?:черт|штрих|stroke)/i);
  if (strokeMatch) {
    if (item.strokes === parseInt(strokeMatch[1], 10)) return true;
  }

  // Check Russian Meaning (exact, startsWith or contains)
  const normMeaning = normalizeText(item.meaning);
  if (normMeaning.startsWith(normQ) || normMeaning.includes(normQ)) return true;

  // Check alternative meanings
  if (item.meaningsAlt) {
    for (const alt of item.meaningsAlt) {
      const normAlt = normalizeText(alt);
      if (normAlt.startsWith(normQ) || normAlt.includes(normQ)) return true;
    }
  }

  // Check Russian Kunyomi transliteration (e.g. "хи", "мидзу", "манабу")
  const normKunRu = normalizeText(item.kunyomiRu);
  if (normKunRu.includes(normQ) || normKunRu.split(' ').some(part => part.startsWith(normQ))) {
    return true;
  }

  // Check Russian Onyomi transliteration (e.g. "ка", "суй", "кин", "гаку")
  const normOnRu = normalizeText(item.onyomiRu);
  if (normOnRu.includes(normQ) || normOnRu.split(' ').some(part => part.startsWith(normQ))) {
    return true;
  }

  // Check Japanese Kana readings directly
  if (item.kunyomi.includes(q) || item.onyomi.includes(q)) {
    return true;
  }

  // Check Romaji readings (e.g. "hi", "ka", "mizu", "sui")
  const lowerQ = q.toLowerCase();
  if (item.kunyomiRomaji.toLowerCase().includes(lowerQ) || item.onyomiRomaji.toLowerCase().includes(lowerQ)) {
    return true;
  }

  // Approximate phonetic Romaji match if user entered Russian
  const qAsRomaji = cyrillicToRomajiApprox(normQ);
  if (qAsRomaji.length >= 2) {
    if (item.kunyomiRomaji.toLowerCase().includes(qAsRomaji) || item.onyomiRomaji.toLowerCase().includes(qAsRomaji)) {
      return true;
    }
  }

  // Check examples (words) and translations
  for (const ex of item.examples) {
    if (ex.word.includes(q) || ex.reading.includes(q)) return true;
    const normExTrans = normalizeText(ex.translation);
    const normExRu = normalizeText(ex.readingRu);
    if (normExTrans.includes(normQ) || normExRu.includes(normQ)) return true;
  }

  return false;
}
