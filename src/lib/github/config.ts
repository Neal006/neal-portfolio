export const GITHUB_LOGIN = "Neal006";
/** How often the live GitHub data is re-fetched in production (seconds). */
export const GITHUB_REVALIDATE_SECONDS = 6 * 60 * 60;

/** Pretty names for GitHub orgs; unknown logins render as-is. */
export const ORG_NAMES: Record<string, string> = {
  "google-deepmind": "Google DeepMind",
  huggingface: "Hugging Face",
  opencv: "OpenCV",
  anthropics: "Anthropic",
  cloudflare: "Cloudflare",
  "curriculo-tech": "Curriculo",
  "agentscope-ai": "AgentScope (Alibaba)",
  "langchain-ai": "LangChain",
  "xai-org": "xAI",
  nasa: "NASA",
  "Project-HAMi": "Project HAMi (CNCF)",
  bcherny: "json-schema-to-typescript",
  "trh-ds": "HelioOps team",
  "Priyanshu-byte-coder": "Priyanshu-byte-coder",
};

export const orgName = (login: string): string => ORG_NAMES[login] ?? login;
