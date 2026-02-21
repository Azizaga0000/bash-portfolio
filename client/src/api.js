const withJson = async (resource, init) => {
  const response = await fetch(resource, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload;
};

export const getPortfolioData = async () => {
  const [profile, projects, skills, timeline, activity] = await Promise.all([
    withJson("/api/profile"),
    withJson("/api/projects"),
    withJson("/api/skills"),
    withJson("/api/timeline"),
    withJson("/api/activity")
  ]);

  return { profile, projects, skills, timeline, activity };
};

export const sendMessage = (payload) =>
  withJson("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
