"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Globe,
  Package,
  FileText,
  Smartphone,
  Monitor,
  Apple,
  LaptopIcon as Linux,
  Shield,
  Zap,
  Eye,
  Server,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Wifi,
  Lock,
  Globe2,
  Gauge,
  HelpCircle,
  ChevronDown,
  Key,
  Network,
  ShieldCheck,
  Fingerprint,
  Router,
  Database,
  Cpu,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const glowAnimation = {
  initial: {
    boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(147, 51, 234, 0.4)",
      "0 0 20px rgba(6, 182, 212, 0.3)",
      "0 0 20px rgba(59, 130, 246, 0.3)",
    ],
  },
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced Rocket component that flies around the site
const FlyingRocket = () => {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)

    let lastScrollY = 0
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 1 : -1
      setScrollDirection(direction)
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", updateScrollDirection)
    return () => {
      window.removeEventListener("scroll", updateScrollDirection)
      window.removeEventListener("resize", updateWindowSize)
    }
  }, [])

  // Create smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

  // Rocket follows a complex path based on scroll
  const rocketX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [windowSize.width - 120, 50, windowSize.width - 80, 100, windowSize.width - 150, windowSize.width / 2],
    ),
    springConfig,
  )

  const rocketY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
      [
        100,
        windowSize.height * 0.3,
        windowSize.height * 0.2,
        windowSize.height * 0.5,
        windowSize.height * 0.25,
        windowSize.height * 0.4,
        windowSize.height * 0.6,
      ],
    ),
    springConfig,
  )

  // Rocket rotation based on movement direction and scroll
  const rocketRotate = useSpring(
    useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-15, 25, -10, 30, 0]),
    springConfig,
  )

  // Scale animation based on scroll speed
  const rocketScale = useSpring(
    useTransform(scrollY, (latest) => {
      const velocity = Math.abs(latest - (scrollY.getPrevious() || 0))
      return 1 + Math.min(velocity * 0.001, 0.3)
    }),
    springConfig,
  )

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        x: rocketX,
        y: rocketY,
        scale: rocketScale,
        rotate: rocketRotate,
      }}
    >
      <motion.div
        animate={{
          x: [0, 5, -5, 0],
          y: [0, -3, 3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Rocket Body */}
        <div className="relative">
          {/* Main rocket body with gradient */}
          <motion.div
            className="w-16 h-20 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-t-full rounded-b-lg shadow-2xl relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 30px rgba(147, 51, 234, 0.6)",
                "0 0 25px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {/* Rocket window */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full border-2 border-white/30">
              <div className="w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full" />
            </div>

            {/* Rocket details */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full" />
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/20 rounded-full" />

            {/* Side fins */}
            <div className="absolute bottom-2 -left-1 w-3 h-6 bg-gradient-to-r from-blue-500 to-blue-600 transform -skew-y-12 rounded-l-lg" />
            <div className="absolute bottom-2 -right-1 w-3 h-6 bg-gradient-to-l from-blue-500 to-blue-600 transform skew-y-12 rounded-r-lg" />
          </motion.div>

          {/* Rocket flame with multiple layers */}
          <motion.div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            {/* Main flame */}
            <motion.div
              className="w-8 h-12 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 rounded-b-full"
              animate={{
                height: [40, 55, 35, 50],
                scaleX: [1, 1.2, 0.8, 1.1],
                opacity: [0.8, 1, 0.9, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Inner flame */}
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-yellow-300 via-orange-300 to-white rounded-b-full"
              animate={{
                height: [25, 35, 20, 30],
                scaleX: [1, 1.3, 0.7, 1.2],
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Outer flame glow */}
            <motion.div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-t from-orange-400/30 via-red-400/20 to-transparent rounded-b-full blur-sm"
              animate={{
                height: [50, 70, 45, 65],
                scaleX: [1, 1.4, 0.9, 1.3],
                opacity: [0.3, 0.6, 0.4, 0.5],
              }}
              transition={{
                duration: 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Sparkle particles around rocket */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Speed lines */}
          <motion.div className="absolute right-full top-1/2 transform -translate-y-1/2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-0.5 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full"
                style={{
                  top: `${i * 4 - 6}px`,
                  right: `${i * 3}px`,
                }}
                animate={{
                  width: [20, 35, 15, 30],
                  opacity: [0.3, 0.8, 0.2, 0.6],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Rocket trail */}
          <motion.div
            className="absolute right-full top-1/2 transform -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-blue-400/40 via-purple-400/30 to-transparent rounded-full blur-sm"
            animate={{
              width: [60, 100, 40, 80],
              opacity: [0.2, 0.5, 0.1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SecurexVPNLanding() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "Как начать пользоваться Securex VPN?",
      answer:
        "Просто перейдите в наш Telegram бот, выберите подходящий тариф и следуйте инструкциям для настройки на вашем устройстве.",
    },
    {
      question: "Какие страны доступны для подключения?",
      answer:
        "У нас более 50 серверов в 25+ странах, включая США, Германию, Нидерланды, Сингапур, Японию и многие другие.",
    },
    {
      question: "Есть ли ограничения по трафику?",
      answer: "Нет! Все наши тарифы предоставляют безлимитный трафик на максимальной скорости.",
    },
    {
      question: "Можно ли использовать на нескольких устройствах?",
      answer: "Да, одна подписка позволяет подключить до 5 устройств одновременно.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <FlyingRocket />

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 opacity-40">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(37, 99, 235, 0.3), rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3))",
              "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(37, 99, 235, 0.3), rgba(147, 51, 234, 0.3))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3), rgba(37, 99, 235, 0.3))",
              "linear-gradient(315deg, rgba(37, 99, 235, 0.3), rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3))",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-8" {...pulseAnimation}>
          <Image src="/logo.png" alt="Securex VPN" width={140} height={140} className="mx-auto drop-shadow-2xl" />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent leading-tight"
        >
          Безопасный и быстрый VPN –<br />
          одним нажатием в Telegram
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
          Защитите свою приватность, обходите блокировки и наслаждайтесь свободным интернетом с технологией VLESS и
          серверами в 25+ странах
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
            <motion.button
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl backdrop-blur-sm border border-blue-400/30 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5" />
              Открыть бота в Telegram
            </motion.button>
          </Link>

          <motion.button
            className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-5 h-5" />
            Попробовать бесплатно
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl w-full">
          {[
            { number: "50+", label: "Серверов", icon: Server },
            { number: "25+", label: "Стран", icon: Globe2 },
            { number: "10K+", label: "Пользователей", icon: Users },
            { number: "99.9%", label: "Аптайм", icon: Clock },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              {...floatingAnimation}
              transition={{ ...floatingAnimation.animate.transition, delay: index * 0.2 }}
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Advantages Section */}
      <motion.section
        className="py-20 px-4 bg-black/20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Почему выбирают Securex VPN?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Военное шифрование",
                description: "AES-256 шифрование защищает ваши данные от любых угроз",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: Zap,
                title: "Максимальная скорость",
                description: "VLESS протокол обеспечивает скорость до 1 Гбит/с",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Eye,
                title: "Без логов",
                description: "Мы не храним и не отслеживаем вашу активность в сети",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Globe2,
                title: "Обход блокировок",
                description: "Доступ к любым сайтам и сервисам без ограничений",
                color: "from-blue-400 to-cyan-500",
              },
              {
                icon: Wifi,
                title: "Защита в Wi-Fi",
                description: "Безопасность в общественных сетях и точках доступа",
                color: "from-indigo-400 to-blue-500",
              },
              {
                icon: Gauge,
                title: "Стабильное соединение",
                description: "99.9% аптайм и автоматическое переподключение",
                color: "from-red-400 to-pink-500",
              },
            ].map((advantage, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileInView={glowAnimation}
                viewport={{ once: false }}
              >
                {/* Light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${advantage.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 relative z-10">{advantage.title}</h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Service Description */}
      <motion.section
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent"
          >
            Что может делать этот бот?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "🌐 Подключение к VPN",
                description:
                  "Наш бот поможет вам легко и быстро активировать ваш VPN, обеспечивая безопасность и анонимность в сети. Автоматическая настройка для всех устройств.",
                features: ["Один клик для подключения", "Автовыбор лучшего сервера", "Мгновенная активация"],
              },
              {
                icon: Package,
                title: "📦 Управление подпиской",
                description:
                  "Оформляйте, продлевайте или изменяйте тариф прямо через бота. Полный контроль над вашей подпиской.",
                features: ["Смена тарифов", "Автопродление", "История платежей"],
              },
              {
                icon: FileText,
                title: "📄 Информация о сервисе",
                description: "Получите подробные инструкции и ответы на часто задаваемые вопросы. Техподдержка 24/7.",
                features: ["Инструкции по настройке", "FAQ", "Техподдержка"],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileInView={glowAnimation}
                viewport={{ once: false }}
              >
                {/* Light sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />

                <feature.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <h3 className="text-xl font-semibold mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">{feature.description}</p>
                <ul className="space-y-2 relative z-10">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        className="py-20 px-4 bg-black/20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Тарифы с акцией 20%
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-center text-gray-300 mb-16 text-lg">
            🔥 Специальное предложение до 1 июля! Экономьте больше с длительными подписками
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                period: "1 месяц",
                oldPrice: "250₽",
                newPrice: "200₽",
                popular: false,
                savings: "Сэкономьте 50₽",
                color: "from-blue-500 to-cyan-500",
              },
              {
                period: "3 месяца",
                oldPrice: "712.50₽",
                newPrice: "570₽",
                popular: false,
                savings: "Сэкономьте 142₽",
                color: "from-purple-500 to-pink-500",
              },
              {
                period: "6 месяцев",
                oldPrice: "1350₽",
                newPrice: "1080₽",
                popular: true,
                savings: "Сэкономьте 270₽",
                color: "from-green-500 to-emerald-500",
              },
              {
                period: "12 месяцев",
                oldPrice: "2550₽",
                newPrice: "2040₽",
                popular: false,
                savings: "Сэкономьте 510₽",
                color: "from-orange-500 to-red-500",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-white/5 backdrop-blur-lg rounded-3xl p-6 border transition-all duration-300 text-center relative overflow-hidden group ${
                  plan.popular
                    ? "border-green-400/60 shadow-2xl shadow-green-400/20"
                    : "border-blue-400/20 hover:border-blue-400/40"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileInView={glowAnimation}
                viewport={{ once: false }}
              >
                {/* Light effect for pricing cards */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 4,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />

                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-400 to-emerald-500 text-black text-sm font-bold py-2 z-10">
                    🔥 ПОПУЛЯРНЫЙ
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4 mt-${plan.popular ? "8" : "4"} group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <Clock className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-4 relative z-10">{plan.period}</h3>
                <div className="mb-4 relative z-10">
                  <span className="text-gray-400 line-through text-lg">{plan.oldPrice}</span>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {plan.newPrice}
                  </div>
                  <div className="text-sm text-green-400 font-medium">{plan.savings}</div>
                </div>

                <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 px-4 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative z-10`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Выбрать
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 hover:from-green-700 hover:via-emerald-600 hover:to-teal-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl backdrop-blur-sm border border-green-400/30 transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5" />
                Попробовать бесплатно (1 сутки)
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Compatibility */}
      <motion.section
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent"
          >
            Работает на всех популярных платформах
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-12">
            Скачайте приложения для ваших устройств и настройте VPN за минуту
          </motion.p>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {[
              {
                icon: Smartphone,
                name: "Android",
                link: "https://play.google.com/store/apps/details?id=app.hiddify.com&hl=ru",
                color: "from-green-400 to-green-600",
                description: "Hiddify",
              },
              {
                icon: Monitor,
                name: "Android TV",
                link: "https://play.google.com/store/apps/details?id=app.hiddify.com&hl=ru",
                color: "from-blue-400 to-blue-600",
                description: "Hiddify",
              },
              {
                icon: Apple,
                name: "iOS",
                link: "https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973",
                color: "from-gray-400 to-gray-600",
                description: "Happ",
              },
              {
                icon: Apple,
                name: "macOS",
                link: "https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973",
                color: "from-purple-400 to-purple-600",
                description: "Happ",
              },
              {
                icon: Linux,
                name: "Linux",
                link: "https://hiddify.com/",
                color: "from-orange-400 to-orange-600",
                description: "Hiddify",
              },
            ].map((platform, index) => (
              <Link key={index} href={platform.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  whileInView={glowAnimation}
                  viewport={{ once: false }}
                  {...floatingAnimation}
                  transition={{ ...floatingAnimation.animate.transition, delay: index * 0.1 }}
                >
                  {/* Light sweep for platform cards */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 5,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${platform.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-medium text-lg relative z-10">{platform.name}</span>
                  <span className="text-sm text-gray-400 relative z-10">{platform.description}</span>
                  <div className="mt-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    Скачать →
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Enhanced Technology Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/20 relative overflow-hidden"
            whileInView={glowAnimation}
            viewport={{ once: false }}
          >
            {/* Main light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />

            <div className="flex items-center justify-center mb-6 relative z-10">
              <Lock className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold">Технологии VPN</h3>
            </div>

            <p className="text-blue-400 font-bold text-xl mb-2 relative z-10">VLESS протокол (Xray)</p>
            <p className="text-gray-300 mb-6 relative z-10">
              Высокая скорость, обход блокировок, максимальная безопасность
            </p>

            {/* Technology cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
              {[
                { icon: Zap, label: "Скорость до 1 Гбит/с", color: "from-yellow-400 to-orange-500" },
                { icon: ShieldCheck, label: "Обход DPI", color: "from-green-400 to-emerald-500" },
                { icon: Gauge, label: "Низкая задержка", color: "from-blue-400 to-cyan-500" },
                { icon: Network, label: "Стабильность", color: "from-purple-400 to-pink-500" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileInView={glowAnimation}
                  viewport={{ once: false }}
                >
                  {/* Individual card light effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 6,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  />

                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <tech.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-center relative z-10">{tech.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional technology features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {[
                {
                  icon: Key,
                  title: "AES-256 Шифрование",
                  description: "Военный стандарт защиты данных",
                  color: "from-red-400 to-pink-500",
                },
                {
                  icon: Fingerprint,
                  title: "Zero-Log Policy",
                  description: "Полная анонимность пользователей",
                  color: "from-indigo-400 to-purple-500",
                },
                {
                  icon: Router,
                  title: "Multi-Protocol",
                  description: "Поддержка VLESS, VMess, Trojan",
                  color: "from-teal-400 to-cyan-500",
                },
                {
                  icon: Database,
                  title: "Load Balancing",
                  description: "Автоматическое распределение нагрузки",
                  color: "from-orange-400 to-red-500",
                },
                {
                  icon: Cpu,
                  title: "Hardware Acceleration",
                  description: "Аппаратное ускорение шифрования",
                  color: "from-green-400 to-teal-500",
                },
                {
                  icon: Globe2,
                  title: "Global CDN",
                  description: "Серверы по всему миру",
                  color: "from-blue-400 to-indigo-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileInView={glowAnimation}
                  viewport={{ once: false }}
                >
                  {/* Feature card light effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 7,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    }}
                  />

                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 px-4 bg-black/20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
          >
            Часто задаваемые вопросы
          </motion.h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden relative"
                whileInView={glowAnimation}
                viewport={{ once: false }}
              >
                {/* FAQ light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 8,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />

                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300 relative z-10"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="p-6 pt-0 text-gray-300 leading-relaxed">{faq.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Готовы начать?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8">
            Присоединяйтесь к тысячам пользователей, которые уже защищают свою приватность с Securex VPN
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl backdrop-blur-sm border border-pink-400/30 transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)",
                  background: "linear-gradient(45deg, #ec4899, #8b5cf6, #6366f1)",
                }}
                whileTap={{ scale: 0.95 }}
                whileInView={glowAnimation}
                viewport={{ once: false }}
              >
                {/* CTA button light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />

                <Zap className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Начать использовать VPN</span>
                <ArrowRight className="w-6 h-6 relative z-10" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 bg-black/40 border-t border-blue-400/20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Image src="/logo.png" alt="Securex VPN" width={50} height={50} className="mr-4" />
              <div>
                <div className="text-xl font-bold">Securex VPN</div>
                <div className="text-gray-400">Ваша безопасность - наш приоритет</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6 py-3 rounded-xl font-medium shadow-lg backdrop-blur-sm border border-blue-400/30 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle className="w-5 h-5" />
                  Поддержка
                </motion.button>
              </Link>

              <Link href="https://t.me/securex_vpn_bot" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 px-6 py-3 rounded-xl font-medium shadow-lg backdrop-blur-sm border border-purple-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Telegram
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="text-center text-gray-400 border-t border-white/10 pt-8">
            <p>&copy; 2025 Securex VPN. Все права защищены.</p>
            <p className="mt-2 text-sm">Защищаем вашу приватность с 2024 года</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
