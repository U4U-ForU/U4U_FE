"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import FilterBoxList from "./FilterBoxList";
import EmptyList from "@/src/shared/ui/EmptyList";
import Room from "./Room";
import type { DealFilter, DealRoom } from "../../model/list/types";

const EMPTY_MESSAGE: Record<DealFilter, string> = {
  전체: "거래 중인 방이 없습니다.",
  "내 글": "작성한 글이 없습니다.",
  "내 댓글": "작성한 댓글이 없습니다.",
};

interface DealListProps {
  rooms: DealRoom[];
}

export default function DealList({ rooms }: DealListProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<DealFilter>("전체");

  const filteredRooms =
    filter === "전체" ? rooms : rooms.filter((room) => room.status === filter);

  return (
    <>
      <FilterBoxList value={filter} onChange={setFilter} />
      {filteredRooms.length === 0 ? (
        <EmptyList text={EMPTY_MESSAGE[filter]} />
      ) : (
        <RoomList>
          {filteredRooms.map((room) => (
            <Room
              key={room.id}
              name={room.name}
              itemCount={room.itemCount}
              commentCount={room.commentCount}
              nickname={room.nickname}
              onClick={() =>
                router.push(
                  room.status === "내 글" ? "/deal/mydetail" : "/deal/detail",
                )
              }
            />
          ))}
        </RoomList>
      )}
    </>
  );
}

const RoomList = styled.div`
  display: flex;
  flex: 1;
  padding: 0 20px 20px;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;
