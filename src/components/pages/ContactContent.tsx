'use client';

import { GlassCard } from '@/components/react/ui/GlassCard';
import { StatusIndicator } from '@/components/react/ui/StatusIndicator';

export function ContactContent() {
  return (
    <div
      className="mx-auto max-w-4xl p-6 py-20 transition-all duration-300 ease-in-out"
      style={{
        paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
        paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
      }}
    >
      <section className="mb-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Have a project in mind? We&apos;d love to hear about it.
          Drop us a message and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="glass p-6">
            <h2 className="mb-6 font-display text-lg font-semibold">Send a Message</h2>
            <form className="space-y-5" action="#" method="POST">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-muted">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 lg:col-span-2">
          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Email</h3>
            <a href="mailto:hello@warehaus.studio" className="mt-1 block text-sm text-foreground transition-colors hover:text-accent">
              hello@warehaus.studio
            </a>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Location</h3>
            <p className="mt-1 text-sm text-foreground">Remote-first, globally distributed</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-accent">Availability</h3>
              <StatusIndicator status="online" label="Open" size="sm" />
            </div>
            <p className="mt-1 text-sm text-foreground/80">
              Currently accepting new projects for Q2 2026.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Social</h3>
            <div className="mt-2 flex gap-3">
              <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">Twitter</a>
              <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">Dribbble</a>
              <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">GitHub</a>
              <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">LinkedIn</a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
