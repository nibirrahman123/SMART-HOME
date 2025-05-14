"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const ESP_IP = "http://192.168.31.6";

  const [led1, setLed1] = useState(false);
  const [led2, setLed2] = useState(false);
  const [relay, setRelay] = useState(false);

  const handleControl = async (device, action) => {
    try {
      await fetch(`${ESP_IP}/${device}/${action}`);
      if (device === "led1") setLed1(action === "on");
      else if (device === "led2") setLed2(action === "on");
      else if (device === "relay") setRelay(action === "on");
    } catch (error) {
      alert("Failed to reach ESP8266. Check Wi-Fi and IP.");
    }
  };

  const ControlBlock = ({ label, device, isOn, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col bg-[#f5f5f4]/80 w-96 p-2 text-gray-700 rounded-lg gap-2 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.a
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => handleControl(device, "on")}
        className="bg-[#86f066] px-6 py-4 rounded-lg transition-all text-center cursor-pointer"
      >
        {label} ON
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => handleControl(device, "off")}
        className="bg-[#f86d36] px-6 py-4 rounded-lg transition-all text-center cursor-pointer"
      >
        {label} OFF
      </motion.a>
    </motion.div>
  );

  return (
    <main className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      {/* Animated Blurred Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: 'url("/myHomeBg.jpg")' }}
      ></motion.div>

      {/* Foreground Content */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-black font-extrabold"
      >
        <motion.h1
          className="text-4xl md:text-5xl text-white mb-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          OUR PROJECTS
        </motion.h1>

        <motion.div
          className="grid gap-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <ControlBlock label="Mini LED 1" device="led1" isOn={led1} delay={0.2} />
          <ControlBlock label="Mini LED 2" device="led2" isOn={led2} delay={0.4} />
          <ControlBlock label="Main Light" device="relay" isOn={relay} delay={0.6} />
          <button
            className="p-4 border-8  rounded-lg bg-gradient-to-r from-green-300 text-white to-[tomato]"
            onClick={() => window.location.href = "https://whatismyipaddress.com/"}
          >
            find me
          </button>

        </motion.div>
        
      </motion.div>
    </main>
  );
}
