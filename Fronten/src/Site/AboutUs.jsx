import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10 sm:px-10 lg:px-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">About Us</h1>
        <p className="text-lg text-gray-600">Empowering Your Fitness Journey — One Step at a Time</p>
      </header>

      <main className="space-y-10 text-gray-700 max-w-4xl mx-auto">
        <section>
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p>
            At <span className="font-semibold">Fitness Tracker</span>, our mission is to empower individuals to take control of their
            health and fitness through smart, easy-to-use digital tools. We understand that every fitness journey is unique,
            and we are here to support yours every step of the way.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Why We Built This</h2>
          <p>
            With the rising global interest in health and fitness and the increasing reliance on smartphones and technology,
            we recognized the need for a comprehensive, accessible solution that helps users manage every aspect of their fitness.
            From tracking workouts and meals to monitoring progress and setting goals, <span className="font-semibold">Fitness Tracker</span>
            was designed to meet the evolving needs of modern fitness enthusiasts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Workout Tracking:</strong> Create, edit, and organize your workout routines with detailed exercise inputs.</li>
            <li><strong>Nutrition Logging:</strong> Track your meals, calories, and macronutrients with daily logs.</li>
            <li><strong>Progress Monitoring:</strong> Record your fitness progress through weight, measurements, and performance metrics.</li>
            <li><strong>Dashboard Analytics:</strong> View your fitness journey in one place with charts, summaries, and trends.</li>
            <li><strong>Search and Filters:</strong> Easily find past workouts or nutrition entries with intelligent filters.</li>
            <li><strong>Notifications & Reminders:</strong> Stay on track with helpful alerts for workouts, meals, and milestones.</li>
            <li><strong>Personalization:</strong> Customize themes, settings, and preferences to make the app yours.</li>
            <li><strong>Mobile Compatibility:</strong> Fully responsive design for desktop, tablet, and mobile users.</li>
            <li><strong>Reporting Tools:</strong> Generate and export progress reports in PDF or CSV format.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Our Commitment</h2>
          <p>
            We are committed to building a reliable, secure, and user-friendly platform. <span className="font-semibold">Fitness Tracker</span>
            is built with modern technologies that ensure fast performance, strong data security, and scalability for a growing community.
            Your privacy is our priority, and we strictly adhere to data protection laws like GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Support and Community</h2>
          <p>
            Whether you're a beginner or a seasoned athlete, our support team is always here to help. You can contact us anytime
            to report issues, share feedback, or ask questions. We are continuously improving based on user input and strive to create
            a strong, motivating community of fitness-minded individuals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Looking Forward</h2>
          <p>
            As we grow, we plan to introduce more innovative features, community forums, coaching integrations, and advanced analytics
            to further enrich your fitness experience. Join us today and take the first step toward a healthier, stronger you.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
