import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c57465b6-bcb9-4ceb-b33e-a797db538104/files/30db4881-8fbe-4703-9b0d-6a50f34a1322.jpg";
const SAPLING_IMAGE = "https://cdn.poehali.dev/projects/c57465b6-bcb9-4ceb-b33e-a797db538104/files/e9c6f42e-2ef6-47dc-aa01-806a4ff0a61f.jpg";
const HYDRANGEA_IMAGE = "https://cdn.poehali.dev/projects/c57465b6-bcb9-4ceb-b33e-a797db538104/files/a89656db-7f82-4421-ba06-1857e647f64e.jpg";

type Tab = "home" | "catalog" | "delivery" | "useful" | "contacts";

const NAV_ITEMS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "delivery", label: "Доставка и оплата" },
  { id: "useful", label: "Полезное" },
  { id: "contacts", label: "Контакты" },
];

const CATEGORIES = [
  { id: "fruit-trees", label: "Плодовые деревья", emoji: "🍎", image: SAPLING_IMAGE },
  { id: "fruit-shrubs", label: "Плодовые кустарники", emoji: "🫐", image: HYDRANGEA_IMAGE },
  { id: "hydrangeas", label: "Гортензии", emoji: "💮", image: HYDRANGEA_IMAGE },
  { id: "conifers", label: "Хвойные", emoji: "🌲", image: SAPLING_IMAGE },
  { id: "perennials", label: "Травянистые многолетние", emoji: "🌿", image: HYDRANGEA_IMAGE },
  { id: "ornamental", label: "Декоративные деревья и кустарники", emoji: "🌳", image: SAPLING_IMAGE },
];

const SUBCATEGORIES: Record<string, string[]> = {
  "fruit-trees": ["Ирга", "Яблоня", "Груша", "Слива", "Вишня"],
  "fruit-shrubs": ["Жимолость", "Смородина", "Малина"],
  "hydrangeas": ["Метельчатая", "Древовидная", "Черешковая", "Пильчатая"],
  "conifers": ["Ель", "Сосна", "Туя", "Можжевельник", "Пихта"],
  "perennials": ["Хоста", "Астильба", "Рудбекия", "Лиатрис", "Гейхера"],
  "ornamental": ["Сирень", "Дёрен", "Спирея", "Барбарис", "Чубушник"],
};

const AGE_FILTERS = ["1 год", "2 года", "3 года", "4 года"];

