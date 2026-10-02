export function StaticPage({ title, content }: { title: string, content: string }) {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="font-serif text-4xl text-anvaya-navy uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">
        {title}
      </h1>
      <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export const AboutContent = `
  <p class="mb-4">Anvaya is the definitive B2B Inventory Recovery Exchange. We help businesses turn surplus, slow-moving, and aged inventory into working capital.</p>
  <p>Our platform connects verified sellers with qualified buyers, ensuring trust, transparency, and seamless negotiation through our proprietary three-column offer engine.</p>
`;

export const TermsContent = `
  <h3 class="font-bold mb-2">1. Acceptance of Terms</h3>
  <p class="mb-4">By accessing the Anvaya Exchange, you agree to be bound by these terms. All businesses must be verified before participating.</p>
  <h3 class="font-bold mb-2">2. Transactions & Fees</h3>
  <p>All accepted offers represent legally binding contracts. Anvaya charges a standard 1% platform fee on all successfully cleared transactions.</p>
`;
