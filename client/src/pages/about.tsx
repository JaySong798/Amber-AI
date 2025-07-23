import { useState } from "react";
import { Globe, Brain, Users, Cog, Star, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "About the Project",
      subtitle: "Preserving Cultural Heritage Through AI Innovation",
      
      problem: {
        title: "The Problem",
        description: "Cultural knowledge of Dunhuang and Chinese calligraphy is gradually fading from public consciousness.",
        points: [
          "Language barriers prevent global access to Chinese cultural heritage",
          "Academic resources are scattered and often inaccessible to general audiences",
          "Lack of engaging, poetic platforms for cultural learning",
          "Traditional teaching methods fail to capture the emotional depth of cultural art"
        ]
      },
      
      solution: {
        title: "The Solution",
        description: "A bilingual AI platform that combines scholarly accuracy with poetic storytelling to make Dunhuang culture accessible and emotionally engaging.",
        features: [
          "Text-based bilingual AI with advanced natural language processing",
          "Poetic and storytelling capabilities that bring culture to life",
          "Built on scholarly texts, historical images, and cultural documentation",
          "Interactive role-play mechanics for immersive learning"
        ]
      },
      
      audience: {
        title: "Who It's For",
        description: "Designed for diverse learners seeking deeper cultural understanding",
        groups: [
          {
            icon: "✍️",
            title: "Calligraphy Students",
            description: "Learn traditional brush techniques and character evolution"
          },
          {
            icon: "🏛️",
            title: "Cultural Heritage Learners",
            description: "Explore Buddhist art, mythology, and historical contexts"
          },
          {
            icon: "🖼️",
            title: "Museum Audiences",
            description: "Enhance museum visits with deeper cultural insights"
          },
          {
            icon: "📚",
            title: "Educators",
            description: "Access rich resources for teaching Chinese culture"
          },
          {
            icon: "🌍",
            title: "International Learners",
            description: "Discover Chinese aesthetics and cultural philosophy"
          }
        ]
      },
      
      howItWorks: {
        title: "How It Works",
        description: "Our AI is trained on comprehensive cultural datasets and designed for immersive interaction",
        sources: [
          "Traditional calligraphy manuals and technique guides",
          "High-resolution Dunhuang mural documentation",
          "Buddhist cosmology and philosophical texts",
          "Historical manuscripts and scholarly research"
        ],
        mechanics: [
          "Advanced role-play features allowing interaction with historical figures",
          "Poetic prompt design that mirrors traditional Chinese literary styles",
          "Multi-modal responses combining text, historical context, and cultural references",
          "Structured knowledge architecture for accurate information retrieval"
        ]
      }
    },
    zh: {
      title: "关于项目",
      subtitle: "通过AI创新保护文化遗产",
      
      problem: {
        title: "问题背景",
        description: "敦煌和中国书法的文化知识正在逐渐从公众意识中消失。",
        points: [
          "语言障碍阻止了全球对中国文化遗产的了解",
          "学术资源分散，普通受众难以获取",
          "缺乏引人入胜的诗意文化学习平台",
          "传统教学方法无法捕捉文化艺术的情感深度"
        ]
      },
      
      solution: {
        title: "解决方案",
        description: "一个双语AI平台，将学术准确性与诗意叙事相结合，使敦煌文化变得易于接近且情感丰富。",
        features: [
          "基于先进自然语言处理的双语AI文本系统",
          "将文化带入生活的诗意和叙事能力",
          "建立在学术文本、历史图像和文化文档基础上",
          "用于沉浸式学习的互动角色扮演机制"
        ]
      },
      
      audience: {
        title: "目标用户",
        description: "为寻求更深层文化理解的多元化学习者而设计",
        groups: [
          {
            icon: "✍️",
            title: "书法学生",
            description: "学习传统笔法和字体演变"
          },
          {
            icon: "🏛️",
            title: "文化遗产学习者",
            description: "探索佛教艺术、神话和历史背景"
          },
          {
            icon: "🖼️",
            title: "博物馆观众",
            description: "通过更深入的文化洞察增强博物馆参观体验"
          },
          {
            icon: "📚",
            title: "教育工作者",
            description: "获取丰富的中国文化教学资源"
          },
          {
            icon: "🌍",
            title: "国际学习者",
            description: "发现中国美学和文化哲学"
          }
        ]
      },
      
      howItWorks: {
        title: "工作原理",
        description: "我们的AI基于全面的文化数据集进行训练，专为沉浸式交互而设计",
        sources: [
          "传统书法手册和技法指南",
          "高分辨率敦煌壁画文档",
          "佛教宇宙论和哲学文本",
          "历史手稿和学术研究"
        ],
        mechanics: [
          "先进的角色扮演功能，允许与历史人物互动",
          "模仿传统中国文学风格的诗意提示设计",
          "结合文本、历史背景和文化参考的多模态响应",
          "用于准确信息检索的结构化知识架构"
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  const features = [
    {
      name: "Bilingual Responses",
      description: "Clear, accurate Chinese-English explanations of scripts and culture",
      example: "Explain this calligraphy style in Chinese and English.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: "Poetic Explanations",
      description: "Vivid, metaphor-rich answers using Chinese poetic references",
      example: "Tell me about Cave 285.",
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "Role-Play Mode",
      description: "Responds in-character as monk, painter, Deer, etc.",
      example: "Let me speak with the mural artist of Cave 17.",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "Image Links",
      description: "Real historical image references (linked, not displayed directly)",
      example: "Show me a mural of Avalokiteśvara.",
      icon: <ExternalLink className="w-5 h-5" />
    },
    {
      name: "Audio Suggestions",
      description: "Recommends music, gives historical background of instruments",
      example: "What music would echo through the caves?",
      icon: <Brain className="w-5 h-5" />
    },
    {
      name: "Scholarly Reference Tags",
      description: "Links to papers, journals, and virtual museums",
      example: "Where can I read more about clerical script?",
      icon: <Cog className="w-5 h-5" />
    }
  ];

  const featuresZh = [
    {
      name: "双语回复",
      description: "清晰准确的中英文书法和文化解释",
      example: "用中英文解释这种书法风格。",
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: "诗意解释",
      description: "使用中国诗歌参考的生动、富有隐喻的答案",
      example: "告诉我关于第285窟的故事。",
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "角色扮演模式",
      description: "以僧侣、画师、鹿等角色身份回答",
      example: "让我与第17窟的壁画艺术家对话。",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "图像链接",
      description: "真��的历史图像参考（链接，不直接显示）",
      example: "展示观音的壁画。",
      icon: <ExternalLink className="w-5 h-5" />
    },
    {
      name: "音频建议",
      description: "推荐音乐，提供乐器的历史背景",
      example: "什么音乐会在洞窟中回响？",
      icon: <Brain className="w-5 h-5" />
    },
    {
      name: "学术参考标签",
      description: "链接到论文、期刊和虚拟博物馆",
      example: "在哪里可以阅读更多关于隶书的内容？",
      icon: <Cog className="w-5 h-5" />
    }
  ];

  const currentFeatures = language === "zh" ? featuresZh : features;

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper-beige-50 to-buddha-gold-50">
      <Navigation language={language} setLanguage={setLanguage} />
      
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

          {/* Problem Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-seal-red-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-seal-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h2 className="text-3xl font-bold text-seal-red-700">
                    {currentContent.problem.title}
                  </h2>
                </div>
                <p className="text-lg text-neutral-700 mb-6">
                  {currentContent.problem.description}
                </p>
                <ul className="space-y-3">
                  {currentContent.problem.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-seal-red-500 mr-3 mt-1">•</span>
                      <span className="text-neutral-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Solution Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-cave-turquoise-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-cave-turquoise-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h2 className="text-3xl font-bold text-cave-turquoise-700">
                    {currentContent.solution.title}
                  </h2>
                </div>
                <p className="text-lg text-neutral-700 mb-6">
                  {currentContent.solution.description}
                </p>
                <ul className="space-y-3">
                  {currentContent.solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-cave-turquoise-500 mr-3 mt-1">•</span>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Audience Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-buddha-gold-700 text-center mb-4">
              {currentContent.audience.title}
            </h2>
            <p className="text-lg text-neutral-700 text-center mb-12 max-w-3xl mx-auto">
              {currentContent.audience.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentContent.audience.groups.map((group, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-buddha-gold-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-4">{group.icon}</div>
                    <h3 className="text-xl font-semibold text-buddha-gold-700 mb-3">
                      {group.title}
                    </h3>
                    <p className="text-neutral-600">{group.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-20">
            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                  {currentContent.howItWorks.title}
                </h2>
                <p className="text-lg text-neutral-700 mb-8">
                  {currentContent.howItWorks.description}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-seal-red-700 mb-4">
                      {language === "zh" ? "训练数据源" : "Training Sources"}
                    </h3>
                    <ul className="space-y-2">
                      {currentContent.howItWorks.sources.map((source, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-seal-red-500 mr-3 mt-1">•</span>
                          <span className="text-neutral-700">{source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-cave-turquoise-700 mb-4">
                      {language === "zh" ? "互动机制" : "Interaction Mechanics"}
                    </h3>
                    <ul className="space-y-2">
                      {currentContent.howItWorks.mechanics.map((mechanic, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cave-turquoise-500 mr-3 mt-1">•</span>
                          <span className="text-neutral-700">{mechanic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Features Table */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">
              {language === "zh" ? "主要功能" : "Key Features"}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-buddha-gold-100 rounded-lg flex items-center justify-center mr-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="text-neutral-700 mb-3">{feature.description}</p>
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <p className="text-sm text-neutral-600 italic">
                        "{feature.example}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
