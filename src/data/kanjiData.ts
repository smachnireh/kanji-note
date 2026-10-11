export interface KanjiExample {
  word: string;
  reading: string;
  readingRu: string;
  translation: string;
}

export interface KanjiItem {
  id: number;
  kanji: string;
  lesson: number;
  meaning: string;
  meaningsAlt?: string[];
  kunyomi: string;
  kunyomiRu: string;
  kunyomiRomaji: string;
  onyomi: string;
  onyomiRu: string;
  onyomiRomaji: string;
  strokes: number;
  mnemonic: string;
  category: string;
  examples: KanjiExample[];
}

export const KANJI_DATA: KanjiItem[] = [
  // ── УРОК 1: Базовые стихии и жизнь (10 кандзи) ──
  {
    id: 1,
    kanji: "火",
    lesson: 1,
    meaning: "огонь",
    meaningsAlt: ["пламя", "костёр"],
    kunyomi: "ひ",
    kunyomiRu: "хи",
    kunyomiRomaji: "hi",
    onyomi: "カ",
    onyomiRu: "ка",
    onyomiRomaji: "KA",
    strokes: 4,
    mnemonic: "Рисунок костра с взлетающими языками пламени и искрами.",
    category: "Стихии",
    examples: [
      { word: "火", reading: "ひ", readingRu: "хи", translation: "огонь, пламя" },
      { word: "火曜日", reading: "かようび", readingRu: "каё:би", translation: "вторник (день огня)" },
      { word: "火花", reading: "ひばな", readingRu: "хибана", translation: "искра" },
      { word: "火事", reading: "かじ", readingRu: "кадзи", translation: "пожар" }
    ]
  },
  {
    id: 2,
    kanji: "水",
    lesson: 1,
    meaning: "вода",
    meaningsAlt: ["влага", "жидкость"],
    kunyomi: "みず",
    kunyomiRu: "мидзу",
    kunyomiRomaji: "mizu",
    onyomi: "スイ",
    onyomiRu: "суй",
    onyomiRomaji: "SUI",
    strokes: 4,
    mnemonic: "Центральная струя бегущей речной воды и брызги по бокам.",
    category: "Стихии",
    examples: [
      { word: "水", reading: "みず", readingRu: "мидзу", translation: "холодная вода" },
      { word: "水曜日", reading: "すいようび", readingRu: "суйё:би", translation: "среда (день воды)" },
      { word: "水泳", reading: "すいえい", readingRu: "суйэй", translation: "плавание" },
      { word: "海水", reading: "かいすい", readingRu: "кайсуй", translation: "морская вода" }
    ]
  },
  {
    id: 3,
    kanji: "金",
    lesson: 1,
    meaning: "золото",
    meaningsAlt: ["деньги", "металл"],
    kunyomi: "かね",
    kunyomiRu: "канэ",
    kunyomiRomaji: "kane",
    onyomi: "キン",
    onyomiRu: "кин",
    onyomiRomaji: "KIN",
    strokes: 8,
    mnemonic: "Крыша над землей, скрывающая в недрах золотые самородки.",
    category: "Стихии",
    examples: [
      { word: "金", reading: "かね / きん", readingRu: "канэ / кин", translation: "деньги / золото" },
      { word: "金曜日", reading: "きんようび", readingRu: "кинё:би", translation: "пятница (день золота)" },
      { word: "お金", reading: "おかね", readingRu: "оканэ", translation: "деньги (вежливо)" },
      { word: "料金", reading: "りょうきん", readingRu: "рё:кин", translation: "плата, тариф" }
    ]
  },
  {
    id: 4,
    kanji: "土",
    lesson: 1,
    meaning: "земля",
    meaningsAlt: ["почва", "грунт"],
    kunyomi: "つち",
    kunyomiRu: "цути",
    kunyomiRomaji: "tsuchi",
    onyomi: "ド",
    onyomiRu: "до",
    onyomiRomaji: "DO",
    strokes: 3,
    mnemonic: "Маленький росток, пробивающийся сквозь пласт плодородной почвы.",
    category: "Стихии",
    examples: [
      { word: "土", reading: "つち", readingRu: "цути", translation: "земля, почва" },
      { word: "土曜日", reading: "どようび", readingRu: "доё:би", translation: "суббота (день земли)" },
      { word: "土地", reading: "とち", readingRu: "тоти", translation: "земельный участок" }
    ]
  },
  {
    id: 5,
    kanji: "子",
    lesson: 1,
    meaning: "ребёнок",
    meaningsAlt: ["дитя"],
    kunyomi: "こ",
    kunyomiRu: "ко",
    kunyomiRomaji: "ko",
    onyomi: "シ",
    onyomiRu: "си",
    onyomiRomaji: "SHI",
    strokes: 3,
    mnemonic: "Спеленатый младенец, радостно раскинувший ручки в стороны.",
    category: "Человек",
    examples: [
      { word: "子供", reading: "こども", readingRu: "кодомо", translation: "дети, ребёнок" },
      { word: "女の子", reading: "おんなのこ", readingRu: "онна-но-ко", translation: "девочка" },
      { word: "男の子", reading: "おとこのこ", readingRu: "отоко-но-ко", translation: "мальчик" },
      { word: "電子", reading: "でんし", readingRu: "дэнси", translation: "электрон" }
    ]
  },
  {
    id: 6,
    kanji: "女",
    lesson: 1,
    meaning: "женщина",
    meaningsAlt: ["женский пол"],
    kunyomi: "おんな",
    kunyomiRu: "онна",
    kunyomiRomaji: "onna",
    onyomi: "ジョ",
    onyomiRu: "дзё",
    onyomiRomaji: "JO",
    strokes: 3,
    mnemonic: "Изящно склонившаяся женщина, сложившая руки на коленях.",
    category: "Человек",
    examples: [
      { word: "女", reading: "おんな", readingRu: "онна", translation: "женщина" },
      { word: "女性", reading: "じょせい", readingRu: "дзёсэй", translation: "женщина, женский пол" },
      { word: "彼女", reading: "かのじょ", readingRu: "канодзё", translation: "она, возлюбленная" }
    ]
  },
  {
    id: 7,
    kanji: "学",
    lesson: 1,
    meaning: "учиться",
    meaningsAlt: ["наука", "учение"],
    kunyomi: "まな-ぶ",
    kunyomiRu: "манабу",
    kunyomiRomaji: "manabu",
    onyomi: "ガク",
    onyomiRu: "гаку",
    onyomiRomaji: "GAKU",
    strokes: 8,
    mnemonic: "Ребенок (子) под крышей учебного заведения постигает знания.",
    category: "Обучение",
    examples: [
      { word: "学生", reading: "がくせい", readingRu: "гакусэй", translation: "студент, учащийся" },
      { word: "学校", reading: "がっこう", readingRu: "гакко:", translation: "школа" },
      { word: "大学", reading: "だいがく", readingRu: "дайгаку", translation: "университет" },
      { word: "学ぶ", reading: "まなぶ", readingRu: "манабу", translation: "учиться, изучать" }
    ]
  },
  {
    id: 8,
    kanji: "生",
    lesson: 1,
    meaning: "жизнь",
    meaningsAlt: ["рождение", "живой", "сырой"],
    kunyomi: "い-きる / う-まれる",
    kunyomiRu: "икиру / умарэру",
    kunyomiRomaji: "ikiru / umareru",
    onyomi: "セイ",
    onyomiRu: "сэй",
    onyomiRomaji: "SEI",
    strokes: 5,
    mnemonic: "Свежий росток, выбивающийся к свету — символ вечной жизни.",
    category: "Жизнь",
    examples: [
      { word: "生きる", reading: "いきる", readingRu: "икиру", translation: "жить" },
      { word: "生まれる", reading: "うまれる", readingRu: "умарэру", translation: "рождаться" },
      { word: "先生", reading: "せんせい", readingRu: "сэнсэй", translation: "учитель (рождённый раньше)" },
      { word: "生活", reading: "せいかつ", readingRu: "сэйкацу", translation: "быт, жизнь" }
    ]
  },
  {
    id: 9,
    kanji: "先",
    lesson: 1,
    meaning: "впереди",
    meaningsAlt: ["предыдущий", "раньше"],
    kunyomi: "さき",
    kunyomiRu: "саки",
    kunyomiRomaji: "saki",
    onyomi: "セン",
    onyomiRu: "сэн",
    onyomiRomaji: "SEN",
    strokes: 6,
    mnemonic: "Человек с высоко поднятыми ногами, бодро шагающий впереди всех.",
    category: "Пространство",
    examples: [
      { word: "先", reading: "さき", readingRu: "саки", translation: "впереди, кончик, будущее" },
      { word: "先生", reading: "せんせい", readingRu: "сэнсэй", translation: "учитель, наставник" },
      { word: "先月", reading: "せんげつ", readingRu: "сэнгэцу", translation: "прошлый месяц" },
      { word: "先週", reading: "せんしゅう", readingRu: "сэнсю:", translation: "прошлая неделя" }
    ]
  },
  {
    id: 10,
    kanji: "円",
    lesson: 1,
    meaning: "иена",
    meaningsAlt: ["круг", "круглый"],
    kunyomi: "まる-い",
    kunyomiRu: "маруй",
    kunyomiRomaji: "marui",
    onyomi: "エン",
    onyomiRu: "эн",
    onyomiRomaji: "EN",
    strokes: 4,
    mnemonic: "Круглая монета или замкнутый круг в каллиграфических гранях.",
    category: "Деньги",
    examples: [
      { word: "円", reading: "えん", readingRu: "эн", translation: "японская иена" },
      { word: "百円", reading: "ひゃくえん", readingRu: "хяку эн", translation: "100 иен" },
      { word: "五千円", reading: "ごせんえん", readingRu: "госэн эн", translation: "5 000 иен" },
      { word: "一万円", reading: "いちまんえん", readingRu: "итиман эн", translation: "10 000 иен" }
    ]
  },

  // ── УРОК 2: Числа и основы счёта (10 кандзи) ──
  {
    id: 11,
    kanji: "一",
    lesson: 2,
    meaning: "один",
    meaningsAlt: ["единица", "первый"],
    kunyomi: "ひと-つ",
    kunyomiRu: "хитоцу",
    kunyomiRomaji: "hitotsu",
    onyomi: "イチ",
    onyomiRu: "ити",
    onyomiRomaji: "ICHI",
    strokes: 1,
    mnemonic: "Один горизонтально вытянутый указательный палец руки.",
    category: "Числа",
    examples: [
      { word: "一つ", reading: "ひとつ", readingRu: "хитоцу", translation: "одна штука" },
      { word: "一人", reading: "ひとり", readingRu: "хитори", translation: "один человек" },
      { word: "一月", reading: "いちがつ", readingRu: "итигацу", translation: "январь" },
      { word: "一日", reading: "ついたち", readingRu: "цуитати", translation: "первое число месяца" }
    ]
  },
  {
    id: 12,
    kanji: "二",
    lesson: 2,
    meaning: "два",
    meaningsAlt: ["пара", "второй"],
    kunyomi: "ふた-つ",
    kunyomiRu: "футацу",
    kunyomiRomaji: "futatsu",
    onyomi: "ニ",
    onyomiRu: "ни",
    onyomiRomaji: "NI",
    strokes: 2,
    mnemonic: "Два вытянутых параллельных пальца руки.",
    category: "Числа",
    examples: [
      { word: "二つ", reading: "ふたつ", readingRu: "футацу", translation: "две штуки" },
      { word: "二人", reading: "ふたり", readingRu: "футари", translation: "два человека, вдвоём" },
      { word: "二月", reading: "にがつ", readingRu: "нигацу", translation: "февраль" },
      { word: "二十歳", reading: "はたち", readingRu: "хатати", translation: "20 лет" }
    ]
  },
  {
    id: 13,
    kanji: "三",
    lesson: 2,
    meaning: "три",
    meaningsAlt: ["тройка", "третий"],
    kunyomi: "みっ-つ",
    kunyomiRu: "миццу",
    kunyomiRomaji: "mittsu",
    onyomi: "サン",
    onyomiRu: "сан",
    onyomiRomaji: "SAN",
    strokes: 3,
    mnemonic: "Три горизонтально вытянутых пальца руки.",
    category: "Числа",
    examples: [
      { word: "三つ", reading: "みっつ", readingRu: "миццу", translation: "три штуки" },
      { word: "三人", reading: "さんにん", readingRu: "саннин", translation: "три человека" },
      { word: "三月", reading: "さんがつ", readingRu: "сангацу", translation: "март" },
      { word: "三角", reading: "さんかく", readingRu: "санкаку", translation: "треугольник" }
    ]
  },
  {
    id: 14,
    kanji: "四",
    lesson: 2,
    meaning: "четыре",
    meaningsAlt: ["четвёрка"],
    kunyomi: "よっ-つ / よん",
    kunyomiRu: "ёццу / ён",
    kunyomiRomaji: "yottsu / yon",
    onyomi: "シ",
    onyomiRu: "си",
    onyomiRomaji: "SHI",
    strokes: 5,
    mnemonic: "Четыре пальца (2+2) или контур окна с распахнутыми створками.",
    category: "Числа",
    examples: [
      { word: "四つ", reading: "よっつ", readingRu: "ёццу", translation: "четыре штуки" },
      { word: "四月", reading: "しがつ", readingRu: "сигацу", translation: "апрель" },
      { word: "四季", reading: "しき", readingRu: "сики", translation: "четыре времени года" },
      { word: "四人", reading: "よにん", readingRu: "ёнин", translation: "четверо людей" }
    ]
  },
  {
    id: 15,
    kanji: "五",
    lesson: 2,
    meaning: "пять",
    meaningsAlt: ["пятёрка"],
    kunyomi: "いつ-つ",
    kunyomiRu: "ицуцу",
    kunyomiRomaji: "itsutsu",
    onyomi: "ゴ",
    onyomiRu: "го",
    onyomiRomaji: "GO",
    strokes: 4,
    mnemonic: "Пять пальцев раскрытой ладони руки (3+2).",
    category: "Числа",
    examples: [
      { word: "五つ", reading: "いつつ", readingRu: "ицуцу", translation: "пять штук" },
      { word: "五月", reading: "ごがつ", readingRu: "гогацу", translation: "май" },
      { word: "五日", reading: "いつか", readingRu: "ицука", translation: "пятое число" },
      { word: "五十音", reading: "ごじゅうおん", readingRu: "годзю:он", translation: "слоговая азбука (50 звуков)" }
    ]
  },
  {
    id: 16,
    kanji: "六",
    lesson: 2,
    meaning: "шесть",
    meaningsAlt: ["шестёрка"],
    kunyomi: "むっ-つ",
    kunyomiRu: "муццу",
    kunyomiRomaji: "muttsu",
    onyomi: "ロク",
    onyomiRu: "року",
    onyomiRomaji: "ROKU",
    strokes: 4,
    mnemonic: "Шесть пальцев на двух руках (3+3).",
    category: "Числа",
    examples: [
      { word: "六つ", reading: "むっつ", readingRu: "муццу", translation: "шесть штук" },
      { word: "六月", reading: "ろくがつ", readingRu: "рокугацу", translation: "июнь" },
      { word: "六日", reading: "むいか", readingRu: "муйка", translation: "шестое число месяца" }
    ]
  },
  {
    id: 17,
    kanji: "七",
    lesson: 2,
    meaning: "семь",
    meaningsAlt: ["семёрка"],
    kunyomi: "なな-つ",
    kunyomiRu: "нанацу",
    kunyomiRomaji: "nanatsu",
    onyomi: "シチ",
    onyomiRu: "сити",
    onyomiRomaji: "SHICHI",
    strokes: 2,
    mnemonic: "Семь пальцев (5 на одной руке + 2 на другой).",
    category: "Числа",
    examples: [
      { word: "七つ", reading: "ななつ", readingRu: "нанацу", translation: "семь штук" },
      { word: "七月", reading: "しちがつ", readingRu: "ситигацу", translation: "июль" },
      { word: "七日", reading: "なのか", readingRu: "нанока", translation: "седьмое число" },
      { word: "七夕", reading: "たなばた", readingRu: "танабата", translation: "праздник Танабата (7 июля)" }
    ]
  },
  {
    id: 18,
    kanji: "八",
    lesson: 2,
    meaning: "восемь",
    meaningsAlt: ["восьмёрка"],
    kunyomi: "やっ-つ",
    kunyomiRu: "яццу",
    kunyomiRomaji: "yattsu",
    onyomi: "ハチ",
    onyomiRu: "хати",
    onyomiRomaji: "HACHI",
    strokes: 2,
    mnemonic: "Восемь пальцев (4+4) или расходящиеся стороны горы Фудзи.",
    category: "Числа",
    examples: [
      { word: "八つ", reading: "やっつ", readingRu: "яццу", translation: "восемь штук" },
      { word: "八月", reading: "はちがつ", readingRu: "хатигацу", translation: "август" },
      { word: "八日", reading: "ようか", readingRu: "ё:ка", translation: "восьмое число" },
      { word: "八百屋", reading: "やおや", readingRu: "яоя", translation: "овощная лавка" }
    ]
  },
  {
    id: 19,
    kanji: "九",
    lesson: 2,
    meaning: "девять",
    meaningsAlt: ["девятка"],
    kunyomi: "ここの-つ",
    kunyomiRu: "коконоцу",
    kunyomiRomaji: "kokonotsu",
    onyomi: "キュウ / ク",
    onyomiRu: "кю: / ку",
    onyomiRomaji: "KYUU / KU",
    strokes: 2,
    mnemonic: "Изогнутый человек, согнувший руку в знаке девяти.",
    category: "Числа",
    examples: [
      { word: "九つ", reading: "ここのつ", readingRu: "коконоцу", translation: "девять штук" },
      { word: "九月", reading: "くがつ", readingRu: "кугацу", translation: "сентябрь" },
      { word: "九日", reading: "ここのか", readingRu: "коконока", translation: "девятое число" },
      { word: "九州", reading: "きゅうしゅう", readingRu: "кю:сю:", translation: "остров Кюсю" }
    ]
  },
  {
    id: 20,
    kanji: "十",
    lesson: 2,
    meaning: "десять",
    meaningsAlt: ["десятка"],
    kunyomi: "とお",
    kunyomiRu: "то:",
    kunyomiRomaji: "too",
    onyomi: "ジュウ",
    onyomiRu: "дзю:",
    onyomiRomaji: "JUU",
    strokes: 2,
    mnemonic: "Перекрещенные руки (5+5 пальцев образуют крест десяти).",
    category: "Числа",
    examples: [
      { word: "十", reading: "とお / じゅう", readingRu: "то: / дзю:", translation: "десять" },
      { word: "十月", reading: "じゅうがつ", readingRu: "дзю:гацу", translation: "октябрь" },
      { word: "十日", reading: "とおか", readingRu: "то:ка", translation: "десятое число" },
      { word: "十分", reading: "じゅうぶん", readingRu: "дзю:бун", translation: "достаточно" }
    ]
  },

  // ── УРОК 3: Пространство, меры и величины (10 кандзи) ──
  {
    id: 21,
    kanji: "年",
    lesson: 3,
    meaning: "год",
    meaningsAlt: ["возраст"],
    kunyomi: "とし",
    kunyomiRu: "тоси",
    kunyomiRomaji: "toshi",
    onyomi: "ネン",
    onyomiRu: "нэн",
    onyomiRomaji: "NEN",
    strokes: 6,
    mnemonic: "Ежегодный урожай зерна, складываемый в амбар в конце года.",
    category: "Время",
    examples: [
      { word: "年", reading: "とし", readingRu: "тоси", translation: "год, возраст" },
      { word: "今年", reading: "ことし", readingRu: "котоси", translation: "этот год" },
      { word: "去年", reading: "きょねん", readingRu: "кёнэн", translation: "прошлый год" },
      { word: "来年", reading: "らいねん", readingRu: "райнэн", translation: "следующий год" }
    ]
  },
  {
    id: 22,
    kanji: "上",
    lesson: 3,
    meaning: "верх",
    meaningsAlt: ["над", "подниматься", "наверху"],
    kunyomi: "うえ / あ-がる",
    kunyomiRu: "уэ / агару",
    kunyomiRomaji: "ue / agaru",
    onyomi: "ジョウ",
    onyomiRu: "дзё:",
    onyomiRomaji: "JOU",
    strokes: 3,
    mnemonic: "Точка или вертикаль, расположенная выше опорной черты горизонта.",
    category: "Пространство",
    examples: [
      { word: "上", reading: "うえ", readingRu: "уэ", translation: "верх, наверху" },
      { word: "上がる", reading: "あがる", readingRu: "агару", translation: "подниматься" },
      { word: "上手", reading: "じょうず", readingRu: "дзё:дзу", translation: "умелый, искусный" },
      { word: "屋上", reading: "おくじょう", readingRu: "окудзё:", translation: "крыша" }
    ]
  },
  {
    id: 23,
    kanji: "下",
    lesson: 3,
    meaning: "низ",
    meaningsAlt: ["под", "опускаться", "внизу"],
    kunyomi: "した / さ-がる",
    kunyomiRu: "сита / сагару",
    kunyomiRomaji: "shita / sagaru",
    onyomi: "ゲ / カ",
    onyomiRu: "гэ / ка",
    onyomiRomaji: "GE / KA",
    strokes: 3,
    mnemonic: "Точка или вертикаль, расположенная ниже опорной черты горизонта.",
    category: "Пространство",
    examples: [
      { word: "下", reading: "した", readingRu: "сита", translation: "низ, под" },
      { word: "下がる", reading: "さがる", readingRu: "сагару", translation: "опускаться" },
      { word: "下手", reading: "へた", readingRu: "хэта", translation: "неумелый" },
      { word: "地下鉄", reading: "ちかてつ", readingRu: "тикатэцу", translation: "метро" }
    ]
  },
  {
    id: 24,
    kanji: "中",
    lesson: 3,
    meaning: "середина",
    meaningsAlt: ["внутри", "центр"],
    kunyomi: "なか",
    kunyomiRu: "нака",
    kunyomiRomaji: "naka",
    onyomi: "チュウ",
    onyomiRu: "тю:",
    onyomiRomaji: "CHUU",
    strokes: 4,
    mnemonic: "Стрела, пронзающая самый центр круглой или квадратной мишени.",
    category: "Пространство",
    examples: [
      { word: "中", reading: "なか", readingRu: "нака", translation: "внутри, середина" },
      { word: "一日中", reading: "いちにちじゅう", readingRu: "итиничидзю:", translation: "целый день" },
      { word: "中国", reading: "ちゅうごく", readingRu: "тю:гоку", translation: "Китай" },
      { word: "中学校", reading: "ちゅうがっこう", readingRu: "тю:гакко:", translation: "средняя школа" }
    ]
  },
  {
    id: 25,
    kanji: "大",
    lesson: 3,
    meaning: "большой",
    meaningsAlt: ["великий", "крупный"],
    kunyomi: "おお-きい",
    kunyomiRu: "оокий",
    kunyomiRomaji: "ookii",
    onyomi: "ダイ / タイ",
    onyomiRu: "дай / тай",
    onyomiRomaji: "DAI / TAI",
    strokes: 3,
    mnemonic: "Человек, широко раскинувший руки и ноги: «Вот такой большой!».",
    category: "Свойства",
    examples: [
      { word: "大きい", reading: "おおきい", readingRu: "оокий", translation: "большой" },
      { word: "大学", reading: "だいがく", readingRu: "дайгаку", translation: "университет" },
      { word: "大人", reading: "おとな", readingRu: "отона", translation: "взрослый" },
      { word: "大変", reading: "たいへん", readingRu: "тайхэн", translation: "трудный, ужасно" }
    ]
  },
  {
    id: 26,
    kanji: "小",
    lesson: 3,
    meaning: "маленький",
    meaningsAlt: ["мелкий"],
    kunyomi: "ちい-さい",
    kunyomiRu: "тиисай",
    kunyomiRomaji: "chiisai",
    onyomi: "ショウ",
    onyomiRu: "сё:",
    onyomiRomaji: "SHOU",
    strokes: 3,
    mnemonic: "Маленький раздвоенный росток или крохотные песчинки.",
    category: "Свойства",
    examples: [
      { word: "小さい", reading: "ちいさい", readingRu: "тиисай", translation: "маленький" },
      { word: "小学校", reading: "しょうがっこう", readingRu: "сё:гакко:", translation: "начальная школа" },
      { word: "小川", reading: "おがわ", readingRu: "огава", translation: "ручей" },
      { word: "小鳥", reading: "ことり", readingRu: "котори", translation: "птичка" }
    ]
  },
  {
    id: 27,
    kanji: "本",
    lesson: 3,
    meaning: "книга",
    meaningsAlt: ["основа", "источник", "корень"],
    kunyomi: "もと",
    kunyomiRu: "мото",
    kunyomiRomaji: "moto",
    onyomi: "ホン",
    onyomiRu: "хон",
    onyomiRomaji: "HON",
    strokes: 5,
    mnemonic: "Дерево (木) с чертой у основания, указывающей на его корень и исток.",
    category: "Предметы",
    examples: [
      { word: "本", reading: "ほん", readingRu: "хон", translation: "книга" },
      { word: "日本", reading: "にほん", readingRu: "нихон", translation: "Япония (источник солнца)" },
      { word: "本人", reading: "ほんにん", readingRu: "хоннин", translation: "сам человек" },
      { word: "本屋", reading: "ほんや", readingRu: "хоня", translation: "книжный магазин" }
    ]
  },
  {
    id: 28,
    kanji: "半",
    lesson: 3,
    meaning: "половина",
    meaningsAlt: ["полу-"],
    kunyomi: "なか-ば",
    kunyomiRu: "накаба",
    kunyomiRomaji: "nakaba",
    onyomi: "ハン",
    onyomiRu: "хан",
    onyomiRomaji: "HAN",
    strokes: 5,
    mnemonic: "Рассечение предмета вертикальной чертой ровно на две половины.",
    category: "Меры",
    examples: [
      { word: "半分", reading: "はんぶん", readingRu: "ханбун", translation: "половина" },
      { word: "三時半", reading: "さんじはん", readingRu: "сандзихан", translation: "полчетвёртого (3:30)" },
      { word: "半年", reading: "はんとし / はんねん", readingRu: "хантоси / ханнэн", translation: "полгода" }
    ]
  },
  {
    id: 29,
    kanji: "分",
    lesson: 3,
    meaning: "доля",
    meaningsAlt: ["минута", "делить", "понимать", "процент"],
    kunyomi: "わ-ける / わ-かる",
    kunyomiRu: "вакэру / вакару",
    kunyomiRomaji: "wakeru / wakaru",
    onyomi: "フン / ブン",
    onyomiRu: "фун / бун",
    onyomiRomaji: "FUN / BUN",
    strokes: 4,
    mnemonic: "Острый нож (刀), разделяющий целое на две ровные части (八).",
    category: "Меры",
    examples: [
      { word: "五分", reading: "ごふん", readingRu: "гофун", translation: "пять минут" },
      { word: "分かる", reading: "わかる", readingRu: "вакару", translation: "понимать" },
      { word: "分ける", reading: "わける", readingRu: "вакэру", translation: "разделять" },
      { word: "自分", reading: "じぶん", readingRu: "дзибун", translation: "сам, себя" }
    ]
  },
  {
    id: 30,
    kanji: "力",
    lesson: 3,
    meaning: "сила",
    meaningsAlt: ["мощь", "энергия"],
    kunyomi: "ちから",
    kunyomiRu: "тикара",
    kunyomiRomaji: "chikara",
    onyomi: "リョク / リキ",
    onyomiRu: "рёку / рики",
    onyomiRomaji: "RYOKU / RIKI",
    strokes: 2,
    mnemonic: "Согнутая сильная мускулистая рука со сжатым кулаком.",
    category: "Качества",
    examples: [
      { word: "力", reading: "ちから", readingRu: "тикара", translation: "сила, физическая мощь" },
      { word: "馬力", reading: "ばりき", readingRu: "барики", translation: "лошадиная сила" },
      { word: "体力", reading: "たいりょく", readingRu: "тайрёку", translation: "физическая выносливость" },
      { word: "全力", reading: "ぜんりょく", readingRu: "дзэнрёку", translation: "изо всех сил" }
    ]
  },

  // ── УРОК 4: Человек, природа и ассоциации (10 кандзи) ──
  {
    id: 31,
    kanji: "明",
    lesson: 4,
    meaning: "светлый",
    meaningsAlt: ["ясный"],
    kunyomi: "あか-るい",
    kunyomiRu: "акаруй",
    kunyomiRomaji: "akarui",
    onyomi: "メイ",
    onyomiRu: "мэй",
    onyomiRomaji: "MEI",
    strokes: 8,
    mnemonic: "Солнце (日) и луна (月) рядом — вместе они дают ярчайший свет.",
    category: "Свойства",
    examples: [
      { word: "明るい", reading: "あかるい", readingRu: "акаруй", translation: "светлый, жизнерадостный" },
      { word: "明日", reading: "あした / みょうにち", readingRu: "асита / мё:нити", translation: "завтра" },
      { word: "説明", reading: "せつめい", readingRu: "сэцумэй", translation: "объяснение" },
      { word: "発明", reading: "はつめい", readingRu: "хацумэй", translation: "изобретение" }
    ]
  },
  {
    id: 32,
    kanji: "休",
    lesson: 4,
    meaning: "отдых",
    meaningsAlt: ["отдыхать", "выходной"],
    kunyomi: "やす-む",
    kunyomiRu: "ясуму",
    kunyomiRomaji: "yasumu",
    onyomi: "キュウ",
    onyomiRu: "кю:",
    onyomiRomaji: "KYUU",
    strokes: 6,
    mnemonic: "Человек (亻), прислонившийся к стволу дерева (木) для отдыха в тени.",
    category: "Действия",
    examples: [
      { word: "休む", reading: "やすむ", readingRu: "ясуму", translation: "отдыхать, пропускать" },
      { word: "休み", reading: "やすみ", readingRu: "ясуми", translation: "отдых, каникулы, выходной" },
      { word: "休日", reading: "きゅうじつ", readingRu: "кю:дзицу", translation: "выходной день" },
      { word: "夏休み", reading: "なつやすみ", readingRu: "нацуясуми", translation: "летние каникулы" }
    ]
  },
  {
    id: 33,
    kanji: "体",
    lesson: 4,
    meaning: "тело",
    meaningsAlt: ["организм", "физическое состояние"],
    kunyomi: "からだ",
    kunyomiRu: "карада",
    kunyomiRomaji: "karada",
    onyomi: "タイ",
    onyomiRu: "тай",
    onyomiRomaji: "TAI",
    strokes: 7,
    mnemonic: "Основа (本) каждого человека (亻) — это его физическое тело.",
    category: "Тело",
    examples: [
      { word: "体", reading: "からだ", readingRu: "карада", translation: "тело, организм, здоровье" },
      { word: "体力", reading: "たいりょく", readingRu: "тайрёку", translation: "физическая сила" },
      { word: "体操", reading: "たいそう", readingRu: "тайсо:", translation: "гимнастика, зарядка" },
      { word: "体重", reading: "たいじゅう", readingRu: "тайдзю:", translation: "вес тела" }
    ]
  },
  {
    id: 34,
    kanji: "好",
    lesson: 4,
    meaning: "нравиться",
    meaningsAlt: ["любить", "любимый"],
    kunyomi: "す-き",
    kunyomiRu: "суки",
    kunyomiRomaji: "suki",
    onyomi: "コウ",
    onyomiRu: "ко:",
    onyomiRomaji: "KOU",
    strokes: 6,
    mnemonic: "Женщина-мать (女) с любовью обнимает своего ребёнка (子).",
    category: "Чувства",
    examples: [
      { word: "好き", reading: "すき", readingRu: "суки", translation: "любимый, нравиться" },
      { word: "大好きな", reading: "だいすきな", readingRu: "дайсуки-на", translation: "обожаемый, самый любимый" },
      { word: "好物", reading: "こうぶつ", readingRu: "ко:буцу", translation: "любимое блюдо" },
      { word: "友好", reading: "ゆうこう", readingRu: "ю:ко:", translation: "дружба" }
    ]
  },
  {
    id: 35,
    kanji: "男",
    lesson: 4,
    meaning: "мужчина",
    meaningsAlt: ["мужской пол"],
    kunyomi: "おとこ",
    kunyomiRu: "отоко",
    kunyomiRomaji: "otoko",
    onyomi: "ダン / ナン",
    onyomiRu: "дан / нан",
    onyomiRomaji: "DAN / NAN",
    strokes: 7,
    mnemonic: "Тот, кто прикладывает богатырскую силу (力) на рисовом поле (田).",
    category: "Человек",
    examples: [
      { word: "男", reading: "おとこ", readingRu: "отоко", translation: "мужчина" },
      { word: "男性", reading: "だんせい", readingRu: "дансэй", translation: "мужчина, мужской пол" },
      { word: "男の子", reading: "おとこのこ", readingRu: "отоко-но-ко", translation: "мальчик" },
      { word: "長男", reading: "ちょうなん", readingRu: "тё:нан", translation: "старший сын" }
    ]
  },
  {
    id: 36,
    kanji: "林",
    lesson: 4,
    meaning: "роща",
    meaningsAlt: ["лесок"],
    kunyomi: "はやし",
    kunyomiRu: "хаяси",
    kunyomiRomaji: "hayashi",
    onyomi: "リン",
    onyomiRu: "рин",
    onyomiRomaji: "RIN",
    strokes: 8,
    mnemonic: "Два стоящих рядом дерева (木 + 木) образуют рощу.",
    category: "Природа",
    examples: [
      { word: "林", reading: "はやし", readingRu: "хаяси", translation: "роща, лесок" },
      { word: "山林", reading: "さんりん", readingRu: "санрин", translation: "горный лес" },
      { word: "森林", reading: "しんりん", readingRu: "синрин", translation: "лесной массив, тайга" }
    ]
  },
  {
    id: 37,
    kanji: "森",
    lesson: 4,
    meaning: "лес",
    meaningsAlt: ["густой лес", "деревья"],
    kunyomi: "もり",
    kunyomiRu: "мори",
    kunyomiRomaji: "mori",
    onyomi: "シン",
    onyomiRu: "син",
    onyomiRomaji: "SHIN",
    strokes: 12,
    mnemonic: "А целых три дерева вместе (木 + 木 + 木) — это уже дремучий лес!",
    category: "Природа",
    examples: [
      { word: "森", reading: "もり", readingRu: "мори", translation: "густой лес, чаща" },
      { word: "森林", reading: "しんりん", readingRu: "синрин", translation: "леса, лесной массив" },
      { word: "青森", reading: "あおもり", readingRu: "аомори", translation: "Аомори (префектура)" }
    ]
  },
  {
    id: 38,
    kanji: "間",
    lesson: 4,
    meaning: "между",
    meaningsAlt: ["промежуток", "время", "комната"],
    kunyomi: "あいだ / ま",
    kunyomiRu: "айда / ма",
    kunyomiRomaji: "aida / ma",
    onyomi: "カン",
    onyomiRu: "кан",
    onyomiRomaji: "KAN",
    strokes: 12,
    mnemonic: "Солнце (日), пробивающееся сквозь створки ворот (門) в промежуток дня.",
    category: "Пространство",
    examples: [
      { word: "間", reading: "あいだ", readingRu: "айда", translation: "между, промежуток" },
      { word: "時間", reading: "じかん", readingRu: "дзикан", translation: "время, час" },
      { word: "人間", reading: "にんげん", readingRu: "нингэн", translation: "человек, человечество" },
      { word: "一週間", reading: "いっしゅうかん", readingRu: "иссю:кан", translation: "одна неделя" }
    ]
  },
  {
    id: 39,
    kanji: "畑",
    lesson: 4,
    meaning: "поле обработанное",
    meaningsAlt: ["огород", "пашня"],
    kunyomi: "はたけ",
    kunyomiRu: "хатакэ",
    kunyomiRomaji: "hatake",
    onyomi: "-",
    onyomiRu: "-",
    onyomiRomaji: "-",
    strokes: 9,
    mnemonic: "Сожги огнем (火) сухую траву на поле (田) — и получишь вспаханный огород.",
    category: "Природа",
    examples: [
      { word: "畑", reading: "はたけ", readingRu: "хатакэ", translation: "обработанное поле, огород" },
      { word: "花畑", reading: "はなばたけ", readingRu: "ханабатакэ", translation: "цветочное поле" },
      { word: "田畑", reading: "たはた", readingRu: "тахата", translation: "поля и огороды" }
    ]
  },
  {
    id: 40,
    kanji: "岩",
    lesson: 4,
    meaning: "скала",
    meaningsAlt: ["утёс", "каменная глыба"],
    kunyomi: "いわ",
    kunyomiRu: "ива",
    kunyomiRomaji: "iwa",
    onyomi: "ガン",
    onyomiRu: "ган",
    onyomiRomaji: "GAN",
    strokes: 8,
    mnemonic: "Гора (山), сложенная из твердого камня (石) — это скала.",
    category: "Природа",
    examples: [
      { word: "岩", reading: "いわ", readingRu: "ива", translation: "скала, утёс" },
      { word: "岩石", reading: "がんせき", readingRu: "гансэки", translation: "горная порода" },
      { word: "溶岩", reading: "ようがん", readingRu: "ё:ган", translation: "лава" }
    ]
  },

  // ── УРОК 5: Тело, природа и материалы (10 кандзи) ──
  {
    id: 41,
    kanji: "目",
    lesson: 5,
    meaning: "глаз",
    meaningsAlt: ["взгляд", "пункт"],
    kunyomi: "め",
    kunyomiRu: "мэ",
    kunyomiRomaji: "me",
    onyomi: "モク",
    onyomiRu: "моку",
    onyomiRomaji: "MOKU",
    strokes: 5,
    mnemonic: "Вертикальный разрез человеческого глаза с радужкой и веками.",
    category: "Тело",
    examples: [
      { word: "目", reading: "め", readingRu: "мэ", translation: "глаз, взгляд" },
      { word: "目薬", reading: "めぐすり", readingRu: "мэгусури", translation: "глазные капли" },
      { word: "目的", reading: "もくてき", readingRu: "мокутэки", translation: "цель" },
      { word: "科目", reading: "かもく", readingRu: "камоку", translation: "учебный предмет" }
    ]
  },
  {
    id: 42,
    kanji: "耳",
    lesson: 5,
    meaning: "ухо",
    meaningsAlt: ["слух"],
    kunyomi: "みみ",
    kunyomiRu: "мими",
    kunyomiRomaji: "mimi",
    onyomi: "ジ",
    onyomiRu: "дзи",
    onyomiRomaji: "JI",
    strokes: 6,
    mnemonic: "Рисунок ушной раковины с завитками и мочкой.",
    category: "Тело",
    examples: [
      { word: "耳", reading: "みみ", readingRu: "мими", translation: "ухо, слух" },
      { word: "耳鼻科", reading: "じびか", readingRu: "дзибика", translation: "лор-отделение (ухо-горло-нос)" }
    ]
  },
  {
    id: 43,
    kanji: "手",
    lesson: 5,
    meaning: "рука",
    meaningsAlt: ["кисть руки", "мастерство"],
    kunyomi: "て",
    kunyomiRu: "тэ",
    kunyomiRomaji: "te",
    onyomi: "シュ",
    onyomiRu: "сю",
    onyomiRomaji: "SHU",
    strokes: 4,
    mnemonic: "Ладонь с растопыренными пальцами и запястьем.",
    category: "Тело",
    examples: [
      { word: "手", reading: "て", readingRu: "тэ", translation: "рука, кисть" },
      { word: "手紙", reading: "てがみ", readingRu: "тэгами", translation: "письмо" },
      { word: "歌手", reading: "かしゅ", readingRu: "касю", translation: "певец" },
      { word: "切手", reading: "きって", readingRu: "киттэ", translation: "почтовая марка" }
    ]
  },
  {
    id: 44,
    kanji: "足",
    lesson: 5,
    meaning: "нога",
    meaningsAlt: ["ступня", "хватать", "добавлять"],
    kunyomi: "あし / た-りる",
    kunyomiRu: "аси / тариру",
    kunyomiRomaji: "ashi / tariru",
    onyomi: "ソク",
    onyomiRu: "соку",
    onyomiRomaji: "SOKU",
    strokes: 7,
    mnemonic: "Колено и ступня человека, ступающего по земле.",
    category: "Тело",
    examples: [
      { word: "足", reading: "あし", readingRu: "аси", translation: "нога, ступня" },
      { word: "足りる", reading: "たりる", readingRu: "тариру", translation: "быть достаточным, хватать" },
      { word: "足す", reading: "たす", readingRu: "тасу", translation: "прибавлять" },
      { word: "一足", reading: "いっそく", readingRu: "иссоку", translation: "одна пара (обуви)" }
    ]
  },
  {
    id: 45,
    kanji: "雨",
    lesson: 5,
    meaning: "дождь",
    meaningsAlt: ["ливень", "осадки"],
    kunyomi: "あめ",
    kunyomiRu: "амэ",
    kunyomiRomaji: "ame",
    onyomi: "ウ",
    onyomiRu: "у",
    onyomiRomaji: "U",
    strokes: 8,
    mnemonic: "Небесный свод (一), грозовая туча (冂) и капли дождя (⺀⺀).",
    category: "Природа",
    examples: [
      { word: "雨", reading: "あめ", readingRu: "амэ", translation: "дождь" },
      { word: "大雨", reading: "おおあめ", readingRu: "ооамэ", translation: "ливень" },
      { word: "雨期", reading: "うき", readingRu: "уки", translation: "сезон дождей" },
      { word: "梅雨", reading: "つゆ / ばいう", readingRu: "цую / байу", translation: "сезон дождей в июне" }
    ]
  },
  {
    id: 46,
    kanji: "竹",
    lesson: 5,
    meaning: "бамбук",
    meaningsAlt: ["бамбуковый стебель"],
    kunyomi: "たけ",
    kunyomiRu: "такэ",
    kunyomiRomaji: "take",
    onyomi: "チク",
    onyomiRu: "тику",
    onyomiRomaji: "CHIKU",
    strokes: 6,
    mnemonic: "Два гибких бамбуковых побега с заостренными листочками.",
    category: "Природа",
    examples: [
      { word: "竹", reading: "たけ", readingRu: "такэ", translation: "бамбук" },
      { word: "竹の子", reading: "たけのこ", readingRu: "такэноко", translation: "побег бамбука" },
      { word: "竹林", reading: "ちくりん", readingRu: "тикурин", translation: "бамбуковая роща" }
    ]
  },
  {
    id: 47,
    kanji: "米",
    lesson: 5,
    meaning: "рис",
    meaningsAlt: ["Америка"],
    kunyomi: "こめ",
    kunyomiRu: "комэ",
    kunyomiRomaji: "kome",
    onyomi: "マイ / ベイ",
    onyomiRu: "май / бэй",
    onyomiRomaji: "MAI / BEI",
    strokes: 6,
    mnemonic: "Рисовые зернышки, рассыпанные во все стороны от стебелька.",
    category: "Еда",
    examples: [
      { word: "米", reading: "こめ", readingRu: "комэ", translation: "сырой рис" },
      { word: "米国", reading: "べいこく", readingRu: "бэйкоку", translation: "США (Америка)" },
      { word: "新米", reading: "しんまい", readingRu: "синмай", translation: "рис нового урожая, новичок" },
      { word: "北米", reading: "ほくべい", readingRu: "хокубэй", translation: "Северная Америка" }
    ]
  },
  {
    id: 48,
    kanji: "貝",
    lesson: 5,
    meaning: "раковина",
    meaningsAlt: ["моллюск", "каури (древние деньги)"],
    kunyomi: "かい",
    kunyomiRu: "кай",
    kunyomiRomaji: "kai",
    onyomi: "バイ",
    onyomiRu: "бай",
    onyomiRomaji: "BAI",
    strokes: 7,
    mnemonic: "Морская раковина с выглядывающими щупальцами моллюска.",
    category: "Природа",
    examples: [
      { word: "貝", reading: "かい", readingRu: "кай", translation: "раковина, моллюск" },
      { word: "貝がら", reading: "かいがら", readingRu: "кайгара", translation: "створка ракушки" }
    ]
  },
  {
    id: 49,
    kanji: "石",
    lesson: 5,
    meaning: "камень",
    meaningsAlt: ["булыжник"],
    kunyomi: "いし",
    kunyomiRu: "иси",
    kunyomiRomaji: "ishi",
    onyomi: "セキ",
    onyomiRu: "сэки",
    onyomiRomaji: "SEKI",
    strokes: 5,
    mnemonic: "Округлый камень (口), лежащий у подножия крутого обрыва (厂).",
    category: "Природа",
    examples: [
      { word: "石", reading: "いし", readingRu: "иси", translation: "камень" },
      { word: "石油", reading: "せきゆ", readingRu: "сэкию", translation: "нефть (каменное масло)" },
      { word: "石けん", reading: "せっけん", readingRu: "сэккэн", translation: "мыло" },
      { word: "磁石", reading: "じしゃく", readingRu: "дзисяку", translation: "магнит" }
    ]
  },
  {
    id: 50,
    kanji: "糸",
    lesson: 5,
    meaning: "нить",
    meaningsAlt: ["пряжа", "струна"],
    kunyomi: "いと",
    kunyomiRu: "ито",
    kunyomiRomaji: "ito",
    onyomi: "シ",
    onyomiRu: "си",
    onyomiRomaji: "SHI",
    strokes: 6,
    mnemonic: "Моток шелковых нитей со свисающими тонкими волокнами.",
    category: "Предметы",
    examples: [
      { word: "糸", reading: "いと", readingRu: "ито", translation: "нить, струна" },
      { word: "毛糸", reading: "けいと", readingRu: "кэйто", translation: "шерстяная пряжа" }
    ]
  },

  // ── УРОК 6: Еда, культура, животные и предметы (10 кандзи) ──
  {
    id: 51,
    kanji: "花",
    lesson: 6,
    meaning: "цветок",
    meaningsAlt: ["цветение"],
    kunyomi: "はな",
    kunyomiRu: "хана",
    kunyomiRomaji: "hana",
    onyomi: "カ",
    onyomiRu: "ка",
    onyomiRomaji: "KA",
    strokes: 7,
    mnemonic: "Трава (艹), которая преображается (化) в прекрасный цветок.",
    category: "Природа",
    examples: [
      { word: "花", reading: "はな", readingRu: "хана", translation: "цветок" },
      { word: "花火", reading: "はなび", readingRu: "ханаби", translation: "фейерверк (огненный цветок)" },
      { word: "花びん", reading: "かびん", readingRu: "кабин", translation: "ваза для цветов" },
      { word: "花見", reading: "はなみ", readingRu: "ханами", translation: "любование сакурой" }
    ]
  },
  {
    id: 52,
    kanji: "茶",
    lesson: 6,
    meaning: "чай",
    meaningsAlt: ["чайный лист"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "チャ / サ",
    onyomiRu: "тя / са",
    onyomiRomaji: "CHA / SA",
    strokes: 9,
    mnemonic: "Чайные листья на крыше сушильни над чайным деревянным помостом.",
    category: "Еда",
    examples: [
      { word: "お茶", reading: "おちゃ", readingRu: "отя", translation: "зелёный чай" },
      { word: "日本茶", reading: "にほんちゃ", readingRu: "нихонтя", translation: "японский чай" },
      { word: "紅茶", reading: "こうちゃ", readingRu: "ко:тя", translation: "чёрный чай" },
      { word: "喫茶店", reading: "きっさてん", readingRu: "киссатэн", translation: "чайная, кафе" }
    ]
  },
  {
    id: 53,
    kanji: "肉",
    lesson: 6,
    meaning: "мясо",
    meaningsAlt: ["плоть", "мякоть"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "ニク",
    onyomiRu: "нику",
    onyomiRomaji: "NIKU",
    strokes: 6,
    mnemonic: "Кусок сочного мяса с волокнами и прожилками внутри контура.",
    category: "Еда",
    examples: [
      { word: "肉", reading: "にく", readingRu: "нику", translation: "мясо, мякоть" },
      { word: "牛肉", reading: "ぎゅうにく", readingRu: "гю:нику", translation: "говядина" },
      { word: "鳥肉", reading: "とりにく", readingRu: "торинику", translation: "курятина, птица" },
      { word: "肉体", reading: "にくたい", readingRu: "никутай", translation: "тело, плоть" }
    ]
  },
  {
    id: 54,
    kanji: "文",
    lesson: 6,
    meaning: "литература",
    meaningsAlt: ["письменность", "текст", "предложение"],
    kunyomi: "ふみ",
    kunyomiRu: "фуми",
    kunyomiRomaji: "fumi",
    onyomi: "ブン / モン",
    onyomiRu: "бун / мон",
    onyomiRomaji: "BUN / MON",
    strokes: 4,
    mnemonic: "Узорная татуировка или древний знак, ставший основой письменности.",
    category: "Культура",
    examples: [
      { word: "文", reading: "ぶん", readingRu: "бун", translation: "письменность, предложение" },
      { word: "文学", reading: "ぶんがく", readingRu: "бунгаку", translation: "литература" },
      { word: "文部省", reading: "もんぶしょう", readingRu: "монбусё:", translation: "министерство образования" },
      { word: "作文", reading: "さくぶん", readingRu: "сакубун", translation: "сочинение" }
    ]
  },
  {
    id: 55,
    kanji: "字",
    lesson: 6,
    meaning: "иероглиф",
    meaningsAlt: ["буква", "знак"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "ジ",
    onyomiRu: "дзи",
    onyomiRomaji: "JI",
    strokes: 6,
    mnemonic: "Ребенок (子) под крышей дома (宀), постигающий первые буквы.",
    category: "Культура",
    examples: [
      { word: "字", reading: "じ", readingRu: "дзи", translation: "иероглиф, буква" },
      { word: "漢字", reading: "かんじ", readingRu: "кандзи", translation: "японские иероглифы (знаки Хань)" },
      { word: "文字", reading: "もじ", readingRu: "модзи", translation: "письменные знаки, буквы" },
      { word: "ローマ字", reading: "ローマじ", readingRu: "ро:мадзи", translation: "латиница (ромадзи)" }
    ]
  },
  {
    id: 56,
    kanji: "物",
    lesson: 6,
    meaning: "вещь",
    meaningsAlt: ["предмет", "нечто"],
    kunyomi: "もの",
    kunyomiRu: "моно",
    kunyomiRomaji: "mono",
    onyomi: "ブツ / モツ",
    onyomiRu: "буцу / моцу",
    onyomiRomaji: "BUTSU / MOTSU",
    strokes: 8,
    mnemonic: "Пестрая корова (牛) и флажок (勿) — обозначение овеществленного мира.",
    category: "Предметы",
    examples: [
      { word: "物", reading: "もの", readingRu: "моно", translation: "вещь, предмет" },
      { word: "食べ物", reading: "たべもの", readingRu: "табэмоно", translation: "еда, пища" },
      { word: "飲み物", reading: "のみもの", readingRu: "номимоно", translation: "напиток" },
      { word: "買い物", reading: "かいもの", readingRu: "каймоно", translation: "покупки" },
      { word: "荷物", reading: "にもつ", readingRu: "нимоцу", translation: "багаж, вещи" }
    ]
  },
  {
    id: 57,
    kanji: "牛",
    lesson: 6,
    meaning: "корова",
    meaningsAlt: ["бык"],
    kunyomi: "うし",
    kunyomiRu: "уси",
    kunyomiRomaji: "ushi",
    onyomi: "ギュウ",
    onyomiRu: "гю:",
    onyomiRomaji: "GYUU",
    strokes: 4,
    mnemonic: "Голова быка с крутыми рогами и мордой.",
    category: "Животные",
    examples: [
      { word: "牛", reading: "うし", readingRu: "уси", translation: "бык, корова" },
      { word: "牛肉", reading: "ぎゅうにく", readingRu: "гю:нику", translation: "говядина" },
      { word: "牛乳", reading: "ぎゅうにゅう", readingRu: "гю:ню:", translation: "коровье молоко" },
      { word: "子牛", reading: "こうし", readingRu: "коуси", translation: "телёнок" }
    ]
  },
  {
    id: 58,
    kanji: "馬",
    lesson: 6,
    meaning: "лошадь",
    meaningsAlt: ["конь"],
    kunyomi: "うま",
    kunyomiRu: "ума",
    kunyomiRomaji: "uma",
    onyomi: "バ",
    onyomiRu: "ба",
    onyomiRomaji: "BA",
    strokes: 10,
    mnemonic: "Конь с развивающейся гривой и четырьмя быстрыми ногами (灬).",
    category: "Животные",
    examples: [
      { word: "馬", reading: "うま", readingRu: "ума", translation: "лошадь, конь" },
      { word: "馬力", reading: "ばりき", readingRu: "барики", translation: "лошадиная сила" },
      { word: "馬車", reading: "ばしゃ", readingRu: "бася", translation: "повозка, экипаж" },
      { word: "乗馬", reading: "じょうば", readingRu: "дзё:ба", translation: "верховая езда" }
    ]
  },
  {
    id: 59,
    kanji: "鳥",
    lesson: 6,
    meaning: "птица",
    meaningsAlt: ["пернатое"],
    kunyomi: "とり",
    kunyomiRu: "тори",
    kunyomiRomaji: "tori",
    onyomi: "チョウ",
    onyomiRu: "тё:",
    onyomiRomaji: "CHOU",
    strokes: 11,
    mnemonic: "Птица с хохолком, острым глазом и перьями хвоста (灬).",
    category: "Животные",
    examples: [
      { word: "鳥", reading: "とり", readingRu: "тори", translation: "птица" },
      { word: "焼き鳥", reading: "やきとり", readingRu: "якитори", translation: "якитори (шашлычки из птицы)" },
      { word: "白鳥", reading: "はくちょう", readingRu: "хакутё:", translation: "лебедь (белая птица)" },
      { word: "小鳥", reading: "ことり", readingRu: "котори", translation: "птичка" }
    ]
  },
  {
    id: 60,
    kanji: "魚",
    lesson: 6,
    meaning: "рыба",
    meaningsAlt: ["рыбный"],
    kunyomi: "さかな / うお",
    kunyomiRu: "сакана / уо",
    kunyomiRomaji: "sakana / uo",
    onyomi: "ギョ",
    onyomiRu: "гё",
    onyomiRomaji: "GYO",
    strokes: 11,
    mnemonic: "Рыба с головой, чешуйчатым телом (田) и хвостом (灬).",
    category: "Животные",
    examples: [
      { word: "魚", reading: "さかな", readingRu: "сакана", translation: "рыба" },
      { word: "焼き魚", reading: "やきざかな", readingRu: "якидзакана", translation: "жареная рыба" },
      { word: "魚屋", reading: "さかなや", readingRu: "саканая", translation: "рыбная лавка" },
      { word: "金魚", reading: "きんぎょ", readingRu: "кингё", translation: "золотая рыбка" }
    ]
  },

  // ── УРОК 7: Качества, признаки и противоположности (10 кандзи) ──
  {
    id: 61,
    kanji: "新",
    lesson: 7,
    meaning: "новый",
    meaningsAlt: ["свежий"],
    kunyomi: "あたら-しい",
    kunyomiRu: "атарасий",
    kunyomiRomaji: "atarashii",
    onyomi: "シン",
    onyomiRu: "син",
    onyomiRomaji: "SHIN",
    strokes: 13,
    mnemonic: "Срубить топором (斤) старое дерево (木), чтобы построить новое.",
    category: "Свойства",
    examples: [
      { word: "新しい", reading: "あたらしい", readingRu: "атарасий", translation: "новый" },
      { word: "新聞", reading: "しんぶん", readingRu: "синбун", translation: "газета (новые вести)" },
      { word: "新車", reading: "しんしゃ", readingRu: "синся", translation: "новый автомобиль" },
      { word: "新年", reading: "しんねん", readingRu: "синнэн", translation: "Новый год" }
    ]
  },
  {
    id: 62,
    kanji: "古",
    lesson: 7,
    meaning: "старый",
    meaningsAlt: ["давний", "древний"],
    kunyomi: "ふる-い",
    kunyomiRu: "фуруй",
    kunyomiRomaji: "furui",
    onyomi: "コ",
    onyomiRu: "ко",
    onyomiRomaji: "KO",
    strokes: 5,
    mnemonic: "Десять (十) поколений передавали предание из уст в уста (口) — оно старое.",
    category: "Свойства",
    examples: [
      { word: "古い", reading: "ふるい", readingRu: "фуруй", translation: "старый, давний" },
      { word: "古本", reading: "ふるほん", readingRu: "фурухон", translation: "старая (подержанная) книга" },
      { word: "中古車", reading: "ちゅうこしゃ", readingRu: "тю:кося", translation: "подержанный автомобиль" }
    ]
  },
  {
    id: 63,
    kanji: "長",
    lesson: 7,
    meaning: "длинный",
    meaningsAlt: ["долгий", "старший", "глава"],
    kunyomi: "なが-い",
    kunyomiRu: "нагаи",
    kunyomiRomaji: "nagai",
    onyomi: "チョウ",
    onyomiRu: "тё:",
    onyomiRomaji: "CHOU",
    strokes: 8,
    mnemonic: "Старец с длинными развевающимися волосами и бородой.",
    category: "Свойства",
    examples: [
      { word: "長い", reading: "ながい", readingRu: "нагаи", translation: "длинный, долгий" },
      { word: "長男", reading: "ちょうなん", readingRu: "тё:нан", translation: "старший сын" },
      { word: "長野", reading: "ながの", readingRu: "нагано", translation: "префектура Нагано" },
      { word: "学長", reading: "がくちょう", readingRu: "гакутё:", translation: "ректор университета" }
    ]
  },
  {
    id: 64,
    kanji: "短",
    lesson: 7,
    meaning: "короткий",
    meaningsAlt: ["краткий"],
    kunyomi: "みじか-い",
    kunyomiRu: "мидзикай",
    kunyomiRomaji: "mijikai",
    onyomi: "タン",
    onyomiRu: "тан",
    onyomiRomaji: "TAN",
    strokes: 12,
    mnemonic: "Стрела (矢), измеренная короткой меркой для бобов (豆).",
    category: "Свойства",
    examples: [
      { word: "短い", reading: "みじかい", readingRu: "мидзикай", translation: "короткий" },
      { word: "短大", reading: "たんだい", readingRu: "тандай", translation: "колледж с укороченным курсом" },
      { word: "短時間", reading: "たんじかん", readingRu: "тандзикан", translation: "короткое время" }
    ]
  },
  {
    id: 65,
    kanji: "高",
    lesson: 7,
    meaning: "высокий",
    meaningsAlt: ["дорогой", "высь"],
    kunyomi: "たか-い",
    kunyomiRu: "такай",
    kunyomiRomaji: "takai",
    onyomi: "コウ",
    onyomiRu: "ко:",
    onyomiRomaji: "KOU",
    strokes: 10,
    mnemonic: "Высокая сторожевая башня со смотровым окном и воротами.",
    category: "Свойства",
    examples: [
      { word: "高い", reading: "たかい", readingRu: "такай", translation: "высокий, дорогой" },
      { word: "高校", reading: "こうこう", readingRu: "ко:ко:", translation: "старшая школа" },
      { word: "高速", reading: "こうそく", readingRu: "ко:соку", translation: "высокоскоростной" },
      { word: "高橋", reading: "たかはし", readingRu: "такахаси", translation: "Такахаси (фамилия)" }
    ]
  },
  {
    id: 66,
    kanji: "安",
    lesson: 7,
    meaning: "дешёвый",
    meaningsAlt: ["спокойный", "безопасный"],
    kunyomi: "やす-い",
    kunyomiRu: "ясуй",
    kunyomiRomaji: "yasui",
    onyomi: "アン",
    onyomiRu: "ан",
    onyomiRomaji: "AN",
    strokes: 6,
    mnemonic: "Женщина (女) дома под надежной крышей (宀) — спокойно и безопасно.",
    category: "Свойства",
    examples: [
      { word: "安い", reading: "やすい", readingRu: "ясуй", translation: "дешёвый, недорогой" },
      { word: "安売り", reading: "やすうり", readingRu: "ясуури", translation: "распродажа по дешевке" },
      { word: "安心", reading: "あんしん", readingRu: "ансин", translation: "душевное спокойствие" },
      { word: "安全", reading: "あんぜん", readingRu: "андзэн", translation: "безопасность" }
    ]
  },
  {
    id: 67,
    kanji: "低",
    lesson: 7,
    meaning: "низкий",
    meaningsAlt: ["невысокий"],
    kunyomi: "ひく-い",
    kunyomiRu: "хикуй",
    kunyomiRomaji: "hikui",
    onyomi: "テイ",
    onyomiRu: "тэй",
    onyomiRomaji: "TEI",
    strokes: 7,
    mnemonic: "Человек (亻), склонившийся низко к земле под бременем.",
    category: "Свойства",
    examples: [
      { word: "低い", reading: "ひくい", readingRu: "хикуй", translation: "низкий, невысокий" },
      { word: "低下", reading: "ていか", readingRu: "тэйка", translation: "падение, понижение" },
      { word: "低温", reading: "ていおん", readingRu: "тэйон", translation: "низкая температура" }
    ]
  },
  {
    id: 68,
    kanji: "暗",
    lesson: 7,
    meaning: "тёмный",
    meaningsAlt: ["мрачный"],
    kunyomi: "くら-い",
    kunyomiRu: "курай",
    kunyomiRomaji: "kurai",
    onyomi: "アン",
    onyomiRu: "ан",
    onyomiRomaji: "AN",
    strokes: 13,
    mnemonic: "Солнце (日) зашло, слышен только звук (音) во тьме ночи.",
    category: "Свойства",
    examples: [
      { word: "暗い", reading: "くらい", readingRu: "курай", translation: "тёмный, сумрачный" },
      { word: "暗室", reading: "あんしつ", readingRu: "ансицу", translation: "тёмная комната (фото)" },
      { word: "暗記", reading: "あんき", readingRu: "анки", translation: "заучивание наизусть" }
    ]
  },
  {
    id: 69,
    kanji: "多",
    lesson: 7,
    meaning: "много",
    meaningsAlt: ["многочисленный"],
    kunyomi: "おお-い",
    kunyomiRu: "оой",
    kunyomiRomaji: "ooi",
    onyomi: "タ",
    onyomiRu: "та",
    onyomiRomaji: "TA",
    strokes: 6,
    mnemonic: "Две сложенные друг на друга луны (夕 + 夕) — это уже много.",
    category: "Свойства",
    examples: [
      { word: "多い", reading: "おおい", readingRu: "оой", translation: "много, многочисленный" },
      { word: "多少", reading: "たしょう", readingRu: "тасё:", translation: "более или менее, немного" },
      { word: "多数", reading: "たすう", readingRu: "тасу:", translation: "большое число, большинство" }
    ]
  },
  {
    id: 70,
    kanji: "少",
    lesson: 7,
    meaning: "мало",
    meaningsAlt: ["немного"],
    kunyomi: "すく-ない / すこ-し",
    kunyomiRu: "сукунай / сукоси",
    kunyomiRomaji: "sukunai / sukoshi",
    onyomi: "ショウ",
    onyomiRu: "сё:",
    onyomiRomaji: "SHOU",
    strokes: 4,
    mnemonic: "От и так маленького (小) отрезали ещё одну черту (丿) — осталось мало.",
    category: "Свойства",
    examples: [
      { word: "少ない", reading: "すくない", readingRu: "сукунай", translation: "мало, недостаточный" },
      { word: "少し", reading: "すこし", readingRu: "сукоси", translation: "немного, чуть-чуть" },
      { word: "少年", reading: "しょうねん", readingRu: "сё:нэн", translation: "мальчик, подросток" },
      { word: "少女", reading: "しょうじょ", readingRu: "сё:дзё", translation: "девочка, девушка" }
    ]
  },

  // ── УРОК 8: Базовые глаголы (10 кандзи) ──
  {
    id: 71,
    kanji: "行",
    lesson: 8,
    meaning: "идти",
    meaningsAlt: ["совершать", "строка"],
    kunyomi: "い-く / おこな-う",
    kunyomiRu: "ику / оконау",
    kunyomiRomaji: "iku / okonau",
    onyomi: "コウ / ギョウ",
    onyomiRu: "ко: / гё:",
    onyomiRomaji: "KOU / GYOU",
    strokes: 6,
    mnemonic: "Перекресток четырех дорог, по которому люди идут во всех направлениях.",
    category: "Глаголы",
    examples: [
      { word: "行く", reading: "いく", readingRu: "ику", translation: "идти, ехать" },
      { word: "行う", reading: "おこなう", readingRu: "оконау", translation: "совершать, проводить" },
      { word: "旅行", reading: "りょこう", readingRu: "рёко:", translation: "путешествие" },
      { word: "～行", reading: "ぎょう", readingRu: "гё:", translation: "строка текста" }
    ]
  },
  {
    id: 72,
    kanji: "来",
    lesson: 8,
    meaning: "приходить",
    meaningsAlt: ["наступать (о времени)", "будущий"],
    kunyomi: "く-る / こ-ない",
    kunyomiRu: "куру / конай",
    kunyomiRomaji: "kuru / konai",
    onyomi: "ライ",
    onyomiRu: "рай",
    onyomiRomaji: "RAI",
    strokes: 7,
    mnemonic: "Колос пшеницы, зерно которого пришло издалека как дар урожая.",
    category: "Глаголы",
    examples: [
      { word: "来る", reading: "くる", readingRu: "куру", translation: "приходить, прибывать" },
      { word: "来年", reading: "らいねん", readingRu: "райнэн", translation: "следующий (будущий) год" },
      { word: "来月", reading: "らいげつ", readingRu: "райгэцу", translation: "следующий месяц" },
      { word: "来日", reading: "らいにち", readingRu: "райнити", translation: "визит в Японию" }
    ]
  },
  {
    id: 73,
    kanji: "帰",
    lesson: 8,
    meaning: "возвращаться",
    meaningsAlt: ["идти домой"],
    kunyomi: "かえ-る",
    kunyomiRu: "каэру",
    kunyomiRomaji: "kaeru",
    onyomi: "キ",
    onyomiRu: "ки",
    onyomiRomaji: "KI",
    strokes: 10,
    mnemonic: "Метла и припасы: наведение порядка по возвращении в родной дом.",
    category: "Глаголы",
    examples: [
      { word: "帰る", reading: "かえる", readingRu: "каэру", translation: "возвращаться (домой)" },
      { word: "帰国", reading: "きこく", readingRu: "кикоку", translation: "возвращение на родину" },
      { word: "帰り道", reading: "かえりみち", readingRu: "каэримити", translation: "обратный путь" }
    ]
  },
  {
    id: 74,
    kanji: "食",
    lesson: 8,
    meaning: "еда",
    meaningsAlt: ["есть", "питаться"],
    kunyomi: "た-べる",
    kunyomiRu: "табэру",
    kunyomiRomaji: "taberu",
    onyomi: "ショク",
    onyomiRu: "сёку",
    onyomiRomaji: "SHOKU",
    strokes: 9,
    mnemonic: "Крышка (𠆢), накрывающая тарелку с отборным приготовленным рисом.",
    category: "Глаголы",
    examples: [
      { word: "食べる", reading: "たべる", readingRu: "табэру", translation: "есть, питаться" },
      { word: "食べ物", reading: "たべもの", readingRu: "табэмоно", translation: "еда, пища" },
      { word: "食事", reading: "しょくじ", readingRu: "сёкудзи", translation: "трапеза, еда" },
      { word: "夕食", reading: "ゆうしょく", readingRu: "ю:сёку", translation: "ужин" }
    ]
  },
  {
    id: 75,
    kanji: "飲",
    lesson: 8,
    meaning: "пить",
    meaningsAlt: ["глотать", "напиток"],
    kunyomi: "の-む",
    kunyomiRu: "ному",
    kunyomiRomaji: "nomu",
    onyomi: "イン",
    onyomiRu: "ин",
    onyomiRomaji: "IN",
    strokes: 12,
    mnemonic: "Человек наклонился над сосудом с едой/водой (食) и жадно глотает (欠).",
    category: "Глаголы",
    examples: [
      { word: "飲む", reading: "のむ", readingRu: "ному", translation: "пить" },
      { word: "飲み物", reading: "のみもの", readingRu: "номимоно", translation: "напиток" },
      { word: "飲酒", reading: "いんしゅ", readingRu: "инсю", translation: "употребление алкоголя" }
    ]
  },
  {
    id: 76,
    kanji: "見",
    lesson: 8,
    meaning: "видеть",
    meaningsAlt: ["смотреть", "показывать"],
    kunyomi: "み-る / み-える",
    kunyomiRu: "миру / миэру",
    kunyomiRomaji: "miru / mieru",
    onyomi: "ケン",
    onyomiRu: "кэн",
    onyomiRomaji: "KEN",
    strokes: 7,
    mnemonic: "Большой зоркий глаз (目) на человеческих ножках (儿) — всматривается вдаль.",
    category: "Глаголы",
    examples: [
      { word: "見る", reading: "みる", readingRu: "миру", translation: "видеть, смотреть" },
      { word: "見える", reading: "みえる", readingRu: "миэру", translation: "виднеться, быть видимым" },
      { word: "見せる", reading: "みせる", readingRu: "мисэру", translation: "показывать" },
      { word: "意見", reading: "いけん", readingRu: "икэн", translation: "мнение, взгляд" },
      { word: "見物", reading: "けんぶつ", readingRu: "кэмбуцу", translation: "осмотр достопримечательностей" }
    ]
  },
  {
    id: 77,
    kanji: "聞",
    lesson: 8,
    meaning: "слышать",
    meaningsAlt: ["слушать", "спрашивать"],
    kunyomi: "き-く / き-こえる",
    kunyomiRu: "кику / кикоэру",
    kunyomiRomaji: "kiku / kikoeru",
    onyomi: "ブン",
    onyomiRu: "бун",
    onyomiRomaji: "BUN",
    strokes: 14,
    mnemonic: "Ухо (耳), прислоненное к воротам (門), чтобы расслышать новости снаружи.",
    category: "Глаголы",
    examples: [
      { word: "聞く", reading: "きく", readingRu: "кику", translation: "слушать, слышать, спрашивать" },
      { word: "聞こえる", reading: "きこえる", readingRu: "кикоэру", translation: "слышаться, доноситься" },
      { word: "新聞", reading: "しんぶん", readingRu: "синбун", translation: "газета (новые вести)" }
    ]
  },
  {
    id: 78,
    kanji: "読",
    lesson: 8,
    meaning: "читать",
    meaningsAlt: ["декламировать"],
    kunyomi: "よ-む",
    kunyomiRu: "ёму",
    kunyomiRomaji: "yomu",
    onyomi: "ドク",
    onyomiRu: "доку",
    onyomiRomaji: "DOKU",
    strokes: 14,
    mnemonic: "Слова (言), которые человек продает/передает (売) в виде мудрых книг.",
    category: "Глаголы",
    examples: [
      { word: "読む", reading: "よむ", readingRu: "ёму", translation: "читать" },
      { word: "読書", reading: "どくしょ", readingRu: "докусё", translation: "чтение книг" },
      { word: "読者", reading: "どくしゃ", readingRu: "докуся", translation: "читатель" }
    ]
  },
  {
    id: 79,
    kanji: "書",
    lesson: 8,
    meaning: "писать",
    meaningsAlt: ["документ", "книга", "почерк"],
    kunyomi: "か-く",
    kunyomiRu: "каку",
    kunyomiRomaji: "kaku",
    onyomi: "ショ",
    onyomiRu: "сё",
    onyomiRomaji: "SHO",
    strokes: 10,
    mnemonic: "Рука с кистью (聿) выводит иероглифы на белом свитке (日).",
    category: "Глаголы",
    examples: [
      { word: "書く", reading: "かく", readingRu: "каку", translation: "писать" },
      { word: "書店", reading: "しょてん", readingRu: "сётэн", translation: "книжный магазин" },
      { word: "書道", reading: "しょどう", readingRu: "сёдо:", translation: "каллиграфия (путь письма)" },
      { word: "辞書", reading: "じしょ", readingRu: "дзисё", translation: "словарь" }
    ]
  },
  {
    id: 80,
    kanji: "話",
    lesson: 8,
    meaning: "говорить",
    meaningsAlt: ["разговаривать", "рассказ", "беседа"],
    kunyomi: "はな-す / はなし",
    kunyomiRu: "ханасу / ханаси",
    kunyomiRomaji: "hanasu / hanashi",
    onyomi: "ワ",
    onyomiRu: "ва",
    onyomiRomaji: "WA",
    strokes: 13,
    mnemonic: "Слова (言), слетающие с подвижного языка (舌) во время живой беседы.",
    category: "Глаголы",
    examples: [
      { word: "話す", reading: "はなす", readingRu: "ханасу", translation: "говорить, рассказывать" },
      { word: "話", reading: "はなし", readingRu: "ханаси", translation: "разговор, история, сказка" },
      { word: "会話", reading: "かいわ", readingRu: "кайва", translation: "диалог, разговор" },
      { word: "電話", reading: "でんわ", readingRu: "дэнва", translation: "телефон" }
    ]
  },

  // ── УРОК 9: Действия, обучение и время суток (10 кандзи) ──
  {
    id: 81,
    kanji: "買",
    lesson: 9,
    meaning: "покупать",
    meaningsAlt: ["приобретать"],
    kunyomi: "か-う",
    kunyomiRu: "кау",
    kunyomiRomaji: "kau",
    onyomi: "バイ",
    onyomiRu: "бай",
    onyomiRomaji: "BAI",
    strokes: 12,
    mnemonic: "Сеть с товаром над раковинами каури (貝), служившими первыми деньгами.",
    category: "Глаголы",
    examples: [
      { word: "買う", reading: "かう", readingRu: "кау", translation: "покупать, приобретать" },
      { word: "買い物", reading: "かいもの", readingRu: "каймоно", translation: "покупки, шоппинг" },
      { word: "売買", reading: "ばいばい", readingRu: "байбай", translation: "купля-продажа, торговля" }
    ]
  },
  {
    id: 82,
    kanji: "教",
    lesson: 9,
    meaning: "учить",
    meaningsAlt: ["обучать", "преподавать", "учение"],
    kunyomi: "おし-える",
    kunyomiRu: "осиэру",
    kunyomiRomaji: "oshieru",
    onyomi: "キョウ",
    onyomiRu: "кё:",
    onyomiRomaji: "KYOU",
    strokes: 11,
    mnemonic: "Старец наставляет ребенка (孝), направляя указкой к знанию (攵).",
    category: "Обучение",
    examples: [
      { word: "教える", reading: "おしえる", readingRu: "осиэру", translation: "учить, обучать, подсказывать" },
      { word: "教育", reading: "きょういく", readingRu: "кё:ику", translation: "образование, воспитание" },
      { word: "教会", reading: "きょうかい", readingRu: "кё:кай", translation: "церковь" },
      { word: "教室", reading: "きょうしつ", readingRu: "кё:сицу", translation: "класс, учебная аудитория" }
    ]
  },
  {
    id: 83,
    kanji: "朝",
    lesson: 9,
    meaning: "утро",
    meaningsAlt: ["утренний", "династия"],
    kunyomi: "あさ",
    kunyomiRu: "аса",
    kunyomiRomaji: "asa",
    onyomi: "チョウ",
    onyomiRu: "тё:",
    onyomiRomaji: "CHOU",
    strokes: 12,
    mnemonic: "Солнце встает из-за травы (十日十), в то время как бледная луна (月) ещё видна.",
    category: "Время",
    examples: [
      { word: "朝", reading: "あさ", readingRu: "аса", translation: "утро" },
      { word: "朝日", reading: "あさひ", readingRu: "асахи", translation: "утреннее восходящее солнце" },
      { word: "朝食", reading: "ちょうしょく", readingRu: "тё:сёку", translation: "завтрак" },
      { word: "今朝", reading: "けさ", readingRu: "кэса", translation: "сегодня утром" }
    ]
  },
  {
    id: 84,
    kanji: "昼",
    lesson: 9,
    meaning: "дневное время",
    meaningsAlt: ["день", "полдень"],
    kunyomi: "ひる",
    kunyomiRu: "хиру",
    kunyomiRomaji: "hiru",
    onyomi: "チュウ",
    onyomiRu: "тю:",
    onyomiRomaji: "CHUU",
    strokes: 9,
    mnemonic: "Солнце (日), поднявшееся высоко над крышей дома в зените дня.",
    category: "Время",
    examples: [
      { word: "昼", reading: "ひる", readingRu: "хиру", translation: "день, обеденное время" },
      { word: "昼寝", reading: "ひるね", readingRu: "хирунэ", translation: "дневной сон" },
      { word: "昼食", reading: "ちゅうしょく", readingRu: "тю:сёку", translation: "обед, ланч" },
      { word: "昼休み", reading: "ひるやすみ", readingRu: "хируясуми", translation: "обеденный перерыв" }
    ]
  },
  {
    id: 85,
    kanji: "夜",
    lesson: 9,
    meaning: "ночь",
    meaningsAlt: ["поздний вечер"],
    kunyomi: "よる / よ",
    kunyomiRu: "ёру / ё",
    kunyomiRomaji: "yoru / yo",
    onyomi: "ヤ",
    onyomiRu: "я",
    onyomiRomaji: "YA",
    strokes: 8,
    mnemonic: "Человек под ночным небом (亠) укутался в плащ, когда наступила тьма.",
    category: "Время",
    examples: [
      { word: "夜", reading: "よる", readingRu: "ёру", translation: "ночь, поздний вечер" },
      { word: "今夜", reading: "こんや", readingRu: "коня", translation: "сегодня вечером, сегодняшней ночью" },
      { word: "夜食", reading: "やしょく", readingRu: "ясёку", translation: "ночной перекус" },
      { word: "夜中", reading: "よなか", readingRu: "ёнака", translation: "глухая полночь" }
    ]
  },
  {
    id: 86,
    kanji: "晩",
    lesson: 9,
    meaning: "вечер",
    meaningsAlt: ["сумерки"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "バン",
    onyomiRu: "бан",
    onyomiRomaji: "BAN",
    strokes: 12,
    mnemonic: "Солнце (日) прячется, и наступает спокойный вечер (免).",
    category: "Время",
    examples: [
      { word: "晩", reading: "ばん", readingRu: "бан", translation: "вечер" },
      { word: "今晩", reading: "こんばん", readingRu: "комбан", translation: "сегодняшний вечер" },
      { word: "晩御飯", reading: "ばんごはん", readingRu: "бангохан", translation: "ужин" },
      { word: "毎晩", reading: "まいばん", readingRu: "майбан", translation: "каждый вечер" }
    ]
  },
  {
    id: 87,
    kanji: "夕",
    lesson: 9,
    meaning: "вечер",
    meaningsAlt: ["закат"],
    kunyomi: "ゆう",
    kunyomiRu: "ю:",
    kunyomiRomaji: "yuu",
    onyomi: "セキ",
    onyomiRu: "сэки",
    onyomiRomaji: "SEKI",
    strokes: 3,
    mnemonic: "Серп нарождающегося месяца, появляющийся на закате дня.",
    category: "Время",
    examples: [
      { word: "夕べ", reading: "ゆうべ", readingRu: "ю:бэ", translation: "вечер, вчера вечером" },
      { word: "夕食", reading: "ゆうしょく", readingRu: "ю:сёку", translation: "ужин" },
      { word: "夕方", reading: "ゆうがた", readingRu: "ю:гата", translation: "вечерняя пора, сумерки" },
      { word: "七夕", reading: "たなばた", readingRu: "танабата", translation: "праздник звезд Танабата" }
    ]
  },
  {
    id: 88,
    kanji: "方",
    lesson: 9,
    meaning: "направление",
    meaningsAlt: ["способ", "господин", "сторона"],
    kunyomi: "かた",
    kunyomiRu: "ката",
    kunyomiRomaji: "kata",
    onyomi: "ホウ",
    onyomiRu: "хо:",
    onyomiRomaji: "HOU",
    strokes: 4,
    mnemonic: "Плуг или лодка, указывающая носом в выбранном направлении движения.",
    category: "Пространство",
    examples: [
      { word: "～方", reading: "かた", readingRu: "ката", translation: "способ делать что-то (напр. 読み方 - способ чтения)" },
      { word: "夕方", reading: "ゆうがた", readingRu: "ю:гата", translation: "сумерки, вечер" },
      { word: "方法", reading: "ほうほう", readingRu: "хо:хо:", translation: "метод, способ" },
      { word: "あの方", reading: "あのかた", readingRu: "ано ката", translation: "тот господин / та дама (вежливо)" }
    ]
  },
  {
    id: 89,
    kanji: "午",
    lesson: 9,
    meaning: "полдень",
    meaningsAlt: ["знак лошади"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "ゴ",
    onyomiRu: "го",
    onyomiRomaji: "GO",
    strokes: 4,
    mnemonic: "Пестик для растирания зерна, стоящий вертикально как стрелка в полдень.",
    category: "Время",
    examples: [
      { word: "午前", reading: "ごぜん", readingRu: "годзэн", translation: "до полудня (утро, AM)" },
      { word: "午後", reading: "ごご", readingRu: "гого", translation: "после полудня (день/вечер, PM)" },
      { word: "正午", reading: "しょうご", readingRu: "сё:го", translation: "ровно полдень (12:00)" }
    ]
  },
  {
    id: 90,
    kanji: "前",
    lesson: 9,
    meaning: "перед",
    meaningsAlt: ["впереди", "раньше", "до"],
    kunyomi: "まえ",
    kunyomiRu: "маэ",
    kunyomiRomaji: "mae",
    onyomi: "ゼン",
    onyomiRu: "дзэн",
    onyomiRomaji: "ZEN",
    strokes: 9,
    mnemonic: "Нож (刂), срезающий путь перед ногами путника.",
    category: "Пространство",
    examples: [
      { word: "前", reading: "まえ", readingRu: "маэ", translation: "перед, впереди, раньше" },
      { word: "午前", reading: "ごぜん", readingRu: "годзэн", translation: "первая половина дня (AM)" },
      { word: "前半", reading: "ぜんはん", readingRu: "дзэнхан", translation: "первая половина" },
      { word: "～年前", reading: "ねんまえ", readingRu: "нэнмаэ", translation: "столько-то лет назад" },
      { word: "名前", reading: "なまえ", readingRu: "намаэ", translation: "имя" }
    ]
  },

  // ── УРОК 10: Время и последовательность (3 кандзи — страница 21 книги) ──
  {
    id: 91,
    kanji: "後",
    lesson: 10,
    meaning: "после",
    meaningsAlt: ["позади", "сзади", "позже"],
    kunyomi: "あと / うし-ろ / のち",
    kunyomiRu: "ато / усиро / ноти",
    kunyomiRomaji: "ato / ushiro / nochi",
    onyomi: "ゴ / コウ",
    onyomiRu: "го / ко:",
    onyomiRomaji: "GO / KOU",
    strokes: 9,
    mnemonic: "Человек идет по дороге (彳), ступая медленно позади остальных со связанной нитью ногой.",
    category: "Пространство",
    examples: [
      { word: "後", reading: "あと", readingRu: "ато", translation: "после, позже, затем" },
      { word: "後ろ", reading: "うしろ", readingRu: "усиро", translation: "сзади, позади" },
      { word: "午後", reading: "ごご", readingRu: "гого", translation: "после полудня (PM)" },
      { word: "後半", reading: "こうはん", readingRu: "ко:хан", translation: "вторая половина" },
      { word: "～年後", reading: "ねんご", readingRu: "нэнго", translation: "спустя ... лет" }
    ]
  },
  {
    id: 92,
    kanji: "毎",
    lesson: 10,
    meaning: "каждый",
    meaningsAlt: ["всякий"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "マイ",
    onyomiRu: "май",
    onyomiRomaji: "MAI",
    strokes: 6,
    mnemonic: "Мать (母) в традиционном уборе (𠂉), каждый день неустанно заботящаяся о семье.",
    category: "Время",
    examples: [
      { word: "毎日", reading: "まいにち", readingRu: "майнити", translation: "каждый день, ежедневно" },
      { word: "毎週", reading: "まいしゅう", readingRu: "майсю:", translation: "каждая неделя, еженедельно" },
      { word: "毎月", reading: "まいつき / まいげつ", readingRu: "майцуки / майгэцу", translation: "каждый месяц" },
      { word: "毎年", reading: "まいとし / まいねん", readingRu: "майтоси / майнэн", translation: "каждый год" }
    ]
  },
  {
    id: 93,
    kanji: "週",
    lesson: 10,
    meaning: "неделя",
    meaningsAlt: ["семидневка"],
    kunyomi: "-",
    kunyomiRu: "-",
    kunyomiRomaji: "-",
    onyomi: "シュウ",
    onyomiRu: "сю:",
    onyomiRomaji: "SHUU",
    strokes: 11,
    mnemonic: "Движение по кругу (周) по жизненной дороге (辶): завершение семидневного круга.",
    category: "Время",
    examples: [
      { word: "来週", reading: "らいしゅう", readingRu: "райсю:", translation: "следующая неделя" },
      { word: "先週", reading: "せんしゅう", readingRu: "сэнсю:", translation: "прошлая неделя" },
      { word: "今週", reading: "こんしゅう", readingRu: "консю:", translation: "эта неделя" },
      { word: "週末", reading: "しゅうまつ", readingRu: "сю:мацу", translation: "конец недели, выходные" },
      { word: "一週間", reading: "いっしゅうかん", readingRu: "иссю:кан", translation: "одна неделя" }
    ]
  }
];

export interface LessonMeta {
  id: number;
  title: string;
  theme: string;
  description: string;
  expectedCount: number;
}

export const LESSONS_META: LessonMeta[] = [
  { id: 1, title: "Урок 1", theme: "Природа, основы и жизнь", description: "Базовые элементы природы (огонь, вода, металл, земля), люди и первые понятия.", expectedCount: 10 },
  { id: 2, title: "Урок 2", theme: "Числа от 1 до 10", description: "Счёт от одного до десяти: фундаментальные знаки для дат, цен и количества.", expectedCount: 10 },
  { id: 3, title: "Урок 3", theme: "Пространство, меры и величины", description: "Верх и низ, середина, большой и маленький, книга, половина, части и сила.", expectedCount: 10 },
  { id: 4, title: "Урок 4", theme: "Человек, общество и ассоциации", description: "Свет, отдых, тело, любовь, мужчина, роща, лес, промежуток, поле и скала.", expectedCount: 10 },
  { id: 5, title: "Урок 5", theme: "Тело, стихии и природные материалы", description: "Части тела (глаз, ухо, рука, нога), дождь, бамбук, рис, раковина, камень и нить.", expectedCount: 10 },
  { id: 6, title: "Урок 6", theme: "Еда, культура, животные и вещи", description: "Цветок, чай, мясо, литература, иероглифы, вещи, корова, лошадь, птица и рыба.", expectedCount: 10 },
  { id: 7, title: "Урок 7", theme: "Качества и свойства", description: "Новый и старый, длинный и короткий, высокий и низкий, дешёвый, тёмный, много и мало.", expectedCount: 10 },
  { id: 8, title: "Урок 8", theme: "Базовые глаголы", description: "Идти, приходить, возвращаться, есть, пить, видеть, слышать, читать, писать, говорить.", expectedCount: 10 },
  { id: 9, title: "Урок 9", theme: "Действия, учеба и время суток", description: "Покупать, учить, утро, день, ночь, вечер, сумерки, направление, полдень и перед.", expectedCount: 10 },
  { id: 10, title: "Урок 10", theme: "Последовательность и периоды", description: "После/сзади, каждый и неделя (заключительные кандзи базового курса).", expectedCount: 3 }
];
