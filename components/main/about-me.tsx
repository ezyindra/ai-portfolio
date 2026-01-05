'use client';

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="relative w-full min-h-screen px-6 md:px-20 py-20 text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        About Me
      </h2>

      <p className="max-w-3xl text-gray-400 text-lg leading-relaxed">
        I’m a full-stack developer focused on building scalable, performant,
        and visually refined web applications. I enjoy working at the
        intersection of engineering, design, and problem-solving.
      </p>
    </section>
  );
};

export default AboutMe;
