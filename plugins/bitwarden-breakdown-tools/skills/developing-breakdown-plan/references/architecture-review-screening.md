# Architecture review screening

Records how this change discharges the Architecture involvement rubric. Distinct from the Security activity that precedes it: architecture review covers structure, boundaries, contracts, and pattern, while AppSec engagement covers attacker capability and what the system promises. Neither satisfies the other, and Tier 1 work usually needs both.

_Captured in **Plan → Architecture review screening**._

## Screen only once the surfaces are known

The rubric's Tier 1 rows turn on surfaces earlier activities enumerate: API surface, data stores, and persistence of user data come out of Activity 2, and cryptography and key material out of Activity 4. Screening before those are drafted produces a `none` that goes stale without anything noticing, so this activity runs after both.

## Fetch the rubric

Fetch page `3294724098` with `get_confluence_page`, the [Architecture involvement rubric](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/3294724098/Architecture+Involvement+Rubric). If it cannot be fetched for any reason (plugin absent, auth failure, page moved), send the engineer that link and ask them to paste the tier lists and questions. Never pose tier questions from memory; a record screened against a remembered rubric is worse than no record, because it reads as authoritative.

## Record what the engineer answers

Put the questions to the engineer one at a time and record what they say:

- **Tier 1 triggers** and **Tier 2 answers**: which rows or questions apply, or `none`.
- **Decision**: `Reviewed`, `pending`, or `not required`. `not required` carries one line of why review was not needed; the other two are carried by `Reference`. A Tier 1 trigger cannot be recorded as `not required`; it is `Reviewed` once Architecture has ruled, or `pending` until then.
- **Reference**: the council session, thread, or ADR behind the decision. Required once `Decision` is `Reviewed` or `pending`. When `Decision` is `not required`, delete the template's exemplar text and leave the cell empty.

The engineer answers; you record. Do not decide a tier on their behalf, and do not treat a Key Management or AppSec review as the screening outcome.

A `pending` decision is carried into the Output step so it is visible at handoff. This activity is also where the reviewer-readiness gate sends you back to when the record is incomplete.
