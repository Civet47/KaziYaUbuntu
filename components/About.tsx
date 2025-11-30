import React from 'react';

const SkillItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <li className="flex items-start space-x-4">
    <div className="flex-shrink-0 bg-brand-teal text-white rounded-full p-2 mt-1">
      {icon}
    </div>
    <div>
      <h5 className="font-bold text-lg text-brand-blue">{title}</h5>
      <p className="text-gray-600">{children}</p>
    </div>
  </li>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Closing the Opportunity Gap, One Argument at a Time</h2>
            <p className="text-lg text-gray-700 mb-4">
              Systematic disadvantages create a persistent gap in educational enrichment for children from lower-income households. Access to activities like competitive debate, which foster critical thinking, public speaking, and self-confidence, is often limited by cost and availability.
            </p>
            <p className="text-lg text-gray-700">
              Jukwaa ni lako breaks down these barriers. Our programs provide free, high-quality debate training and mentorship directly in the communities that need it most. We believe every child deserves the chance to find their voice and build the skills to advocate for themselves and their future.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/600/400?image=1074" alt="Diverse group of students collaborating" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </div>
        </div>

        <div className="mt-24">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-brand-blue mb-4">Building Skills for Life</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our curriculum is designed to empower students not just in competitions, but in their academic, professional, and civic lives.
                </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-16">
                <div>
                    <h4 className="text-2xl font-bold text-brand-blue mb-6">Cultivating a Path to Higher Education & Career Success</h4>
                    <ul className="space-y-6">
                        <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7.5l4-2.222M23 12v7.5l-4-2.222" /></svg>} title="Increases College Acceptance Rates">
                            Participation in speech and debate programs significantly improves a student's chances of getting into top-tier colleges and earning scholarships.
                        </SkillItem>
                        <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} title="Develops Career-Ready Skills">
                            Adaptability, teamwork, and critical analysis are highly valued in the workforce and crucial for excelling in interviews and high-growth careers.
                        </SkillItem>
                         <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-3 5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} title="Fosters Leadership Potential">
                           Debate provides the foundation for youth from underrepresented backgrounds to become impactful community and professional leaders.
                        </SkillItem>
                    </ul>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-brand-blue mb-6">Promoting Informed Civic Engagement</h4>
                    <ul className="space-y-6">
                        <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>} title="Empowers Effective Advocacy">
                            Public speaking training gives students the tools to advocate for themselves and their communities on issues related to resource allocation, local policy, and social justice.
                        </SkillItem>
                        <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} title="Encourages Civil Discourse">
                            Debate teaches youth that their voice matters and that positive change can be achieved through reasoned argument, not just disruption.
                        </SkillItem>
                        <SkillItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} title="Fosters Open-Mindedness">
                            Arguing both sides of an issue cultivates empathy and a deeper understanding of opposing viewpoints, preparing students to engage in democratic life constructively.
                        </SkillItem>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;