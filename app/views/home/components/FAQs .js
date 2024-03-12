// FAQs.js
import React from 'react';

const faqData = [
  {
    question: "How does ChatMan's AI help me in conversations?",
    answer: "ChatMan's AI analyzes your conversation patterns to provide contextually relevant suggestions, making your interactions smoother and more natural."
  },
  {
    question: "Is my data safe with ChatMan?",
    answer: "Absolutely. We prioritize your privacy with end-to-end encryption and never share your data with third parties."
  },
  {
    question: "Can I use ChatMan in any language?",
    answer: "Yes, ChatMan is designed to understand and adapt to multiple languages, offering you a seamless chatting experience in your preferred language."
  },
  {
    question: "What makes ChatMan different from other chat apps?",
    answer: "ChatMan's unique AI adapts to your personal communication style, providing an unparalleled chatting experience that grows with you."
  }
];

const FAQs = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Got Questions?</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            We've Got Answers
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Check out our FAQs to learn more about ChatMan.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
