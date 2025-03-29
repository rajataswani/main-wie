
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          className="mb-8 flex items-center gap-2 border-purple-300"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home 
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-purple-800 mb-12 text-center">About IEEE Women in Engineering</h1>

        <div className="space-y-16">
          {/* About IEEE WIE Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">About IEEE WIE</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                IEEE Women in Engineering (WIE) is one of the largest international professional organizations 
                dedicated to promoting women engineers and scientists. The global network connects nearly 20,000 
                members in over 100 countries to advance women in technology at all points in their lives and careers.
              </p>
              <p className="mt-4">
                IEEE WIE members make lifelong friendships, acquire influential mentors, and make a difference for 
                the benefit of humanity. Members develop leadership skills and technical literacy, while participating 
                in educational programs, networking opportunities with industry leaders, and humanitarian projects.
              </p>
              <p className="mt-4">
                Our Silver Oak University Student Branch Affinity Group is part of this global movement and works to 
                create local impact for our members and community.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Vision</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                At Silver Oak University IEEE WIE Student Branch Affinity Group, we envision a world where women are 
                represented, included, and valued across all disciplines of engineering. We strive to be the leading 
                catalyst for creating an inclusive community within our university that inspires, engages, and advances 
                women in technology.
              </p>
              <p className="mt-4">
                We see a future where:
              </p>
              <ul className="mt-2 space-y-2">
                <li>Women are equally represented in technical fields at all levels</li>
                <li>Young women view engineering as an attractive and viable career option</li>
                <li>Female students have access to mentors, resources, and support systems for their academic and professional journey</li>
                <li>Our members develop into technical leaders who drive innovation and positive change</li>
                <li>Our initiatives create lasting impact in our local community and beyond</li>
              </ul>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Mission</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                The mission of the Silver Oak University IEEE WIE Student Branch Affinity Group is to inspire, engage, 
                encourage, and empower women in engineering through:
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <strong>Education:</strong> Organizing workshops, technical training, and seminars that enhance 
                  technical knowledge and build professional skills
                </li>
                <li>
                  <strong>Community:</strong> Creating a supportive network of peers and mentors who celebrate 
                  achievements and help navigate challenges
                </li>
                <li>
                  <strong>Leadership:</strong> Providing opportunities for members to develop and practice leadership 
                  through organizing events, managing projects, and representing IEEE WIE
                </li>
                <li>
                  <strong>Outreach:</strong> Engaging with younger students to ignite interest in STEM fields and 
                  encourage pursuit of engineering education
                </li>
                <li>
                  <strong>Innovation:</strong> Facilitating technical projects and competitions that allow members to 
                  apply theoretical knowledge to real-world problems
                </li>
                <li>
                  <strong>Recognition:</strong> Acknowledging and celebrating women's achievements in engineering 
                  and technology
                </li>
              </ul>
            </div>
          </section>

          {/* Goals Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Goals</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                The Silver Oak University IEEE WIE Student Branch Affinity Group is committed to:
              </p>
              <ul className="mt-2 space-y-2">
                <li>Increasing female enrollment and retention in engineering programs at our university</li>
                <li>Developing a strong community of women engineers who support and elevate each other</li>
                <li>Providing professional development opportunities that prepare members for successful careers</li>
                <li>Building partnerships with industry to create mentorship and internship opportunities</li>
                <li>Collaborating with other IEEE Student Branches and WIE Affinity Groups to share best practices</li>
                <li>Organizing at least four major technical and professional development events each academic year</li>
                <li>Documenting and sharing our successes to inspire other women in engineering groups</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
