import {
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site } from "@/content/site";

const CHANNELS = [
  {
    Icon: MailIcon,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone}`,
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    value: "palash-bera",
    href: "https://www.linkedin.com/in/palash-bera",
    external: true,
  },
  {
    Icon: PinIcon,
    label: "Location",
    value: site.location,
  },
];

export function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <Reveal>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted">
          I&apos;m always happy to talk about backend architecture, performance
          work, or a product you&apos;re trying to get off the ground. The
          fastest way to reach me is email.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {CHANNELS.map(({ Icon, label, value, href, external }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="h-4 w-4 shrink-0 text-subtle" />
              <span className="sr-only">{label}:</span>
              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-sm break-all transition-colors hover:text-accent"
                >
                  {value}
                </a>
              ) : (
                <span className="text-sm text-muted">{value}</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
