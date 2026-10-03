import { Product } from '../types';

import bottleNoir from '../assets/images/perfume_bottle_noir_1791037266407.jpg';
import bottleGold from '../assets/images/perfume_bottle_gold_1791037277092.jpg';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod_royal_black_oud',
    slug: 'royal-black-oud',
    nameAr: 'رويال بلاك عود',
    nameEn: 'Royal Black Oud',
    descriptionAr: 'مزيج أسطوري من العود الكمبودي المعتق مع خشب الصندل الدافئ ولمسات من العنبر المدخن. عطر يفيض بالهيبة والفخامة لأصحاب الذوق الرفيع.',
    descriptionEn: 'A legendary blend of aged Cambodian agarwood with warm Mysore sandalwood and smoked amber. An aura of majesty and timeless authority.',
    gender: 'men',
    concentration: 'Parfum',
    isLuxuryCollection: true,
    fragranceFamily: {
      ar: 'خشبي شرقي',
      en: 'Woody Oriental',
    },
    notes: {
      top: {
        ar: ['زعفران ملكي', 'برغموت كالابريا', 'حبهان مدخن'],
        en: ['Royal Saffron', 'Calabrian Bergamot', 'Smoked Cardamom'],
      },
      heart: {
        ar: ['عود كمبودي نادر', 'خشب الأرز الأطلسي', 'جلد أسود'],
        en: ['Rare Cambodian Oud', 'Atlas Cedar', 'Black Leather'],
      },
      base: {
        ar: ['عنبر رمادي', 'فانيليا مدغشقر الحارة', 'مسك التبت'],
        en: ['Grey Amber', 'Warm Madagascar Vanilla', 'Tibetan Musk'],
      },
    },
    image: bottleNoir,
    secondaryImage: bottleGold,
    variants: [
      { sku: 'RBO-100', size: '100ml', price: 1850, stock: 18 },
      { sku: 'RBO-50', size: '50ml', price: 1250, stock: 24 },
    ],
    giftVariants: [
      { sku: 'RBO-G-50', size: '50ml', stock: 10 },
      { sku: 'RBO-G-30', size: '30ml', stock: 25 },
    ],
    featured: true,
  },
  {
    id: 'prod_sultan_amber',
    slug: 'sultan-amber',
    nameAr: 'سلطان العنبر',
    nameEn: 'Sultan Amber',
    descriptionAr: 'عنبر دافئ غني ينصهر مع التوابل الشرقية والقرفة السيلانية وقطرات الراتنج الذهبي ليمنحك حضوراً ساحراً يدوم طويلاً.',
    descriptionEn: 'A rich warm amber fused with Ceylon cinnamon, precious spices, and golden resin drops creating an unforgettable charismatic presence.',
    gender: 'men',
    concentration: 'Eau de Parfum',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'عنبري دافئ',
      en: 'Warm Amber',
    },
    notes: {
      top: {
        ar: ['قرفة سيلانية', 'جريب فروت وردي', 'فلفل وردي'],
        en: ['Ceylon Cinnamon', 'Pink Grapefruit', 'Pink Pepper'],
      },
      heart: {
        ar: ['عنبر راتنجي', 'لبان عماني', 'جوزة الطيب'],
        en: ['Resinous Amber', 'Omani Frankincense', 'Nutmeg'],
      },
      base: {
        ar: ['بنزوين سيامي', 'حبوب التونكا', 'خشب الغاياك'],
        en: ['Siamese Benzoin', 'Tonka Bean', 'Guaiac Wood'],
      },
    },
    image: bottleGold,
    secondaryImage: bottleNoir,
    variants: [
      { sku: 'SAM-100', size: '100ml', price: 1450, stock: 20 },
      { sku: 'SAM-50', size: '50ml', price: 980, stock: 15 },
    ],
    giftVariants: [
      { sku: 'SAM-G-50', size: '50ml', stock: 8 },
      { sku: 'SAM-G-30', size: '30ml', stock: 30 },
    ],
    featured: true,
  },
  {
    id: 'prod_imperial_leather',
    slug: 'imperial-leather',
    nameAr: 'إمبريال ليذر',
    nameEn: 'Imperial Leather',
    descriptionAr: 'رائحة الجلود الإيطالية الفاخرة المطعمة بالتوت البري ونفحات الزعفران والخزامى النبيلة. تعبير فوري عن القوة والأناقة الكلاسيكية.',
    descriptionEn: 'Finest Italian leather infused with wild Tuscan raspberry, noble lavender, and saffron. An intense statement of masculine sophistication.',
    gender: 'men',
    concentration: 'Parfum',
    isLuxuryCollection: true,
    fragranceFamily: {
      ar: 'جلدي أروماتك',
      en: 'Aromatic Leather',
    },
    notes: {
      top: {
        ar: ['توت العليق البري', 'زعفران أسباني', 'زعتر بري'],
        en: ['Wild Raspberry', 'Spanish Saffron', 'Wild Thyme'],
      },
      heart: {
        ar: ['خزامى فرنسية', 'ياسمين ليلي', 'لبان'],
        en: ['French Lavender', 'Night Jasmine', 'Olibanum'],
      },
      base: {
        ar: ['جلد أسود مدبوغ', 'جلد غزال شمواه', 'عنبر نقي'],
        en: ['Black Tanned Leather', 'Suede', 'Pure Amber'],
      },
    },
    image: bottleNoir,
    secondaryImage: bottleGold,
    variants: [
      { sku: 'IMP-100', size: '100ml', price: 1950, stock: 12 },
      { sku: 'IMP-50', size: '50ml', price: 1350, stock: 18 },
    ],
    giftVariants: [
      { sku: 'IMP-G-50', size: '50ml', stock: 6 },
      { sku: 'IMP-G-30', size: '30ml', stock: 15 },
    ],
    featured: false,
  },
  {
    id: 'prod_cairo_nights',
    slug: 'cairo-nights',
    nameAr: 'ليالي القاهرة',
    nameEn: 'Cairo Nights',
    descriptionAr: 'انتعاش مسائي آسر من نسيم النيل ونفحات الليمون الأخضر وإكليل الجبل مع قاعدة هادئة من نجيل الهند وخشب الأرز.',
    descriptionEn: 'An evening breeze of fresh Nile mist, lime zest, and aromatic rosemary settling into a serene Haitian vetiver and cedarwood base.',
    gender: 'men',
    concentration: 'Eau de Toilette',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'حمضي منعش',
      en: 'Fresh Citrus Aromatic',
    },
    notes: {
      top: {
        ar: ['ليمون أخضر', 'برغموت', 'نعناع منعش'],
        en: ['Lime Zest', 'Bergamot', 'Crisp Mint'],
      },
      heart: {
        ar: ['إكليل الجبل', 'هيل أخضر', 'أوراق البنفسج'],
        en: ['Rosemary', 'Green Cardamom', 'Violet Leaves'],
      },
      base: {
        ar: ['نجيل الهند الهايتي', 'خشب الأرز', 'مسك أبيض'],
        en: ['Haitian Vetiver', 'Cedarwood', 'White Musk'],
      },
    },
    image: bottleGold,
    variants: [
      { sku: 'CRN-100', size: '100ml', price: 1150, stock: 35 },
      { sku: 'CRN-50', size: '50ml', price: 790, stock: 40 },
    ],
    giftVariants: [
      { sku: 'CRN-G-50', size: '50ml', stock: 15 },
      { sku: 'CRN-G-30', size: '30ml', stock: 45 },
    ],
    featured: false,
  },
  {
    id: 'prod_velvet_tobacco',
    slug: 'velvet-tobacco',
    nameAr: 'فيلفيت توباكو',
    nameEn: 'Velvet Tobacco',
    descriptionAr: 'أوراق التبغ الكوبية المنقوعة بالعسل الجبلي وحبوب الكاكاو الغنية، مدعومة بالفانيليا وخشب الصندل للمسة مخملية دافئة.',
    descriptionEn: 'Cuban tobacco leaves steeped in wild mountain honey and roasted cacao nibs, enveloped in warm velvety vanilla and creamy sandalwood.',
    gender: 'men',
    concentration: 'Eau de Parfum',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'تبغي شرقي',
      en: 'Tobacco Oriental',
    },
    notes: {
      top: {
        ar: ['تبغ مجفف', 'توابل حارة', 'عسل بري'],
        en: ['Dry Tobacco Leaf', 'Warm Spices', 'Wild Honey'],
      },
      heart: {
        ar: ['كاكاو محمص', 'فانيليا مدغشقر', 'حبوب التونكا'],
        en: ['Roasted Cacao', 'Madagascar Vanilla', 'Tonka Bean'],
      },
      base: {
        ar: ['أخشاب عطرية', 'فاكهة مجففة', 'عنبر بلسمي'],
        en: ['Aromatic Woods', 'Dried Fruits', 'Balsamic Amber'],
      },
    },
    image: bottleNoir,
    variants: [
      { sku: 'VTB-100', size: '100ml', price: 1550, stock: 22 },
      { sku: 'VTB-50', size: '50ml', price: 1050, stock: 28 },
    ],
    giftVariants: [
      { sku: 'VTB-G-50', size: '50ml', stock: 12 },
      { sku: 'VTB-G-30', size: '30ml', stock: 30 },
    ],
    featured: true,
  },
  {
    id: 'prod_desert_smoke',
    slug: 'desert-smoke',
    nameAr: 'دخان الصحراء',
    nameEn: 'Desert Smoke',
    descriptionAr: 'عطر استثنائي يحاكي دفء نار المخيم في الصحراء الذهبية، بخور حوجري نقي ولمحات قطران البتولا العميقة في زجاجة حصرية.',
    descriptionEn: 'An exceptional niche perfume evoking night desert campfires under golden dunes, rare frankincense, and smoked birch tar.',
    gender: 'men',
    concentration: 'Luxury Perfume',
    isLuxuryCollection: true,
    fragranceFamily: {
      ar: 'دخاني خشبي نيش',
      en: 'Smoky Woody Niche',
    },
    notes: {
      top: {
        ar: ['بخور عماني حوجري', 'شيح صحراوي', 'كزبرة محمصة'],
        en: ['Omani Frankincense', 'Desert Artemisia', 'Roasted Coriander'],
      },
      heart: {
        ar: ['قطران البتولا المدخن', 'سرو أطلسي', 'راتنج المر'],
        en: ['Smoked Birch Tar', 'Atlas Cypress', 'Myrrh Resin'],
      },
      base: {
        ar: ['خشب الصندل العتيق', 'باتشولي معتق', 'كاستوريوم نباتي'],
        en: ['Aged Sandalwood', 'Vintage Patchouli', 'Botanical Castoreum'],
      },
    },
    image: bottleGold,
    variants: [
      { sku: 'DSM-100', size: '100ml', price: 2200, stock: 9 },
      { sku: 'DSM-50', size: '50ml', price: 1490, stock: 14 },
    ],
    giftVariants: [
      { sku: 'DSM-G-50', size: '50ml', stock: 4 },
      { sku: 'DSM-G-30', size: '30ml', stock: 12 },
    ],
    featured: true,
  },
  {
    id: 'prod_golden_rose',
    slug: 'golden-rose-damascena',
    nameAr: 'جولدن روز دمشقية',
    nameEn: 'Golden Rose Damascena',
    descriptionAr: 'ورد دمشقي نقي تم قطافه فجراً ممزوج بالعنبر الذهبي والمسك الأبيض البلوري. قمة الأنوثة الملكية والنعومة الساحرة.',
    descriptionEn: 'Pure dawn-harvested Damascena rose infused with radiant golden amber and crystalline white musk. Supreme royal elegance.',
    gender: 'women',
    concentration: 'Parfum',
    isLuxuryCollection: true,
    fragranceFamily: {
      ar: 'زهري عنبري',
      en: 'Floral Amber',
    },
    notes: {
      top: {
        ar: ['ورد دمشقي قطرات الندى', 'برتقال دموي', 'فلفل وردي'],
        en: ['Damask Rose Dew', 'Blood Orange', 'Pink Peppercorn'],
      },
      heart: {
        ar: ['ورد طائفي فاخر', 'عود ناعم خفيف', 'فاوانيا حريرية'],
        en: ['Precious Taif Rose', 'Soft Silk Oud', 'Silk Peony'],
      },
      base: {
        ar: ['عنبر ذهبي', 'مسك أبيض', 'فانيليا كاسترد بوربون'],
        en: ['Golden Amber', 'White Musk', 'Bourbon Vanilla Custard'],
      },
    },
    image: bottleGold,
    secondaryImage: bottleNoir,
    variants: [
      { sku: 'GRD-100', size: '100ml', price: 1890, stock: 16 },
      { sku: 'GRD-50', size: '50ml', price: 1290, stock: 22 },
    ],
    giftVariants: [
      { sku: 'GRD-G-50', size: '50ml', stock: 10 },
      { sku: 'GRD-G-30', size: '30ml', stock: 28 },
    ],
    featured: true,
  },
  {
    id: 'prod_queen_jasmine',
    slug: 'queen-jasmine',
    nameAr: 'كوين جاسمين',
    nameEn: 'Queen Jasmine',
    descriptionAr: 'ياسمين مصري سامباك قطف بعناية مع مسك الروم ونفحات الكمثرى الناضجة وخشب الصندل الدافئ. عطر راقٍ وجذاب لكل المناسبات.',
    descriptionEn: 'Egyptian Sambac jasmine harmonized with voluptuous tuberose, sweet crisp pear, and warm creamy sandalwood.',
    gender: 'women',
    concentration: 'Eau de Parfum',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'زهري أبيض غني',
      en: 'Rich White Floral',
    },
    notes: {
      top: {
        ar: ['كمثرى حلوة', 'زهر البرتقال', 'يوسفي إيطالي'],
        en: ['Sweet Pear', 'Orange Blossom', 'Italian Tangerine'],
      },
      heart: {
        ar: ['ياسمين سامباك مصري', 'مسك الروم الهندي', 'غاردينيا مخملية'],
        en: ['Egyptian Sambac Jasmine', 'Indian Tuberose', 'Velvet Gardenia'],
      },
      base: {
        ar: ['خشب الصندل الحليبي', 'عنبر كريستالي', 'مسك ناعم'],
        en: ['Milky Sandalwood', 'Crystal Amber', 'Soft Velvet Musk'],
      },
    },
    image: bottleNoir,
    variants: [
      { sku: 'QJM-100', size: '100ml', price: 1490, stock: 25 },
      { sku: 'QJM-50', size: '50ml', price: 990, stock: 30 },
    ],
    giftVariants: [
      { sku: 'QJM-G-50', size: '50ml', stock: 14 },
      { sku: 'QJM-G-30', size: '30ml', stock: 35 },
    ],
    featured: true,
  },
  {
    id: 'prod_oriental_vanilla',
    slug: 'oriental-vanilla-silk',
    nameAr: 'أورينتال فانيلا سيلك',
    nameEn: 'Oriental Vanilla Silk',
    descriptionAr: 'حرير الفانيليا البوربونية مع الكراميل المملح واللوز المحمص وقاعدة دافئة من خشب الغاياك والمسك الكشميري الرقيق.',
    descriptionEn: 'Bourbon vanilla silk with salted caramel nuances, roasted almonds, and a comforting base of cashmere musk and guaiac wood.',
    gender: 'women',
    concentration: 'Eau de Parfum',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'شرقي سويت غورماند',
      en: 'Oriental Sweet Gourmand',
    },
    notes: {
      top: {
        ar: ['لوز محمص', 'كراميل مملح', 'برغموت حلو'],
        en: ['Roasted Almond', 'Salted Caramel', 'Sweet Bergamot'],
      },
      heart: {
        ar: ['فانيليا بوربون', 'سوسن إيطالي بودري', 'حلوى الخطمي'],
        en: ['Bourbon Vanilla', 'Powdery Italian Orris', 'Marshmallow Accord'],
      },
      base: {
        ar: ['مسك كشميري', 'صندل استوائي', 'عنبر سائل'],
        en: ['Cashmere Musk', 'Tropical Sandalwood', 'Liquid Amber'],
      },
    },
    image: bottleGold,
    variants: [
      { sku: 'OVS-100', size: '100ml', price: 1590, stock: 19 },
      { sku: 'OVS-50', size: '50ml', price: 1080, stock: 24 },
    ],
    giftVariants: [
      { sku: 'OVS-G-50', size: '50ml', stock: 9 },
      { sku: 'OVS-G-30', size: '30ml', stock: 26 },
    ],
    featured: false,
  },
  {
    id: 'prod_midnight_amber_blossom',
    slug: 'midnight-amber-blossom',
    nameAr: 'ميدنايت عنبر بلوسوم',
    nameEn: 'Midnight Amber Blossom',
    descriptionAr: 'إصدار فاخر من أزهار الليل النادرة المشبعة بالعنبر الأسود وحبوب التونكا الفاخرة وخلاصة زهر الكاكاو. جاذبية غامضة لا تُنسى.',
    descriptionEn: 'A high-luxury blend of rare midnight nocturnal blossoms immersed in black amber, imperial tonka bean, and cocoa bloom.',
    gender: 'women',
    concentration: 'Luxury Perfume',
    isLuxuryCollection: true,
    fragranceFamily: {
      ar: 'زهري شرقي نيش',
      en: 'Nocturnal Floral Amber',
    },
    notes: {
      top: {
        ar: ['زعفران حريري', 'برقوق أسود', 'كشمش أحمر'],
        en: ['Silk Saffron', 'Black Plum', 'Red Currant'],
      },
      heart: {
        ar: ['زهرة الأوركيد الليلية', 'ياسمين معتق', 'كاميليا ملكية'],
        en: ['Midnight Orchid', 'Aged Jasmine', 'Imperial Camellia'],
      },
      base: {
        ar: ['عنبر أسود', 'خشب العود الفاتح', 'بخور عطري'],
        en: ['Black Amber', 'Pale Oud Wood', 'Precious Incense'],
      },
    },
    image: bottleNoir,
    variants: [
      { sku: 'MAB-100', size: '100ml', price: 2100, stock: 10 },
      { sku: 'MAB-50', size: '50ml', price: 1450, stock: 15 },
    ],
    giftVariants: [
      { sku: 'MAB-G-50', size: '50ml', stock: 5 },
      { sku: 'MAB-G-30', size: '30ml', stock: 14 },
    ],
    featured: true,
  },
  {
    id: 'prod_white_patchouli',
    slug: 'white-patchouli-pure',
    nameAr: 'وايت باتشولي بيور',
    nameEn: 'White Patchouli Pure',
    descriptionAr: 'باتشولي أبيض منعش مفعم بنقاء الزهور البيضاء والكزبرة والفاوانيا، برائحة عصرية مريحة ومثالية للأيام المشرقة.',
    descriptionEn: 'A radiant pure white patchouli elevated by sheer white florals, airy coriander, and peony. Effortlessly modern and bright.',
    gender: 'women',
    concentration: 'Eau de Toilette',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'زهري تشيبر منعش',
      en: 'Fresh Floral Chypre',
    },
    notes: {
      top: {
        ar: ['فاوانيا بيضاء', 'كزبرة عطرية', 'برغموت منعش'],
        en: ['White Peony', 'Aromatic Coriander', 'Crisp Bergamot'],
      },
      heart: {
        ar: ['ورد مايو', 'ياسمين أبيض', 'أمب Brette'],
        en: ['Rose de Mai', 'White Jasmine', 'Ambrette Seed'],
      },
      base: {
        ar: ['باتشولي نقي شفاف', 'بخور رقيق', 'أخشاب خفيفة'],
        en: ['Translucent Patchouli', 'Sheer Incense', 'Blonde Woods'],
      },
    },
    image: bottleGold,
    variants: [
      { sku: 'WPP-100', size: '100ml', price: 1220, stock: 26 },
      { sku: 'WPP-50', size: '50ml', price: 850, stock: 32 },
    ],
    giftVariants: [
      { sku: 'WPP-G-50', size: '50ml', stock: 12 },
      { sku: 'WPP-G-30', size: '30ml', stock: 38 },
    ],
    featured: false,
  },
  {
    id: 'prod_ruby_musk',
    slug: 'ruby-musk',
    nameAr: 'روبي مسك',
    nameEn: 'Ruby Musk',
    descriptionAr: 'المسك الأحمر النادر المعزز بعبير الرمان السكري وخشب الأرز الدافئ وبراعم الورد البري. عطر دافئ ومغري يدوم طوال اليوم.',
    descriptionEn: 'Rare ruby red musk enlivened by ruby pomegranate nectar, warm Virginian cedar, and wild rose buds.',
    gender: 'women',
    concentration: 'Parfum',
    isLuxuryCollection: false,
    fragranceFamily: {
      ar: 'مسكي زهري دافئ',
      en: 'Warm Floral Musk',
    },
    notes: {
      top: {
        ar: ['رمان ياقوتي', 'فلفل حلو', 'توت بري'],
        en: ['Ruby Pomegranate', 'Sweet Pink Pepper', 'Wild Cranberry'],
      },
      heart: {
        ar: ['ورد بري ندي', 'سوسن بنفسجي', 'زهر اللوز'],
        en: ['Dewy Wild Rose', 'Purple Iris', 'Almond Blossom'],
      },
      base: {
        ar: ['مسك روبي ثمين', 'خشب الأرز الفيرجيني', 'عنبر بودري'],
        en: ['Precious Ruby Musk', 'Virginian Cedar', 'Powdery Amber'],
      },
    },
    image: bottleNoir,
    variants: [
      { sku: 'RMK-100', size: '100ml', price: 1650, stock: 14 },
      { sku: 'RMK-50', size: '50ml', price: 1120, stock: 20 },
    ],
    giftVariants: [
      { sku: 'RMK-G-50', size: '50ml', stock: 8 },
      { sku: 'RMK-G-30', size: '30ml', stock: 22 },
    ],
    featured: false,
  },
];
