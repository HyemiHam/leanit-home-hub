import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  AdminSession,
  createAdminEntry,
  deleteAdminEntry,
  fetchAdminEntries,
  fetchAdminSession,
  loginAdmin,
  logoutAdmin,
  PROFILE_CATEGORIES,
  ProfileApiError,
  ProfileCategoryId,
  ProfileEntry,
  ProfileEntryInput,
  updateAdminEntry,
} from "./profile-api";

interface EditorDraft {
  category: ProfileCategoryId;
  year: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  tags: string;
  sortOrder: string;
  published: boolean;
}

const EMPTY_DRAFT: EditorDraft = {
  category: "ai-education",
  year: "",
  titleKo: "",
  titleEn: "",
  descriptionKo: "",
  descriptionEn: "",
  tags: "",
  sortOrder: "0",
  published: true,
};

const fieldClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500";
const buttonFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2";

function messageFrom(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "알 수 없는 오류가 발생했습니다.";
}

function draftFromEntry(entry: ProfileEntry): EditorDraft {
  return {
    category: entry.category,
    year: entry.year,
    titleKo: entry.titleKo,
    titleEn: entry.titleEn,
    descriptionKo: entry.descriptionKo,
    descriptionEn: entry.descriptionEn,
    tags: entry.tags.join(", "),
    sortOrder: String(entry.sortOrder),
    published: entry.published,
  };
}

function payloadFromDraft(draft: EditorDraft): ProfileEntryInput {
  return {
    category: draft.category,
    year: draft.year.trim(),
    titleKo: draft.titleKo.trim(),
    titleEn: draft.titleEn.trim(),
    descriptionKo: draft.descriptionKo.trim(),
    descriptionEn: draft.descriptionEn.trim(),
    tags: draft.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    sortOrder: Number(draft.sortOrder),
    published: draft.published,
  };
}

