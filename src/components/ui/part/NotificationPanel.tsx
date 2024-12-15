"use client";

import { motion } from "framer-motion";
import React from "react";
import { NotificationType } from "./NotificationSystem";
interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (id: string) => void;
  getNotificationIcon: (type: NotificationType) => JSX.Element;
}

export default function NotificationPanel({
  notifications,
  onClose,
  onNotificationClick,
  getNotificationIcon,
}: NotificationPanelProps) {
  return (
    <motion.div
      className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`p-3 mb-2 rounded-lg cursor-pointer ${
              notification.read ? "bg-gray-100" : "bg-blue-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNotificationClick(notification.id)}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {getNotificationIcon(notification.type as NotificationType)}
              </div>
              <div>{notification.message}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
