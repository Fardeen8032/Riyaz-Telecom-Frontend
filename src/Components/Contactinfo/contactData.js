import {MapPin,Phone,Mail,MessageCircle} from "lucide-react";

export const contactData = {
  phone: "+91 98192 67257",
  whatsapp: "+91 98192 67257",
  address: "Shop No. 2, Khairani Road, Pereira Wadi, Opposite Sadaf Hardware, Saki Naka Mumbai, Maharashtra 400072"
};

export const contactItems = [
  {
    id: "phone",
    icon: Phone,
    label: "Call Us",
    value: contactData.phone,
    href: `tel:${contactData.phone}`,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactData.whatsapp,
    href: `https://wa.me/${contactData.whatsapp.replace(/\D/g, "")}`,
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: contactData.email,
    href: `mailto:${contactData.email}`,
  },
  {
    id: "address",
    icon: MapPin,
    label: "Visit Us",
    value: contactData.address,
  },
];