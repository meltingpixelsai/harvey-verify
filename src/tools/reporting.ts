import { getSupabase } from "../lib/supabase-client.js";
import { randomUUID } from "crypto";

interface ReportInput {
  service_id: string;
  was_successful: boolean;
  response_time_ms?: number;
  notes?: string;
}

interface ReportResult {
  report_id: string;
  service_id: string;
  recorded: boolean;
}

/** Simple outcome report - no LLM, just records pass/fail */
export async function reportOutcome(input: ReportInput): Promise<ReportResult> {
  const reportId = `rpt_${randomUUID().slice(0, 12)}`;
  const sb = getSupabase();

  const { error } = await sb.from("verification_results").insert({
    verification_id: reportId,
    service_id: input.service_id,
    request_description: input.notes || "Outcome report",
    completeness_score: input.was_successful ? 100 : 0,
    accuracy_score: input.was_successful ? 100 : 0,
    format_compliance: input.was_successful,
    sla_met: true,
    overall_pass: input.was_successful,
    issues: input.was_successful ? [] : ["Agent reported failure"],
    summary: input.was_successful ? "Agent reported successful outcome" : "Agent reported failed outcome",
    response_time_ms: input.response_time_ms || null,
    verification_type: "report",
  });

  if (error) throw new Error(`Failed to record report: ${error.message}`);

  return {
    report_id: reportId,
    service_id: input.service_id,
    recorded: true,
  };
}
