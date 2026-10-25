import type { ReactNode } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const EMAIL = "priyankapudi4u@gmail.com";

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Twitter",
    href: "https://x.com/priyankapudi",
    icon: <i className="bi bi-twitter-x" />,
  },
  {
    label: "Github",
    href: "https://github.com/priyankaforu",
    icon: <i className="bi bi-github" />,
  },
  {
    label: "Linkedin",
    href: "https://linkedin.com/in/priyankapudi",
    icon: <i className="bi bi-linkedin" />,
  },
  {
    label: "Peerlist",
    href: "https://peerlist.io/priyankapudi4u",
    icon: <PeerlistIcon />,
  },
  {
    label: "Substack",
    href: "https://substack.com/@priyankapudi",
    icon: <i className="bi bi-substack" />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@priyankapudi4u",
    icon: <i className="bi bi-medium" />,
  },
];

function PeerlistIcon() {
  return (
    <svg
      className="w-[1em] h-[1em] inline-block"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8.35 3H15.65C17.6 3 19.15 4.55 19.15 6.5V17.5C19.15 19.45 17.6 21 15.65 21H8.35C6.4 21 4.85 19.45 4.85 17.5V6.5C4.85 4.55 6.4 3 8.35 3ZM8.35 5C7.5 5 6.85 5.65 6.85 6.5V17.5C6.85 18.35 7.5 19 8.35 19H15.65C16.5 19 17.15 18.35 17.15 17.5V6.5C17.15 5.65 16.5 5 15.65 5H8.35ZM12 7C13.65 7 15 8.35 15 10C15 11.65 13.65 13 12 13C10.35 13 9 11.65 9 10C9 8.35 10.35 7 12 7ZM12 9C11.45 9 11 9.45 11 10C11 10.55 11.45 11 12 11C12.55 11 13 10.55 13 10C13 9.45 12.55 9 12 9ZM9 15H15V17H9V15Z" />
    </svg>
  );
}