const AdminPage = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<ProfileEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProfileCategoryId>("ai-education");
  const [draft, setDraft] = useState<EditorDraft>(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState<"login" | "logout" | "list" | "save" | "delete" | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetSession = useCallback((preserveDraft = false) => {
    setSession(null);
    setEntries([]);
    if (!preserveDraft) {
      setEditingId(null);
      setDraft(EMPTY_DRAFT);
    }
    setPassword("");
  }, []);

  const handleApiError = useCallback((requestError: unknown, fallback: string) => {
    if (requestError instanceof ProfileApiError && requestError.status === 401) {
      resetSession(true);
      setSuccess("");
      setError("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
      return;
    }
    setError(messageFrom(requestError) || fallback);
  }, [resetSession]);

  const loadEntries = useCallback(async () => {
    setBusy("list");
    setError("");
    try {
      const nextEntries = await fetchAdminEntries();
      setEntries(nextEntries);
    } catch (requestError) {
      handleApiError(requestError, "항목을 불러오지 못했습니다.");
    } finally {
      setBusy(null);
    }
  }, [handleApiError]);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const currentSession = await fetchAdminSession();
        if (!active) return;
        setSession(currentSession);
        setUsername(currentSession.username);
        setBusy("list");
        try {
          const nextEntries = await fetchAdminEntries();
          if (active) setEntries(nextEntries);
        } catch (requestError) {
          if (active) handleApiError(requestError, "항목을 불러오지 못했습니다.");
        } finally {
          if (active) setBusy(null);
        }
      } catch (requestError) {
        if (!active) return;
        if (!(requestError instanceof ProfileApiError && requestError.status === 401)) {
          setError(messageFrom(requestError));
        }
      } finally {
        if (active) setCheckingSession(false);
      }
    };

    checkSession();
    return () => {
      active = false;
    };
  }, [handleApiError]);

  const visibleEntries = useMemo(
    () => entries
      .filter((entry) => entry.category === activeCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [activeCategory, entries],
  );

  const startNew = () => {
    setEditingId(null);
    setDraft({ ...EMPTY_DRAFT, category: activeCategory });
    setError("");
    setSuccess("");
  };

  const startEdit = (entry: ProfileEntry) => {
    setEditingId(entry.id);
    setDraft(draftFromEntry(entry));
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateDraft = <K extends keyof EditorDraft>(key: K, value: EditorDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy("login");
    setError("");
    setSuccess("");
    try {
      const nextSession = await loginAdmin(username.trim(), password);
      setSession(nextSession);
      setPassword("");
      setBusy("list");
      try {
        const nextEntries = await fetchAdminEntries();
        setEntries(nextEntries);
      } catch (requestError) {
        handleApiError(requestError, "로그인했지만 항목을 불러오지 못했습니다.");
      }
    } catch (requestError) {
      setError(messageFrom(requestError));
    } finally {
      setBusy(null);
    }
  };

  const handleLogout = async () => {
    if (!session) return;
    setBusy("logout");
    setError("");
    setSuccess("");
    try {
      await logoutAdmin(session.csrfToken);
      resetSession();
    } catch (requestError) {
      handleApiError(requestError, "로그아웃하지 못했습니다.");
    } finally {
      setBusy(null);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const payload = payloadFromDraft(draft);
    if (!payload.year || !payload.titleKo || !payload.descriptionKo) {
      setError("연도, 한국어 제목, 한국어 설명을 입력해 주세요.");
      return;
    }
    if (
      !Number.isInteger(payload.sortOrder) ||
      payload.sortOrder < -1_000_000 ||
      payload.sortOrder > 1_000_000
    ) {
      setError("정렬 순서는 -1,000,000부터 1,000,000 사이의 정수로 입력해 주세요.");
      return;
    }
    if (payload.tags.length > 20) {
      setError("태그는 최대 20개까지 입력할 수 있습니다.");
      return;
    }
    if (payload.tags.some((tag) => tag.length > 50)) {
      setError("태그 하나는 50자 이내로 입력해 주세요.");
      return;
    }

    setBusy("save");
    setError("");
    setSuccess("");
    try {
      const savedEntry = editingId === null
        ? await createAdminEntry(payload, session.csrfToken)
        : await updateAdminEntry(editingId, payload, session.csrfToken);

      setEntries((current) => editingId === null
        ? [...current, savedEntry]
        : current.map((entry) => entry.id === editingId ? savedEntry : entry));
      setActiveCategory(savedEntry.category);
      setEditingId(null);
      setDraft({ ...EMPTY_DRAFT, category: savedEntry.category });
      setSuccess(editingId === null ? "항목을 추가했습니다." : "항목을 수정했습니다.");
    } catch (requestError) {
      handleApiError(requestError, "항목을 저장하지 못했습니다.");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (entry: ProfileEntry) => {
    if (!session) return;
    if (!window.confirm(`“${entry.titleKo}” 항목을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)) return;

    setBusy("delete");
    setError("");
    setSuccess("");
    try {
      await deleteAdminEntry(entry.id, session.csrfToken);
      setEntries((current) => current.filter((item) => item.id !== entry.id));
      if (editingId === entry.id) startNew();
      setSuccess("항목을 삭제했습니다.");
    } catch (requestError) {
      handleApiError(requestError, "항목을 삭제하지 못했습니다.");
    } finally {
      setBusy(null);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 text-neutral-900">
        <p role="status" className="text-sm text-neutral-600">관리자 세션을 확인하는 중입니다…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10 text-neutral-900">
        <section className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="login-title">
          <div className="mb-7 border-l-4 border-red-700 pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700">Kim Hyemi Profile</p>
            <h1 id="login-title" className="mt-1 text-2xl font-bold">관리자 로그인</h1>
          </div>
          {error && <p role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
          <form className="space-y-5" onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-neutral-700">
              사용자 이름
              <input
                className={fieldClass}
                name="username"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={busy === "login"}
              />
            </label>
            <label className="block text-sm font-medium text-neutral-700">
              비밀번호
              <input
                className={fieldClass}
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={busy === "login"}
              />
            </label>
            <button
              type="submit"
              disabled={busy === "login"}
              className={`w-full rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}
            >
              {busy === "login" ? "로그인 중…" : "로그인"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  const mutationBusy = busy === "save" || busy === "delete";
  const actionBusy = busy !== null;

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">Kim Hyemi Profile</p>
            <h1 className="text-xl font-bold sm:text-2xl">경력 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-neutral-500 sm:inline">{session.username}</span>
            <a
              href="/kimhyemi"
              className={`rounded-md px-2 py-2 text-sm font-medium text-neutral-600 transition hover:text-red-700 ${buttonFocus}`}
            >
              공개 페이지
            </a>
            <button
              type="button"
              onClick={handleLogout}
              disabled={busy !== null}
              className={`rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}
            >
              {busy === "logout" ? "로그아웃 중…" : "로그아웃"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div aria-live="polite" className="mb-5 space-y-2">
          {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
          {success && <p role="status" className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="editor-title">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <p className="text-xs font-semibold text-red-700">{editingId === null ? "CREATE" : "EDIT"}</p>
                <h2 id="editor-title" className="text-lg font-bold">{editingId === null ? "새 경력 항목" : "경력 항목 수정"}</h2>
              </div>
              <button
                type="button"
                onClick={startNew}
                disabled={actionBusy}
                className={`rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}
              >
                새 항목
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSave}>
              <label className="block text-sm font-medium text-neutral-700">
                카테고리 <span className="text-red-700" aria-hidden="true">*</span>
                <select className={fieldClass} value={draft.category} onChange={(event) => updateDraft("category", event.target.value as ProfileCategoryId)} disabled={mutationBusy}>
                  {PROFILE_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.titleKr} · {category.title}</option>)}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-neutral-700">
                  연도 <span className="text-red-700" aria-hidden="true">*</span>
                  <input className={fieldClass} required maxLength={40} placeholder="예: 2026.09" value={draft.year} onChange={(event) => updateDraft("year", event.target.value)} disabled={mutationBusy} />
                </label>
                <label className="block text-sm font-medium text-neutral-700">
                  정렬 순서 <span className="text-red-700" aria-hidden="true">*</span>
                  <input className={fieldClass} type="number" required min={-1_000_000} max={1_000_000} step={1} value={draft.sortOrder} onChange={(event) => updateDraft("sortOrder", event.target.value)} disabled={mutationBusy} />
                </label>
              </div>

              <label className="block text-sm font-medium text-neutral-700">
                한국어 제목 <span className="text-red-700" aria-hidden="true">*</span>
                <input className={fieldClass} required maxLength={300} value={draft.titleKo} onChange={(event) => updateDraft("titleKo", event.target.value)} disabled={mutationBusy} />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                영어 제목 <span className="font-normal text-neutral-400">(선택)</span>
                <input className={fieldClass} lang="en" maxLength={300} value={draft.titleEn} onChange={(event) => updateDraft("titleEn", event.target.value)} disabled={mutationBusy} />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                한국어 설명 <span className="text-red-700" aria-hidden="true">*</span>
                <textarea className={`${fieldClass} min-h-24 resize-y`} required maxLength={2_000} value={draft.descriptionKo} onChange={(event) => updateDraft("descriptionKo", event.target.value)} disabled={mutationBusy} />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                영어 설명 <span className="font-normal text-neutral-400">(선택)</span>
                <textarea className={`${fieldClass} min-h-24 resize-y`} lang="en" maxLength={2_000} value={draft.descriptionEn} onChange={(event) => updateDraft("descriptionEn", event.target.value)} disabled={mutationBusy} />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                태그 <span className="font-normal text-neutral-400">(쉼표로 구분)</span>
                <input className={fieldClass} maxLength={1_038} placeholder="AI, 교육, 워크숍" value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} disabled={mutationBusy} />
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm font-medium text-neutral-700">
                <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-red-700 focus:ring-red-700" checked={draft.published} onChange={(event) => updateDraft("published", event.target.checked)} disabled={mutationBusy} />
                공개하기
              </label>
              <button
                type="submit"
                disabled={actionBusy}
                className={`w-full rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}
              >
                {busy === "save" ? "저장 중…" : editingId === null ? "항목 추가" : "변경 사항 저장"}
              </button>
            </form>
          </section>

          <section className="min-w-0 rounded-xl border border-neutral-200 bg-white shadow-sm" aria-labelledby="entries-title">
            <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-red-700">ENTRIES</p>
                  <h2 id="entries-title" className="text-lg font-bold">등록 항목</h2>
                </div>
                <button type="button" onClick={loadEntries} disabled={busy !== null} className={`rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}>
                  {busy === "list" ? "불러오는 중…" : "새로고침"}
                </button>
              </div>

              <div className="hidden gap-2 sm:flex" role="group" aria-label="경력 카테고리">
                {PROFILE_CATEGORIES.map((category) => {
                  const selected = activeCategory === category.id;
                  const count = entries.filter((entry) => entry.category === category.id).length;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition ${buttonFocus} ${selected ? "bg-red-700 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
                    >
                      {category.titleKr} <span className={selected ? "text-red-100" : "text-neutral-400"}>({count})</span>
                    </button>
                  );
                })}
              </div>
              <label className="block text-sm font-medium text-neutral-700 sm:hidden">
                카테고리 보기
                <select className={fieldClass} value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as ProfileCategoryId)}>
                  {PROFILE_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.titleKr}</option>)}
                </select>
              </label>
            </div>

            <div className="p-5 sm:p-6">
              {busy === "list" && entries.length === 0 ? (
                <p role="status" className="py-12 text-center text-sm text-neutral-500">항목을 불러오는 중입니다…</p>
              ) : visibleEntries.length === 0 ? (
                <p className="rounded-md border border-dashed border-neutral-300 px-4 py-12 text-center text-sm text-neutral-500">이 카테고리에 등록된 항목이 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {visibleEntries.map((entry) => (
                    <li key={entry.id} className="rounded-lg border border-neutral-200 p-4 transition hover:border-neutral-300">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                            <span>{entry.year}</span>
                            <span>순서 {entry.sortOrder}</span>
                            <span className={`rounded-full px-2 py-0.5 font-medium ${entry.published ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>{entry.published ? "공개" : "비공개"}</span>
                          </div>
                          <h3 className="break-words font-semibold text-neutral-900">{entry.titleKo}</h3>
                          {entry.titleEn && <p className="mt-0.5 break-words text-sm text-neutral-500" lang="en">{entry.titleEn}</p>}
                          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-neutral-600">{entry.descriptionKo}</p>
                          {entry.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{entry.tags.map((tag, index) => <span key={`${tag}-${index}`} className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600">{tag}</span>)}</div>}
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button type="button" onClick={() => startEdit(entry)} disabled={actionBusy} className={`rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}>수정</button>
                          <button type="button" onClick={() => handleDelete(entry)} disabled={actionBusy} className={`rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 ${buttonFocus}`}>{busy === "delete" ? "처리 중…" : "삭제"}</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
