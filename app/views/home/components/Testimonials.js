// Testimonials.js
import React from 'react';
import User1 from '@/app/assets/user1.jpg';
import User2 from '@/app/assets/user2.jpg';
import User3 from '@/app/assets/user3.jpg';
import Image from 'next/image';

const testimonialsData = [
  {
    id: 1,
    name: "Amrut Tawade",
    feedback: "ChatMan has revolutionized the way I communicate. It's like having a friend who always knows what to say!",
    avatar: User1 // Replace with actual path
  },
  {
    id: 2,
    name: "Ghansham Mulkalwar",
    feedback: "The AI suggestions are incredibly accurate and helpful. It's made my daily chats so much more efficient!",
    avatar: User2 // Replace with actual path
  },
  {
    id: 3,
    name: "Subhash Rane",
    feedback: "I was skeptical about AI in chatting, but ChatMan has completely won me over. It's intuitive and smart!",
    avatar: User3// Replace with actual path
  }
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Hear from Our Users</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            User Testimonials
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Real feedback from users who are loving ChatMan.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-8">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="w-full md:w-1/3 bg-white rounded-lg p-6 text-center shadow-lg">
                <Image src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">{testimonial.name}</h3>
                <p className="mt-2 text-gray-600">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
