import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Play, Pause, Volume2, VolumeX, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { useLanguage } from "@/contexts/language-context";
import logoPath from "@assets/logo_1753228482637.png";

export default function Landing() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would integrate with an audio player
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, you would mute/unmute the audio
  };

  const content = {
    en: {
      title: "Journey Through Time",
      subtitle: "Where Ancient Wisdom Meets Modern Understanding",
      description: "In the heart of the Silk Road, where golden sands whisper tales of millennia past, lies Dunhuang—a treasure trove of human heritage. Here, apsaras dance eternal on cave walls, Buddhist sutras preserve sacred wisdom, and calligraphy strokes tell stories of devotion and artistry.",
      poeticIntro: "Like grains of sand that hold the memory of desert winds, each mural, each character, each melody carries the soul of ancient China. Step into a realm where AI becomes your guide through this timeless cultural landscape.",
      startJourney: "Begin Your Cultural Odyssey",
      playMusic: "Play Tang Dynasty Music",
      pauseMusic: "Pause Music",
    },
    zh: {
      title: "穿越时空之旅",
      subtitle: "古代智慧与现代理解的交汇",
      description: "在丝绸之路的心脏地带，金色沙粒诉说着千年往事，敦煌——人类文化遗产的宝库。在这里，飞天在洞窟壁画上翩翩起舞，佛经保存着神圣智慧，书法笔画诉说着虔诚与艺术的故事。",
      poeticIntro: "如同沙粒承载着沙漠风的记忆，每一幅壁画、每一个字符、每一段旋律都承载着古老中国的灵魂。踏入这个永恒的文化景观，让AI成为您的向导。",
      startJourney: "开始您的文化探索",
      playMusic: "播放唐代音乐",
      pauseMusic: "暂停音乐",
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper-beige-50 via-paper-beige-100 to-buddha-gold-50">
      <Navigation />
      
      {/* Floating stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-buddha-gold-400 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `twinkle ${3 + Math.random() * 2}s infinite ease-in-out`,
            }}
          >
            <Star className="w-3 h-3" />
          </div>
        ))}
      </div>

      {/* Music Controls */}
      <div className="fixed top-20 right-6 z-50 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleMusic}
          className="bg-white/80 backdrop-blur-sm border-buddha-gold-300 hover:bg-buddha-gold-50"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={toggleMute}
          className="bg-white/80 backdrop-blur-sm border-buddha-gold-300 hover:bg-buddha-gold-50"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <main className="relative pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center py-20 space-y-8">
            {/* Logo and Title */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <img 
                  src={logoPath} 
                  alt="Amber AI Logo" 
                  className="w-24 h-24 object-contain drop-shadow-lg"
                />
              </div>
              
              <div className="space-y-4">
                <h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-seal-red-700 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
                >
                  {currentContent.title}
                </h1>
                <p className="text-xl sm:text-2xl text-cave-turquoise-700 font-medium">
                  {currentContent.subtitle}
                </p>
              </div>
            </div>

            {/* Poetic Description */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-buddha-gold-200 shadow-lg">
                <p className="text-lg leading-relaxed text-neutral-700 mb-6">
                  {currentContent.description}
                </p>
                <p 
                  className="text-lg leading-relaxed text-cave-turquoise-800 italic"
                  style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
                >
                  {currentContent.poeticIntro}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-8">
              <Link href="/chat">
                <Button 
                  size="lg"
                  className="bg-seal-red-600 hover:bg-seal-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {currentContent.startJourney}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Elements Section */}
          <div className="pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Desert Elements */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-buddha-gold-400 to-buddha-gold-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-2xl">🏜️</div>
                </div>
                <h3 className="text-xl font-semibold text-seal-red-700">
                  {language === "zh" ? "沙漠传说" : "Desert Legends"}
                </h3>
                <p className="text-neutral-600">
                  {language === "zh" 
                    ? "探索丝绸之路上的神秘故事与传说" 
                    : "Explore mysterious tales and legends of the Silk Road"
                  }
                </p>
              </div>

              {/* Apsaras */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cave-turquoise-400 to-cave-turquoise-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-2xl">🕊️</div>
                </div>
                <h3 className="text-xl font-semibold text-seal-red-700">
                  {language === "zh" ? "飞天艺术" : "Apsaras Art"}
                </h3>
                <p className="text-neutral-600">
                  {language === "zh" 
                    ? "发现敦煌壁画中的天女与神话��术" 
                    : "Discover celestial beings and mythological art in Dunhuang murals"
                  }
                </p>
              </div>

              {/* Calligraphy */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-seal-red-400 to-seal-red-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-2xl">✍️</div>
                </div>
                <h3 className="text-xl font-semibold text-seal-red-700">
                  {language === "zh" ? "书法艺术" : "Calligraphy Arts"}
                </h3>
                <p className="text-neutral-600">
                  {language === "zh" 
                    ? "学习古代中国书法的精髓与美学" 
                    : "Learn the essence and aesthetics of ancient Chinese calligraphy"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
