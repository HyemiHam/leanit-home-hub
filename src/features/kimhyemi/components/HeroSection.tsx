import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const textVariants = {
    hidden: { opacity: 0, y: 80, skewY: 3 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8 + i * 0.03,
        ease: "easeOut",
      },
    }),
  };

  const subtitle = t(
    "기술의 언어를 당신의 언어로.",
    "Translating tech into your language."
  );

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 bg-red-700 overflow-hidden relative">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(185,28,28,1) 0%, rgba(127,29,29,1) 100%)",
            "linear-gradient(135deg, rgba(127,29,29,1) 0%, rgba(185,28,28,1) 100%)",
            "linear-gradient(135deg, rgba(185,28,28,1) 0%, rgba(127,29,29,1) 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div className="max-w-6xl relative z-10">
        {/* Main headline with stagger animation */}
        <h1
          className="text-6xl md:text-8xl lg:text-[6rem] tracking-tight uppercase leading-[0.85] mb-8 text-white font-bold"
          style={{
            fontFamily: "var(--font-headline-kr)",
            textShadow: "4px 4px 5px rgba(67, 67, 67, 1)"
          }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {t("CAN YOU TELL ME", "CAN YOU TELL ME")}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block pl-[0.2ch]"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {t("YOUR STORY?", "YOUR STORY?")}
            </motion.span>
          </div>
        </h1>

        {/* Animated subtitle with letter-by-letter reveal */}
        <div className="pl-[2ch]">
          <motion.p
            className="text-lg md:text-xl max-w-xl mb-2"
            style={{
              color: "#d3d3d3ff",
              fontFamily: "var(--font-headline-kr)",
              textShadow: "2px 2px 1px rgba(67, 67, 67, 0.5)"
            }}
          >
            {subtitle.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
            {/* Blinking cursor */}
            <motion.span
              className="inline-block w-[2px] h-[1.2em] bg-white/70 ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
            />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-base md:text-lg"
            style={{
              color: "#d3d3d3ff",
              fontFamily: "var(--font-headline-kr)",
              textShadow: "2px 2px 1px rgba(67, 67, 67, 0.5)"
            }}
          >
            {t("기업 맞춤 AI컨설팅/교육", "Corporate AI Consulting & Education")}{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="text-white font-semibold"
            >
              {t("김 혜 미", "Hyemi Kim")}
            </motion.span>
          </motion.p>
        </div>

        {/* Decorative animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="h-[2px] bg-white/30 mt-12 origin-left max-w-md"
        />
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          className="text-xs text-white/60 tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-white/20 rounded-full hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-3 h-3 bg-white/10 rounded-full hidden lg:block"
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
};

export default HeroSection;
