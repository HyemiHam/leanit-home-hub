import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicEntries, PROFILE_CATEGORIES } from "../profile-api";

const LogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { t, language } = useLanguage();
  const { data: entries = [], isPending, isError, refetch } = useQuery({
    queryKey: ["kimhyemi", "public-entries"],
    queryFn: fetchPublicEntries,
    staleTime: 0,
  });
  const categories = PROFILE_CATEGORIES.map((category) => ({
    ...category,
    entries: entries.filter((entry) => entry.category === category.id),
  }));

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="log" className="py-32 px-8 md:px-16 lg:px-24 bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">02</span>
          <span className="text-sm font-medium tracking-wider uppercase">Log</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="section-headline mb-4"
        >
          Work Log
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-16"
        >
          {t(
            "각 카테고리를 클릭하시면 상세경력을 확인하실 수 있습니다",
            "Click each category to view detailed experience"
          )}
        </motion.p>

        <div className="space-y-4">
          {isPending && <p role="status">{t("경력을 불러오는 중입니다…", "Loading experience…")}</p>}
          {isError && (
            <div role="alert" className="border border-border p-6">
              <p>{t("경력을 불러오지 못했습니다.", "Unable to load experience.")}</p>
              <button type="button" onClick={() => void refetch()} className="mt-3 underline">
                {t("다시 시도", "Try again")}
              </button>
            </div>
          )}
          {!isPending && !isError && categories.map((category, categoryIndex) => {
            const isOpen = openCategories.includes(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                className="border border-border overflow-hidden"
              >
                <motion.button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between p-6 transition-colors group ${
                    isOpen
                      ? "bg-red-700 text-white"
                      : "hover:bg-red-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl md:text-4xl font-headline uppercase tracking-tight">
                      {category.title}
                    </span>
                    <span className={`text-sm transition-colors ${isOpen ? "text-white/70" : "text-muted-foreground group-hover:text-white/70"}`}>
                      ({language === "KO" ? category.titleKr : category.title})
                    </span>
                    <span className={`text-xs transition-colors ${isOpen ? "text-white/60" : "text-muted-foreground group-hover:text-white/60"}`}>
                      {category.entries.length}{t("건", " entries")}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border">
                        {category.entries.length === 0 && (
                          <p className="p-4 text-muted-foreground">{t("등록된 경력이 없습니다.", "No entries yet.")}</p>
                        )}
                        {category.entries.map((entry, entryIndex) => (
                          <motion.article
                            key={entry.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: entryIndex * 0.05 }}
                            className="p-4 border-b border-border last:border-b-0 hover:bg-background/30 transition-colors cursor-pointer group"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-xs text-muted-foreground">
                                    ({entry.year})
                                  </span>
                                </div>
                                <h3 className="text-base md:text-lg font-medium group-hover:text-accent transition-colors">
                                  {language === "KO" ? entry.titleKo : entry.titleEn || entry.titleKo}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-lg whitespace-pre-line">
                                  {language === "KO" ? entry.descriptionKo : entry.descriptionEn || entry.descriptionKo}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 md:justify-end md:max-w-xs">
                                {entry.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs text-muted-foreground"
                                  >
                                    {tag}
                                    {tagIndex < entry.tags.length - 1 && ","}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogSection;
