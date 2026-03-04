export const config = {
  port: parseInt(process.env.PORT || "8404", 10),

  // Grok API (xAI) - LLM-as-judge
  grok: {
    apiKey: process.env.XAI_API_KEY || "",
    model: "grok-4-1-fast",
    apiUrl: "https://api.x.ai/v1/chat/completions",
  },

  // Supabase (shared RugSlayer/CORTEX project)
  supabase: {
    url: process.env.SUPABASE_URL || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },

  // x402 payment config
  payment: {
    wallet: process.env.PAYMENT_WALLET || "2MB8Gk4PebwhP6yaiiMjofHYoQvvQ8iWo3hdkUHQ1Wdq",
    facilitator: process.env.X402_FACILITATOR || "https://facilitator.payai.network",
    network: "solana" as const,
    currency: "USDC",
  },

  // Tool pricing (in USD)
  pricing: {
    verify_outcome: 0.01,
    get_service_quality: 0.005,
    report_outcome: 0.002,
  },
} as const;
