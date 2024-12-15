"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment, FaTrophy, FaMedal, FaBell } from "react-icons/fa";
import NotificationPanel from "./NotificationPanel";
import BadgeAlert from "./BadgeAlert";
import AchievementCelebration from "./AchievementCelebration";
import React from "react";
export type NotificationType = "like" | "comment" | "challenge" | "achievement";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);

  // useEffect(() => {
  //   // Simulating incoming notifications
  //   const notificationTypes: NotificationType[] = [
  //     "like",
  //     "comment",
  //     "challenge",
  //     "achievement",
  //   ];
  //   const interval = setInterval(() => {
  //     const type =
  //       notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
  //     const newNotification: Notification = {
  //       id: Date.now().toString(),
  //       type,
  //       message: getNotificationMessage(type),
  //       read: false,
  //     };
  //     setNotifications((prev) => [newNotification, ...prev]);

  //     if (type === "achievement") {
  //       setShowAchievement(true);
  //       setTimeout(() => setShowAchievement(false), 5000);
  //     }
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (notifications.length > 0 && !notifications[0].read) {
      setShowPanel(true);
    }
  }, [notifications]);

  const getNotificationMessage = (type: NotificationType): string => {
    switch (type) {
      case "like":
        return "Someone liked your post!";
      case "comment":
        return "New comment on your post!";
      case "challenge":
        return "New challenge available!";
      case "achievement":
        return "You've unlocked a new achievement!";
      default:
        return "New notification!";
    }
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleClosePanel = () => {
    setShowPanel(false);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <FaHeart className="text-red-500" />;
      case "comment":
        return <FaComment className="text-blue-500" />;
      case "challenge":
        return <FaTrophy className="text-yellow-500" />;
      case "achievement":
        return <FaMedal className="text-purple-500" />;
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <button
          onClick={() => setShowPanel(true)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
        >
          <FaBell />
        </button>
      </motion.div>

      <AnimatePresence>
        {showPanel && (
          <NotificationPanel
            notifications={notifications}
            onClose={handleClosePanel}
            onNotificationClick={handleNotificationClick}
            getNotificationIcon={getNotificationIcon}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newBadge && (
          <BadgeAlert badge={newBadge} onClose={() => setNewBadge(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievement && (
          <AchievementCelebration onClose={() => setShowAchievement(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
