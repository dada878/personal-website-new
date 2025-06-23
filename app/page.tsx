"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import experiencesData from "../data/experiences.json";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import projects from "../data/projects.json";

const experiences: Record<string, string[]> = experiencesData;

export default function Home() {
  const expTabKeys = Object.keys(experiences);
  const [expTab, setExpTab] = useState(0);
  const expTabs = expTabKeys.map((key: string) => ({
    label: key,
    content: (
      <div className="list-disc list-inside space-y-1 text-gray-300 prose prose-invert">
        {experiences[key].map((item: string) => (
            <ReactMarkdown components={{a: props => <a {...props} className="underline hover:text-white" target="_blank" rel="noopener noreferrer"/>}} key={item}>{`- ${item}`}</ReactMarkdown>
        ))}
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-[#181A1B] text-white font-sans">
      {/* 社群媒體 icon 頂部列 */}
      <div className="flex justify-end items-center gap-4 px-8 pt-6 max-w-5xl mx-auto">
        <a href="https://www.linkedin.com/in/weida-chen-tw/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl transition-colors"><FaLinkedin /></a>
        <a href="https://instagram.com/dada._.878" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl transition-colors"><FaInstagram /></a>
        <a href="https://github.com/dada878" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl transition-colors"><FaGithub /></a>
      </div>

      {/* Hero 區塊 */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-16 max-w-3xl mx-auto">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg border-4 border-[#23272A]">
          <Image
            src="/avatar.jpg"
            alt="陳威達 | 冰川 大頭照"
            width={320}
            height={320}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">陳威達（冰川）</h1>
          <p className="text-lg text-gray-300">特選 ／ 清大 ／ 創業 ／ 程式 ／ 教育</p>
        </div>
      </section>

      {/* 自我介紹 */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-b border-[#23272A]">
        <h2 className="text-2xl font-semibold mb-2">關於</h2>
        <p className="text-gray-300">從國小開始接觸程式設計，高中期間累積多項競賽與檢定佳績，全台授課觸及逾 500 名學生，並透過特殊選才錄取清大資工系。<br /><br />現為《冰山程式教育學院》創辦人，致力將學習歷程轉化為系統化教學，陪伴更多學生踏上自信的程式之路。</p>
        <div className="mt-6">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3500}
            className="rounded-lg overflow-hidden shadow-md border border-[#23272A]"
          >
            {[
              "/speaks/1.jpeg",
              "/speaks/2.JPG",
              "/speaks/3.jpg",
            ].map((src, idx) => (
              <div key={src}>
                <Image
                  src={src}
                  alt={`演講照片 ${idx + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-56"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* 經歷 */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-b border-[#23272A]">
        <h2 className="text-2xl font-semibold mb-2">經歷</h2>
        <div className="mb-4 flex gap-2 border-b border-[#23272A]">
          {expTabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setExpTab(idx)}
              className={`px-4 py-2 font-medium w-full transition-colors border-b-2 -mb-px focus:outline-none ${
                expTab === idx
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{expTabs[expTab].content}</div>
      </section>

      {/* 作品集區塊 */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-[#23272A]">
        <h2 className="text-2xl font-semibold mb-6">作品集</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <a
              key={proj.url}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#23272A] rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition-transform border border-[#333] group"
            >
              <div className="w-full h-48 bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:opacity-90 transition"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white mb-1 truncate">{proj.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {proj.techs.map((tech: string) => (
                    <span key={tech} className="bg-[#181A1B] text-xs text-gray-300 px-2 py-0.5 rounded-full border border-[#333]">{tech}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#181A1B] border-t border-[#23272A] py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
          <div>© 2024 陳威達 | 冰川 · Powered by Next.js & Tailwind CSS</div>
        </div>
      </footer>
    </div>
  );
}
