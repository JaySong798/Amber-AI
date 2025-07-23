import { Link } from "wouter";
import { ExternalLink, Play, BookOpen, Music, Globe, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Explore() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Explore Dunhuang",
      subtitle: "Immerse Yourself in Ancient Chinese Culture",
      
      calligraphy: {
        title: "Calligraphy Styles & Evolution",
        description: "Journey through the evolution of Chinese characters from ancient seal scripts to modern forms",
        styles: [
          {
            name: "Seal Script (篆书)",
            period: "Zhou Dynasty - Qin Dynasty",
            description: "The oldest standardized form, characterized by rounded strokes and symbolic representations",
            example: "佛"
          },
          {
            name: "Clerical Script (隶书)",
            period: "Han Dynasty",
            description: "Simplified from seal script, featuring more angular strokes and practical for administration",
            example: "佛"
          },
          {
            name: "Regular Script (楷书)",
            period: "Wei-Jin Period",
            description: "The standard form still used today, balanced and highly readable",
            example: "佛"
          },
          {
            name: "Cursive Script (草书)",
            period: "Han Dynasty onwards",
            description: "Flowing, artistic style that prioritizes speed and expression over precision",
            example: "佛"
          }
        ]
      },
      
      stories: {
        title: "Stories & Legends",
        description: "Discover the mythical tales that inspired Dunhuang's magnificent art",
        tales: [
          {
            title: "The Deer of Nine Colors",
            description: "A sacred deer with nine brilliant colors saves a drowning man, teaching lessons of gratitude and betrayal. This beloved tale appears in multiple Dunhuang murals.",
            moral: "True kindness should be cherished, not exploited",
            askQuestion: "Ask the Deer a question"
          },
          {
            title: "Journey to the West - Xuanzang",
            description: "The epic pilgrimage of the monk Xuanzang to India, bringing Buddhist scriptures back to China. His story inspired countless artistic depictions.",
            moral: "Dedication and faith can overcome any obstacle",
            askQuestion: "Speak with Xuanzang"
          },
          {
            title: "The Flying Apsaras",
            description: "Celestial beings who dance in the heavens, blessing the faithful. These ethereal figures grace cave walls with their flowing robes and musical instruments.",
            moral: "Beauty and spirituality transcend earthly boundaries",
            askQuestion: "Ask an Apsara about celestial music"
          }
        ]
      },
      
      music: {
        title: "Cultural Music",
        description: "Experience the sounds that once echoed through the caves",
        instruments: [
          {
            name: "Pipa (琵琶)",
            description: "Four-stringed plucked instrument, frequently depicted in Dunhuang murals",
            connection: "Cave 112 features beautiful pipa players"
          },
          {
            name: "Guqin (古琴)",
            description: "Seven-string zither, symbol of scholarly refinement",
            connection: "Associated with meditation and spiritual practice"
          },
          {
            name: "Dizi (笛子)",
            description: "Bamboo flute with ethereal tones",
            connection: "Often played by celestial musicians in murals"
          }
        ],
        playlists: [
          { name: "Tang Dynasty Court Music", url: "#" },
          { name: "Buddhist Chanting Traditions", url: "#" },
          { name: "Silk Road Melodies", url: "#" }
        ]
      },
      
      library: {
        title: "Virtual Dunhuang Library",
        description: "Access digital archives and virtual tours",
        resources: [
          {
            name: "Dunhuang Digital Archive",
            description: "High-resolution images of manuscripts and murals",
            url: "https://dunhuang.org",
            type: "Archive"
          },
          {
            name: "Dunhuang E-tour",
            description: "Virtual reality exploration of the caves",
            url: "https://e-dunhuang.com",
            type: "VR Tour"
          },
          {
            name: "International Dunhuang Project",
            description: "Collaborative research database",
            url: "http://idp.bl.uk",
            type: "Research"
          }
        ]
      },
      
      references: {
        title: "Resources & References",
        description: "Scholarly sources and research materials",
        categories: [
          {
            name: "Buddhist Texts",
            items: [
              "Lotus Sutra translations",
              "Diamond Sutra commentaries",
              "Vimalakirti Sutra studies"
            ]
          },
          {
            name: "Art History",
            items: [
              "Dunhuang Art Research Institute publications",
              "Tang Dynasty painting techniques",
              "Central Asian art influences"
            ]
          },
          {
            name: "Calligraphy Studies",
            items: [
              "Wang Xizhi and classical masters",
              "Dunhuang manuscript paleography",
              "Evolution of Chinese writing systems"
            ]
          }
        ]
      }
    },
    zh: {
      title: "探索敦煌",
      subtitle: "沉浸在古代中国文化中",
      
      calligraphy: {
        title: "书法风格与演变",
        description: "探索中国汉字从古代篆书到现代形式的演变历程",
        styles: [
          {
            name: "篆书",
            period: "周朝 - 秦朝",
            description: "最古老的标准化形式，以圆润笔画和象征性表现为特征",
            example: "佛"
          },
          {
            name: "隶书",
            period: "汉朝",
            description: "从篆书简化而来，笔画更加方正，适用于行政管理",
            example: "佛"
          },
          {
            name: "楷书",
            period: "魏晋时期",
            description: "至今仍在使用的标准形式，平衡且高度易读",
            example: "佛"
          },
          {
            name: "草书",
            period: "汉朝以后",
            description: "流畅的艺术风格，注重速度和表达胜过精确度",
            example: "佛"
          }
        ]
      },
      
      stories: {
        title: "故事与传说",
        description: "发现启发敦煌壮丽艺术的神话故事",
        tales: [
          {
            title: "九色鹿",
            description: "一只拥有九种绚烂颜色的神鹿救助溺水者，教导感恩与背叛的教训。这个beloved tale appears in multiple Dunhuang murals.",
            moral: "真正的善意应该被珍惜，而不是被利用",
            askQuestion: "向九色鹿提问"
          },
          {
            title: "西游记 - 玄奘",
            description: "僧人玄奘前往印度的史诗朝圣之旅，将佛经带回中国。他的故事启发了无数艺术描绘。",
            moral: "奉献和信仰能够克服任何障碍",
            askQuestion: "与玄奘对话"
          },
          {
            title: "飞天",
            description: "在天空中舞蹈的天界众生，保佑信徒。这些空灵的身影以其飘逸的长袍和乐器装饰洞窟墙壁。",
            moral: "美丽和灵性超越世俗界限",
            askQuestion: "向飞天询问天界音乐"
          }
        ]
      },
      
      music: {
        title: "文化音乐",
        description: "体验曾在洞窟中回响的声音",
        instruments: [
          {
            name: "琵琶",
            description: "四弦弹拨乐器，在敦煌壁画中经常出现",
            connection: "第112窟有美丽的琵琶演奏者"
          },
          {
            name: "古琴",
            description: "七弦古筝，学者雅致的象征",
            connection: "与冥想和精神修行相关"
          },
          {
            name: "笛子",
            description: "具有空灵音色的竹笛",
            connection: "常被壁画中的天界音乐家演奏"
          }
        ],
        playlists: [
          { name: "唐代宫廷音乐", url: "#" },
          { name: "佛教诵经传统", url: "#" },
          { name: "丝绸之路旋律", url: "#" }
        ]
      },
      
      library: {
        title: "敦煌虚拟图书馆",
        description: "访问数字档案和虚拟游览",
        resources: [
          {
            name: "敦煌数字档案",
            description: "手稿和壁画的高分辨率图像",
            url: "https://dunhuang.org",
            type: "档案"
          },
          {
            name: "敦��电子游览",
            description: "洞窟的虚拟现实探索",
            url: "https://e-dunhuang.com",
            type: "VR游览"
          },
          {
            name: "国际敦煌项目",
            description: "协作研究数据库",
            url: "http://idp.bl.uk",
            type: "研究"
          }
        ]
      },
      
      references: {
        title: "资源与参考",
        description: "学术资源和研究材料",
        categories: [
          {
            name: "佛教文本",
            items: [
              "法华经翻译",
              "金刚经注释",
              "维摩诘经研究"
            ]
          },
          {
            name: "艺术史",
            items: [
              "敦煌研究院出版物",
              "唐代绘画技法",
              "中亚艺术影响"
            ]
          },
          {
            name: "书法研究",
            items: [
              "王羲之和古典大师",
              "敦煌手稿古文字学",
              "中国文字系统演变"
            ]
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper-beige-50 to-cave-turquoise-50">
      <Navigation />
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-seal-red-700 mb-4">
              {currentContent.title}
            </h1>
            <p className="text-xl text-cave-turquoise-700 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Calligraphy Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-seal-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-seal-red-700">
                  <span className="text-3xl mr-4">✍️</span>
                  {currentContent.calligraphy.title}
                </CardTitle>
                <p className="text-neutral-700">{currentContent.calligraphy.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentContent.calligraphy.styles.map((style, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-neutral-800">{style.name}</h3>
                        <div className="text-3xl font-serif text-seal-red-600">{style.example}</div>
                      </div>
                      <Badge variant="outline" className="mb-3">{style.period}</Badge>
                      <p className="text-neutral-600">{style.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Stories Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-buddha-gold-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-buddha-gold-700">
                  <span className="text-3xl mr-4">📚</span>
                  {currentContent.stories.title}
                </CardTitle>
                <p className="text-neutral-700">{currentContent.stories.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentContent.stories.tales.map((tale, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                      <h3 className="text-xl font-semibold text-buddha-gold-700 mb-3">{tale.title}</h3>
                      <p className="text-neutral-700 mb-4">{tale.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="italic text-buddha-gold-600 text-sm">
                          "{tale.moral}"
                        </div>
                        <Link href="/chat">
                          <Button size="sm" variant="outline" className="border-buddha-gold-300 hover:bg-buddha-gold-50">
                            {tale.askQuestion}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Music Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-cave-turquoise-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-cave-turquoise-700">
                  <Music className="w-8 h-8 mr-4" />
                  {currentContent.music.title}
                </CardTitle>
                <p className="text-neutral-700">{currentContent.music.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-cave-turquoise-700 mb-4">
                      {language === "zh" ? "传统乐器" : "Traditional Instruments"}
                    </h3>
                    <div className="space-y-4">
                      {currentContent.music.instruments.map((instrument, index) => (
                        <div key={index} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                          <h4 className="font-semibold text-neutral-800 mb-2">{instrument.name}</h4>
                          <p className="text-neutral-600 text-sm mb-2">{instrument.description}</p>
                          <p className="text-cave-turquoise-600 text-sm italic">{instrument.connection}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-cave-turquoise-700 mb-4">
                      {language === "zh" ? "音乐播放列表" : "Music Playlists"}
                    </h3>
                    <div className="space-y-3">
                      {currentContent.music.playlists.map((playlist, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          className="w-full justify-start border-cave-turquoise-200 hover:bg-cave-turquoise-50"
                        >
                          <Play className="w-4 h-4 mr-3" />
                          {playlist.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Virtual Library Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-neutral-800">
                  <Globe className="w-8 h-8 mr-4" />
                  {currentContent.library.title}
                </CardTitle>
                <p className="text-neutral-700">{currentContent.library.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentContent.library.resources.map((resource, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-6 bg-neutral-50 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <ExternalLink className="w-4 h-4 text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{resource.name}</h3>
                      <p className="text-neutral-600 text-sm mb-4">{resource.description}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        {language === "zh" ? "访问" : "Visit"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* References Section */}
          <section>
            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-neutral-800">
                  <BookOpen className="w-8 h-8 mr-4" />
                  {currentContent.references.title}
                </CardTitle>
                <p className="text-neutral-700">{currentContent.references.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentContent.references.categories.map((category, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">{category.name}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-neutral-400 mr-2 mt-1">•</span>
                            <span className="text-neutral-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
