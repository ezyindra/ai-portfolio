import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  live?: string;
  github?: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  live,
  github,
}: ProjectCardProps) => {
  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-[#2A0E61] bg-black/40 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/40 hover:border-purple-500">

      {/* Particle Layer */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-6 left-6 animate-ping" />
        <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full bottom-10 right-10 animate-pulse" />
        <div className="absolute w-1 h-1 bg-purple-300 rounded-full top-20 right-16 animate-bounce" />
        <div className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full bottom-20 left-14 animate-ping" />
      </div>

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 blur-xl" />

      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 p-6">
        <h1 className="text-2xl font-semibold text-white group-hover:text-purple-400 transition">
          {title}
        </h1>

        <p className="mt-3 text-gray-300 flex-1">
          {description}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          {live && (
            <Link
              href={live}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-sm"
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
          )}

          {github && (
            <Link
              href={github}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition text-sm"
            >
              <Github size={16} />
              GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]"
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
};
