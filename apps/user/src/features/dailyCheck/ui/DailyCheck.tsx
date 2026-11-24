"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import DailyCheckBlock from "./block/DailyCheckBlock";
import DailyCheckCover from "./cover/DailyCheckCover";
import DailyCheckCompleteModal from "./cover/DailyCheckCompleteModal";
import Rope from "./Rope";
import { useUserStarStore } from "@/src/entities/user/model/useUserStarStore";
import { RESULT_MODAL_DURATION } from "@/src/shared/ui/modal/resultDuration";
import {
  claimToday,
  getClaimedDate,
  getServerClaimedDate,
  getToday,
  subscribeClaimedDate,
} from "../model/dailyCheckStorage";

const DAILY_REWARD = 20;

export default function DailyCheck() {
  const claimedDate = useSyncExternalStore(
    subscribeClaimedDate,
    getClaimedDate,
    getServerClaimedDate,
  );
  const isClaimed = claimedDate === getToday();
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addStars = useUserStarStore((state) => state.addStars);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const hideNotice = () => {
    setIsNoticeOpen(false);
  };

  const showNotice = () => {
    if (isClaimed) return;

    claimToday();
    addStars(DAILY_REWARD);
    setIsNoticeOpen(true);

    if (timerRef.current !== null) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(hideNotice, RESULT_MODAL_DURATION);
  };

  return (
    <DailyCheckSection>
      <Rope />
      <Ropee
        src="/img/dailyCheckLine.svg"
        width={12}
        height={198}
        alt=""
        aria-hidden="true"
      />
      <DailyCheckBlock totalCount={5} />
      {!isClaimed && <DailyCheckCover onClick={showNotice} />}

      <DailyCheckCompleteModal
        isOpen={isNoticeOpen}
        reward={DAILY_REWARD}
        onClose={hideNotice}
      />
    </DailyCheckSection>
  );
}

const DailyCheckSection = styled.section`
  position: relative;
  width: min(353px, 100%);
  margin: 22px auto 0;
`;

const Ropee = styled(Image)`
  position: absolute;
  bottom: calc(100% - 2px);
  z-index: 0;
  width: 12px;
  height: 73px;
  object-fit: fill;

  &:first-of-type {
    left: 20%;
  }

  &:nth-of-type(2) {
    right: 20%;
  }
`;
