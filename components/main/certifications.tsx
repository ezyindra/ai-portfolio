"use client";

import { CERTIFICATIONS } from "@/constants";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="w-full py-20 flex flex-col items-center justify-center text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Certifications & Credentials
      </h2>

      <p className="text-white/60 mb-12 text-center max-w-xl px-4">
        Verified expertise through industry-recognized programs and applied learning.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-6">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 transition"
          >
            <h3 className="font-semibold text-lg">
              {cert.title}
            </h3>

            <p className="text-sm text-white/60 mt-2">
              {cert.skills}
            </p>

            <span className="text-xs text-white/40 mt-3 block">
              {cert.year}
            </span>

            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs text-purple-400 hover:text-purple-300 transition"
              >
                View credential →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
