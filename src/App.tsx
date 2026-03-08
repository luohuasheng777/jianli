/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  CassetteTape, 
  Gamepad2, 
  Cpu, 
  GraduationCap, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Zap,
  Radio
} from 'lucide-react';

// --- Types ---
type Section = 'SUMMARY' | 'EXPERIENCE' | 'SKILLS';

// --- Components ---

const Scanline = () => <div className="scanline" />;

const RetroButton = ({ 
  label, 
  active, 
  onClick, 
  icon: Icon 
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
  icon: React.ElementType;
}) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      flex items-center gap-4 px-6 py-4 md:py-5 transition-all duration-300 border-b-4 md:border-b-0 md:border-r-4 flex-1 md:flex-none whitespace-nowrap
      ${active 
        ? 'bg-[#1a1a1a] text-white border-[#f27d26]' 
        : 'bg-white text-[#1a1a1a] border-transparent hover:bg-[#f5f2ed]'}
    `}
  >
    <Icon size={20} className={`md:w-[22px] md:h-[22px] ${active ? 'animate-pulse text-[#f27d26]' : 'text-[#1a1a1a]'}`} />
    <span className="text-[10px] md:text-sm font-black tracking-widest uppercase">{label}</span>
  </motion.button>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6 md:mb-8 border-b-4 border-[#1a1a1a] pb-4 md:pb-6">
    <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-[#1a1a1a] uppercase flex items-center gap-2 md:gap-3">
      <motion.span 
        initial={{ height: 0 }}
        animate={{ height: "1.5rem" }}
        className="w-3 md:w-4 bg-[#f27d26] inline-block"
      ></motion.span>
      {title}
    </h2>
    {subtitle && <p className="text-[8px] md:text-xs text-zinc-500 mt-1 md:mt-2 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold">{subtitle}</p>}
  </div>
);

const ExperienceCard = ({ company, role, period, details }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-8 md:mb-16 relative pl-6 md:pl-12 border-l-4 border-[#1a1a1a]"
  >
    <div className="absolute -left-2.5 md:-left-3 top-0 w-4 h-4 md:w-5 md:h-5 bg-[#f27d26] border-2 border-[#1a1a1a]" />
    <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
      <div>
        <h3 className="text-xl md:text-3xl font-black text-[#1a1a1a] flex flex-wrap items-center gap-2 md:gap-3">
          {company}
          <span className="hidden md:inline text-xl font-bold text-[#2a9d8f] opacity-50">|</span>
          <span className="text-sm md:text-xl font-black text-[#2a9d8f] uppercase tracking-wider">{role}</span>
        </h3>
      </div>
      <span className="text-[10px] md:text-sm font-mono font-black text-[#1a1a1a] bg-white px-3 md:px-5 py-1 md:py-2 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)]">{period}</span>
    </div>
    <div className="space-y-6 md:space-y-10">
      {details.map((item: any, idx: number) => (
        <div key={idx}>
          <h4 className="text-base md:text-xl font-black text-[#1a1a1a] mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
            <ChevronRight size={20} className="text-[#f27d26] shrink-0" />
            {item.title}
          </h4>
          <ul className="text-sm md:text-base text-zinc-700 space-y-3 md:space-y-4 ml-8 md:ml-12 list-disc list-outside font-medium">
            {item.points.map((p: string, pIdx: number) => (
              <li key={pIdx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-[#1a1a1a]">$1</strong>') }} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('EXPERIENCE');
  const [booting, setBooting] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const resumeData = {
    name: "戚祥瑞",
    title: "游戏文案策划 / 剧情策划",
    contact: {
      phone: "151-0276-6247",
      email: "1015647502@qq.com",
      portfolio: "[请在此处填入链接]",
      education: "海南大学 (211) | 本科",
      gender: "男",
      age: "26岁"
    },
    summary: [
      {
        title: "复合型策划",
        content: "拥有4年跨领域游戏策划经验，成功统筹并落地3款实景解谜文创产品及1款商业手游的核心叙事模块。\n擅长在玩法框架内构建逻辑自洽、氛围沉浸的世界观，能够灵活运用碎片化叙事、环境叙事、交互叙事等多种手法增强玩家代入感。\n具备从0到1的项目推进能力，熟悉研发全流程，能与美术、程序、运营高效协作，确保叙事设计精准落地。"
      },
      {
        title: "AI探索者",
        content: "敏锐捕捉AIGC技术趋势，将DeepSeek、Gemini、即梦等工具融入日常策划工作流，辅助文案生成、概念预研与团队沟通。\n在《余烬将熄》项目中，利用AI提升NPC文本生产效率，同时通过AI生成的概念图有效缩短美术需求沟通周期，助力团队快速定调。"
      },
      {
        title: "成果导向",
        content: "累计完成超过50名原创角色设定、10余万字游戏剧情文本撰写，主导设计的实景解谜产品上线后获得玩家好评，好评率均高于99%，其中《北平1933》荣获EGA2021年度最佳解谜文创、《镖行四海之雪夜前尘》与《市井百鬼》荣获EGA2022年度最佳解谜文创。\n始终保持对创新玩法与叙事可能性的探索热情，广泛涉猎各类游戏，持续为团队带来新鲜灵感。"
      }
    ],
    experience: [
      {
        company: "福州点亮互娱网络科技有限公司",
        role: "主文案",
        period: "2022.04 – 至今",
        details: [
          {
            title: "核心项目：《余烬将熄》（近未来废土科幻 · 放置卡牌回合制 RPG）",
            points: []
          },
          {
            title: "世界观构建与碎片化叙事",
            points: [
              "基于制作人提出的高概念玩法框架，**独立推演并构建完整废土世界观体系**，撰写涵盖5大势力、跨越百余年的编年史，设计9个风格迥异的区域地图，确保叙事设定与玩法循环深度绑定。",
              "**主导碎片化叙事内容生产**，撰写风味文本、道具描述、Loading Tips、界面文案等累计超过5万字，通过环境细节、物品故事、NPC闲聊等多维度传递世界观信息，营造沉浸式废土氛围。",
              "设计主线剧情与支线事件的叙事节奏，确保放置玩法下玩家仍能逐步感知世界变化，提升长线留存。"
            ]
          },
          {
            title: "角色塑造与美术统筹",
            points: [
              "**完成50余名原创角色的档案设定**，包括背景故事、性格图谱、语音台词、角色弧光，并为每个角色撰写专属技能文案与战斗语音，使角色形象在卡牌对战中立体可感。",
              "统筹美术需求全流程：撰写立绘、图标、特效、界面等美术需求文档（AD）共计**300余份**，提供大招动画的分镜脚本与视觉参考，与美术团队紧密沟通，确保最终表现符合角色设定与世界观调性。",
              "建立角色设计规范文档，统一美术风格与文案调性，提升后续版本迭代效率。"
            ]
          },
          {
            title: "AIGC辅助工作流",
            points: [
              "搭建AI辅助文案生成流程：利用DeepSeek、Gemini批量生成NPC闲聊文本与物品描述初稿，经人工筛选润色后纳入游戏，大幅提升内容生产效率，同时保持文案风格统一。",
              "使用即梦（Jimeng）生成高精度概念图，辅助美术快速理解场景氛围与角色气质，减少反复修改，大幅缩短美术需求确认周期。",
              "探索Suno、Sora 2、seedance等工具在音频Demo、动态分镜预演中的应用，为团队提供低成本快速试错方案，辅助制作人及主美提前定调。"
            ]
          },
          {
            title: "其他项目：《火影忍者》《鬼灭之刃》等海外IP改编项目",
            points: [
              "IP还原与风格包装：负责核心系统（如装备、技能、成就）的界面文案与风格化包装，深入研读原著设定，优化文案细节，确保每一处文本都与IP世界观高度契合。"
            ]
          }
        ]
      },
      {
        company: "海南藏宝图娱乐有限责任公司",
        role: "主策划",
        period: "2021.05 – 2022.04",
        details: [
          {
            title: "项目：《北平1933》《镖行四海之踏雪寻踪》《市井·百鬼》（实景解谜/解谜盒）",
            points: [
              "**主导3款实景解谜产品的立项与全案策划**，从0到1搭建玩法框架与剧情脉络。设计线性解谜流程，共设计谜题**300余道**，将剧情线索巧妙融入实体道具、信件、地图、机关等元素中，实现“解谜推动剧情、剧情引导解谜”的沉浸式交互体验。",
              "撰写玩法说明书、剧情脚本、流程指引文本**共计8万余字**，确保玩家在无人工引导下也能顺畅体验。",
              "**独立完成关卡逻辑设计**，通过谜题难度曲线把控叙事节奏，并在多轮测试中优化用户体验。"
            ]
          },
          {
            title: "道具设计与实体监修",
            points: [
              "绘制道具设计草图200余张，明确道具材质、尺寸、印刷工艺等细节，与美术紧密对接，跟进道具设计流程，核验实体道具的质感与表现。",
              "过程中积累了对游戏设计的深入理解，能够精准评估美术设计的落地可行性，有效降低量产阶段的修改成本。",
              "项目上线后获得解谜爱好者社群好评，多次与行业领军厂牌“奥秘之家”的《王者荣耀之长安密探》、《问秦》、《谜宫3》等产品共同荣获**EGA年度最佳解谜文创**奖项。"
            ]
          }
        ]
      }
    ],
    skills: [
      {
        category: "策略卡牌与 DBG",
        items: ["杀戮尖塔", "怪物火车", "炉石传说", "历史巨轮", "卡组构建机制研究"]
      },
      {
        category: "动作 RPG",
        items: ["战神4", "对马岛之魂", "刺客信条：奥德赛", "漫威蜘蛛侠", "线性叙事节奏/演出分镜"]
      },
      {
        category: "AI 工具链",
        items: ["DeepSeek", "Gemini", "即梦", "Suno", "Sora 2", "seedance"]
      }
    ]
  };

  if (booting) {
    return (
      <div className="h-screen w-screen bg-[#f5f2ed] flex flex-col items-center justify-center font-mono text-[#1a1a1a] noise-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6 text-6xl font-black tracking-tighter text-[#f27d26]">INITIALIZING...</div>
          <div className="text-sm font-bold opacity-70 mb-10 uppercase tracking-[0.3em]">Reading magnetic tape archive...</div>
          <div className="w-96 h-4 bg-[#e5e1da] relative overflow-hidden border-4 border-[#1a1a1a]">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#f27d26]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden crt-screen p-0 md:p-8 flex items-center justify-center bg-[#f5f2ed] noise-bg">
      <Scanline />
      
      {/* Main Console Frame */}
      <div className="w-full max-w-7xl h-full bg-[#f5f2ed] border-b-4 md:border-4 border-[#1a1a1a] rounded-none md:shadow-[24px_24px_0px_rgba(26,26,26,1)] flex flex-col relative overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="min-h-[7rem] md:h-28 border-b-4 border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-0 bg-white gap-4 md:gap-0">
          <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-12 h-12 md:w-16 md:h-16 bg-[#f27d26] rounded-none flex items-center justify-center text-white border-2 md:border-4 border-[#1a1a1a] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)] shrink-0"
            >
              <CassetteTape size={28} className="md:hidden" />
              <CassetteTape size={40} className="hidden md:block" />
            </motion.div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-[#1a1a1a]">{resumeData.name}</h1>
                <span className="text-[10px] md:text-sm font-black text-[#2a9d8f] uppercase tracking-widest">
                  {resumeData.contact.gender} / {resumeData.contact.age}
                </span>
              </div>
              <p className="text-[10px] md:text-sm text-[#f27d26] font-black uppercase tracking-widest mt-0.5 md:mt-1">{resumeData.title}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-12 text-[#1a1a1a] text-[10px] md:text-xs font-black uppercase tracking-wider w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-3">
              <Phone size={14} className="text-[#2a9d8f] md:w-[18px] md:h-[18px]" />
              <span>{resumeData.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Mail size={14} className="text-[#e76f51] md:w-[18px] md:h-[18px]" />
              <span>{resumeData.contact.email}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              <GraduationCap size={14} className="text-[#f27d26] md:w-[18px] md:h-[18px]" />
              <span>{resumeData.contact.education}</span>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#f27d26" }}
              href={resumeData.contact.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 md:gap-3 border-2 border-[#1a1a1a] px-3 md:px-4 py-1.5 md:py-2 bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <ExternalLink size={14} className="md:w-[18px] md:h-[18px]" />
              <span>作品集</span>
            </motion.a>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <nav className="w-full md:w-72 border-b-4 md:border-b-0 md:border-r-4 border-[#1a1a1a] flex flex-row md:flex-col bg-[#e5e1da] overflow-x-auto no-scrollbar">
            <div className="flex flex-row md:flex-col min-w-full">
              <RetroButton 
                label="工作经历" 
                active={activeSection === 'EXPERIENCE'} 
                onClick={() => setActiveSection('EXPERIENCE')}
                icon={Layers}
              />
              <RetroButton 
                label="个人总结" 
                active={activeSection === 'SUMMARY'} 
                onClick={() => setActiveSection('SUMMARY')}
                icon={Terminal}
              />
              <RetroButton 
                label="游戏阅历" 
                active={activeSection === 'SKILLS'} 
                onClick={() => setActiveSection('SKILLS')}
                icon={Gamepad2}
              />
            </div>
            
            <div className="hidden md:block mt-auto p-8">
              <div className="p-4 border-4 border-[#1a1a1a] bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">Tape Status</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [8, 16, 8] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                      className="w-2 bg-[#f27d26]" 
                    />
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Content Display */}
          <main ref={mainRef} className="flex-1 p-6 md:p-16 overflow-y-auto cassette-texture relative bg-[#f5f2ed]">
            <AnimatePresence 
              mode="wait"
              onExitComplete={() => {
                if (mainRef.current) mainRef.current.scrollTop = 0;
              }}
            >
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-5xl mx-auto"
              >
                {activeSection === 'SUMMARY' && (
                  <div>
                    <SectionTitle title="个人总结" subtitle="Core Competencies & Professional Profile" />
                    <div className="grid grid-cols-1 gap-6 md:gap-10">
                      {resumeData.summary.map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ scale: 1.01 }}
                          className="bg-white border-4 border-[#1a1a1a] p-6 md:p-10 rounded-none shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all group"
                        >
                          <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-6">
                            {idx === 0 ? <Database className="text-[#2a9d8f] w-6 h-6 md:w-8 md:h-8" /> : <Cpu className="text-[#e76f51] w-6 h-6 md:w-8 md:h-8" />}
                            <h3 className="text-xl md:text-3xl font-black text-[#1a1a1a]">{item.title}</h3>
                          </div>
                          <p className="text-sm md:text-lg text-zinc-800 leading-relaxed font-medium whitespace-pre-wrap">{item.content}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'EXPERIENCE' && (
                  <div>
                    <SectionTitle title="工作经历" subtitle="Career Path & Key Projects" />
                    {resumeData.experience.map((exp, idx) => (
                      <ExperienceCard key={idx} {...exp} />
                    ))}
                  </div>
                )}

                {activeSection === 'SKILLS' && (
                  <div>
                    <SectionTitle title="游戏阅历" subtitle="Gaming Depth & Tool Stack" />
                    <div className="space-y-12">
                      {resumeData.skills.map((skill, idx) => (
                        <div key={idx}>
                          <h3 className="text-base font-black text-[#1a1a1a] uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                            <Zap size={24} className="text-[#f27d26]" />
                            {skill.category}
                          </h3>
                          <div className="flex flex-wrap gap-3 md:gap-4">
                            {skill.items.map((item, sIdx) => (
                              <motion.span 
                                key={sIdx} 
                                whileHover={{ y: -4, backgroundColor: "#1a1a1a", color: "#fff" }}
                                className="px-4 md:px-6 py-2 md:py-3 bg-white border-2 md:border-4 border-[#1a1a1a] text-[#1a1a1a] text-[10px] md:text-sm font-black rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Bottom Status Bar */}
        <footer className="h-auto md:h-14 border-t-4 border-[#1a1a1a] bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-3 md:py-0 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] gap-2 md:gap-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8">
            <span className="flex items-center gap-2 md:gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-[#2a9d8f] rounded-full animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span className="hidden sm:inline">ENCODING: UTF-8</span>
            <span className="hidden sm:inline">LOCATION: FUZHOU_CHINA</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <span>© 2024 戚祥瑞_职业档案</span>
            <span className="bg-[#1a1a1a] text-white px-2 md:px-3 py-0.5 md:py-1 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_rgba(242,125,38,1)] md:shadow-[4px_4px_0px_rgba(242,125,38,1)]">V5.0.0-PRO</span>
          </div>
        </footer>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_2px,transparent_2px),linear-gradient(rgba(0,0,0,0.05)_2px,transparent_2px)] bg-[size:60px_60px]" />
      </div>
    </div>
  );
}
