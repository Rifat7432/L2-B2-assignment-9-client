import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
const CustomFooter = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1350px] my-5">
        <div>
          <h2 className="font-bold text-xl">Bark Buddies</h2>
          <p className="text-sm">
            At Pet Adoption, our mission is to connect loving families with pets
            in need of a home. We believe every animal deserves a chance to live
            in a caring and nurturing environment. Our platform is designed to
            facilitate the adoption process, making it easier for people to find
            the perfect pet for their home.
          </p>
        </div>

        {/* Section 2: Links */}
        <div>
          <h2 className="font-bold text-xl">Quick Links</h2>
          <ul className="text-sm">
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Pets
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div className="">
          <h2 className="text-2xl">Contact Us</h2>
          <div className="flex items-center mt-4">
            <Mail className="mr-2" />
            <p>support@petadoption.com</p>
          </div>
          <div className="flex items-center mt-2">
            <Phone className="mr-2" />
            <p>(123) 456-7890</p>
          </div>
          <p className="mt-4">Follow us on social media:</p>
          <ul className="flex space-x-4 mt-2">
            <li>
              <a href="#" target="_blank" className="text-blue-500">
                <Facebook />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="text-blue-500">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="text-blue-500">
                <Instagram />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <p>
          &copy; 2024 Pet Adoption. All rights reserved. |{" "}
          <a href="#" className="text-blue-500">
            Terms of Use
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default CustomFooter;
