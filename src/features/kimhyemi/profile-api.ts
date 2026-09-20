export const PROFILE_CATEGORIES = [
  { id: "ai-education", title: "AI Education", titleKr: "강의경력" },
  { id: "partnership", title: "Partnership", titleKr: "외부 활동" },
  { id: "it-project", title: "IT Project", titleKr: "주요 프로젝트" },
] as const;

export type ProfileCategoryId = (typeof PROFILE_CATEGORIES)[number]["id"];
export type ProfileCategory = ProfileCategoryId;

export interface ProfileEntry {
  id: number;
  category: ProfileCategoryId;
  year: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  tags: string[];
  sortOrder: number;
  published: boolean;
}

export type ProfileEntryInput = Omit<ProfileEntry, "id">;

export interface AdminSession {
  username: string;
  csrfToken: string;
}

export class ProfileApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ProfileApiError";
    this.status = status;
  }
}

const API_BASE = "/api/kimhyemi";

async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  responseType: "json" | "empty" = "json",
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
  });

  let data: unknown;
  let invalidJson = false;
  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch {
      invalidJson = true;
    }
  }

  if (!response.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? String(data.error)
      : `요청을 처리하지 못했습니다. (${response.status})`;
    throw new ProfileApiError(message, response.status);
  }

  if (
    (responseType === "json" && (response.status === 204 || invalidJson)) ||
    (responseType === "empty" && response.status !== 204)
  ) {
    throw new ProfileApiError("서버가 예상한 형식의 응답을 반환하지 않았습니다.", response.status);
  }

  return data as T;
}

function jsonRequest(method: "POST" | "PUT", body?: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

function authenticatedJsonRequest(
  method: "POST" | "PUT" | "DELETE",
  csrfToken: string,
  body?: unknown,
): RequestInit {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

export function fetchPublicEntries(): Promise<ProfileEntry[]> {
  return apiRequest<ProfileEntry[]>("/entries");
}

export function fetchAdminSession(): Promise<AdminSession> {
  return apiRequest<AdminSession>("/admin/session");
}

export function loginAdmin(username: string, password: string): Promise<AdminSession> {
  return apiRequest<AdminSession>(
    "/admin/login",
    jsonRequest("POST", { username, password }),
  );
}

export function logoutAdmin(csrfToken: string): Promise<void> {
  return apiRequest<void>(
    "/admin/logout",
    authenticatedJsonRequest("POST", csrfToken),
    "empty",
  );
}

export function fetchAdminEntries(): Promise<ProfileEntry[]> {
  return apiRequest<ProfileEntry[]>("/admin/entries");
}

export function createAdminEntry(
  entry: ProfileEntryInput,
  csrfToken: string,
): Promise<ProfileEntry> {
  return apiRequest<ProfileEntry>(
    "/admin/entries",
    authenticatedJsonRequest("POST", csrfToken, entry),
  );
}

export function updateAdminEntry(
  id: number,
  entry: ProfileEntryInput,
  csrfToken: string,
): Promise<ProfileEntry> {
  return apiRequest<ProfileEntry>(
    `/admin/entries/${id}`,
    authenticatedJsonRequest("PUT", csrfToken, entry),
  );
}

export function deleteAdminEntry(id: number, csrfToken: string): Promise<void> {
  return apiRequest<void>(
    `/admin/entries/${id}`,
    authenticatedJsonRequest("DELETE", csrfToken),
    "empty",
  );
}
