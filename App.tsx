
import React, { useState, useEffect, useMemo } from 'react';
import * as Icons from './components/Icons.tsx';
import { PRACTICE_AREAS, ACHIEVEMENTS } from './constants.tsx';
import Modal from './components/Modal.tsx';
import { ModalType } from './types.ts';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return localStorage.getItem('cookie_consent') !== 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  // Мемоизация карты иконок для оптимизации производительности
  const IconMap: Record<string, React.FC> = useMemo(() => ({
    scale: Icons.ScaleIcon,
    shield: Icons.ShieldIcon,
    users: Icons.UsersIcon,
    briefcase: Icons.BriefcaseIcon,
    home: Icons.HomeIcon,
    map: Icons.MapIcon,
    globe: Icons.GlobeIcon,
    building: Icons.BuildingIcon,
    'file-text': Icons.FileTextIcon,
    'user-plus': Icons.UserPlusIcon,
    'edit-3': Icons.Edit3Icon,
    search: Icons.SearchIcon,
  }), []);

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-accent/10 py-3 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-premium dark:text-white uppercase">
              Э. Сулейманов
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent font-semibold">
              Адвокат · Баку
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-12 text-xs uppercase tracking-[0.2em] font-bold">
            <a href="#practice" className="hover:text-accent transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all">Практика</a>
            <a href="#about" className="hover:text-accent transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all">О себе</a>
            <a href="#contacts" className="hover:text-accent transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all">Контакты</a>
          </nav>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 border border-accent/20 hover:border-accent transition-all duration-300 text-premium dark:text-white rounded-none active:scale-95"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Icons.SunIcon /> : <Icons.MoonIcon />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden bg-white dark:bg-[#0A0A0A]">
        {/* Architectual Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#B8972A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-1/3 h-full border-l border-accent" />
          <div className="absolute bottom-1/4 left-0 w-full h-[1px] border-t border-accent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-10 fade-in-on-scroll visible">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold">Личная практика в Азербайджане</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] text-premium dark:text-white">
              Бескомпромиссная <br />
              <span className="text-accent italic">правовая защита.</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-relaxed">
              Сочетание фундаментальных знаний закона и стратегического мышления для решения самых сложных юридических вызовов.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-6">
              <a 
                href="#contacts" 
                className="inline-block bg-accent hover:bg-[#A38522] text-white px-12 py-6 text-sm uppercase tracking-[0.25em] font-bold transition-all duration-500 rounded-none shadow-2xl shadow-accent/20 hover:-translate-y-1"
              >
                Консультация
              </a>
              <a 
                href="#practice" 
                className="inline-block border border-premium dark:border-white hover:border-accent hover:text-accent px-12 py-6 text-sm uppercase tracking-[0.25em] font-bold transition-all duration-500 rounded-none"
              >
                Сферы права
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-[1px] h-12 bg-premium dark:bg-white" />
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice" className="py-32 bg-gray-50 dark:bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 fade-in-on-scroll">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold">Сферы экспертизы</span>
              <h2 className="text-5xl md:text-6xl font-serif text-premium dark:text-white">Юридическая практика</h2>
            </div>
            <div className="max-w-md">
              <p className="text-gray-500 dark:text-gray-400 font-light text-sm leading-relaxed border-l border-accent/30 pl-6">
                Многолетний опыт в различных отраслях права позволяет находить эффективные решения на стыке дисциплин.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-accent/10 border border-accent/10">
            {PRACTICE_AREAS.map((area) => {
              const IconComp = IconMap[area.icon] || Icons.ScaleIcon;
              return (
                <div 
                  key={area.id} 
                  className="group p-12 bg-white dark:bg-[#0D0D0D] transition-all duration-700 hover:bg-gray-50 dark:hover:bg-[#121212] relative overflow-hidden"
                >
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  <div className="text-accent mb-8 transition-all duration-500 group-hover:scale-110">
                    <IconComp />
                  </div>
                  <h3 className="text-lg font-serif mb-4 text-premium dark:text-white uppercase tracking-widest group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed font-light">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-white dark:bg-[#0A0A0A] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2 space-y-12 fade-in-on-scroll">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold italic">Профессиональный профиль</span>
                <h2 className="text-5xl md:text-6xl font-serif text-premium dark:text-white leading-tight">Адвокат Эльмар Сулейманов</h2>
              </div>
              <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed font-light text-lg">
                <p>
                  Юридическая деятельность для меня — это не просто профессия, а искусство защиты прав и интересов в сложной системе правоотношений. Мой подход исключает шаблонные решения; каждое дело требует глубокого погружения в детали и разработки уникальной тактики.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4 border-y border-accent/10">
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold">Медиа-экспертиза</h4>
                    <p className="text-sm">Регулярные выступления в качестве эксперта на AzTV, SpaceTV и Ictimai TV.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold">Масштаб проектов</h4>
                    <p className="text-sm">Опыт сопровождения сделок на сумму свыше 20 000 000 EUR.</p>
                  </div>
                </div>
                <p>
                  Сегодня я предлагаю своим доверителям уверенность в правовом поле Азербайджана, опираясь на 15-летний стаж и безупречную репутацию в профессиональном сообществе.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative fade-in-on-scroll">
              <div className="relative aspect-[4/5] bg-gray-50 dark:bg-[#121212] flex items-center justify-center border border-accent/20">
                {/* Geometrical Art Block */}
                <div className="absolute inset-8 border border-accent/10" />
                <div className="absolute inset-16 border border-accent/20" />
                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-accent" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-accent" />
                
                <div className="z-10 text-center px-12 py-16 bg-white dark:bg-[#0D0D0D] border border-accent/5 shadow-2xl">
                  <Icons.ScaleIcon />
                  <div className="mt-8 font-serif text-3xl italic text-accent">«Закон должен быть <br />инструментом успеха»</div>
                  <div className="mt-6 text-[10px] uppercase tracking-[0.5em] text-gray-400">Принцип работы</div>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-10 -right-6 md:-right-12 bg-accent p-10 text-white shadow-2xl hidden md:block">
                <div className="text-5xl font-serif font-bold mb-2">15+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Лет Практики</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-32 bg-premium text-white dark:bg-[#050505] relative overflow-hidden">
        {/* Visual accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[120px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-12 fade-in-on-scroll">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold">Конфиденциальная связь</span>
                  <h2 className="text-5xl md:text-6xl font-serif leading-tight">Начать <br />сотрудничество</h2>
                </div>
                <p className="text-gray-400 font-light text-lg leading-relaxed">
                  Для записи на консультацию, пожалуйста, свяжитесь по указанному телефону. Это обеспечит максимальную оперативность и конфиденциальность вашего обращения.
                </p>
                <div className="pt-8">
                  <a href="tel:+994556447080" className="group block space-y-2">
                    <span className="text-xs uppercase tracking-widest text-accent font-bold">Прямая линия</span>
                    <span className="text-4xl md:text-5xl font-serif border-b border-transparent group-hover:border-accent transition-all duration-500">
                      +994 55 644 70 80
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-12 md:p-16 border border-white/10 space-y-12 fade-in-on-scroll">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold">Офис в Баку</h4>
                    <p className="text-xl font-serif text-gray-200">
                      Проспект Ататюрка 27, AZ 1069, <br />
                      Баку, Азербайджан
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold">Часы приема</h4>
                    <p className="text-lg text-gray-400 font-light italic">
                      По предварительной записи. <br />
                      График уточняйте по телефону.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-8">
                  <a 
                    href="https://www.instagram.com/advokat_elmar_suleymanov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm uppercase tracking-widest font-bold text-gray-300 hover:text-accent transition-colors"
                  >
                    <Icons.InstagramIcon /> <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/advokatelmar/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm uppercase tracking-widest font-bold text-gray-300 hover:text-accent transition-colors"
                  >
                    <Icons.FacebookIcon /> <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white dark:bg-[#020202] border-t border-accent/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xs font-bold text-premium dark:text-white uppercase tracking-[0.2em]">Э. Сулейманов</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">© 2024 Все права защищены.</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <button onClick={() => setActiveModal('tos')} className="hover:text-accent transition-colors cursor-pointer">Условия использования</button>
              <button onClick={() => setActiveModal('data')} className="hover:text-accent transition-colors cursor-pointer">Обработка данных</button>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-accent transition-colors cursor-pointer">Конфиденциальность</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-10 right-10 z-[60] w-14 h-14 bg-accent text-white flex items-center justify-center transition-all duration-500 shadow-2xl hover:bg-premium dark:hover:bg-white dark:hover:text-black ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Back to top"
      >
        <Icons.ArrowUpIcon />
      </button>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-premium dark:bg-[#0D0D0D] border-t border-accent p-8 z-[70] animate-slide-up">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm text-gray-300 font-light leading-relaxed max-w-4xl text-center md:text-left">
              Для повышения качества обслуживания мы используем файлы cookies. Продолжая навигацию, вы выражаете согласие с нашей <button onClick={() => setActiveModal('privacy')} className="text-accent underline font-bold">политикой конфиденциальности</button>.
            </p>
            <button 
              onClick={handleCookieAccept}
              className="bg-accent text-white px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#A38522] transition-all duration-300 rounded-none whitespace-nowrap active:scale-95 shadow-lg"
            >
              Согласен
            </button>
          </div>
        </div>
      )}

      {/* Legal Modals */}
      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={
        activeModal === 'tos' ? "Пользовательское соглашение" :
        activeModal === 'data' ? "Обработка данных" : "Конфиденциальность"
      }>
        <div className="space-y-6 font-light">
          {activeModal === 'tos' && (
            <div className="space-y-4">
              <p>Настоящее Соглашение является юридически обязывающим договором между Вами и Адвокатским кабинетом Эльмара Сулейманова.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">1. Использование Сайта</h5>
              <p>Сайт предоставляется в ознакомительных целях. Любое копирование материалов сайта без письменного согласия владельца запрещено законодательством Азербайджанской Республики.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">2. Статус Информации</h5>
              <p>Размещенная информация не является публичной офертой или окончательной юридической консультацией. Каждый правовой случай требует индивидуального разбора.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">3. Ответственность</h5>
              <p>Владелец сайта не несет ответственности за убытки, возникшие в результате использования информации, полученной на данном ресурсе без личного обращения за консультацией.</p>
            </div>
          )}
          {activeModal === 'data' && (
            <div className="space-y-4">
              <p>Обработка персональных данных осуществляется в строгом соответствии с Законом АР «О персональных данных».</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">1. Сбор Данных</h5>
              <p>Мы не запрашиваем ваше имя или паспортные данные через формы на сайте. Единственные данные, которые обрабатываются — это технические параметры вашего посещения (куки, IP-адрес) для целей веб-аналитики.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">2. Безопасность</h5>
              <p>Все технические данные передаются по защищенному протоколу SSL и хранятся на серверах с высоким уровнем защиты.</p>
            </div>
          )}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p>Ваша приватность — основа адвокатской этики. Мы применяем аналогичные стандарты к нашему цифровому присутствию.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">1. Файлы Cookie</h5>
              <p>Мы используем куки для запоминания настроек темы оформления и анализа популярности разделов сайта. Вы можете отключить их в настройках браузера в любой момент.</p>
              <h5 className="font-bold text-accent uppercase text-xs tracking-widest">2. Передача данных</h5>
              <p>Никакие данные не передаются третьим лицам или рекламным агентствам.</p>
            </div>
          )}
        </div>
      </Modal>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default App;