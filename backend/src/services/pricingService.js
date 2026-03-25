export function calculatePremium(user, plan) {
  const base = plan.basePrice;
  const ageFactor = user.age * 120;
  const memberFactor = user.members * 500;
  const coverageFactor = user.coverage / 10000;

  return Math.round(base + ageFactor + memberFactor + coverageFactor);
}
