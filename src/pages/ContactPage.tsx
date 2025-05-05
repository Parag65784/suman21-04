import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);
  
    if (error) {
      alert('Failed to send message. Please try again later.');
      console.error(error);
    } else {
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/25714-16246395136733-800.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0LzI1NzE0LTE2MjQ2Mzk1MTM2NzMzLTgwMC5qcGVnIiwiaWF0IjoxNzQ1NDE4ODUwLCJleHAiOjE3NzY5NTQ4NTB9.ni-optMuGCrgmhPMKPG4tAi_g55TcGerE0Mj6aLNMvU')",
            filter: "brightness(0.8)"
          }}
        />
        
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#004aad]">Our Team</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-200 max-w-2xl">
            Have questions or concerns? We're here to help 24/7.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-gradient-to-b from-[#0A1929] to-[#0D3158]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactCard 
              icon={<Mail className="w-8 h-8" />}
              title="Email Us"
              content="support@crickwin.com"
              link="mailto:support@crickwin.com"
            />
            <ContactCard 
              icon={<Phone className="w-8 h-8" />}
              title="Call Us"
              content="+1 (555) 123-4567"
              link="tel:+15551234567"
            />
            <ContactCard 
              icon={<MapPin className="w-8 h-8" />}
              title="Visit Us"
              content="123 Cricket Lane, Sports City, 12345"
              link="#"
            />
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A1929] border border-gray-700 rounded-lg focus:outline-none focus:border-[#cb6ce6] text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-white font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A1929] border border-gray-700 rounded-lg focus:outline-none focus:border-[#cb6ce6] text-white"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="subject" className="text-white font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A1929] border border-gray-700 rounded-lg focus:outline-none focus:border-[#cb6ce6] text-white"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="message" className="text-white font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0A1929] border border-gray-700 rounded-lg focus:outline-none focus:border-[#cb6ce6] text-white resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-[#004aad] text-white font-bold rounded-lg hover:bg-[#cb6ce6] transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, link }) => {
  return (
    <a 
      href={link}
      className="block bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C] hover:border-[#1A8754] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
    >
      <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#004aad] group-hover:bg-[#1A8754]/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{content}</p>
    </a>
  );
};