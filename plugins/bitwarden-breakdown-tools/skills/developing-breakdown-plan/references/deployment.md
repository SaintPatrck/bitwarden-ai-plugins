# Deployment considerations

Feature flagging and observability decisions cut across every area, framing how the change is rolled out and how it will be diagnosed in production. For the breakdown currently in progress, evaluate and complete the `Deployment considerations` section, based on the changes described in the Architecture and per-area breakdown.

_Captured in **Plan → Deployment considerations**._

## Additive guidance not in the template

- If the change is flagged, name the flag literal (`FeatureFlag.<Name>`) and where the gate lives (client, server, or both). The template asks _where_ the flag is enforced but doesn't require naming the literal.
- If there is no telemetry surface at all, capture a one-sentence justification rather than leaving the section blank.

## Draft as a single pass

Draft both subsections in chat, present to the engineer, refine, then save.
