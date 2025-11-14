import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export function useNotifications() {
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const req = await Notifications.requestPermissionsAsync();
        setPermissionStatus(req.status);
      } else {
        setPermissionStatus(status);
      }
    })();
  }, []);

  const scheduleDailyReminder = async () => {
    // clear old reminders
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Remember to log your expenses",
        body: "It only takes a minute to track your spending.",
      },
      trigger: {
        type: "timeInterval",
        seconds: 24 * 60 * 60, // 24 hours
        repeats: true,
      } as any,
    });
  };

  const cancelReminders = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return { permissionStatus, scheduleDailyReminder, cancelReminders };
}