const PRODUCTS: Record<string, { name: string; price: string; age: string; desc: string }[]> = {
  "Яблоня": [
    { name: "Яблоня Антоновка", price: "850 ₽", age: "2 года", desc: "Зимостойкий сорт, обильное плодоношение" },
    { name: "Яблоня Белый налив", price: "750 ₽", age: "1 год", desc: "Раннеспелый летний сорт" },
    { name: "Яблоня Грушовка", price: "1 100 ₽", age: "3 года", desc: "Старинный русский сорт" },
    { name: "Яблоня Мелба", price: "950 ₽", age: "2 года", desc: "Канадский сорт с ароматными плодами" },
  ],
  "Груша": [
    { name: "Груша Лада", price: "900 ₽", age: "2 года", desc: "Раннеспелый сорт, высокая урожайность" },
    { name: "Груша Чижовская", price: "850 ₽", age: "2 года", desc: "Зимостойкая, самоплодная" },
    { name: "Груша Москвичка", price: "1 200 ₽", age: "3 года", desc: "Осенний сорт отличного вкуса" },
  ],
  "Слива": [
    { name: "Слива Яичная синяя", price: "700 ₽", age: "1 год", desc: "Традиционный сорт средней полосы" },
    { name: "Слива Скороплодная", price: "850 ₽", age: "2 года", desc: "Ранний срок созревания" },
    { name: "Слива Алёнушка", price: "950 ₽", age: "3 года", desc: "Крупноплодный сладкий сорт" },
  ],
  "Вишня": [
    { name: "Вишня Владимирская", price: "650 ₽", age: "1 год", desc: "Классика русских садов" },
    { name: "Вишня Молодёжная", price: "800 ₽", age: "2 года", desc: "Самоплодный компактный сорт" },
  ],
  "Ирга": [
    { name: "Ирга канадская", price: "450 ₽", age: "1 год", desc: "Неприхотливая, ягоды в июле" },
    { name: "Ирга ольхолистная", price: "550 ₽", age: "2 года", desc: "Высокорослый куст до 5 м" },
  ],
  "Жимолость": [
    { name: "Жимолость Синяя птица", price: "400 ₽", age: "1 год", desc: "Ранние ягоды, очень зимостойкая" },
    { name: "Жимолость Длинноплодная", price: "500 ₽", age: "2 года", desc: "Удлинённые сладкие плоды" },
    { name: "Жимолость Бакчарский великан", price: "650 ₽", age: "3 года", desc: "Крупноплодный урожайный сорт" },
  ],
  "Смородина": [
    { name: "Смородина Пигмей", price: "350 ₽", age: "1 год", desc: "Крупные чёрные ягоды" },
    { name: "Смородина Белорусская сладкая", price: "380 ₽", age: "1 год", desc: "Высокоурожайный сорт" },
    { name: "Смородина Красная виксне", price: "400 ₽", age: "2 года", desc: "Кисло-сладкие ягоды" },
  ],
  "Малина": [
    { name: "Малина Полька", price: "300 ₽", age: "1 год", desc: "Ремонтантный польский сорт" },
    { name: "Малина Бабье лето", price: "280 ₽", age: "1 год", desc: "Классика ремонтантных сортов" },
    { name: "Малина Геракл", price: "350 ₽", age: "2 года", desc: "Крупные плотные ягоды" },
  ],
};

