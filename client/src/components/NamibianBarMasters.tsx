import { trainingImages, bartendingImages, brandLogos } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { CheckIcon, CalendarIcon, BuildingIcon, DatabaseIcon } from "lucide-react";

export default function NamibianBarMasters() {
  return (
    <section id="namibian-bar-masters" className="py-20 bg-dark" data-brand="namibian-bar-masters">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <img src={brandLogos.namibianBarMasters} alt="Namibian Bar Masters Logo" className="h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Training & Development</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Professional bartender education and certification programs for individuals and businesses.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Program 1 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img src={bartendingImages[2]} alt="Bartender Training" className="w-full h-full object-cover" />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="text-xl font-display font-semibold text-secondary mb-3">Bartender Training & Certification</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join the Namibian Bar Masters Training Program — a 6-week hands-on course for beginners and working bartenders.
                </p>
                <ul className="text-gray-300 text-sm mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Comprehensive cocktail knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Hands-on practical training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Industry recognized certification</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">$500</span>
                  <a href="#sign-up">
                    <Button variant="default" className="bg-secondary hover:bg-opacity-80 text-white">
                      Sign Up
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Program 2 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img src={bartendingImages[0]} alt="Advanced Training" className="w-full h-full object-cover" />
              </div>
              <div className="md:w-3/5 p-6">
                <div className="inline-block px-3 py-1 bg-accent text-white text-xs rounded-full mb-3">Coming Soon</div>
                <h3 className="text-xl font-display font-semibold text-secondary mb-3">Pro Level Courses</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Advanced training in spirits, flair bartending, and beverage design for professionals looking to elevate their careers.
                </p>
                <ul className="text-gray-300 text-sm mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Spirit specialization courses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Competition preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-secondary mt-1 mr-2" />
                    <span>Advanced mixology techniques</span>
                  </li>
                </ul>
                <a href="#notify-me" className="block text-center">
                  <Button variant="default" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                    Get Notified
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Training Options */}
        <div className="bg-gray-900 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-display font-semibold text-white mb-6 text-center">Training Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Option 1 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-center mb-4">
                <CalendarIcon className="h-10 w-10 text-secondary mx-auto" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2 text-center">Monthly Classes</h4>
              <p className="text-gray-300 text-sm text-center">Regular monthly workshops on various bartending topics</p>
              <div className="mt-4 text-center">
                <a href="#monthly-classes" className="inline-block text-secondary hover:underline text-sm">
                  View Schedule
                </a>
              </div>
            </div>
            
            {/* Option 2 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-center mb-4">
                <BuildingIcon className="h-10 w-10 text-secondary mx-auto" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2 text-center">Lodge & Hotel Packages</h4>
              <p className="text-gray-300 text-sm text-center">Customized 5-day training programs for hospitality staff</p>
              <div className="mt-4 text-center">
                <a href="#lodge-packages" className="inline-block text-secondary hover:underline text-sm">
                  Request Info
                </a>
              </div>
            </div>
            
            {/* Option 3 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-center mb-4">
                <DatabaseIcon className="h-10 w-10 text-secondary mx-auto" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2 text-center">Bartenders Database</h4>
              <p className="text-gray-300 text-sm text-center">Join our network of certified professionals for job opportunities</p>
              <div className="mt-4 text-center">
                <a href="#bartender-database" className="inline-block text-secondary hover:underline text-sm">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="#nbm-program">
            <Button 
              variant="default" 
              className="bg-secondary hover:bg-opacity-90 text-white py-6 px-8 rounded-md text-base font-accent font-medium transition-all transform hover:scale-105"
            >
              Explore Our Programs
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
