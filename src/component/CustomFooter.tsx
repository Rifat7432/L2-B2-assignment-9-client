import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
const CustomFooter = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full mt-20">
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl">Contact Us</h2>
        <p className="mt-4">
          If you have any questions, suggestions, or need support, please do not
          hesitate to contact us. You can reach us at:
        </p>
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
