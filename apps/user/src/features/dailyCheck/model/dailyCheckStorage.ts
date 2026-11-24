"use client";

const CLAIMED_DATE_KEY = "u4uDailyCheckDate";
const CHANGE_EVENT = "dailycheckchange";

const isBrowser = () => typeof window !== "undefined";

export const getToday = () => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");

  return `${now.getFullYear()}-${month}-${date}`;
};

export const getClaimedDate = () => {
  if (!isBrowser()) return null;

  try {
    return localStorage.getItem(CLAIMED_DATE_KEY);
  } catch {
    return null;
  }
};

export const getServerClaimedDate = () => null;

export const claimToday = () => {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(CLAIMED_DATE_KEY, getToday());
  } catch {}

  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const subscribeClaimedDate = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};