function Header({ active, onNav }: { active: Tab; onNav: (t: Tab) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "var(--green-deep)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => onNav("home")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: "var(--green-pale)" }}>🌿</div>
            <div className="text-left">
              <div className="font-cormorant text-xl font-semibold leading-tight" style={{ color: "var(--cream)" }}>Птичья дача</div>
              <div className="text-xs font-golos leading-tight opacity-70" style={{ color: "var(--green-pale)" }}>питомник растений</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-golos transition-all duration-200 ${
                  active === item.id ? "font-medium" : "opacity-80 hover:opacity-100"
                }`}
                style={active === item.id
                  ? { backgroundColor: "var(--green-pale)", color: "var(--green-deep)" }
                  : { color: "var(--cream)", backgroundColor: "transparent" }
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2" style={{ color: "var(--cream)" }} onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNav(item.id); setMobileOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-md text-sm font-golos transition-all"
                style={active === item.id
                  ? { backgroundColor: "var(--green-pale)", color: "var(--green-deep)" }
                  : { color: "var(--cream)" }
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function HomePage({ onNav }: { onNav: (t: Tab) => void }) {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={HERO_IMAGE} alt="Питомник Птичья дача" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(45,80,22,0.5) 0%, rgba(45,80,22,0.15) 40%, rgba(45,80,22,0.72) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="animate-fade-in">
            <p className="font-golos text-sm tracking-[0.25em] uppercase mb-3 opacity-90" style={{ color: "var(--green-pale)" }}>
              Питомник растений
            </p>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light mb-4 leading-tight" style={{ color: "var(--cream)" }}>
              Птичья дача
            </h1>
            <p className="font-golos text-lg md:text-xl mb-8 max-w-lg mx-auto font-light" style={{ color: "rgba(245,240,232,0.9)" }}>
              Саженцы с любовью — для вашего сада
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => onNav("catalog")}
                className="px-8 py-3 rounded-full font-golos font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                style={{ backgroundColor: "var(--green-mid)", color: "var(--cream)" }}
              >
                Перейти в каталог
              </button>
              <button
                onClick={() => onNav("contacts")}
                className="px-8 py-3 rounded-full font-golos font-medium border transition-all duration-200"
                style={{ backgroundColor: "rgba(245,240,232,0.15)", color: "var(--cream)", borderColor: "rgba(245,240,232,0.3)" }}
              >
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "var(--cream-dark)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Leaf", title: "Свой питомник", desc: "Выращиваем саженцы самостоятельно с соблюдением агротехники" },
              { icon: "ShieldCheck", title: "Гарантия качества", desc: "Сортовая чистота и документы на все растения" },
              { icon: "Truck", title: "Доставка по России", desc: "Отправляем почтой и транспортными компаниями" },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 items-start p-6 bg-white rounded-2xl shadow-sm hover-lift">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--green-pale)" }}>
                  <Icon name={f.icon} size={22} style={{ color: "var(--green-deep)" }} />
                </div>
                <div>
                  <div className="font-golos font-semibold mb-1" style={{ color: "var(--green-deep)" }}>{f.title}</div>
                  <div className="font-golos text-sm text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="font-cormorant text-4xl text-center mb-2 font-light" style={{ color: "var(--green-deep)" }}>Наш ассортимент</h2>
        <p className="text-center text-muted-foreground font-golos mb-10">Более 100 наименований растений</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNav("catalog")}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift text-left"
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,80,22,0.85) 0%, rgba(45,80,22,0.1) 60%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="font-cormorant text-xl font-medium leading-tight" style={{ color: "var(--cream)" }}>{cat.label}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 text-center px-4" style={{ backgroundColor: "var(--green-deep)" }}>
        <h2 className="font-cormorant text-4xl font-light mb-3" style={{ color: "var(--cream)" }}>Готовы выбрать саженцы?</h2>
        <p className="font-golos mb-8 max-w-md mx-auto" style={{ color: "var(--green-pale)" }}>Откройте каталог и воспользуйтесь фильтром по возрасту растения</p>
        <button
          onClick={() => onNav("catalog")}
          className="px-10 py-3 rounded-full font-golos font-semibold transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "var(--cream)", color: "var(--green-deep)" }}
        >
          Открыть каталог
        </button>
      </section>
    </div>
  );
}

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [ageFilter, setAgeFilter] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      setSelectedSub(null);
    } else {
      setSelectedCategory(id);
      setSelectedSub(null);
    }
  };

  const handleSubClick = (sub: string) => {
    setSelectedSub(selectedSub === sub ? null : sub);
  };

  const currentProducts = selectedSub && PRODUCTS[selectedSub]
    ? (ageFilter ? PRODUCTS[selectedSub].filter(p => p.age === ageFilter) : PRODUCTS[selectedSub])
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-2" style={{ color: "var(--green-deep)" }}>Каталог</h1>
      <p className="text-muted-foreground font-golos mb-8">Выберите категорию растений</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative overflow-hidden rounded-2xl aspect-[3/2] text-left transition-all duration-200 ${
                  selectedCategory === cat.id ? "scale-[0.98]" : "hover-lift"
                }`}
                style={selectedCategory === cat.id ? { outline: "3px solid var(--green-mid)" } : {}}
              >
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div
                  className="absolute inset-0 transition-all duration-200"
                  style={selectedCategory === cat.id
                    ? { backgroundColor: "rgba(45,80,22,0.75)" }
                    : { background: "linear-gradient(to top, rgba(45,80,22,0.78) 0%, rgba(45,80,22,0.15) 60%, transparent 100%)" }
                  }
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-xl mb-0.5">{cat.emoji}</div>
                  <div className="font-cormorant text-base font-medium leading-tight" style={{ color: "var(--cream)" }}>{cat.label}</div>
                </div>
                {selectedCategory === cat.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--green-pale)" }}>
                    <Icon name="Check" size={14} style={{ color: "var(--green-deep)" }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="animate-fade-in bg-white rounded-2xl p-5 mb-6 shadow-sm">
              <h3 className="font-cormorant text-2xl font-light mb-3" style={{ color: "var(--green-deep)" }}>
                {CATEGORIES.find(c => c.id === selectedCategory)?.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(SUBCATEGORIES[selectedCategory] || []).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubClick(sub)}
                    className="px-4 py-2 rounded-full text-sm font-golos transition-all duration-200"
                    style={selectedSub === sub
                      ? { backgroundColor: "var(--green-deep)", color: "var(--cream)" }
                      : { backgroundColor: "var(--green-pale)", color: "var(--green-deep)" }
                    }
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSub && (
            <div className="animate-fade-in">
              <h3 className="font-cormorant text-2xl font-light mb-4" style={{ color: "var(--green-deep)" }}>{selectedSub}</h3>
              {currentProducts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground font-golos">
                  <div className="text-4xl mb-3">🌱</div>
                  <p>Нет саженцев с выбранным возрастом</p>
                  <button onClick={() => setAgeFilter(null)} className="mt-2 underline text-sm" style={{ color: "var(--green-mid)" }}>Сбросить фильтр</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProducts.map((product, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm hover-lift" style={{ border: "1px solid var(--green-pale)" }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-golos font-semibold leading-tight" style={{ color: "var(--green-deep)" }}>{product.name}</h4>
                        <span className="font-cormorant text-xl font-semibold whitespace-nowrap ml-2" style={{ color: "var(--earth-dark)" }}>{product.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-golos mb-3">{product.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs px-2 py-1 rounded-full font-golos" style={{ backgroundColor: "var(--green-pale)", color: "var(--green-deep)" }}>
                          Возраст: {product.age}
                        </span>
                        <button
                          className="text-sm px-4 py-1.5 rounded-full font-golos transition-colors"
                          style={{ backgroundColor: "var(--green-deep)", color: "var(--cream)" }}
                        >
                          В корзину
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!selectedCategory && (
            <div className="text-center py-10 text-muted-foreground font-golos">
              <div className="text-5xl mb-4">🌿</div>
              <p className="text-lg">Выберите категорию растений выше</p>
            </div>
          )}
        </div>

        <aside className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h3 className="font-cormorant text-xl font-medium mb-4" style={{ color: "var(--green-deep)" }}>Возраст саженца</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setAgeFilter(null)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-golos transition-all"
                style={!ageFilter
                  ? { backgroundColor: "var(--green-deep)", color: "var(--cream)", fontWeight: 500 }
                  : { backgroundColor: "var(--cream)", color: "var(--green-deep)" }
                }
              >
                Все возрасты
              </button>
              {AGE_FILTERS.map((age) => (
                <button
                  key={age}
                  onClick={() => setAgeFilter(ageFilter === age ? null : age)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-golos transition-all"
                  style={ageFilter === age
                    ? { backgroundColor: "var(--green-deep)", color: "var(--cream)", fontWeight: 500 }
                    : { backgroundColor: "var(--cream)", color: "var(--green-deep)" }
                  }
                >
                  {age}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--green-pale)" }}>
              <div className="text-xs text-muted-foreground font-golos text-center">
                Нужна консультация?<br />
                <a href="tel:+79001234567" className="font-medium mt-1 block" style={{ color: "var(--green-mid)" }}>+7 (900) 123-45-67</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-8" style={{ color: "var(--green-deep)" }}>Доставка и оплата</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { icon: "Truck", title: "Доставка почтой России", desc: "Отправляем саженцы с закрытой корневой системой. Срок доставки 5–14 дней в зависимости от региона. Стоимость — по тарифам Почты России." },
          { icon: "Package", title: "Транспортные компании", desc: "Работаем с СДЭК, Деловые линии. Возможна отправка до терминала или до двери. Сроки 2–7 дней." },
          { icon: "MapPin", title: "Самовывоз", desc: "Приезжайте к нам в питомник. Мы покажем всё хозяйство, поможем выбрать растения и правильно их упакуем." },
          { icon: "CreditCard", title: "Оплата", desc: "Принимаем переводы на карту, оплату по QR-коду. Наличные при самовывозе. Предоплата 100% при отправке." },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm hover-lift">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--green-pale)" }}>
              <Icon name={item.icon} size={22} style={{ color: "var(--green-deep)" }} />
            </div>
            <h3 className="font-cormorant text-xl font-medium mb-2" style={{ color: "var(--green-deep)" }}>{item.title}</h3>
            <p className="font-golos text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "var(--green-pale)" }}>
        <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--green-deep)" }}>Важно знать</h3>
        <ul className="space-y-2 font-golos text-sm" style={{ color: "var(--green-deep)" }}>
          {[
            "Саженцы отправляем с середины апреля до начала июня и с сентября по октябрь",
            "Упаковка обеспечивает сохранность растений в пути",
            "При получении проверяйте посылку в присутствии сотрудника почты",
            "При повреждении в пути составляем акт и заменяем растения",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span style={{ color: "var(--green-mid)" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function UsefulPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const articles = [
    { title: "Когда лучше сажать саженцы?", text: "Оптимальные сроки посадки — ранняя весна (апрель–начало мая) и осень (сентябрь–октябрь). Весной сажают до распускания почек, осенью — после опадания листьев, чтобы растение успело укорениться до морозов." },
    { title: "Как выбрать место для яблони?", text: "Яблоня любит солнечные, хорошо проветриваемые места с глубоким залеганием грунтовых вод. Расстояние между деревьями — не менее 3–4 метров для обычных и 2–3 метра для карликовых форм." },
    { title: "Как ухаживать за саженцами после посадки?", text: "Первые 2–3 года особенно важны. Регулярный полив (1 раз в неделю в сухую погоду), рыхление приствольного круга, мульчирование компостом или соломой. Формирующая обрезка — ранней весной." },
    { title: "Чем подкармливать плодовые деревья?", text: "Весной — азотные удобрения для роста побегов. В июне-июле — комплексные. Осенью — фосфорно-калийные для подготовки к зиме. Органика (перегной, компост) — лучший выбор для любителей природного земледелия." },
    { title: "Гортензии: уход и зимовка", text: "Гортензии любят кислую почву (pH 4,5–5,5), обильный полив и полутень. Перед зимой укрывайте молодые растения лапником или агроволокном. Метельчатые гортензии зимостойки и укрытия не требуют." },
    { title: "Как правильно обрезать смородину?", text: "Обрезку проводят ранней весной до распускания почек. Удаляют ветви старше 5 лет, слабые и загущающие куст побеги. Оставляют 10–15 разновозрастных ветвей. После обрезки куст хорошо освещается и даёт крупные ягоды." },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-2" style={{ color: "var(--green-deep)" }}>Полезное</h1>
      <p className="text-muted-foreground font-golos mb-8">Советы по выбору и уходу за растениями</p>
      <div className="space-y-3">
        {articles.map((art, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors"
              style={{ backgroundColor: openItem === i ? "var(--green-pale)" : "white" }}
            >
              <span className="font-cormorant text-lg font-medium pr-4" style={{ color: "var(--green-deep)" }}>{art.title}</span>
              <Icon name={openItem === i ? "ChevronUp" : "ChevronDown"} size={20} style={{ color: "var(--green-mid)" }} className="shrink-0" />
            </button>
            {openItem === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <div className="h-px mb-4" style={{ backgroundColor: "var(--green-pale)" }} />
                <p className="font-golos text-sm leading-relaxed text-foreground/80">{art.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-8" style={{ color: "var(--green-deep)" }}>Контакты</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: "Phone", label: "Телефон", value: "+7 (900) 123-45-67", href: "tel:+79001234567" },
            { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@ptichyadacha", href: "#" },
            { icon: "Mail", label: "Email", value: "info@ptichyadacha.ru", href: "mailto:info@ptichyadacha.ru" },
            { icon: "MapPin", label: "Адрес питомника", value: "Московская область, д. Птичья, ул. Садовая, 1", href: null },
            { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00–18:00\nВс: 10:00–16:00", href: null },
          ].map((contact) => (
            <div key={contact.label} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--green-pale)" }}>
                <Icon name={contact.icon} size={18} style={{ color: "var(--green-deep)" }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-golos mb-0.5">{contact.label}</div>
                {contact.href ? (
                  <a href={contact.href} className="font-golos font-medium whitespace-pre-line transition-colors" style={{ color: "var(--green-deep)" }}>
                    {contact.value}
                  </a>
                ) : (
                  <div className="font-golos font-medium whitespace-pre-line" style={{ color: "var(--green-deep)" }}>{contact.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-cormorant text-2xl font-medium mb-4" style={{ color: "var(--green-deep)" }}>Написать нам</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full rounded-xl px-4 py-2.5 text-sm font-golos focus:outline-none focus:ring-2 border"
                style={{ borderColor: "var(--green-pale)", backgroundColor: "var(--cream)", color: "var(--green-deep)" }}
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full rounded-xl px-4 py-2.5 text-sm font-golos focus:outline-none focus:ring-2 border"
                style={{ borderColor: "var(--green-pale)", backgroundColor: "var(--cream)", color: "var(--green-deep)" }}
              />
              <textarea
                rows={3}
                placeholder="Ваш вопрос или заказ"
                className="w-full rounded-xl px-4 py-2.5 text-sm font-golos focus:outline-none focus:ring-2 border resize-none"
                style={{ borderColor: "var(--green-pale)", backgroundColor: "var(--cream)", color: "var(--green-deep)" }}
              />
              <button
                className="w-full py-3 rounded-xl font-golos font-medium transition-colors"
                style={{ backgroundColor: "var(--green-deep)", color: "var(--cream)" }}
              >
                Отправить сообщение
              </button>
            </div>
          </div>

          <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--green-pale)" }}>
            <div className="text-3xl mb-2">🌿</div>
            <p className="font-cormorant text-lg font-medium mb-1" style={{ color: "var(--green-deep)" }}>Приезжайте к нам!</p>
            <p className="font-golos text-sm" style={{ color: "rgba(45,80,22,0.8)" }}>Покажем питомник, поможем выбрать растения для вашего сада</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ onNav }: { onNav: (t: Tab) => void }) {
  return (
    <footer style={{ backgroundColor: "var(--green-deep)" }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: "var(--green-pale)" }}>🌿</div>
              <div>
                <div className="font-cormorant text-xl font-semibold" style={{ color: "var(--cream)" }}>Птичья дача</div>
                <div className="text-xs font-golos opacity-60" style={{ color: "var(--green-pale)" }}>питомник растений</div>
              </div>
            </div>
            <p className="font-golos text-sm leading-relaxed opacity-70" style={{ color: "var(--cream)" }}>Выращиваем саженцы с любовью с 2010 года. Сортовые растения с гарантией качества.</p>
          </div>
          <div>
            <div className="font-cormorant text-lg mb-3" style={{ color: "var(--cream)" }}>Навигация</div>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => onNav(item.id)} className="block text-sm font-golos opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--cream)" }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-cormorant text-lg mb-3" style={{ color: "var(--cream)" }}>Контакты</div>
            <div className="space-y-2 font-golos text-sm opacity-70" style={{ color: "var(--cream)" }}>
              <div>+7 (900) 123-45-67</div>
              <div>info@ptichyadacha.ru</div>
              <div>Пн–Сб: 9:00–18:00</div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 text-center font-golos text-xs opacity-30" style={{ borderTop: "1px solid rgba(245,240,232,0.1)", color: "var(--cream)" }}>
          © 2025 Птичья дача. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleNav = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <Header active={activeTab} onNav={handleNav} />
      <main className="flex-1">
        {activeTab === "home" && <HomePage onNav={handleNav} />}
        {activeTab === "catalog" && <CatalogPage />}
        {activeTab === "delivery" && <DeliveryPage />}
        {activeTab === "useful" && <UsefulPage />}
        {activeTab === "contacts" && <ContactsPage />}
      </main>
      <Footer onNav={handleNav} />
    </div>
  );
}