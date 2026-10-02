import { Link } from "react-router-dom";
import { Button } from "./Button";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-anvaya-navy text-anvaya-ivory py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-4">{eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">{title}</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}

interface CtaBandProps {
  title?: string;
  buttons: { label: string; to: string; variant?: "primary" | "outline" }[];
}

export function CtaBand({ title = "READY TO START?", buttons }: CtaBandProps) {
  return (
    <section className="bg-anvaya-navy text-white py-20 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl text-anvaya-gold mb-10">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((b) => (
            <Link key={b.label} to={b.to}>
              <Button
                variant={b.variant || "primary"}
                className={b.variant === "outline" ? "border-white text-white hover:bg-white hover:text-anvaya-navy" : ""}
                withArrow
              >
                {b.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
