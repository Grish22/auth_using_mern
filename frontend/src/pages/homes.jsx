import React from "react";

function Home() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Welcome to DevBlog 🌍</h1>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <img
            src="/blog1.jpg"
            alt="Blog"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            DevBlog is your space to explore, express, and engage with a world full of ideas.
            Whether you're here to read inspiring stories, share your technical journey,
            or publish your thoughts with the world — you're in the right place.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            From personal experiences and lifestyle advice to deep technical guides and tutorials,
            our platform is built to support creators from all walks of life. We believe in the power
            of writing, in the value of shared knowledge, and in giving every voice a platform.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            As a reader, you’ll find fresh blogs published every day — from beginners learning to code,
            to professionals sharing their expertise. As a writer, you can start crafting your first
            post within minutes. No gatekeeping. No unnecessary steps. Just ideas flowing from your
            mind to the world.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're logged in or just browsing, we invite you to dive into our content,
            discover new perspectives, and maybe even be inspired to create something of your own.
            Every visit, every read, every post contributes to our growing community of thinkers
            and storytellers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
