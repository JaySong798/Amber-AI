import logoImage from "@assets/logo_1753216562335.png";

export function Logo() {
  return (
    <div className="w-10 h-10 relative">
      <img 
        src={logoImage} 
        alt="Amber AI - Dunhuang Cultural Explorer" 
        className="w-10 h-10 object-contain"
      />
    </div>
  );
}
