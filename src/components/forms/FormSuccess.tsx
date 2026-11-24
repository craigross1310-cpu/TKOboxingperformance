import { CheckCircle2, Mail, TriangleAlert } from "lucide-react";
import { site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";

export function FormSuccess({
  delivered,
  name,
  mailBody,
  subject,
  onReset,
}: {
  delivered: boolean;
  name: string;
  mailBody: string;
  subject: string;
  onReset: () => void;
}) {
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  return (
    <div role="status" aria-live="polite" className="border border-line bg-char p-8 md:p-10">
      {delivered ? (
        <>
          <CheckCircle2 className="size-10 text-emerald-400" />
          <h3 className="display-tight mt-5 text-4xl text-white">Thanks, {name.split(" ")[0]}.</h3>
          <p className="mt-4 max-w-lg text-white/75">
            Your enquiry is with the TKO team. We’ll get back to you as soon as possible — usually within a day.
          </p>
        </>
      ) : (
        <>
          <TriangleAlert className="size-10 text-amber-300" />
          <h3 className="display-tight mt-5 text-3xl text-white">Demo form — not sent yet</h3>
          <p className="mt-4 max-w-lg text-white/75">
            Everything checked out, but this demo isn’t connected to TKO’s inbox yet, so{" "}
            <strong className="text-white">your enquiry has not been sent</strong>. Send it by email instead — we’ve
            filled it in for you.
          </p>
          <a href={mailto} className={buttonClass("primary", "md", "mt-6")}>
            <Mail className="size-4" /> Email it to TKO
          </a>
        </>
      )}
      <button type="button" onClick={onReset} className="mt-6 block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel hover:text-white">
        Send another enquiry
      </button>
    </div>
  );
}
