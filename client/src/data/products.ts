export type Product = {
  id: string;
  name: string;
  meta: string; // small line above title
  description: string;
  image: string;
  tier: "Premium" | "Standard" | "Luxury";
  tags: string[];
};

export const products: Product[] = [
  {
    id: "iboothme-x",
    name: "iboothme X",
    meta: "AI Technology • Dubai 2024",
    description:
      "AI-powered photo experiences that adapt to every guest with intelligent assessment",
    image: "/iboothmex.jpg",
    tier: "Premium",
    tags: ["AI-Powered", "Intelligent Assessment"],
  },
  {
    id: "arcade-x",
    name: "Arcade X by iboothme",
    meta: "Gaming • Brand Engagement",
    description:
      "Turn play into product engagement. Arcade X lets your prospects interact with a custom-branded game, built around your campaign. After completing the experience, they drop their email—and we drop your product. Fun, strategic, and built to convert attention into action.",
    image: "/arcade-x.jpg",
    tier: "Premium",
    tags: ["Custom Gaming", "Brand Engagement"],
  },
  {
    id: "glamdroid",
    name: "Glamdroid",
    meta: "Robotic • AI Technology",
    description:
      "The unique robotic arm in the world that allows your guests to choose between multiple robotic movements. Soon to be equipped with iboothme AI technology for head detection and perfect shots. Features advanced sensors to protect guests - the arm stops if they cross a safety line.",
    image: "/glamdroid.jpg",
    tier: "Premium",
    tags: ["Multiple Movements", "AI Head Detection (Coming Soon)"],
  },
  {
    id: "locker-x",
    name: "Locker X by iboothme",
    meta: "Interactive • Product Distribution",
    description:
      "Locker X by iboothme puts your product at the centre of the experience. Guests scan a QR code, engage with a quiz or AI photo, and receive a code. If it's correct, the door unlocks—if not, they get a discount. You can also send the link remotely to drive traffic to your store or event.",
    image: "/locker-x.jpg",
    tier: "Premium",
    tags: ["QR Code Integration", "Quiz & AI Photo"],
  },
  {
    id: "slider-12",
    name: "12\" Slider",
    meta: "Photo Booth • Compact",
    description: "Compact sliding photo booth with professional camera system",
    image: "/images/12-slider-purple.png",
    tier: "Standard",
    tags: ["Compact Design", "Professional Camera"],
  },
  {
    id: "slider-180",
    name: "180° Slider",
    meta: "Photo Booth • Dynamic",
    description: "Semi-circular sliding booth for dynamic photo experiences",
    image: "/images/180-slider-purple.png",
    tier: "Premium",
    tags: ["180° Movement", "Dynamic Photos"],
  },
  {
    id: "booth-360",
    name: "360° Booth",
    meta: "Video Booth • 360°",
    description: "Full rotation platform for immersive 360-degree content",
    image: "/images/360-purple.png",
    tier: "Premium",
    tags: ["360° Rotation", "Video Content"],
  },
  {
    id: "catch-baton",
    name: "Catch Baton",
    meta: "Interactive • Gaming",
    description: "Interactive curved booth for unique photo angles",
    image: "/images/catch-baton-purple.png",
    tier: "Standard",
    tags: ["Interactive Gaming", "Curved Design"],
  },
  {
    id: "gift-box",
    name: "Gift Box",
    meta: "Interactive • Surprise",
    description: "Compact cube booth with surprise reveal experiences",
    image: "/GiftBox.jpg",
    tier: "Standard",
    tags: ["Surprise Element", "Compact Cube"],
  },
  {
    id: "scribble-booth",
    name: "Scribble Booth",
    meta: "Interactive • Creative",
    description:
      "Scribble captures a short video, then invites your guests to draw, write, or add elements directly on top of it using a branded interface. It's interactive, creative, and built to turn every guest into a content creator.",
    image: "/Scriblebooth.jpg",
    tier: "Premium",
    tags: ["Video Creation", "Interactive Drawing"],
  },
  {
    id: "claw-machine",
    name: "Claw Machine",
    meta: "Gaming • Data Collection",
    description:
      "Gamified. Branded. Unforgettable. The Claw Machine is a smart engagement tool that captures guest data before they dive into an experience—whether it's a product quiz or a game. Fully branded, it draws people in, gets them interacting, and puts your product in their hands.",
    image: "/TheClaw.jpg",
    tier: "Premium",
    tags: ["Gamified Experience", "Data Capture"],
  },
  {
    id: "vending-x",
    name: "Vending X",
    meta: "Vending • AI Integration",
    description:
      "The iboothme Vending X blends product delivery with brand engagement. Guests interact through a custom experience—quiz, game, or AI photo—before receiving your product. Powered by our latest distribution tech, it can dispense gifts up to the size of a book.",
    image: "/vendingx.jpg",
    tier: "Premium",
    tags: ["Product Delivery", "Custom Experiences"],
  },
  {
    id: "gobooth",
    name: "GoBooth",
    meta: "Photo Booth • Portable",
    description: "Portable professional photo booth solution",
    image: "/images/gobooth-purple.png",
    tier: "Standard",
    tags: ["Portable Design", "Professional Quality"],
  },
  {
    id: "gumball-x",
    name: "Gumball X",
    meta: "Interactive • Brand Activation",
    description:
      "Interactive brand activation with transparent acrylic balls and digital engagement",
    image: "/images/gumball-x-purple.png",
    tier: "Premium",
    tags: ["Digital Quiz Integration", "Transparent Acrylic Balls"],
  },
  {
    id: "holobox",
    name: "HoloBox",
    meta: "Holographic • Premium",
    description: "Holographic display booth for futuristic experiences",
    image: "/images/holobox-purple.png",
    tier: "Luxury",
    tags: ["Holographic Display", "Futuristic Design"],
  },
  {
    id: "mega-vending",
    name: "Mega Vending",
    meta: "Vending • Interactive",
    description: "Large-scale vending machine with photo booth integration",
    image: "/images/mega-vending-purple.png",
    tier: "Premium",
    tags: ["Large Scale", "Vending Integration"],
  },
  {
    id: "mirror-tech",
    name: "Mirror Tech",
    meta: "Mirror • AI Technology",
    description: "Smart mirror with interactive photo capabilities",
    image: "/images/mirror-tech-purple.png",
    tier: "Premium",
    tags: ["Smart Mirror", "AI Technology"],
  },
];

