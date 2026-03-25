export function rankPlans(plans) {
  return plans.sort(
    (a, b) =>
      b.claimRatio - a.claimRatio ||
      a.premium - b.premium
  );
}
